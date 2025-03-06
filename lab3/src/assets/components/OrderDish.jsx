const OrderDish = ({ item }) => {
  return (
    <li
      className="mx-auto grid w-full grid-cols-2 items-center rounded-lg border-b-2 border-gray-300 bg-white px-8 py-4 sm:grid-cols-4"
    >
      <figure className="col-span-1">
        <img
          src={item.dish.image}
          alt={item.dish.name}
          className="h-[65px] w-[75px] rounded-lg shadow-2xl md:w-[100px]"
        />
      </figure>
      <div className="col-span-1">
        <h2 className="w-32 truncate text-right text-[14px] md:w-48 md:text-left md:text-[20px]">
          {item.dish.name}
        </h2>
      </div>
      <div className="col-span-1 mt-4 sm:mt-0 text-center">
        <p className="text-[22px] text-gray-500">
          $ {item.dish.price * item.count}.00
        </p>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-2 text-[14px] md:text-[20px]">
        <span>Кількість</span>
        <span className="h-[35px] w-[35px] rounded-lg bg-gray-300 p-2 text-center md:p-1">
          {item.count}
        </span>
      </div>
    </li>
  );
};

export default OrderDish;
