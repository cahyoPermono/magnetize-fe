<template>
    <div>
        <Toast />
        <div class="bg-bluegray-900 text-gray-100 py-2 text-center shadow-3">
            <div class="align-items-center col-12 p-0 text-sm">
                <span>like/follow/subscribe semua sosial media kami untuk mendapatkan merchandise menarik</span>
            </div>
            <div class="align-items-center col-12">
                <span class="p-0" style="cursor:pointer;">
                    <a href="https://www.facebook.com/PTImaniPrima/" target="_blank">
                        <Button iconClass="text-2xl md:text-3xl" icon="pi pi-facebook"
                            class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
                    </a>
                    <a href="https://www.instagram.com/imaniprima/" target="_blank">
                        <Button iconClass="text-2xl md:text-3xl" icon="pi pi-instagram"
                            class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
                    </a>
                    <a href="https://www.youtube.com/channel/UC9ONViZhn_fJLN9ciKDESzw/" target="_blank">
                        <Button iconClass="text-2xl md:text-3xl" icon="pi pi-youtube"
                            class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
                    </a>
                    <a href="https://www.linkedin.com/company/pt-imani-prima/" target="_blank">
                        <Button iconClass="text-2xl md:text-3xl" icon="pi pi-linkedin"
                            class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
                    </a>
                    <Button iconClass="text-2xl md:text-3xl" icon="pi pi-share-alt" @click="shareLink"
                        class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
                    <Dialog header="Copy Link" v-model:visible="displayLink" :breakpoints="{ '640px': '75vw' }"
                        :style="{ width: '30vw' }" :modal="true">
                        <div class="block">
                            <InputText v-model="link" class="w-8"></InputText>
                            <Button label="Copy" @click="copy" class="p-button-text p-button-warning p-button-sm m-1"
                                autofocus />
                        </div>
                    </Dialog>
                </span>
            </div>
        </div>
        <div class="pb-6 md:pb-6 px-0 text-center bg-pattern" style="min-height: 90vh;">
            <div class="text-center pt-5">
                <h1 class="text-2xl md:text-6xl">Selamat Anda telah Berhasil Mendaftar di</h1>
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
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";

.float {
    position: fixed;
    bottom: 40px;
    right: 40px;
    text-align: center;
    margin-top: 22px;
}
</style>