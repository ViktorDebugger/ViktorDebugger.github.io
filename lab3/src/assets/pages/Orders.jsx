import Order from "../components/Order.jsx";
import { useLocalStorage } from "./../hooks/useLocalStorage.jsx";
import { useBackgroundColor } from "./../hooks/useBackgroundColor.jsx";
import { useTitle } from "./../hooks/useTitle.jsx";

const Orders = () => {
  useTitle("Замовлення");
  useBackgroundColor("bg-green-500");

  const [orders, _] = useLocalStorage("orders", []);

  return (
    <main className="mx-auto w-full max-w-[1490px] flex-1 rounded-lg py-4 text-center text-[30px]">
      <section className="w-full rounded-lg bg-white py-2 text-[30px]">
        <h1>Замовлення</h1>
      </section>

      <section className="mt-4 max-w-[1490px] 2xl:mx-auto">
        {orders.length ? (
          <ul className="grid grid-cols-1 gap-2">
            {orders.map((order) => (
              <Order key={order.orderId} order={order} />
            ))}
          </ul>
        ) : (
          <div className="h-[380px] text-white border-4 border-white rounded-lg flex items-center justify-center">
            Пусто
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;
