<template>
  <div>
    <Card>
      <template #title> Technical Skills </template>
      <template #subtitle>
        Isi sesuai tingkat kemampuan (0 = tidak menguasai, 10 = sangat mahir)
      </template>
      <template #content>
        <Form @submit="submit">
          <div class="grid">
            <div class="col-12 md:col-6 lg:col-4" v-for="skill in skills" :key="skill.id">
              <Card class="bg-blue-200">
                <template #title>
                  <span class="px-2">{{ skill.skill }}</span>
                </template>
                <template #content>
                  <div
                    class="field pl-4 pr-3"
                    v-for="subskill in skill.subskills"
                    :key="subskill.id"
                  >
                    <!-- {{ subskill }} -->
                    <label for="sub_skill_1" class="mr-2">{{ subskill.subskill }}</label>
                    <div class="flex">
                      <Field
                        :name="'_' + subskill.id"
                        v-slot="{ field, errorMessage }"
                        :rules="rule"
                      >
                        <InputText
                          v-bind="field"
                          aria-describedby="sub_skill_help"
                          :class="{ 'p-invalid': errorMessage }"
                          class="mr-2"
                          type="number"
                          style="width: 4rem"
                          placeholder="nilai"
                        />
                      </Field>
                      <Field
                        :name="'keterangan_' + subskill.id"
                        v-slot="{ field, errorMessage }"
                        :rules="isRequired"
                      >
                        <InputText
                          v-bind="field"
                          aria-describedby="sub_skill_help"
                          :class="{ 'p-invalid': errorMessage }"
                          placeholder="keterangan"
                        />
                      </Field>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
          <!-- <button type="submit">submit</button> -->
          <Button class="p-button-sm" icon="pi pi-arrow-left" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" style="float: right" type="submit" />
        </Form>
        <!-- {{ skills }} -->
      </template>
      <template #footer> </template>
    </Card>
  </div>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const skills = ref({});
const skills_arr = ref([]);

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
  // All is good
  return true;
};
const getSkills = async () => {
  const res = await axios.get(config.API_BASE_URL + "skills/" + route.params.id);
  skills.value = res.data.data;
};

const submit = (values) => {  
  const refactoredArray = [];
  for (let key in values) {
    if (key.startsWith("_")) {
      const subskill = parseInt(key.slice(1));
      const value = values[`_${subskill}`];
      const keterangan = values[`keterangan_${subskill}`];
      refactoredArray.push({ subskill, value, keterangan });
    }
  }

  console.log(refactoredArray);

  // for (let key in values) {
  //   if (key.startsWith("_")) {
  //     const subskillId = parseInt(key.slice(1));
  //     const value = values[key];
  //     const keteranganKey = `${key}_keterangan`;
  //     const keterangan = values[keteranganKey];
  //     skills_arr.value.push({ subskillId, value, keterangan, applicantId: route.params.id });
  //   }
  // }
  // console.log(skills_arr.value)
};

onMounted(async () => {
  await getSkills();
});

definePageMeta({
  layout: false,
});
</script>
