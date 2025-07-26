<template>
    <div class="layout-px-spacing">  
        <div class="seperator-header layout-top-spacing">
            <div class="d-flex justify-content-between mt-3">
              <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
            </div>
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




        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                         <!-- loading spinner starts -->
            <div class="mt-3 mx-2">             
             <div v-if="loading_spinner" class="text-center text-primary mt-2 mb-2">
                <span class=" text-sm">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
         
                </span>
              </div>
       </div>   
             <!-- Loading spinner ends -->
                        <v-client-table :data="Machines" :columns="columns" :options="table_option">
                            <template #actions="props">
                                <div class="actions text-center">             
                                        <router-link :to="`/report/machine-usage/${props.row.id}`" class="btn btn-primary btn-sm">View</router-link>                        
                                    &nbsp;
                                </div>
                            
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
 </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Default Order Sorting Table' });
    import axios from 'axios';
// import { get } from 'core-js/core/dict'; // Removed incorrect import
    const columns = ref(['SNo', 'name', 'type', 'category', 'capacity', 'reserve_litre', 'actions']);
    const Machines = ref([]);
    const machines_type = ref([]);
    const loading_spinner = ref(false);
    const register_machine = ref(false);
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
//    loading_spinner.value = true;
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
        console.error("Error fetching machine data:", error.message);
      })
      .finally(() => {
      //  loading_spinner = false;
      });
}

 const fetchMachineTypes = () => {
    loading_spinner.value = true;
    axiosInstance
      .get(`/machine_types`)
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

  const registerMachine = () => {
        register_machine.value = false;
        loading_spinner.value = true;
        const machineData = {
            name: machine_name.value,
            type_name:selected_machine_type.value,
            type_id:0,
            category_id:category.value,
            ratio:machine_ratio.value,
            capacity:machine_capacity.value,
            reserve_litre:machine_reserve_litre.value,
        };

        axiosInstance
            .post('/machines', machineData)
            .then((response) => {
                // clearForm();
                fetchMachines();
                loading_spinner.value = false;
              
                if (response.data.status === 201) {
                } else {
                    console.error("Error registering Machine:", response);
                }
            })
            .catch((error) => {
                console.error("Error registering machine", error);
            });
    };


 const updateMachine = (id) => {
        loading_spinner.value = true;
        const updateMachineData = {
            // name: machine_name.value,
            // type_name:selected_machine_type.value,
            // type_id:0,
            category_id:category.value,
            // ratio:machine_ratio.value,
            // capacity:machine_capacity.value,
            // reserve_litre:machine_reserve_litre.value,
        };

        axiosInstance
            .put(`/machines/${id}`, updateMachineData)
            .then((response) => {
                // clearForm();
                fetchMachines();
                loading_spinner.value = false;
                alert("updated successfully" );
                if (response.data.status === 201) {
                } else {
                    console.error("Error updating Machine:", response);
                }
            })
            .catch((error) => {
                console.error("Error updating machine..", error);
            });
    };

    onMounted(() => {
         fetchMachines();
         fetchMachineTypes();
    });

    const selectedMachine = ref(null);

    const view_row = (item) => {
            selectedMachine.value = item;
            const modal = new bootstrap.Modal(document.getElementById('machineModal'));
            modal.show();
    };


    // const view_row = (item) => {
    //     alert('ID: ' + item.id + ', Name: ' + item.name);
    // };
</script>
