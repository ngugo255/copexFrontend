<template>
   

    <div  class="layout-px-spacing mt-3">
        <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
        <div class="text-center ">
            <h6>{{ project?.short_name }}</h6>
        </div>
    <!-- tab starts -->
    <ul class="nav nav-tabs">    
    <li class="nav-item ">
      <button
        class="nav-link  fs-6"
        :class="{ active: activeTab === 'dieseldistribution' }"
        @click="viewDistribution(); isDiesel=true; item_id = 2;  activeTab = 'dieseldistribution'"
      >
        Diesel Distibution
      </button>
    </li>
    <li class="nav-item">
      <button
        class="nav-link fs-6"
        :class="{ active: activeTab === 'petroldistribution' }"
        @click="viewDistribution(); isDiesel=false; item_id= 4 ; activeTab ='petroldistribution'"
      >
       Petrol Distribution
      </button>
    </li>
  </ul>
     <!-- tab ends -->

         
               <!-- distribution starts -->
               <div v-if="view_distribution" class="panel p-0" >
                    <div class="custom-table table3 ">
                           <div v-if="!loading_spinner" class=" col-12 d-flex align-items-center justify-content-between">
                        <div class=" d-flex flex-column align-items-start p-1 ">                            
                          <table class="table">
    <thead>
      <tr>
        <th></th>
        <th class="text-primary"> Used</th>
        <th class="text-success">Balance</th>
      </tr>
    </thead>
    <tbody>        
      <tr v-if="isDiesel">
        <td class="fw-bold">Diesel</td>
        <td>{{ total_fuel}} L</td>
        <td>{{  (totalDiesel - total_fuel)}} L</td>
      </tr>
      <tr v-else>
        <td class="fw-bold">Petrol</td>
        <td>{{ total_fuel}} L</td>
        <td>{{ (totalPetrol - total_fuel)}} L</td>
      </tr>
    </tbody>
                          </table>                                        
                        </div>  
                           </div>
                        
             
                 
                        <div v-if="!loading_spinner" class="text-center mt-1"> <h5 v-if="isDiesel"> Diesel Distribution </h5> <h5 v-else>Petrol Distribution </h5> </div>
                        <div class="d-flex">
                           
                    </div>
                        
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

        <div  class="d-flex" v-if="user_role == 8 ">
             
                  <button class="btn btn-success ms-auto mx-3"  v-if="isClosed"   @click="isfilling = !isfilling; isClosed=!isClosed;">
                   add
                </button>
                <button class="btn btn-danger ms-auto mx-3" v-else  @click="isfilling = !isfilling; isClosed=!isClosed">
                    X
                </button>
            
            </div>      
          <!-- fuel usage form start -->

      
 <div id="allocation" v-if="isfilling" class="col-lg-12 layout-spacing col-md-12 p-4">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4 class="text-center text-primary"><strong v-if="isDiesel">Table For Diesel Distribution </strong><strong v-else>Table For Petrol Distribution </strong></h4>
                            </div>
                        </div>
                        <form  @submit.prevent="registerMachineDistribution">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="machine">Select Machine</label>
                                    <Multiselect
      v-model="selectedMachine"
      :options="Machines"
      :close-on-select="true"
      label="name"
      value-prop="id"
      :multiple="true"
      placeholder="Select Machines"
      @change="handleDescriptionChange"
      :required="!machine_field"
      :searchable="true" 
    />
                                </div>
                                <div v-if="machine_field" class="col-md-4">
                                <label class="form-label">Machine Name</label>                            
                                <input type="text" v-model="machine" class="form-control" id="fuel_quantity" required />                                
                                </div>
                                <div class="col-md-4">
                                    <label for="fuel_quantity">Fuel Issued</label>
                                    <input type="number" v-model="fuel_quantity" class="form-control" id="fuel_quantity" required />
                                </div>
                
                                <div class="col-md-4">
                                    <label for="consuption_type">Consuption Ratio</label>
                                    <select class="form-control" v-model="ratio" name="consuption_type" required>
                                        <option value="">Select Consuption Type</option>
                                        <option value="Litre/hr">Hours</option>
                                        <option value="km/Litre">Kilometres</option>
                                    </select>
                                </div>
                         <div class="col-md-4">
                         <label class="form-label">Driver Name</label>
                         <input type="text" class="form-control" v-model="driver_name" required>
                         </div>
                
                         <div class="col-md-4">
                         <label class="form-label">Initial Reading</label>
                         <input type="number" class="form-control"  name="initial_reading" v-model="initial_reading" required step="any" >
                        </div>
                        <div class="col-md-4">
                         <label class="form-label">Final Reading</label>
                         <input type="number" class="form-control"  name="initial_reading" v-model="final_reading" required step="any" >
                        </div>
            
            
            <div class="row mb-2">
              <div class="col-md-12">
                    <label class="form-label">Task</label>
                    <textarea type="number" class="form-control" v-model="task" name="fuel_provided" required style="height:2cm"></textarea>
                </div>
               
            </div>
                                
                                
                               
                              
                               
                            </div>
                            <div class="d-flex justify-content-end mt-3">
                                <button class="btn btn-danger me-2" @click="isfilling =!isfilling;isClosed=!isClosed">Cancel</button>
                                <button class="btn btn-primary" type="submit">Assign</button>
                            </div>
                        </form>
                    </div>
                
                </div>
</div>
  
        <v-client-table :data="bulkDistribution" :columns="distributionColumn" :options="table_option" >
            
                            <template #actions="props">
  
                                <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    style="cursor: pointer;"
    title="Add Remark"
    @click="openRemarkModal(props.row)"
  >
    <!-- Speech Bubble -->
    <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 4v-16a2 2 0 0 1 2-2z" 
          stroke="currentColor" 
          stroke-width="2" 
          fill="none" 
          stroke-linejoin="round"/>
    
    <!-- Horizontal Remark Lines -->
    <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="7" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    
  <!-- notification circle starts -->
    <!-- <circle cx="19" cy="6" r="6" fill="red" stroke="white" stroke-width="1.5"/> -->
  <!-- notification circle ends -->
  </svg>
  
    <!-- Modal -->
    <teleport to="body">
  <div v-if="showRemarkModal" class="modal fade show d-block" role="dialog">
    <div class="modal-dialog modal-dialog modal-lg">
      <div class="modal-content d-flex flex-column" style="height: 90vh;">
        <div class="modal-header">
          <h5 class="modal-title">Remark(s) On Machine <span style="color:blue;">{{ name }}</span></h5>
          <button type="button" class="btn-close" @click="closeRemarkModal"></button>
        </div>
  
        <div class="modal-body flex-grow-1" style="overflow-y: auto;">
          <div v-if="isfetching" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </div>
          <div v-else>
            <div v-for="remark in remarks" :key="remark.id">
              <div v-if="remarks.length === 0" class="text-center">
                <p>No remarks found</p>
              </div>
              <!-- Current user's remark -->
              <div v-else>
                <div v-if="remark.remarker_id == useId" class="d-flex justify-content-end mb-2">
                  <div class="chat-bubble p-3 shadow-sm" style="background-color: rgb(221 226 226); max-width: 80%; font-size: 0.5rem;">
                    <p class="mb-0 fw-bold text-dark fs-5">You</p> 
                    <hr class="mt-0" style="border: 1px solid #ccc;" />
                    <p class="mb-0 text-dark fs-4">{{ remark.description }}</p>
                  </div>
                </div>
  
                <!-- Other users' remarks -->
                <div v-if="remark.remarker_id !== useId" class="d-flex justify-content-start mb-2">
                  <div class="chat-bubble p-3 shadow-sm" style="background-color: rgb(241 226 226); max-width: 80%; font-size: 0.5rem;">
                    <p class="mb-0 fw-bold text-dark fs-5">{{ remark.sender_name}}</p>
                    <hr class="mt-0" style="border: 1px solid #ccc;" />
                    <p class="mb-0 text-dark fs-4">{{ remark.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Form for adding a new remark - fixed at bottom -->
        <div class="p-3 border-top" style="background-color: #f8f9fa;">
          <form @submit.prevent="saveRemark">
            <textarea v-model="newremark" class="form-control mb-2" rows="3" placeholder="Enter your remark"></textarea>
            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-secondary" @click="closeRemarkModal">Close</button>
              <button type="submit" class="btn btn-primary" :disabled="isSending"> 
                <span v-if="isSending">
                  <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
                </span>
                <span v-else>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </teleport>
  
    <!-- Modal Background Overlay -->
    <div v-if="showRemarkModal" class="modal-backdrop fade show"></div>
  
  
                            </template>
                        </v-client-table>
        
                    </div>
                </div>
      
  <!-- distribution ends -->

    </div>
  
</template>

<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>

<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    import { useRoute } from 'vue-router';
    import { inject } from 'vue';
    import Multiselect from '@vueform/multiselect';

    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const isClosed = ref(true)
    const isDiesel = ref(true);
    const route = useRoute();
    useMeta({ title: 'Purchase Order' });
    const activeTab = ref("dieseldistribution");
    const machine_field = ref(false);
    const driver_name = ref('');
    const initial_reading= ref(' ');
    const final_reading = ref('');
    const task = ref('');
    const item_id = ref(2);
    const machine = ref('');
    const fuel_quantity = ref('');
    const issued_date = ref(new Date().toISOString().substr(0, 10));
    const details = ref('');
    const ratio = ref('');   
    const Machines = ref([]);
    const bulkDistribution = ref([]);
    const distributionColumn = ref(['SNo','date','driver','machine','type', 'consuption', 'supervisor','task','fuel','initial','final','ratio','actions']);
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo','date_issued','ratio',],
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
  
    const view_machines = ref(false);
    const view_distribution = ref(true);
    const loading_spinner = ref(false);   
    const selectedMachine = ref('');
    const total_fuel = ref(0);
      
    const isfilling  = ref(false);
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

    const viewDistribution = ()=>{
    
      getBulkDistribution();     
      view_machines.value=false;
      view_distribution.value=true;
    }

    const project = ref();
    const getProjects = async () => {
        loading_spinner.value = true;

        try {
            const response = await axiosInstance.get(`/projects/${route.params.project_id}`);
                project.value = response.data
                loading_spinner.value = false;
              
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const getBulkDistribution = async () => {
    loading_spinner.value = true;   
    getTotalFuel();
    try {
        const response = await axiosInstance.get(`/fuel-usage`);
        if (Array.isArray(response.data)) {   
         bulkDistribution.value = response.data.filter(distribution => 
         distribution.project_id == route.params.project_id && distribution.item_id== item_id.value
        )
            .map((statement, index) => {
                let ratio;
                // Calculate the ratio based on the ratio_factor
                if (statement.ratio_factor === "Litre/hr") {
                    ratio = statement.fuel_quantity / (statement.final_reading - statement.initial_reading);
                } else {
                    ratio = (statement.final_reading - statement.initial_reading) / statement.fuel_quantity;
                }

                // Apply the condition to change ratio if it's greater than 50
                ratio = ratio > 50 ? "---" : ratio.toFixed(2);
               
                return {
                    SNo: index + 1,
                    fuel: statement.fuel_quantity,
                    consuption: statement.ratio_factor,
                    date: statement.usage_date,
                    task: statement.task,
                    driver: statement.driver_name,
                    supervisor: statement.supervisor_name,
                    initial: statement.initial_reading,
                    final: statement.final_reading,
                    machine: statement.machine,
                    type:statement.type,
                    ratio: ratio,
                    project_id:statement.project_id,
                    id:statement.id,
                  
                };
            });

     // Now, calculate the total fuel after filtering
     total_fuel.value = bulkDistribution.value.reduce((sum, statement) => {
                return sum + Number(statement.fuel); // Summing up the fuel_issued after mapping
            }, 0);
           
            loading_spinner.value = false;
        } else {
          showError(error.message);
            console.error("Invalid response format");
        }
    } catch (error) {
      showError(error.message);
      loading_spinner.value = false;
        console.error("Error fetching Bulk Distribution: ", error);
    }
};
const registerMachineDistribution = () => {
            isfilling.value=false;
        
         const itemData = {
            item_id:item_id.value,
            machine_id:selectedMachine.value,
            distribution_id:0,
            bulk_id:0,
            ratio_factor: ratio.value,
            supervisor_name: JSON.parse(localStorage.getItem("user")).name,
            supervisor_id: JSON.parse(localStorage.getItem("user")).id,
            fuel_quantity:fuel_quantity.value,
            usage_date: issued_date.value,
            rate: details.value.rate,
            initial_reading: initial_reading.value,
            final_reading: final_reading.value,
            task: task.value,
            driver_id:0,
            driver_name: driver_name.value,
            project_id:route.params.project_id
           
      
        };
        if (item_id.value == 2 && (totalDiesel.value - total_fuel.value) < fuel_quantity.value) {
        showError("Please, you don't have enough balance to perform the Diesel distribution.");
        isClosed.value = true;
        return;
        }
        if (item_id.value == 4 && (totalPetrol.value - total_fuel.value) < fuel_quantity.value) {
        showError("Please, you don't have enough balance to perform the Petrol distribution.");
        isClosed.value = true;
        return;
    }
    loading_spinner.value = true;
        axiosInstance
            .post('/fuel-usage', itemData)
            .then((response) => {
                getBulkDistribution();
                machine.value = '';
                fuel_quantity.value = '';
                details.value = '';
                ratio.value = '';
                driver_name.value = '';
                initial_reading.value = '';
                final_reading.value = '';
                task.value = '';
                isClosed.value = true;
                loading_spinner.value = false;
                // Display success or error messages based on response status
               
            if (response.status === 201) {
                showMessage("Fuel distributed successfully");
            } else {
                console.error("Error registering Distribution:", response.data);
                showError(response.data.message || "An error occurred while registering the distribution.");
            }
            })
            .catch((error) => {
                console.error("Error registering Distribution:", error);
                showError("Error code :"+ error.message);
            });
    };

   
    const onRowClick = (row) => {
        // alert("hello"+row);
        // router.push(`/order-items/${row.value.LPO_number}`);
    };

    const fetchMachines = async () => {
        loading_spinner.value=true;
    axiosInstance
      .get(`/machines`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          Machines.value = response.data.map((machine, index) => ({
            SNo: index + 1,
            id: machine.id,
            name: machine.name,
            type: machine.type_name,
            ratio: machine.ratio,
            category: machine.category_id === 1 ? 'machine' : 
                     machine.category_id === 2 ? 'vehicle' : 
                     machine.category_id === 3 ? 'supervision' : 'no category',
            capacity: machine.capacity,
            category_id:machine.category_id,
            reserve_litre: machine.reserve_litre
          }));
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        showError(error.message);
        loading_spinner.value = false;
      })
      .finally(() => {
       loading_spinner.value = false;
      });
}

// get the total fuels 

const totalDiesel = ref(0);
const totalPetrol = ref(0);

const getTotalFuel = async () => {
    loading_spinner.value = true;
    
    try {
        const response = await axiosInstance.get(`/fuel-sum/${route.params.project_id}`);
        if (response.data) {
            totalDiesel.value = parseFloat(response.data.diesel_sum) 
            totalPetrol.value = parseFloat(response.data.petrol_sum) 
        } 
        else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching total fuels: ", error);
    } finally {
        loading_spinner.value = false;
    }
};
    onMounted(() => {       
        getProjects();
        getBulkDistribution();
        fetchMachines();
       
    });




//method for fetching remarks
const name =  ref();
const user_role = JSON.parse(localStorage.getItem("user")).role;
const isfetching = ref(false);   
const status = ref("unchecked"); // Default status
const usage = ref(); // Default usage ID
const newremark = ref();
const remarks = ref([]);
const showRemarkModal = ref(false);
const useId =  JSON.parse(localStorage.getItem("user")).id;
const isSending = ref(false);

   const openRemarkModal= (row) => {
    fetchRemarks(row.id);
    name.value= row.machine
    usage.value = row.id;     
        showRemarkModal.value = true;
    }
  const   closeRemarkModal = () => {
    showRemarkModal.value = false;
    newremark.value = ''; // Clear the remark input
    remarks.value = []; // Reset the remarks list
    name.value = ''; // Clear the machine name
    
    }

    const saveRemark = async () => {
        if (!newremark.value.trim()) {
            showError("Remark cannot be empty!");
            return;
        }
   isSending.value= true;
        try {
            const response = await  axiosInstance.post("/remark", {   
                created_at: new Date().toISOString(), 
                remarker_id: JSON.parse(localStorage.getItem("user")).id,
                description: newremark.value,
                status: status.value, // Default to unchecked
                type_id:usage.value,
                remark_type:"distribution"  
            });

            remarks.value.push(response.data); // Add new remark to the list
            newremark.value = ""; // Clear input field
            showMessage("Remark added:", "success");
        } catch (error) {
            showError("Error adding remark:", error);
        }
        isSending.value= false;
    };





const fetchRemarks = async (id) => {
    isfetching.value = true;

    try {
        const response = await axiosInstance.get(`/usage-remark/${id}`);
        remarks.value = response.data.filter(item => item.remark_type === 'distribution');
    } catch (error) {
        console.error("Error fetching remarks:", error);
    }

    isfetching.value = false;
}


    
</script>
