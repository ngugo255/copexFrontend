<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Custom</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="seperator-header layout-top-spacing">
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-dark me-2" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                <button class="btn btn-primary me-2" @click="filling = !filling">
                    <i class="bi bi-plus"></i> Add
                </button>
            </div>
        </div>

        <!-- approval officers starts -->
         <!-- Button trigger modal -->

<!-- Modal -->



        <div class="text-center">
            
           <h4 v-if="loading" class="text-danger"> Loading <span class="dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></span></h4>
        
            <h5>MACHINE STATEMENT</h5>
        </div>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3 table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    
                                    <!-- <th>Distributon ID</th> -->
                                    <th>Machine</th>
                                    <th>Type</th>
                                    <th>Fuel Issued</th>
                                    <!-- <th>Fuel Balance</th> -->
                                    <th>Issued Date</th>
                                    <th>Issued By</th>
                                    <th>BULK Number</th>
                                    <th>Consuption Ratio</th>     
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   
                                    <!-- <td>{{ details.id }}</td> -->
                                    <td>{{ details.machine }}</td>
                                    <td>{{ details.type_name }}</td>
                                    <td>{{ details.fuel_issued }}</td>
                                    <!-- <td>{{ details.fuel_quantity }}</td> -->
                                    <td>{{ details.date_provided }}</td>
                                    <td>{{ details.issuer }}</td>
                                    <td>{{ (details.bulk_id) }}</td>
                                    <td>{{ details.ratio }}</td>
                                </tr>
                            </tbody>
                            
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>

            <div id="allocation" v-if="filling" class="col-lg-12 layout-spacing col-md-12">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        
                        <form  class="p-3 border rounded bg-white shadow mb-2" id="consumer" @submit.prevent="registerMachineDistribution">
          <h4 class="text-center">Fuel Usage Report</h4>
            <div class="row mb-2">           
                <div class="col-md-4">
                    <label class="form-label">Driver Name</label>
                    <input type="text" class="form-control" v-model="driver_name" required>
                </div>
                
              <div class="col-md-4">
                  <label class="form-label">Initial Reading</label>
                  <input type="number" class="form-control"  name="initial_reading" v-model="initial_reading" required step="any" >
                </div>
            </div>
            
            <div class="row mb-2">
              <div class="col-md-12">
                    <label class="form-label">Task</label>
                    <textarea type="number" class="form-control" v-model="task" name="fuel_provided" required style="height:2cm"></textarea>
                </div>
               
            </div>
            <div class="d-flex gap-2 justify-content-end">
                <button type="submit" class="btn btn-primary" >Register</button>
                <button class="btn btn-danger" @click="filling=!filling">Cancel</button>
            </div>
        </form>  


                
                </div>
            </div>
        </div>

        <!-- approval officers ends -->

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">
  <a v-if="props.row.final_reading === '---' " href="javascript:void(0)" class="text-success" title="Approve" 
     @click="selectedId = props.row.id" data-bs-toggle="modal" 
     :data-bs-target="'#modal-' + props.row.id">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>

  <div class="modal fade" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Final Filling Data</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="registerFinalReading(selectedId)">
          <div class="modal-body">
            <div class="col-md-12">
                <label class="form-label">Final Reading</label>
            <input type="number" step="any" placeholder="Enter Final Reading" class="form-control" v-model="final_reading" required>
           </div>
            <div class="col-md-12">
                  <label class="form-label" >Fuel Quantity</label>
                  <input type="number" class="form-control" placeholder="Enter Fuel Quantity"  name="fuel_provided" v-model="fuel_quantity" required step="any" >
            </div>
        </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="closer">Close</button>
            <button type="submit" class="btn btn-secondary" >Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
    import { useRoute } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });

    import '@/assets/sass/scrollspyNav.scss';
    import axios from 'axios';


    useMeta({ title: 'Form Validation' });
    const route = useRoute();
    //data for fregistration

    
    //table 3
    const columns = ref(['SNo', 'date', 'fuel_used','reading_difference','supervisor', 'task','initial_reading','final_reading','ratio','actions']);
    const items = ref([]);
    const details= ref('');
    const loading = ref('');
    const fuel_quantity = ref('');
    const ratio_factor = ref(0);
    const driver_id = ref(0);
    const driver_name = ref('');
    const task = ref('');
    const initial_reading = ref('');
    const table_option = ref({
        perPage: 5,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'total_price'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search Data...',
            limit: 'Results:',
        },
        resizableColumns: false,
    });

    //fore feth the lpo detailds
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });


    const getBulkDistribution = async () => {
        loading.value=true;
        try {
            const response = await axiosInstance.get(`/distribution/${route.params.distribution_id}`);
            if (response.data ) {
                details.value=response.data;
                loading.value=false;
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching approval status: ", error);
        }
    };

    const registerMachineDistribution = () => { 
        filling.value=false;
        loading.value = true;
        const itemData = {
            machine_id: details.value.machine_id,
            fuel_quantity: 0,
            ratio_factor: ratio_factor.value,
            driver_id: driver_id.value,
            driver_name: driver_name.value,
            supervisor_id: 1,
            ratio_factor: ratio_factor.value,
            supervisor_name:  JSON.parse(localStorage.getItem("user")).name,
            usage_date: new Date().toISOString().split('T')[0],
            task: task.value,
            distribution_id: details.value.id,
            initial_reading: initial_reading.value,
        };

        axiosInstance
            .post('/fuel-usage', itemData)
            .then((response) => {
                getBulkDistribution();
                getMachineUsage();
                loading.value = false;
                if (response.data.status === 201) {
                    // fetchJobCards();
                    // this.fetchJobCards();
                } else {
                    console.error("Error registering Distribution:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error registering Distribution:", error);
            });
    };

    const final_reading=ref('');
    const registerFinalReading = (id) => { 
    document.getElementById('closer').click();
        loading.value = true;
        const readingData = {
            final_reading: final_reading.value,
            fuel_quantity:fuel_quantity.value,
        };
        axiosInstance
        axiosInstance.put(`/fuel-usage/${id}`, readingData)
            .then((response) => {

                getMachineUsage();
                loading.value = false;
              
                    alert("Final reading : "+response.data.final_reading + " Fuel Filled: "+response.data.fuel_quantity );
                    loading.value = false;

            })
            .catch((error) => {
                alert("An error has occured ..:", error.message);
                loading.value = false;
            });
    };

    const getMachineUsage = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/machine-fuel-usage/${route.params.distribution_id}`);
        if (response.data && Array.isArray(response.data)) {
            items.value = response.data.map((distribution, index) => {
                let ratio = distribution.final_reading == 0.00 ? "---" : 
                    details.value.ratio === "km/Litre"
                        ? ((distribution.final_reading - distribution.initial_reading) / distribution.fuel_quantity).toFixed(2)
                        : (distribution.fuel_quantity / (distribution.final_reading - distribution.initial_reading)).toFixed(2);

                // Ensure ratio does not exceed 50
                if (parseFloat(ratio) > 50) {
                    ratio = "---";
                }

                return {
                    SNo: index + 1,
                    id: distribution.id,
                    date: distribution.usage_date,
                    fuel_used: distribution.fuel_quantity,
                    reading_difference: distribution.final_reading == 0.00 ? "---" : (distribution.final_reading - distribution.initial_reading).toFixed(2),
                    supervisor: distribution.supervisor_name,
                    task: distribution.task,
                    initial_reading: distribution.initial_reading,
                    final_reading: distribution.final_reading == 0.00 ? "---" : distribution.final_reading,
                    ratio: ratio,
                };
            });
            loading.value = false;
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching approval status: ", error);
    }
};



    onMounted(() => {
        getBulkDistribution();
        getMachineUsage();
    });

  

    //for form 5
    const filling = ref(false);
   
    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };


</script>

<style>
.loading-text {
            font-size: 1.5rem;
            font-weight: bold;
            display: flex;
            align-items: center;
        }
        .dots span {
            animation: blink 1.5s infinite;
        }
        .dots span:nth-child(2) {
            animation-delay: 0.3s;
        }
        .dots span:nth-child(3) {
            animation-delay: 0.6s;
        }
        .dots span:nth-child(4) {
            animation-delay: 0.9s;
        }
        .dots span:nth-child(5) {
            animation-delay: 1.2s;
        }
        .dots span:nth-child(6) {
            animation-delay: 1.5s;
        }
        @keyframes blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
</style>