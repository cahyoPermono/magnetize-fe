<template>
  <div class="container-user">
  <div>
      <Breadcrumb :home="home" :model="items" aria-label="breadcrumb" />
  </div>
    <h1>User Management</h1>
    <tambah-user />
    <div class="card shadow  mt-4 ml-4 w-100">
      <DataTable
        :value="dataUser"
        :paginator="true"
        :rows="5"
        paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        responsiveLayout="scroll"
        removableSort >
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
        <Column field="displayName" header="Display Name"></Column>
        <Column field="fullName" header="Full Name"></Column>
        <Column field="email" header="Email Address"></Column>
        <Column field="role.role" header="Role"></Column>
        <Column field="status" header="Status">
        </Column>
        <Column header="Create On">
          <template #body="slotProps">
            {{reverseDate(slotProps.data.createdAt)}}
          </template>
        </Column>
        <Column header="Last Active Date">
          <template #body="slotProps">
            {{lastDate(slotProps.data.lastActive)}}
          </template></Column>
        <Column>
          <template #body="slotProps">
            <NuxtLink :to="`/usermanagement/${slotProps.data.id}`">
              <Button
                type="button"
                icon="pi pi-eye"
                class="p-button-outlined">
              </Button>
            </NuxtLink>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";
let dataUser = ref("");
const router = useRouter();

definePageMeta({
  middleware: ['auth', 'role']
});

const reverseDate = (date) => {
return dateFormat(date, "dd-mm-yyyy");
};

const lastDate = (date) => {
return dateFormat(date, "dd-mm-yyyy, h:MM:ss TT");
};

const home = ref({
icon: 'pi pi-home',
to: '/dashboard',
});

const items = ref([
{label: 'Administration', to: '/dashboard'},
{label: 'Account and Users'},
{label: 'Users'},
{label: 'User Management'},
]);

onMounted(async () => {
  const token = useCookie('token')
  const config = useRuntimeConfig();
  const roleId = useCookie('user')
  console.log(roleId.value)
  const response = await axios.get(config.API_BASE_URL + "all_users/" + roleId.value, {
    headers: {
      'Authorization': `Bearer ${token.value}` 
    }
  });
  dataUser.value = response.data.data;
  await setTimeout(() => {
    token.value = null
    alert("Waktu habis, silahkan login lagi");
    router.push("/");
  }, 3600000);  
});
</script>


