<template>
  <div>
    <div class="container-user">
      <h1>Role Permission</h1>
      <div class="card shadow mt-4 ml-4 w-95">
        <DataTable :value="view_data" :paginator="true" :rows="5"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          responsiveLayout="scroll" removableSort>
          <Column field="id" header="ID" :sortable="true" headerStyle="text-align: center"></Column>
          <Column field="role" header="Role" :sortable="true" headerStyle="text-align: center"></Column>
          <Column header="Permission" :sortable="true" headerStyle="text-align: center" >
            <template #body="slotProps">
              {{ slotProps.data.permissions.join(', ') }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <NuxtLink :to="`/rolepermission/${slotProps.data.id}`">
                <Button label="Edit Permission" icon="pi pi-pencil" class="p-button-sm"/>
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
import { ref, onMounted } from "vue";
import { usePermission } from "@/stores/permission";

const config = useRuntimeConfig();
const router = useRouter();
const store = usePermission();

let rolePermission = ref("");
let view_data = reactive([]);

onMounted(async () => {
  const response = await axios.get(config.API_BASE_URL + "roles", {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });

  rolePermission.value = response.data.data;
  rolePermission.value.forEach((element) => {
    let permissions = [];
    element.permissions.forEach((el) => {
      permissions.push(el.permission);
    });
    view_data.push({
      id: element.id,
      role: element.role,
      permissions: permissions,
    });
  });

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
      await store.checkPermission("menu_rolepermission");
    },
  ],
});
</script>
