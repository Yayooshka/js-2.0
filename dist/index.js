/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const BASE_URL = 'http://localhost:8000/';\nconst GOODS = `${BASE_URL}goods`\nconst GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`\nconst GET_BASKET_GOODS_ITEMS = `${BASE_URL}basket`\n\nfunction service(url) {\n  return fetch(url)\n  .then((res) => res.json())\n}\n\nfunction serviceWithBody(url, body) {\n  return fetch(url, {\n      method: 'POST',\n      headers: {\n        \"Content-type\": \"application/json\"\n      },\n      body: JSON.stringify(body)\n    })\n}\n\nfunction init() {\n\n  Vue.component('basket-item', {\n    props: [\n      'item'\n    ],\n    template: `\n    <div class=\"basket-item\">\n      <div class=\"basket-item_field\">\n      <span class=\"basket-item__title\">{{ item.data.product_name }}</span>\n      <span class=\"basket-item__price\">( {{ item.data.price }}р. )</span>\n    </div>\n     <div class=\"basket-item__count\">\n       <span>{{ item.count }}шт.</span>\n       <button @click = \"$emit('add', item.id)\">+</button>\n       <button>-</button>\n     </div>\n     <div class=\"basket-item__total\">Всего: {{ item.total }}р.</div>\n  </div>\n    `\n    \n  })\n\n  Vue.component('custom-search', {\n    template: `\n      <input type=\"text\" class=\"goods-search\" @input=\"$emit('input', $event.target.value\")>\n    `\n  })\n  const CustomButton = Vue.component('custom-button', {\n      template: `\n      <button class=\"search-button\" type=\"button\" v-on:click=\"$emit('click')\">\n      <slot></slot>\n      </button>\n      `\n  })\n  const basketGoods = Vue.component('basket-goods', {\n    data() {\n      return {\n        basketGoodsItems: []\n      }\n    },\n\n    template: `\n    <div class=\"fixed-area\">\n      <div class=\"basket-card\">\n        <div class=\"basket-card__header\">\n          <h1 class=\"basket-card__header__title\">basket card</h1>\n          <div class=\"basket-card__header__delete-icon\"\n            v-on:click=\"$emit('closeclick')\">\n          </div>\n        </div>\n        <div class=\"basket-card__content\">\n          <basket-item\n          v-for=\"item in basketGoodsItems\"\n          :item=\"item\"\n          @add=\"addGood\"\n        </div>\n      </div>\n    </div>\n    `,\n    mounted() {\n      service(GET_BASKET_GOODS_ITEMS).then(() => {\n        this.basketGoodsItems = data\n      })\n    }, \n    methods: {\n      addGood(id) {\n        serviceWithBody(GET_BASKET_GOODS_ITEMS, \"POST\", {\n          id\n        }).then((data) => {\n          this.basketGoodsItems = data;\n        })\n      }\n    }\n  })\n\n  const goodsItem = Vue.component('goods-item', {\n    props: [\n      'item'\n    ],\n    template: `\n    <div class=\"goods-item\">\n      <h3>{{ this.product_name }}</h3>\n      <p>{{ this.price }}</p>\n      <div>\n        <custom-button @click=\"addGood\">Добавить</custom-button>\n      </div>\n    </div>\n    `,\n    methods: {\n      addGood() {\n        serviceWithBody(GOODS, \"POST\", {\n          id: this.item.id\n      })},\n        deleteGood() {\n          serviceWithBody(GOODS, \"DELETE\", {\n            id: this.item.id\n        }\n        )\n      }\n    }\n  },)\n\n  const app = new Vue({\n    el: '#root',\n    data: {\n      items: [],\n      search: '',\n      cardIsVision: false\n    },\n    methods: {\n      setVisionCard() {\n        this.cardIsVision = !this.cardIsVision\n      },\n      fetchGoods() {\n        service(GET_GOODS_ITEMS).then((data) => {\n          this.items = data;\n          this.filteredItems = data;\n        });\n      }\n    },\n    computed: {\n      calcucatePrice() {\n       return this.filteredItems.reduce((prev, { price }) => {\n          return prev + price;\n        }, 0)\n      },\n      filteredItems() {\n        return this.items.filter(({ product_name }) => {\n          return product_name.match(new RegExp(this.search, 'gui'))\n        })\n      }\n    },\n\n    mounted() {\n      this.fetchGoods();\n    }\n  })\n}\n\nwindow.onload = init\n\n\n//# sourceURL=webpack://js-2.0/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;