<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Jobcard</a></li>
                                <li class="breadcrumb-item"><a href="javascript:;">Details</a></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <button class="mb-2 btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                                                <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

   <div class="d-flex mb-3">
    <div class="ms-auto">
          <button
           v-if="jobcard?.status_name === 'Active'"
          @click="updateJobcard()"
          class="btn btn-success me-2">

          <span v-if="completing">
            <span class="spinner-border spinner-border-sm text-white ms-2" role="status" aria-hidden="true"></span>
          </span>
          <span v-else>
           Mark as Completed
          </span>
          </button>
            <button class="btn btn-primary me-2" @click="printJobcard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-1">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    Print Jobcard
                </button>
    </div>

            </div>
  <!-- jobcard details starts -->

  <div  class="row ">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
                <div class="custom-table table3 shadow">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Jobcard No</th>
                                <th> {{ machine?.category?.name }}</th>
                                <th>Date</th>
                                <th>Service Type</th>
                                <th>Current Kms </th>
                                <th>Next Kms</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td v-if="jobcard">{{ jobcard.id }}</td>
                                <td v-if="jobcard">{{ machine?.name }}</td>
                                <td v-if="jobcard">{{ jobcard.date_created }}</td>
                                <td v-if="jobcard">{{ jobcard.service_type }}</td>
                                <td v-if="jobcard">{{ jobcard.current_km_of_service?.toLocaleString() ?? '---' }}</td>
                                <td v-if="jobcard">{{ jobcard.next_km_of_service?.toLocaleString() ?? '---' }}</td>
                                <td v-if="jobcard" > {{  jobcard.status_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
         <!-- jobcard details ends -->
                       <!-- div with clear defect work and items used starts -->
        <div class ="row text-center">
            <div class="col-md-6 mt-3 ">
                 <h4>DEFECTS REPORTED</h4>
                 <div class="d-flex mt-2"
                   v-if="jobcard?.status_name === 'Active'"
                 >
            <div class="ms-auto">
            <button v-if="!add_defect " type="button" class="btn btn-outline-primary mb-2" @click="add_defect=!add_defect">
                <template v-if="d  && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
            </button>
            <button v-else type="button" class="btn btn-danger mb-2"  @click="add_defect=!add_defect">
              X
            </button>
        </div>
           </div>
           <!-- defect form starts -->
           <form v-if="add_defect" @submit.prevent="registerDefect">

<textarea v-model="defect_description" class="form-control" placeholder="Add New Defect" style="height:100px" required></textarea>

<div class="d-flex mt-2">
<button type="submit" class=" ms-auto btn btn-primary mb-1" >Submit</button>

</div>

</form>
            <!-- defect form ends -->
           
                 <ol class="list-group list-group-numbered shadow">
        <li 
            v-for="defect in defects" 
            :key="defect.id" 
            class="list-group-item d-flex justify-content-between align-items-start"
       
            >
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    {{ defect.description }}
                </div>
            </div>
            <div 
              v-if="jobcard?.status_name === 'Active'"
              >
            <span 
                v-if="defect.status_id == 1" 
                class="text-success"
            >
                completed
            </span>
            <span v-else >
                  <span 
                  v-if="deleting === defect.id "
                  class="spinner-border spinner-border-sm text-danger ms-2 me-3" role="status" aria-hidden="true"></span> 
                <svg
                v-else
                style="cursor:pointer"
                @click="deleteLog(defect.id)"
                 xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="me-3 text-danger bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                <template v-if="loading_spinner && defect.showHover">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg 
                    style="cursor:pointer"
                     @click="updateDefectStatus(defect)"
                    xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class=" text-success bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>
    
                </template>
            </span>
            </div>
            <div v-else>
<span 
                v-if="defect.status_id == 1" 
                class="text-success"
            >
                completed
            </span>
            <span v-else class="text-danger">
              Incomplete
            </span>
            </div>
        </li>
    </ol>
                <h4 class="mt-4">WORK CARRIED OUT</h4>
                <div class="d-flex mt-2"
                v-if="jobcard?.status_name === 'Active'"
                >
            <div class="ms-auto">
                <button v-if="!add_work" type="button" class="btn btn-outline-primary mb-2"  @click="add_work=!add_work">
                    <template v-if="w && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
            </button>
            <button v-else type="button" class="btn btn-danger mb-2"  @click="add_work=!add_work">
              X
            </button>
        </div>
           </div>
           <!-- work carried out form starts -->
           <form v-if="add_work" @submit.prevent="registerWorkDone">
              <textarea class="form-control"  v-model="workdone_description" placeholder="Add New Work Carried Out" style="height:100px" required></textarea>
             <div class="d-flex mt-2">
               <button type="submit" class=" ms-auto btn btn-primary mb-2 ">Submit</button>
             </div>

            </form>

            <!-- work carried out form ends -->
                <ol class="list-group list-group-numbered shadow">
        <li 
            v-for="work in work_carried_out" 
            :key="work.id" 
            class="list-group-item d-flex justify-content-between align-items-start"
        >
            <div class="ms-2 me-auto">
                <div class="fw-bold">{{ work.description }}</div>
            </div>
        </li>
    </ol>
            </div>
            <div class="col-md-6">
                <h4>SPARES USED</h4>
                <div class="d-flex mt-2"
                  v-if="jobcard?.status_name === 'Active'"
                >
<div class="ms-auto">
    <button v-if="!add_usage" type="button" class="btn btn-outline-primary mb-2"  @click="add_usage=!add_usage">
        <template v-if="s && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
     </button>
     <button v-else type="button" class="btn btn-danger mb-2"  @click="add_usage=!add_usage">
      X
     </button>
</div>
</div>
                <!-- spare used form starts -->
                <form v-if="add_usage" @submit.prevent="registerItemUsage">
<div class="row mb-4 container">
    <div class="col-sm-6">
        <Multiselect
  v-model="spare_usage"
  :options="spares"
  :close-on-select="true"
  label="name"
  value-prop="id"
  placeholder="Select a spare"  
  @change="handleDescriptionChange"
  :required="!machine_field"
  :searchable="true" 
/>
    </div>
    <div class="col-sm-6">
      <input type="number" v-model="usage_quantity" class="form-control" placeholder="Quantity Used">
    </div>
    <div class="col-sm-12 mt-2">
      <input type="text" v-model="usage_description" class="form-control" placeholder="Usage Descriptions">
    </div>
    <div class="d-flex">
        <div class="ms-auto">
            <button type="submit" class="mt-2  btn btn-primary ms-auto">
            Submit
        </button>
        </div>     
    </div>
</div>

</form>
                 <!-- spares used form ends -->
                <!-- items used table starts -->
<div class="row layout-top-spacing ">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table shadow">
                        <v-client-table :data="items" :columns="columns" :options="table_option">
                            <template
                             #actions="props" >
                                <div class="actions text-center">
                                   <a href="javascript:;" class="cancel" @click="deleteItemUsage(props.row.id)" title="Delete Spare Usage Record">
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
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
 <!-- items used table ends -->

                <div class="d-flex mt-2">
<div class="ms-auto">
<button v-if="!add_tyre" type="button" class="btn btn-outline-primary mb-2" @click="add_tyre = true">
        <template v-if="s && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
     </button>
<button v-else type="button" class="btn btn-danger mb-2" @click="add_tyre = false">
  X
</button>
</div>
</div>

                 <form v-if="add_tyre" @submit.prevent="registerTyreUsage">
<div class="row mb-4 container">
    <div class="col-sm-4">
      <input type="text" v-model="tyre_no" class="form-control" placeholder="Tyre Number" required>
    </div>
    <div class="col-sm-4">
      <input type="date" v-model="date_changed" class="form-control" placeholder="Date Changed" required>
    </div>
    <div class="col-sm-4">
      <input type="date" v-model="date_removed" class="form-control" placeholder="Date Removed">
    </div>
    <div class="d-flex">
        <div class="ms-auto">
            <button type="submit" class="mt-2 btn btn-primary ms-auto">
              <span v-if="loading_spinner">
                <span class="spinner-border spinner-border-sm text-white ms-2" role="status" aria-hidden="true"></span>
              </span>
              <span v-else>
                Submit
              </span>
            </button>
        </div>     
    </div>
</div>
</form>

      <!-- Tyres table -->
                   <div class="text-center">
                <h4>TYRES USED</h4>
                </div>


<div class="row layout-top-spacing ">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table shadow">
                        <v-client-table :data="Tyres" :columns="Tyrescolumns" :options="table_option">
                            <template #actions="props">
                                <div class="actions text-center">
                                   <!-- <a href="javascript:;" class="cancel" @click="deleteItemUsage(props.row.id)" title="Delete Spare Usage Record">
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
                                    </a> -->
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    <!-- Tyres table ends -->



            </div>
        </div>
        <!-- div with clear de... ends -->

      
    

       </div>


</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref,inject, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/scrollspyNav.scss';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const loadingIndicator = inject('loadingIndicator');
    const tyre_no = ref('');
    const date_changed = ref('');
    const date_removed = ref('');
    const add_tyre = ref(false);
    const Tyres = ref([]);
    const Tyrescolumns = ref(['SNo', 'tyre_no','date_changed','date_removed']);
    const completing = ref(false)
    const d = ref(false);
    const w = ref(false);
    const s = ref(false);
    const add_defect = ref(false);
    const add_work = ref(false);
    const add_usage=ref(false);
    const defects = ref([]);
    const work_carried_out = ref([]);
    const workdone_description = ref('');
    const defect_description = ref('');
    const usage_id=ref(0);
    const spare_usage=ref('');
    const usage_quantity=ref(null);
    const usage_description = ref(''); 
    const loading_spinner = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const items = ref([]);

const columns = computed(() => [
  'SNo',
  'spare',
  'description',
  'unit',
  'quantity',
  ...(jobcard.value?.status_name === 'Active' ? ['actions'] : [])
]);


    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'spare'],
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


const updateJobcard = async () => {
    completing.value = true
    try {
        const payload = {
            status_name: "Completed",
            status_color: "success"
        };
        await axiosInstance.put(`/job-card/${route.params.jobcard_id}`, payload);
        jobcard.value.status_name = 'Completed';
        showMessage("Card Completed successfully");
        completing.value = false;
    } catch (error) {
        showError(error.message);
        console.log(error)
      completing.value = false
    }
};




    const getTyres = async () => {
        try {
            const response = await axiosInstance.get(`jobcard-tyre?asset_id=${route.params.machine_id}`);
            console.log(response.data);
            if (Array.isArray(response.data)) {
                Tyres.value = response.data.map((item, index) => ({
                    ...item, // Spread the original item properties
                    SNo: index + 1,
                }));
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            showError(error.message);
            loading_spinner.value=false;
        }
    };

       const registerTyreUsage = async () => {
    loading_spinner.value = true;
    try {
        const payload = {
            asset_id: route.params.machine_id,
            tyre_no: tyre_no.value,
            date_changed: date_changed.value,
            date_removed: date_removed.value,
        };
        console.log('Payload being sent to server:', payload);

        const response = await axiosInstance.post('/tyres', payload);

        console.log('Server Response:', response);
        console.log('Response Data:', response.data);

        getTyres();
        showMessage("Tyre usage registered successfully");

        // Reset form
        tyre_no.value = '';
        date_changed.value = '';
        date_removed.value = '';

        loading_spinner.value = false;
    } catch (error) {
        showError(error.message);
        loading_spinner.value = false;
    }
};

const updateDefectStatus = async (defect) => {
   d.value=true;
    loading_spinner.value=true;
    try {
        const payload = {
            status_id: 1,
        };
        await axiosInstance.put(`/maintainance-log/${defect.id}`, payload);
        defect.status_id = 1; 
        showMessage("Defect status updated successfully");
        loading_spinner.value = false;
        d.value=false;
    } catch (error) {
        showError(error.message);
      d.value=false;
    }
};

    const route = useRoute();
    const jobcard = ref({});
    const getJobcard = () => {
        loading_spinner.value=true;
            axiosInstance.get(`/job-card/${route.params.jobcard_id}`).then((response) => {
            jobcard.value = response.data;
            loading_spinner.value=false;
        }).catch((error) => {
            showError(error.message);
            console.log(error)
            loading_spinner.value=false;
        });
    };


    const registerDefect = async () => {
        d.value=true;
        loading_spinner.value=true;
        add_defect.value = false;
        try {
            const payload = {
                job_card_id: jobcard.value.id,
                issue_type: 'defect',
                description: defect_description.value,
                reported_by:JSON.parse(localStorage.getItem("user")).name,
                status_id: 0,
            };
            const response = await axiosInstance.post('/maintainance-log', payload);
            getMaintainanceLogs();
            defect_description.value='';
            showMessage("Defect registered successfully");
            loading_spinner.value=false;
        } catch (error) {
            showError(error.message);
            d.value=false;
            loading_spinner.value=false;
        }
    };

    
    const registerWorkDone = async () => {
        w.value=true;
        add_work.value=!add_work.value;
        loading_spinner.value=true;
        try {
            const payload = {
                job_card_id: jobcard.value.id,
                issue_type: 'work_done',
                description: workdone_description.value,
                reported_by:JSON.parse(localStorage.getItem("user")).name,
                status_id: 1,
            };
            const response = await axiosInstance.post('/maintainance-log', payload);
            getMaintainanceLogs();
            showMessage("Work Carried registered successfully");
            workdone_description.value='';
            w.value=false;
            loading_spinner.value=false;
        } catch (error) {
            showError(error.message);
            w.value=false;
            loading_spinner.value=false;
        }
    };

    const registerItemUsage = async () => {
        add_usage.value=!add_usage.value;
        loading_spinner.value=true;
        s.value=true;
        try {
            const usageData = {
                jobcard_id: jobcard.value.id,
                description: usage_description.value,
                item_name:spare_usage.value.name,
                item_id:spare_usage.value.id,
                quantity:usage_quantity.value,
            };
            const response = await axiosInstance.post('/item-usage', usageData);
            getItemUsage();
            showMessage("Item usage registered successfully");
            spare_usage.value='';
            usage_description.value='';
            spare_usage.value='';
            usage_quantity.value=null;
            loading_spinner.value=false;
            s.value=false;
        } catch (error) {
            console.log(error)
            showError(error.message);
            s.value=false;
            loading_spinner.value=false;
        }
    };


    const maintainanceLog = ref([]);

    const getMaintainanceLogs = async () => {
        try {
            const response = await axiosInstance.get(`/job-card-maintainance-log/${route.params.jobcard_id}`);
            if (Array.isArray(response.data)) {
                maintainanceLog.value = response.data;
                defects.value = maintainanceLog.value.filter(log => log.issue_type === 'defect');
                work_carried_out.value = maintainanceLog.value.filter(log => log.issue_type === 'work_done');
            } else {
              showError("Invalid response format");
              loading_spinner.value=false;
            }
        } catch (error) {
            showError(error.message);
            loading_spinner.value=false;
        }
    };

    const getItemUsage = async () => {
        try {
            const response = await axiosInstance.get(`/job-card-item-usage/${route.params.jobcard_id}`);
            if (Array.isArray(response.data)) {
    items.value = response.data.map((item, index) => ({
        ...item, // Spread the original item properties
        SNo: index + 1,
        id:item.id,
        spare: item.spare.name + (item.spare.part_number ? ' - ' + item.spare.part_number : ''),
        unit : item.spare.unit ??'nill'
    }));
}
else {
                console.error("Invalid response format");
            }
        } catch (error) {
            showError( error.message);
            loading_spinner.value=false;
        }
    };

    const spares = ref([]);

const getSpares = async () => {
    try {
        const response = await axiosInstance.get(`/spares`);
        if (Array.isArray(response.data.data)) {
          spares.value = response.data.data.map((item, index) => ({
    ...item,
    name: item.name + (item.part_number ? ' - ' + item.part_number : '')
}));


        } else {
           showError("Invalid response format");
           loading_spinner.value=false;
        }
    } catch (error) {
        showError(error.message);
        loading_spinner.value=false;
    }
};

const deleting = ref('')
const deleteLog = async (id) => {
    deleting.value = id;
    if (confirm("Are you sure you want to delete this log?")) {
        await axiosInstance.delete(`/maintainance-log/${id}`);
        await getMaintainanceLogs();
        deleting.value= '';
        showMessage('deleted')
    }else{
        deleting.value= ''; 
        showMessage('Cancelled')
    }
};


const machine = ref('')
const getMachine = async () => {
    try {
        const response = await axiosInstance.get(`/machines/${route.params.machine_id}`);
        machine.value = response.data
    } catch (error) {
        showError(error.message);
    }
};

  const printJobcard = () => {
    // Format date function
    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Create the print content with styling
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jobcard No:${jobcard.value?.id || ''}</title>
           <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 10px;
                }
                .section {
                    margin-bottom: 20px;
                }
                h2 {
                    color: #2c3e50;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 15px;
                }
                th, td {
                    border: 1px solid #999;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: 500;
                }
                td {
                    font-weight: 300;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                }
                .jobcard-info-table {
                    width: 100%;
                }
                .jobcard-info-table th,
                .jobcard-info-table td {
                    width: 16.66%; /* Equal width for 6 columns */
                    min-width: 120px; /* Minimum width for each column */
                }
                .data-table {
                    width: 100%;
                }
                .data-table th,
                .data-table td {
                    padding: 8px 12px;
                }
            </style>
            <script>
                 window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 0.1);
                    }, 0.1);
                }
                window.onafterprint = function() {
                    setTimeout(function() {
                        window.close();
                    }, 0.1);
                };
            <\/script>
        </head>
        <body>
            <div class="header">
                <h1>Details for Jobcard </h1> 
            </div>
            
            <div class="section">
                <h2>Jobcard Information</h2>
                <table class="horizontal-table">
                    <tr>
                        <th>Jobcard No</th>
                        <th>${machine.value?.category?.name}</th>
                        <th>Date</th>
                        <th>Service Type</th>
                        <th>Current KM</th>
                        <th>Next KM</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>00${jobcard.value?.id || 'N/A'}</td>
                        <td>${machine?.value?.name}</td>
                        <td>${formatDate(jobcard.value?.date_created)}</td>
                        <td>${jobcard.value?.service_type || 'N/A'}</td>
                        <td>${jobcard.value?.current_km_of_service || 'N/A'}</td>
                        <td>${jobcard.value?.next_km_of_service || 'N/A'}</td>
                        <td>${jobcard.value?.status_name || 'N/A'}</td>
                    </tr>
                </table>
            </div>
            
            <div class="section">
                <h2>Defects Detected</h2>
                ${defects.value.length > 0 ? 
                    '<table><thead><tr><th>S.No</th><th>Description</th><th>Reported By</th><th>Status</th></tr></thead><tbody>' +
                    defects.value.map((defect, index) => 
                        '<tr><td>' + (index + 1) + '</td><td>' + defect.description + '</td><td>' + 
                        defect.reported_by + '</td><td>' + (defect.status_id === 1 ? 'Fixed' : 'Pending') + '</td></tr>'
                    ).join('') +
                    '</tbody></table>'
                : '<p>No defects reported</p>'}
            </div>
            
            <div class="section">
                <h2>Work Carried Out</h2>
                ${work_carried_out.value.length > 0 ? 
                    '<table><thead><tr><th>S.No</th><th>Description</th><th>Reported By</th></tr></thead><tbody>' +
                    work_carried_out.value.map((work, index) => 
                        '<tr><td>' + (index + 1) + '</td><td>' + work.description + '</td><td>' + work.reported_by + '</td></tr>'
                    ).join('') +
                    '</tbody></table>'
                : '<p>No work carried out</p>'}
            </div>
            
            <div class="section">
                <h2>Spares Used</h2>
                ${items.value.length > 0 ? 
                    '<table><thead><tr><th>S.No</th><th>Spare</th><th>Unit</th><th>Description</th><th>Quantity</th></tr></thead><tbody>' +
                    items.value.map(item => 
                        '<tr><td>' + item.SNo + '</td><td>' + item.spare + '</td><td>' +  item.unit + '</td><td>' + 
                        item.description + '</td><td>' + item.quantity + '</td></tr>'
                    ).join('') +
                    '</tbody></table>'
                : '<p>No spares used</p>'}
            </div>
            
            <div class="footer">
                <p>Printed on: ${formatDate(new Date())}</p>
            </div>
        </body>
        </html>
    `;
    
    // Write to the new window
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
};

  
const deleteItemUsage = (id) => {
    if (window.Swal) {
        window.Swal.fire({
            title: 'Delete Spare Usage Record',
            text: 'Are you sure you want to delete this spare usage record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    loading_spinner.value = true;
                    await axiosInstance.delete(`/item-usage/${id}`);
                    showMessage(' deleted successfully!');
                    await getItemUsage();
                } catch (error) {
                    showError(error.message || 'Delete failed');
                    console.error('Delete error:', error);
                } finally {
                    loading_spinner.value = false;
                }
            }
        });
    }
};


    onMounted(() => {
        getJobcard()
        getMaintainanceLogs()
        getItemUsage()
        getSpares()
        getMachine()
        getTyres()
    });

   
</script>
