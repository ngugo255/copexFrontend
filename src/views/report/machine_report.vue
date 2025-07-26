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
                  Please wait ... 
                </span>
              </div>
       </div>   
             <!-- Loading spinner ends -->
                        <v-client-table :data="fuelDistribution" :columns="columns" :options="table_option">
                            <template #actions="props">
                                <div class="actions text-center">
                                    <a href="javascript:;">
                                        <button type="button" class="btn btn-primary btn-sm">View</button>
                                    </a>
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
import { useRoute } from 'vue-router'; // ✅ Import useRoute
import { useMeta } from '@/composables/use-meta';
import axios from 'axios';

useMeta({ title: 'Default Order Sorting Table' });

const route = useRoute();

const columns = ref(['SNo', 'date_issued','driver','project', 'fuel_issued','ratio']);
const fuelDistribution = ref([]);
const loading_spinner = ref(false);
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
    sortable: ['SNo', 'date_issued', 'fuel_issued'],
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

const fetchFuelDistribution = async () => {
    loading_spinner.value = true;
    axiosInstance
        .get(`/machine-fuel-usage/${route.params.machine_id}`)
        .then((response) => {
            if (Array.isArray(response.data)) {
                fuelDistribution.value = response.data.map((distribution, index) => {
                    const difference = distribution.final_reading - distribution.initial_reading;
                    let ratio = distribution.ratio_factor === "Litre/hr" 
                        ? (distribution.fuel_quantity / difference) 
                        : (difference / distribution.fuel_quantity);
                    
                    ratio = ratio > 50 ? "---" : ratio.toFixed(2);
                    
                    return {
                        SNo: index + 1,
                        id: distribution.id,
                        driver:distribution.driver,
                        date_issued: distribution.usage_date,
                        project: distribution.project,
                        fuel_issued: distribution.fuel_quantity + ' Litres',
                        ratio_factor: distribution.ratio_factor,
                        ratio
                    };
                });
            } else {
                console.error("Invalid response format");
            }
        })
        .catch((error) => {
            console.error("Error fetching machine data:", error);
        })
        .finally(() => {
            loading_spinner.value = false;
        });
};

onMounted(() => {
    fetchFuelDistribution();
});
</script>
