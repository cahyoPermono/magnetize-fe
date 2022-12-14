<template>
    <Toast />
    <Dialog v-model:visible="props.modalUpdateDesc" header="Edit Description"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
        <div class="grid">
            <div class="col">
                <Textarea class="w-100 h-10rem" name="jobDesc" v-model="jobDesc" />
            </div>
        </div>
        <template #footer>
            <Button label="Submit" icon="pi pi-check" @click="updateDesc()" />
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-outlined" @click="closeModal()" />
        </template>
    </Dialog>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
const config = useRuntimeConfig();
const route = useRoute();
const toast = useToast()

const props = defineProps({
    modalUpdateDesc: {
        type: Boolean,
    }
});

const jobDesc = ref('');
onMounted(async () => {
    let job = await axios.get(config.API_BASE_URL + "jobs/" + route.params.id);
    job = await job.data.data;
    jobDesc.value = job.desc;
});

const emit = defineEmits(['closeModal', 'loadData']);
const closeModal = () => {
    emit('closeModal');
};

const updateDesc = () => {
    axios.put(config.API_BASE_URL + "update_job/" + route.params.id, {
        desc: jobDesc.value
    }).then((res) => {
        toast.add({ severity: 'success', summary: res.data.message, life: 3000 });
        emit('closeModal');
    });
};
</script>