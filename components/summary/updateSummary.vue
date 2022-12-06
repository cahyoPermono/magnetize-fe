<template>
    <Dialog v-model:visible="props.modalUpdateJob" header="Edit Job Detail"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
        <div class="card p-3">
            <Form @submit="save">
                <div class="row mt-2">
                    <div class="col-7">
                        <label for="name"><small>Posisi</small><span style="color: red">*</span></label>
                        <Field class="form-control" name="name" :rules="isRequired" v-model="job.name" />
                        <ErrorMessage name="name"><small style="color: red">Position Name is required</small>
                        </ErrorMessage>
                    </div>
                    <div class="col-3">
                        <label for="departement"><small>Departemen</small><span style="color: red">*</span></label> <br>
                        <Dropdown v-model="DepartementId" :options="departements" optionLabel="nama"
                            placeholder="Pilih Departemen" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <label for="lokasi"><small>Lokasi</small><span style="color: red">*</span></label>
                        <Field class="form-control" name="lokasi" :rules="isRequired" v-model="job.location" />
                        <ErrorMessage name="lokasi"><small style="color: red">Location is required</small>
                        </ErrorMessage>
                    </div>
                    <div class="col-3">
                        <label><small>Remote</small></label><br>
                        <InputSwitch v-model="job.remote" name="remote" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <label for="headcount"><small>Headcount</small><span style="color: red">*</span></label>
                        <Field type="number" class="form-control" name="headcount" :rules="isRequired"
                            v-model="job.headcount" />
                        <ErrorMessage name="headcount"><small style="color: red">Headcount is required</small>
                        </ErrorMessage>
                    </div>
                    <div class="col-3">
                        <label for="contract_detail"><small>Contract</small><span style="color: red">*</span></label>
                        <Dropdown v-model="job.contract_detail" :options="contract_detail" optionLabel="a"
                            placeholder="Jenis Kontrak" />
                        <ErrorMessage name="headcount"><small style="color: red">Headcount is required</small>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label><small>Minimum Salary</small><span style="color: red">*</span></label>
                        <Field type="number" class="form-control" name="min_salary" :rules="isRequired"
                            v-model="job.min_salary" />
                        <ErrorMessage name="min_salary"><small style="color: red">Minimum Salary is required</small>
                        </ErrorMessage>
                    </div>
                    <div class="col-6">
                        <label><small>Maximum Salary</small><span style="color: red">*</span></label>
                        <Field type="number" class="form-control" name="max_salary" :rules="isRequired"
                            v-model="job.max_salary" />
                        <ErrorMessage name="max_salary"><small style="color: red">Maximum Salary is required</small>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label><small>Currency</small><span style="color: red">*</span></label> <br>
                        <Dropdown v-model="job.currency" :options="CurrencyList" optionLabel="text"
                            placeholder="Jenis Mata Uang" />
                        <ErrorMessage name="currency"><small style="color: red">Currency is required</small>
                        </ErrorMessage>
                    </div>
                    <div class="col-6">
                        <label><small>Frekuensi Penggajian</small><span style="color: red">*</span></label> <br>
                        <Dropdown v-model="job.payment_frequency" :options="payment_frequency" optionLabel="text"
                            placeholder="Frekuensi Penggajian" />
                        <ErrorMessage name="payment_frequency"><small style="color: red">payment frequency is
                                required</small>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="deskripsi"><small>Deskripsi</small></label> <br>
                        <Textarea name="deskripsi" v-model="desc" style="width: 100%;" />
                    </div>
                </div>
                <div class="mt-4">
                    <Button label="Submit" icon="pi pi-check" type="submit" />
                </div>
            </Form>
        </div>
        <template #footer>
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-outlined" @click="closeModal()" />
        </template>
    </Dialog>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const props = defineProps({
    modalUpdateJob: {
        type: Boolean,
    }
});
const emit = defineEmits(['closeModal']);
const closeModal = () => {
    emit('closeModal')
};
let job = reactive();
onMounted(async ()=>{
    job = await axios.get(config.API_BASE_URL + "jobs/" + route.params.id);
    job = await job.data.data;
});
</script>