<template>
  <div class="container-dept p-3">
    <div class="p-3">
      <div class="b">
        <h2>
          {{ dept.role }}
          {{ dept.permissions }}
          <i class="pi pi-eye" style="opacity: 0.3" @click="viewDept"></i>
        </h2>

        <Dialog
          header="Detail Departemen"
          v-model:visible="displayResponsive"
          :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '50vw' }"
        >
          <div class="card p-3">
            <span style="float: right">
              <edit-departemen />
            </span>
            <small>Nama Departemen</small>
            <p>{{ dept.nama }}</p>
            <small>Lokasi</small>
            <p>{{ dept.lokasi }}</p>
            <small>Alamat</small>
            <p>{{ dept.alamat }}</p>
            <small>Industri</small>
            <p>{{ dept.industri }}</p>
            <small>URL</small>
            <p>{{ dept.url }}</p>
            <small>Deskripsi</small>
            <p>{{ dept.deskripsi }}</p>
          </div>
          <template #footer>
            <Button
              label="OK"
              icon="pi pi-check"
              @click="viewDept"
              class="p-button-text"
            />
          </template>
        </Dialog>
        <small>{{ dept.alamat }}, {{ dept.lokasi }}</small>
      </div>
      <div></div>
    </div>
    <div class="mt-5">
      <div class="b col-12">
        <div class="card p-3">
          <tab-component />
        </div>
      </div>
    </div>
    <NuxtLink to="/departements" class="float my-float">
      <Button
        icon="pi pi-arrow-left"
        class="p-button-rounded"
        style="box-shadow: 2px 2px 3px #999"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
import axios from "axios";
const displayResponsive = ref(false);

const viewDept = () => {
  displayResponsive.value = !displayResponsive.value;
};

const rolePermission = ref("");


onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig();

  const id = route.params.id;
  const response = await axios.get(config.API_BASE_URL + "roles", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  rolePermission.value = response.data.data;
    let permissions = [];
    element.permissions.forEach((el) => {
      permissions.push(el.permission);
    });
    view_data.push({
      id: element.id,
      role: element.role,
      permissions: permissions,
    });
  // const res = await axios.get(config.API_BASE_URL + "roles/" + id);
  //   dept.value = res.data.data;
});
</script>
<style>
.ProseMirror .deskripsi-one {
  border: 0px;
}

div.b {
  display: inline-block;
}

.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  text-align: center;
  margin-top: 22px;
}
</style>
