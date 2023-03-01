<template>
    <div>
        <div class="topBar px-2 py-3 shadow-3">
            <a href="/dashboard"><img src="~/assets/magnetize-logo.png" alt="Logo" style="height: 40px" /></a>
            <div style="float: right" class="px-2">
                <Button icon="pi pi-sign-out" class="p-button-text p-button-plain" @click="signOut()" />
                <Dialog v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
                    :style="{ width: '30vw' }" :modal="true">
                    <template #header>
                        <h4><strong>Sign Out Confirmation</strong></h4>
                    </template>
                    <div class="grid pt-3">
                        <div class="col-1 col-offset-1"> <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem;"></i>
                        </div>
                        <div class="col font-bold">&nbsp;&nbsp;Do you want to log out ?</div>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeModal()" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" @click="store.logout()" class="p-button-danger" />
                    </template>
                </Dialog>
            </div>
        </div>
        <slot />
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "~~/stores/applicant_auth";
import "animate.css";

const router = useRouter();
const store = useStore();
const displayModal = ref(false);
const signOut = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
};

</script>