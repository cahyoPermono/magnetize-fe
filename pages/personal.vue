<template>
<Toast />
  <FileUpload
    name="demo[]"
    @upload="onAdvancedUpload($event)"
    :multiple="true"
    accept="image/*,.pdf"
    :maxFileSize="1000000"
  >
    <template #content>
      <ul v-if="uploadedFiles && uploadedFiles[0]">
        <li v-for="file of uploadedFiles[0]" :key="file">
          {{ file.name }} - {{ file.size }} bytes
        </li>
      </ul>
    </template>
  </FileUpload>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export default {
	setup() {
		const toast = useToast();
        const uploadedFile = ref([]);
        const files = ref([]);
        const totalSize = ref(0);
        const totalSizePercent = ref(0);

        const onAdvancedUpload = () => {
            toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        }

        const formatSize = (bytes) => {
            if (bytes === 0) {
                return '0 B';
            }

            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }


		return { onAdvancedUpload, formatSize };
	}
}
</script>

<style lang="scss" scoped>
    ::v-deep(.custom-progress-bar) {
        .p-progressbar-value {
            background-color: #f44336;
        }
    }
</style>