document.addEventListener('DOMContentLoaded', () => {
  let orders = [];
  const savedOrders = localStorage.getItem('orders');

  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(date).toLocaleString('uk-UA', options);
  };

  const ordersListHtml = document.getElementById('orders-info');

  let stringHtml = '';

  if (orders.length) {
    stringHtml += `<ul id="orders-info" class="grid grid-cols-1 gap-2">`;
    let i = 0;
    while (i < orders.length) {
      const order = orders[i];
      const orderStart = new Date(order.orderStartDatetime);
      const orderEnd = new Date(order.orderEndDatetime);

      stringHtml += `<li id="order-${i}" class="col-span-1">
            <article class="rounded-lg border-[4px] border-white p-4">
              <header
                class="flex flex-col items-center justify-between rounded-lg bg-white px-6 py-2 text-[20px] md:flex-row lg:text-[25px]"
              >
                <h2 class="font-bold">Замовлення ${order.orderId}</h2>
                <div class="flex gap-4 sm:gap-16">
                  <time id="timer-${i}" class="text-[14px] text-gray-700 lg:text-[18px]"></time>
                  <time class="text-[14px] text-gray-500 lg:text-[18px]">${formatDate(orderStart)}</time>
                </div>
              </header>
    
              <ul class="mt-2 grid grid-cols-1 gap-2 rounded-t-lg bg-white">`;

      let orderItems = '';
      let j = 0;
      while (j < order.items.length) {
        const item = order.items[j];
        orderItems += `<li
                    class="mx-auto grid w-full grid-cols-2 items-center rounded-lg border-b-2 border-gray-300 bg-white px-8 py-4 sm:grid-cols-4"
                  >
                    <figure class="col-span-1">
                      <img
                        src="./assets/img/${item.dish.image}"
                        alt="${item.dish.name}"
                        class="h-[65px] w-[75px] rounded-lg shadow-2xl md:w-[100px]"
                      />
                    </figure>
                    <div class="col-span-1">
                      <h2
                        class="w-32 truncate text-right text-[14px] md:w-48 md:text-left md:text-[20px]"
                      >
                      ${item.dish.name}
                      </h2>
                    </div>
                    <div class="col-span-1 mt-4 sm:mt-0 text-center">
                      <p class="text-[22px] text-gray-500">$ ${item.dish.price * item.count}.00</p>
                    </div>
                    <div
                      class="col-span-1 flex items-center justify-end gap-2 text-[14px] md:text-[20px]"
                    >
                      <span>Кількість</span>
                      <span class="h-[35px] w-[35px] rounded-lg bg-gray-300 p-2 text-center md:p-1"
                        >${item.count}</span
                      >
                    </div>
                  </li>`;
        j++;
      }
      orderItems += `</ul>`;

      stringHtml += orderItems;

      stringHtml += `<footer
                class="mx-auto flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-b-lg bg-white px-8 py-4 text-left md:flex-row text-[18px] lg:text-[22px]"
              >
                <div class="flex items-center gap-2">
                  <span>Загальний рахунок</span>
                  <span class="text-gray-500">$ ${order.totalPrice}.00</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>Загальна кількість</span>
                  <span class="h-[35px] w-[35px] text-[14px] md:text-[20px] rounded-lg bg-gray-300 p-1 text-center"
                    >${order.totalCount}</span
                  >
                </div>
              </footer>
            </article>
          </li>`;
      i++;
    }
    stringHtml += `</ul>`;
  } else {
    stringHtml += `
      <div class="h-[380px] text-white border-4 border-white rounded-lg flex items-center justify-center">
      Пусто
      </div>`;
  }

  ordersListHtml.innerHTML = stringHtml;

  const body = document.querySelector('body');
  const modal = `<div id="modal-window" class="fixed flex items-center justify-center bg-black bg-opacity-50 top-0 bottom-0 right-0 left-0">
                  <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <h3 class="text-lg font-bold mb-4">Замовлення готове</h3>
                    <button
                      id="close-order"
                      class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Закрити
                    </button>
                  </div>
                </div>`;

  let closeOrder;
  let intervalId;
  let isModalOpen = false;

  orders.forEach((order, index) => {
    const orderEnd = new Date(order.orderEndDatetime);

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = Math.max(0, (orderEnd - now) / 1000);
      const minutes = Math.floor(timeDiff / 60)
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor(timeDiff % 60)
        .toString()
        .padStart(2, '0');

      let timeItem = document.getElementById(`timer-${index}`);

      if (`${minutes}:${seconds}` !== '00:00') {
        timeItem.innerText = `${minutes}:${seconds}`;
      }
      if (`${minutes}:${seconds}` === '00:00') {
        body.innerHTML += modal;
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));        
        clearInterval(intervalId);
        const modalWindow = document.getElementById('modal-window');
        closeOrder = document.getElementById('close-order');
        closeOrder.addEventListener('click', () => {
          modalWindow.remove();
          clearInterval(intervalId);
          window.location.reload();
        });
      }
    };

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  });
});
