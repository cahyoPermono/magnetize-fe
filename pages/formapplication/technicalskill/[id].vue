<template>
  <div class="card">
    <Form @submit="save">
    <div class="card-header">
      <h5>Technical Skill</h5>
    </div>
    <div class="card-body">
      <Message>
        <h6>Masukkan penilaian Anda tentang penguasaan Anda terhadap beberapa library/tools/framework berikut.
        <br/>(Skala 0-10, 0: tidak menguasai / hanya pernah mendengar, 10: sangat ahli)</h6>
      </Message>
      <div v-for="(skill, index) in arrskill" :key="index">
        <h6>{{ skill.nameskill }}</h6> 
        <DataTable :value="skill.subname">
          <Column headerStyle="width: 20em" field="subskill" header="Nama Skill" />
          <Column header="Nilai">
            <template #body="slotProps">
              <input type="text" v-model="slotProps.data.nilai" class="form-control" />
            </template>
          </Column>
          <Column header="Keterangan">
            <template #body="slotProps">
              <input type="text" v-model="slotProps.data.keterangan" class="form-control" />
            </template>
          </Column>
        </DataTable>
        <br />
      </div>
      <div>
        <p>Skill Lainnya</p>
        <Message>
          <h6>Jika ada technical skill Anda yang belum terdaftar di atas dan layak untuk disampaikan, 
            silakan dimasukkan di bawah ini.</h6>
        </Message>
        <Button
            @click="addOther"
            icon="pi pi-plus"
            class="p-button-warning"
            v-tooltip.right="'Klik untuk menambahkan'" />
          <DataTable :value="otherskills">
            <Column headerStyle="width: 20em" header="Nama Skill">
              <template #body="slotProps">
                <input type="text" v-model="slotProps.data.nameother" class="form-control" />
              </template>
            </Column>
            <Column header="Nilai">
              <template #body="slotProps">
                <input type="text" v-model="slotProps.data.nilaiother" class="form-control" />
              </template>
            </Column>
            <Column header="Keterangan">
              <template #body="slotProps">
                <input type="text" v-model="slotProps.data.keteranganother" class="form-control" />
              </template>
            </Column>
          </DataTable>
      </div>
    </div>
    <div class="card-footer">
      <Button type="submit" label="Save" />
    </div>
  </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const applicants = ref(null);
const jobs = ref(null);
const skills = ref(null);
const arrskill = reactive([]);

const otherskills = reactive([
  {
    nameother: "",
    nilaiother: "",
    keteranganother: "",
  },
]);
function addOther() {
  otherskills.push({
    nameother: "",
    nilaiother: "",
    keteranganother: "",
  });
}

onMounted(() => {
  getApplicant();
  getJob();

  
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

async function getJob(){
  try {
    await axios.get("http://localhost:3000/api/1.0/jobs").then((response) => {
    response.data.data.forEach((element) => {
      if (element.name === applicants.value[0].position) {
        jobs.value = element;
      }
    });
    axios
      .get("http://localhost:3000/api/1.0/skills/" + jobs.value.id)
      
      .then((response) => {
        console.log(jobs.value.id)
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
  } catch (err) {
    console.log(err)
  }
}
async function save() {
  try {
    await arrskill.forEach((element) => {
      element.subname.forEach(el => {
        axios
        .post("http://localhost:3000/api/1.0/applicantskills", {
          applicantId: route.params.id,
          subskillId: el.id,
          nilai: el.nilai,
          keterangan: el.keterangan,
        })
      });
    })
    await otherskills.forEach(elother => {
      axios
        .post("http://localhost:3000/api/1.0/otherapplicantskills", {
          applicantId: route.params.id,
          nama: elother.nameother,
          nilai: elother.nilaiother,
          keterangan: elother.keteranganother,
        })
    });
    alert("Suksess Save Data")
      router.push({ path: "/" });
  } catch (err) {
    console.log(err);
  }
}
</script>