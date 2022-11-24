<template>
    <div><h2>Dashboard</h2></div>
</template>

<script setup>
import { onMounted } from 'vue';
const router = useRouter();
onMounted(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return navigateTo('/login')
    }
    await setTimeout(() => {
        localStorage.removeItem("token");
        alert("Waktu habis, silahkan login lagi")
        router.push('/')
    }, 3600000);
});
</script>
 