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

    return { auth, logout, token, user }
});