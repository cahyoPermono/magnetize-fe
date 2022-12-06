<template>
    <div class="md:min-h-screen">
        <div class="m-0 py-3 md:min-h-screen">
            <div class="text-600">
                <h5>Pengisi Buku Tamu Imani Prima (Guest)</h5>
            </div>
            <div class="grid mt-3">
                <div class="col-3">
                    <Panel header="Summary" class="shadow-2 justify-content-center">
                        <div class="border-3 border-round-lg text-center w-100 mb-2 ">
                            <div class="bg-green-300 p-1 border-round-top-sm">
                                <h5>Total Pengisi Buku Tamu</h5>
                            </div>
                            <div class="pt-2">
                                <p>{{ totalPendaftar }}</p>
                            </div>
                        </div>
                        <div class="border-3 border-round-lg text-center w-100">
                            <div class="bg-yellow-300 p-1 border-round-top-sm">
                                <h5>Pengisi Buku Tamu Hari Ini</h5>
                            </div>
                            <div class="pt-2">
                                <p>{{ totalPendaftarHariIni }}</p>
                            </div>
                        </div>
                    </Panel>
                </div>
                <div class="col-9">
                    <Panel header="Guest" class="shadow-2">
                        <div class="shadow-2 w-100">
                            <div v-if="!applicant">
                                <div class="card mt-3 p-5" style="display: flex">
                                    <div style="text-align: center; opacity: 0.6">
                                        <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                                        <p>belum ada pendaftar</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <DataTable :value="applicant" :paginator="true" :rows="5"
                                    paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                    responsiveLayout="scroll" removableSort>
                                    <Column field="name" header="Nama"></Column>
                                    <Column field="posisi" header="Posisi" :sortable="true"></Column>
                                    <Column header="Waktu Pendaftaran" :sortable="true">
                                        <template #body="slotProps">
                                            <p>{{ reverseDate(slotProps.data.createdAt) }}</p>
                                        </template>
                                    </Column>
                                    <Column header="CV">
                                        <template #body="slotProps">
                                            <div v-if="!slotProps.data.cv">
                                                <Button title="no data, can't download" icon="pi pi-download"
                                                    @click="downloadCV(slotProps.data.cv)" disabled></Button>
                                            </div>
                                            <div v-else>
                                                <Button title="download" icon="pi pi-download"
                                                    @click="downloadCV(slotProps.data.cv, slotProps.data.name, slotProps.data.posisi)"></Button>
                                            </div>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";

const reverseDate = (date) => {
    return dateFormat(date, "d mmm yyyy, h:MM TT");
};

const config = useRuntimeConfig();

const downloadCV = (cv, nama, posisi) => {
    const a = document.createElement('a')
    a.href = cv
    a.download = `${nama} - ${posisi}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
const todaysDate = new Date();

const applicant = ref();
const totalPendaftarHariIni = ref();
const totalPendaftar = ref();

onMounted(async () => {
    const getApplicant = await axios.get(config.API_BASE_URL + "guest");
    applicant.value = (getApplicant.data.data);
    totalPendaftarHariIni.value = computed(() => {
        let a = 0;
        applicant.value.forEach(element => {
            let inputDate = new Date(element.createdAt);
            if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                a = a + 1;
            }
        })
        return a;
    });
    totalPendaftar.value = computed(() => {
        return applicant.value.length;
    })
});

definePageMeta({
    middleware: 'auth'
});
</script>