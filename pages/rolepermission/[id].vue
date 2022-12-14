<template>
  <div class="md:min-h-screen">
    <div class="m-0 py-3 md:min-h-screen">
      <div class="text-600">
        <h5>Role Permission Management</h5>
      </div>
      <div class="col-md">
        <Panel :header="role.role" class="shadow-2">
          <div class="shadow-2 w-100">
            <Form class="mb-3" @submit="save">
              <div class="card mt-3 p-5">
                <p>Permission</p>
                <div
                  v-for="permission of rolePermission"
                  :key="permission.id"
                  class="field-checkbox"
                >
                  <Checkbox
                    :inputId="permission.id"
                    name="permission"
                    :value="permission.id"
                    v-model="selectedPermission"
                  />
                  <label :for="permission.id">{{
                    permission.permission
                  }}</label>
                </div>
                <div class="mt-3" style="float: right">
                  <Button
                    label="No"
                    icon="pi pi-times"
                    class="p-button-text mb-5 mr-3"
                  />
                  <Button
                    class="mb-5"
                    label="Update"
                    icon="pi pi-check"
                    type="submit"
                  />
                </div>
              </div>
            </Form>
          </div>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const rolePermission = ref("");
const role = ref("");
let permissions = ref([]);
const selectedPermission = ref(permissions.value.id);

onMounted(async () => {
  const res = await axios.get(config.API_BASE_URL + "roles/" + route.params.id);
  role.value = res.data.data
  const response = await axios.get(config.API_BASE_URL + "permissions");
  rolePermission.value = response.data.data;
  rolePermission.value.forEach(element => {
    console.log(element.roles)
    const a = element.roles.includes({id:route.params.id});
    console.log(a)
  });
  
});

async function save() {
  // console.log(selectedPermission.value)
  try {
    selectedPermission.value.forEach(async (element) => {
      axios
        .delete(config.API_BASE_URL + "rolepermissions/" + route.params.id)
        .then(() => {
          axios.post(config.API_BASE_URL + "rolepermissions", {
            roleId: route.params.id,
            permissionId: element,
          });
        });
    });
    await alert("update sukses");
    navigateTo("/rolepermission");
  } catch (error) {
    alert(error);
  }
}
</script>
<style>
div.b {
  display: inline-block;
}
</style>
