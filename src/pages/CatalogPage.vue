<script setup>
import ProductCard from '@/components/products/ProductCard.vue'
import ProductFilter from '@/components/products/ProductFilter.vue'
import ProductOrderModal from '@/components/products/ProductOrderModal.vue'
import AddProductModal from '@/components/products/AddProductModal.vue'
import { fetchProducts, fetchCategories } from '@/services/productService'
import { ref } from "vue"

const loading = ref(true)
const products = ref([])
const showOrderModal = ref(false)
const chosenProductToOrder = ref({})
const categories = ref([])

async function loadProducts(filter = {}) {
  try {
    loading.value = true;
    products.value = await fetchProducts(filter);
  } catch (error) {
    console.error(error);
  }
  finally {
    loading.value = false
  }
}
async function loadCategories() {
  try {
    categories.value = await fetchCategories();
  } catch (error) {
    console.error(error);
  }
  finally {
  }
}

function searchProducts(filterObject) {
  loadProducts(filterObject)
}
function openModal(product) {
  showOrderModal.value = true
  chosenProductToOrder.value = {...product}
}


setTimeout(() => {
  loadProducts()
  loadCategories()
}, 1000)


</script>

<template>
   <v-container>
    <div class="d-flex align-center mb-10">
      <h1 class="mb-5">Каталог товаров</h1>
      <add-product-modal :categories="categories" @onProductSaved="loadProducts"/>
    </div>
    <product-filter @search="searchProducts" :categories="categories"/>
    <v-row v-if="loading">
      <v-col cols="4" v-for="index in 7" :key="index">
        <v-skeleton-loader type="image, heading, paragraph, button">
        </v-skeleton-loader>
      </v-col>
    </v-row >
    <v-row v-else-if="!loading && products.length > 0">
      <v-col cols="4" v-for="product in products" :key="product.id">
        <product-card :product="product" @openModal="openModal"/>
      </v-col>
    </v-row>
    <p v-else>Товаров нет</p>
  </v-container>
  <product-order-modal :showOrderModal="showOrderModal" @dialogClose = "showOrderModal = false" :product="chosenProductToOrder"/>
</template>

<style scoped>
</style>
