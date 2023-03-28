<template>
    <div class="bg-pattern2 px-4 py-3 min-h-screen">
        <div>
            <Toast />
        </div>
        <div class="mt-1">
            <Card class="mb-3 flex justify-content-center">
                <template #content>
                    <img class="head-form" src="~/assets/formapplication/Header.jpg" alt="header">
                </template>
            </Card>
        </div>
        <div class="mt-4">
            <Form>
                <Card>
                    <template #content>
                        <div class="text-center">
                            <h3 class="text-xl my-0">Bagaimana anda menilai proses seleksi di PT. Imani Prima ?</h3>
                        </div>
                        <div class="mt-5 mx-3 px-5">
                            <label for="interview_1" class="flex">
                                <h4 class="m-0 p-0 mb-2">Interview 1 (HRD)</h4><span style="color: red">*</span>
                            </label>
                            <div class="flex flex-wrap gap-3">
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_1" inputId="interview_1_1" name="interview_1"
                                        value="Buruk" />
                                    <label for="interview_1_1" class="ml-2">Buruk</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_1" inputId="interview_1_2" name="interview_1"
                                        value="Biasa" />
                                    <label for="interview_1_2" class="ml-2">Biasa</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_1" inputId="interview_1_3" name="interview_1"
                                        value="Baik" />
                                    <label for="interview_1_3" class="ml-2">Baik</label>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 mx-3 px-5">
                            <label for="interview_2" class="flex">
                                <h4 class="m-0 p-0 mb-2">Interview 2 (User)</h4><span style="color: red">*</span>
                            </label>
                            <div class="flex flex-wrap gap-3">
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_2" inputId="interview_2_1" name="interview_2"
                                        value="Buruk" />
                                    <label for="interview_2_1" class="ml-2">Buruk</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_2" inputId="interview_2_2" name="interview_2"
                                        value="Biasa" />
                                    <label for="interview_2_2" class="ml-2">Biasa</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_2" inputId="interview_2_3" name="interview_2"
                                        value="Baik" />
                                    <label for="interview_2_3" class="ml-2">Baik</label>
                                </div>
                            </div>
                        </div>
                        <div class="my-5 mx-3 px-5">
                            <label for="interview_3" class="flex">
                                <h4 class="m-0 p-0 mb-2">Interview 3 (HR Manager)</h4><span style="color: red">*</span>
                            </label>
                            <div class="flex flex-wrap gap-3">
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_3" inputId="interview_3_1" name="interview_3"
                                        value="Buruk" />
                                    <label for="interview_3_1" class="ml-2">Buruk</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_3" inputId="interview_3_2" name="interview_3"
                                        value="Biasa" />
                                    <label for="interview_3_2" class="ml-2">Biasa</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="submitData.interview_3" inputId="interview_3_3" name="interview_3"
                                        value="Baik" />
                                    <label for="interview_3_3" class="ml-2">Baik</label>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div class="text-center mt-5">
                            <h3 class="text-xl my-0">Apakah Anda memiliki masukan untuk perbaikan proses seleksi di PT Imani
                                Prima di kemudian hari ? Silahkan tulis komentar disini :</h3>
                        </div>
                        <div class="mt-2 mx-3 px-5">
                            <Textarea v-model="submitData.comment" rows="5" class="w-full"
                                placeholder="Tuliskan komentar disini..." />
                        </div>
                        <div class="text-center mt-5">
                            <Button label="Submit" :disabled="isDone" @click="submit"></Button>
                        </div>
                    </template>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/stores/applicant_auth";

const store = useStore();
const toast = useToast();
const config = useRuntimeConfig();
const router = useRouter();
const applicant = useCookie("user");

let submitData = reactive({
    interview_1: '',
    interview_2: '',
    interview_3: '',
    comment: '',
    applicantId: applicant.value.ApplicantId,
    name: applicant.value.name,
    status: 'Sudah Mengisi Form 3',
});

const isDone = computed(() => {
    if (submitData.interview_1 && submitData.interview_2 && submitData.interview_3) {
        return false;
    } else {
        return true;
    }
});

const submit = async () => {
    try {
        const post = await axios.post(config.API_BASE_URL + "processevaluation", submitData, {
            headers: {
                'Authorization': `Bearer ${store.token}`
            }
        });
        toast.add({
            severity: "info",
            summary: post.data.message,
            detail: "selesai mengisi evaluasi interview. tunggu sebentar, terima kasih",
            life: 3000,
        });
        setTimeout(() => {
            router.push({
                path: "/formapplication/dashboard/",
            });
        }, 1000);
    } catch (error) {
        toast.add({
            severity: "error",
            summary: post.data.message,
            detail: "selesai mengisi evaluasi interview. tunggu sebentar, terima kasih",
            life: 3000,
        });
    }
}

definePageMeta({
    layout: false,
    middleware: [
        async function (to, from) {
            const store = useStore();
            await store.auth();
        },
    ],
});
</script>