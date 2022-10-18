<template>
  <div class="container-dept p-3">
    <div class="b col-4">
      <div class="card p-3">
        <small>Nama Departemen</small>
        <h2>{{ dept.nama }}</h2>
        <small>Deskripsi</small>
        <Editord v-model="dept.deskripsi" class="deskripsi-one" />
      </div>
    </div>
    <div class="b col-8">
      <div class="card p-3">
        <small>URL</small>
        <h5>{{ dept.url }}</h5>
        <small>Industri</small>
        <h5>{{ dept.industri }}</h5>
        <small>Lokasi</small>
        <h5>{{ dept.lokasi }}</h5>
        <small>Alamat</small>
        <h5>{{ dept.alamat }}</h5>
      </div>
    </div>
    <div class="mt-5">
      <div class="b col-6">
        <div class="card p-3">
          <small class="mb-2">Notes</small>
          <tambah-note />
          <Accordion class="mt-2">
            <AccordionTab
              v-for="(note, index) in dept.Notes"
              :key="index"
              :header="note.notes"
            >
              <p>
                <strong>{{ note.notes }}</strong>
              </p>
              <small
                ><strong>Created at: </strong>{{ note.createdAt }} <br />
                <strong>Updated at: </strong> {{ note.updatedAt }}</small
              >
            </AccordionTab>
          </Accordion>
        </div>
      </div>
      <div class="b col-6">
        <div class="card p-3">
          <small>Attachments</small>
          <tambah-attachment />
          <Accordion class="mt-2">
            <AccordionTab
              v-for="(attachment, index) in dept.Attachments"
              :key="index"
              :header="attachment.attachment_name"
            >
              <p class="b col-8">
                <strong>{{ attachment.attachment_name }}</strong>
              </p>
              <div class="b col-4">
                <Button
                  icon="pi pi-download"
                  @click="download(attachment.attachment_file)"
                ></Button>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const dept = ref("");
function download(zzz) {
  const inputMIME = zzz.split(",")[0].split(":")[1].split(";")[0];
  console.log(inputMIME);
  if (zzz.split(",")[0].indexOf("base64") >= 0) {
    let binaryVal = atob(zzz.split(",")[1]);
    console.log(binaryVal);
  } else {
    let binaryVal = unescape(zzz.split(",")[1]);
    console.log("done");
    
  }
}

onMounted(async () => {
  const route = useRoute();

  const id = route.params.id;
  const res = await axios.get(
    "http://localhost:3000/api/1.0/departements/" + id
  );
  dept.value = res.data.departement;
});
</script>
<style>
.ProseMirror .deskripsi-one {
  border: 0px;
}
div.b {
  display: inline-block;
}
.p-accordion-header-link .p-accordion-header-text a:hover {
  text-decoration: none;
}
.p-accordion-content p {
  font-size: 12pt;
}
</style>
