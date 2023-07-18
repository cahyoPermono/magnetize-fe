<template>
  <Card>
    <template #title>
      Data Pribadi<span><small>(Personal Data)</small></span>
    </template>
    <template #content>
      <Form v-slot="{ meta }">
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="name" class="col-2">
              <small>Nama Lengkap</small><span style="color: red">*</span>
            </label>
            <div class="col-10">
              <Field
                v-slot="{ field, errorMessage }"
                name="name"
                :rules="isRequired"
                v-model="store.applicant.name"
              >
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
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
            <label for="gender" class="col-2">
              <small>Gender</small><span style="color: red">*</span>
            </label>
            <div class="col-10">
              <Field
                type="radio"
                name="applicant_gender"
                value="L"
                :rules="isRequired"
                v-model="store.applicant.gender"
              />
              &nbsp;&nbsp;
              <label for="applicant_gender" class="col-form-label"><small>Laki-Laki</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="applicant_gender"
                value="P"
                :rules="isRequired"
                v-model="store.applicant.gender"
              />
              &nbsp;&nbsp;
              <label for="applicant_gender" class="col-form-label"><small>Perempuan</small></label>
              <ErrorMessage name="applicant_gender">
                <small style="color: red">Gender is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="place_of_birth" class="col-2">
              <small>Tempat/Tanggal Lahir</small><span style="color: red">*</span>
            </label>
            <div class="col-4">
              <Field
                v-slot="{ field, errorMessage }"
                name="place_of_birth"
                :rules="isRequired"
                v-model="store.applicant.place_of_birth"
              >
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
            <div class="col-6">
              <Field
                v-slot="{ field, errorMessage }"
                name="date"
                :rules="isRequired"
                v-model="store.applicant.date"
              >
                <InputText
                  type="date"
                  v-bind="field"
                  aria-describedby="email-help"
                  class="block w-full"
                  :class="{ 'p-invalid': errorMessage }"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <div class="col-2">
              <label for="address">
                <small>Alamat Rumah (sesuai KTP)</small><span style="color: red">*</span>
              </label>
            </div>
            <div class="col-2">
                <Field :rules="isRequired" name="province" v-model="store.applicant.province">
                  <Dropdown
                    class="w-full"
                    v-model="store.selectedAddress.province"
                    :options="dataProvinsi"
                    optionLabel="nama"
                    @change="getKota(store.selectedAddress.province.id, 'ktp')"
                  />
                </Field>
            </div>
            <div class="col-2">
              <Field :rules="isRequired" name="city" v-model="store.applicant.city">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddress.city"
                  :options="dataKotaKab"
                  optionLabel="nama"
                  @change="getKecamatan(store.selectedAddress.city.id, 'ktp')"
                />
              </Field>
            </div>
            <div class="col-2">
              <Field :rules="isRequired" name="district" v-model="store.applicant.district">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddress.district"
                  :options="dataKecamatan"
                  optionLabel="nama"
                  @change="getDesaKel(store.selectedAddress.district.id, 'ktp')"
                />
              </Field>
            </div>
            <div class="col-2">
              <Field :rules="isRequired" name="subdistrict" v-model="store.applicant.subdistrict">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddress.subdistrict"
                  :options="dataDesaKel"
                  optionLabel="nama"
                />
              </Field>
            </div>
            <div class="col-2">
              <Field
                v-slot="{ field, errorMessage }"
                name="postal_code_address"
                v-model="store.applicant.postal_code_address"
                :rules="zipCode"
              >
                <InputText
                v-bind="field"
                class="block w-full"
                :class="{ 'p-invalid': errorMessage }"
                placeholder="Kode Pos"
                aria-label="zip code"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="grid">
            <div class="col-10 col-offset-2">
              <Field
                v-slot="{ field, errorMessage }"
                name="address"
                :rules="isRequired"
                v-model="store.applicant.address"
              >
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                  placeholder="Alamat Lengkap"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <div class="col-2">
              <label for="address">
                <small>Alamat Rumah (Domisili)</small>
              </label>
            </div>
            <div class="col-2">
              <Field name="province_dom" v-model="store.applicant.province_dom">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddressDom.province"
                  :options="dataProvinsi"
                  optionLabel="nama"
                  @change="getKota(store.selectedAddressDom.province.id, 'domicile')"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
            <div class="col-2">
              <Field name="city_dom" v-model="store.applicant.city_dom">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddressDom.city"
                  :options="dataKotaKab_dom"
                  optionLabel="nama"
                  @change="getKecamatan(store.selectedAddressDom.city.id, 'domicile')"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
            <div class="col-2">
              <Field name="district_dom" v-model="store.applicant.district_dom">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddressDom.district"
                  :options="dataKecamatan_dom"
                  optionLabel="nama"
                  @change="getDesaKel(store.selectedAddressDom.district.id, 'domicile')"
                />
              </Field>
            </div>
            <div class="col-2">
              <Field name="subdistrict_dom" v-model="store.applicant.subdistrict_dom">
                <Dropdown
                  class="w-full"
                  v-model="store.selectedAddressDom.subdistrict"
                  :options="dataDesaKel_dom"
                  optionLabel="nama"
                />
              </Field>
            </div>
            <div class="col-2">
              <Field
                v-slot="{ field }"
                name="postal_code_domicile"
                v-model="store.applicant.postal_code_domicile"
              >
                <InputText
                  v-bind="field"
                  class="block w-full"
                  placeholder="Kode Pos"
                  aria-label="zip code"
                />
              </Field>
            </div>
          </div>
          <div class="grid">
            <div class="col-10 col-offset-2">
              <Field v-slot="{ field }" name="domicile" v-model="store.applicant.domicile">
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
                  class="block w-full"
                  placeholder="Alamat Lengkap"
                />
              </Field>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="mobile" class="col-2">
              <small>Handphone</small><span style="color: red">*</span>
            </label>
            <div class="col">
              <Field
                v-slot="{ field, errorMessage }"
                :rules="isRequired"
                name="mobile"
                v-model="store.applicant.mobile"
              >
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                  type="tel"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="blood_type" class="col-2">
              <small>Gol Darah</small>
            </label>
            <div class="col">
              <Field
                type="radio"
                name="blood_type"
                value="A"
                v-model="store.applicant.blood_type"
              />
              <label for="blood_type" class="mr-3 ml-1"><small>A</small></label>
              <Field
                type="radio"
                name="blood_type"
                value="B"
                v-model="store.applicant.blood_type"
              />
              <label for="blood_type" class="mr-3 ml-1"><small>B</small></label>
              <Field
                type="radio"
                name="blood_type"
                value="AB"
                v-model="store.applicant.blood_type"
              />
              <label for="blood_type" class="mr-3 ml-1"><small>AB</small></label>
              <Field
                type="radio"
                name="blood_type"
                value="O"
                v-model="store.applicant.blood_type"
              />
              <label for="blood_type" class="mr-3 ml-1"><small>O</small></label>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="office_parent_phone" class="col-2">
              <small>No HP Orang Tua</small>
            </label>
            <div class="col">
              <Field
                v-slot="{ field, errorMessage }"
                name="office_parent_phone"
                v-model="store.applicant.office_parent_phone"
              >
                <InputText
                  v-bind="field"
                  aria-describedby="email-help"
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
            <label for="email" class="col-2">
              <small>Email</small><span style="color: red">*</span>
            </label>
            <div class="col">
              <Field
                v-slot="{ field, errorMessage }"
                :rules="isRequired"
                name="email"
                v-model="store.applicant.email"
              >
                <InputText v-bind="field" aria-describedby="email-help" :disabled="true" />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
        </div>
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="religion" class="col-2">
              <small>Agama</small><span style="color: red">*</span>
            </label>
            <div class="col">
              <Field
                type="radio"
                name="religion"
                value="islam"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Islam</small></label>
              <Field
                type="radio"
                name="religion"
                value="katholik"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Katholik</small></label>
              <Field
                type="radio"
                name="religion"
                value="protestan"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Protestan</small></label>
              <Field
                type="radio"
                name="religion"
                value="budha"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Budha</small></label>
              <Field
                type="radio"
                name="religion"
                value="hindu"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Hindu</small></label>
              <Field
                type="radio"
                name="religion"
                value="lainnya"
                :rules="isRequired"
                v-model="store.applicant.religion"
              />
              <label for="religion" class="mr-3 ml-1"><small>Lainnya</small></label>
              <ErrorMessage name="religion">
                <small style="color: red">Religion is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="flex justify-content-between mt-4">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="$emit('back')" />
          <Button
            class="p-button-sm"
            icon="pi pi-arrow-right"
            @click="$emit('next')"
            :disabled="!(meta.valid && meta.dirty)"
          />
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//NPM
import axios from "axios";

//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
const emits = defineEmits(["next", "back"]);

/**************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const EXT_API_URL = "https://dev.farizdotid.com/api/daerahindonesia/";
const dataProvinsi = ref([]);

const dataKecamatan = ref([]);
const dataDesaKel = ref([]);
const dataKotaKab = ref([]);

const dataKotaKab_dom = ref([]);
const dataKecamatan_dom = ref([]);
const dataDesaKel_dom = ref([]);

const getProvinsi = async () => {
  const res = await axios.get(EXT_API_URL + "provinsi");
  return res.data.provinsi;
};

const getKota = async (id_prov, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kota?id_provinsi=" + id_prov);
  if (whoIs === "ktp") {
    dataKotaKab.value = res.data.kota_kabupaten;
  } else if (whoIs === "domicile") {
    dataKotaKab_dom.value = res.data.kota_kabupaten;
  }
};

const getKecamatan = async (id_kota, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kecamatan?id_kota=" + id_kota);
  if (whoIs === "ktp") {
    dataKecamatan.value = res.data.kecamatan;
  } else if (whoIs === "domicile") {
    dataKecamatan_dom.value = res.data.kecamatan;
  }
};

const getDesaKel = async (id_kec, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kelurahan?id_kecamatan=" + id_kec);
  if (whoIs === "ktp") {
    dataDesaKel.value = res.data.kelurahan;
  } else if (whoIs === "domicile") {
    dataDesaKel_dom.value = res.data.kelurahan;
  }
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const zipCode = (value) =>{
  let isnum = /^\d+$/.test(value);
  if (!value) {
    return "This field is required";
  }

  if (!isnum) {
    return "number only!";
  }
  return true;
}

onMounted(async () => {
  dataProvinsi.value = await getProvinsi();
});
</script>
