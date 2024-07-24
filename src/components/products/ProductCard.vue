<script setup>
    defineProps({
        product: Object
    })
   const emit = defineEmits(['openModal'])
</script>

<template>
    <v-card
    class="mx-auto product-card"
    max-width="374"
  >

    <v-img
      height="250"
      :src="product.image"
      
    ></v-img>

    <v-card-item>
      <v-card-title>{{ product.title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ product.category?.title}}</span>

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
          :model-value="product.rating?.rate"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4" v-if="product.rating">
          {{product.rating?.rate}} ({{product.rating?.count}})
        </div>
        <div class="text-grey ms-4" v-else>
          Нет голосов
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">₽ {{product.price}}
      </div>

      <p class="product-description">{{product.description}}</p>
    </v-card-text>


        <v-card-actions class="mt-auto" >
         <v-btn
          color="deep-purple-lighten-1"
          text="Заказ в 1 клик" 
          @click="emit('openModal', product)"
        ></v-btn>
      <v-btn
        icon="mdi-cart"
        class="ms-auto"
        color="deep-purple-lighten-2"
        text="В корзину"
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