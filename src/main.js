import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const app = createApp(App);

// multiselect
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

// bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

// modals
import '@/assets/sass/components/custom-modal.scss';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();

//Sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;



// vue input mask
import Maska from 'maska';

// smooth scroll
import { registerScrollSpy } from 'vue3-scroll-spy/dist/index';
registerScrollSpy(app, { offset: 118 });


// datatables
import { ClientTable } from 'v-tables-3';

// json to excel
import vue3JsonExcel from 'vue3-json-excel';

//vue-wizard
import VueFormWizard from 'vue3-form-wizard';
import 'vue3-form-wizard/dist/style.css';



// set default settings
import appSetting from './app-setting';
window.$appSetting = appSetting;
window.$appSetting.init();
app.component('Multiselect', Multiselect)
app.use(store).use(router).use(PerfectScrollbar).use(Maska).use(ClientTable).use(vue3JsonExcel).use(VueFormWizard).use(head).mount('#app');
