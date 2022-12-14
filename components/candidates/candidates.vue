<template>
    <Toast />
    <Button label="Tambah Kandidat" icon="pi pi-plus" class="p-button-sm p-button-success mt-3"
        @click="openModalCandidate" />
    <Dialog v-model:visible="displayModal" header="Tambah Kandidat" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div v-if="(candidates.length > 0)">
            <div v-for="(candidate, index) in candidates" :key="index">
                <div v-if="(candidate.isCandidate === false)">
                    <div class="pt-2 border-1 border-400 border-round-xl mt-3 shadow-3">
                        <div class="grid">
                            <div class="col-1 mr-2">
                                <Avatar :image="candidate.photo" shape="circle" size="large" />
                            </div>
                            <div class="col-8 my-3 mx-2">
                                <h4>
                                    {{ candidate.name }}
                                </h4>
                            </div>
                            <div class="col-2 my-2">
                                <Button icon="pi pi-plus" class="p-button-sm p-button-rounded"
                                    @click="beCandidate(candidate.id, index)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center text-600">Belum Ada Kandidat</p>
        </div>
    </Dialog>
    <div v-if="(In_Pipeline <= 0)">
        <div class="card mt-3 p-5" style="display: flex">
            <div style="text-align: center; opacity: 0.6">
                <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                <p>Belum ada kandidat yang dipilih</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-for="(pipeline, index) in In_Pipeline" :key="index">
            <div class="card mt-3 p-3 shadow-2">
                <div class="grid">
                    <div class="col-1 ml-3 mr-4">
                        <Avatar :image="pipeline.photo" shape="circle" size="xlarge" />
                    </div>
                    <div class="col-8 p-0">
                        <span v-if="pipeline.gender === 'L'">
                            <p class="text-xl font-bold uppercase mb-2">{{ pipeline.name }} <span
                                    class="material-symbols-sharp text-sm">
                                    male
                                </span></p>
                        </span>
                        <span v-else>
                            <p class="text-xl font-bold uppercase mb-2">{{ pipeline.name }} <span
                                    class="material-symbols-sharp text-sm">
                                    female
                                </span></p>
                        </span>
                        <div class="grid">
                            <div class="col-5 p-0">
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> location_on </i>&nbsp;
                                    <span class="text-sm"> {{ pipeline.domicile
                                    }},&nbsp;{{ pipeline.postal_code_domicile }}</span>
                                </p>
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> calendar_today </i>&nbsp;
                                    <span class="text-sm"> {{ reverseDate_noday(pipeline.date) }} (Age:
                                        {{ getAge(pipeline.date) }})</span>
                                </p>
                            </div>
                            <div class="col-4 p-0">
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> email </i>&nbsp;
                                    <span class="text-sm"> {{ pipeline.email }}</span>
                                </p>
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> phone </i>&nbsp;
                                    <span class="text-sm"> {{ pipeline.mobile }}</span>
                                </p>
                            </div>
                            <div class="col-3 p-0">
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> sprinkler </i>&nbsp;
                                    <span class="text-sm"> {{ pipeline.religion }}</span>
                                </p>
                                <p class="m-1 ml-3">
                                    <i class="material-symbols-sharp text-xs"> diversity_1 </i>&nbsp;
                                    <span class="text-sm"> {{ pipeline.marital_status }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto p-0 pt-4">
                        <CandidatesAction @drop-to-pipeline="dropToPipeline(pipeline.id, index)"></CandidatesAction>
                    </div>
                </div>
                <!-- {{pipeline}} -->
                <hr class="m-1" />
                <small style="font-size: 0.75rem"><b>Mendaftar Pada : </b>{{ reverseDate(pipeline.createdAt) }}</small>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import dateFormat from "dateformat";

const reverseDate = (date) => {
    return dateFormat(date, "dddd, dS mmmm, yyyy");
};
const reverseDate_noday = (date) => {
    return dateFormat(date, "dS-mmmm-yyyy");
};
const toast = useToast();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const displayModal = ref(false);
const k = (index, array1, array2) => {
    array2.push(array1[index]);
    array1.splice(index, 1);
};
const dropToPipeline = (id_candidate, index) => {
    axios.put(config.API_BASE_URL + "tocandidate/" + id_candidate, {
        "isCandidate": false,
        "status": "new"
    }).then(() => {
        toast.add({ severity: "error", summary: "kandidat berkurang", life: 3000 });
        k(index, In_Pipeline, candidates);
    }).catch(err => {
        console.log(err);
    });
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function openModalCandidate() {
    displayModal.value = !displayModal.value;
};

const beCandidate = (id_candidate, index) => {
    axios.put(config.API_BASE_URL + "tocandidate/" + id_candidate, {
        "isCandidate": true,
        "status": "In Pipeline"
    }).then((mes) => {
        toast.add({ severity: "info", summary: mes.data.message, life: 3000 });
        displayModal.value = false;
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        k(index, candidates, In_Pipeline);
    });
};

let candidates = reactive([]);
let In_Pipeline = reactive([]);

const config = useRuntimeConfig();
const getCandidates = async () => {
    let data_applicants = null;
    const getApplicants = await axios.get(config.API_BASE_URL + "allapplicants/" + id);
    data_applicants = await getApplicants.data.data;
    // console.log(data_applicants);
    await data_applicants.forEach(element => {
        if (element.isCandidate === false) {
            candidates.push(element)
        } else {
            In_Pipeline.push(element)
        }
    });
};

onMounted(async () => {
    await getCandidates();
});

</script>
  
  