export default function() {
    const role = useCookie('user')
    if(role.value !== 1) {
        return navigateTo('/dashboard')
    }
}