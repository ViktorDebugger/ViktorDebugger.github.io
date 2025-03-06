import bacon from './../img/burger/bacon.png';
import chicken from './../img/burger/chicken.png';
import classic from './../img/burger/classic.png';
import double from './../img/burger/double.png';
import guacamole from './../img/burger/guacamole.png';
import vegan from './../img/burger/vegan.png';

import cherry from './../img/drink/cherry.png';
import lemonade from './../img/drink/lemonade.png';
import mojito from './../img/drink/mojito.png';
import orangeJuice from './../img/drink/orange-juice.png';
import raspberry from './../img/drink/raspberry.png';
import strawberry from './../img/drink/strawberry.png';

import diavola from './../img/pizza/diavola.png';
import fourCheese from './../img/pizza/four-cheese.png';
import hawaiian from './../img/pizza/hawaiian.png';
import margherita from './../img/pizza/margherita.png';
import meatlovers from './../img/pizza/meatlovers.png';
import pepperoni from './../img/pizza/pepperoni.png';

import bruschetta from './../img/snack/bruschetta.png';
import buffaloWings from './../img/snack/buffalo-wings.png';
import chickenNuggets from './../img/snack/chicken-nuggets.png';
import frenchFries from './../img/snack/french-fries.png';
import mozzarellaSticks from './../img/snack/mozzarella-sticks.png';
import onionRings from './../img/snack/onion-rings.png';

import california from './../img/sushi/california.png';
import dragon from './../img/sushi/dragon.png';
import philadelphia from './../img/sushi/philadelphia.png';
import rainbow from './../img/sushi/rainbow.png';
import spider from './../img/sushi/spider.png';
import tekkaMaki from './../img/sushi/tekka-maki.png';

const dishes = [
  {
    dishId: 1,
    name: "Спайдер Рол",
    category: "Суші",
    description:
      "Суші з м'яким крабом, огірком, авокадо та спеціальним соусом, загорнуті в норі.",
    price: 180,
    image: spider,
  },
  {
    dishId: 2,
    name: "Рейнбоу Рол",
    category: "Суші",
    description:
      "Суші з різними видами риби, включаючи лосось, тунець та авокадо.",
    price: 200,
    image: rainbow,
  },
  {
    dishId: 3,
    name: "Текка Макі",
    category: "Суші",
    description: "Класичні суші з тунцем, загорнуті в норі з рисом.",
    price: 150,
    image: tekkaMaki,
  },
  {
    dishId: 4,
    name: "Дракон Рол",
    category: "Суші",
    description: "Суші з вугрем, авокадо та огірком, прикрашені соусом унагі.",
    price: 220,
    image: dragon,
  },
  {
    dishId: 5,
    name: "Каліфорнія Рол",
    category: "Суші",
    description: "Суші з крабом, авокадо та огірком, загорнуті в норі з рисом.",
    price: 160,
    image: california,
  },
  {
    dishId: 6,
    name: "Філадельфія Рол",
    category: "Суші",
    description:
      "Суші з лососем, сиром філадельфія та авокадо, загорнуті в норі.",
    price: 190,
    image: philadelphia,
  },
  {
    dishId: 7,
    name: "Баффало Крила",
    category: "Закуски",
    description:
      "Гострі курячі крильця, обсмажені до хрусткої скоринки, подаються з соусом.",
    price: 120,
    image: buffaloWings,
  },
  {
    dishId: 8,
    name: "Брускетта",
    category: "Закуски",
    description: "Італійські тости з помідорами, базиліком та оливковою олією.",
    price: 80,
    image: bruschetta,
  },
  {
    dishId: 9,
    name: "Цибулеві Кільця",
    category: "Закуски",
    description: "Хрусткі кільця цибулі, обсмажені до золотистої скоринки.",
    price: 70,
    image: onionRings,
  },
  {
    dishId: 10,
    name: "Курячі Нагетси",
    category: "Закуски",
    description: "Соковиті курячі нагетси, обсмажені до хрусткої скоринки.",
    price: 100,
    image: chickenNuggets,
  },
  {
    dishId: 11,
    name: "Моцарела Палички",
    category: "Закуски",
    description: "Сирні палички з моцарелою, обсмажені до хрусткої скоринки.",
    price: 90,
    image: mozzarellaSticks,
  },
  {
    dishId: 12,
    name: "Картопля Фрі",
    category: "Закуски",
    description: "Класична картопля фрі, обсмажена до хрусткої скоринки.",
    price: 50,
    image: frenchFries,
  },
  {
    dishId: 13,
    name: "Мітлаверс",
    category: "Піца",
    description:
      "Піца з різними видами м'яса, включаючи ковбасу, бекон та шинку, з сиром та томатним соусом.",
    price: 250,
    image: meatlovers,
  },
  {
    dishId: 14,
    name: "Гавайська",
    category: "Піца",
    description: "Піца з ананасом, шинкою та сиром, з томатним соусом.",
    price: 220,
    image: hawaiian,
  },
  {
    dishId: 15,
    name: "Діавола",
    category: "Піца",
    description:
      "Гостра піца з салямі, перцем чилі та сиром, з томатним соусом.",
    price: 230,
    image: diavola,
  },
  {
    dishId: 16,
    name: "Чотири Сири",
    category: "Піца",
    description:
      "Піца з чотирма видами сиру, включаючи моцарелу, пармезан, горгонзолу та едам.",
    price: 240,
    image: fourCheese,
  },
  {
    dishId: 17,
    name: "Пепероні",
    category: "Піца",
    description: "Класична піца з пепероні, сиром та томатним соусом.",
    price: 210,
    image: pepperoni,
  },
  {
    dishId: 18,
    name: "Маргарита",
    category: "Піца",
    description:
      "Класична піца з томатами, сиром та базиліком, з томатним соусом.",
    price: 200,
    image: margherita,
  },
  {
    dishId: 19,
    name: "Лимонад",
    category: "Напої",
    description: "Охолоджуючий лимонад з натуральним лимонним соком.",
    price: 40,
    image: lemonade,
  },
  {
    dishId: 20,
    name: "Мохіто",
    category: "Напої",
    description: "Освіжаючий мохіто з м'ятою, лаймом та содовою.",
    price: 50,
    image: mojito,
  },
  {
    dishId: 21,
    name: "Апельсиновий Сік",
    category: "Напої",
    description: "Свіжовижатий апельсиновий сік без додавання цукру.",
    price: 45,
    image: orangeJuice,
  },
  {
    dishId: 22,
    name: "Малиновий Напій",
    category: "Напої",
    description: "Напій з натуральним малиновим соком.",
    price: 35,
    image: raspberry,
  },
  {
    dishId: 23,
    name: "Вишневий Напій",
    category: "Напої",
    description: "Напій з натуральним вишневим соком.",
    price: 35,
    image: cherry,
  },
  {
    dishId: 24,
    name: "Полуничний Напій",
    category: "Напої",
    description: "Напій з натуральним полуничним соком.",
    price: 35,
    image: strawberry,
  },
  {
    dishId: 25,
    name: "Веганський Бургер",
    category: "Бургери",
    description: "Веганський бургер з овочевою котлетою, салатом та соусом.",
    price: 150,
    image: vegan,
  },
  {
    dishId: 26,
    name: "Гуакамоле Бургер",
    category: "Бургери",
    description: "Бургер з гуакамоле, яловичою котлетою та сиром.",
    price: 160,
    image: guacamole,
  },
  {
    dishId: 27,
    name: "Подвійний Бургер",
    category: "Бургери",
    description: "Бургер з двома яловичими котлетами, сиром та беконом.",
    price: 180,
    image: double,
  },
  {
    dishId: 28,
    name: "Бекон Бургер",
    category: "Бургери",
    description: "Бургер з яловичою котлетою, сиром та беконом.",
    price: 170,
    image: bacon,
  },
  {
    dishId: 29,
    name: "Курячий Бургер",
    category: "Бургери",
    description: "Бургер з курячою котлетою, салатом та соусом.",
    price: 160,
    image: chicken,
  },
  {
    dishId: 30,
    name: "Класичний Бургер",
    category: "Бургери",
    description: "Класичний бургер з яловичою котлетою, сиром та салатом.",
    price: 140,
    image: classic,
  },
];

export default dishes;