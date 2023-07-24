<template>
  <div class="bg-pattern2 px-4 py-3 min-h-screen">
    <div>
      <Toast />
    </div>
    <div class="mt-1">
      <Card class="mb-3 flex justify-content-center">
        <template #content>
          <img class="head-form" src="~/assets/formapplication/Header.jpg" alt="header" />
        </template>
      </Card>
    </div>
    <div class="mt-4">
      <Form v-slot="{ meta }">
        <Card v-if="pribadi">
          <template #content>
            <div class="mt-1">
              <div class="text-center">
                <h3 class="text-2xl my-0">Formulir 2</h3>
              </div>
              <div class="mt-5 mx-3">
                <div class="grid">
                  <label for="name" class="col-2">
                    <small>Nama Lengkap</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field
                      v-slot="{ field, errorMessage }"
                      :rules="isRequired"
                      name="name"
                      v-model="data.applicant.name"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        disabled
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="position" class="col-2">
                    <small>Posisi yang dilamar</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field
                      v-slot="{ field, errorMessage }"
                      :rules="isRequired"
                      name="position"
                      v-model="job"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        disabled
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="ktp" class="col-2">
                    <small>No. KTP</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field
                      v-slot="{ field, errorMessage }"
                      :rules="isRequired"
                      name="ktp"
                      v-model="dataPribadi.ktp"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        placeholder="nomor KTP"
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="npwp" class="col-2">
                    <small>No. NPWP</small>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" name="npwp" v-model="dataPribadi.npwp">
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        placeholder="nomor NPWP"
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="rekening" class="col-2">
                    <small>No. Rekening</small><span style="color: red">*</span>
                  </label>
                  <div class="col-2">
                    <Field
                      v-slot="{ field, errorMessage }"
                      name="bank"
                      v-model="dataPribadi.bank"
                      :rules="isRequired"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        placeholder="Nama Bank"
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                  <div class="col">
                    <Field
                      v-slot="{ field, errorMessage }"
                      name="rekening"
                      v-model="dataPribadi.rekening"
                      :rules="isRequired"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        placeholder="nomor rekening"
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button
                class="p-button-sm"
                icon="pi pi-arrow-right"
                @click="(pribadi = false), (keluarga = true)"
                :disabled="!(meta.valid && meta.dirty)"
              />
            </div>
          </template>
        </Card>
        <Card v-if="keluarga">
          <template #content>
            <div class="mt-5" v-if="data.applicant.marital_status === 'lajang'">
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="perkawinan" class="col-2">
                    <small>Status Perkawinan</small>
                  </label>
                  <div class="col">
                    <Field
                      v-slot="{ field, errorMessage }"
                      name="perkawinan"
                      v-model="data.applicant.marital_status"
                    >
                      <InputText
                        v-bind="field"
                        :class="{ 'p-invalid': errorMessage }"
                        class="block w-full"
                        disabled
                      />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <h3 class="text-center">Data Keluarga</h3>
              <hr style="width: 100px" />
              <div class="mx-3">
                <div class="grid">
                  <div class="col-6">
                    <h5>Ayah</h5>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="nama_ayah" class="col-2">
                          <small>Nama</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="nama_ayah"
                            v-model="dataKeluargaLajang[0].name"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="tanggalLahir_ayah" class="col-2">
                          <small>Tanggal Lahir</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="tanggalLahir_ayah"
                            v-model="dataKeluargaLajang[0].date"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                              type="date"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="pendidikan_ayah" class="col-2">
                          <small>Pendidikan</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            name="pendidikan_ayah"
                            v-model="dataKeluargaLajang[0].education"
                            :rules="isRequired"
                          >
                            <Dropdown
                              class="w-full"
                              v-model="dataKeluargaLajang[0].education"
                              :options="levels"
                              optionValue="code"
                              optionLabel="level_name"
                              placeholder="Select a Level"
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="pekerjaan_ayah" class="col-2">
                          <small>Pekerjaan</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="pekerjaan_ayah"
                            v-model="dataKeluargaLajang[0].occupation_company"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <h5>Ibu</h5>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="nama_ibu" class="col-2">
                          <small>Nama</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="nama_ibu"
                            v-model="dataKeluargaLajang[1].name"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="tanggalLahir_ibu" class="col-2">
                          <small>Tanggal Lahir</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="tanggalLahir_ibu"
                            v-model="dataKeluargaLajang[1].date"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                              type="date"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="pendidikan_ibu" class="col-2">
                          <small>Pendidikan</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            name="pendidikan_ibu"
                            v-model="dataKeluargaLajang[1].education"
                            :rules="isRequired"
                          >
                            <Dropdown
                              class="w-full"
                              v-model="dataKeluargaLajang[1].education"
                              :options="levels"
                              optionValue="code"
                              optionLabel="level_name"
                              placeholder="Select a Level"
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mx-3">
                      <div class="grid">
                        <label for="pekerjaan_ibu" class="col-2">
                          <small>Pekerjaan</small><span style="color: red">*</span>
                        </label>
                        <div class="col">
                          <Field
                            v-slot="{ field, errorMessage }"
                            name="pekerjaan_ibu"
                            v-model="dataKeluargaLajang[1].occupation_company"
                            :rules="isRequired"
                          >
                            <InputText
                              v-bind="field"
                              :class="{ 'p-invalid': errorMessage }"
                              class="block w-full"
                            />
                            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 class="text-center">Saudara</h5>
              <hr style="width: 100px" />
              <FormAddNewSaudara :data-saudara="dataKeluargaLajang" />
            </div>
            <div class="mt-5" v-else-if="data.applicant.marital_status !== 'lajang'">
              <div class="mt-2 mx-3">
                <div class="grid">
                  <label for="perkawinan" class="col-2">
                    <small>Status Perkawinan</small>
                  </label>
                  <div class="col">
                    <InputText
                      name="perkawinan"
                      v-model="data.applicant.marital_status"
                      class="block w-full"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <h3 class="text-center">Data Keluarga</h3>
              <FormAddNewFamily :dataProps="dataFamArr" />
              <DataTable :value="dataFamArr">
                <Column field="name" header="Nama"></Column>
                <Column field="member" header="Sebagai"></Column>
                <Column field="date" header="Tanggal Lahir"></Column>
                <Column field="education" header="Pendidikan"></Column>
                <Column field="gender" header="Gender"></Column>
                <Column field="occupation_company" header="Pekerjaan"></Column>
              </DataTable>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-between">
              <Button
                class="p-button-sm"
                icon="pi pi-arrow-left"
                @click="(pribadi = true), (keluarga = false)"
              />
              <Button
                class="p-button-sm"
                icon="pi pi-arrow-right"
                @click="(dokumen = true), (keluarga = false)"
              />
            </div>
          </template>
        </Card>
        <Card v-if="dokumen">
          <template #content>
            <FormAddDocument />
          </template>
          <template #footer>
            <div class="flex justify-content-between" v-if="isLoading">
              <Button class="p-button-sm" icon="pi pi-arrow-left" :disabled="true" />
              <Button
                class="p-button-sm"
                icon="pi pi-spin pi-spinner"
                label="Loading"
                :disabled="true"
              />
            </div>
            <div class="flex justify-content-between" v-else>
              <Button
                class="p-button-sm"
                icon="pi pi-arrow-left"
                @click="(keluarga = true), (dokumen = false)"
              />
              <Button class="p-button-sm" icon="pi pi-save" @click="save()" :disabled="isDocDis" />
            </div>
          </template>
        </Card>
      </Form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "~~/stores/applicant_auth";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
let pribadi = ref(true);
let keluarga = ref(false);
let dokumen = ref(false);

const dataFamArr = ref([]);
const store = useStore();
const config = useRuntimeConfig();
const applicant = useCookie("user");
const data = ref({});
const job = ref("");
const dataPribadi = ref({
  ktp: "",
  npwp: "",
  bank: "",
  rekening: "",
});
const dataKeluargaLajang = ref([
  {
    member: "ayah",
    name: "",
    date: "",
    education: "",
    occupation_company: "",
    gender: "L",
  },
  {
    member: "ibu",
    name: "",
    date: "",
    education: "",
    occupation_company: "",
    gender: "P",
  },
]);
const isLoading = ref(false);

const isDocDis = computed(() => {
  if (store.document[0].file && store.document[1].file && store.document[3].file) {
    return false;
  } else {
    return true;
  }
});

const save = async () => {
  try {
    isLoading.value = true;
    const save = {
      name: data.value.applicant.name,
      applicant: {
        ktp_no: dataPribadi.value.ktp,
        npwp_no: dataPribadi.value.npwp,
        account_no: dataPribadi.value.rekening,
        status: "Sudah Mengisi Tahap 2",
      },
      families:
        data.value.applicant.marital_status !== "lajang"
          ? dataFamArr.value
          : dataKeluargaLajang.value,
      attachments: store.document,
    };
    const post = await axios.put(
      config.API_BASE_URL + "applicants/" + applicant.value.ApplicantId,
      save
    );
    isLoading.value = false;
    toast.add({
      severity: "info",
      summary: "Sukses",
      detail: post.data.message,
      life: 1000,
    });
    setTimeout(() => {
      router.push({ path: "/formapplication/dashboard/" });
    }, 1000);
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

const levels = [
  { level_name: "Pasca Sarjana (S2)", code: "S2" },
  { level_name: "Sarjana (S1)", code: "S1" },
  { level_name: "Akademi (D3)", code: "D3" },
  { level_name: "SMU", code: "SMU" },
];

onMounted(async () => {
  const res = await axios.get(config.API_BASE_URL + "applicant_auth/" + applicant.value.id, {
    headers: { Authorization: `Bearer ${store.token}` },
  });
  data.value = res.data.data;
  job.value = res.data.data.applicant.job.name;
});

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

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
