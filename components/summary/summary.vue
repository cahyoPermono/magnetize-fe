<template>
    <div>
        <div class="grid">
            <div class="col">
                <Panel>
                    <template #header>
                        <b>Job Detail &nbsp;<span><i class="pi pi-pencil" style="font-size: 0.5rem; cursor:pointer;"
                                    @click="openModalUpdate()"></i></span></b>
                    </template>
                    <table border="0">
                        <tr>
                            <td>
                                Job Name
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Location
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.location }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Remote
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: <span v-if="(job_data.remote === true)">Yes</span> <span
                                    v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contract Detail
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.contract_detail }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Headcount
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.headcount }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Minimum Salary
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.min_salary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Maximum Salary
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.max_salary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Currency
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.currency }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Payment Frequency
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.payment_frequency }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Job Creator
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.user ? job_data.user.displayName : job_data.user }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Job Category
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.jobCategory ? job_data.jobCategory.category : '-' }}
                            </td>
                        </tr>
                    </table>
                    <SummaryUpdateSummary :modalUpdateJob="visibleModalUpdateJob" @closeModal="openModalUpdate()" />
                </Panel>
            </div>
            <div class="col">
                <Panel>
                    <template #header>
                        <b>Job Description &nbsp;<span><i class="pi pi-pencil" style="font-size: 0.5rem; cursor:pointer;"
                                    @click="openModalDesc()"></i></span></b>
                    </template>
                    <p>{{ job_data.desc }}</p>
                    <SummaryUpdateDesc :modalUpdateDesc="visibleModalUpdateDesc" @closeModal="openModalDesc()" />
                </Panel>
                <Panel class="mt-4">
                    <template #header>
                        <b>Job Package &nbsp;<span><i class="pi pi-pencil" style="font-size: 0.5rem; cursor:pointer;"
                                    @click="openModalPackage()"></i></span></b>
                    </template>
                    <p>{{ job_data.package_detail }}</p>
                    <SummaryUpdatePackage :modalUpdateDesc="visibleModalUpdatePackage" @closeModal="openModalPackage()" />
                </Panel>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const visibleModalUpdateDesc = ref(false);
const visibleModalUpdatePackage = ref(false);
const visibleModalUpdateJob = ref(false);
const job_data = ref([]);

const id = route.params.id;
let job = reactive();
let creator_data = reactive();
const getter = async () => {
    job = await axios.get(config.API_BASE_URL + "jobs/" + id);
    job = job.data.data;
    job_data.value = job;
}
const desc = ref('');
onMounted(() => {
    getter();
});

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        visibleModalUpdateJob.value = false;
    }
};

const openModalDesc = async () => {
    await getter();
    return visibleModalUpdateDesc.value = !visibleModalUpdateDesc.value;
};

const openModalPackage = async () => {
    await getter();
    return visibleModalUpdatePackage.value = !visibleModalUpdatePackage.value;
};

const openModalUpdate = async () => {
    await getter();
    return visibleModalUpdateJob.value = !visibleModalUpdateJob.value;
};

</script>
  
  