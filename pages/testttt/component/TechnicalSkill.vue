<template>
  <Card>
    <template #title> Technical Skills </template>
    <template #subtitle>isi dengan nilai 0-10 (0: tidak mampu, 10: sangat ahli)</template>
    <template #content>
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-4" v-for="(skill, index) in skills" :key="skill.id">
          <Card class="bg-blue-200">
            <template #title>
              <span class="px-2">{{ skill.skill }}</span>
            </template>
            <template #content>
              <div
                class="field pl-4 pr-3"
                v-for="(subskill, index2) in skill.subskills"
                :key="subskill.id"
              >
                <label for="sub_skill_1" class="mr-2">{{ subskill.subskill }}</label>
                <div class="flex">
                  <Field
                    v-model="skills[index].subskills[index2].nilai"
                    v-slot="{ field, errorMessage }"
                    :rules="rule"
                  >
                    <InputText
                      v-bind="field"
                      aria-describedby="sub_skill_help"
                      :class="{ 'p-invalid': errorMessage }"
                      class="mr-2 nilai"
                      type="number"
                      style="width: 4rem"
                      placeholder="nilai"
                      @update:model-value="saveData"
                    />
                  </Field>
                  <Field
                    v-model="skills[index].subskills[index2].keterangan"
                    v-slot="{ field, errorMessage }"
                    :rules="isRequired"
                  >
                    <InputText
                      v-bind="field"
                      aria-describedby="sub_skill_help"
                      :class="{ 'p-invalid': errorMessage }"
                      placeholder="keterangan"
                      @update:model-value="saveData"
                    />
                  </Field>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12 md:col-6 lg:col-4">
          <Card class="bg-blue-200">
            <template #title>
              <span class="px-2">Skill Lain</span>
            </template>
            <template #content>
              <div class="field pl-4 pr-3">
                <Button icon="pi pi-plus" label="tambah skill" @click="addOtherSkill" />
                <div class="mt-3 flex" v-for="(skill, index) in otherSkills" :key="index">
                  <Field v-model="skill.skill" v-slot="{ field, errorMessage }" :rules="rule">
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="mr-2 w-full"
                      style="width: 4rem"
                      placeholder="skill"
                    />
                  </Field>
                  <Field v-model="skill.nilai" v-slot="{ field, errorMessage }" :rules="rule">
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="mr-2 w-50 nilai"
                      style="width: 4rem"
                      placeholder="nilai"
                      type="number"
                    />
                  </Field>
                  <Field v-model="skill.keterangan" v-slot="{ field, errorMessage }" :rules="isRequired">
                    <InputText
                      v-bind="field"
                      :class="{ 'p-invalid': errorMessage }"
                      class="mr-2 w-full"
                      placeholder="keterangan"
                    />
                  </Field>
                  <Button icon="pi pi-trash" class="px-3" @click="delOtherSkill(index)" />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
    <template #footer>
      <Button class="p-button-sm" icon="pi pi-arrow-left" @click="previous" />
      <Button
        class="p-button-sm"
        icon="pi pi-arrow-right"
        style="float: right"
        @click="next"
        :disabled="!disableBtn"
      />
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
//Main Data
const config = useRuntimeConfig();
const store = useStore();

const emits = defineEmits(["data-subskill", "next", "previous"]);
const props = defineProps({
  selectedJobId: {
    type: Number,
    required: true,
  },
});

const next = () => {
  emits("next");
};

const previous = () => {
  emits("previous");
};

//Save Skill
const skills = ref([]);
const saveData = () => {
  const data = skills.value;
  emits("data-subskill", data);
};

//Save Other Skill
const otherSkills = ref([]);
const addOtherSkill = () => {
  otherSkills.value.push({
    skill: "",
    nilai: "",
    keterangan: "",
  });
};
const delOtherSkill = (index) => {
  otherSkills.value.splice(index, 1);
};

/**************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const disableBtn = computed(() => {
  let nilaiArr = [];
  let keteranganArr = [];
  skills.value.forEach((jobSkill) => {
    jobSkill.subskills.forEach((el) => {
      nilaiArr.push(el.nilai);
      keteranganArr.push(el.keterangan);
    });
  });
  let isNilaiNotNull = nilaiArr.includes("");
  let isKeteranganNotNull = keteranganArr.includes("");

  return !(isNilaiNotNull && isKeteranganNotNull);
});

const getSkills = async (selectedJobId) => {
  const res = await axios.get(config.API_BASE_URL + "skills/" + selectedJobId);
  return res.data.data;
};

const getSubskills = (data = []) => {
  return data.map((element) => ({
    skill: element.skill,
    subskills: element.subskills.map((el) => ({
      subskill: el.subskill,
      subskillId: el.id,
      nilai: "",
      keterangan: "",
    })),
  }));
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const rule = (value) => {
  if (value > 10 || value < 0) {
    return "number not valid";
  }

  if (!value) {
    return "field is required";
  }
  return true;
};

onMounted(async () => {
  const data = await getSkills(store.applicant.JobId);
  skills.value = getSubskills(data);
});
</script>
