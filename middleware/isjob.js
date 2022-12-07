import axios from "axios";
export default function () {
  const arr = reactive([]);
  const config = useRuntimeConfig();
  const role = useCookie("role");
  axios.get(config.API_BASE_URL + "rolepermissions/" + role.value)
  .then((response) => {
    response.data.data.forEach((element) => {
      arr.push(element.permission.permission);
    });
    const p = arr.includes("menu_jobs_hcd");
    if (!p) {
      return navigateTo("/dashboard");
    }
  });
}
