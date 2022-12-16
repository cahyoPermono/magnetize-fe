<template>
  <div>
    <h2>Dashboard</h2>
    {{ store.$state.arr }}
    {{ store.$state.arr.includes("menu_users") }}
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePermission } from "~~/stores/permission";

const store = usePermission()
const router = useRouter();

// onMounted(async () => {
//   await store.getPermission()
//   console.log(store.arr);
//   console.log(store.$state.arr.includes("menu_users"))
// });

definePageMeta({
  layout: "false",
  middleware: [
    async function (to, from) {
      const store = usePermission()
      await store.getPermission()
      console.log(store.arr);
      const dataPermission = store.$state.arr.includes("menu_use");
      if (!dataPermission) {
        console.log("tidak bisa masuk")
        // const today = new Date();
        // await axios.put(config.API_BASE_URL + "update/" + token_user.value, {
        //   lastActive: today,
        // });
        // token.value = null;
        // roleId.value = null;
        // token_user.value = null;
        // navigateTo("/login");
      }
      return
    },
  ],
});
</script>
