<template>
  <div class="topBar px-2 py-3 shadow-3">
    <a href="/dashboard"><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px" /></a>
    <div style="float: right" class="px-2">
      <Button icon="pi pi-sign-out" class="p-button-text p-button-plain" @click="signout" v-if="isLoggedIn" />
    </div>
  </div>
  <div class="grid" style="height: 91vh; width: 100%;">
    <div class="col-2 p-4 shadow-3">
      <strong>
        <p>Home</p>
      </strong>
      <div class="ml-3 mb-3">
        <NuxtLink to="/dashboard">
          <Button icon="pi pi-home" class="p-button-text p-button-plain" label="Home" @click="visibleLeft = false" />
        </NuxtLink>
      </div>
      <strong>
        <p>Feature</p>
      </strong>
      <div class="ml-3">
        <NuxtLink v-if="isLoggedIn" to="/departements">
          <Button icon="pi pi-building" class="p-button-text p-button-plain" label="Departements" />
        </NuxtLink>
        <br />
        <NuxtLink to="/jobs_hcd">
          <Button icon="pi pi-sitemap" class="p-button-text p-button-plain" label="Jobs" />
        </NuxtLink>
      </div>
    </div>
    <div class="col-10">
      <slot />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const visibleLeft = ref(false);
const router = useRouter();
function signin() {
  router.push("/login");
}

const token = useCookie("token");
const token_user = useCookie('user')

const isLoggedIn = computed(() => token.value);

async function signout() {
  const today = new Date();
  await axios.put('http://localhost:3000/api/1.0/update/11', {
    lastActive: today,
  })
  token_user.value = null;
  token.value = null;
  router.push("/login")
}
</script>

<style>
a,
a:hover {
  text-decoration: none;
  color: inherit;
}
</style>