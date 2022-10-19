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
            <div class="centering">
              <h1>Kosong</h1>
            </div>
          </div>
          <div v-else>
            <div v-for="(note, index) in notes" :key="index">
              <div class="card mt-3 p-3" style="background-color: #b3e5fc">
                <p class="mb-3" style="font-size: 1.5rem">{{ note.notes }}</p>
                <hr />
                <small style="font-size: 0.75rem"
                  ><b>Created At :</b>{{ note.createdAt }}&ensp;<b
                    >Updated At :</b
                  >{{ note.updatedAt }}</small
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
          <div v-if="notes.length < 1">
            <div class="centering">
              <h1>Kosong</h1>
            </div>
          </div>
          <div v-else>
            <div v-for="(attachement, index) in attachements" :key="index">
              <div class="card mt-3 p-3" style="background-color: #b3e5fc">
                <p class="mb-3" style="font-size: 1.5rem">{{ attachement.attachment_name }}</p>
                <hr />
                <small style="font-size: 0.75rem"
                  ><b>Created At :</b>{{ attachement.createdAt }}&ensp;<b
                    >Updated At :</b
                  >{{ attachement.updatedAt }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();
const notes = ref("");
const attachements = ref("");
const isNull = () => {
  if (notes.value.length < 1) return true;
};
onMounted(async () => {
  const id = route.params.id;
  const getNotes = await axios.get(
    "http://localhost:3000/api/1.0/notes/dept/" + id
  );
    const getAttachments = await axios.get(
    "http://localhost:3000/api/1.0/attachments/dept/" + id
  );
  notes.value = getNotes.data.ressss;
  attachements.value = getAttachments.data.data;
  console.log(notes.value);
  console.log(attachements.value);
});
</script>
