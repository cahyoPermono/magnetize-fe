<template>
  <div class="topBar px-2 py-3 shadow-3">
    <a href="/dashboard"
      ><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px"
    /></a>
    <div style="float: right" class="px-2">
      <Button
        icon="pi pi-sign-out"
        class="p-button-text p-button-plain"
        @click="signout"
        v-if="isLoggedIn"
      />
    </div>
  </div>
  <div class="row" style="height: 90vh; width: 100%">
    <div class="col-2 px-4 shadow-3">
      <strong>
        <p>Home</p>
      </strong>
      <div class="ml-3 mb-3">
        <NuxtLink to="/dashboard">
          <Button
            icon="pi pi-home"
            class="p-button-text p-button-plain"
            label="Home"
            @click="visibleLeft = false"
          />
        </NuxtLink>
      </div>
      <strong>
        <p>Feature</p>
      </strong>
      <div class="ml-3">
        <NuxtLink v-if="isLoggedIn" to="/departements">
          <Button
            icon="pi pi-building"
            class="p-button-text p-button-plain"
            label="Departements"
          />
        </NuxtLink>
        <br />
        <NuxtLink to="/jobs_hcd">
          <Button
            icon="pi pi-sitemap"
            class="p-button-text p-button-plain"
            label="Jobs"
          />
        </NuxtLink>
        <br />
        <PanelMenu v-if="(role === 1)" :model="items" style="width: 11em;"/>
      </div>
    </div>
    <div class="col-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

const visibleLeft = ref(false);
const router = useRouter();
function signin() {
  router.push("/login");
}

const token = useCookie("token");
const roleId = useCookie("user");

const isLoggedIn = computed(() => token.value);
const role = computed(() => roleId.value);

const config = useRuntimeConfig();

async function signout() {
  const today = new Date();
  await axios.put(config.API_BASE_URL + "update/" + roleId.value, {
    lastActive: today,
  });
  token.value = null;
  roleId.value = null;
  router.push("/");
}

const items = ref([
  {
    key: "0",
    label: "Administration",
    icon: "pi pi-file",
    items: [
      {
        key: "0_0",
        label: "Account & User",
        icon: "pi pi-user",
        items: [
          {
            key: "0_0_0",
            label: "User",
            icon: "pi pi-users",
            items: [
              {
                key: "0_0_0_0",
                label: "User Management",
                icon: "pi pi-bars",
                to: '/usermanagement'
              },
            ],
          },
          {
            key: "0_0_1",
            label: "Account",
            icon: "pi pi-key",
          },
        ],
      },
      // {
      //   key: "0_1",
      //   label: "Delete",
      //   icon: "pi pi-fw pi-trash",
      // },
      // {
      //   key: "0_2",
      //   label: "Export",
      //   icon: "pi pi-fw pi-external-link",
      // },
    ],
  },
]);
</script>
