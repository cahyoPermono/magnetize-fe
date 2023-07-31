<template>
  <div class="grid mr-0 p-3 justify-content-center">
    <div class="md:col-5 col-12">
      <Card class="bg-yellow-300 p-3">
        <template #content>
          <div class="text-center">
            <span v-if="userData">
              <Avatar :image="userData.photo" class="mt-3" size="xlarge" shape="circle" />
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
              <h4 class="mt-0">{{ status }}</h4>
              <!-- {{ userData }} -->
            </div>
          </div>
        </template>
        <template #footer>
          <div class="text-center">
            <Button
              label="Isi Form"
              @click="toForm(applicantStatus)"
              class="p-button-success"
              :disabled="isDisabled"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="md:col-5 col-12">
      <Card class="bg-yellow-300 p-3">
        <template #title> Application Progress </template>
        <template #content>
          <div v-for="status in statuses" :key="status.id">
            <div v-if="applicantStatus > status.id">
              <div class="flex">
                <div
                  class="w-2rem h-2rem border-circle mt-2 bg-yellow-600 ml-3 flex align-items-center justify-content-center"
                >
                  <i class="pi pi-check text-white" style="font-size: 1rem"></i>
                </div>
                <div class="ml-2 text-sm align-items-center flex">
                  <h5 class="my-0">{{ status.status }}</h5>
                </div>
              </div>
            </div>
            <div v-else-if="applicantStatus == status.id">
              <div class="flex">
                <div
                  class="w-2rem h-2rem border-circle mt-2 bg-yellow-700 ml-3 flex align-items-center justify-content-center"
                >
                  <i class="pi pi-flag text-white" style="font-size: 1rem"></i>
                </div>
                <div class="ml-2 text-sm align-items-center">
                  <h4 class="my-0">{{ status.status }}</h4>
                  <p class="m-0">{{ userData.interviewer_name ? note : "-" }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex">
                <div
                  class="w-2rem h-2rem border-circle mt-2 bg-yellow-800 ml-3 flex align-items-center justify-content-center"
                >
                  <i class="pi pi-lock text-white" style="font-size: 1rem"></i>
                </div>
                <div class="ml-2 text-sm align-items-center flex">
                  <h5 class="my-0">{{ status.status }}</h5>
                </div>
              </div>
            </div>
            <div
              class="vl mt-2 border-yellow-800"
              style="margin-left: 1.9rem"
              v-if="status.id !== statuses.length"
            ></div>
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

const note = computed(() => {
  const date = userData.value.interview_date.slice(0,10);
  const new_date = `${date.slice(8,10)}-${date.slice(5,7)}-${date.slice(0,4)} `
  return `oleh: ${userData.value.interviewer_name}, pada:  ${new_date}`;
});

const isDisabled = computed(() => {
  const data = applicantStatus.value;
  if (data === 2 || data === 4 || data === 8) {
    return false;
  } else {
    return true;
  }
});

const applicantStatus = computed(() => {
  if (user.value.ApplicantId) {
    return userData.value.ApplicantStatusId;
  }
  return 2;
});

const status = computed(() => {
  if (userData.value.applicantstatus) {
    return userData.value.applicantstatus.status;
  }
  return "Form-1 : Applicantion Form";
});

const toForm = (status) => {
  try {
    if (status === 2) {
      router.push({ path: "/formapplication/form" });
    } else if (status === 4) {
      router.push({ path: "/formapplication/form2" });
    } else if (status === 8) {
      router.push({ path: "/formapplication/form3" });
    } else {
      throw "applicant status invalid";
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const applicantAuth = await axios.get(config.API_BASE_URL + "applicant_auth/" + user.value.id, {
    headers: { Authorization: `Bearer ${store.token}` },
  });
  const status = await axios.get(config.API_BASE_URL + "applicantstatus", {
    headers: { Authorization: `Bearer ${store.token}` },
  });
  if (user.value.ApplicantId) {
    userData.value = applicantAuth.data.data.applicant;
  }
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
