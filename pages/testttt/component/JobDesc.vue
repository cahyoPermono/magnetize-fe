<template>
  <Card>
    <template #title>
      Tugas dan Tanggung Jawab Pekerjaan<span
        ><small> <i> (Di tempat terakhir anda bekerja)</i></small></span
      >
    </template>
    <template #content>
      <div class="mt-2">
        <div class="grid">
          <label for="description" class="col-2">
            <small>Job Deskripsi</small>
          </label>
          <div class="col">
            <Textarea v-model="store.jobDesk" autoResize rows="15" cols="115" />
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

</script>
