<template>
    <Toast />
    <div v-if="isCandidate === false" style="width:900px;">
        <Button label="Assign Jobs" icon="pi pi-plus" class="p-button-sm p-button-success mt-3"
        @click="assignJob(id)" />
    </div>
    <div v-else style="width:900px;">
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

async function getCandidate() {
    const response = await axios.get(config.API_BASE_URL + "applicants/" + id)
    candidate.value = response.data.data;
    isCandidate.value = response.data.data.isCandidate;
    job.value = response.data.data.job.name
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
};


onMounted(async () => {
    await getCandidate();
});

</script>
  
  