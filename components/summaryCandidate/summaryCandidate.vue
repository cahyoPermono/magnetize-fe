<template>
    <div>
        <div class="grid">
            <div class="col">
                <Panel style="width: 550px;">
                    <template #header>
                        <b>Candidate Details &nbsp;<span></span></b>
                    </template>
                    <table border="0">
                        <tr>
                            <td>
                                Candidate Name
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gender
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.gender }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Major
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.diploma }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                University
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.university }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Current Company
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.current_company }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Current Position
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.current_position }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Candidate Location
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.domicile }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Birthdate
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.place_of_birth }},{{ reverseDate(candidate_data.date) }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Candidate Address
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.address }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Candidate Email
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.email }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Candidate Phone Number
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.mobile }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Skype
                            </td>
                            <td>
                                &nbsp;: -
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Another Contact
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.office_parent_phone }}
                            </td>
                        </tr>
                    </table>
                </Panel>
                <Panel class="mt-4">
                    <template #header>
                        <b>Employee Details &nbsp;<span></span></b>
                    </template>
                    <p>{{ candidate_data.status }}</p>
                </Panel>
            </div>
            <div class="col">
                <Panel>
                    <template #header>
                        <b>Skill &nbsp;<span></span></b>
                    </template>
                    <div class="row">
                    <div class="col-sm">
                        <p v-for="(skill, index) in skillname" :key="index">{{ skill }}</p>
                    </div>
                    <div class="col-sm">
                        <p v-for="(other, index) in otherskills" :key="index">{{ other.nama }}</p>
                    </div>
                </div>
                </Panel>
                <Panel class="mt-4">
                    <template #header>
                        <b>Additional Information &nbsp;<span></span></b>
                    </template>
                    <table border="0">
                        <tr>
                            <td>
                                Experience in Telecomunication
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.experience_tellecomunication }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Experience in IT
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.experience_it }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Graduation Date
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.graduation }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Current Salary
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.current_sallary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Notice Period
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.notice_period }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Expected Salary
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.expected_salary }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Candidate Reference Name
                            </td>
                            <td>
                                &nbsp;: {{ candidate_data.candidate_reference_name }}
                            </td>
                        </tr>
                    </table>
                </Panel>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";
import dateFormat from "dateformat";

const config = useRuntimeConfig();
const route = useRoute();

const reverseDate = (date) => {
    if (date === '') {
    return '-';
  }
  return dateFormat(date, "dd-mm-yyyy");
};

const candidate_data = reactive({
    name: null,
    gender: null,
    place_of_birth: null,
    date: null,
    diploma: null,
    university: null,
    current_company: null,
    current_position: null,
    mobile: null,
    office_parent_phone: null,
    email: null,
    experience_tellecomunication: null,
    experience_it: null,
    graduation: null,
    current_sallary: null,
    notice_period: null,
    expected_salary: null,
    candidate_reference_name: null,
    status: null,
});

let skills = reactive([]);
let skillname = reactive([]);
let otherskills = reactive([]);

const id = route.params.id;
let candidate = reactive();

const getter = async () => {
    candidate = await axios.get(config.API_BASE_URL + "applicants/" + id);
    candidate = await candidate.data.data;
    candidate_data.name = candidate.name;
    candidate_data.gender = candidate.gender;
    candidate_data.place_of_birth = candidate.place_of_birth;
    candidate_data.date = candidate.date;
    candidate_data.address = candidate.address;
    candidate_data.domicile = candidate.domicile;
    candidate_data.email = candidate.email;
    candidate_data.mobile = candidate.mobile;
    candidate_data.office_parent_phone = candidate.office_parent_phone;
    candidate_data.diploma = candidate.formaleducations.length < 1 ?  '-' : candidate.formaleducations[0].major;
    candidate_data.university = candidate.formaleducations.length < 1 ?  '-' : candidate.formaleducations[0].name_location;
    candidate_data.current_company = candidate.employmenthistories.length < 1 ?  '-' : candidate.employmenthistories[0].name_company;
    candidate_data.current_position = candidate.employmenthistories.length < 1 ?  '-' : candidate.employmenthistories[0].position;  
    candidate_data.current_sallary = candidate.employmenthistories.length < 1 ?  '-' : candidate.employmenthistories[0].take_home_pay;  
    candidate_data.experience_telecomunication = candidate.otherinformation.experience_telecomunication || '-';
    candidate_data.experience_it = candidate.otherinformation.experience_it;
    candidate_data.graduation = candidate.formaleducations.length < 1 ?  '-' : candidate.formaleducations[0].graduate;
    candidate_data.expected_salary = candidate.otherinformation.salary_expect;
    candidate_data.candidate_reference_name = candidate.relatives_in_ip || '-';
    candidate_data.notice_period = candidate.otherinformation.able_to_start;
    candidate_data.status = candidate.status;
}

const getSkill = async () => {
    skills = await axios.get(config.API_BASE_URL + "applicantskills/" + id);
    skills = await skills.data.data;
    skills.forEach(element => {
        skillname.push(element.subskill.subskill)
    });
}

const getOtherSkill = async () => {
    otherskills = await axios.get(config.API_BASE_URL + "otherapplicantskills/" + id);
    otherskills = await otherskills.data.data;
}

onMounted(() => {
    getter();
    getSkill();
    getOtherSkill()
});
</script>
  
  