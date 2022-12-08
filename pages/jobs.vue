<template>
    <div>
        <div class="pb-6 md:pb-6 px-3 text-center bg-pattern " style="min-height: 100vh;">

            <div class="text-center pt-7">
                <h1 class="text-2xl md:text-6xl text-yellow-500" style="text-shadow: 2px 2px 5px #1b1b1b;">
                    Selamat Anda telah Berhasil Mendaftar di
                </h1>
                <img src="~/assets/logo-putih.png" alt="Image" class="w-8 md:w-4 mt-3"> <br>
                <Button icon="pi pi-external-link" label="Lihat Lowongan" @click="toIndex()"
                    class="p-button-warning text-white px-4 py-3 mt-3 shadow-3" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const router = useRouter()
const toast = useToast();
const link = "recruitment.imaniprima.co.id"
const displayPosition = ref(false);
const position = ref('center');
const displayModal = ref(false);
const jobsModal = reactive({
    nama: "",
    lokasi: "",
    deskripsi: "",
    requirement: "",
});

const toIndex = async () => {
    await router.push({ path: '/' });
}
definePageMeta({
    layout: false,
});
</script>

<style>
.float {
    position: fixed;
    bottom: 40px;
    right: 40px;
    text-align: center;
    margin-top: 22px;
}
</style>