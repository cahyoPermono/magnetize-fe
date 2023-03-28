import { defineStore } from "pinia";

export const useStore = defineStore("applicant_auth", () => {
    const router = useRouter();
    const token = useCookie("token");
    const user = useCookie("user");

    const auth = async () => {
        if (!token.value) {
            return navigateTo('/formapplication/login');
        }
    };

    const logout = async () => {
        token.value = null;
        user.value = null;
        router.push("/formapplication/login");
    };

    const document = [
        {
            type:'cv/resume',
            file:'',
            filename:'',
        },
        {
            type:'ktp',
            file:'',
            filename:'',
        },
        {
            type:'npwp',
            file:'',
            filename:'',
        },
        {
            type:'ijazah',
            file:'',
            filename:'',
        },
        {
            type:'sertifikat',
            file:'',
            filename:'',
        },
    ];

    return { auth, logout, token, user, document }
});