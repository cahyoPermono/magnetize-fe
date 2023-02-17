<template>
  <div class="card">
    <div class="card-header">
      Data Pribadi&nbsp;<span><small>(Personal Data)</small></span>
    </div>
    <div class="card-body">
      <div class="mt-2">
        <div class="row">
          <div class="col-sm-2">
            <label for="address">
              <small>Alamat Rumah (sesuai KTP)</small
              ><span style="color: red">*</span>
            </label>
          </div>
          <div class="col-sm-2">
            <Dropdown
              name="province"
              v-model="applicant.province"
              :options="dataProvinsi"
              optionLabel="nama"
              placeholder="Provinsi"
              @change="getKota(applicant.province.id, `ktp`)"
            />
            <ErrorMessage name="province">
              <small style="color: red">Province is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="city"
              class="form-control p-0"
              v-model="applicant.city"
              :options="dataKotaKab"
              optionLabel="nama"
              placeholder="Kota/Kabupaten"
              @change="getKecamatan(applicant.city.id, `ktp`)"
            />
            <ErrorMessage name="city">
              <small style="color: red">City is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="district"
              class="form-control p-0"
              v-model="applicant.district"
              :options="dataKecamatan"
              optionLabel="nama"
              placeholder="Kecamatan"
              @change="getDesaKel(applicant.district.id, `ktp`)"
            />
            <ErrorMessage name="district">
              <small style="color: red">district is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="subdistrict"
              class="form-control p-0"
              v-model="applicant.subdistrict"
              :options="dataDesaKel"
              optionLabel="nama"
              placeholder="Kelurahan/Desa"
            />
            <ErrorMessage name="subdistrict">
              <small style="color: red">subdistrict is required</small>
            </ErrorMessage>
          </div>
          <div class="col-sm-2">
            <InputText
              class="form-control"
              name="postal_code"
              type="text"
              v-model="applicant.postal_code_address"
              placeholder="Kode Pos"
            />
            <ErrorMessage name="postal_code">
              <small style="color: red">Postal Code is required</small>
            </ErrorMessage>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-10 offset-sm-2">
            <InputText
              class="form-control"
              name="address"
              type="text"
              v-model="applicant.address"
              placeholder="Alamat Lengkap"
            />
            <ErrorMessage name="address">
              <small style="color: red">Address is required</small>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="row">
          <div class="col-sm-2">
            <label>
              <small>Alamat Rumah (Domisili)</small
              ><span style="color: red">*</span>
            </label>
          </div>
          <div class="col-sm-2">
            <Dropdown
              name="province"
              class="form-control p-0"
              v-model="applicant_domicile.province"
              :options="dataProvinsi"
              optionLabel="nama"
              placeholder="Provinsi"
              @change="getKota(applicant_domicile.province.id, `domicile`)"
            />
            <ErrorMessage name="province">
              <small style="color: red">Province is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="city"
              class="form-control p-0"
              v-model="applicant_domicile.city"
              :options="dataKotaKab_dom"
              optionLabel="nama"
              placeholder="Kota/Kabupaten"
              @change="getKecamatan(applicant_domicile.city.id, `domicile`)"
            />
            <ErrorMessage name="city">
              <small style="color: red">City is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="district"
              class="form-control p-0"
              v-model="applicant_domicile.district"
              :options="dataKecamatan_dom"
              optionLabel="nama"
              placeholder="Kecamatan"
              @change="getDesaKel(applicant_domicile.district.id, `domicile`)"
            />
            <ErrorMessage name="district">
              <small style="color: red">district is required</small>
            </ErrorMessage>
          </div>

          <div class="col-sm-2">
            <Dropdown
              name="subdistrict"
              class="form-control p-0"
              v-model="applicant_domicile.subdistrict"
              :options="dataDesaKel_dom"
              optionLabel="nama"
              placeholder="Kelurahan/Desa"
            />
            <ErrorMessage name="subdistrict">
              <small style="color: red">subdistrict is required</small>
            </ErrorMessage>
          </div>
          <div class="col-sm-2">
            <InputText
              class="form-control"
              name="postal_code"
              type="text"
              v-model="applicant_domicile.postal_code_address"
              placeholder="Kode Pos"
            />
            <ErrorMessage name="postal_code">
              <small style="color: red">Postal Code is required</small>
            </ErrorMessage>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-10 offset-sm-2">
            <InputText
              class="form-control"
              name="address"
              type="text"
              v-model="applicant_domicile.address"
              placeholder="Alamat Lengkap"
            />
            <ErrorMessage name="address">
              <small style="color: red">Address is required</small>
            </ErrorMessage>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="row">
          <label for="office_parent_phone" class="col-sm-2 col-form-label">
            <small>No. Hp Orang Tua</small>
          </label>
          <div class="col-sm">
            <Field
              class="form-control"
              name="office_parent_phone"
              v-model="applicant.office_parent_phone"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="row">
          <label for="npwp_no" class="col-sm-2 col-form-label">
            <small>No. NPWP (jika ada)</small>
          </label>
          <div class="col-sm">
            <Field
              class="form-control"
              name="npwp_no"
              v-model="applicant.npwp_no"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="row">
          <label for="account_no" class="col-sm-2 col-form-label">
            <small>No. Rekening (jika ada)</small>
          </label>
          <div class="col-sm">
            <Field
              class="form-control"
              name="account_no"
              v-model="applicant.account_no"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card-footer text-muted">
      <Button
        class="p-button-sm"
        icon="pi pi-arrow-left"
        @click="(personal2 = false), (personal1 = true)"
      />
      <Button
        class="p-button-sm"
        icon="pi pi-arrow-right"
        @click="(personal2 = false), (family = true)"
        :disabled="!(meta.valid && meta.dirty)"
        style="float: right"
      />
    </div> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { usePermission } from "~~/stores/permission";

const store = usePermission();
const router = useRouter();
const config = useRuntimeConfig();
const EXT_API_URL = "https://dev.farizdotid.com/api/daerahindonesia/";
const dataProvinsi = ref([]);
const dataKotaKab = ref([]);
const dataKecamatan = ref([]);
const dataDesaKel = ref([]);

const dataKotaKab_dom = ref([]);
const dataKecamatan_dom = ref([]);
const dataDesaKel_dom = ref([]);

const getProvinsi = async () => {
  const res = await axios.get(EXT_API_URL + "provinsi");
  dataProvinsi.value = res.data.provinsi;
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

const applicant = ref({
  province: "",
  city: "",
  district: "",
  subdistrict: "",
  postal_code_address: "",
  address: "",
});

const applicant_domicile = ref({
  province: "",
  city: "",
  district: "",
  subdistrict: "",
  postal_code_address: "",
  address: "",
});

onMounted(async () => {
  await getProvinsi();
});
</script>
