<template>
    <div>
        <Toast />
        <Button label="tambah job" icon="pi pi-plus" class="p-button-sm mt-3" @click="openModal" />
        <Dialog v-model:visible="displayModal" header="Tambah Job" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '70vw' }" :modal="true">
            <div class="card p-3 m-2">
                <Form @submit="save" v-slot="{ meta }">
                    <div class="row mt-2">
                        <div class="col-12">
                            <label for="name"><small>Posisi</small><span style="color: red">*</span></label>
                            <Field class="form-control" name="name" :rules="isRequired" v-model="newJob.name" />
                            <ErrorMessage name="name"><small style="color: red">Position Name is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label for="job_category"><small>Kategori</small><span style="color: red">*</span></label>
                            <Field name="job_category" class="form-control w-100" as="select"
                                v-model="newJob.JobCategoryId">
                                <option v-for="data in dataJobCategory" :key="data.id" :value="data.id">
                                    {{ data.category }}
                                </option>
                            </Field>
                            <ErrorMessage name="job_category">
                                <small style="color: red">Category is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label for="departement"><small>Departemen</small><span style="color: red">*</span></label>
                            <Field name="departement" class="form-control w-100" as="select" v-model="newJob.DepartementId">
                                <option class="dropdown-list" v-for="data in departements" :key="data.id" :value="data.id">
                                    {{ data.nama }}
                                </option>
                            </Field>
                            <ErrorMessage name="departement">
                                <small style="color: red">Departement is required</small>
                            </ErrorMessage>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="lokasi"><small>Lokasi</small><span style="color: red">*</span></label>
                            <Field class="form-control" name="lokasi" :rules="isRequired" v-model="newJob.location" />
                            <ErrorMessage name="lokasi"><small style="color: red">Location is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label><small>Remote</small></label><br />
                            <InputSwitch v-model="newJob.remote" name="remote" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="headcount"><small>Headcount</small><span style="color: red">*</span></label>
                            <Field type="number" class="form-control" name="headcount" :rules="isRequired"
                                v-model="newJob.headcount" />
                            <ErrorMessage name="headcount"><small style="color: red">Headcount is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label for="contract_detail"><small>Contract</small><span style="color: red">*</span></label>
                            <Field name="contract_detail" class="form-control w-100" as="select"
                                v-model="newJob.contract_detail">
                                <option v-for="(data, index) in contract_detail" :key="index" :value="data.a">
                                    {{ data.a }}
                                </option>
                            </Field>
                            <ErrorMessage name="contract_detail">
                                <small style="color: red">Contract Detal is required</small>
                            </ErrorMessage>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label><small>Minimum Salary</small><span style="color: red">*</span></label>
                            <Field type="number" class="form-control" name="min_salary" :rules="isRequired"
                                v-model="newJob.min_salary" />
                            <ErrorMessage name="min_salary"><small style="color: red">Minimum Salary is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label><small>Maximum Salary</small><span style="color: red">*</span></label>
                            <Field type="number" class="form-control" name="max_salary" :rules="isRequired"
                                v-model="newJob.max_salary" />
                            <ErrorMessage name="max_salary"><small style="color: red">Maximum Salary is required</small>
                            </ErrorMessage>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="currency"><small>Currency</small><span style="color: red">*</span></label>
                            <Field name="currency" class="form-control w-100" as="select" v-model="newJob.currency">
                                <option v-for="(data, index) in CurrencyList" :key="index" :value="data.code">
                                    {{ data.text }}
                                </option>
                            </Field>
                            <ErrorMessage name="currency">
                                <small style="color: red">Currency is required</small>
                            </ErrorMessage>
                        </div>
                        <div class="col-6">
                            <label for="payment_frequency"><small>Frekuensi Penggajian</small><span
                                    style="color: red">*</span></label>
                            <Field name="payment_frequency" class="form-control w-100" as="select"
                                v-model="newJob.payment_frequency">
                                <option v-for="(data, index) in payment_frequency" :key="index" :value="data.text">
                                    {{ data.text }}
                                </option>
                            </Field>
                            <ErrorMessage name="payment_frequency">
                                <small style="color: red">Frekuensi Penggajian is required</small>
                            </ErrorMessage>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label for="deskripsi"><small>Deskripsi</small></label> <br />
                            <Textarea name="deskripsi" v-model="newJob.desc" style="width: 100%" />
                        </div>
                    </div>
                    <div class="mt-4">
                        <Button label="Submit" icon="pi pi-check" type="submit" :disabled="!(meta.valid && meta.dirty)" />
                    </div>
                </Form>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { usePermission } from "~~/stores/permission";

const toast = useToast();
const config = useRuntimeConfig();
const router = useRouter();
const store = usePermission();
const CurrencyList = [
    { code: "AFN", text: "AFN - Afghanistan Afghanis" },
    { code: "ALL", text: "ALL - Albania Leke" },
    { code: "DZD", text: "DZD - Algeria Dinars" },
    { code: "ARS", text: "ARS - Argentina Pesos" },
    { code: "AUD", text: "AUD - Australia Dollars" },
    { code: "ATS", text: "ATS - Austria Schillings" },
    { code: "BSD", text: "BSD - Bahamas Dollars" },
    { code: "BHD", text: "BHD - Bahrain Dinars" },
    { code: "BDT", text: "BDT - Bangladesh Taka" },
    { code: "BBD", text: "BBD - Barbados Dollars" },
    { code: "BEF", text: "BEF - Belgium Francs" },
    { code: "BMD", text: "BMD - Bermuda Dollars" },
    { code: "BRL", text: "BRL - Brazil Reais" },
    { code: "BGN", text: "BGN - Bulgaria Leva" },
    { code: "CAD", text: "CAD - Canada Dollars" },
    { code: "XOF", text: "XOF - CFA BCEAO Francs" },
    { code: "XAF", text: "XAF - CFA BEAC Francs" },
    { code: "CLP", text: "CLP - Chile Pesos" },
    { code: "CNY", text: "CNY - China Yuan Renminbi" },
    { code: "COP", text: "COP - Colombia Pesos" },
    { code: "XPF", text: "XPF - CFP Francs" },
    { code: "CRC", text: "CRC - Costa Rica Colones" },
    { code: "HRK", text: "HRK - Croatia Kuna" },
    { code: "CYP", text: "CYP - Cyprus Pounds" },
    { code: "CZK", text: "CZK - Czech Republic Koruny" },
    { code: "DKK", text: "DKK - Denmark Kroner" },
    { code: "DEM", text: "DEM - Deutsche (Germany) Marks" },
    { code: "DOP", text: "DOP - Dominican Republic Pesos" },
    { code: "NLG", text: "NLG - Dutch (Netherlands) Guilders" },
    { code: "XCD", text: "XCD - Eastern Caribbean Dollars" },
    { code: "EGP", text: "EGP - Egypt Pounds" },
    { code: "EEK", text: "EEK - Estonia Krooni" },
    { code: "EUR", text: "EUR - Euro" },
    { code: "FJD", text: "FJD - Fiji Dollars" },
    { code: "FIM", text: "FIM - Finland Markkaa" },
    { code: "FRF", text: "FRF - France Francs" },
    { code: "DEM", text: "DEM - Germany Deutsche Marks" },
    { code: "XAU", text: "XAU - Gold Ounces" },
    { code: "GRD", text: "GRD - Greece Drachmae" },
    { code: "GTQ", text: "GTQ - Guatemalan Quetzal" },
    { code: "NLG", text: "NLG - Holland (Netherlands) Guilders" },
    { code: "HKD", text: "HKD - Hong Kong Dollars" },
    { code: "HUF", text: "HUF - Hungary Forint" },
    { code: "ISK", text: "ISK - Iceland Kronur" },
    { code: "XDR", text: "XDR - IMF Special Drawing Right" },
    { code: "INR", text: "INR - India Rupees" },
    { code: "IDR", text: "IDR - Indonesia Rupiahs" },
    { code: "IRR", text: "IRR - Iran Rials" },
    { code: "IQD", text: "IQD - Iraq Dinars" },
    { code: "IEP", text: "IEP - Ireland Pounds" },
    { code: "ILS", text: "ILS - Israel New Shekels" },
    { code: "ITL", text: "ITL - Italy Lire" },
    { code: "JMD", text: "JMD - Jamaica Dollars" },
    { code: "JPY", text: "JPY - Japan Yen" },
    { code: "JOD", text: "JOD - Jordan Dinars" },
    { code: "KES", text: "KES - Kenya Shillings" },
    { code: "KRW", text: "KRW - Korea (South) Won" },
    { code: "KWD", text: "KWD - Kuwait Dinars" },
    { code: "LBP", text: "LBP - Lebanon Pounds" },
    { code: "LUF", text: "LUF - Luxembourg Francs" },
    { code: "MYR", text: "MYR - Malaysia Ringgits" },
    { code: "MTL", text: "MTL - Malta Liri" },
    { code: "MUR", text: "MUR - Mauritius Rupees" },
    { code: "MXN", text: "MXN - Mexico Pesos" },
    { code: "MAD", text: "MAD - Morocco Dirhams" },
    { code: "NLG", text: "NLG - Netherlands Guilders" },
    { code: "NZD", text: "NZD - New Zealand Dollars" },
    { code: "NOK", text: "NOK - Norway Kroner" },
    { code: "OMR", text: "OMR - Oman Rials" },
    { code: "PKR", text: "PKR - Pakistan Rupees" },
    { code: "XPD", text: "XPD - Palladium Ounces" },
    { code: "PEN", text: "PEN - Peru Nuevos Soles" },
    { code: "PHP", text: "PHP - Philippines Pesos" },
    { code: "XPT", text: "XPT - Platinum Ounces" },
    { code: "PLN", text: "PLN - Poland Zlotych" },
    { code: "PTE", text: "PTE - Portugal Escudos" },
    { code: "QAR", text: "QAR - Qatar Riyals" },
    { code: "RON", text: "RON - Romania New Lei" },
    { code: "ROL", text: "ROL - Romania Lei" },
    { code: "RUB", text: "RUB - Russia Rubles" },
    { code: "SAR", text: "SAR - Saudi Arabia Riyals" },
    { code: "XAG", text: "XAG - Silver Ounces" },
    { code: "SGD", text: "SGD - Singapore Dollars" },
    { code: "SKK", text: "SKK - Slovakia Koruny" },
    { code: "SIT", text: "SIT - Slovenia Tolars" },
    { code: "ZAR", text: "ZAR - South Africa Rand" },
    { code: "KRW", text: "KRW - South Korea Won" },
    { code: "ESP", text: "ESP - Spain Pesetas" },
    { code: "XDR", text: "XDR - Special Drawing Rights (IMF)" },
    { code: "LKR", text: "LKR - Sri Lanka Rupees" },
    { code: "SDD", text: "SDD - Sudan Dinars" },
    { code: "SEK", text: "SEK - Sweden Kronor" },
    { code: "CHF", text: "CHF - Switzerland Francs" },
    { code: "TWD", text: "TWD - Taiwan New Dollars" },
    { code: "THB", text: "THB - Thailand Baht" },
    { code: "TTD", text: "TTD - Trinidad and Tobago Dollars" },
    { code: "TND", text: "TND - Tunisia Dinars" },
    { code: "TRY", text: "TRY - Turkey New Lira" },
    { code: "AED", text: "AED - United Arab Emirates Dirhams" },
    { code: "GBP", text: "GBP - United Kingdom Pounds" },
    { code: "USD", text: "USD - United States Dollars" },
    { code: "VEB", text: "VEB - Venezuela Bolivares" },
    { code: "VND", text: "VND - Vietnam Dong" },
    { code: "ZMK", text: "ZMK - Zambia Kwacha" },
];
const payment_frequency = [
    { text: "Annually" },
    { text: "Daily" },
    { text: "Hourly" },
    { text: "Weekly" },
    { text: "Monthly" },
];
const contract_detail = [
    {
        a: "Full-time",
    },
    {
        a: "Part-time",
    },
    {
        a: "Temporary",
    },
    {
        a: "Freelance",
    },
    {
        a: "Internship",
    },
    {
        a: "Apprenticeship",
    },
    {
        a: "Contractor",
    },
    {
        a: "Consultancy",
    },
];
const displayModal = ref(false);
const departements = ref({});
const desc = ref("");
const newJob = reactive({
    name: "",
    JobCategoryId: "",
    DepartementId: "",
    location: "",
    remote: false,
    headcount: "",
    contract_detail: "",
    currency: "",
    min_salary: "",
    max_salary: "",
    payment_frequency: "",
    desc: desc.value,
    creator_id: store.token_user,
    status: "Active"
});
const dataJobCategory = ref({});

const setAll = (obj, val) => Object.keys(obj).forEach((k) => (obj[k] = val));
const setNull = (obj) => setAll(obj, null);

const emit = defineEmits(["loadData"]);

async function save() {
    try {
        await axios
            .post(config.API_BASE_URL + "jobs", newJob)
            .then(() => {
                displayModal.value = false;
                toast.add({
                    severity: "success",
                    summary: "Create Success",
                    detail: "Success Create User",
                    life: 3000,
                });
                emit("loadData");
            })
            .finally(() => {
                setNull(newJob);
                router.push({ path: "/jobs_hcd" });
            });
    } catch (error) {
        console.log(error);
    }
}

function openModal() {
    displayModal.value = !displayModal.value;
}
const getApi = async (endpoint, token_user, token_value) => {
    const data = await axios.get(config.API_BASE_URL + `${endpoint}/` + token_user, {
        headers: {
            Authorization: `Bearer ${token_value}`,
        },
    });
    return data;
}
onMounted(async () => {
    const data_dept = await getApi('all_departements', store.token_user, store.token);
    departements.value = await data_dept.data.departements;
    const dataJobCategory_ = await getApi('all_jobcategories','', store.token);
    dataJobCategory.value = dataJobCategory_.data.categories;
});

const isRequired = (value) => {
    if (!value) {
        return "This field is required";
    }
    return true;
};
</script>
