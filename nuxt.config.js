import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    server: {
        port: 3003, // default: 3000
        host: '192.168.1.81', // default: localhost,
    },
    css: [
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
    ],
    build: {
        transpile: ['primevue']
    },
    app: {
        head: {
            title: 'Magnetize',
            link: [
                { rel: 'icon', type: 'image/png', href: '/_nuxt/assets/favicon.png' }
            ],
        }
    },
    publicRuntimeConfig: {
        API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE
    },


})