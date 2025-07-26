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

            <div class="d-flex me-4 mt-2 ">
                        <div class="ms-auto">
                            <button class="btn btn-primary " @click="item_registration =! item_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  

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
 <!-- item registration form starts -->
 <form v-if="item_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerProject">
        <h4 class="text-center">PROJECT  REGISTRATION FORM</h4>
        <div class="row mb-2">    
            <div class="col-md-12">
                <label class="form-label">Project Name</label>
                <input type="text" class="form-control" placeholder="Enter Project Name" v-model="project_name" required>
            </div>
                </div>
        <div class="row mb-2">    
            <div class="col-md-3">
                <label class="form-label">Project Short Name</label>
                <input type="text" class="form-control" placeholder="Enter Project Short Name" v-model="short_name" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Project Contract Number</label>
                <input type="text" class="form-control" placeholder="Enter Contract Number" v-model="contract_number" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Project Cost</label>
                <input type="number" class="form-control" placeholder="Enter Project Cost" v-model="project_cost" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Financia Year</label>
                <select name="" id="" placeholder="Select Financial year fro the Project" v-model="financial_year" required class="form-control form-select" >
                    <option value="" selected disabled>Select Financial Year For The Project</option>
                    <option value="2023/2024">2023/2024</option>
                    <option value="2024/2025">2024/2025</option>
                    <option value="2025/2026">2025/2026</option>
                </select>
                
            </div>
        </div>
        <div class="row mb-2">    
            
                <div class="col-md-3">
                <label class="form-label">Client Name</label>
                <input type="text" class="form-control" placeholder="Enter Client Name" v-model="client" required>
                </div>
            <div class="col-md-3">
                <label class="form-label"> Start Date</label>
                <input type="date" class="form-control"  v-model="start_date" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">End Date Name</label>
                <input type="date" class="form-control"  v-model="end_date" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Status</label>
                <select name="" id="" v-model="status"  required class="form-control form-select" >
                    <option value="" selected disabled>Select Status Of The Project</option>
                    <option value="ACTIVE ">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                   
                </select>
                
            </div>
        </div>


        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="item_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
 </form>
             <!-- item registration form ends-->
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                        
                            <template #actions="props">
                              
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" 
                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                              @click="openEditModal(props.row)">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
  
    <!-- Modal -->
                          <teleport to="body">
  <div v-if="show_modal" class="modal fade show d-block " role="dialog">
    <div class="modal-dialog modal-dialog modal-lg ">
      <div class="modal-content d-flex flex-column" style="block-size: auto;">
        <div class="modal-header">
          <h5 class="modal-title">Editing Form for Project Details{{ project_id }} </h5>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
        </div>
        <form @submit.prevent="updateProject">
        <div class="modal-body flex-grow-1" style="overflow-y: auto;">
            <div class="row mb-2 ">    
              <div class="col-md-">
                <label class="form-label">Project Name</label>
                <input type="text" class="form-control"  v-model="project_name" required>
              </div>
                  
        </div>
            <div class="row mb-2 ">    
              <div class="col-md-6">
                <label class="form-label">Project Aka</label>
                <input type="text" class="form-control" v-model="short_name" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Project Contract Number</label>
                <input type="text" class="form-control" v-model="contract_number" required>
              </div>           
        </div>
        <div class="row mb-2">    
            <div class="col-md-6">
                <label class="form-label">Project Cost</label>
                <input type="number" class="form-control"  v-model.number="project_cost" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Financia Year</label>
                <select v-model="financial_year" class="form-control form-select" >
                    <option value="2023/2024">2023/2024</option>
                    <option value="2024/2025">2024/2025</option>
                    <option value="2025/2026">2025/2026</option>
                </select>
                
            </div>
               
               
        </div>
        <div class="row mb-2">   
            <div class="col-md-6">
                <label class="form-label">Client Name</label>
                <input type="text" class="form-control"  v-model="client" >
                             
            </div>
            <div class="col-md-6">
                <label class="form-label">Status</label>
                <select name="" id="" v-model="status"  class="form-control form-select" >
                    <option value="active">ACTIVE</option>
                    <option value="inactive">INACTIVE</option>
                    <option value="append">APPEND</option>
                    <option value="completed">COMPLETED</option>                   
                </select>
                
            </div>
              </div>
        <div class="row mb-2">    
            <div class="col-md-6">
                <label class="form-label"> Start Date</label>
                <input type="date" class="form-control"  v-model="start_date" >
                </div> 
                <div class="col-md-6">
                <label class="form-label">End Date Name</label>
                <input type="date" class="form-control"  v-model="end_date">
            </div>
        </div>
        </div>  
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="closeEditModal">Cancel</button>   
           
              <button type="submit" class="btn btn-primary" :disabled="isSending"> 
                <span v-if="isSending">
                  <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
                </span>
                <span v-else>Update</span>
              </button>
          </div>
          </form>
        
      </div>
    </div>
  </div>
                          </teleport>
  
    <!-- Modal Background Overlay -->
    <!-- <div v-if="show_modal" class="modal-backdrop fade show" style="background-color: rgba(0, 0, 0.5, 0.5);"></div> -->
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
    useMeta({ title: 'Custom Table' });
    import { inject } from 'vue';


    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const project_name = ref('');  
    const short_name = ref('');
    const contract_number = ref('');
    const financial_year = ref('');
    const client = ref('');
    const project_cost = ref('');   
    const start_date = ref('');
    const end_date = ref('');
    const status = ref('');
    const showMessage = inject('showMessage');
    const showError = inject('showError');    
    const loading_spinner = ref(false);
     const isSending= ref(false);
    const columns = ref(['SNo', 'project_name','short_name','contract_number','financial_year','client','project_cost','start_date','end_date','status', 'actions']);
    const items = ref([]);
    const item_registration = ref(false);
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

    const getProjects = () => {
        loading_spinner.value = true;
        axiosInstance.get('/projects').then((response) => {
            items.value = response.data.map((item, index) => ({
                ...item,
                SNo: index + 1,
                id: item.id,
                project_cost:item.project_cost.toLocaleString()+"/=",
            }));
            loading_spinner.value = false;
        });
    };

    const registerProject = () => {
        item_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            short_name: short_name.value,
            project_name: project_name.value,
            company_id: 6,
            project_cost: project_cost.value,
            contract_number: contract_number.value,
            financial_year: financial_year.value,
            client: client.value,
            client_id: 0,
            start_date: start_date.value,
            end_date: end_date.value,
            status: status.value,
        };

        axiosInstance
            .post('/projects', itemData)
            .then((response) => {
                if (response.status === 201) {
                    getProjects();
                    loading_spinner.value = false;
                    showMessage('Project registered successfully!');
                } else {
                    showError('Fail to registering Project ! please try again!');
                    console.error('Error registering Project:', response.statusText);
                    loading_spinner.value = false;
                }
            })
            .catch((error) => {
                console.error("Error registering Project:", error.message);
                showError('Error registering Project:', error.message);
                loading_spinner.value = false;
            });
    };       
    

 
        const updateProject = () => {
            isSending.value = true;
        item_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            
            project_name: project_name.value,           
            short_name: short_name.value,
            project_cost: project_cost.value,
            contract_number: contract_number.value,
            financial_year: financial_year.value,
            client: client.value,
            start_date: start_date.value,
            end_date: end_date.value,
            status: status.value,
        };

        axiosInstance
            .patch(`/projects/${project_id.value}`, itemData)
            .then((response) => {
                if (response.status === 200) {
                    getProjects();
                    loading_spinner.value = false;
                    isSending.value = false;
                    showMessage('Project Updated successfully!');
                    closeEditModal();
                } else {
                    showError('Fail to registering Project ! please try again!');
                    console.error('Error Updating Project:', response.statusText);
                    loading_spinner.value = false;
                    isSending.value = false;
                }
            })
            .catch((error) => {
                console.error("Error registering Project:", error.message);
                showError('Error registering Project:', error.message);
                loading_spinner.value = false;
            });
    };    



    const show_modal = ref(false);
    const project_id = ref('');
    const openEditModal= (row) => {
     show_modal.value = true;
     project_id.value = row.id;
     project_name.value= row.project_name;
     project_cost.value = Number(row.project_cost.replace(/[^\d.-]/g, ''));
     financial_year.value = row.financial_year.replace("/", "/");  // Ensure format matches dropdown options
     short_name.value = row.short_name || '';
     client.value = row.client;
     contract_number.value = row.contract_number;
     start_date.value = row.start_date;
     end_date.value = row.end_date;
     status.value = row.status.trim().toUpperCase(); // Converts 'active' to 'ACTIVE'
    }
    const   closeEditModal = () => {

    show_modal.value = false;
    project_name.value = '';
    project_cost.value = '';
    financial_year.value = '';
    short_name.value = '';
    client.value = '';
    contract_number.value = '';
    start_date.value = '';
    end_date.value = '';
    status.value = '';
    }
    onMounted(() => {
        getProjects();
    });
</script>
