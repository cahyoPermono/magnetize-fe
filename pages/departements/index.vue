<template>
  <div>
    <Toast />
    <div class="container-dept">
      <h1>Departemen Imani Prima</h1>
      <tambah-departemen @showToast="showToast()" v-on:loadData="getDepartement()" />
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

  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { usePermission } from "~~/stores/permission";

const toast = useToast();
const config = useRuntimeConfig();
const store = usePermission();

let dataDept = ref("");

const showToast = () =>{
  toast.add({severity:'success', summary: 'departemen bertambah', life: 3000});
};

const getDepartement = async () => {
  const response = await axios.get(config.API_BASE_URL + "all_departements/" + store.roleId, {
    headers: {
      'Authorization': `Bearer ${store.token}`
    }
  });
  dataDept.value = response.data.departements;
};

onMounted(async () => {
  await getDepartement();
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
      await store.checkPermission("menu_departements");
    },
  ],
});

</script>

<style>
.container-dept {
  padding: 20px 20px 0 20px;
}
</style>
