<template>
  <Toast />
  <div class="bg-pattern2 px-4 py-3 min-h-screen">
    <div class="mx-5">
      <Card class="mb-3 flex justify-content-center">
        <template #content>
          <img
            class="head-form"
            src="~/assets/formapplication/Header.jpg"
            alt="header"
            style="max-width: 100%; height: auto"
          />
        </template>
      </Card>
    </div>
    <div class="mx-5 form-1">
      <LandingApply v-if="landingApply" @next="(personalPage = true), (landingApply = false)" />
    </div>
    <div class="mx-5 form-1">
      <PersonalPage
        v-show="personalPage"
        @back="(landingApply = true), (personalPage = false)"
        @next="(familyPage = true), (personalPage = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <FamilyPage
        v-show="familyPage"
        @back="(personalPage = true), (familyPage = false)"
        @next="(formalEducation = true), (familyPage = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <FormalEducation
        v-if="formalEducation"
        @back="(familyPage = true), (formalEducation = false)"
        @next="(nonFormalEducation = true), (formalEducation = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <NonFormalEducation
        v-if="nonFormalEducation"
        @back="(formalEducation = true), (nonFormalEducation = false)"
        @next="(computerLiterate = true), (nonFormalEducation = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <div v-if="computerLiterate">
        <ComputerLiterate
          v-if="store.applicant.selectedJob.JobCategoryId === 2"
          @back="(nonFormalEducation = true), (computerLiterate = false)"
          @next="(technicalSkill = true), (computerLiterate = false)"
        />
        <ComputerLiterate
          v-else
          @back="(nonFormalEducation = true), (computerLiterate = false)"
          @next="(next = true), (computerLiterate = false)"
        />
      </div>
    </div>
    <div class="mx-5 form-1">
      <TechnicalSkill
        v-show="technicalSkill"
        @next="(employmentHistory = true), (technicalSkill = false)"
        @back="(computerLiterate = true), (technicalSkill = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <div v-if="employmentHistory">
        <EmployHistory
          v-if="store.applicant.selectedJob.JobCategoryId === 2"
          @next="(jobDesc = true), (employmentHistory = false)"
          @back="(technicalSkill = true), (employmentHistory = false)"
        />
        <EmployHistory
          v-else
          @next="(jobDesc = true), (employmentHistory = false)"
          @back="(computerLiterate = true), (employmentHistory = false)"
        />
      </div>
    </div>
    <div class="mx-5 form-1">
      <JobDesc
        v-if="jobDesc"
        @next="(otherInformation = true), (jobDesc = false)"
        @back="(employmentHistory = true), (jobDesc = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <OtherInfo
        v-if="otherInformation"
        @next="(otherInformation2 = true), (otherInformation = false)"
        @back="(jobDesc = true), (otherInformation = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <OtherInfo2
        v-if="otherInformation2"
        @next="(next = true), (otherInformation2 = false)"
        @back="(otherInformation = true), (otherInformation2 = false)"
      />
    </div>
    <div class="mx-5 form-1">
      <div v-if="next">
        <Card>
          <template #title>
            Halaman Persetujuan<span
              ><small><i> (Agreement)</i></small></span
            >
          </template>
          <template #content>
            <p>
              Dengan ini saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar dan
              lengkap. Saya sungguh memahami, menerima, dan menyetujui jika terdapat pernyataan yang
              tidak sesuai atau tidak benar dengan apa yang telah saya tuliskan di atas akan
              menyebabkan batalnya lamaran ini dan atau saya bersedia mengundurkan diri apabila saya
              telah diterima bekerja oleh Perusahaan.
            </p>
            <Checkbox v-model="agree" :binary="true" inputId="agreement" />
            <label for="agreement" class="mb-0 ml-2"
              >Saya Menyetujui Semua Syarat dan Ketentuan tersebut</label
            >
          </template>
          <template #footer>
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(next = false), (otherInformation2 = true)"
            />
            <Button
              v-if="loading"
              class="p-button-sm"
              icon="pi pi-spin pi-spinner"
              label="Loading"
              :disabled="true"
              style="float: right"
            />
            <Button
              v-else
              class="p-button-sm"
              icon="pi pi-save"
              label="Save"
              :disabled="!agree"
              style="float: right"
              @click="saveData"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import axios from "axios";
import { useStore } from "~~/stores/StoreApplicant";
import { useToast } from "primevue/usetoast";

//PAGES
import LandingApply from "./component/LandingApply.vue";
const PersonalPage = defineAsyncComponent(() => import("./component/PersonalPage.vue"));
const FamilyPage = defineAsyncComponent(() => import("./component/FamilyPage.vue"));
const FormalEducation = defineAsyncComponent(() => import("./component/FormalEducation.vue"));
const NonFormalEducation = defineAsyncComponent(() => import("./component/NonFormalEducation.vue"));
const ComputerLiterate = defineAsyncComponent(() => import("./component/ComputerLiterate.vue"));
const TechnicalSkill = defineAsyncComponent(() => import("./component/TechnicalSkill.vue"));
const EmployHistory = defineAsyncComponent(() => import("./component/EmployHistory.vue"));
const JobDesc = defineAsyncComponent(() => import("./component/JobDesc.vue"));
const OtherInfo = defineAsyncComponent(() => import("./component/OtherInfo.vue"));
const OtherInfo2 = defineAsyncComponent(() => import("./component/OtherInfo2.vue"));

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();
const config = useRuntimeConfig();
const toast = useToast();
const loading = ref(false);

//Main Data
let landingApply = ref(true);
let technicalSkill = ref(false);
let personalPage = ref(false);
let familyPage = ref(false);
let formalEducation = ref(false);
let nonFormalEducation = ref(false);
let computerLiterate = ref(false);
let employmentHistory = ref(false);
let jobDesc = ref(false);
let otherInformation = ref(false);
let otherInformation2 = ref(false);
let next = ref(false);

const agree = ref(false);

const saveData = async () => {
  try {
    //Destructure Body
    let applicant_new = {
      ...store.applicant,
      jobPosition: store.applicant.selectedJob.name.toUpperCase(),
      JobId: store.applicant.selectedJob.id,
      status: "Selesai Mengisi Tahap  1",
      isCandidate: 0,
    };

    let otherInformation = {
      ...store.otherInformation,
      contact_emergency: `${store.otherInformation.contact_emergency} (${store.otherInformation.person_contact_emergency})`,
      relatives_in_ip: `${store.otherInformation.relatives_in_ip} - ${store.otherInformation.position_relatives_in_ip}`,
      strength: `${store.otherInformation.strength[0]}, ${store.otherInformation.strength[1]}, ${store.otherInformation.strength[2]}`,
      weakness: `${store.otherInformation.weakness[0]}, ${store.otherInformation.weakness[1]}, ${store.otherInformation.weakness[2]}`,
    };

    const data = {
      applicant: applicant_new,
      formalEducation: store.formalEducatePool,
      nonFormalEducation: store.nonFormalEducatePool,
      computer: store.computerPool,
      technicalSkill: store.technicalSkills,
      otherTechnicalSkill: store.otherTechnicalSkills,
      employmentHistory: store.employmentHistoryPool,
      jobdescription: { description: store.jobDesk },
      otherInformation: otherInformation,
    };

    //POST DATA
    const response = await axios.post(config.API_BASE_URL + "applicants", data);

    toast.add({
      severity: "info",
      summary: response.data.message,
      detail: "silahkan login ulang. terima kasih",
      life: 3000,
    });

    setTimeout(() => {
      token.value = null;
      user.value = null;
      loading.value = false;
      router.push("/formapplication/login");
    }, 1000);
  } catch (error) {
    toast.add({
      severity: "danger",
      summary: error.data,
      life: 3000,
    });
    loading.value = false;
  }
};

definePageMeta({
  layout: false,
});
</script>

<style>
.form-1 .p-card {
  padding: 20px;
}
</style>
