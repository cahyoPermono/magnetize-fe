<template>
  <div class="topBar px-4 py-3 shadow-6">
    <Button
      @click="visibleLeft = true"
      icon="pi pi-bars"
      class="p-button-text p-button-plain sidebarTrig"
    />
    <a href="/"><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px" /></a>
    <!-- <Button
      icon="pi pi-sign-in"
      style="float: right"
      class="p-button-text p-button-plain"
      @click="signin"
      v-if="!isLoggedIn"
    /> -->
    <Button
      icon="pi pi-sign-out"
      style="float: right"
      class="p-button-text p-button-plain"
      @click="signout"
      v-if="isLoggedIn"
    />
    <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000">
      <strong><p>Home</p></strong>
      <div class="ml-3 mb-3">
        <NuxtLink to="/">
          <Button
            icon="pi pi-home"
            class="p-button-text p-button-plain"
            label="Home"
            @click="visibleLeft = false"
          />
        </NuxtLink>
      </div>
      <strong><p>Feature</p></strong>
      <div class="ml-3" >
        <NuxtLink v-if="isLoggedIn" to="/departements">
          <Button
            icon="pi pi-building"
            class="p-button-text p-button-plain"
            label="Departements"
            @click="visibleLeft = false"
          />
        </NuxtLink>
        <br />
        <NuxtLink to="/discCard">
          <Button
            icon="pi pi-book"
            class="p-button-text p-button-plain"
            label="Disc"
            @click="visibleLeft = false"
          />
        </NuxtLink>
      </div>
    </Sidebar>
  </div>
  <slot />
</template>

<script setup>
import {computed} from 'vue';
const visibleLeft = ref(false);
const router = useRouter();
function signin() {
  router.push('/login')
}

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const isLoggedIn = computed(() => token)

function signout() {
  localStorage.removeItem("token");
  router.push('/')
}
</script>
