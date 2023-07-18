<template>
  <Card>
    <template #content>
      <div class="mt-2 mx-3">
        <div class="grid">
          <div class="col-10 text-left pl-2">
            <h3 class="text-2xl mb-0">FORMULIR LAMARAN KERJA</h3>
          </div>
          <div class="col-2">
            <div class="mt-5">
              <Avatar
                :image="store.applicant.photo"
                size="xlarge"
                style="width: 120px; height: 120px"
              />
            </div>
            <div>
              <label for="image" v-if="!store.applicant.photo">Foto</label>
              <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/*"
                :maxFileSize="2000000"
                @upload="onUploadAva"
                :auto="true"
                chooseLabel="Browse"
              />
            </div>
          </div>
        </div>
        <div class="grid" style="margin-top: 35px">
          <label for="position" class="col-2">
            <small>Posisi yang dilamar</small><span style="color: red">*</span>
          </label>
          <div class="col">
            <Field name="position" v-model="store.applicant.selectedJob">
              <Dropdown
                class="w-full"
                v-model="store.applicant.selectedJob"
                :options="jobs"
                option-label="name"
              />
            </Field>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-right"
          @click="next"
          :disabled="isPageFilled"
        />
      </div>
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
//Constant Data
const config = useRuntimeConfig();
const store = useStore();

//Main Data
const jobs = ref([]);
const emits = defineEmits("next");
const next = () => {
  emits("next");
};

/**************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const isPageFilled = computed(() => {
  if (store.applicant.selectedJob && store.applicant.photo) {
    return false;
  }
  return true;
});

const getJob = async () => {
  const response = await axios.get(config.API_BASE_URL + "jobs");
  return response.data.data;
};

const onUploadAva = (evt) => {
  try {
    let f = evt.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.addEventListener("loadend", function () {
      store.applicant.photo = reader.result;
    });
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  jobs.value = await getJob();
});
</script>
