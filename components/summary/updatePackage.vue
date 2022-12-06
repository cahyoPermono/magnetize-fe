<template>
    <Dialog v-model:visible="props.modalUpdateDesc" header="Edit Job Package"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
        <div class="grid">
            <div class="col">
                <Textarea class="w-100 h-10rem" name="jobPackage" v-model="package_detail" />
            </div>
        </div>
        <template #footer>
            <Button label="Submit" icon="pi pi-check" @click="updatePackage()" />
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-outlined" @click="closeModal()" />
        </template>
    </Dialog>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const props = defineProps({
    modalUpdateDesc: {
        type: Boolean,
    }
});
const emit = defineEmits(['closeModal']);
const closeModal = () => {
    emit('closeModal')
};
const package_detail = ref();
onMounted(async () => {
    let job = await axios.get(config.API_BASE_URL + "jobs/" + route.params.id);
    job = await job.data.data;
    package_detail.value = job.package_detail;
});
const updatePackage = async () => {
    axios.put(config.API_BASE_URL + "update_job/" + route.params.id, {
        package_detail: package_detail.value,
    }).then(() => {
        emit('closeModal');
    });
};
</script>