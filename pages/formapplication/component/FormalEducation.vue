<template>
  <Card>
    <template #title>
      Pendidikan Formal<span><small> (Formal Education)</small></span>
    </template>
    <template #content>
      <Button label="Tambah Data Pendidikan Formal" @click="openModal" />
      <Dialog
        @update:visible="store.formalEducate = {}"
        header="Header"
        v-model:visible="displayModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '80vw' }"
        :modal="true"
      >
        <Form v-slot="{ meta }">
          <div class="form-page">
            <div class="mt-2">
              <div class="grid">
                <label for="level" class="col-2">
                  <small>Level</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field name="level" v-model="store.formalEducate.level">
                    <Dropdown
                      class="w-full"
                      v-model="store.formalEducate.level"
                      :options="levels"
                      optionValue="code"
                      optionLabel="level_name"
                      placeholder="Select a Level"
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="name_location" class="col-2">
                  <small>Sekolah / Perguruan Tinggi</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="name_location"
                    v-model="store.formalEducate.name_location"
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
                <label for="location" class="col-2">
                  <small>Lokasi</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="location"
                    v-model="store.formalEducate.location"
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
                <label for="major" class="col-2">
                  <small>Jurusan</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="major"
                    v-model="store.formalEducate.major"
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
                <label for="entry" class="col-2">
                  <small>Tahun Masuk</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="entry"
                    v-model="store.formalEducate.entry"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      type="month"
                      class="block w-full"
                    />
                    <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="graduate" class="col-2">
                  <small>Tahun Lulus</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="graduate"
                    v-model="store.formalEducate.graduate"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      type="month"
                      class="block w-full"
                    />
                    <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="ip_rata" class="col-2">
                  <small>IPK / Nilai Rata-Rata</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="ip_rata"
                    v-model="store.formalEducate.ip_rata"
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
              @click="addFormalEducation()"
              :disabled="!(meta.valid && meta.dirty)"
            />
          </div>
        </Form>
      </Dialog>
      <div class="flex justify-content-center">
        <div class="grid w-full mt-4">
          <div class="col-3" v-for="(data, index) in store.formalEducatePool" :key="index">
            <Card class="shadow-3 surface-200 p-2">
              <template #header>
                <div class="flex">
                  <p class="text-lg">
                    {{ data.level }}
                  </p>
                  <p class="cursor-pointer ml-3">
                    <i
                      @click="cancelEdu(index, store.formalEducatePool)"
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
                      <td>sekolah/universitas</td>
                      <td>:</td>
                      <td>{{ data.name_location }}</td>
                    </tr>
                    <tr>
                      <td>Lokasi</td>
                      <td>:</td>
                      <td>{{ data.location }}</td>
                    </tr>
                    <tr>
                      <td>Jurusan</td>
                      <td>:</td>
                      <td>{{ data.major }}</td>
                    </tr>
                    <tr>
                      <td>Tahun Masuk</td>
                      <td>:</td>
                      <td>{{ data.entry }}</td>
                    </tr>
                    <tr>
                      <td>Tahun Lulus</td>
                      <td>:</td>
                      <td>{{ data.graduate }}</td>
                    </tr>
                    <tr>
                      <td>IPK/Nilai Rata-Rata</td>
                      <td>:</td>
                      <td>{{ data.ip_rata }}</td>
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
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-right"
          @click="$emit('next')"
          :disabled="store.formalEducatePool.length < 1"
        />
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
  store.formalEducate = {};
};

const addFormalEducation = () => {
  store.formalEducatePool.push(store.formalEducate);
  openModal();
};

/***************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const levels = [
  { level_name: "Pasca Sarjana (S2)", code: "S2" },
  { level_name: "Sarjana (S1)", code: "S1" },
  { level_name: "Akademi (D3)", code: "D3" },
  { level_name: "SMA/SMK/SMU/SLTA", code: "SMA/SMK/SMU/SLTA" },
  { level_name: "SMP/SLTP", code: "SMP/SLTP" },
];

const cancelEdu = (index, arr) => {
  arr.splice(index, 1);
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

</script>
