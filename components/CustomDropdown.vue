<template>
  <div>
    <!--
        v-model yang di dropdown untuk menampilkan data
        v-model di field untuk menyimpan data
    -->
    <Field :name="props.fieldName" v-model="value" :rules="props.rules" @change="change()">
      <Dropdown
        class="w-full"
        v-model="value"
        :options="props.options"
        :optionLabel="props.optionLabel"
        :optionValue="props.optionValue"
      />
    </Field>
  </div>
</template>

<script setup>
const props = defineProps({
  fieldName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
  },
  options: {
    type: Object,
    required: true,
  },
  rules: {
    required: false,
  },
  optionLabel: String,
  optionValue: String,
  modelValue: String,
});
const emit = defineEmits(["update:modelValue", "change"]);
const change = () => {
  emit("change");
  console.log("betul")
};
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
