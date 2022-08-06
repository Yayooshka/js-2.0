export default Vue.component('custom-search', {
    template: `
      <input type="text" class="goods-search" @input="$emit('input', $event.target.value")>
    `
  })