<template>
  <div class="mx-3">
    <Button icon="pi pi-plus" label="tambah saudara" class="mt-2" @click="openModal" />
    <div class="grid mt-3">
      <div class="col-4" v-for="(data, index) in dataSaudara" :key="index">
        <Card>
          <template #title> Saudara {{ index + 1 }} </template>
          <template #content>
            <div class="block">
              <p>Nama : {{ data.name }}</p>
              <p>tanggal lahir : {{ data.date }}</p>
              <p>pendidikan : {{ data.education }}</p>
              <p>pekerjaan : {{ data.occupation_company }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <Dialog
      header="Header"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '80vw' }"
      :modal="true"
    >
      <div>
        <div class="text-center">
          <h3>Tambah Saudara</h3>
        </div>
        <Form @submit="addSaudara">
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="nama" class="col-2">
                <small>nama :</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="nama">
                  <InputText
                    v-bind="field"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="ttl" class="col-2">
                <small>Tanggal Lahir :</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="ttl">
                  <InputText
                    v-bind="field"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                    type="date"
                  />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="pendidikan" class="col-2">
                <small>pendidikan :</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="pendidikan">
                  <InputText
                    v-bind="field"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="pekerjaan" class="col-2">
                <small>pekerjaan :</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="pekerjaan">
                  <InputText
                    v-bind="field"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="gender" class="col-2">
                <small>gender :</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="gender">
                  <Dropdown
                    :options="gender"
                    option-value="val"
                    option-label="label"
                    :model-value="field.value"
                    class="w-full"
                    @input="field.onInput.forEach((fn) => fn($event.value))"
                    @change="field.onChange.forEach((fn) => fn($event.value))"
                  />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <Button label="No" icon="pi pi-times" @click="openModal" class="p-button-text" />
          <Button label="Yes" icon="pi pi-check" type="submit" role="submit" />
        </Form>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const displayModal = ref(false);

const openModal = () => {
  displayModal.value = !displayModal.value;
};

const gender = [
  { val: "P", label: "Perempuan" },
  { val: "L", label: "laki-laki" },
];
const dataSaudara = computed(() => {
  return data_.dataSaudara.slice(2);
});

const data_ = defineProps({
  dataSaudara: [],
});
const addSaudara = (value) => {
  const data = {
    member: "saudara",
    name: value.nama,
    date: value.ttl,
    education: value.pendidikan,
    occupation_company: value.pekerjaan,
    occupation_company: value.pekerjaan,
    gender: value.gender,
  };
  data_.dataSaudara.push(data);
  openModal();
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
