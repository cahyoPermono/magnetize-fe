<template>
  <div class="container-dept p-3">
    <div class="grid my-0 mx-5" style="width: 70vw">
      <div class="col-1 mr-4">
        <Avatar label="P" size="xlarge" shape="circle" class="ml-2" /> <br>
        <Button class="p-button-raised p-button-plain p-button-text p-button-rounded p-1 mt-2" aria-label="Google">
          <span class="dot mx-1 bg-primary"
            style="  height: 15px;  width: 15px;  border-radius: 50%;  display: inline-block;"></span>
          <span class="px-1 text-primary">{{ status }}</span>
        </Button>
      </div>
      <div class="col-5">
        <h3>{{ name }}</h3>
        <span>
          <i class="pi pi-map-marker" style="font-size: 0.8rem;"></i> {{ lokasi }}
        </span>
        <p>
          <i class="pi pi-dollar" style="font-size: 0.8rem;"></i> {{ salary }}
        </p>
      </div>
      <div class="col-5 text-center mx-4 pt-3">
        <div class="grid">
          <div class="col mx-2 p-0 border-solid border-2 border-round-lg shadow">
            <div class="bg-green-300 p-1 border-round-top-md">
              <h5>Hired</h5>
            </div>
            <div class="pt-2">
              <p>0</p>
            </div>
          </div>
          <div class="col mx-2 p-0 border-solid border-2 border-round-lg shadow">
            <div class="bg-pink-500 p-1 border-round-top-md">
              <h5>Dropped</h5>
            </div>
            <div class="pt-2">
              <p>0</p>
            </div>
          </div>
          <div class="col mx-2 p-0 border-solid border-2 border-round-lg shadow">
            <div class="bg-yellow-300 p-1 border-round-top-md">
              <h5>In Pipeline</h5>
            </div>
            <div class="pt-2">
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="mt-5">
        <div class="b col-12">
          <div class="card p-3">
            <tab-component-jobs />
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/jobs_hcd" class="float my-float">
      <Button icon="pi pi-arrow-left" class="p-button-rounded" style="box-shadow: 2px 2px 3px #999" />
    </NuxtLink>
  </div>
</template>

<script setup>
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const id = route.params.id;
const name = ref();
const lokasi = ref();
const salary = ref();
let status = ref();

onMounted(async () => {
  const job = await axios.get(config.API_BASE_URL + "jobs/" + id);
  name.value = await job.data.data.name
  status.value = await job.data.data.status
  lokasi.value = await job.data.data.location
  salary.value = `${await job.data.data.min_salary} - ${await job.data.data.max_salary} (${await job.data.data.currency})`
});

definePageMeta({
    middleware:'auth'
});

</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";

.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  text-align: center;
  margin-top: 22px;
}
</style>
