<template>
  <div class="layout-px-spacing">
      <teleport to="#breadcrumb">
          <ul class="navbar-nav flex-row">
              <li>
                  <div class="page-header">
                      <nav class="breadcrumb-one" aria-label="breadcrumb">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                              <li class="breadcrumb-item active" aria-current="page"><span>Totaly Machines types</span></li>
                          </ol>
                      </nav>
                  </div>
              </li>
          </ul>
      </teleport>    
      <div class="seperator-header layout-top-spacing">
          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
              </button>
              <button class="btn btn-primary me-2" @click="register_machine=!register_machine">
                  <i class="bi bi-plus"></i>Add
              </button>
          </div>
      </div>

      
 
      <div class="mt-3 mx-2">
        <!-- add consumer starts -->
        <form class="p-3 border rounded bg-white shadow" v-if="register_machine" id="consumer" @submit.prevent="registerMachine">
    <h3 class="text-center">MACHINE TYPE REGISTRATION </h3>
    <div class="row mb-2">
        <div class="col-md-6">
            <label class="form-label">Machine Type</label>
            <input type="text" class="form-control" v-model="machine_type_name" name="machine_type_name" required>
        </div>
 <div class="col-md-6">
      <label class="form-label">Consuption Type</label>
    <select class="form-control" v-model="consuption_type">
      <option value="">Select Option</option>
      <option  value="km/Litre">Km/Litre</option>
      <option value="Litre/hr">Litre/hr</option>
    </select>
    </div>
             
    </div>
     <div class="d-flex gap-2 justify-content-end">     
        <button type="button" class="btn btn-danger" onclick="document.getElementById('consumer').style.display='none'">Cancel</button>
        <button type="submit" class="btn btn-primary">Register</button>
    </div>
    
</form>
         
<div v-if="loading_spinner" class="text-center text-primary  mt-2 mb-2">
              <span class=" text-lg">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>              
              </span>
            </div>
     
    
     </div>   
    
      <!-- table ends -->

    




      <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
              <div class="panel br-6 p-0">
                  <div class="custom-table">
                      <v-client-table :data="Machines" :columns="columns" :options="table_option">
                          <template #actions="props">
                              <div class="actions text-center">
                                <a href="javascript:;" @click="setEditFormValues(props.row)" data-bs-toggle="modal" 
  :data-bs-target="'#modal-' + props.row.id">
 <svg  class="w-6 h-6 text-gray-800 dark:text-white" 

                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                             
                              >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
</a>
                                  <a href="javascript:void(0);" title="Delete" @click="deleteMachineType(props.row.id)">
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
                              
                              </div>
                              <!-- modal starts  -->
                              <div class="modal fade mymodal" data-bs-backdrop="false" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content " >
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Machine Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="updateMachine(selectedId)">
        <div class="modal-body">
  <div class="row">
    <div class="col-md-6">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="machine_type_name">
    </div>   

   <div class="col-md-6">
      <label class="form-label">Consumption Type</label>
     <select class="form-control" v-model="consuption_type">
      <option value="">Select Consumption Type</option>
      <option value="Km/Litre">Km/Litre</option>
      <option value="Litre/hr">Litre/hr</option>
     </select>
    </div>
      </div>
</div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-outline-success" data-bs-dismiss="modal" @click="selectedId = props.row.id">
             Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

                               <!-- modal ends -->
                          </template>
                          <template #salary="props"> ${{ props.row.salary }} </template>
                      </v-client-table>
                  </div>
              </div>
          </div>
      </div>
</div>
</template>

<script setup>
  import { onMounted, ref,inject } from 'vue';
  const showMessage = inject('showMessage');
    const showError = inject('showError');

  import { useMeta } from '@/composables/use-meta';
  useMeta({ title: 'Default Order Sorting Table' });
  import axios from 'axios';
// import { get } from 'core-js/core/dict'; // Removed incorrect import
  const columns = ref(['SNo', 'name','consuption_type','actions']);
  const Machines = ref([]);  
  const loading_spinner = ref(false);
  const register_machine = ref(false);
  const consuption_type = ref('');
  const table_option = ref({
      perPage: 10,
      perPageValues: [5, 10, 20, 50],
      skin: 'table table-hover',
      columnsClasses: { actions: 'actions text-center' },
      pagination: { nav: 'scroll', chunk: 5 },
      texts: {
          count: 'Showing {from} to {to} of {count}',
          filter: '',
          filterPlaceholder: 'Search...',
          limit: 'Results:',
      },
      sortable: ['SNo', 'name','consuption_type' ],
      sortIcon: {
          base: 'sort-icon-none',
          up: 'sort-icon-asc',
          down: 'sort-icon-desc',
      },
      resizableColumns: false,
  });

  const axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL
  });
  

  const fetchMachines = async () => {
   loading_spinner.value = true;
  axiosInstance
    .get(`/machine-types`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        Machines.value = response.data.map((machine, index) => ({
          SNo: index + 1,
          id: machine.id,
          name: machine.name,
          consuption_type : machine.consuption_type,         
        }));
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



const machine_type_name = ref('');
const selected_machine_type = ref('');

const registerMachine = () => {
      register_machine.value = false;
      loading_spinner.value = true;
      const machineData = {
          name: machine_type_name.value, 
          consuption_type :consuption_type.value        
      };

      axiosInstance
          .post('/machine-types', machineData)
          .then((response) => {
              clearForm();
              showMessage(" Machine type Added Succesfully");
              fetchMachines();
              loading_spinner.value = false;
             console.log("type name",selected_machine_type.value.name);
          })
          .catch((error) => {
            showError(error);
              console.error("Error registering machine", error);
          });
  };


  const updateMachine = (id) => {
  loading_spinner.value = true;
  const updateMachineData = {
    name: machine_type_name.value,
    consuption_type :consuption_type.value       
  };

  axiosInstance
    .put(`/machine-types/${id}`, updateMachineData)
    .then((response) => {
      clearForm();
      showMessage("Machine Type Update")
      fetchMachines();
      loading_spinner.value = false;
    
    })
    .catch((error) => {
      showError(error);
      console.error("Error updating machine..", error);
      loading_spinner.value = false;
    });
};

    const deleteMachineType = (id) => {
    try{
        loading_spinner.value = true;
        axiosInstance.delete(`/machine-types/${id}`)
            .then((response) => {
              showMessage("Machine type Deleted Succesfully");
                fetchMachines(); 
                        
                loading_spinner.value = false;
            });
          }
          catch (error){
            showError(error);
          }
    
};
  const clearForm = () => {
  machine_type_name.value = ''; 
  selected_machine_type.value = '';

};
const setEditFormValues = (machine) => {
  machine_type_name.value = machine.name;   
};

  onMounted(() => {
       fetchMachines();
      
  });

  const selectedMachine = ref(null);


</script>

<style>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }
</style> 