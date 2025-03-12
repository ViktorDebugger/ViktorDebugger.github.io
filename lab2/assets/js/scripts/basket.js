document.addEventListener('DOMContentLoaded', () => {
  let orders = [];
  let basket = [];
  const savedBasket = localStorage.getItem('basket');
  const savedOrders = localStorage.getItem('orders');

  if (savedBasket) {
    basket = JSON.parse(savedBasket);
  }

  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }

  const basketList = document.getElementById('basket-info');
  let totalCount;
  let totalPrice;

  const renderTotal = () => {
    if (totalCount && totalPrice) {
      let count = 0;
      let price = 0;

      for (let i = 0; i < basket.length; i++) {
        count += basket[i].count;
        price += basket[i].count * basket[i].dish.price;
      }
      totalCount.innerText = count;
      totalPrice.innerText = `$ ${price}.00`;
    }
  };

  let basketItems = [];

  const renderBasket = () => {
    let stringHtml = '';

    if (basket.length) {
      stringHtml = `<ul class="col-span-1 grid grid-cols-1 gap-2">`;
      for (let i = 0; i < basket.length; i++) {
        stringHtml += `<li
                class="basket-item col-span-1 mx-auto grid w-full grid-cols-2 items-center rounded-lg bg-white px-8 py-4 sm:grid-cols-5"
              >
                <div class="col-span-1">
                  <img
                    src="./assets/img/${basket[i].dish.image}"
                    alt="${basket[i].dish.name}"
                    class="h-[65px] w-[75px] rounded-lg shadow-2xl md:w-[100px]"
                  />
                </div>
  
                <div class="col-span-1">
                  <h2
                    class="w-24 truncate text-[14px] sm:text-[16px] md:w-48 text-left md:text-[22px]"
                  >
                  ${basket[i].dish.name}
                  </h2>
                </div>
  
                <div class="col-span-1 text-left">
                  <p class="text-[22px] text-gray-500">$ ${basket[i].dish.price * basket[i].count}.00</p>
                </div>

                <div class="col-span-1 text-left">
                  <p class="text-[22px] text-gray-500">$ ${basket[i].dish.price} x ${basket[i].count}</p>
                </div>
  
                <div
                  class="col-span-1 flex items-center justify-end gap-2 text-[12px] sm:text-[14px] md:text-[20px]"
                >
                  <span>Кількість</span>
                  <span class="h-[35px] w-[35px] rounded-lg bg-gray-300 p-2 text-center md:p-1 text-[14px] md:text-[20px]">
                    ${basket[i].count}
                  </span>
                  <div class="flex flex-col gap-2">
                    <button class="button-up rounded-lg bg-gray-300 px-1 transition duration-300 ease-in-out hover:bg-gray-400">
                      <i
                        class="fa-solid fa-angle-up"
                      ></i>
                    </button>
                    
                    <button class="button-delete rounded-lg bg-gray-300 px-1 transition duration-300 ease-in-out hover:bg-gray-400">
                      <i
                        class="fa-solid fa-x"
                      ></i>
                    </button>
  
                    <button class="button-down rounded-lg bg-gray-300 px-1 transition duration-300 ease-in-out hover:bg-gray-400">
                      <i
                        class="fa-solid fa-angle-down"
                      ></i>
                    </button>
                  </div>
                </div>
              </li>`;
      }
      stringHtml += `</ul>
      <footer
            class="mx-auto mt-4 flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-lg bg-white px-8 py-4 text-left text-[14px] md:text-[18px] md:flex-row xl:text-[22px]"
          >
            <div class="flex flex-col gap-2 sm:flex-row">
              <div class="flex items-center gap-2 w-[200px] md:w-[280px] xl:w-[340px]">
                <span>Загальний рахунок</span>
                <span id="total-price" class="text-gray-500"></span>
              </div>

              <div class="flex items-center gap-2">
                <span>Загальна кількість</span>
                <span
                  id="total-count"
                  class="h-[35px] w-[35px] rounded-lg bg-gray-300 p-1 text-center text-[14px] md:text-[18px]"
                ></span>
              </div>
            </div>
            <button
              id="order-button"
              class="rounded-lg border-[2px] border-black px-6 py-2 transition duration-300 ease-in-out hover:bg-black hover:text-white"
            >
              Замовити
            </button>
          </footer>`;
    } else {
      stringHtml += `
      <div class="h-[340px] text-white flex items-center justify-center">
      Пусто
      </div>`;
    }

    basketList.innerHTML = stringHtml;

    totalCount = document.getElementById('total-count');
    totalPrice = document.getElementById('total-price');
    basketItems = document.querySelectorAll('.basket-item');

    const orderButton = document.getElementById('order-button');

    if (orderButton) {
      orderButton.addEventListener('click', () => {
        orders.push({
          orderId: orders.length + 1,
          items: basket,
          orderStartDatetime: new Date(),
          totalPrice: basket.reduce((accum, cur) => accum + cur.dish.price * cur.count, 0),
          totalCount: basket.reduce((accum, cur) => accum + cur.count, 0),
          orderEndDatetime: new Date(new Date().getTime() + 30 * 200),
        });
        orders.sort((a, b) => new Date(b.orderStartDatetime) - new Date(a.orderStartDatetime));
        localStorage.setItem('orders', JSON.stringify(orders));
        basket = [];
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket();
        renderTotal();
        window.location.href = 'orders.html';
      });
    }

    basketItems.forEach((item) => {
      const buttonDown = item.querySelector('.button-down');
      const buttonUp = item.querySelector('.button-up');
      const buttonDelete = item.querySelector('.button-delete');

      if (buttonDown) {
        buttonDown.addEventListener('click', () => {
          const basketItemName = item.querySelector('h2').innerText;
          const basketObject = basket.find((i) => i.dish.name === basketItemName);
          if (basketObject.count > 1) {
            basketObject.count -= 1;
          } else {
            basket = basket.filter((i) => i.dish.name !== basketItemName);
          }
          localStorage.setItem('basket', JSON.stringify(basket));
          renderBasket();
          renderTotal();
        });
      }

      if (buttonUp) {
        buttonUp.addEventListener('click', () => {
          const basketItemName = item.querySelector('h2').innerText;
          const basketObject = basket.find((i) => i.dish.name === basketItemName);
          if (basketObject.count < 100) {
            basketObject.count += 1;
            localStorage.setItem('basket', JSON.stringify(basket));
          }
          renderBasket();
          if (basket.length) {
            renderTotal();
          }
        });
      }

      if (buttonDelete) {
        buttonDelete.addEventListener('click', () => {
          const basketItemName = item.querySelector('h2').innerText;
          basket = basket.filter((i) => i.dish.name !== basketItemName);
          localStorage.setItem('basket', JSON.stringify(basket));
          renderBasket();
          if (basket.length) {
            renderTotal();
          }
        });
      }
    });
  };

  renderBasket();
  if (basket.length) {
    renderTotal();
  }
});
