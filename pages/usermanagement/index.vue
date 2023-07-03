<template>
  <div>
    <Toast />
    <div class="container-user">
      <div>
        <Breadcrumb :home="home" :model="items" aria-label="breadcrumb" />
      </div>
      <h1>User Management</h1>
      <tambah-user @load-data="getUsers()" />
      <div class="card shadow mt-3 ml w-100">
        <DataTable
          :value="dataUser"
          :paginator="true"
          :rows="5"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          responsiveLayout="scroll"
          removableSort
        >
          <Column>
            <template #body="slotProps">
              <Avatar :image="slotProps.data.image" class="mr-2" size="xlarge" shape="circle" />
            </template>
          </Column>
          <Column
            field="displayName"
            header="Display Name"
            :sortable="true"
            headerStyle="text-align: center"
          ></Column>
          <Column
            field="fullName"
            header="Full Name"
            :sortable="true"
            headerStyle="text-align: center"
          ></Column>
          <Column
            field="email"
            header="Email Address"
            :sortable="true"
            headerStyle="text-align: center"
          ></Column>
          <Column
            field="role.role"
            header="Role"
            :sortable="true"
            headerStyle="text-align: center"
          ></Column>
          <Column header="Status" :sortable="true" style="text-align: center">
            <template #body="slotProps">
              <Badge severity="warning" class="mr-2" v-if="slotProps.data.status === 'Active'">
                {{ slotProps.data.status }}
              </Badge>
              <Badge severity="danger" class="mr-2" v-else>{{ slotProps.data.status }}</Badge>
            </template>
          </Column>
          <Column header="Create On" headerStyle="text-align: center; width: 150px">
            <template #body="slotProps">
              {{ reverseDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column header="Last Active Date" headerStyle="text-align: center; width: 150px">
            <template #body="slotProps">
              {{ lastDate(slotProps.data.lastActive) }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <NuxtLink :to="`/usermanagement/${slotProps.data.id}`">
                <Button
                  type="button"
                  icon="pi pi-eye"
                  class="p-button-outlined p-button-sm"
                ></Button>
              </NuxtLink>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";
import { usePermission } from "~~/stores/permission";

const config = useRuntimeConfig();
let dataUser = ref("");
const store = usePermission();

const getUsers = async () => {
  const response = await axios.get(config.API_BASE_URL + "all_users/" + store.roleId, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });
  dataUser.value = response.data.data;
};

const reverseDate = (date) => {
  return dateFormat(date, "dd-mm-yyyy");
};

const lastDate = (date) => {
  if (date === null) {
    return "";
  }
  return dateFormat(date, "dd-mm-yyyy, h:MM:ss TT");
};

const home = ref({
  icon: "pi pi-home",
  to: "/dashboard",
});

const items = ref([
  { label: "Administration", to: "/dashboard" },
  { label: "Account and Users" },
  { label: "Users" },
  { label: "User Management" },
]);

onMounted(async () => {
  await getUsers();
  setTimeout(async () => {
    alert("Time is up, please LogIn");
    await store.logout();
  }, 3600000);
});

definePageMeta({
  middleware: [
    async function (to, from) {
      const store = usePermission();
      await store.auth();
      await store.checkPermission("menu_users");
    },
  ],
});
</script>
