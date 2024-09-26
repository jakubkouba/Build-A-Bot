import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const cartTotal = computed(() => cart.value.reduce((prev, current) => prev + current.cost, 0));

  return { cart, cartTotal };
});

export default useCartStore;
