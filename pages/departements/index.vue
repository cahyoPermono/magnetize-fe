<template>
  <div class="container-dept">
    <h1>Departemen Imani Prima</h1>
    <tambah-departemen />
    <div style="width: 75vw;">
      <div class="card shadow mt-4 ml-4 w-100">
        <DataTable :value="dataDept" :paginator="true" :rows="5"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          responsiveLayout="scroll" removableSort>
          <Column>
            <template #body="slotProps">
              <Avatar :image="slotProps.data.avatar" class="mr-2" size="xlarge" shape="circle" />
            </template>
          </Column>
          <Column field="nama" header="Nama Departemen" :sortable="true"></Column>
          <Column field="alamat" header="Alamat" :sortable="true"></Column>
          <Column field="industri" header="Industri" :sortable="true"></Column>
          <Column field="lokasi" header="Lokasi" :sortable="true"></Column>
          <Column>
            <template #body="slotProps">
              <NuxtLink :to="`/departements/${slotProps.data.id}`">
                <Button type="button" icon="pi pi-eye" class="p-button-outlined"></Button>
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
let dataDept = ref("");
const router = useRouter();

definePageMeta({
  middleware: ['auth', 'isdepartement']
});
 
onMounted(async () => {
  const token = useCookie('token');
  const roleId = useCookie('role');
  const token_user = useCookie('user');
  const config = useRuntimeConfig();
  const response = await axios.get(config.API_BASE_URL + "all_departements/" + roleId.value, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  });
  dataDept.value = response.data.departements;
  await setTimeout(() => {
    token.value = null
    token_user.value = null
    alert("Waktu habis, silahkan login lagi");
    router.push("/");
  }, 3600000);
});
</script>

<style>
.container-dept {
  padding: 20px 20px 0 20px;
}
</style>
