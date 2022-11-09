<template>
    <div class="bg-bluegray-900 text-gray-100 p-3 text-center">
        <Toast />
        <div class="align-items-center col-12">
            <span class="line-height-3">like/follow/subscribe semua sosial media kami untuk mendapatkan merchandise
                menarik</span>
        </div>
        <div class="align-items-center col-12">
            <span class="line-height-3" style="cursor:pointer;">
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
                        <Button label="Copy" @click="copy" class="p-button-text p-button-warning p-button-sm m-1"
                            autofocus />
                    </div>
                </Dialog>
            </span>
        </div>
    </div>
    <div class="pb-6 md:pb-6 px-0 text-center  " style="background-color: #129666;">
        <div style="background-color: #129666;">
            <img src="~/assets/Flyer_Revisi.jpg" alt="image" class="w-10 mt-6 shadow-6 rounded">
        </div>
        <div class="py-6 text-center align-items-center">
            <div class="px-4 md:px-0 font-bold text-4xl md:text-6xl">
                <span class="text-900">Lowongan Kerja, </span>
                <span class="text-yellow-500">PT. Imani Prima</span>
            </div>
            <hr class="w-2 mt-4">
            <p class="text-white md:text-2xl">jadilah bagian dari tim kami</p>
            <NuxtLink to="https://imaniprima.co.id/careers/"><Button label="Lihat Lowongan Pekerjaan"
                    icon="pi pi-external-link" class="p-button-warning p-3" /> </NuxtLink>
        </div>
        <Button @click="openPosition('bottomright')" label="Informasi" icon="pi pi-question-circle"
            class="sticky mr-3 p-button-rounded p-button-warning"
            style="bottom:2%;float: right;box-shadow: 2px 2px 3px #1d1d1d" />
        <Dialog header="Informasi" v-model:visible="displayPosition" :breakpoints="{ '640px': '75vw' }"
            :style="{ width: '20vw' }" :position="position" :modal="true">
            <div class="text-center mt-4">
                <span>informasi lebih lanjut hubungi:</span>
                <p class="font-bold">Khusnul(IF-00)</p>
                <NuxtLink
                    to="https://wa.me/628119393489?text=permisi%20,saya%20tertarik%20dengan%20Lowongan%20Imani%20Prima.%20Boleh%20saya%20mendapat%20informasi%20lebih%20lanjut">
                    <Button label="Whatsapp" icon="pi pi-whatsapp" @click="closePosition"
                        class="p-button-text"></Button>
                </NuxtLink>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
const link = "recruitment.imaniprima.co.id"
const displayPosition = ref(false);
const position = ref('center');
const displayModal = ref(false);
const jobsModal = reactive({
    nama: "",
    lokasi: "",
    deskripsi: "",
    requirement: "",
});

const openModal = (nama, lokasi, deskripsi, requirement) => {
    displayModal.value = true;
    jobsModal.nama = nama;
    jobsModal.lokasi = lokasi;
    jobsModal.deskripsi = deskripsi;
    jobsModal.requirement = requirement;
};

const closeModal = () => {
    displayModal.value = false;
};
const openPosition = (pos) => {
    position.value = pos;
    displayPosition.value = true;
};
const closePosition = () => {
    displayPosition.value = false;
};
const displayLink = ref(false);
const shareLink = () => {
    displayLink.value = !displayLink.value;

};
const copy = () => {
    navigator.clipboard.writeText(link);
    toast.add({ severity: "warn", summary: "Link Copied !" });
    return shareLink();
}

const jobs = reactive([
    {
        nama: "Cleaning Service/OB",
        lokasi: "Jakarta",
        requirement: ["Pendidikan minimal SMA", "Pria, usia minimal 25 tahun", "Pengalaman minimal 2 tahun", "Mampu membersihkan dan merapikan seluruh area kantor dengan cekatan.", "Memahami pengetahuan dasar mengenai peralatan dan bahan yang dipakai untuk bekerja.", "Dapat bekerja secara individu ataupun dalam tim.", "Jujur dan bertanggung jawab.", "Memiliki kemampuan komunikasi yang baik.", "Dapat bekerja dalam tekanan."],
        deskripsi: "Membersihkan dan merapikan seluruh area kantor"
    },
    {
        nama: "Business Analyst",
        lokasi: "Jakarta",
        requirement: ["Pendidikan Minimal Sarjana  jurusan  Teknik Informatika, Sistem Informasi, Ilmu Komputer, dan Manajemen Informatika.", "Memahami perancangan sebuah aplikasi.", "Memahami tahapan  dalam SDLC.", "Fresh Graduated apabila ada pengalaman lebih disukai.", "Memiliki kemampuan komunikasi yang baik.", "Bersemangat untuk mempelajari hal-hal baru.", "Dapat bekerja dalam tekanan."],
        deskripsi: "Melakukan analisa terhadap kebutuhan produk IT, mulai dari trend, kebutuhan, dan pasar.Dapat menjabarkan visi mengenai pengembangan produk IT. Membuat presentasi untuk pengembangan produk."
    },
    {
        nama: "System Analyst",
        lokasi: "Jakarta",
        requirement: ["Pendidikan minimal S1/D4 jurusan Sistem Informasi/Manajemen Informatika/Teknik Komputer atau sebidang yang sama", "Memiliki pengalaman minimal 1-2 tahun sebagai System Analyst dan terlibat minimal 2 (dua) siklus proyek hingga tahap close-out", "Mahir dalam menerjemahkan dokumen kebutuhan sistem menjadi konsep detail pengembangan system aplikasi", "Mahir dalam mendesain alur proses dalam bentuk diagram flow : Use Case / Flow Chart / DFD", "Mahir dalam mendesain struktur database : ERD", "Mahir dalam mendesain tampilan/UI dengan memperhatikan prinsip-prinsip UI/UX", "Mahir menggunakan tools untuk melakukan wireframe dan prototyping : Balsamiq, Figma", "Memiliki daya analisa yang kuat, berpikir logis dan sistematis serta dapat memberikan solusi", "Proaktif dan memiliki inisiatif yang tinggi", "Dapat berkomunikasi dan bekerjasama dengan baik"],
        deskripsi: "Berinteraksi dengan user untuk melakukan translasi kebutuhan bisnis menjadi desain spesifikasi sistem Menganalisa, merancang dan membuat dokumentasi mengenai design database dan aplikasi sesuai kebutuhan user secara efektif Membangun wireframe dan screenflow, data flow diagram, dan functional case untuk mempermudah penggambaran sebuah flow bisnis yang dikaitkan kepada fungsional sistem Melakukan Quality Assurance, SIT, dan UAT selama pengembangan sistem"
    },
    {
        nama: "Programmer",
        lokasi: "Jakarta",
        requirement: ["Pendidikan Minimal Sarjana  jurusan  Teknik Informatika, Sistem Informasi, Ilmu Komputer, dan Manajemen Informatika.", "Menguasai : PHP, Javascript framework Node Js", "Memahami Java spring boot (nilai tambah)", "Fresh Graduated apabila ada pengalaman lebih disukai.", "Memiliki kemampuan komunikasi yang baik.", "Bersemangat untuk mempelajari hal-hal baru.", "Dapat bekerja dalam tekanan"],
        deskripsi: "Membangun aplikasi dengan bahasa pemrograman tertentu. Mengawal proses pembangunan sebuat aplikasi  mulai dari perancangan sampai dengan pengetesan."
    },
    {
        nama: "Software Engineer",
        lokasi: "Bandung",
        requirement: ["frontend: react, disukai berpengalaman dengan vue atau angular", "backend: disukai berpengalaman dengan python, php, java, dan golang", "database: NoSQL, Opengraph, disukai berpengalaman dengan mongodb, mysql, dan postgresql", "android and ios mobile app development: disukai berpengalaman dengan flutter", "berpengalaman menggunakan git, subversions, docker.", "pengetahuan dan berpengalaman tentang web communication dan IOT messaging protocols seperti MQTT dan Websocket (optional)"],
        deskripsi: "Mengembangkan solusi software berdasarkan spesifikasi kebutuhan Merawat, memperbaiki, meningkatkan dan memperbaharui software yang ada Mengintegrasikan komponen atau menambahkan fitur baru pada software yang ada Membuat dokumen teknis terkait sebagai laporan dan dokumentasi Berkomunikasi dengan klien terkait aplikasi atau solusi perangkat lunak yang di kembangkan"
    }
]);
</script>

<style>
.float {
    position: fixed;
    bottom: 40px;
    right: 40px;
    text-align: center;
    margin-top: 22px;
}
</style>