<template>
    test
</template>

<script setup>
import { useStore } from '~~/stores/applicant_auth';
const store = useStore();

onMounted(()=>{
    console.log(store.user);
    console.log(store.token);
})

definePageMeta({
    layout: 'applicant',
    middleware: [
        async function (to, from) {
            const store = useStore();
            await store.auth();
        },
    ],
});
</script>