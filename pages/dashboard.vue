<template>
    <div><h2>Dashboard</h2></div>
</template>

<script setup>
import { onMounted } from 'vue';
const router = useRouter();

definePageMeta({
  middleware: 'auth'
});

onMounted(async () => {
    const token = useCookie('token')
    await setTimeout(() => {
        token.value = null
        alert("Waktu habis, silahkan login lagi")
        router.push('/')
    }, 3600000);
});
</script>
 