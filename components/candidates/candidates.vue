<template>
    <Toast />
    <Button label="Tambah Kandidat" icon="pi pi-plus" class="p-button-sm p-button-success mt-3"
        @click="openModalCandidate" />
    <Dialog v-model:visible="displayModal" header="Tambah Kandidat" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div v-if="(store.candidates.length > 0)">
            <div v-for="(candidate, index) in store.candidates" :key="index">
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
    <div v-if="(store.in_pipeline <= 0)">
        <div class="card mt-3 p-5" style="display: flex">
            <div style="text-align: center; opacity: 0.6">
                <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                <p>Belum ada kandidat yang dipilih</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-for="(pipeline, index) in store.in_pipeline" :key="index">
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
                                    <span class="text-sm"> {{ store.reverseDate_noday(pipeline.date) }} (Age:
                                        {{ store.getAge(pipeline.date) }})</span>
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
                <small style="font-size: 0.75rem"><b>Mendaftar Pada : </b>{{ store.reverseDate(pipeline.createdAt)
                    }}</small>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useCandidate } from "@/stores/candidate_store";

const toast = useToast();
const route = useRoute();
const id = route.params.id;
const store = useCandidate();
const config = useRuntimeConfig();

const displayModal = ref(false);

const dropToPipeline = (id_candidate, index) => {
    axios.put(config.API_BASE_URL + "tocandidate/" + id_candidate, {
        "isCandidate": false,
        "status": "new"
    }).then(async () => {
        toast.add({ severity: "error", summary: "kandidat berkurang", life: 3000 });
        store.reloadCandidates();
        await store.getCandidates(route.params.id);
    }).catch(err => {
        console.log(err);
    });
};

function openModalCandidate() {
    displayModal.value = !displayModal.value;
};

const beCandidate = (id_candidate, index) => {
    axios.put(config.API_BASE_URL + "tocandidate/" + id_candidate, {
        "isCandidate": true,
        "status": "shortlisted"
    }).then((mes) => {
        toast.add({ severity: "info", summary: mes.data.message, life: 3000 });
        displayModal.value = false;
    }).catch(err => {
        console.log(err);
    }).finally(async () => {
        store.reloadCandidates();
        await store.getCandidates(route.params.id);
    });
};

onMounted(async () => {
    store.reloadCandidates();
    await store.getCandidates(id)
});

</script>
  
  