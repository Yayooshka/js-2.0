export default Vue.component('basket-goods', {
    data() {
      return {
        basketGoodsItems: []
      }
    },

    template: `
    <div class="fixed-area">
      <div class="basket-card">
        <div class="basket-card__header">
          <h1 class="basket-card__header__title">basket card</h1>
          <div class="basket-card__header__delete-icon"
            v-on:click="$emit('closeclick')">
          </div>
        </div>
        <div class="basket-card__content">
          <basket-item
          v-for="item in basketGoodsItems"
          :item="item"
          @add="addGood"
        </div>
      </div>
    </div>
    `,
    mounted() {
      service(GET_BASKET_GOODS_ITEMS).then(() => {
        this.basketGoodsItems = data
      })
    }, 
    methods: {
      addGood(id) {
        serviceWithBody(GET_BASKET_GOODS_ITEMS, "POST", {
          id
        }).then((data) => {
          this.basketGoodsItems = data;
        })
      }
    }
  })