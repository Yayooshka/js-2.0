export default Vue.component('goods-item', {
    props: [
      'item'
    ],
    template: `
    <div class="goods-item">
      <h3>{{ this.product_name }}</h3>
      <p>{{ this.price }}</p>
      <div>
        <custom-button @click="addGood">Добавить</custom-button>
      </div>
    </div>
    `,
    methods: {
      addGood() {
        serviceWithBody(GOODS, "POST", {
          id: this.item.id
      })},
        deleteGood() {
          serviceWithBody(GOODS, "DELETE", {
            id: this.item.id
        }
        )
      }
    }
  },)