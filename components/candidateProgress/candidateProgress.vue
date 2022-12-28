<template>
    <div>
        <Toast />
        <DataTable :value="store.in_pipeline" :paginator="true" :rows="5"
            paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            responsiveLayout="scroll" removableSort>
            <template #loading>
                Loading applicant data. Please wait.
            </template>
            <Column>
                <template #body="{ data }">
                    <Avatar :image="data.photo" class="mr-2" size="xlarge" shape="circle" />
                </template>
            </Column>
            <Column field="name" header="Nama" />
            <Column field="gender" header="Gender" />
            <Column>
                <template #body="{ data }">
                    <span class="dot mx-1 bg-primary"></span>
                    <span class="px-1 text-primary">{{ data.status }}</span>
                </template>
            </Column>
            <Column>
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" class="p-button-text p-button-plain"
                        @click="openModal(data.id, data.status, data.name)" />
                    <Dialog v-model:visible="displayModal" header="Update Status"
                        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
                        <div class="card p-3">
                            <Dropdown v-model="selectedStatus" :options="selectedCategories"
                                placeholder="Pilih Status" />
                        </div>
                        <template #footer>
                            <Button @click="displayModal = false" label="Cancel" />
                            <Button @click="update()" label="Ok" />
                        </template>
                    </Dialog>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import axios from "axios";
import { useCandidate } from "@/stores/candidate_store";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const config = useRuntimeConfig();
const route = useRoute();
const store = useCandidate();
const id = route.params.id;

const displayModal = ref(false);
const categories = ref([
    'shortlisted',
    'submitted',
    'scheduling interview',
    'hr interview',
    'final interview',
    'offered',
    'hired',
    'onboarding',
    'probation',
]);
let selectedCategories;
const selectedStatus = ref();
const selectedId = ref();
const selectedName = ref();
const openModal = (id, status, name) => {
    selectedStatus.value = status;
    selectedId.value = id;
    selectedName.value = name;
    displayModal.value = !displayModal.value;
    selectedCategories = categories.value.filter((el) => {
        return el != selectedStatus.value
    });
};

const update = async () => {
    try {
        await axios.put(config.API_BASE_URL + "tocandidate/" + selectedId.value, {
            "status": selectedStatus.value
        });
        toast.add({ severity: "info", summary: selectedName.value + " became " + selectedStatus.value, life: 3000 });
        store.reloadCandidates();
        await store.getCandidates(id);
        displayModal.value = !displayModal.value;
    } catch (error) {
        toast.add({ severity: "error", summary: error, life: 3000 })
        displayModal.value = !displayModal.value;
    }
};

</script>