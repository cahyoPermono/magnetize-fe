<template>
  <div>
    <Toast/>
    <Button label="tambah note" icon="pi pi-plus" class="p-button-sm p-button-success mt-3" @click="openModalNote" />
    <Dialog v-model:visible="displayModalNote" header="Tambah Note" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }" :modal="true">
      <div class="card p-3">
        <Form @submit="saveNote">
          <div class="mt-2">
            <label for="note"><small>Note</small><span style="color: red">*</span></label>
            <Field class="form-control" name="note" :rules="isRequired" v-model="newNote.note" />
            <ErrorMessage name="note"><small style="color: red">Note is required</small></ErrorMessage>
          </div>
          <div class="mt-4">
            <Button label="Submit" icon="pi pi-check" type="submit" />
          </div>
        </Form>
      </div>
    </Dialog>
    <div v-if="notes.length < 1">
      <div class="card mt-3 p-5" style="display: flex">
        <div style="text-align: center; opacity: 0.6">
          <i class="pi pi-info-circle" style="font-size: 2rem"></i>
          <p>anda belum membuat notes</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="(note, index) in notes" :key="index">
        <div class="card mt-3 p-3" style="background-color: #b3e5fc">
          <p class="mb-3" style="font-size: 1.5rem">{{ note.notes }}</p>
          <hr />
          <small style="font-size: 0.75rem"><b>Created At : </b>{{ reverseDate(note.createdAt) }}&ensp;<b>Updated
              At : </b>{{ reverseDate(note.updatedAt) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();

const notes = ref("");
const displayModalNote = ref(false);
const newNote = reactive({
  note: "",
});

const reverseDate = (date) => {
  return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
};
function openModalNote() {
  displayModalNote.value = !displayModalNote.value;
};
const config = useRuntimeConfig();
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  const getNotes = await axios.get(config.API_BASE_URL + "notes/dept/" + id);
  notes.value = await getNotes.data.ressss;
});

function saveNote() {
  try {
    axios.post(config.API_BASE_URL + "notes", {
      notes: newNote.note,
      DepartementId: route.params.id,
    }).then(() => {
      toast.add({ severity: 'success', summary: 'Create New Note Success', life: 3000 });
      displayModalNote.value = false;
    }).then(async () => {
      const getNotes = await axios.get(config.API_BASE_URL + "notes/dept/" + id);
      notes.value = await getNotes.data.ressss;
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

