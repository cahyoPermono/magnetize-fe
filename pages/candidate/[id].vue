<template>
    <div class="container-dept p-3">
      <div class="grid my-0 mx-2" style="width: 70vw">
        <div class="col-1 mr-4">
          <Avatar :image="photo" size="xlarge" shape="circle" class="ml-2" /> <br>
        </div>
        <div class="col-5">
          <h3>{{ name }}</h3>
          <span>
            <i class="pi pi-envelope" style="font-size: 0.8rem;"></i>&nbsp;&nbsp;{{ email }}
          </span>
          <p>
            <i class="pi pi-phone" style="font-size: 0.8rem;"></i>&nbsp;&nbsp;{{ hp }}
          </p>
        </div>
      </div>
      <div class="grid" style="width: 80vw;">
              <tab-candidate style="margin-left: 5px;"/>
      </div>
      <NuxtLink to="/candidate" class="float my-float">
        <Button icon="pi pi-arrow-left" class="p-button-rounded" style="box-shadow: 2px 2px 3px #999" />
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { usePermission } from '~~/stores/permission';
  
  const route = useRoute();
  const config = useRuntimeConfig();
  
  const id = route.params.id;
  const name = ref();
  const email = ref();
  const hp = ref();
  const photo = ref()
  
  onMounted(async () => {
    const candidate = await axios.get(config.API_BASE_URL + "applicants/" + id);
    name.value = await candidate.data.data.name
    email.value = await candidate.data.data.email
    hp.value = await candidate.data.data.mobile
    photo.value = await candidate.data.data.photo
  });
  
  definePageMeta({
    middleware: [
      async function (to, from) {
        const store = usePermission();
        await store.auth();
      },
    ],});
  
  </script>
  
  <style scoped>  
  .float {
    position: fixed;
    bottom: 40px;
    right: 40px;
    text-align: center;
    margin-top: 22px;
  }
  </style>
  