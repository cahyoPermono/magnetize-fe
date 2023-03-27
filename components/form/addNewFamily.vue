<template>
    <div>
        <Button label="Tambah Keluarga" icon="pi pi-plus" @click="(visible = true)"></Button>
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '80vw' }">
            <Form v-slot="{ meta }">
                <h3 class="text-center">Tambah Data Keluarga</h3>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="member" class="col-2">
                            <small>Sebagai :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field name="member" v-model="data.member" :rules="isRequired">
                                <Dropdown class="w-full" v-model="data.member" :options="levels" optionValue="code"
                                    optionLabel="level_name" placeholder="Select a Level" />
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="nama" class="col-2">
                            <small>Nama :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="nama" v-model="data.name">
                                <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="gender" class="col-2">
                            <small>Gender :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field name="gender" v-model="data.gender" :rules="isRequired">
                                <Dropdown class="w-full" v-model="data.gender" :options="genders" optionValue="code"
                                    optionLabel="level_name" placeholder="Select a Level" />
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="tanggallahir" class="col-2">
                            <small>Tanggal Lahir :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="tanggallahir"
                                v-model="data.date">
                                <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" type="date" />
                                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="pendidikan" class="col-2">
                            <small>Pendidikan :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="pendidikan"
                                v-model="data.education">
                                <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mx-3">
                    <div class="grid">
                        <label for="pekerjaan" class="col-2">
                            <small>Pekerjaan :</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                            <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="pekerjaan"
                                v-model="data.occupation_company">
                                <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                            </Field>
                        </div>
                    </div>
                </div>
                <div class="flex justify-content-end">
                    <Button class="p-button-sm" label="submit" :disabled="!(meta.valid && meta.dirty)" @click="submit()" />
                </div>
            </Form>
        </Dialog>
    </div>
</template>

<script setup>

const props = defineProps({
    dataProps: Array,
});

const submit = () => {
    props.dataProps.push(data.value);
    data.value = {};
    visible.value = false;
};
const visible = ref(false);
const data = ref({
    member: "",
    name: "",
    date: "",
    education: "",
    gender: "",
    occupation_company: "",
});

const levels = [
    { level_name: "Suami/Istri", code: "suami/istri" },
    { level_name: "Anak", code: "anak" },
    { level_name: "Cucu", code: "cucu" },
    { level_name: "Ayah", code: "ayah" },
    { level_name: "Ibu", code: "ibu" },
];

const genders = [
    { level_name: "Pria", code: "L" },
    { level_name: "Wanita", code: "P" },
];

const isRequired = (value) => {
    if (!value) {
        return "This field is required";
    }
    return true;
};

</script>