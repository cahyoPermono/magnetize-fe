<template>
  <div>
    <h2>Dashboard</h2>{{ store.$state.arr }}
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const store = usePermission()
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  await store.getPermission();
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
