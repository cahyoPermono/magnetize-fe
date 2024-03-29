import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    server: {
        port: 3003, // default: 3000
        host: 'localhost', // default: localhost,
    },
    modules: [
        '@pinia/nuxt',
    ],
    css: [
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/base.css',
        'animate.css',
    ],
    build: {
        transpile: ['primevue', '@vee-validate/rules']
    },
    app: {
        head: {
            title: 'Magnetize',
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,700,1,-25' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
            ],
        }
    },
    publicRuntimeConfig: {
        API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE
    },

})