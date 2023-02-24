<template>
    <Toast />
    <div class="flex flex-wrap align-items-center justify-content-center min-h-screen bg-pattern">
        <div class="card p-3 w-50 shadow">
            <TabView :activeIndex="1">
                <TabPanel header="Register">
                    <Form v-slot="{ meta }" @submit="save" class="h-100">
                        <div class="text-center">
                            <h3>Daftar</h3>
                            <p>Sebagai Pelamar</p>
                        </div>
                        <div class="mt-2">
                            <div class="row p-3">
                                <div class="col-sm-12">
                                    <label for="name" class="col-form-label">
                                        <small>Nama</small><span style="color: red">*</span>
                                    </label>
                                    <Field class="form-control" name="name" :rules="isRequired" v-model="applicant.name" />
                                    <ErrorMessage name="name">
                                        <small style="color: red">Name required</small>
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div class="row p-3">
                                <div class="col-sm-6">
                                    <label for="email" class="col-form-label">
                                        <small>Email</small><span style="color: red">*</span>
                                    </label>
                                    <Field class="form-control" name="email" :rules="isRequired"
                                        v-model="applicant.email" />
                                    <ErrorMessage name="email">
                                        <small style="color: red">Email required</small>
                                    </ErrorMessage>
                                </div>
                                <div class="col-sm-6">
                                    <label for="password" class="col-form-label">
                                        <small>Password</small><span style="color: red">*</span>
                                    </label>
                                    <Field class="form-control" name="password" type="password" :rules="isRequired"
                                        v-model="applicant.password" />
                                    <ErrorMessage name="password">
                                        <small style="color: red">Password required</small>
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div class="row px-4">
                                <div class="col-12 flex justify-content-end">
                                    <Button class="p-button-sm mt-2" icon="pi pi-save" type="submit"
                                        :disabled="!(meta.valid && meta.dirty)" />
                                </div>
                            </div>
                        </div>
                    </Form>
                </TabPanel>
                <TabPanel header="Login">
                    <Form v-slot="{ meta }" @submit="login" class="h-100">
                        <div class="text-center">
                            <h3>Login</h3>
                            <p>Sebagai Pelamar</p>
                        </div>
                        <div class="mt-2">
                            <div class="row p-3">
                                <div class="col-sm-12">
                                    <label for="email" class="col-form-label">
                                        <small>Email</small><span style="color: red">*</span>
                                    </label>
                                    <Field class="form-control" name="email" :rules="isRequired"
                                        v-model="applicant.email" />
                                    <ErrorMessage name="email">
                                        <small style="color: red">Email required</small>
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div class="row p-3">
                                <div class="col-sm-12">
                                    <label for="password" class="col-form-label">
                                        <small>Password</small><span style="color: red">*</span>
                                    </label>
                                    <Field class="form-control" name="password" type="password" :rules="isRequired"
                                        v-model="applicant.password" />
                                    <ErrorMessage name="password">
                                        <small style="color: red">Password required</small>
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div class="row px-4">
                                <div class="col-12 flex justify-content-end">
                                    <Button class="p-button-sm mt-2" icon="pi pi-save" type="submit"
                                        :disabled="!(meta.valid && meta.dirty)" />
                                </div>
                            </div>
                        </div>
                    </Form>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/stores/applicant_auth";

const toast = useToast();
const config = useRuntimeConfig();
const router = useRouter();
const store = useStore();
const token = useCookie("token");
const user = useCookie("user");

const applicant = ref({
    name: "",
    email: "",
    password: ""
});

const save = async () => {
    const data = await axios.post(config.API_BASE_URL + "applicant_auth/register", applicant.value);
    toast.add({
        severity: "success",
        summary: "Berhasil",
        detail: `${data.data.message}`,
        life: 3000,
    });
    applicant.value = {
        name: "",
        email: "",
        password: ""
    }
};

const login = async () => {
    try {
        const data = await axios.post(config.API_BASE_URL + "applicant_auth/login", applicant.value);
        token.value = data.data.token;
        user.value = data.data.user;
        toast.add({
            severity: "success",
            summary: "Berhasil",
            detail: `${data.data.message}`,
            life: 3000,
        });
        router.push('/formapplication/dashboard');
    } catch (error) {
        console.log(error)
        toast.add({
            severity: "error",
            summary: "Gagal",
            detail: `${error.response.data.error}`,
            life: 3000,
        });
    }
};

const isRequired = (value) => {
    if (!value) {
        return "This field is required";
    }
    return true;
};

definePageMeta({
    layout: false,
    middleware: ['is-applicant-login']
});
</script>
