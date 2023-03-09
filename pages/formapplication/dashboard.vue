<template>
    <div>
        <div class="grid mr-0 p-3">
            <div class="col-4 col-offset-1">
                <Card class="bg-yellow-300">
                    <template #content>
                        <div class="text-center">
                            <div
                                class="border-circle bg-yellow-500 w-5rem h-5rem flex align-items-center justify-content-center mx-auto">
                                <i class="pi pi-user text-center" style="font-size: 2rem"></i>
                            </div>
                            <h2 class="mt-4 mb-0"> {{ user.name }} </h2>
                            <span>{{ user.email }}</span>
                            <div class="mt-4">
                                <span>status :</span>
                                <h5>Belum Mengisi Form Aplikasi</h5>
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <div class="text-center">
                            <Button label="Isi Form" @click="toForm()" class="p-button-success" />
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-6">
                <Card class="bg-yellow-300">
                    <template #content>
                        <div class="flex mb-5">
                            <div
                                class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center">
                                <i class="pi pi-map text-white" style="font-size: 2rem"></i>
                            </div>
                            <div class="ml-2">
                                <p class="text-2xl font-bold m-0">Form Pertama</p>
                                <span>Belum terisi </span>
                            </div>
                        </div>
                        <div class="flex mb-5">
                            <div
                                class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center">
                                <i class="pi pi-map text-white" style="font-size: 2rem"></i>
                            </div>
                            <div class="ml-2">
                                <p class="text-2xl font-bold m-0">Form Kedua</p>
                                <span>Belum terisi </span>
                            </div>
                        </div>
                        <div class="flex">
                            <div
                                class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center">
                                <i class="pi pi-map text-white" style="font-size: 2rem"></i>
                            </div>
                            <div class="ml-2">
                                <p class="text-2xl font-bold m-0">Form Ketiga</p>
                                <span>Belum terisi </span>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~~/stores/applicant_auth';
const user = useCookie("user");
const router = useRouter();

const toForm = () => {
    router.push("form");
};

definePageMeta({
    layout: 'applicant',
    middleware: [
        async function (to, from) {
            const store = useStore();
            await store.auth();
        },
    ],
});
</script>