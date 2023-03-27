<template>
    <div>
        <Toast />
        <div class="flex flex-wrap align-items-center justify-content-center min-h-screen bg-pattern">
            <div class="card shadow-4 w-6 fadein animation-duration-500 transition-delay-1000">
                <TabView :activeIndex="1">
                    <TabPanel header="Register">
                        <Form v-slot="{ meta }" @submit="save" :validation-schema="schema_2">
                            <div class="px-5">
                                <div class="text-center">
                                    <h3 class="mb-0">Daftar</h3>
                                    <span>Sebagai Pelamar</span>
                                </div>
                                <div class="grid">
                                    <div class="col-12">
                                        <label for="name">
                                            <small>Nama</small><span style="color: red">*</span>
                                        </label>
                                        <Field name="name" v-slot="{ field, errorMessage }" >
                                            <div class="field">
                                                <InputText v-bind="field" aria-describedby="email-help" type="text"
                                                    :class="{ 'p-invalid': errorMessage }" class="w-12" />
                                            </div>
                                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                                        </Field>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="col-6">
                                        <label for="email">
                                            <small>Email</small><span style="color: red">*</span>
                                        </label>
                                        <Field name="email" v-slot="{ field, errorMessage }">
                                            <div class="field">
                                                <InputText v-bind="field" aria-describedby="email-help" type="email"
                                                    :class="{ 'p-invalid': errorMessage }" class="w-12" />
                                            </div>
                                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                                        </Field>
                                    </div>
                                    <div class="col-6">
                                        <label for="password">
                                            <small>Password</small><span style="color: red">*</span>
                                        </label>
                                        <Field name="password" v-slot="{ field, errorMessage }">
                                            <div class="field">
                                                <InputText v-bind="field" aria-describedby="email-help" type="password"
                                                    :class="{ 'p-invalid': errorMessage }" class="w-12" />
                                            </div>
                                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                                        </Field>
                                    </div>
                                </div>
                                <div class="col-12 flex justify-content-end">
                                    <Button class="p-button-sm mt-2" icon="pi pi-save" label="Register" type="submit"
                                        :disabled="!(meta.valid && meta.dirty)" />
                                </div>
                            </div>
                        </Form>
                    </TabPanel>
                    <TabPanel header="Login">
                        <div class="px-5">
                            <div class="text-center">
                                <h3 class="mb-0">Login</h3>
                                <span>Sebagai Pelamar</span>
                            </div>
                            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ meta }">
                                <div class="grid">
                                    <div class="col-12">
                                        <label for="email">
                                            <small>Email</small><span style="color: red">*</span>
                                        </label>
                                        <Field name="email" v-slot="{ field, errorMessage }" type="email">
                                            <div class="field">
                                                <InputText v-bind="field" aria-describedby="email-help"
                                                    :class="{ 'p-invalid': errorMessage }" class="w-12" />
                                            </div>
                                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                                        </Field>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="col-12">
                                        <label for="password" class="col-form-label">
                                            <small>Password</small><span style="color: red">*</span>
                                        </label>
                                        <Field name="password" v-slot="{ field, errorMessage }" type="password">
                                            <div class="field">
                                                <InputText v-bind="field" aria-describedby="email-help"
                                                    :class="{ 'p-invalid': errorMessage }" type="password" class="w-12" />
                                            </div>
                                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                                        </Field>
                                    </div>
                                </div>
                                <div class="flex justify-content-end">
                                    <Button type="submit" icon="pi pi-save" label="Login"
                                        :disabled="!(meta.valid && meta.dirty)" />
                                </div>
                            </Form>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/stores/applicant_auth";
import * as yup from 'yup';

const toast = useToast();
const config = useRuntimeConfig();
const router = useRouter();
const token = useCookie("token");
const user = useCookie("user");
const schema = yup.object({
    email: yup.string().required().email().label('Email address'),
    password: yup.string().required().label('Password')
});
const schema_2 = yup.object({
    email: yup.string().required().email().label('Email address'),
    name: yup.string().required().label('name'),
    password: yup.string().required().label('Password')
});
const applicant = ref({
    name: "",
    email: "",
    password: ""
});


const save = async (values) => {
    try {
        applicant.value.email = values.email;
        applicant.value.name = values.name;
        applicant.value.password = values.password;
        const data = await axios.post(config.API_BASE_URL + "applicant_auth/register", applicant.value);
        applicant.value.name = "";
        applicant.value.email = "";
        applicant.value.password = "";
        toast.add({
            severity: "success",
            summary: "Berhasil",
            detail: `${data.data.message}`,
            life: 2000,
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Gagal",
            detail: `${error.response.data.error}`,
            life: 3000,
        });
    }
};

const onSubmit = async (values) => {
    applicant.value.email = values.email;
    applicant.value.password = values.password;
    try {
        const data = await axios.post(config.API_BASE_URL + "applicant_auth/login", applicant.value);
        token.value = data.data.token;
        const user_ = JSON.stringify(data.data.user);
        user.value = user_;
        toast.add({
            severity: "success",
            summary: "Berhasil",
            detail: `${data.data.message}`
        });
        setTimeout(async () => {
            window.location.assign('/formapplication/dashboard');
        }, 1000);
    } catch (error) {
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
