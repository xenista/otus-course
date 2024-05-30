<script setup>
    defineProps({
        product: Object
    })
</script>

<template>
    <v-card
    class="mx-auto product-card"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="product.image"
      
    ></v-img>

    <v-card-item>
      <v-card-title>{{ product.title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ product.category}}</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="product.rating.rate"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          {{product.rating.rate}} ({{product.rating.count}})
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">₽ {{product.price}}
      </div>

      <p class="product-description">{{product.description}}</p>
    </v-card-text>


    <v-card-actions class="mt-auto">
      <v-btn
        color="deep-purple-lighten-2"
        text="В корзину"
        block
        border
      ></v-btn>
    </v-card-actions>
    </v-card>
</template>

<style scoped>
.product-description{
  display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
}
.product-card{
  height: 100%;
}
</style>