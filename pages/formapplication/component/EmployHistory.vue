<template>
  <Card>
    <template #title>
      Riwayat Pekerjaan<span
        ><small><i> (Mulai dari pekerjaan pertama s/d pekerjaan terakhir)</i></small></span
      >
    </template>
    <template #content> 
      <Button
        @click="openModal"
        label="Tambah Riwayat Pekerjaan"
        v-tooltip.right="'Klik untuk menambahkan'"
      />
      <Dialog
        header="Riwayat Pekerjaan"
        @update:visible="store.employmentHistory = {}"
        v-model:visible="displayModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '80vw' }"
        :modal="true"
      >
        <Form v-slot="{ meta }">
          <div>
            <div class="mt-2">
              <div class="grid">
                <label for="start" class="col-2">
                  <small>Bulan / Tahun Mulai</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="start"
                    v-model="store.employmentHistory.start"
                  >
                    <InputText
                      type="month"
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                    />
                    <small id="start-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="end" class="col-2">
                  <small>Bulan / Tahun Selesai</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="end"
                    v-model="store.employmentHistory.end"
                  >
                    <InputText
                      type="month"
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                    />
                    <small id="end-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="name_company" class="col-2">
                  <small>Nama Perusahaan</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="name_company"
                    v-model="store.employmentHistory.name_company"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                    />
                    <small id="name_company-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="position" class="col-2">
                  <small>Jabatan</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="position"
                    v-model="store.employmentHistory.position"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                    />
                    <small id="position-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="direct_supervisor" class="col-2">
                  <small>Atasan Langsung/Jabatan</small><span style="color: red">*</span>
                </label>
                <div class="col-5">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="direct_supervisor"
                    v-model="store.employmentHistory.direct_supervisor"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                      placeholder="nama"
                    />
                    <small id="direct_supervisor-help" class="p-error block">{{
                      errorMessage
                    }}</small>
                  </Field>
                </div>
                <div class="col-5">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="direct_supervisor_position"
                    v-model="store.employmentHistory.direct_supervisor_position"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                      placeholder="jabatan"
                    />
                    <small id="direct_supervisor_position-help" class="p-error block">{{
                      errorMessage
                    }}</small>
                  </Field>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="take_home_pay" class="col-2">
                  <small>Gaji per Bulan</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <InputNumber
                    mode="currency"
                    currency="IDR"
                    locale="id-ID"
                    v-model="store.employmentHistory.take_home_pay"
                    :minFractionDigits="0"
                    name="take_home_pay"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="grid">
                <label for="reason_leaving" class="col-2">
                  <small>Alasan Keluar</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="reason_leacing"
                    v-model="store.employmentHistory.reason_leaving"
                  >
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="block w-full"
                    />
                    <small id="reason_leacing-help" class="p-error block">{{ errorMessage }}</small>
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-content-end">
            <Button label="No" icon="pi pi-times" @click="openModal" class="p-button-text" />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="addhistory()"
              :disabled="!(meta.valid && meta.dirty)"
            />
          </div>
        </Form>
      </Dialog>
      <div class="flex justify-content-center">
        <div class="grid w-full">
          <div class="col-4 mt-3" v-for="(data, index) in store.employmentHistoryPool" :key="index">
            <Card class="p-3 surface-200">
              <template #header>
                <div class="flex px-3 pt-1">
                  <p class="text-lg">
                    {{ data.position }}
                  </p>
                  <p class="cursor-pointer ml-3">
                    <i @click="cancel(index, store.employmentHistoryPool)" class="pi pi-trash text-xs">
                    </i>
                  </p>
                </div>
              </template>
              <template #content>
                <table border="0" class="m-0">
                  <tr>
                    <td>Mulai</td>
                    <td>:</td>
                    <td>{{ data.start }}</td>
                  </tr>
                  <tr>
                    <td>Selesai</td>
                    <td>:</td>
                    <td>{{ data.end }}</td>
                  </tr>
                  <tr>
                    <td>Nama Perusahaan</td>
                    <td>:</td>
                    <td>{{ data.name_company }}</td>
                  </tr>
                  <tr>
                    <td>Atasan</td>
                    <td>:</td>
                    <td>{{ data.direct_supervisor }}</td>
                  </tr>
                  <tr>
                    <td>Total Gaji</td>
                    <td>:</td>
                    <td>{{ data.take_home_pay }}</td>
                  </tr>
                  <tr>
                    <td>Alasan Keluar</td>
                    <td>:</td>
                    <td>{{ data.reason_leaving }}</td>
                  </tr>
                </table>
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
  store.employmentHistory = {};
};

const addhistory = () => {
  store.employmentHistoryPool.push(store.employmentHistory);
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
