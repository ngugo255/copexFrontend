<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active" aria-current="page"><span>Jobcards</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2">
                         
        <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                        <div class="ms-auto">
                            <button class="btn btn-primary" @click="jobcard_registration=!jobcard_registration">                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
      <!-- jobcard registration form starts -->
    <form v-if="jobcard_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerJobcard">
        <h4  class="text-center"> JOBCARD REGISTRATION</h4>
        <div class="row mb-2">
            <div class="col-md-3">
                <label class="form-label">Vehicle / Machine</label>
                <Multiselect
  v-model="selected_machine"
  :options="Machines"
  :close-on-select="true"
  label="name"
  value-prop="id"
  placeholder="Select Machine"  
  @change="handleDescriptionChange"
  :required="!machine_field"
  :searchable="true" 
/>
            </div>
            <div class="col-md-3">
                <label class="form-label">Service Type</label>
                <select class="form-select" v-model="selected_service" required>
                    <option value="" >Select a Service Type</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
                </select>
            </div>
            <div class="col-md-2">
                <label class="form-label">Current Km of Service</label>
                <input type="number" class="form-control" placeholder="Enter Current Km" v-model="current_km_of_service" >
            </div>
            <div class="col-md-2">
                <label class="form-label">Next Km of Service</label>
                <input type="number" class="form-control" placeholder="Enter Next Km" v-model="next_km_of_service" >
            </div>
             <div class="col-md-2">
                <label class="form-label">Enter Date Created</label>
                <input type="date" class="form-control" placeholder="Enter Next Km" v-model="date_created" >
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="jobcard_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- jobcard registration form ends-->


        <div class="text-center"><h4>JOBCARD LIST </h4>
 
            <Multiselect
  v-model="machine_filter"
  :class="'form-select w-50'"
  :options="Machines"
  :close-on-select="true"
  label="name"
  value-prop="id"
  placeholder="Select Machine"  
  @select="fetchJobCards"
  :searchable="true" 
/>
       

        </div>
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
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
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }}</span>
                            </template>
                            <template #actions="props">

                        
                                <router-link :to="'/jobcard/'+ props.row.id + '/' + props.row.machine_id" class="text-primary"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link>
            
                                
                            </template>
                           
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- Toast notification starts -->

<div ref="toastTopRight" class="toast position-fixed top-0 end-0 m-2" style="z-index: 1080" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body toast-info d-flex justify-content-between">
        Example notification text.
        <a href="javascript:;" class="text-white fw-bolder ms-2" data-bs-dismiss="toast">X</a>
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
    import { onMounted, ref,inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/scrollspyNav.scss';
    const selected_machine = ref(null);
    const selected_service = ref('');
    const machine_filter = ref(null);
    const current_km_of_service = ref('');
    const next_km_of_service = ref('');
    const loading_spinner = ref(true);
    const jobcard_registration = ref(false);
    const Machines = ref([]);
    const services = ref([]);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    useMeta({ title: 'Custom Table' });

    let toastTopRight = ref(null);
    const columns = ref(['id', 'name','date_created','service_type','current_km_of_service','next_km_of_service','status','actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 50,
        perPageValues: [ 50,100,200,500,1000],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'vehicle_no','date','service_type','current_service_kms','next_service_kms','status'],
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

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    
  const fetchJobCards = () => {
    loading_spinner.value = true;
    axiosInstance
        .get('/job-card')
        .then((response) => {
            if (response.data && Array.isArray(response.data)) {
                items.value = response.data
                    .filter(jobcard => machine_filter.value == null || jobcard.machine_id == machine_filter.value.id)
                    .map(jobcard => ({
                        id: jobcard.id,
                        machine_id: jobcard.machine_id,
                        name: jobcard.machine? `${jobcard.machine.name} - ${jobcard.machine.type_name}`  : '',               
                        date_created: jobcard.date_created,    
                        service_type: jobcard.service_type,
                        status: {
                            key: jobcard.status_name,
                            class: jobcard.status_color
                        },
                        current_km_of_service: jobcard.current_km_of_service,
                        next_km_of_service: jobcard.next_km_of_service
                    }));
            } else {
                showError("Invalid response format");
            }
            loading_spinner.value = false;
        })
        .catch((error) => {
            showError(error.message);
            loading_spinner.value = false;
        });
};

    const date_created = ref('')
    const registerJobcard = () => {
        jobcard_registration.value = false;
        loading_spinner.value = true;
        const jobcardData = {
            machine_id: selected_machine.value.id,
            machine_name: "none",
            status_name: 'Active',
            status_color: 'primary',
            service_type: services.value.find(service => service.id === selected_service.value).name,
            current_km_of_service: current_km_of_service.value,
            next_km_of_service: next_km_of_service.value ,
            date_created : date_created.value
        };

        axiosInstance
            .post('/job-card', jobcardData)
            .then((response) => {
                fetchJobCards();
                showMessage('Jobcard registered successfully!');
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                console.log(error);
                // console.log('machine name',selected_machine.name);
                loading_spinner.value = false;
            });
    };

const fetchServices = () =>{
      loading_spinner.value = true;
      axiosInstance
        .get(`/service-type`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            services.value = response.data;
          } else {
            console.error("Invalid response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        })
        .finally(() => {
          loading_spinner.value = false;
        });
    }

    const fetchMachines=()=>{

    loading_spinner.value = true;
axiosInstance
  .get(`/machines`)
  .then((response) => {
    if (Array.isArray(response.data)) {
      Machines.value = response.data; 
    } else {
      console.error("Invalid response format");
    }
  })
  .catch((error) => {
    console.error("Error fetching machine data:", error.message);
  })
  .finally(() => {
    loading_spinner.value = false;
  });
}


const deleteJobcard = (jobcardId) => {
    if (confirm('Are you sure you want to delete this jobcard?')) {
        axiosInstance
            .delete(`/job-card/${jobcardId}`)
            .then((response) => {
                fetchJobCards();
                loading_spinner.value = true;
                alert('Jobcard deleted successfully!');
                if (response.data.status === 200) {
                    fetchJobCards();
                } else {
                    console.error("Error deleting jobcard:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting jobcard:", error.message);
            });
    }
};

    onMounted(() => {
        fetchJobCards();
        fetchServices();
        fetchMachines();
    });
</script>

