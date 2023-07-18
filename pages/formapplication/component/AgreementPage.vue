<template>
  <Card>
    <template #title>
      Halaman Persetujuan<span
        ><small><i> (Agreement)</i></small></span
      >
    </template>
    <template #content>
      <p>
        Dengan ini saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar dan
        lengkap. Saya sungguh memahami, menerima, dan menyetujui jika terdapat pernyataan yang tidak
        sesuai atau tidak benar dengan apa yang telah saya tuliskan di atas akan menyebabkan
        batalnya lamaran ini dan atau saya bersedia mengundurkan diri apabila saya telah diterima
        bekerja oleh Perusahaan.
      </p>
      <Checkbox v-model="agree" :binary="true" inputId="agreement" />
      <label for="agreement" class="mb-0 ml-2"
        >Saya Menyetujui Semua Syarat dan Ketentuan tersebut</label
      >
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <Button v-if="store.loading" class="p-button-sm" icon="pi pi-arrow-left" :disabled="true" />
        <Button v-else class="p-button-sm" icon="pi pi-arrow-left" @click="$emit('back')" />
        <Button
          v-if="store.loading"
          class="p-button-sm"
          icon="pi pi-spin pi-spinner"
          label="Loading"
          :disabled="true"
        />
        <Button
          v-else
          class="p-button-sm"
          icon="pi pi-save"
          label="Save"
          :disabled="!agree"
          @click="$emit('save-data')"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//NPM

//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
const agree = ref(false);
</script>
