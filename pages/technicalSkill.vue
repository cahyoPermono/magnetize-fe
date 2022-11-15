<template>
  <div class="card">
    <div class="card-title">
      Table
    </div>
    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <th>Skill</th>
          <th>Nilai</th>
          <th>Keterangan</th>
        </thead>
        <tbody v-for="(subskill, index) in subskills" :key="index">
          <td>{{subskill.skill.skill}} - {{subskill.subskill}}</td>
          <td><input type="text" name="subskillId" v-model="applicant.subskillId" /></td>
          <td></td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue';
import axios from 'axios'

const applicantskill = reactive({
  subskillId : '',
  nilai: '',
  keterangan: '',
});

const skills = ref(null);
const subskills = ref(null);

onMounted(() => {
  getSubSkill();
});

// function getSkill() {
//   try {
//     axios.get("http://localhost:3000/api/1.0/skills").then((response) => {
//       skills.value = response.data.data;
//     });
    
//   } catch (err) {
//     console.log(err);
//   }
// }
function getSubSkill() {
  try {
    axios.get("http://localhost:3000/api/1.0/subskills").then((response) => {
      subskills.value = response.data.data;
    });
    console.log(subskills)
  } catch (err) {
    console.log(err);
  }
}

</script>