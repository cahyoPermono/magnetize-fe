<template>
  <div>
    <div class="topBar px-2 py-3 shadow-3">
      <Button icon="pi pi-bars" class="p-button-text p-button-plain" @click="sidebar()" />
      <a href="/dashboard"><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px" /></a>
      <div style="float: right" class="px-2">
        <Button icon="pi pi-sign-out" class="p-button-text p-button-plain" @click="signOut()" v-if="isLoggedIn" />
        <Dialog v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '30vw' }" :modal="true">
          <template #header>
            <h4><strong>Sign Out Confirmation</strong></h4>
          </template>
          <div class="grid pt-3">
            <div class="col-1 col-offset-1"> <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem;"></i></div>
            <div class="col font-bold">&nbsp;&nbsp;Do you want to log out ?</div>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeModal()" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" @click="store.logout()" class="p-button-danger" />
          </template>
        </Dialog>
      </div>
    </div>
    <div>
      <div class="row" style="height: 90vh; width: 100%;">
        <div v-show="isSidebarActive" class="col-2 px-4 shadow-3 sidebar animate__animated animate__faster">
          <strong>
            <p>Home</p>
          </strong>
          <div class="ml-3 mb-3">
            <NuxtLink to="/dashboard">
              <Button icon="pi pi-home" class="p-button-text p-button-plain" label="Home" />
            </NuxtLink>
          </div>
          <strong>
            <p>Feature</p>
          </strong>
          <div class="ml-3">
            <NuxtLink v-if="(isLoggedIn, isdepartement)" to="/departements">
              <Button icon="pi pi-building" class="p-button-text p-button-plain" label="Departements" />
            </NuxtLink>
            <br />
            <NuxtLink v-if="(isLoggedIn, isjobs)" to="/jobs_hcd">
              <Button icon="pi pi-sitemap" class="p-button-text p-button-plain" label="Jobs" />
            </NuxtLink>
            <br />
            <NuxtLink to="/dashboard-applicant">
              <Button icon="pi pi-users" class="p-button-text p-button-plain" label="Guest" />
            </NuxtLink>
            <br />
            <PanelMenu v-if="(isLoggedIn, isuser)" :model="items" style="width: 11.5em;" />
            <br />
            <NuxtLink to="/rolepermission">
              <Button icon="pi pi-cog" class="p-button-text p-button-plain" label="Role Permission" />
            </NuxtLink>
          </div>
        </div>
        <div :class="[isSidebarActive ? activeSidebar : '', !isSidebarActive ? deactiveSidebar : '']">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePermission } from "~~/stores/permission";
import "animate.css";

const store = usePermission();
const router = useRouter();

onMounted(async () => {
  await store.getPermission();
})

const isjobs = computed(() => store.arr.includes('menu_jobs_hcd'))
const isdepartement = computed(() => store.arr.includes('menu_departements'))
const isuser = computed(() => store.arr.includes('menu_users'))

const isLoggedIn = computed(() => store.token);

const displayModal = ref(false);
const signOut = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

function signin() {
  router.push("/login");
};

let isSidebarActive = ref(true);
let deactiveSidebar = ref("col-12 px-5");
let activeSidebar = ref("col-10 px-5");
const sidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  if (isSidebarActive.value) {
    sidebar.classList.add('animate__fadeOutLeft');
    sidebar.classList.remove('animate__fadeInLeft');
    setTimeout(() => { isSidebarActive.value = !isSidebarActive.value; }, 300)
  } else {
    isSidebarActive.value = !isSidebarActive.value;
    sidebar.classList.add('animate__fadeInLeft');
    sidebar.classList.remove('animate__fadeOutLeft');
  }
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
                to: "/usermanagement",
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
    ],
  },
]);

</script>

<style>
a,
a:hover {
  text-decoration: none;
  color: inherit;
}
</style>