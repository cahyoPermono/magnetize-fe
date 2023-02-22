<template>
  <div class="card">
    <div class="card-header">
      Data Pribadi&nbsp;<span><small>(Personal Data)</small></span>
    </div>

    <div class="card-body">
      <Button
        @click="addAttachment"
        icon="pi pi-plus"
        class="p-button-warning"
        v-tooltip.right="'Klik untuk menambahkan'"
      />
      <div v-for="(attachment, index) in attachments" :key="index">
        <div class="mt-2">
          <div class="row">
            <label for="type" class="col-sm-2 col-form-label">
              <small>Jenis File</small><span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                :name="`attachments[${index}][type]`"
                :rules="isRequired"
                v-model="attachment.type"
              />
              <ErrorMessage :name="`attachments[${index}][type]`">
                <small style="color: red">Type is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label for="file" class="col-sm-2 col-form-label">
              <small>File</small>
            </label>
            <div class="col-sm d-flex">
              <FileUpload
                name="demo[]"
                mode="basic"
                :customUpload="true"
                @uploader="onUpload($event, index)"
                accept="image/*,.pdf"
                :maxFileSize="1000000"
                :auto="true"
              >
              </FileUpload>
              <span class="ml-2 mt-2" style="opacity:0.6">{{ attachment.file_name }}</span>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePermission } from "~~/stores/permission";

const store = usePermission();
const router = useRouter();
const config = useRuntimeConfig();



const onUpload = (evt, index) => {
  try {
    let f = evt.files[0];
    attachments.value[index].file_name = f.name;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = function () {
      attachments.value[index].file = reader.result;
    };
  } catch (err) {
    alert(err);
  }
};

onMounted(async () => {

});

definePageMeta({
  layout: false,
});
</script>
