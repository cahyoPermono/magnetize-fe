<template>
  <Button
    label="tambah note"
    icon="pi pi-plus"
    class="p-button-sm p-button-success mt-3"
    @click="openModalNote"
  />
  <Dialog
    v-model:visible="displayModalNote"
    header="Tambah Note"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '40vw' }"
    :modal="true"
  >
    <div class="card p-3">
      <Form @submit="saveNote">
        <div class="mt-2">
          <label for="note"
            ><small>Note</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="note"
            :rules="isRequired"
            v-model="newNote.note"
          />
          <ErrorMessage name="note"
            ><small style="color: red">Note is required</small></ErrorMessage
          >
        </div>
        <div class="mt-4">
          <Button label="Submit" icon="pi pi-check" type="submit" />
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<script setup>
import axios from "axios";

const displayModalNote = ref(false);
const newNote = reactive({
  note: "",
});

function openModalNote() {
  displayModalNote.value = !displayModalNote.value;
}
const route = useRoute();

async function saveNote() {
  try {
    await axios
      .post("http://localhost:3000/api/1.0/notes", {
        notes: newNote.note,
        DepartementId: route.params.id,
      })
      .then(() => {
        alert("Note baru ditambahkan");
        setTimeout(function () {
          location.reload();
        }, 760);
      });
  } catch (error) {
    console.log(error);
  }
}
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>

