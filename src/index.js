import './style.css';
import './components/BasketItem';
import './components/CustomSearch';
import './components/CustomButton';
import './components/BasketGoods';
import './components/GoodsItem';
import {BASE_URL, GOODS, GET_GOODS_ITEMS, GET_BASKET_GOODS_ITEMS} from './constants.js'
import {service, serviceWithBody} from './services.js'


function init() {

  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      search: '',
      cardIsVision: false
    },
    methods: {
      setVisionCard() {
        this.cardIsVision = !this.cardIsVision
      },
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      }
    },
    computed: {
      calcucatePrice() {
       return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      }
    },

    mounted() {
      this.fetchGoods();
    }
  })
}

window.onload = init
