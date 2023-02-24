<template>
    <div>
        <div class="topBar px-2 py-3 shadow-3">
            <Button icon="pi pi-bars" class="p-button-text p-button-plain" @click="sidebar()" />
            <a href="/dashboard"><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px" /></a>
            <div style="float: right" class="px-2">
                <Button icon="pi pi-sign-out" class="p-button-text p-button-plain" @click="signOut()" />
                <Dialog v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
                    :style="{ width: '30vw' }" :modal="true">
                    <template #header>
                        <h4><strong>Sign Out Confirmation</strong></h4>
                    </template>
                    <div class="grid pt-3">
                        <div class="col-1 col-offset-1"> <i class="pi pi-exclamation-triangle"
                                style="font-size: 1.5rem;"></i></div>
                        <div class="col font-bold">&nbsp;&nbsp;Do you want to log out ?</div>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeModal()" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" @click="store.logout()" class="p-button-danger" />
                    </template>
                </Dialog>
            </div>
        </div>
        <div>
            <div class="row" style="height: 90vh; width: 100%;">
                <div v-show="isSidebarActive" class="col-2 px-3 shadow-3 sidebar animate__animated animate__faster">
                    <strong>
                        <p style="margin-left: 5px;">Home</p>
                    </strong>
                    <div class="ml-3 mb-3">
                        <NuxtLink to="/dashboard">
                            <Button icon="pi pi-home" class="p-button-text p-button-plain" label="Home" />
                        </NuxtLink>
                    </div>
                </div>
                <div :class="[isSidebarActive ? activeSidebar : '', !isSidebarActive ? deactiveSidebar : '']">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { usePermission } from "~~/stores/permission";
import "animate.css";

const store = usePermission();

const displayModal = ref(false);
const signOut = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
};

let isSidebarActive = ref(true);
let deactiveSidebar = ref("col-12 px-5");
let activeSidebar = ref("col-10 px-5");
const sidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (isSidebarActive.value) {
        sidebar.classList.add('animate__fadeOutLeft');
        sidebar.classList.remove('animate__fadeInLeft');
        setTimeout(() => { isSidebarActive.value = !isSidebarActive.value; }, 300)
    } else {
        isSidebarActive.value = !isSidebarActive.value;
        sidebar.classList.add('animate__fadeInLeft');
        sidebar.classList.remove('animate__fadeOutLeft');
    }
};

</script>