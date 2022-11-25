<template>
  <div class="container-dept p-5">
    <h1>Departemen Imani Prima</h1>
    <tambah-departemen />
    <div class="card shadow m-4 p-2">
      <DataTable
        :value="dataDept"
        :paginator="true"
        :rows="5"
        paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        responsiveLayout="scroll"
        removableSort
      >
        <Column>
          <template #body="slotProps">
            <Avatar
              :image="slotProps.data.avatar"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
          </template>
        </Column>
        <Column field="nama" header="Nama Departemen" :sortable="true"></Column>
        <Column field="alamat" header="Alamat" :sortable="true"></Column>
        <Column field="industri" header="Industri" :sortable="true"></Column>
        <Column field="lokasi" header="Lokasi" :sortable="true"></Column>
        <Column>
          <template #body="slotProps">
            <NuxtLink :to="`/departements/${slotProps.data.id}`">
              <Button
                type="button"
                icon="pi pi-eye"
                class="p-button-outlined"
              ></Button>
            </NuxtLink>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
let dataDept = ref("");
const router = useRouter();



onMounted(async () => {
  const token = useCookie('token')
  // const token = localStorage.getItem("token");
  if (!token.value) {
    // router.push('/login')
    return navigateTo('/login')
  } 
  else {
    const config = useRuntimeConfig();
    const response = await axios.get(config.API_BASE_URL + "departements", {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    dataDept.value = response.data.departements;
    await setTimeout(() => {
      // localStorage.removeItem("token");
      token.value = null
      alert("Waktu habis, silahkan login lagi");
      router.push("/");
    }, 3600000);
  }
    
});
</script>

<style>
.container-dept {
  padding: 20px 20px 0 20px;
}
</style>
