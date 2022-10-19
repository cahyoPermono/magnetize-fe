<template>
  <Button
    icon="pi pi-pi-pencil"
    @click="openPosition('top')"
    class="p-button-warning"
    style="float: right"
  />

  <Dialog
    header="Edit Note"
    v-model:visible="displayPosition"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :position="position"
    :modal="true"
  >
    <Form class="mb-3" @submit="save">
      <div class="card p-3">
        <div class="">
          <label for="edit_note"
            ><small>Note</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="note"
            :rules="isRequired"
            v-model="Notes.note"
          />
          <ErrorMessage name="note"
            ><small style="color: red">Note is required</small></ErrorMessage
          >
        </div>
      </div>
      <div class="mt-3" style="float: right">
        <Button
          label="No"
          icon="pi pi-times"
          @click="closePosition"
          class="p-button-text mb-5 mr-3"
        />
        <Button class="mb-5" label="Update" icon="pi pi-check" type="submit" />
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
import axios from "axios";
const Notes = ref(null);
const position = ref("center");
const displayPosition = ref(false);
const openPosition = (pos) => {
  position.value = pos;
  displayPosition.value = true;
};
const closePosition = () => {
  displayPosition.value = false;
};
async function save() {
  try {
    await axios
      .post("http://localhost:3000/api/1.0/departements", {
        nama: newDept.value.nama,
      })
      .then(() => {
        alert("Departemen diupdate");
        setTimeout(function () {
          location = "/departements";
        }, 760);
      });

    await axios.delete(
      "http://localhost:3000/api/1.0/departements/" + newDept.value.id
    );
  } catch (error) {
    alert(error);
  }
}
onMounted(async () => {
  const route = useRoute();

  const id = route.params.id;
  const getdata = await axios.get(
    "http://localhost:3000/api/1.0/departements/" + id
  );
  Notes.value = getdata.data.departement;
});
</script>

<style></style>
