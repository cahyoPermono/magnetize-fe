<template>
    <div>
        <div class="container-dept">
            <h1 class="text-center">Kategori Job</h1>
            <div>
                <!-- {{ categories }} -->
                <DataTable :value="categories" :paginator="true" :rows="5"
                    paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    responsiveLayout="scroll" removableSort>
                    <Column field="category" header="Kategori"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePermission } from "@/stores/permission";
import axios from "axios";

const config = useRuntimeConfig();
const store = usePermission();
const token = useCookie("token");

const categories = ref([]);
const getCategories = async () => {
    const data = await axios.get(config.API_BASE_URL + "all_jobcategories", {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    });
    categories.value = data.data.categories;
};

onMounted(async () => {
    await getCategories();
});

definePageMeta({
    middleware: [
        async function (to, from) {
            const store = usePermission();
            await store.auth();
            await store.checkPermission("menu_jobs_hcd");
        },
    ],
});
</script>