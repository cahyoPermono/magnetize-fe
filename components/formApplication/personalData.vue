<template>

  <div class="mt-4">

  </div>

</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

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