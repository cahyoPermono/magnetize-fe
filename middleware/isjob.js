import axios from "axios";
export default function () {

  const arr = reactive([]);
  const role = useCookie("role");
    axios
      .get("http://localhost:3000/api/1.0/rolepermissions/" + role.value)
      .then((response) => {
        response.data.data.forEach(element => {
          arr.push(element.permission.permission)
        });
        
        const p = arr.includes('menu_jobs_hcd')
        if(!p){
          return navigateTo('/dashboard')
        }
      });
}
