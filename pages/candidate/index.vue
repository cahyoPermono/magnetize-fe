<template>
  <div>
    <div class="container-cand">
      <h1>Candidates</h1>
      <div style="width: 75vw">
        <div class="card shadow mt-4 ml-4 w-100">
          <DataTable :value="displayed_data" :paginator="true" :rows="5"
            paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            responsiveLayout="scroll" removableSort>
            <Column header="Foto">
              <template #body="slotProps">
                <Avatar :image="slotProps.data.photo" class="mr-2" size="xlarge" shape="circle" />
              </template>
            </Column>
            <Column field="name" header="Nama"></Column>
            <Column field="address" header="Alamat"></Column>
            <Column field="mobile" header="HP"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Status">
              <template #body="slotProps">
                <span v-if="slotProps.data.applicantstatus">{{ slotProps.data.applicantstatus.status }}</span>
                <span v-else> - </span>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <NuxtLink :to="`/candidate/${slotProps.data.id}`">
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
import { usePermission } from "@/stores/permission";
import dateFormat from "dateformat";

const config = useRuntimeConfig();
const displayed_data = ref([]);

const reverseDate = (date) => {
  return dateFormat(date, "dd-mm-yyyy");
};

function getCandidate() {
  try {
    axios.get(config.API_BASE_URL + "all_applicant").then((response) => {
      displayed_data.value = response.data.data;
      displayed_data.value = displayed_data.value.reverse();

    });
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  // getIndexJob();
  getCandidate();
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
      await store.checkPermission("menu_candidates");
    },
  ],
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";
</style>
