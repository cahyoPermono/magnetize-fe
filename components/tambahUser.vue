<template>
  <Button
    label="Invite New User"
    icon="pi pi-plus"
    class="p-button-sm mt-3"
    @click="openModal"
  />
  <Dialog
    v-model:visible="displayModal"
    header="Create User"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '60vw' }"
    :modal="true"
  >
  <Toast />
    <div class="card p-3">
      <Form @submit="save">
        <div class="mt-2">
          <label for="pp"><small>Photo</small></label>
          <br />
          <div class="b" v-if="pict">
            <Avatar
              :image="newUser.image"
              class="mr-2"
              size="xlarge"
              shape="circle"
              style="width: 100px; height: 100px"
            />
          </div>
          <div class="b" v-if="!pict">
            <FileUpload
              name="demo[]"
              mode="basic"
              :customUpload="true"
              @uploader="onUploadAva"
              accept="image/*"
              :maxFileSize="2000000"
              :auto="true"
            />
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="fullname"
              class="col-sm-3 col-form-label pi pi-user"
              style="font-size: 13px"
            >
              &nbsp;Full Name<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="fullname"
                :rules="isRequired"
                v-model="newUser.fullName"
              />
              <ErrorMessage name="fullname">
                <small style="color: red">Full Name is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="displayname"
              class="col-sm-3 col-form-label pi pi-id-card"
              style="font-size: 13px"
            >
              &nbsp;Display Name<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="displayname"
                :rules="isRequired"
                v-model="newUser.displayName"
              />
              <ErrorMessage name="displayname">
                <small style="color: red">Display Name is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="role"
              class="col-sm-3 col-form-label pi pi-book"
              style="font-size: 13px"
            >
              &nbsp;Role<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <select name="jobs" class="form-control" v-model="newUser.role">
                <option v-for="role in roles" :value="role.id" :key="role.id">
                  {{ role.role }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="email"
              class="col-sm-3 col-form-label pi pi-at"
              style="font-size: 13px"
            >
              &nbsp;Email Address<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="email"
                :rules="isRequired"
                v-model="newUser.email"
              />
              <ErrorMessage name="email">
                <small style="color: red">Email Address is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="phone"
              class="col-sm-3 col-form-label pi pi-phone"
              style="font-size: 13px"
            >
              &nbsp;Phone Number<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <vue-tel-input v-model="newUser.phone" @input="onPhoneInput"></vue-tel-input>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label
              for="location"
              class="col-sm-3 col-form-label pi pi-map-marker"
              style="font-size: 13px"
            >
              &nbsp;Location<span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="location"
                :rules="isRequired"
                v-model="newUser.location"
              />
              <ErrorMessage name="location">
                <small style="color: red">Location is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <Button label="Submit" icon="pi pi-check" type="submit" />
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const config = useRuntimeConfig();
const displayModal = ref(false);
const roles = ref([]);

const newUser = reactive({
  fullName: "",
  displayName: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  image: "",
});

const onPhoneInput = (phone, phoneObject) => {
  newUser.phone = phoneObject.number;
};

const pict = computed(()=> newUser.image)

onMounted(() => {
  getRole();
});

function openModal() {
  displayModal.value = !displayModal.value;
}
const onUploadAva = (evt) => {
  let f = evt.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    newUser.image = reader.result;
  };
};

async function save() {
  if (newUser.image === null)
    return (newUser.image = "https://ibb.co/zPT27kB");
  try {
    await axios
      .post(config.API_BASE_URL + "users", {
        fullName: newUser.fullName,
        displayName: newUser.displayName,
        email: newUser.email,
        phone: newUser.phone,
        roleId: newUser.role,
        location: newUser.location,
        image: newUser.image,
      })
      .then(() => {
        displayModal.value = false;
        toast.add({severity:'success', summary: 'Create Success', detail:'Success Create User', life: 3000});
        // alert("Create User Success");
        location.reload();
      });
  } catch (error) {
    console.log(error);
  }
}

async function getRole() {
  try {
    axios.get(config.API_BASE_URL + "roles").then((response) => {
      roles.value = response.data.data;
    });
  } catch (err) {
    console.log(err);
  }
}

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>

