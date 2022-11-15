<template>
  <div class="p-fluid">
    
    <div class="card">  
      <Form @submit="save">
      <h5>Technical Skill</h5>
      <div v-for="(skill, index) in arrskill" :key="index">
        {{ skill.nameskill }} 
        
        <DataTable :value="skill.subname">
          <Column field="subskill" header="subskill" />
          <Column header="Nilai">
            <template #body="slotProps">
              <input
                type="text"
                v-model="slotProps.data.nilai"
                class="form-control"
              />
            </template>
          </Column>
          <Column header="Keterangan">
            <template #body="slotProps">
              <input
                type="text"
                v-model="slotProps.data.keterangan"
                class="form-control"
              />
            </template>
          </Column>
        </DataTable>
      
        <br />
      </div>
      <Button type="submit" label="Save" />
    </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();

const subskills = ref([]);
const applicants = ref(null);
const jobs = ref(null);
const skills = ref(null);
const arr = reactive([]);
const arrskill = reactive([]);

onMounted(() => {
  getApplicant();

  axios.get("http://localhost:3000/api/1.0/jobs").then((response) => {
    response.data.data.forEach((element) => {
      if (element.name === applicants.value[0].position) {
        jobs.value = element;
      }
    });
    axios
      .get("http://localhost:3000/api/1.0/skills/" + jobs.value.id)
      .then((response) => {
        skills.value = response.data.data;
        skills.value.forEach((element) => {
          arrskill.push({
            nameskill: element.skill,
            subname: element.subskills,
          });
        });
      })
      .then(() => {
        arrskill.forEach((element) => {
          element.subname.map((data) => {
            data.nilai = "";
            data.keterangan = "";
          });
        });
      });
  });
});

async function getApplicant() {
  try {
    await axios
      .get("http://localhost:3000/api/1.0/applicants")
      .then((response) => {
        applicants.value = response.data.data;
      });
  } catch (err) {
    console.log(err);
  }
}
async function save() {
  try {
    await arrskill.forEach((element) => {
      element.subname.forEach(el => {
        axios
        .post("http://localhost:3000/api/1.0/applicantskills", {
          applicantId: 1,
          subskillId: el.id,
          nilai: el.nilai,
          keterangan: el.keterangan,
        })
        
      });
    })
      alert("Success");
  } catch (err) {
    console.log(err);
  }
}
</script>
