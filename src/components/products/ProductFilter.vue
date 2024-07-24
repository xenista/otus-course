<script setup>
import { ref } from "vue"
const emit = defineEmits(['search'])
defineProps({
    categories: Object
})
const priceRange = ref([0, 0])
const categorySelected = ref(null)
const filter = ref({
  priceMin: null,
  priceMax: null,
  title_like: null,
  categoryId: null
})

function clearFilter () {
  categorySelected.value = null
  filter.value = {
    price_gte: null,
    price_lte: null,
    priceMax: null,
    title_like: null,
    categoryId: null
  }
  priceRange.value = [0, 0]
  filter.value.price_gte = 0
  filter.value.price_lte = 0
  emit('search', {...filter.value})
}

function searchProducts() {
  if(categorySelected.value?.id) {
    filter.value.categoryId = categorySelected.value.id
  }
  if(priceRange.value[0] === 0 && priceRange.value[1] === 0) {
    filter.value.price_gte = null
    filter.value.price_lte = null
  }
  else {
    filter.value.price_gte = priceRange.value[0]
    filter.value.price_lte = priceRange.value[1]
  }
  emit('search', {...filter.value})
}

</script>

<template>
  <v-card class="pa-5 mb-12">
    <v-row>
      <v-col cols="4">
        <v-select
          label="Категории"
          :items="categories"
          return-object
          v-model="categorySelected"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Название"  v-model="filter.title_like" clearable ></v-text-field>
      </v-col>
      <v-col cols="4">
        <label>Цена</label>
        <v-range-slider
          v-model="priceRange"
          step="10"
          thumb-label="always"
          min="0"
          max="5000"
          color="deep-purple-lighten-1"
        ></v-range-slider>
        
      </v-col>
      
    </v-row>
      <v-btn variant="flat" color="primary" class="mb-0 me-4" @click="searchProducts()">
        Поиск
      </v-btn>
      <v-btn variant="flat" class="mb-0" @click="clearFilter()">
        Сброс
      </v-btn>
      </v-card>
</template>