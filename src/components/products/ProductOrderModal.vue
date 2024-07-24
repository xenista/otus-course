<script setup>
import { ref, watch, watchEffect, toRef, reactive } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup';
import { saveOrder } from '@/services/orderService'
import { mask as vMask } from 'vue-the-mask'

const props = defineProps({
    showOrderModal: Boolean,
    product: Object
})
const emit = defineEmits(['dialogClose'])
const isActiveSuccessOrderModal = ref(false)
const dialog = ref(false)

// Преобразование showOrderModal в реактивное свойство
const showOrderModal = toRef(props, 'showOrderModal')
const orderInfo = reactive({
    productId: null,
    fio: '',
    age: '',
    phone: '',
    email: '',
    agreement: false
})
const phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/
const validationSchema = yup.object({
  fio: yup.string().required('ФИО обязательно'),
  age: yup.string().required('Возраст обязателен'),
  phone: yup.string().matches(phoneRegExp, 'Телефон должен быть в формате +7(ххх)ххх-хх-хх').required('Телефон обязателен'),
  email: yup.string().email('Неправильный формат E-mail').required('E-mail обязателен'),
  agreement: yup.boolean().oneOf([true], 'Вы должны согласиться с правилами обработки заказа').required()
})

const { values, errors, defineField, validateField, resetForm } = useForm({
  validationSchema,
  initialValues: orderInfo
})


const [fio, fioProps] = defineField('fio')
const [age, ageProps] = defineField('age')
const [phone, phoneProps] = defineField('phone')
const [email, emailProps] = defineField('email')
const [agreement, agreementProps] = defineField('agreement')

watch(showOrderModal, (newVal) => {
  dialog.value = newVal
})

watch(() => props.product, (newVal) => {
  orderInfo.productId = newVal?.id ?? null
})

// Наблюдение за изменением dialog
watch(dialog, (newVal) => {
  if (!newVal) {
    emit('dialogClose')
  }
})

const handleBlur = (field) => {
  validateField(field)
}

async function sendOrder () {
  console.log('tetst')
  const order = { ...values }
  order.productId = orderInfo.productId
  try {
    // loading.value = true;
    await saveOrder(order)
    dialog.value = false
    isActiveSuccessOrderModal.value = true
    resetForm()
  } catch (error) {
    console.error(error);
  }
  finally {
    // loading.value = false
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
    @update:modelValue="(newVal) => dialog = newVal"
  >
    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-cart" title="Отправить заказ">
        <form @submit.prevent="sendOrder" :validation-schema="validationSchema"  @invalid-submit="onInvalidSubmit">
        <v-card-text>
          <p class="mb-6">Товар: {{ product.title }}</p>
          
            <v-text-field class="mb-3"
              label="ФИО*"
              required
              v-model="fio"
              @blur="handleBlur('fio')"
              :error-messages="errors.fio ? errors.fio : []"
            ></v-text-field>
            <v-text-field class="mb-3"
              label="E-mail*"
              required
              v-model="email"
              @blur="handleBlur('email')"
              :error-messages="errors.email ? errors.email : []"
            ></v-text-field>
            <v-text-field  class="mb-3"
              label="Телефон*"
              required
              v-model="phone"
              v-mask="'+7(###)###-##-##'"
              @blur="handleBlur('phone')"
              :error-messages="errors.phone ? errors.phone : []"
            ></v-text-field>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Возраст*"
                  required
                  v-model="age"
                  @blur="handleBlur('age')"
                  :error-messages="errors.age ? errors.age : []"
                ></v-select>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="agreement"
              label="Согласен с правилами обработки заказа"
              @blur="handleBlur('agreement')"
              :error-messages="errors.agreement ? errors.agreement : []"
            ></v-checkbox>
            <small class="text-caption text-medium-emphasis">* Обязательные поля</small>
            
         
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text="Отправить"
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
   <v-dialog max-width="500" v-model="isActiveSuccessOrderModal">
      <v-card title="Заказ отправлен">
        <v-card-text>
          Ваш заказ на товар "{{ product.title }}" принят. Ожидайте звонка.
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            text="Закрыть"
            @click="isActiveSuccessOrderModal = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>