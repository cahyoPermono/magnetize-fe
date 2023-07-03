<template>
  <div>
    <Toast />
    <Button label="Tambah Skill" icon="pi pi-plus" @click="openModal()" />
    <Dialog
      v-model:visible="displayModal"
      header="Tambah Skill"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <Form @submit="submitSkill" :validation-schema="schema">
        <Field name="skill" v-slot="{ field, errorMessage }">
          <div class="field">
            <label for="skill">Skill Name</label> <br />
            <InputText
              v-bind="field"
              aria-describedby="skill-help"
              :class="{ 'p-invalid': errorMessage }"
              class="w-100"
            />
          </div>
        </Field>
        <hr />
        <Field name="sub_skill_1" v-slot="{ field, errorMessage }">
          <div class="field">
            <label for="sub_skill_1" class="mr-2">Sub Skill 1</label>
            <InputText
              v-bind="field"
              aria-describedby="sub_skill_help"
              :class="{ 'p-invalid': errorMessage }"
              class="w-100"
            />
          </div>
        </Field>

        <Field name="sub_skill_2" v-slot="{ field, errorMessage }">
          <div class="field">
            <label for="sub_skill_2" class="mr-2">Sub Skill 2</label>
            <InputText
              v-bind="field"
              aria-describedby="sub_skill_2_help"
              :class="{ 'p-invalid': errorMessage }"
              class="w-100"
            />
          </div>
        </Field>

        <Field name="sub_skill_3" v-slot="{ field, errorMessage }">
          <div class="field">
            <label for="sub_skill_3" class="mr-2">Sub Skill 3</label>
            <InputText
              v-bind="field"
              aria-describedby="sub_skill_3_help"
              :class="{ 'p-invalid': errorMessage }"
              class="w-100"
            />
          </div>
        </Field>

        <Field name="sub_skill_4" v-slot="{ field, errorMessage }">
          <div class="field">
            <label for="sub_skill_4" class="mr-2">Sub Skill 4</label>
            <InputText
              v-bind="field"
              aria-describedby="sub_skill_4_help"
              :class="{ 'p-invalid': errorMessage }"
              class="w-100"
            />
          </div>
        </Field>

        <Button @click="openModal()" label="Cancel" class="mr-2" />
        <button type="submit" class="p-button p-button-warning">ok</button>
      </Form>
    </Dialog>

    <div class="mt-2">
      <Card>
        <template #content>
          <ul v-for="(skill, index) in skills_arr" :key="index">
            <li>
              <b>{{ skill.skill }}</b> :
              <span v-for="(subskill, indexx) in skill.subskills" :key="indexx">
                <span>{{ subskill.subskill }}</span> ,
              </span>
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import * as yup from "yup";

const toast = useToast();
const route = useRoute();
const displayModal = ref(false);
const config = useRuntimeConfig();
const skills_arr = ref({});

//all about add skill
const openModal = () => {
  displayModal.value = !displayModal.value;
};
const submitSkill = async (values) => {
  try {
    const newSkill = {
      skill: values.skill,
      jobId: route.params.id,
    };
    const newSubSkill = [
      values.sub_skill_1,
      values.sub_skill_2,
      values.sub_skill_3,
      values.sub_skill_4,
    ];
    const addSkill = await axios.post(config.API_BASE_URL + "skills", newSkill);
    const res = addSkill.data.data;
    newSubSkill.forEach(async (element) => {
      await axios.post(config.API_BASE_URL + "subskills", {
        subskill: element,
        skillId: res.id,
      });
    });
    toast.add({ severity: "info", summary: "Berhasil menambahkan skill baru", life: 3000 });
    openModal();
    await getSkills();
  } catch (error) {
    console.log(error);
    openModal();
  }
};
const schema = yup.object({
  skill: yup.string().required(),
  sub_skill_1: yup.string().required(),
  sub_skill_2: yup.string().required(),
  sub_skill_3: yup.string().required(),
  sub_skill_4: yup.string().required(),
});

//get data skill and subskill
const getSkills = async () => {
  const res = await axios.get(config.API_BASE_URL + "skills/"+ route.params.id);
  skills_arr.value = res.data.data;
};

onMounted(async () => {
  await getSkills();
});
</script>
