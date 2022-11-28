export default function() {
    const token = useCookie('token')
    if(token.value) {
        return navigateTo('/dashboard')
    }
}