<script setup>
import ProductCard from '../components/products/ProductCard.vue'
import { ref } from "vue"
const loading = ref(true)
const products = ref([])

async function fetchProducts() {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:3000/products');
    products.value = await response.json();
    loading.value = false
  } catch (error) {
    console.error(error);
    loading.value = false
  }
}
setTimeout(() => {
  fetchProducts()
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
        <product-card :product="product" :loading="loading"/>
      </v-col>
    </v-row>
    <p v-else>Товаров нет</p>
  </v-container>
</template>

<style scoped>
</style>
