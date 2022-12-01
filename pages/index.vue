<template>
  <div class="grid grid-nogutter" style="background-color:#129666;">
    <div class="col-md-6 col-12 p-4">
      <div class="px-2 py-4 mx-4 text-center">
        <img class="w-8" src="~/assets/logo-putih.png" /> <br>
        <span class="text-1xl text-white">Anda layak jadi asset kami</span>
      </div>
      <div class="card p-6 m-4 shadow-6" style="border-radius: 10px; background-color: #faa922;">
        <h5 class="font-bold text-center text-white">Buku Tamu</h5>
        <hr>
        <Form>
          <div class="mb-4">
            <small for="posisi" class="block text-900 font-medium mb-2">Posisi<span style="color:red;">*</span></small>
            <select
              name="posisi"
              class="form-control"
              v-model="data.posisi">
              <option value="Intership">Web App Developer Trainee</option>
              <option value="Web Dev Trainee">Fullstack Developer</option>
              <option value="Web Dev Trainee">Internship / Kerja Praktek</option>
            </select>
          </div>
          <div class="mb-4">
            <small for="cv" class="block text-900 font-medium mb-2">Uploac CV<span style="color:red;">*</span></small>
            <FileUpload
              name="demo[]"
              mode="basic"
              :customUpload="true"
              @uploader="onUpload"
              accept="image/*,.pdf"
              :maxFileSize="2000000"
              :auto="true"
            />
          </div>
          
          <Button label="Apply" icon="pi pi-user" class="p-button-warning" @click="masuk" />
        </Form>
      </div>
    </div>
    <div class="col-md-6 col-12 container">
      <div class="d-flex flex-row-reverse" style="margin-right:75px">
        <img src="~/assets/undraw_content_team_re_6rlg.svg" alt="Image" class="w-10">
      </div>
      <div class="d-flex flex-row mt-4">
        <Button label="Apply" icon="pi pi-pencil" class="p-button-warning" @click="form" style="margin-right: 20px;" />
        <Button label="Test DISC" icon="pi pi-book" class="p-button-warning" @click="test"
          style="margin-right: 20px;" />
        <div v-if="!isLoggedIn">
          <Button label="Login" icon="pi pi-sign-in" class="p-button-warning" @click="login" />
        </div>
        <div v-if="isLoggedIn">
          <Button label="Masuk" icon="pi pi-sign-in" class="p-button-warning" @click="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const router = useRouter();
const config = useRuntimeConfig();
let isLoggedIn = ref(false);

onMounted(async() => {
  const token = useCookie('token')
  if (token.value) {
    isLoggedIn.value = !isLoggedIn.value;
    await setTimeout(() => {
      token.value = null
      alert("Waktu habis, silahkan login lagi")
      router.push('/login')
    }, 3600000);
  }
})
const data = reactive({
  posisi: "",
  cv: "",
});

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const validateEmail = (value) => {
  isRequired(value)
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Alamat email harus valid';
  }
  // All is good
  return true;
}

const onUpload = (evt) => {
  let f = evt.files[0];
  // newAttachment.type = f.type;
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    data.cv = reader.result;
  };
  alert('Upload Success')
};

const masuk = () => {
  try {
    axios.post(config.API_BASE_URL + "guest", {
      posisi: data.posisi,
      cv: data.cv,
    }).then(() => {
      toast.add({ severity: "info", summary: "Enjoy the Carnaval" });
      router.push({ path: "/jobs" });
    })
  } catch (err) {
    console.log(err);
  }
};
const login = () => {
  router.push('/login')
}
const form = () => {
  router.push('/formapplication/form')
}
const test = () => {
  router.push('/discCard')
}
definePageMeta({
  layout: false,
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";

body {
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
}

@media screen and (max-width:768px) {
  .container {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
}

small {
  opacity: 0.7;
}

.mb-3 {
  height: 35px;
}

body a:hover {
  text-decoration: none;
}
</style>