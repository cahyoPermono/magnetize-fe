<template>
  <Card>
    <template #title>
      Pendidikan Non Formal
      <span>
        <small> <i>(Non Formal Education)</i></small>
      </span>
    </template>
    <template #content>
      <Button @click="openModal" label="Tambah Pendidikan Nonformal" />
      <Dialog
        @update:visible="store.nonFormalEducate = {}"
        header="Pendidikan Non-Formal"
        v-model:visible="displayModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '80vw' }"
        :modal="true"
      >
        <Form v-slot="{ meta }">
          <div class="form-page">
            <div class="mt-2">
              <div class="grid">
                <label for="course" class="col-2">
                  <small>Nama Kursus / Training / Workshop</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="course"
                    v-model="store.nonFormalEducate.course"
                  >
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
            <div class="mt-2">
              <div class="grid">
                <label for="year" class="col-2">
                  <small>Tahun</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="year"
                    v-model="store.nonFormalEducate.year"
                  >
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
            <div class="mt-2">
              <div class="grid">
                <label for="duration" class="col-2">
                  <small>Durasi</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="duration"
                    v-model="store.nonFormalEducate.duration"
                  >
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
            <div class="mt-2">
              <div class="grid">
                <label for="sponsored_by" class="col-2">
                  <small>Di Biayai Oleh</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="sponsored_by"
                    v-model="store.nonFormalEducate.sponsored_by"
                  >
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
          </div>
          <div class="flex justify-content-end mt-4">
            <Button label="No" icon="pi pi-times" @click="openModal" class="p-button-text" />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="addNonFormal()"
              :disabled="!(meta.valid && meta.dirty)"
            />
          </div>
        </Form>
      </Dialog>
      <div class="mt-4 flex justify-content-center">
        <div class="grid w-full">
          <div class="col-4" v-for="(data, index) in store.nonFormalEducatePool" :key="index">
            <Card>
              <template #header>
                <div class="flex px-3 pt-1">
                  <p class="text-lg">
                    {{ data.course }}
                  </p>
                  <p class="cursor-pointer ml-3">
                    <i
                      @click="cancel(index, store.nonFormalEducatePool)"
                      class="pi pi-trash text-xs"
                    >
                    </i>
                  </p>
                </div>
              </template>
              <template #content>
                <div class="text-sm">
                  <table border="0">
                    <tr>
                      <td>Tahun</td>
                      <td>:</td>
                      <td>{{ data.year }}</td>
                    </tr>
                    <tr>
                      <td>Durasi</td>
                      <td>:</td>
                      <td>{{ data.duration }}</td>
                    </tr>
                    <tr>
                      <td>Di Sponsori Oleh</td>
                      <td>:</td>
                      <td>{{ data.sponsored_by }}</td>
                    </tr>
                  </table>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <Button class="p-button-sm" icon="pi pi-arrow-left" @click="$emit('back')" />
        <Button class="p-button-sm" icon="pi pi-arrow-right" @click="$emit('next')" />
      </div>
    </template>
  </Card>
</template>

<script setup>
/***************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

/***************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
const emits = defineEmits(["next", "back"]);
const displayModal = ref(false);

const openModal = () => {
  displayModal.value = !displayModal.value;
  store.nonFormalEducate = {};
};

const addNonFormal = () => {
  store.nonFormalEducatePool.push(store.nonFormalEducate);
  openModal();
};

/***************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const cancel = (index, arr) => {
  arr.splice(index, 1);
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
