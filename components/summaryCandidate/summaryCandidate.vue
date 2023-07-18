<template>
  <div>
    <div class="grid">
      <div class="col">
        <Panel style="width: 550px">
          <template #header>
            <b>Candidate Details &nbsp;<span></span></b>
          </template>
          <table border="0">
            <tr>
              <td>Candidate Name</td>
              <td>&nbsp;: {{ candidate_data.name }}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>&nbsp;: {{ candidate_data.gender }}</td>
            </tr>
            <tr>
              <td>Major</td>
              <td>&nbsp;: {{ candidate_data.diploma }}</td>
            </tr>
            <tr>
              <td>University</td>
              <td>&nbsp;: {{ candidate_data.university }}</td>
            </tr>
            <tr>
              <td>Current Company</td>
              <td>&nbsp;: {{ candidate_data.current_company }}</td>
            </tr>
            <tr>
              <td>Current Position</td>
              <td>&nbsp;: {{ candidate_data.current_position }}</td>
            </tr>
            <tr>
              <td>Candidate Location</td>
              <td>&nbsp;: {{ candidate_data.domicile }}</td>
            </tr>
            <tr>
              <td>Birthdate</td>
              <td>
                &nbsp;: {{ candidate_data.place_of_birth }},{{ reverseDate(candidate_data.date) }}
              </td>
            </tr>
            <tr>
              <td>Candidate Address</td>
              <td>&nbsp;: {{ candidate_data.address }}</td>
            </tr>
            <tr>
              <td>Candidate Email</td>
              <td>&nbsp;: {{ candidate_data.email }}</td>
            </tr>
            <tr>
              <td>Candidate Phone Number</td>
              <td>&nbsp;: {{ candidate_data.mobile }}</td>
            </tr>
            <tr>
              <td>Another Contact</td>
              <td>&nbsp;: {{ candidate_data.office_parent_phone }}</td>
            </tr>
          </table>
        </Panel>

        <Panel class="mt-4">
          <template #header>
            <b>Skill &nbsp;<span></span></b>
          </template>
          <div class="grid">
            <div class="col">
              <DataTable :value="skillname">
                <Column field="skill" header="Skill"></Column>
                <Column field="nilai" header="Nilai"></Column>
              </DataTable>
            </div>
            <div class="col">
              <DataTable :value="otherskillsname">
                <Column field="skill" header="Skill"></Column>
                <Column field="level" header="Level"></Column>
              </DataTable>
            </div>
          </div>
        </Panel>
      </div>
      <div class="col">
        <Panel>
          <template #header>
            <b>Status &nbsp;<span></span></b>
          </template>
          <div class="d-flex justify-content-between">
            <p>{{ candidate_data.status }}</p>
            <span
              v-if="
                candidate_data.status_id === 3 ||
                candidate_data.status_id === 5 ||
                candidate_data.status_id === 6
              "
            >
              <button class="btn btn-sm btn-secondary" @click="openModal()">
                Selesai Interview
              </button>
            </span>
          </div>
        </Panel>
        <Panel class="mt-4">
          <template #header>
            <b>Additional Information &nbsp;<span></span></b>
          </template>
          <table border="0">
            <tr>
              <td>Graduation Date</td>
              <td>&nbsp;: {{ candidate_data.graduation }}</td>
            </tr>
            <tr>
              <td>Current Salary</td>
              <td>&nbsp;: {{ candidate_data.current_sallary }}</td>
            </tr>
            <tr>
              <td>Notice Period</td>
              <td>&nbsp;: {{ candidate_data.notice_period }}</td>
            </tr>
            <tr>
              <td>Expected Salary</td>
              <td>&nbsp;: {{ candidate_data.expected_salary }}</td>
            </tr>
            <tr>
              <td>Candidate Reference Name</td>
              <td>&nbsp;: {{ candidate_data.candidate_reference_name }}</td>
            </tr>
          </table>
        </Panel>
      </div>
    </div>
    <Dialog
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <template #header>
        <h4><strong>Confirmation</strong></h4>
      </template>
      <div class="grid pt-3">
        <div class="col-1 col-offset-1">
          <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
        </div>
        <div class="col font-bold">Apakah kandidat ini lanjut ke tahapan selanjutnya ?</div>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="openModal()" class="p-button-text" />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click="doneInterview(candidate_data.status_id)"
          class="p-button-danger"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";

const config = useRuntimeConfig();
const route = useRoute();

const reverseDate = (date) => {
  if (date === "") {
    return "-";
  }
  return dateFormat(date, "dd-mm-yyyy");
};

let candidate_data = reactive({});

let skills = reactive([]);
let skillname = reactive([]);
let otherskills = reactive([]);
let otherskillsname = reactive([]);
const displayModal = ref(false);
const openModal = () => {
  displayModal.value = !displayModal.value;
};

const id = route.params.id;
let candidate = reactive({});

const doneInterview = async (candidateStatus) => {
  let candidateStatusNew = candidateStatus + 1;

  await axios.put(config.API_BASE_URL + "applicants/update_status/" + id, {
    applicant: { ApplicantStatusId: candidateStatusNew },
  });

  await getter();
  displayModal.value = false;
};

const getter = async () => {
  candidate = await axios.get(config.API_BASE_URL + "applicants/" + id);
  candidate = await candidate.data.data;
  candidate_data["name"] = candidate.name;
  candidate_data["gender"] = candidate.gender;
  candidate_data["place_of_birth"] = candidate.place_of_birth;
  candidate_data["date"] = candidate.date;
  candidate_data["address"] = candidate.address;
  candidate_data["domicile"] = candidate.domicile;
  candidate_data["email"] = candidate.email;
  candidate_data["mobile"] = candidate.mobile;
  candidate_data["office_parent_phone"] = candidate.office_parent_phone;
  candidate_data["diploma"] =
    candidate.formaleducations.length < 1 ? "-" : candidate.formaleducations[0].major;
  candidate_data["university"] =
    candidate.formaleducations.length < 1 ? "-" : candidate.formaleducations[0].name_location;
  candidate_data["current_company"] =
    candidate.employmenthistories.length < 1 ? "-" : candidate.employmenthistories[0].name_company;
  candidate_data["current_position"] =
    candidate.employmenthistories.length < 1 ? "-" : candidate.employmenthistories[0].position;
  candidate_data["current_sallary"] =
    candidate.employmenthistories.length < 1 ? "-" : candidate.employmenthistories[0].take_home_pay;
  candidate_data["graduation"] =
    candidate.formaleducations.length < 1 ? "-" : candidate.formaleducations[0].graduate;
  candidate_data["expected_salary"] = candidate.otherinformation.salary_expect;
  candidate_data["candidate_reference_name"] = candidate.relatives_in_ip || "-";
  candidate_data["notice_period"] = candidate.otherinformation.able_to_start;
  candidate_data["status"] = candidate.applicantstatus.status;
  candidate_data["status_id"] = candidate.applicantstatus.id;
};

const getSkill = async () => {
  skills = await axios.get(config.API_BASE_URL + "applicantskills/" + id);
  skills = await skills.data.data;
  skills.forEach((element) => {
    skillname.push({ skill: element.subskill.subskill, nilai: element.nilai });
  });
  console.log(skills)
};

const getOtherSkill = async () => {
  otherskills = await axios.get(config.API_BASE_URL + "computerliterates/" + id);
  otherskills = await otherskills.data.data;
  otherskills.forEach((element) => {
    otherskillsname.push({ skill: element.skill, level: element.level });
  });
  console.log(otherskillsname)
};

onMounted(async () => {
  await getter();
  await getSkill();
  await getOtherSkill();
});
</script>
