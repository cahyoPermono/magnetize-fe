<template>
    <Toast />
    <div>
        <div class="grid">
            <div class="col">
                <Panel>
                    <template #header>
                        <b>Job Detail &nbsp;<span><i class="pi pi-pencil"
                                    style="font-size: 0.5rem; cursor:pointer;" @click="openModalUpdate()"></i></span></b>
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
                                &nbsp;&nbsp;&nbsp;&nbsp;: {{ job_data.creator }}
                            </td>
                        </tr>
                    </table>
                    <SummaryUpdateSummary :modalUpdateJob="visibleModalUpdateJob" @closeModal="openModalUpdate()" />
                </Panel>
            </div>
            <div class="col">
                <Panel>
                    <template #header>
                        <b>Job Description &nbsp;<span><i class="pi pi-pencil"
                                    style="font-size: 0.5rem; cursor:pointer;" @click="openModalDesc()"></i></span></b>
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
import { useToast } from "primevue/usetoast";
const config = useRuntimeConfig();
const route = useRoute();
const visibleModalUpdateDesc = ref(false);
const visibleModalUpdatePackage = ref(false);
const visibleModalUpdateJob = ref(false);
const job_data = reactive({
    name: null,
    location: null,
    remote: null,
    headcount: null,
    min_salary: null,
    max_salary: null,
    currency: null,
    payment_frequency: null,
    contract_detail: null,
    desc: null,
    package_detail: null,
    desc: null,
    creator: null
});

const id = route.params.id;
let job = reactive();
let creator_data = reactive();
const toast = useToast();
const getter = async () => {
    job = await axios.get(config.API_BASE_URL + "jobs/" + id);
    job = await job.data.data;
    job_data.name = job.name;
    job_data.location = job.location;
    job_data.remote = job.remote;
    job_data.contract_detail = job.contract_detail;
    job_data.headcount = job.headcount;
    job_data.min_salary = job.min_salary;
    job_data.max_salary = job.max_salary;
    job_data.currency = job.currency;
    job_data.package_detail = job.package_detail;
    job_data.payment_frequency = job.payment_frequency;
    job_data.desc = job.desc;
    creator_data = await axios.get(config.API_BASE_URL + "users/" + job.creator_id);
    creator_data = await creator_data.data.data;
    job_data.creator = creator_data.fullName;
}
const desc = ref('');
onMounted(() => {
    getter();
});

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
  
  