<template>
  <div>
    <Toast />
    <div class="container-user">
      <div>
        <Breadcrumb :home="home" :model="items" aria-label="breadcrumb" />
      </div>
      <h1>User Management</h1>
      <tambah-user />
      <div class="card shadow mt-4 ml-4 w-95">
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
              <Avatar
                :image="slotProps.data.image"
                class="mr-2"
                size="xlarge"
                shape="circle"
              />
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
              <Badge
                severity="warning"
                class="mr-2"
                v-if="slotProps.data.status === 'Active'"
                >{{ slotProps.data.status }}</Badge
              >
              <Badge severity="danger" class="mr-2" v-else>{{
                slotProps.data.status
              }}</Badge>
            </template>
          </Column>
          <Column
            header="Create On"
            headerStyle="text-align: center; width: 120px"
          >
            <template #body="slotProps">
              {{ reverseDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column header="Last Active Date" headerStyle="text-align: center">
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
                  class="p-button-outlined"
                >
                </Button>
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
import { ref, onMounted } from "vue";
import { usePermission } from "~~/stores/permission";

const store = usePermission();
let dataUser = ref("");
const router = useRouter();

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
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const roleId = useCookie("role");
  const token_user = useCookie("user");
  store.getPermission();

  const response = await axios.get(
    config.API_BASE_URL + "all_users/" + roleId.value,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  dataUser.value = response.data.data;

  await setTimeout(async () => {
    token.value = null;
    token_user.value = null;
    roleId.value = null;
    await alert("Time is up, please LogIn");
    router.push("/login");
  }, 3600000);
});

definePageMeta({
  middleware: [
    async function (to, from) {
      const store = usePermission()
      const dataPermission = store.arr.includes('menue_users')
      if (!dataPermission) {
          return navigateTo('/dashboard')
      }
    },
  ],
});
</script>
