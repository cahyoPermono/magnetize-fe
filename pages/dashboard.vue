<template>
  <div><h2>Dashboard</h2></div>
</template>

<script setup>
import { onMounted } from "vue";
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  const token = useCookie("token");
  const roleId = useCookie("role");
  const token_user = useCookie("user");
  await setTimeout(() => {
    token.value = null;
    roleId.value = null;
    token_user.value = null;
    alert("Time is up, please LogIn");
    router.push("/");
  }, 3600000);
});
</script>
