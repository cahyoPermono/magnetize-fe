import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePermission = defineStore("permission", () => {
  const config = useRuntimeConfig();

  const token = useCookie("token");
  const roleId = useCookie("role");
  const token_user = useCookie("user");
  let arr = reactive([]);

  const checkPermission = async (permission) => {
    await getPermission();
    const dataPermission = arr.includes(permission);
    if (!dataPermission) {
      navigateTo("/dashboard");
    }
    return
  };

  const auth = async () => {
    if (!token.value) {
      return navigateTo('/login')
    }
  };

  const logout = async () => {
    const today = new Date();
    await axios.put(config.API_BASE_URL + "update/" + token_user.value, {
      lastActive: today,
    });
    token.value = null;
    roleId.value = null;
    token_user.value = null;
    arr = []
    navigateTo("/login");
  };

  const getPermission = async () => {
    try {
      const response = await axios.get(config.API_BASE_URL + "rolepermissions/" + roleId.value);
      const response_promise = response.data.data;
      response_promise.forEach(el => {
        arr.push(el.permission.permission);
      });
      return arr;
    } catch (err) {
      console.log(err);
    }
  };

  return { getPermission, checkPermission, auth, logout, token, token_user, roleId, arr };
});