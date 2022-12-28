import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import dateFormat from "dateformat";

export const useCandidate = defineStore("candidate_store", () => {
    const config = useRuntimeConfig();
    const in_pipeline = ref([]);
    const candidates = ref([]);
    
    const reloadCandidates = () =>{
        in_pipeline.value = [];
        candidates.value = [];
    };

    function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    const getCandidates = async (id) => {
        let data_applicants = null;
        const getApplicants = await axios.get(config.API_BASE_URL + "allapplicants/" + id);
        data_applicants = await getApplicants.data.data;
        // console.log(data_applicants);
        await data_applicants.forEach(element => {
            if (element.isCandidate === false) {
                candidates.value.push(element)
            } else {
                in_pipeline.value.push(element)
            }
        });
    };
    const reverseDate = (date) => {
        return dateFormat(date, "dddd, dS mmmm, yyyy");
    };
    const reverseDate_noday = (date) => {
        return dateFormat(date, "dS-mmmm-yyyy");
    };
    return { in_pipeline, candidates, getCandidates, reverseDate, reverseDate_noday, getAge, reloadCandidates };
});