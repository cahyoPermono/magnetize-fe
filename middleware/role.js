export default function() {
    const role = useCookie('role')
    if(role.value !== '1') {
        return navigateTo('/dashboard')
    }
}