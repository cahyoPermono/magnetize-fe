<template>
  <Card>
    <template #title>
      Keterangan Lainnya
      <span>
        <small><i> (Other Informations)</i></small>
      </span>
    </template>
    <template #content>
      <div class="mt-2 mx-3">
        <label for="overtime">
          <small>Apakah anda bersedia bekerja lembur?</small>
          <span style="color: red">*</span>
        </label>
        <div>
          <Dropdown
            v-model="store.otherInformation.overtime"
            :options="pilihan"
            optionLabel="val"
            optionValue="val"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-2 mx-3">
        <label for="work_on_holiday">
          <small
            >Apakah anda bersedia bekerja dihari libur? (hari Sabtu, Minggu, atau Hari Libur
            Nasional)
          </small>
          <span style="color: red">*</span>
        </label>
        <div>
          <Dropdown
            v-model="store.otherInformation.work_on_holiday"
            :options="pilihan"
            optionLabel="val"
            optionValue="val"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-2 mx-3">
        <label for="out_town_duty">
          <small>Apakah anda bersedia dinas keluar kota ? </small>
          <span style="color: red">*</span>
        </label>
        <div>
          <Dropdown
            v-model="store.otherInformation.out_town_duty"
            :options="pilihan"
            optionLabel="val"
            optionValue="val"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-2 mx-3">
        <label for="shifting">
          <small
            >Apakah anda bersedia bekerja secara shift? (posisi: Security dan IT Helpdesk)
          </small>
          <span style="color: red">*</span>
        </label>
        <div>
          <Dropdown
            v-model="store.otherInformation.shifting"
            :options="pilihan"
            optionLabel="val"
            optionValue="val"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-2 mx-3">
        <label for="giving_reference">
          <small
            >Apakah Anda bersedia, jika Kami meminta referensi pada perusahaan Anda bekerja
            sebelumnya
          </small>
          <span style="color: red">*</span>
        </label>
        <div>
          <Dropdown
            v-model="store.otherInformation.giving_reference"
            :options="pilihan"
            optionLabel="val"
            optionValue="val"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-2 mx-3">
        <label for="information_source">
          <small>Dari mana anda mengetahui informasi lowongan ini?</small>
        </label>
        <span style="color: red">*</span>
        <Field
          v-slot="{ field, errorMessage }"
          :rules="isRequired"
          v-model="store.otherInformation.information_source"
        >
          <InputText
            v-bind="field"
            aria-describedby="email-help"
            :class="{ 'p-invalid': errorMessage }"
            class="block w-full"
          />
          <small id="information_source" class="p-error block">{{ errorMessage }}</small>
        </Field>
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
const emits = defineEmits(["back", "next"]);

//Main Data

/***************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const pilihan = [{ val: "ya" }, { val: "tidak" }];

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
