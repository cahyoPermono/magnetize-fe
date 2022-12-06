<template>
    <div class="container-dept p-3">
      <div class="p-3">
        <div class="b p-3">
          <Avatar :image="user.image" class="mr-4" size="xlarge" style="width: 120px; height: 120px;"/>
        </div>
        <div class="b">
          <h5>{{ user.displayName }} <span>( {{role.role}} )</span></h5>
          <p>Full Name : {{user.fullName}}</p>
          <p>Email : {{ user.email }}</p>
          <p>Phone : {{ user.phone }}</p>
          <p>Location : {{ user.location }}</p>
        </div>
        <div></div>
      </div>
      <NuxtLink to="/usermanagement" class="float my-float">
        <Button icon="pi pi-arrow-left" class="p-button-rounded" style="box-shadow: 2px 2px 3px #999" />
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  const displayResponsive = ref(false);
  
  const viewDept = () => {
    displayResponsive.value = !displayResponsive.value;
  };
  
  const user = ref("");
  const role = ref("");
  
  onMounted(async () => {
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
  
    const id = route.params.id;
    const res = await axios.get(config.API_BASE_URL + "users/" + id);
      user.value = res.data.data;
      role.value = res.data.data.role;
  });
  </script>
  
  <style>
  .ProseMirror .deskripsi-one {
    border: 0px;
  }
  
  div.b {
    display: inline-block;
  }
  
  .p-accordion-header-link .p-accordion-header-text a:hover {
    text-decoration: none;
  }
  
  .p-accordion-content p {
    font-size: 12pt;
  }
  
  .float {
    position: fixed;
    bottom: 40px;
    right: 40px;
    text-align: center;
    margin-top: 22px;
  }
  </style>
  