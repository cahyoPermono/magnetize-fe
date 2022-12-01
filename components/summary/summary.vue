<template>
    <div>
        <div class="grid">
            <div class="col">
                <Panel header="Job Detail">
                    <table border="0">
                        <tr>
                            <td>
                                Job Name
                            </td>
                            <td>
                                : {{ job_data.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Location
                            </td>
                            <td>
                                : {{ job_data.location }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Remote
                            </td>
                            <td>
                                : {{ job_data.remote }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contract Detail
                            </td>
                            <td>
                                : {{ job_data.contract_detail }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Headcount
                            </td>
                            <td>
                                : {{ job_data.headcount }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Minimum Salary
                            </td>
                            <td>
                                : {{ job_data.min_salary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Maximum Salary
                            </td>
                            <td>
                                : {{ job_data.max_salary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Currency
                            </td>
                            <td>
                                : {{ job_data.currency }}
                            </td>
                        </tr>
                    </table>
                    <!-- {{ job_data }} -->
                </Panel>
            </div>
            <div class="col">
                <Panel header="Job Desxription">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Panel>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const job_data = reactive();
const id = route.params.id;
const creator_data = ref();

onMounted(async () => {
    const job = await axios.get(config.API_BASE_URL + "jobs/" + id);
    job_data = await job.data.data;
    const creator = await axios.get(config.API_BASE_URL + "users/" + job_data.creator_id);
    creator_data.value = creator.data.data;
});
</script>
  
  