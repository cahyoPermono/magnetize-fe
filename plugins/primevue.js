import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Message from "primevue/message";
import Card from "primevue/card";
import RadioButton from "primevue/radiobutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Row from "primevue/row";
import ColumnGroup from "primevue/columngroup";
import Paginator from "primevue/paginator";
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Panel from "primevue/panel";
import FileUpload from "primevue/fileupload";
import Textarea from "primevue/textarea";
import Avatar from "primevue/avatar";
import Sidebar from "primevue/sidebar";
import Dropdown from "primevue/dropdown";
import Divider from "primevue/divider";
import InputNumber from "primevue/inputnumber";
import Tooltip from "primevue/tooltip";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Breadcrumb from "primevue/breadcrumb";
import Tree from "primevue/tree";
import InputSwitch from "primevue/inputswitch";
import PanelMenu from "primevue/panelmenu";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Badge from "primevue/badge";
import Checkbox from "primevue/checkbox";
import SplitButton from "primevue/splitbutton";
import Slider from 'primevue/slider';
import Menu from 'primevue/menu';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Row", Row);
  nuxtApp.vueApp.component("ColumnGroup", ColumnGroup);
  nuxtApp.vueApp.component("Paginator", Paginator);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("Sidebar", Sidebar);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Divider", Divider);
  nuxtApp.vueApp.directive("Tooltip", Tooltip);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("ConfirmDialog", ConfirmDialog);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("Tree", Tree);
  nuxtApp.vueApp.component("Panel", Panel);
  nuxtApp.vueApp.component("PanelMenu", PanelMenu);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("Badge", Badge);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("SplitButton", SplitButton);
  nuxtApp.vueApp.component("Slider", Slider);
  nuxtApp.vueApp.component("Menu", Menu);

  //other components that you need
});
