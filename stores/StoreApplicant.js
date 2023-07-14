import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("applicant_store", () => {
    //PERSONAL APPLICANT DATA
    const USER = useCookie("user");

    let applicant = ref({
        email: USER.value.email
    });

    let selectedAddress = ref({
        province: {}, city: {}, district: {}, subdistrict: {}
    });
    let selectedAddressDom = ref({
        province: {}, city: {}, district: {}, subdistrict: {}
    });

    watchEffect(() => {
        applicant.value.province = selectedAddress.value.province.nama;
        applicant.value.city = selectedAddress.value.city.nama;
        applicant.value.district = selectedAddress.value.district.nama;
        applicant.value.subdistrict = selectedAddress.value.subdistrict.nama;

        applicant.value.province_dom = selectedAddressDom.value.province.nama;
        applicant.value.city_dom = selectedAddressDom.value.city.nama;
        applicant.value.district_dom = selectedAddressDom.value.district.nama;
        applicant.value.subdistrict_dom = selectedAddressDom.value.subdistrict.nama;
        if (applicant.value.marital_status !== 'menikah') {
            applicant.value.year_marriage = ''
        }
    });

    //FORMALEDUCATE
    let formalEducate = ref({});
    const formalEducatePool = [];

    //NONFORMALEDUCATE
    let computer = ref({});
    const computerPool = [];

    //COMPUTERLITERATE
    let nonFormalEducate = ref({});
    const nonFormalEducatePool = [];

    //TECHNICALSKILL
    let technicalSkills = ref([]);
    let otherTechnicalSkills = ref([]);

    return { applicant, selectedAddress, selectedAddressDom, formalEducate, formalEducatePool, nonFormalEducate, nonFormalEducatePool, computer, computerPool, technicalSkills, otherTechnicalSkills, }
});