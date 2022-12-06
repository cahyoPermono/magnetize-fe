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
    const token = useCookie('token');
    const role = useCookie('role')
    await setTimeout(() => {
        token.value = null
        role.value = null
        alert("Waktu habis, silahkan login lagi")
        router.push('/')
    }, 3600000);
});
</script>
 