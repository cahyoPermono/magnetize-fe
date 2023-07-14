<template>
  <div>
    <!--
          v-model yang di dropdown untuk menampilkan data
          v-model di field untuk menyimpan data
      -->
    <Field :name="props.name" v-slot="{ field, errorMessage }" :rules="props.rules">
      <InputText
        v-bind="field"
        aria-describedby="email-help"
        :class="{ 'p-invalid': errorMessage }"
        class="block w-full"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
    </Field>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  rules: {
    required: false,
  },
  placeholder: String,
  disabled: Boolean,
});
</script>
