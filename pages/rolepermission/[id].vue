<template>
  <div class="md:min-h-screen">
    <Toast />
    <div class="m-0 py-3 md:min-h-screen">
      <div class="text-600">
        <h5>Role Permission Management</h5>
      </div>
      <div class="col-md">
        <Panel :header="role.role" class="shadow-2">
          <div class="shadow-2 w-80">
            <Form class="mb-3" @submit="save">
              <div class="card mt-3">
                <p style="margin-top: 20px; margin-left: 30px;">Permission</p>
                <div v-for="permission of rolePermission" :key="permission.id" class="field-checkbox"
                  style="margin-left: 35px;">
                  <Checkbox :inputId="permission.id" name="permission" :value="permission.id"
                    v-model="selectedPermission" />
                  <label :for="permission.id">{{ permission.permission }}</label>
                </div>
                <div class="mt-3">
                  <Button class="p-button-sm" label="Update" icon="pi pi-check" type="submit"
                    style="float: right; margin-right: 20px;" />
                  <NuxtLink to="/rolepermission">
                    <Button label="No" icon="pi pi-times" class="p-button-sm p-button-warning"
                      style="float: right; margin-right: 10px; margin-bottom: 15px;" />
                  </NuxtLink>
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
import { useToast } from "primevue/usetoast";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const rolePermission = ref("");
const role = ref("");
let permissions = ref([]);
const selectedPermission = ref(permissions.value);

onMounted(async () => {
  const res = await axios.get(config.API_BASE_URL + "roles/" + route.params.id);
  role.value = res.data.data;
  role.value.permissions.forEach((element) => {
    permissions.value.push(element.id);
  });
  const response = await axios.get(config.API_BASE_URL + "permissions");
  rolePermission.value = response.data.data;
});

async function save() {
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
    await toast.add({ severity: "success", summary: "Berhasil", detail: "Permission Role Berhasil diupdate", });
    setTimeout(async () => {
      router.push("/rolepermission");
    }, 1000);
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
