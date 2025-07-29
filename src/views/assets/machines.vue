<template>
  <div class="layout-px-spacing">
      <teleport to="#breadcrumb">
          <ul class="navbar-nav flex-row">
              <li>
                  <div class="page-header">
                      <nav class="breadcrumb-one" aria-label="breadcrumb">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                              <li class="breadcrumb-item active" aria-current="page"><span>Totaly Machines</span></li>
                          </ol>
                      </nav>
                  </div>
              </li>
          </ul>
      </teleport> 
      
                <!-- loading spinner starts -->
                 <div class="mt-5" v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

        
      
  <div v-if="!loading_spinner" class="seperator-header layout-top-spacing">
    <!-- Centered Widget Container -->
    <div class="d-flex ">
          <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-dark px-3 py-2" @click="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </button>
            <button class="btn btn-primary px-4 py-2" @click="register_machine=!register_machine">
                <i class="bi bi-plus me-2"></i>Add New
            </button>
        </div>
    </div>

    
        <div  class="ms-auto col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <div class="widget widget-statistics h-100 shadow card" @click="navigateToMachines" style="cursor: pointer;">
                <div class="widget-content p-4">
                    <div class="row gy-3">
                        <div class="col-md-3 col-sm-6 col-6">           
                            <div class="widget  widget-statistics h-100 shadow card">
                                <div 
                                    class="w-detail" 
                                    @click="showAllCategories"
                                    :class="{ 'active-filter': activeFilter === null }"
                                >
                                    <p class="w-title mb-2 text-muted">All</p>
                                    <p class="w-stats text-info fs-3 fw-bold">{{ totalcount }}</p>
                                </div>
                            </div>
                        </div>
                          <div class="col-md-3 col-sm-6 col-6">           
                            <div class="widget  widget-statistics h-100 shadow card">
                                <div 
                                    class="w-detail" 
                                    @click="filterByCategory(1, 'machine')"
                                    :class="{ 'active-filter': activeFilter === 1 }"
                                >
                                    <p class="w-title mb-2 text-muted">Total Machines</p>
                                    <p class="w-stats text-primary fs-3 fw-bold">{{ totalmachine }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-6">
                            <div class="widget widget-statistics h-100 shadow card" >
                                <div 
                                    class="w-detail" 
                                    @click="filterByCategory(2, 'vehicle')"
                                    :class="{ 'active-filter': activeFilter === 2 }"
                                >
                                    <p class="w-title mb-2 text-muted">Total Vehicles</p>
                                    <p class="w-stats text-success fs-3 fw-bold">{{ totalVehicles }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-6">             
                            <div class="widget widget-statistics h-100 shadow card">
                                <div 
                                    class="w-detail" 
                                    @click="filterByCategory(3, 'supervision')"
                                    :class="{ 'active-filter': activeFilter === 3 }"
                                >
                                    <p class="w-title mb-2 text-muted">Total Supervision</p>
                                    <p class="w-stats text-dark fs-3 fw-bold">{{ totalsupervision }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

       
 
      <div  class="mt-3 mx-2">
        <!-- add consumer starts -->
        <form class="p-3 border rounded bg-white shadow" v-if="register_machine" id="consumer" @submit.prevent="registerMachine">
    <h3 class="text-center">MACHINE REGISTRATION </h3>
    <div class="row mb-2">
        <div class="col-md-4">
            <label class="form-label">Registration  No</label>
            <input type="text" class="form-control" v-model="machine_name" name="Machine_name" required>
        </div>
        <div class="col-md-4">
            <label class="form-label">Category {{  category }}</label>
            <Multiselect 
              v-model="category"
              :options="[
                {id: '1', name: 'Machine'},
                {id: '2', name: 'Vehicle'},
                {id: '3', name: 'Supervision'}
              ]"
              label="name"
              track-by="id"
              placeholder="Select Category"
              :searchable="true"
              :close-on-select="true"
              required
            />
        </div>
        <div class="col-md-4">
            <label class="form-label">Select Type </label>
            <Multiselect 
              v-model="selected_machine_type"
              :options="machines_type" 
              label="name"  
              track-by="id" 
              placeholder="Select Type"
              :searchable="true"
              :close-on-select="true"
              required
            />
            <!-- <Multiselect 
              v-model="selected_machine_type"
              :options="machines_type" 
              label="name"  
              track-by="id" 
              placeholder="Select a Machine"
              :searchable="true"
              :close-on-select="true"
              @select="onMachineSelected"
            /> -->
        </div>
    </div>
    <div class="row mb-2">
        <div class="col-md-4">
            <label class="form-label">Average Ratio</label>
            <input type="number" class="form-control" v-model="machine_ratio" name="ratio" step="any" >
        </div>
        <div class="col-md-4">
            <label class="form-label">Capacity</label>
            <input type="number" class="form-control" v-model="machine_capacity" name="capacity" required step="any" >
        </div>
        <div class="col-md-4">
            <label class="form-label">Reserve Litre</label>
            <input type="number" class="form-control" v-model="machine_reserve_litre" name="reserve_litre" required step="any" >
        </div>
    </div>
    <div class="d-flex gap-2 justify-content-end">
        <button type="submit" class="btn btn-primary">Register</button>
        <button type="button" class="btn btn-danger" onclick="document.getElementById('consumer').style.display='none'">Cancel</button>
    </div>
</form>
         
     </div>   
    
      <!-- table ends -->
       <!-- notificatio starts -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div
        class="toast align-items-center text-dark border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="toast"
        style="background-color: #afe8fa"
      >
        <div class="d-flex">
          <div class="toast-body">
            Registration successful! Redirecting to user/home...
          </div>
          <button
            type="button"
            class="btn-close btn-close-dark me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>


      <div v-if="!loading_spinner" class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
              <div class="panel br-6 p-0">
                  <div class="custom-table">
                      <v-client-table :data="filteredMachines" :columns="columns" :options="table_option">
                          <template #actions="props">
                              <div class="actions text-center">
                                <a href="javascript:;" @click="setEditFormValues(props.row)" data-bs-toggle="modal" 
  :data-bs-target="'#modal-' + props.row.id">
  <button type="button" class="btn btn-primary btn-sm">View</button>
</a>
                                  &nbsp;
                                  <!-- <a href="javascript:;" class="cancel" @click="">
                                      <button type="button" class="btn btn-danger btn-sm">Delete</button>
                                  </a> -->
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
      <input type="text" class="form-control" v-model="machine_name">
    </div>
    <div class="col-md-6">
      <label class="form-label">Category</label>
      <Multiselect 
        v-model="category"
        :options="[
          {id: '1', name: 'Machine'},
          {id: '2', name: 'Vehicle'},
          {id: '3', name: 'Supervision'}
        ]"
        label="name"
        track-by="id"
        placeholder="Select Category"
        :searchable="true"
        :close-on-select="true"
        required
      />
    </div>
    <div class="col-md-6">
      <label class="form-label">Type</label>
      <Multiselect 
        v-model="selected_machine_type"
        :options="machines_type" 
        label="name"  
        track-by="id" 
        placeholder="Select Type"
        :searchable="true"
        :close-on-select="true"
        required
      />
    </div>
    <div class="col-md-6">
      <label class="form-label">Ratio</label>
      <input type="number" class="form-control bg-white" step="any" v-model="machine_ratio">
    </div>
    <div class="col-md-6">
      <label class="form-label">Capacity</label>
      <input type="number" class="form-control bg-white" step="any" v-model="machine_capacity">
    </div>
    <div class="col-md-6">
      <label class="form-label">Reserve Litre</label>
      <input type="text" class="form-control bg-white" v-model="machine_reserve_litre">
    </div>
      <!-- <div class="col-md-6">
      <label class="form-label">Make</label>
      <input type="text" class="form-control bg-white" >
    </div>
      <div class="col-md-6">
      <label class="form-label">Model</label>
      <input type="text" class="form-control bg-white" >
    </div> -->
      <div class="col-md-12">
      <label class="form-label">Consuption Type</label>
    <Multiselect 
      v-model="consuption_type"
      :options="[
        {id: '1', name: 'Km/Litre'},
        {id: '2', name: 'Litre/hr'}
      ]"
      label="name"
      track-by="id"
      placeholder="Select Consumption Type"
      :searchable="true"
      :close-on-select="true"
      required
    />
    </div>
  </div>
</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" @click="selectedId = props.row.id">Save changes</button>
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
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import { useMeta } from '@/composables/use-meta';
  useMeta({ title: 'Default Order Sorting Table' });
  import axios from 'axios';
// import { get } from 'core-js/core/dict'; // Removed incorrect import
// Reactive properties
const searchQuery = ref('');
const activeFilter = ref(null);
const showSearch = ref(false);
const filteredMachines = ref([]);
const allMachines = ref([]);

  const columns = ref(['SNo','id', 'name','fuel_type', 'type', 'make','model','category','consuption', 'capacity', 'reserve_litre', 'actions']);
  const Machines = ref([]);
  const machines_type = ref([]);
  const loading_spinner = ref(false);
  const register_machine = ref(false);
  const consuption_type=ref('');
   const loadingIndicator = inject('loadingIndicator');
  const showMessage = inject('showMessage');
  const showError = inject('showError');  
 const table_option = ref({
  perPage: 10,
  perPageValues: [10, 20, 50],
  skin: 'table table-hover',
  columnsClasses: { actions: 'actions text-center' },
  pagination: { nav: 'scroll', chunk: 5 },
  texts: {
    count: 'Showing {from} to {to} of {count}',
    filter: '',
    filterPlaceholder: 'Search...',
    limit: 'Results:',
  },
  sortable: ['SNo', 'name', 'type', 'ratio', 'capacity', 'reserve_litre'],
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
    .get(`/machines`)
    .then((response) => {
      totalmachine.value = response.data.filter(machine => machine.category_id === 1).length;
      totalVehicles.value = response.data.filter(machine => machine.category_id === 2).length;
      totalsupervision.value = response.data.filter(machine => machine.category_id === 3).length;
      totalcount.value = response.data.length;
      
      if (Array.isArray(response.data)) {
        allMachines.value = response.data.map((machine, index) => ({
          SNo: index + 1,
          id: machine.id,
          name: machine.name,
          type: machine.type_name,
          make: machine.make,
          fuel_type: machine.fuel_type,
          model: machine.model,
          type_id: machine.type_id,
          ratio: machine.ratio,
          category: machine.category_id === 1 ? 'machine' : 
                   machine.category_id === 2 ? 'vehicle' : 
                   machine.category_id === 3 ? 'supervision' : 'no category',
          capacity: machine.capacity,
          category_id: machine.category_id,
          reserve_litre: machine.reserve_litre,
          consuption: machine.consuption_type,
        }));
        
        // Initially show all machines
        filteredMachines.value = [...allMachines.value];
      }
    })
    .catch((error) => {
      console.error("Error fetching machine data:", error.message);
    })
    .finally(() => {
      loading_spinner.value = false;
    });
}

 const showAllCategories = () => {
  activeFilter.value = null;
  filteredMachines.value = [...allMachines.value];
  showSearch.value = false;
};



const filterByCategory = (categoryId, categoryName) => {
  if (activeFilter.value === categoryId) {
    activeFilter.value = null;
    filteredMachines.value = [...allMachines.value];
    showSearch.value = false;
  } else {
    activeFilter.value = categoryId;
    filteredMachines.value = allMachines.value.filter(
      machine => machine.category_id === categoryId
    );
    showSearch.value = true;
    searchQuery.value = categoryName; 
  }
};


const fetchMachineTypes = () => {
  loading_spinner.value = true;
  axiosInstance
    .get(`/machine-types`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        machines_type.value = response.data;
      } else {
        console.error("Invalid response format");
      }
    })
    .catch((error) => {
      console.error("Error fetching machine types:", error.message);
    })
    .finally(() => {
      loading_spinner.value = false;
    });
}

const machine_name = ref('');
const selected_machine_type= ref('');
const machine_ratio = ref('');
const machine_capacity =ref ('');
const machine_reserve_litre=ref('');
const category = ref('');
const totalVehicles = ref(0);
const totalmachine = ref(0);
const totalsupervision = ref(0);
const totalcount = ref(0);

const registerMachine = () => {
      register_machine.value = false;
      loading_spinner.value = true;
      const machineData = {
          name: machine_name.value,
          type_name:selected_machine_type.value.name,
          type_id:selected_machine_type.value.id,
          category_id:category.value,
          ratio:machine_ratio.value,
          capacity:machine_capacity.value,
          reserve_litre:machine_reserve_litre.value,
      };

      axiosInstance
          .post('/machines', machineData)
          .then((response) => {
              clearForm();
              fetchMachines();
              loading_spinner.value = false;
             console.log("type name",selected_machine_type.value.name);
          })
          .catch((error) => {
              console.error("Error registering machine", error);
          });
  };


  const updateMachine = (id) => {
  loading_spinner.value = true;
  const updateMachineData = {
    name: machine_name.value,
    type_name: selected_machine_type.value.name,
    type_id: selected_machine_type.value.id,
    category_id: category.value,
    ratio: machine_ratio.value,
    capacity: machine_capacity.value,
    reserve_litre: machine_reserve_litre.value,
    consuption_type : consuption_type.value,
  };

  axiosInstance
    .put(`/machines/${id}`, updateMachineData)
    .then((response) => {
      clearForm();
      fetchMachines();
      loading_spinner.value = false;
    showMessage("Updated successfully");
    })
    .catch((error) => {
      console.error("Error updating machine..", error);
      loading_spinner.value = false;
    });
};

  const clearForm = () => {
  machine_name.value = '';
  category.value = '';
  selected_machine_type.value = '';
  machine_ratio.value = '';
  machine_capacity.value = '';
  machine_reserve_litre.value = '';
};
const setEditFormValues = (machine) => {
  machine_name.value = machine.name;
  category.value = machine.category_id;
  
  // Find the corresponding machine type in machines_type array
  const machineType = machines_type.value.find(type => type.id === machine.type_id);
  selected_machine_type.value = machineType || '';
  
  machine_ratio.value = machine.ratio;
  machine_capacity.value = machine.capacity;
  machine_reserve_litre.value = machine.reserve_litre;
};

  onMounted(() => {
       fetchMachines();
       fetchMachineTypes();
  });

  const selectedMachine = ref(null);
</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }


 /* Add this to highlight the active filter */
.active-filter {
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 4px;
  padding: 5px;
  position: relative;
}
</style> 