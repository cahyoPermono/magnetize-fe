<template>
  <div>
    <h2>Dashboard</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePermission } from "@/stores/permission";

const router = useRouter();

onMounted(async () => {
  setTimeout(async () => {
    alert("Time is up, please LogIn");
    await store.logout();
  }, 3600000);
});

definePageMeta({
  middleware: [
    async function (to, from) {
      const store = usePermission();
      await store.auth();
    }
  ],
});
</script>
