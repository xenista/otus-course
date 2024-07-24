<script setup>
import { ref, watch, watchEffect, toRef, reactive } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup';
import { saveProduct } from '@/services/productService'
import { mask as vMask } from 'vue-the-mask'

const props = defineProps({
    product: Object,
    categories: Object
})
const emit = defineEmits(['dialogClose', 'onProductSaved'])
const savedProductTitle = ref('')
const dialog = ref(false)
const isActiveSuccessModal = ref(false)
const phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/
const validationSchema = yup.object({
  title: yup.string().required('Название товара обязательно'),
  description: yup.string().required('Описание товара обязателено'),
  image: yup.string().required('Фото товара обязателено'),
  price: yup.string().required('Цена обязательна'),
  categoryId: yup.number().required('Обязательное поле')
})

const { values, errors, defineField, validateField, resetForm } = useForm({
  validationSchema
})

const [title, titleProps] = defineField('title')
const [description, descriptionProps] = defineField('description')
const [image, imageProps] = defineField('image')
const [price, priceProps] = defineField('price')
const [categoryId, categoryIdProps] = defineField('categoryId')

watch(() => props.product, (newVal) => {
  orderInfo.productId = newVal?.id ?? null
})

// Наблюдение за изменением dialog
watch(dialog, (newVal) => {
  if (!newVal) {
    emit('dialogClose')
  }
})

const closeSuccessWindow = () => {
  isActiveSuccessModal.value = false
  emit('onProductSaved')
}

const handleBlur = (field) => {
  validateField(field)
}

async function addProduct () {
  const product = { ...values }
  try {
    savedProductTitle.value = product.title
    await saveProduct(product)
    dialog.value = false
    resetForm()
    isActiveSuccessModal.value = true
  } catch (error) {
    console.error(error);
  }
  finally {
  }
}
function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}



</script>
<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    
  >
    <template v-slot:activator="{ props: activatorProps }">
        <v-btn
        v-bind="activatorProps"
        text="Добавить товар"
        prepend-icon="$plus" variant="flat" color="purple-lighten-1" class="ml-auto"
        ></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-package" title="Добавить товар">
        <form @submit.prevent="addProduct" :validation-schema="validationSchema"  @invalid-submit="onInvalidSubmit">
        <v-card-text>          
            <v-text-field class="mb-3"
              label="Название*"
              required
              v-model="title"
              @blur="handleBlur('title')"
              :error-messages="errors.title ? errors.title : []"
            ></v-text-field>
            <v-textarea
                label="Описание*"
                required
                v-model="description"
                @blur="handleBlur('description')"
                :error-messages="errors.description ? errors.description : []">
            </v-textarea>
             <v-text-field class="mb-3"
              label="Путь до фото товара*"
              required
              v-model="image"
              @blur="handleBlur('image')"
              :error-messages="errors.image ? errors.image : []"
            ></v-text-field>
            <v-select class="mb-3"
                label="Категория"
                :items="categories"

                item-value="id"
                item-text="title"
                v-model="categoryId"
                @blur="handleBlur('categoryId')"
                :error-messages="errors.categoryId ? errors.categoryId : []"
                ></v-select>
            <v-text-field class="mb-3"
              label="Цена*"
              required
              v-model="price"
              @blur="handleBlur('price')"
              prefix="₽"
              type="number"
              :error-messages="errors.price ? errors.price : []"
            ></v-text-field>

            
            <small class="text-caption text-medium-emphasis">* Обязательные поля</small>
            
         
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text="Добавить"
              variant="tonal"
              :disabled="Object.keys(errors).length > 0"
              type="submit"
            ></v-btn>
          <v-btn text="Закрыть" variant="plain" @click="dialog = false"></v-btn>
        </v-card-actions>
         </form>
      </v-card>
    </template>
  </v-dialog>
  <v-dialog max-width="500" v-model="isActiveSuccessModal">
      <v-card title="Товар добавлен">
        <v-card-text>
          Товар "{{ savedProductTitle }}" добавлен
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            text="Закрыть"
            @click="closeSuccessWindow"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>