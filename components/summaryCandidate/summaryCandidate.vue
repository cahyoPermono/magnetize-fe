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
          <div>
            <p>{{ candidate_data.status }}</p>
            <div v-if="candidate_data.status_id === 5">
              <div v-if="!candidate.interviewer_name">
                <button class="btn btn-sm btn-secondary" @click="openModalJadwal()">
                  Jadwalkan Interview
                </button>
              </div>
              <div v-else class="d-flex justify-content-between">
                <button class="btn btn-sm btn-danger mr-2" @click="openModalUlangInterview()">
                  Interview Ulang
                </button>
                <br />
                <button
                  class="btn btn-sm btn-secondary w-50"
                  @click="openModal('Apakah kandidat ini lanjut ke tahapan selanjutnya ?')"
                >
                  Selesai Interview
                </button>
              </div>
            </div>
            <div v-if="candidate_data.status_id === 6">
              <div v-if="!candidate.interviewer_name">
                <button class="btn btn-sm btn-secondary" @click="openModalTes()">
                  Jadwalkan Tes
                </button>
              </div>
              <div v-else class="d-flex justify-content-between">
                <button
                  class="btn btn-sm btn-secondary w-50"
                  @click="openModal('Apakah kandidat ini lanjut ke tahapan selanjutnya ?')"
                >
                  Selesai Tes
                </button>
              </div>
            </div>
            <div v-if="candidate_data.status_id === 3">
              <button
                class="btn btn-sm btn-secondary"
                @click="openModal('Apakah kandidat ini lanjut ke tahapan selanjutnya ?')"
                v-if="candidate.interviewer_name"
              >
                Selesai Interview
              </button>
              <button class="btn btn-sm btn-secondary" @click="openModalJadwal()" v-else>
                Jadwalkan Interview
              </button>
            </div>
            <div v-if="candidate_data.status_id === 7">
              <div class="flex justify-content-between" v-if="candidate.interviewer_name">
                <button
                  class="btn btn-sm btn-success"
                  @click="openModal('Apakah kandidat ini diterima ?')"
                >
                  Diterima
                </button>
              </div>
              <button class="btn btn-sm btn-secondary" @click="openModalJadwal()" v-else>
                Jadwalkan Interview
              </button>
            </div>
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
      v-model:visible="displayModalLanjutan"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <p><strong>Apakah Pelamar ini diterima?</strong></p>
      <template #footer>
        <Button label="Tidak" icon="pi pi-times" class="p-button-danger" @click="tidakDiterima" />
        <Button
          label="Ya"
          icon="pi pi-check"
          class="p-button-success"
          @click="diterima(candidate_data.status_id)"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="displayModalInterviewUlang"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <p><strong>Ulang interview ini?</strong></p>
      <template #footer>
        <Button
          label="cancel"
          icon="pi pi-times"
          class="p-button-danger"
          @click="openModalUlangInterview"
        />
        <Button
          label="Ya"
          icon="pi pi-check"
          class="p-button-success"
          @click="ulangInterview(candidate_data.status_id)"
        />
      </template>
    </Dialog>
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
        <div class="col font-bold">{{ displayModalText }}</div>
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
    <Dialog
      v-model:visible="displayModalJadwal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
    >
      <template #header>
        <h4><strong>Jadwal Interview</strong></h4>
      </template>
      <div class="pt-3">
        <Form @submit="buatJadwal">
          <div class="grid">
            <div class="col">
              <label for="tanggal">Tanggal Interview</label>
              <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="tanggal">
                <InputText
                  v-bind="field"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                  type="date"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="grid mt-2">
            <div class="col">
              <label for="interviewer">Interviewer</label>
              <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="interviewer">
                <InputText
                  v-bind="field"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="flex justify-content-end mt-4">
            <Button
              label="No"
              icon="pi pi-times"
              @click="openModalJadwal()"
              class="p-button-text"
            />
            <Button label="Yes" icon="pi pi-check" class="p-button-info" type="submit" />
          </div>
        </Form>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="displayModalTes"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
    >
      <template #header>
        <h4><strong>Jadwal Tes</strong></h4>
      </template>
      <div class="pt-3">
        <Form @submit="buatJadwalTes">
          <div class="grid">
            <div class="col">
              <label for="tanggal">Tanggal Tes</label>
              <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="tanggal">
                <InputText
                  v-bind="field"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                  type="date"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="grid mt-2">
            <div class="col">
              <label for="oleh">Oleh</label>
              <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="oleh">
                <InputText
                  v-bind="field"
                  :class="{ 'p-invalid': errorMessage }"
                  class="block w-full"
                />
                <small id="email-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="flex justify-content-end mt-4">
            <Button label="No" icon="pi pi-times" @click="openModalTes()" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" class="p-button-info" type="submit" />
          </div>
        </Form>
      </div>
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

let displayModalText = ref("Apakah kandidat ini lanjut ke tahapan selanjutnya ?");
let candidate_data = reactive({});

let skills = reactive([]);
let skillname = reactive([]);
let otherskills = reactive([]);
let otherskillsname = reactive([]);
const displayModal = ref(false);
const displayModalJadwal = ref(false);
const displayModalLanjutan = ref(false);
const displayModalTes = ref(false);
const displayModalInterviewUlang = ref(false);
const id = route.params.id;

const openModal = (text) => {
  displayModal.value = !displayModal.value;
  displayModalText.value = text;
};

const openModalTes = () => {
  displayModalTes.value = !displayModalTes.value;
};

const openModalUlangInterview = () => {
  displayModalInterviewUlang.value = !displayModalInterviewUlang.value;
};

const openModalLanjutan = () => {
  displayModalLanjutan.value = !displayModalLanjutan.value;
};

const openModalJadwal = () => {
  displayModalJadwal.value = !displayModalJadwal.value;
};

const processInterview = async (body) => {
  await axios.put(config.API_BASE_URL + "applicants/update_status/" + id, {
    applicant: body,
  });
  await getter();
};

const ulangInterview = async () => {
  await processInterview({ interviewer_name: "", interview_date: null });
  openModalUlangInterview();
};

const diterima = async (candidateStatus) => {
  let candidateStatusNew = candidateStatus + 1;
  await processInterview({
    ApplicantStatusId: candidateStatusNew,
    interviewer_name: "",
    interview_date: "",
  });
  openModalLanjutan();
};

const doneInterview = async (candidateStatus) => {
  let candidateStatusNew = candidateStatus + 1;
  await processInterview({
    ApplicantStatusId: candidateStatusNew,
    interviewer_name: "",
    interview_date: null,
  });
  displayModal.value = false;
};

const buatJadwal = async (val) => {
  await processInterview({ interviewer_name: val.interviewer, interview_date: val.tanggal });
  openModalJadwal();
};

const buatJadwalTes = async (val) => {
  await processInterview({ interviewer_name: val.oleh, interview_date: val.tanggal });
  openModalTes();
};

let candidate = ref({});

const getter = async () => {
  candidate.value = await axios.get(config.API_BASE_URL + "applicants/" + id);
  candidate.value = await candidate.value.data.data;
  candidate_data["name"] = candidate.value.name;
  candidate_data["gender"] = candidate.value.gender;
  candidate_data["place_of_birth"] = candidate.value.place_of_birth;
  candidate_data["date"] = candidate.value.date;
  candidate_data["address"] = candidate.value.address;
  candidate_data["domicile"] = candidate.value.domicile;
  candidate_data["email"] = candidate.value.email;
  candidate_data["mobile"] = candidate.value.mobile;
  candidate_data["office_parent_phone"] = candidate.value.office_parent_phone;
  candidate_data["diploma"] =
    candidate.value.formaleducations.length < 1 ? "-" : candidate.value.formaleducations[0].major;
  candidate_data["university"] =
    candidate.value.formaleducations.length < 1
      ? "-"
      : candidate.value.formaleducations[0].name_location;
  candidate_data["current_company"] =
    candidate.value.employmenthistories.length < 1
      ? "-"
      : candidate.value.employmenthistories[0].name_company;
  candidate_data["current_position"] =
    candidate.value.employmenthistories.length < 1
      ? "-"
      : candidate.value.employmenthistories[0].position;
  candidate_data["current_sallary"] =
    candidate.value.employmenthistories.length < 1
      ? "-"
      : candidate.value.employmenthistories[0].take_home_pay;
  candidate_data["graduation"] =
    candidate.value.formaleducations.length < 1
      ? "-"
      : candidate.value.formaleducations[0].graduate;
  candidate_data["expected_salary"] = candidate.value.otherinformation.salary_expect;
  candidate_data["candidate_reference_name"] = candidate.value.relatives_in_ip || "-";
  candidate_data["notice_period"] = candidate.value.otherinformation.able_to_start;
  candidate_data["status"] = candidate.value.applicantstatus.status;
  candidate_data["status_id"] = candidate.value.applicantstatus.id;
};

const getSkill = async () => {
  skills = await axios.get(config.API_BASE_URL + "applicantskills/" + id);
  skills = await skills.data.data;
  skills.forEach((element) => {
    skillname.push({ skill: element.subskill.subskill, nilai: element.nilai });
  });
};

const getOtherSkill = async () => {
  otherskills = await axios.get(config.API_BASE_URL + "computerliterates/" + id);
  otherskills = await otherskills.data.data;
  otherskills.forEach((element) => {
    otherskillsname.push({ skill: element.skill, level: element.level });
  });
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

onMounted(async () => {
  await getter();
  await getSkill();
  await getOtherSkill();
});
</script>
