<template>
  <Card>
    <template #title>
      Penguasaan Komputer dan Keahlian Khusus
      <span>
        <small><i>(Computer Literate and Special Skills)</i></small>
      </span>
    </template>
    <template #content>
      <Button @click="openModal" label="Tambah Skill" v-tooltip.right="'Klik untuk menambahkan'" />
      <Dialog
        @update:visible="store.computer = {}"
        header="Program Aplikasi dan Keahlian Khusus"
        v-model:visible="displayModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '80vw' }"
        :modal="true"
      >
        <Form v-slot="{ meta }">
          <div class="form-page">
            <div class="mt-2">
              <div class="grid">
                <label for="skill" class="col-2">
                  <small>Jenis Program Aplikasi dan Keahlian Khusus</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                    name="skill"
                    v-model="store.computer.skill"
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
                <label for="level" class="col-2">
                  <small>Kemampuan</small><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field :rules="isRequired" name="level" v-model="store.computer.level">
                    <Dropdown
                      class="w-full"
                      v-model="store.computer.level"
                      :options="proficiens"
                      optionLabel="proficiens_name"
                      optionValue="code"
                      placeholder="Pilih Kemampuan"
                    />
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
              @click="addComputer()"
              :disabled="!(meta.valid && meta.dirty)"
            />
          </div>
        </Form>
      </Dialog>
      <div v-if="store.computerPool.length > 0">
        <DataTable :value="store.computerPool">
          <Column field="skill" header="Kemampuan"></Column>
          <Column field="level" header="Penguasaan"></Column>
          <Column>
            <template #body="{ index }">
              <Button
                icon="pi pi-trash"
                class="p-button-danger"
                @click="cancel(index, store.computerPool)"
              />
            </template>
          </Column>
        </DataTable>
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
  store.computer = {};
};

const addComputer = () => {
  store.computerPool.push(store.computer);
  openModal();
};

/***************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const proficiens = [
  { proficiens_name: "Baik", code: "baik" },
  { proficiens_name: "Cukup", code: "cukup" },
  { proficiens_name: "Kurang", code: "kurang" },
];

const cancel = (index = 0, arr = []) => {
  arr.splice(index, 1);
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
