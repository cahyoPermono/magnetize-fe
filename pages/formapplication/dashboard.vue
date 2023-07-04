<template>
  <div class="grid mr-0 p-3">
    <div class="col-4 col-offset-1">
      <Card class="bg-yellow-300">
        <template #content>
          <div class="text-center">
            <span v-if="userData.applicant">
              <Avatar :image="userData.applicant.photo" class="mt-3" size="xlarge" shape="circle" />
            </span>
            <div
              v-else
              class="border-circle bg-yellow-500 w-5rem h-5rem flex align-items-center justify-content-center mx-auto"
            >
              <i class="pi pi-user text-center" style="font-size: 2rem"></i>
            </div>
            <h2 class="mt-0 mb-0">{{ user.name }}</h2>
            <span>{{ user.email }}</span>
            <div class="mt-4">
              <span>status :</span>
              <h5 class="mt-0">{{ status }}</h5>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="text-center" v-if="status2">
            <p>
              Anda sudah menyelesaikan semua tahapan interview <br />silahkan tunggu pemberitahuan
              kami selanjutnya, terima kasih.
            </p>
          </div>
          <div class="text-center" v-else-if="userData.applicant">
            <Button
              label="Isi Form"
              @click="toForm(userData.applicant.ApplicantStatusId)"
              class="p-button-success"
              :disabled="isDisabled"
            />
          </div>
          <div class="text-center" v-else>
            <Button label="Isi Form" @click="toForm('#')" class="p-button-success" />
          </div>
        </template>
      </Card>
    </div>
    <div class="col-6">
      <Card class="bg-yellow-300">
        <template #content>
          <div class="flex mb-5">
            <div
              class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center"
            >
              <i class="pi pi-map text-white" style="font-size: 2rem"></i>
            </div>
            <div class="ml-2">
              <p class="text-2xl font-bold m-0">Form Pertama</p>
              <span>{{ isTahap1 }}</span>
            </div>
          </div>
          <div class="flex mb-5">
            <div
              class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center"
            >
              <i class="pi pi-map text-white" style="font-size: 2rem"></i>
            </div>
            <div class="ml-2">
              <p class="text-2xl font-bold m-0">Form Kedua</p>
              <span>{{ isTahap2 }} </span>
            </div>
          </div>
          <div class="flex">
            <div
              class="w-4rem h-4rem border-circle bg-yellow-800 ml-3 flex align-items-center justify-content-center"
            >
              <i class="pi pi-map text-white" style="font-size: 2rem"></i>
            </div>
            <div class="ml-2">
              <p class="text-2xl font-bold m-0">Form Ketiga</p>
              <span> {{ isTahap3 }} </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "~~/stores/applicant_auth";

const user = useCookie("user");
const router = useRouter();
const config = useRuntimeConfig();
const store = useStore();
const userData = ref({});
const statuses = ref([]);

const isDisabled = computed(() => {
  const data = userData.value.applicant.ApplicantStatusId;
  if (data === 3 || data === 5 || data === 6) {
    return true;
  } else {
    return false;
  }
});

const isTahap1 = computed(() => {
  const data = userData.value.applicant;
  if (data && data.ApplicantStatusId >= 3) {
    return "Sudah Mengisi Form Tahap 1";
  } else {
    return "Belum Mengisi";
  }
});

const isTahap2 = computed(() => {
  const data = userData.value.applicant;
  if (data && data.ApplicantStatusId >= 5) {
    return "Sudah Mengisi Form Tahap 2";
  } else {
    return "Belum Mengisi";
  }
});

const isTahap3 = computed(() => {
  const data = userData.value.applicant;
  if (data && data.ApplicantStatusId > 7) {
    return "Sudah Mengisi Form Tahap 3";
  } else {
    return "Belum Mengisi";
  }
});

const status = computed(() => {
  const data = userData.value.applicant;
  if (data) {
    return data.applicantstatus.status;
  } else {
    return "Belum Mengisi Form";
  }
});

const status2 = computed(() => {
  if (userData.value.applicant && userData.value.applicant.ApplicantStatusId > 7) {
    return true;
  }
});

const toForm = (status) => {
  if (status <= 2 || status === "#") {
    router.push({ path: "/formapplication/form" });
  } else if (status >= 4 && status < 6) {
    router.push({ path: "/formapplication/form2" });
  } else {
    router.push({ path: "/formapplication/form3" });
  }
};

onMounted(async () => {
  const applicantAuth = await axios.get(config.API_BASE_URL + "applicant_auth/" + user.value.id, {
    headers: { Authorization: `Bearer ${store.token}` },
  });
  const status = await axios.get(config.API_BASE_URL + "applicantstatus", {
    headers: { Authorization: `Bearer ${store.token}` },
  });
  userData.value = applicantAuth.data.data;
  statuses.value = status.data.data;
});

definePageMeta({
  layout: "applicant",
  middleware: [
    async function (to, from) {
      const store = useStore();
      await store.auth();
    },
  ],
});
</script>
