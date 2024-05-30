<script setup>
import ProductCard from '@/components/products/ProductCard.vue'
import { fetchProducts } from '@/services/productService'
import { ref } from "vue"

const loading = ref(true)
const products = ref([])

async function loadProducts() {
  try {
    loading.value = true;
    products.value = await fetchProducts();
  } catch (error) {
    console.error(error);
  }
  finally {
    loading.value = false
  }
}
setTimeout(() => {
  loadProducts()
}, 2000)


</script>

<template>
   <v-container>
    <h1 class="mb-12">Каталог товаров</h1>
    <v-row v-if="loading">
      <v-col cols="4" v-for="index in 7" :key="index">
        <v-skeleton-loader type="image, heading, paragraph, button">
        </v-skeleton-loader>
      </v-col>
    </v-row >
    <v-row v-else-if="!loading && products.length > 0">
      <v-col cols="4" v-for="product in products" :key="product.id">
        <product-card :product="product"/>
      </v-col>
    </v-row>
    <p v-else>Товаров нет</p>
  </v-container>
</template>

<style scoped>
</style>
