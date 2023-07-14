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
      @next="(technicalSkill = true), (familyPage = false)"
    />
    <TechnicalSkill
      v-show="technicalSkill"
      @next="(next = true), (technicalSkill = false)"
      @previous="(landingApply = true), (technicalSkill = false)"
      @data-subskill="saveData"
      :selectedJobId="1"
    />
    <div v-show="next">
      <p>next page</p>
      <div>
        <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(next = false), (now = true)" />
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
const TechnicalSkill = defineAsyncComponent(() => import("./component/TechnicalSkill.vue"));
const PersonalPage = defineAsyncComponent(() => import("./component/PersonalPage.vue"));
const FamilyPage = defineAsyncComponent(() => import("./component/FamilyPage.vue"));

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
let next = ref(false);

const data = ref([]);
const saveData = (subskills_arr) => {
  data.value = subskills_arr;
};

definePageMeta({
  layout: false,
});
</script>
