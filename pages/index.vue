<template>
  <div class="bg-pattern" style="min-height: 100vh;">
    <div
      class="bg-bluegray-900 text-gray-100 py-2 text-center shadow-3 animate__animated animate__fadeInDownBig header-anim">
      <div class="align-items-center col-12 p-0 text-sm">
        <span>like/follow/subscribe semua sosial media kami untuk mendapatkan merchandise menarik</span>
      </div>
      <div class="align-items-center col-12">
        <span class="p-0" style="cursor:pointer;">
          <a href="https://www.facebook.com/PTImaniPrima/" target="_blank">
            <Button iconClass="text-2xl md:text-3xl" icon="pi pi-facebook"
              class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
          </a>
          <a href="https://www.instagram.com/imaniprima/" target="_blank">
            <Button iconClass="text-2xl md:text-3xl" icon="pi pi-instagram"
              class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
          </a>
          <a href="https://www.youtube.com/channel/UC9ONViZhn_fJLN9ciKDESzw/" target="_blank">
            <Button iconClass="text-2xl md:text-3xl" icon="pi pi-youtube"
              class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
          </a>
          <a href="https://www.linkedin.com/company/pt-imani-prima/" target="_blank">
            <Button iconClass="text-2xl md:text-3xl" icon="pi pi-linkedin"
              class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
          </a>
          <Button iconClass="text-2xl md:text-3xl" icon="pi pi-share-alt" @click="shareLink"
            class="p-button-rounded p-button-outlined p-button-sm mx-1 md:mx-3" />
          <Dialog header="Copy Link" v-model:visible="displayLink" :breakpoints="{ '640px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">
            <div class="block">
              <InputText v-model="link" class="w-8"></InputText>
              <Button label="Copy" @click="copy" class="p-button-text p-button-warning p-button-sm m-1" autofocus />
            </div>
          </Dialog>
        </span>
      </div>
    </div>
    <div>
      <div class="grid grid-nogutter first-land">
        <Toast />
        <div class="md:col-6 col-12 m-0 mt-5 text-center container">
          <div>
            <img src="~/assets/wearehiring.png" alt="Image"
              class="w-10 md:w-12 animate__animated animate__bounceInLeft img1">
          </div>
        </div>
        <div class="md:col-6 col-12 md:mt-5">
          <div
            class="md:mr-5 px-4 pt-2 pb-6 bg-green-400 border-round-xl shadow-3 animate__animated animate__bounceInUp form-anim">
            <div class="text-center">
              <img src="~/assets/logoimani2.png" alt="Image" class="w-8 md:w-8">
            </div>
            <p class="text-center text-white text-sm m-0 p-0 mt-3">Anda layak jadi asset kami</p>
            <h2 class="text-center m-0 p-0">Lowongan yang dibuka :</h2>
            <Accordion v-for="(tab, index) in tabs" :key="tab.title" @click="active(index)" :activeIndex="tab.isActive">
              <AccordionTab :header="tab.title">
                <div v-if="tab.tugas">
                  <p><strong>Uraian Tugas</strong></p>
                  <ul>
                    <li v-for="(tugas, index) in tab.tugas" :key="index">{{ tugas }}</li>
                  </ul>
                </div>
                <p><strong>Kualifikasi</strong></p>
                <ul>
                  <li v-for="(kualifikasi, index) in tab.kualifikasi" :key="index">{{ kualifikasi }}</li>
                </ul>
              </AccordionTab>
            </Accordion>
            <!-- Buttons -->
            <!-- <div class="text-center mt-3">
              <Button label="Apply" icon="pi pi-pencil" class="p-button-warning" @click="form"
                style="margin-right: 20px;" />
              <Button label="Test DISC" icon="pi pi-book" class="p-button-warning" @click="test"
                style="margin-right: 20px;" />
              <span v-if="!isLoggedIn">
                <Button label="Login" icon="pi pi-sign-in" class="p-button-warning" @click="login" />
              </span>
              <span v-if="isLoggedIn">
                <Button label="Masuk" icon="pi pi-sign-in" class="p-button-warning" @click="login" />
              </span>
            </div> -->
          </div>
        </div>
      </div>
      <Button icon="pi pi-file" label="Apply"
        class="p-button-rounded p-button-warning float animate__animated animate__bounceIn btn-anim"
        style="box-shadow: 2px 2px 3px #999" @click="openPosition('center')" />
      <Dialog class="bukuTamu" header="Buku Tamu" v-model:visible="displayPosition" :breakpoints="{ '640px': '75vw' }"
        :style="{ width: '40vw' }" :position="position" :modal="true">
        <Form>
          <div class="bg-yellow-400 py-4 px-4 mb-2 shadow-5 border-round-sm">
            <div class="mb-4">
              <small for="name" class="block text-900 font-medium mb-2">Nama<span style="color:red;">*</span></small>
              <span class="p-input-icon-left">
                <i class="pi pi-user" />
                <InputText type="text" v-model="data.name" placeholder="Nama" name="name" />
              </span>
            </div>
            <div class="mb-4">
              <div class="grid">
                <div class="col">
                  <small for="posisi" class="block text-900 font-medium mb-2">Posisi<span
                      style="color:red;">*</span></small>
                  <Dropdown v-model="data.posisi" :options="tabs" optionLabel="title" placeholder="Pilih Posisi" />
                </div>
                <div class="col">
                  <small for="cv" class="block text-900 font-medium mb-2">Upload CV<span
                      style="color:red;">*</span></small>
                  <FileUpload name="demo[]" mode="basic" :customUpload="true" @uploader="onUpload" accept=".pdf"
                    :maxFileSize="2000000" :auto="true" class="bg-yellow-700 border-yellow-700" />
                  <small for="cv" class="block text-900 font-medium">Maksimal Ukuran File: 2MB</small>
                </div>
              </div>
            </div>
          </div>
          <Button label="Apply" icon="pi pi-user" class="p-button-warning mt-3 shadow-5" @click="masuk()" />
        </Form>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import "animate.css";

const toast = useToast();
const router = useRouter();
const config = useRuntimeConfig();
let isLoggedIn = ref(false);

onMounted(async () => {
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
const openPosition = (pos) => {
  position.value = pos;
  displayPosition.value = true;
};
const link = "https://recruitment.imaniprima.co.id/";
const displayPosition = ref(false);
const position = ref('center');
const displayLink = ref(false);
const shareLink = () => {
  displayLink.value = !displayLink.value;
};
const copy = () => {
  navigator.clipboard.writeText(link);
  toast.add({ severity: "warn", summary: "Link Copied !", life: 1000 });
  return shareLink();
};

const active = (index) => {
  tabs.value.forEach((val, i) => {
    tabs.value[i].isActive = 1;
  })
  tabs.value[index].isActive = 0;
}
const tabs = ref([
  {
    title: "IT Programmer (Intern/Kerja Praktek)",
    kualifikasi: [
      "Diutamakan mahasiswa jurusan T.Informatika, Sistem Informasi,T.Elektro.",
      "Menyukai programming web/mobile app",
      "Inisiatif dan semangat belajar yang tinggi",
      "Dapat berkomunikasi dan bekerjasama dengan baik",
      "Lokasi penempatan di Bandung/Jakarta.",
    ],
    isActive: 1
  },
  {
    title: "Full Stack Programmer",
    kualifikasi: [
      "Pendidikan minimal Diploma (D3) jurusan Teknologi Informasi",
      "Pengalaman kerja dibidang yang sama minimal 3 tahun",
      "Menguasai Docker, JavaScript, HTML, CSS/SASS, React, Redux, NodeJS, TypeScript, Angular, Laravel, Android,SQL",
      "Berpengalaman membuat aplikasi Frontend atau Backend",
      "Memahami C++ dan Operating System Embedded (diutamakan)",
      "Memahami cara kerja Operating System Linux/Android (diutamakan)",
    ],
    isActive: 1
  },
  {
    title: "Web App Developer Trainee",
    kualifikasi: [
      "Memahami PHP, JavaScript, Java, Python",
      "Memahami Database salahsatu SQL/NoSQL(MySQL, PostGreSQL, SQLite, MongoDB, Oracle)",
      "Memahami Wordpress",
      "Memahami dasar SEO",
      "Memahami Spring, Django, Express, React, Angular, Vue (lebih disukai)",
      "Memiliki keinginan kuat untuk menjadi expert dibidang Software Tech",
    ],
    tugas: [
      "Mengikuti App Developer Bootcamp Internal",
      "Implementasi hasil Bootcamp dengan include di enterprise project baik internal maupun eksternal",
    ],
    isActive: 1
  },
  {
    title: "IT Helpdesk",
    kualifikasi: [
      "Usia maksimal 25 tahun",
      "Berpengalaman minimal 1 tahun di posisi yang sama",
      "Pendidikan minimal SMK jurusan Teknik Komputer & Jaringan",
      "Menguasai Ms Office, internet, dan email",
      "Memahami Network dan PC environment",
      "Cepat tanggap, pekerja keras, dapat bekerja dengan baik di bawah tekanan, bersedia untuk bekerja lembur, bertanggung jawab, dan disiplin",
      "Dapat bekerja dengan tim maupun secara individu",
    ],
    tugas: [
      "Menyediakan respon dan bantuan terhadap complaint user",
      "Monitoring seluruh jaringan, server, website, dan aplikasi",
      "Melakukan setup dan menyelesaikan masalah pada komputer",
      "Jam kerja dengan sistem shift",
    ],
    isActive: 1
  },
]);

const data = reactive({
  name: "",
  posisi: "",
  cv: "",
});

const onUpload = (evt) => {
  let f = evt.files[0];
  // newAttachment.type = f.type;
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    data.cv = reader.result;
  };
  toast.add({ severity: 'success', summary: 'Upload CV sukses', life: 3000 });
};

const masuk = () => {
  const element = document.querySelector('.bukuTamu');
  const btnAnim = document.querySelector('.btn-anim');
  const headerAnim = document.querySelector('.header-anim');
  const img1 = document.querySelector('.img1');
  const formAnim = document.querySelector('.form-anim');
  const val = Object.values(data);
  if (val.includes("")) {
    toast.add({ severity: "error", summary: "Ada data yang belum diisi", life: 3000 });
    element.classList.add('animate__animated', 'animate__shakeX');
    return router.push({ path: "/" });
  } else {
    try {
      const data_post = {
        name: data.name,
        posisi: data.posisi.title,
        cv: data.cv,
      }
      axios.post(config.API_BASE_URL + "guest", data_post)
        .then(() => {
          toast.add({ severity: "info", summary: "Enjoy the Carnaval", life: 3000 });
          displayPosition.value = false;
          headerAnim.classList.add('animate__animated', 'animate__fadeOut');
          img1.classList.add('animate__animated', 'animate__bounceOutLeft');
          formAnim.classList.add('animate__animated', 'animate__bounceOutDown');
          btnAnim.classList.add('animate__animated', 'animate__bounceOut')
          setTimeout(() => {
            router.push({ path: "/jobs" })
          }, 3000)
        });
    } catch (err) {
      console.log(err);
    }
  }
};
definePageMeta({
  layout: false,
});

</script>

<style>
.header-anim {
  animation-delay: 300ms;
}

.btn-anim {
  animation-delay: 1.8s;
}

.img1 {
  animation-delay: 800ms;
}

.form-anim {
  animation-delay: 1s;
}

.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  text-align: center;
  margin-top: 22px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
}

@media screen and (max-width:768px) {
  .container {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

}
</style>