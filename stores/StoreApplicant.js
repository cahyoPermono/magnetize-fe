import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("applicant_store", () => {
    //PERSONAL APPLICANT DATA
    const user = useCookie("user");

    let applicant = ref({
        email: user.value.email
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
    // watch(applicant.value.marital_status, (newVal, oldVal) => {

    // })

    //TECHNICALSKILL
    let technicalSkills = ref([]);

    return { applicant, technicalSkills, selectedAddress, selectedAddressDom }
});