import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePermission = defineStore("permission", () => {
  const permission = ref([]);
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const roleId = useCookie("role");
  const token_user = useCookie("user");
  const arr = reactive([])
  let a = ref(false)

  function getPermission() {
    try {
      axios
        .get(config.API_BASE_URL + "rolepermissions/" + roleId.value)
        .then((response) => {
          // console.log(response.data.data)
          response.data.data.forEach((element) => {
            arr.push(element.permission.permission);
          });
          const p = arr;
          a.value = arr.includes('menu_users')
          console.log(a.value)
        });

    } catch (err) {
      console.log(err);
    }
  }

  return { permission, getPermission, token, token_user, roleId, arr, a };
});