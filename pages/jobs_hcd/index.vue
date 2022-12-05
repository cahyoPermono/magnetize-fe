<template>
    <div class="container-dept">
        <h1>Jobs</h1>
        <tambah-job></tambah-job>
        <div style="width: 75vw;">
            <div class="card shadow mt-4 ml-4 w-100">
                <DataTable :value="displayed_data" :paginator="true" :rows="5"
                    paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    responsiveLayout="scroll" removableSort>
                    <Column field="job_name" header="Nama Posisi"></Column>
                    <Column field="job_departement" header="Departemen" :sortable="true"></Column>
                    <Column field="job_location" header="Lokasi" :sortable="true"></Column>
                    <Column field="job_headcount" header="Jumlah Orang"></Column>
                    <Column field="job_salary" header="Rentang Gaji"></Column>
                    <Column>
                        <template #body="slotProps">
                            <NuxtLink :to="`/jobs_hcd/${slotProps.data.job_id}`">
                                <Button type="button" icon="pi pi-eye" class="p-button-outlined"></Button>
                            </NuxtLink>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
const config = useRuntimeConfig();
const displayed_data = ref([]);

onMounted(() => {
    axios.get(config.API_BASE_URL + "jobs")
        .then(r => {
            const data = r.data.data;
            data.forEach(async (element) => {
                const dept = await axios.get(config.API_BASE_URL + "departements/" + element.DepartementId);
                const data_dept = dept.data.departement;
                if (data_dept) {
                    displayed_data.value.push({
                        job_id: element.id,
                        job_name: element.name,
                        job_departement: dept.data.departement.nama,
                        job_location: element.location,
                        job_headcount: element.headcount,
                        job_salary: element.min_salary + " - " + element.max_salary + " (" + element.currency + ")",
                    })
                }
            });
        })
        .catch(err => { console.log(err) })
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";
</style>