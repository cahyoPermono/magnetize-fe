<template>
  <div class="container-dept p-3">
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
        <Column
          field="nama"
          header="Nama Departemen"
          removableSort
          :sortable="true"
        ></Column>
        <Column field="alamat" header="Alamat" :sortable="true"></Column>
        <Column field="industri" header="Industri" :sortable="true"></Column>
        <Column field="lokasi" header="Lokasi" :sortable="true"></Column>
        <Column>
          <template #body="slotProps">
            <NuxtLink :to="`/departements/${slotProps.data.id}`">
              <Button
                type="button"
                icon="pi pi-eye"
                class="p-button-success"
              ></Button
            ></NuxtLink>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
let dataDept = ref("");

onMounted(async () => {
  const response = await axios.get(
    "http://localhost:3000/api/1.0/departements"
  );
  dataDept.value = response.data.departements;
});
</script>

<style>
.container-dept {
  padding: 20px 20px 0 20px;
}
</style>
