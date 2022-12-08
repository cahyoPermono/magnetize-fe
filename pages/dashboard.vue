<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <h2>Dashboard</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const confirm = useConfirm();

const token = useCookie("token");
const roleId = useCookie("role");
const token_user = useCookie("user");

const confirm1 = () => {
  confirm.require({
    message: "Please LogIn",
    header: "Time is up",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      token.value = null;
      roleId.value = null;
      token_user.value = null;
      router.push("/login");
    },
  });
};

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  await setTimeout(() => {
    confirm1();
    // token.value = null
    // roleId.value = null
    // token_user.value = null
    // alert("Time is up, please LogIn")
    // router.push('/')
  }, 3600000);
});
</script>
