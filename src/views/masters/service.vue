<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Services</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2">
                        <div class="ms-auto">
                            <button class="btn btn-primary" @click="service_registration =! service_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
                    <!-- service registration form starts -->
 <form v-if="service_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerService">
        <h4 class="text-center">SERVICE  REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-3">
                <label class="form-label">Service Name</label>
                <input type="text" class="form-control" placeholder="Enter Service Name" v-model="name" required>
            </div>
            <div class="col-md-9">
                <label class="form-label">Service Description</label>
                <input type="text" class="form-control" placeholder="Enter Service Description" v-model="description" step="any" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="service_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- item registration form ends-->
 
                          <!-- loading spinner starts -->
                          <div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
        <!-- Loading spinner ends -->
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">
                                <a href="javascript:void(0)" class="text-success" title="Approve">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                                </a>

                        
                                <router-link :to="'/requisition-list/' + props.row.id" class="text-primary"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link>
                                
                                <a href="javascript:void(0);" title="Delete" @click="deleteServiceType(props.row.id)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-danger"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </a>
                              


 
                                
                            </template>
                           
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    const ServiceTypes = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    const columns = ref(['id', 'name','description', 'actions']);
    const items = ref([]);
    const service_registration = ref(false);
    const description = ref('');
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

    const deleteServiceType = (id) => {
    if (confirm("Are you sure you want to delete this service type?")) {
        loading_spinner.value = true;
        axiosInstance.delete(`/service-type/${id}`)
            .then((response) => {
                getServiceTypes();
                alert(response.data.message);
                loading_spinner.value = false;
            });
    }
};

    const registerService = () => {
        service_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            description: description.value,
        };

        axiosInstance
            .post('/service-type', itemData)
            .then((response) => {
                getServiceTypes();
                loading_spinner.value = false;
                alert('Service registered successfully!');
                if (response.data.status === 201) {
                    // fetchJobCards();
                    // this.fetchJobCards();
                } else {
                    console.error("Error registering Order:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error registering Order:", error.message);
            });
    };


    onMounted(() => {
        getServiceTypes();
    });
</script>
