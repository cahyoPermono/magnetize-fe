<template>
  <Toast />
  <div v-if="isCandidate === false" style="width: 900px">
    <Button label="Assign Jobs" icon="pi pi-plus" class="p-button-sm p-button-success mt-3" 
        @click="openModalCandidate" />
    <Dialog v-model:visible="displayModal" header="Tambah Kandidat" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }" :modal="true" >
      <div class="pt-2 border-1 border-400 border-round-xl mt-3 shadow-3">
        <div class="grid">
          <div class="col-9 my-3 mx-2">
            <h4>
              {{ job }}
            </h4>
          </div>
          <div class="col-2 my-3">
            <Button
              icon="pi pi-plus"
              class="p-button-sm p-button-rounded"
              @click="assignJob(id)"
            />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
  <div v-else style="width: 900px">
    <p>Posisi yang dilamar&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{ job }}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const candidate = ref();
const isCandidate = ref();
const job = ref();
const config = useRuntimeConfig();
const displayModal = ref(false);

function openModalCandidate() {
    displayModal.value = !displayModal.value;
};

async function getCandidate() {
  const response = await axios.get(config.API_BASE_URL + "applicants/" + id);
  candidate.value = response.data.data;
  isCandidate.value = response.data.data.isCandidate;
  job.value = response.data.data.job.name;
}

const assignJob = (id) => {
    axios.put(config.API_BASE_URL + "tocandidate/" + id, {
        "isCandidate": true,
        "status" : "shortlisted"
    }).then(async (mes) => {
        await toast.add({ severity: "info", summary: mes.data.message, life: 3000 });
        window.location.reload()
    }).catch(err => {
        console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(async () => {
  await getCandidate();
});
</script>
