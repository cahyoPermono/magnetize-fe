<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card" style="margin-bottom: 15px">
      <Form @submit="save">
        <div class="card-header">
          <h5>Technical Skill</h5>
        </div>
        <div class="card-body">
          <Message>
            <h6>
              Masukkan penilaian Anda tentang penguasaan Anda terhadap beberapa
              library/tools/framework berikut. <br />(Skala 0-10, 0: tidak
              menguasai / hanya pernah mendengar, 10: sangat ahli)
            </h6>
          </Message>
          <div v-for="(skill, index) in arrskill" :key="index">
            <h6>{{ skill.nameskill }}</h6>
            <DataTable :value="skill.subname">
              <Column headerStyle="width: 20em" field="subskill" header="Nama Skill" />
              <Column header="Nilai">
                <template #body="slotProps">
                  <input type="text" v-model="slotProps.data.nilai" class="form-control" />
                </template>
              </Column>
              <Column header="Keterangan">
                <template #body="slotProps">
                  <input type="text" v-model="slotProps.data.keterangan" class="form-control" />
                </template>
              </Column>
            </DataTable>
            <br />
          </div>
          <div>
            <p>Skill Lainnya</p>
            <Message>
              <h6>
                Jika ada technical skill Anda yang belum terdaftar di atas dan
                layak untuk disampaikan, silakan dimasukkan di bawah ini.
              </h6>
            </Message>
            <Button @click="addOther" icon="pi pi-plus" class="p-button-warning"
              v-tooltip.right="'Klik untuk menambahkan'" />
            <DataTable :value="otherskills">
              <Column headerStyle="width: 20em" header="Nama Skill">
                <template #body="slotProps">
                  <input type="text" v-model="slotProps.data.nameother" class="form-control" />
                </template>
              </Column>
              <Column header="Nilai">
                <template #body="slotProps">
                  <input type="text" v-model="slotProps.data.nilaiother" class="form-control" />
                </template>
              </Column>
              <Column header="Keterangan">
                <template #body="slotProps">
                  <input type="text" v-model="slotProps.data.keteranganother" class="form-control" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <div class="card-footer text-muted">
          <Button class="p-button-sm p-button-text" disabled />
          <Button class="p-button-sm" icon="pi pi-save" type="submit" :loading="loading" style="float: right" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const config = useRuntimeConfig();

const confirm1 = () => {
  confirm.require({
    message: "Selamat Form Application Anda Sudah Lengkap dan Akan Kami Review Segera, Terima Kasih",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      navigateTo('/')
      // router.push({ path: "/" });
    },
  });
};

const showWarn = () => {
  toast.add({ severity: 'warn', summary: 'Pengiriman Data', detail: 'Data Anda Sedang Kami Kirim Ke HRD', life: 3000 });
}

const applicants = ref(null);
const jobs = ref(null);
const skills = ref(null);
const arrskill = reactive([]);
const loading = ref(false);

const otherskills = reactive([
  {
    nameother: "",
    nilaiother: "",
    keteranganother: "",
  },
]);

function addOther() {
  otherskills.push({
    nameother: "",
    nilaiother: "",
    keteranganother: "",
  });
}

onMounted(async () => {
  await getApplicant();
  await getJob();
});

async function getApplicant() {
  try {
    await axios.get(config.API_BASE_URL + "applicants").then(async (response) => {
      applicants.value = await response.data.data[0];
    });
    console.log(applicants.value)
  } catch (err) {
    console.log(err);
  }
}

async function getJob() {
  try {
    const job_applicant = applicants.value.job
    const skills_promise = await axios.get(config.API_BASE_URL + "skills/" + job_applicant.id);
    const skills = skills_promise.data.data;
    skills.forEach((element) => {
      arrskill.push({
        nameskill: element.skill,
        subname: element.subskills,
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function save() {
  try {
    await arrskill.forEach((element) => {
      element.subname.forEach((el) => {
        axios.post(config.API_BASE_URL + "applicantskills", {
          applicantId: route.params.id,
          subskillId: el.id,
          nilai: el.nilai,
          keterangan: el.keterangan,
        });
      });
    });
    await otherskills.forEach((elother) => {
      axios.post(config.API_BASE_URL + "otherapplicantskills", {
        applicantId: route.params.id,
        nama: elother.nameother,
        nilai: elother.nilaiother,
        keterangan: elother.keteranganother,
      });
    });
    showWarn();
    loading.value = true;

    const pdf = await axios.get(
      config.API_BASE_URL + "topdf_skill/" + route.params.id
    );
    loading.value = false;
    confirm1();
    // alert(
    //   "Selamat Data Anda Berhasil Dikirim dan Akan Kami Review Segera, Terima Kasih"
    // );
    // router.push({ path: "/formapplication/form" });
  } catch (err) {
    console.log(err);
  }
}
</script>
