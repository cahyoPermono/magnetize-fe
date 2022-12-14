<template>
  <div>
    <div class="container-user">
      <h1>Role Permission</h1>
      <div class="card shadow mt-4 ml-4 w-95">
        <DataTable
          :value="view_data"
          :paginator="true"
          :rows="5"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          responsiveLayout="scroll"
          removableSort >
          <Column field="id" header="ID" :sortable="true" headerStyle="text-align: center"></Column>
          <Column field="role" header="Role" :sortable="true" headerStyle="text-align: center"></Column>
          <Column header="Permission" :sortable="true" headerStyle="text-align: center">
            <template #body="slotProps">
              {{slotProps.data.permissions.join()}}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <NuxtLink :to="`/rolepermission/${slotProps.data.id}`">
                <Button label="Edit Permission" icon="pi pi-pencil" class="p-button-sm"  />
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

let rolePermission = ref("");
const router = useRouter();
let view_data = reactive([]);

onMounted(async () => {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const roleId = useCookie("role");
  const token_user = useCookie("user");

  const response = await axios.get(config.API_BASE_URL + "roles", {
    headers: {
      Authorization: `Bearer ${token.value}`,
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

  await setTimeout(async () => {
    token.value = null;
    token_user.value = null;
    roleId.value = null;
    await alert("Time is up, please LogIn");
    router.push("/login");
  }, 3600000);
});

definePageMeta({
  middleware: ["auth"],
});
</script>
