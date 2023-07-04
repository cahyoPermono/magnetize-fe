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
            type:'CV/RESUME',
            file:'',
            filename:'',
            isRequired:true,
        },
        {
            type:'E-KTP',
            file:'',
            filename:'',
            isRequired:true,
        },
        {
            type:'NPWP',
            file:'',
            filename:'',
            isRequired:false,
        }
    ];

    return { auth, logout, token, user, document }
});