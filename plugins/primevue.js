import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Message from 'primevue/message';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Steps from 'primevue/steps';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Tooltip from 'primevue/tooltip';
import Avatar from 'primevue/avatar';
import InputNumber from 'primevue/inputnumber';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.component('Message', Message);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('RadioButton', RadioButton);
    nuxtApp.vueApp.component('Steps', Steps);
    nuxtApp.vueApp.component('FileUpload', FileUpload);
    nuxtApp.vueApp.component('Dropdown', Dropdown);
    nuxtApp.vueApp.directive('Tooltip', Tooltip);
    nuxtApp.vueApp.component('Avatar', Avatar);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
    nuxtApp.vueApp.component('Divider', Divider);
    nuxtApp.vueApp.component('DataTable', DataTable);
    nuxtApp.vueApp.component('Column', Column);
   //other components that you need
});