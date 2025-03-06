import BasketItem from "./../components/BasketItem.jsx";
import { useLocalStorage } from "./../hooks/useLocalStorage.jsx";
import { useBackgroundColor } from "./../hooks/useBackgroundColor.jsx";
import { useTitle } from "./../hooks/useTitle.jsx";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  useTitle("Кошик");
  useBackgroundColor("bg-yellow-500");

  const navigate = useNavigate();
  const [orders, setOrders] = useLocalStorage("orders", []);
  const [basket, setBasket] = useLocalStorage("basket", []);

  const makeOrder = () => {
    const newOrder = {
      orderId: orders.length + 1,
      items: basket,
      orderStartDatetime: new Date(),
      totalPrice: basket.reduce(
        (accum, cur) => accum + cur.dish.price * cur.count,
        0
      ),
      totalCount: basket.reduce((accum, cur) => accum + cur.count, 0),
      orderEndDatetime: new Date(new Date().getTime() + 30 * 60000),
    };

    const newOrders = [...orders, newOrder].sort(
      (a, b) => new Date(b.orderStartDatetime) - new Date(a.orderStartDatetime)
    );

    setOrders(newOrders);
    setBasket([]);
    navigate("/orders");
  };

  const incrementBasketItem = (id) => {
    setBasket(
      basket.map((item) =>
        item.orderDishId === id
          ? { ...item, count: item.count < 100 ? item.count + 1 : item.count }
          : item
      )
    );
  };

  const decrementBasketItem = (id) => {
    setBasket(
      basket.map((item) =>
        item.orderDishId === id
          ? { ...item, count: item.count > 0 ? item.count - 1 : item.count }
          : item
      )
    );
  };

  const deleteBasketItem = (id) => {
    setBasket(basket.filter((item) => item.orderDishId !== id));
  };

  return (
    <main className="mx-auto w-full max-w-[1490px] flex-1 rounded-lg py-4 text-center text-[30px]">
      <section className="w-full rounded-lg bg-white py-2 text-[30px]">
        <h1>Кошик</h1>
      </section>

      <section className="mt-4 max-w-[1490px] rounded-lg border-[4px] border-white px-2 py-4 2xl:mx-auto">
        <article>
          {basket.length ? (
            <>
              <ul className="col-span-1 grid grid-cols-1 gap-2">
                {basket.map((item) => (
                  <BasketItem
                    key={item.orderDishId}
                    item={item}
                    incrementBasketItem={incrementBasketItem}
                    decrementBasketItem={decrementBasketItem}
                    deleteBasketItem={deleteBasketItem}
                  />
                ))}
              </ul>
              <footer className="mx-auto mt-4 flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-lg bg-white px-8 py-4 text-left text-[14px] md:text-[18px] md:flex-row xl:text-[22px]">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex items-center gap-2 w-[200px] md:w-[280px] xl:w-[340px]">
                    <span>Загальний рахунок</span>
                    <span className="text-gray-500">
                      $
                      {basket.reduce(
                        (accum, cur) => accum + cur.dish.price * cur.count,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Загальна кількість</span>
                    <span className="h-[35px] w-[35px] rounded-lg bg-gray-300 p-1 text-center text-[14px] md:text-[18px]">
                      {basket.reduce((accum, cur) => accum + cur.count, 0)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={makeOrder}
                  className="rounded-lg border-[2px] border-black px-6 py-2 transition duration-300 ease-in-out hover:bg-black hover:text-white"
                >
                  Замовити
                </button>
              </footer>
            </>
          ) : (
            <div className="h-[340px] text-white flex items-center justify-center">
              Пусто
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Basket;
