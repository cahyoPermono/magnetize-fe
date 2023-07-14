<template>
  <div class="container">
    <LandingApply v-if="landingApply" @next="(personalPage = true), (landingApply = false)" />
    <PersonalPage
      v-show="personalPage"
      @back="(landingApply = true), (personalPage = false)"
      @next="(familyPage = true), (personalPage = false)"
    />
    <FamilyPage
      v-show="familyPage"
      @back="(personalPage = true), (familyPage = false)"
      @next="(formalEducation = true), (familyPage = false)"
    />
    <FormalEducation
      v-if="formalEducation"
      @back="(familyPage = true), (formalEducation = false)"
      @next="(nonFormalEducation = true), (formalEducation = false)"
    />
    <NonFormalEducation
      v-if="nonFormalEducation"
      @back="(formalEducation = true), (nonFormalEducation = false)"
      @next="(computerLiterate = true), (nonFormalEducation = false)"
    />
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
    <TechnicalSkill
      v-show="technicalSkill"
      @next="(next = true), (technicalSkill = false)"
      @previous="(computerLiterate = true), (technicalSkill = false)"
    />
    <div v-if="next">
      <p>next page</p>
      <div>
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-left"
          @click="(next = false), (technicalSkill = true)"
          v-if="store.applicant.selectedJob.JobCategoryId === 2"
        />
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-left"
          @click="(next = false), (computerLiterate = true)"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

//PAGES
import LandingApply from "./component/LandingApply.vue";
const PersonalPage = defineAsyncComponent(() => import("./component/PersonalPage.vue"));
const FamilyPage = defineAsyncComponent(() => import("./component/FamilyPage.vue"));
const FormalEducation = defineAsyncComponent(() => import("./component/FormalEducation.vue"));
const NonFormalEducation = defineAsyncComponent(() => import("./component/NonFormalEducation.vue"));
const ComputerLiterate = defineAsyncComponent(() => import("./component/ComputerLiterate.vue"));
const TechnicalSkill = defineAsyncComponent(() => import("./component/TechnicalSkill.vue"));

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
let landingApply = ref(true);
let technicalSkill = ref(false);
let personalPage = ref(false);
let familyPage = ref(false);
let formalEducation = ref(false);
let nonFormalEducation = ref(false);
let computerLiterate = ref(false);
let next = ref(false);

const data = ref([]);
const saveData = (subskills_arr) => {
  data.value = subskills_arr;
};

definePageMeta({
  layout: false,
});
</script>
