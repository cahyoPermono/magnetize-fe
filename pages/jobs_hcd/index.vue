<template>
    <div>
        <div class="container-dept">
            <h1>Jobs</h1>
            <div class="flex">
                <tambah-job @loadData="getIndexJob()"></tambah-job>
                <NuxtLink to="/jobs_hcd/job_category" class="ml-2"> <Button label="Kategori" class="p-button-sm mt-3" /> </NuxtLink>
            </div>
            <div style="width: 75vw;">
                <!-- {{ displayed_data }} -->
                <div class="card shadow mt-4 ml-4 w-100">
                    <DataTable :value="displayed_data" :paginator="true" :rows="5"
                        paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        responsiveLayout="scroll" removableSort>
                        <Column field="name" header="Nama Posisi"></Column>
                        <Column field="departement.nama" header="Departemen" :sortable="true"></Column>
                        <Column field="location" header="Lokasi" :sortable="true"></Column>
                        <Column field="headcount" header="Jumlah Orang"></Column>
                        <Column field="jobCategory.category" header="Kategori" :sortable="true"></Column>
                        <Column>
                            <template #body="slotProps">
                                <NuxtLink :to="`/jobs_hcd/${slotProps.data.id}`">
                                    <Button type="button" icon="pi pi-eye" class="p-button-outlined"></Button>
                                </NuxtLink>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { usePermission } from "@/stores/permission";

const config = useRuntimeConfig();
const displayed_data = ref([]);
const getIndexJob = async () => {
    displayed_data.value = [];
    const data = await axios.get(config.API_BASE_URL + "jobs");
    displayed_data.value = data.data.data;
};

onMounted(() => {
    getIndexJob();
    setTimeout(async () => {
        alert("Time is up, please LogIn");
        await store.logout();
    }, 3600000);
});

definePageMeta({
    middleware: [
        async function (to, from) {
            const store = usePermission();
            await store.auth();
            await store.checkPermission("menu_jobs_hcd");
        },
    ],
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";
</style>