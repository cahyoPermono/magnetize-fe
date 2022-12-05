<template>
    <span class="p-buttonset">
        <Button icon="pi pi-check" title="Hire" class="bg-green-300 border-green-300" />
        <Button icon="pi pi-trash" title="Drop" class="bg-pink-500 border-pink-500" />
        <Button icon="pi pi-times" title="Drop from Candidate" class="bg-yellow-300 border-yellow-300"
            @click="dropToPipeline()" />
    </span>
</template>

<script setup>
const emit = defineEmits(['dropToPipeline']);

const dropToPipeline = () => {
    emit('dropToPipeline')
};
</script>