import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import OrderDish from "./OrderDish.jsx";

const Order = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const orderEnd = new Date(order.orderEndDatetime);

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = Math.max(0, (orderEnd - now) / 1000);
      const minutes = Math.floor(timeDiff / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(timeDiff % 60)
        .toString()
        .padStart(2, "0");

      const timeString = `${minutes}:${seconds}`;
      setTimeLeft(timeString);
      setIsCompleted(timeString === "00:00");
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [order.orderEndDatetime]);

  return (
    <li className="col-span-1">
      <article className="rounded-lg border-[4px] border-white p-4">
        <header className="flex flex-col items-center justify-between rounded-lg bg-white px-6 py-2 text-[20px] md:flex-row lg:text-[25px]">
          <h2 className="font-bold">Замовлення {order.orderId}</h2>
          <div className="flex gap-4 sm:gap-16">
            <time className="text-[14px] text-gray-700 lg:text-[18px]">
              {isCompleted ? <FontAwesomeIcon icon={faCheck} /> : timeLeft}
            </time>
            <time className="text-[14px] text-gray-500 lg:text-[18px]">
              {new Date(order.orderStartDatetime).toLocaleString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </time>
          </div>
        </header>

        <ul className="mt-2 grid grid-cols-1 gap-2 rounded-t-lg bg-white">
          {order.items.map((orderItem) => (
            <OrderDish key={orderItem.orderDishId} item={orderItem} />
          ))}
        </ul>
        <footer className="mx-auto flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-b-lg bg-white px-8 py-4 text-left md:flex-row text-[18px] lg:text-[22px]">
          <div className="flex items-center gap-2">
            <span>Загальний рахунок</span>
            <span className="text-gray-500">$ {order.totalPrice}.00</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Загальна кількість</span>
            <span className="h-[35px] w-[35px] text-[14px] md:text-[20px] rounded-lg bg-gray-300 p-1 text-center">
              {order.totalCount}
            </span>
          </div>
        </footer>
      </article>
    </li>
  );
};

export default Order;
