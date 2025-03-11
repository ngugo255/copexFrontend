<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">JobCards</a></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <!-- tabs starts -->
            <div class="panel-body border-tab tabs">
    <ul class="nav nav-tabs mt-3" id="border-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="border-home-tab" data-bs-toggle="tab" href="#border-home" role="tab" aria-controls="border-home" aria-selected="true"
                >
                Defect
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="border-contact-tab" data-bs-toggle="tab" href="#border-contact" role="tab" aria-controls="border-contact" aria-selected="false"
                >
                Work Carried Out
            </a>
        </li>
    </ul>
    <div class="tab-content mb-4" id="border-tabsContent">
        <div class="tab-pane fade show active" id="border-home" role="tabpanel" aria-labelledby="border-home-tab">
           <div class="d-flex mt-2">
            <div class="ms-auto"><button type="button" class="btn btn-primary mb-2" @click="add_defect=!add_defect">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
        </div>
           </div>
<form v-if="add_defect" @submit.prevent="showToast">
    <div class="row mb-4 container">
        <div class="col-sm-12">
            <textarea class="form-control" placeholder="Add New Defect" style="height:100px"></textarea>
        </div>
        <div class="d-flex mt-2">
        <button type="submit" class=" ms-auto btn btn-primary me-5" >Submit</button>
    </div>
    </div>

</form>

            <h4 class="mb-4">We move your world!</h4>
            <p class="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p>
                
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
        <div class="tab-pane fade" id="border-contact" role="tabpanel" aria-labelledby="border-contact-tab">
            <p class="dropcap dc-outline-primary">
                <div class="d-flex mt-2">
            <div class="ms-auto"><button type="button" class="btn btn-primary mb-2"  @click="add_work=!add_work">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
        </div>
           </div>
                <form v-if="add_work" @submit.prevent="showToast">
    <div class="row mb-4 container">
        <div class="col-sm-12">
            <textarea class="form-control" placeholder="Add New Work Carried Out" style="height:100px"></textarea>
        </div>
        <div class="d-flex mt-2">
        <button type="submit" class=" ms-auto btn btn-primary me-5">Submit</button>
    </div>
    </div>

</form>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    </div>
</div>
             <!-- tabs ends -->

       </div>

    
 

  <!-- Toast notification starts -->

<div ref="toastTopRight" class="toast position-fixed top-0 end-0 m-1 " style="z-index: 1040" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body toast-info d-flex justify-content-between">
       Saved Successfully
        <a href="javascript:;" class="text-white ms-2" data-bs-dismiss="toast">X</a>
    </div>
</div>
<!-- Toast notification ends -->
</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1",
    });

    const add_defect = ref(false);
    const add_work = ref(false);
    const ServiceTypes = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    let toastTopRight = ref(null);
    const columns = ref(['id', 'name', 'actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 5,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'service_name'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        resizableColumns: false,
    });

    const getServiceTypes = () => {
        loading_spinner.value = true;
        axiosInstance.get('/service-type').then((response) => {
            ServiceTypes.value = response.data;
            items.value = response.data; // Bind the data to items
            console.log("service Types: ",response.data);
            loading_spinner.value = false;
        });
    };

    const showToast = () => {
        if (toastTopRight.value) {
            toastTopRight.value.show();
        }
    };

    const initToast = () => {
        if (toastTopRight.value) {
            toastTopRight.value = new window.bootstrap.Toast(toastTopRight.value);
        }
    };

    onMounted(() => {
        initToast();
        getServiceTypes();
    });
</script>
