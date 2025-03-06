import { dishes } from './../data/dishes.js';

document.addEventListener('DOMContentLoaded', () => {
  const dishesList = document.getElementById('dishes-info');
  const categorySelect = document.querySelector('select');
  const buttonSearch = document.getElementById('button-search');
  const inputSearch = document.getElementById('dish-search');
  const paginationHtml = document.getElementById('pagination');

  let basket = [];
  const savedBasket = localStorage.getItem('basket');

  if (savedBasket) {
    basket = JSON.parse(savedBasket);
  }

  const itemsPerPage = 8;
  let currentPage = 1;

  const renderDishes = (filteredDishes) => {
    let stringHtml = '';

    if (filteredDishes.length) {
      stringHtml += `
      <ul
          class="mt-4 grid max-w-[1490px] grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:mx-auto"
        >`;
      for (let i in filteredDishes) {
        const isInBasket = basket.some((item) => item.dish.name === filteredDishes[i].name);

        stringHtml += `
                    <li class="col-span-1 mx-auto h-[500px] max-w-[350px] rounded-lg bg-white shadow-2xl">
                      <div class="mx-auto w-[80%]">
                        <img
                          src="./assets/img/${filteredDishes[i].image}"
                          alt="${filteredDishes[i].name}"
                          class="h-[200px] w-full rounded-lg shadow-2xl"
                        />
                      </div>
          
                      <div class="p-4">
                        <h2 class="text-[24px] font-bold">${filteredDishes[i].name}</h2>
                        <p class="mt-4 text-[20px] text-gray-500">Категорія: ${filteredDishes[i].category}</p>
                        <div class="h-[120px]">
                          <p class="mt-3 text-[18px] text-gray-800 md:text-[20px]">
                            ${filteredDishes[i].description}
                          </p>
                        </div>
          
                        <button
                          class="order-button disabled:bg-gray-500 disabled:border-gray-500 disabled:text-white rounded-lg border-2 border-green-600 px-2 py-2 text-green-600 transition duration-300 ease-in-out hover:bg-green-600 hover:text-white w-full"
                          ${isInBasket ? 'disabled' : ''}
                          data-index="${filteredDishes[i].dishId}"
                          >
                        ${isInBasket ? 'У кошику' : `Додати у кошик: $ ${filteredDishes[i].price}.00`}
                        </button>
                      </div>
                    </li>
            `;
      }
      stringHtml += `</ul>`;
    } else {
      stringHtml += `<div class="h-[380px] mt-4 text-white border-4 border-white rounded-lg flex items-center justify-center">
        Пусто
      </div>`;
    }

    dishesList.innerHTML = stringHtml;

    document.querySelectorAll('.order-button').forEach((item) => {
      item.addEventListener('click', (event) => {
        const targetButton = event.target;
        targetButton.disabled = true;
        targetButton.innerText = 'У кошику';

        const dishId = parseInt(item.getAttribute('data-index'), 10);
        const selectedDish = dishes.find((dish) => dish.dishId === dishId);

        basket.push({ dish: selectedDish, count: 1 });

        localStorage.setItem('basket', JSON.stringify(basket));
      });
    });
  };

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let buttons = '';

    if (currentPage > 1) {
      buttons += `<button class="w-[40px] h-[40px] flex justify-center items-center page-btn p-4 bg-white rounded-lg hover:bg-gray-300 duration-300 transition ease-in-out" data-page="${currentPage - 1}"><i class="fa-solid fa-angle-left"></i></button>`;
    }

    const pageRange = 2;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="w-[40px] h-[40px] flex justify-center items-center page-btn p-4 ${i === currentPage ? 'bg-gray-400' : 'bg-white hover:bg-gray-300'} rounded-lg duration-300 transition ease-in-out" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
      buttons += `<button class="w-[40px] h-[40px] flex justify-center items-center page-btn p-4 bg-white rounded-lg hover:bg-gray-300 duration-300 transition ease-in-out" data-page="${currentPage + 1}"><i class="fa-solid fa-angle-right"></i></button>`;
    }

    paginationHtml.innerHTML = buttons;

    document.querySelectorAll('.page-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        currentPage = parseInt(e.target.getAttribute('data-page'));
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        renderDishes(dishes.slice(start, end));
        renderPagination(totalItems);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    });
  };

  const updateDishes = () => {
    currentPage = 1;
    const inputValue = inputSearch.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    let filteredDishes = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(inputValue) &&
        (selectedCategory ? dish.category === selectedCategory : true),
    );
    inputSearch.value = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    renderDishes(filteredDishes.slice(start, end));
    renderPagination(filteredDishes.length);
  };

  buttonSearch.addEventListener('click', updateDishes);
  categorySelect.addEventListener('change', updateDishes);

  updateDishes();
});
