<template>
  <div>
    <TabView ref="tabview1">
      <TabPanel>
        <template #header>
          <i class="pi pi-book"></i>
          <span>Notes</span>
        </template>
        <div>
          <tambah-note />
          <div v-if="notes.length < 1">
            <div class="card mt-3 p-5" style="display: flex">
              <div style="text-align: center; opacity: 0.6">
                <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                <p>anda belum membuat notes</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="(note, index) in notes" :key="index">
              <div class="card mt-3 p-3" style="background-color: #b3e5fc">
                <p class="mb-3" style="font-size: 1.5rem">{{ note.notes }}</p>
                <hr />
                <small style="font-size: 0.75rem"
                  ><b>Created At : </b>{{ reverseDate(note.createdAt) }}&ensp;<b
                    >Updated At : </b
                  >{{ reverseDate(note.updatedAt) }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-copy"></i>
          <span>Attchments</span>
        </template>
        <div>
          <tambah-attachment />
          <div v-if="attachements === undefined">
            <div class="card mt-3 p-5" style="display: flex">
              <div style="text-align: center; opacity: 0.6">
                <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                <p>anda belum membuat attachement</p>
              </div>
            </div>
          </div>
          <div v-else>
            <DataTable
              :value="attachements"
              :paginator="true"
              :rows="5"
              paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              responsiveLayout="scroll"
              removableSort
            >
              <Column>
                <template #body="slotProps">
                  <div v-if="isPDF(slotProps.data.type) === true">
                    <div style="opacity: 0.4">
                      <i class="pi pi-file-pdf" style="font-size: 3rem" />
                      <br />
                      <small>PDF File</small>
                    </div>
                  </div>
                  <div v-else>
                    <div style="opacity: 0.4">
                      <i class="pi pi-image" style="font-size: 3rem" /> <br />
                      <small>Image File</small>
                    </div>
                  </div>
                </template>
              </Column>
              <Column field="attachment_name"></Column>
              <Column>
                <template #body="slotProps">
                  {{ reverseDate(slotProps.data.createdAt) }}
                </template>
              </Column>
              <Column>
                <template #body>
                  <Button class="p-button-text p-button-plain" icon="pi pi-external-link" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";

const route = useRoute();
const notes = ref("");
const attachements = ref("");

const isPDF = (param) => {
  if (param === "application/pdf") {
    return true;
  } else {
    return false;
  }
};

const reverseDate = (date) => {
  return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
};

onMounted(async () => {
  const id = route.params.id;
  const getNotes = await axios.get(
    "http://localhost:3000/api/1.0/notes/dept/" + id
  );
  const getAttachments = await axios.get(
    "http://localhost:3000/api/1.0/attachments/dept/" + id
  );
  notes.value = await getNotes.data.ressss;
  attachements.value = await getAttachments.data.data;
});
</script>
