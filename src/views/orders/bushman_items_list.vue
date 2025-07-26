<template>
    <div class="layout-px-spacing">

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

        <!-- approval officers starts -->

    <div v-if="approval_status" class="row layout-top-spacing">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
                <!-- close button starts -->
                 <div class="d-flex">
                    <h6 class="text-center mt-2 mx-2">Approval Status</h6>
                    <button class="btn-close ms-auto bg-danger me-3 mt-2" @click="approval_status=!approval_status"></button>
                  </div>  
                 <!-- close button ends -->
                <div class="custom-table table3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Operation's Dept</th>
                                <th>Project Manager</th>                                
                                <th>Sr.Accountant</th>
                                <th>MD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td :class="approval_status_data.operation_department === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.operation_department === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.operation_department === 0 && is_operator" @click="approveCheck(approval_status_data.id, 'operation_department'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </td>
                                <td :class="approval_status_data.project_manager === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.project_manager === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.engineer === 0 && is_project_manager" @click="approveCheck(approval_status_data.id, 'project_manager'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </td>
                                <!-- <td :class="approval_status_data.quantity_surveyor === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.quantity_surveyor === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.quantity_surveyor === 0 && is_qs" @click="approveCheck(approval_status_data.id, 'quantity_surveyor'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </td> -->
                                <td :class="approval_status_data.senior_accountant === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.senior_accountant === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.senior_accountant === 0 && is_sa" @click="approveCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </td>
                                <!-- <td :class="approval_status_data.financial_controller === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.financial_controller === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.financial_controller === 0 && is_fc" @click="approveCheck(approval_status_data.id, 'financial_controller'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </td> -->
                                
    <td :class="approval_status_data.managing_director === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.managing_director === 0 ? 'Unapproved' : 'Approved' }}
                                    <button v-if="approval_status_data.managing_director === 0 && is_md" @click="approveCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Approve</div>
                                    </button>
                                    <button v-if="approval_status_data.managing_director === 1 && is_md" @click="approveUnCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-danger p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Unapprove</div>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
         <!-- approval officers ends -->
          
              <!-- form button starts -->
 
<div class="d-flex me-4 mt-2">
    <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
    <button v-if="!approval_status" class="btn btn-secondary btn-sm" @click="approval_status=!approval_status">   
        <span >View Checking Status</span>
    </button>
                        <div class="ms-auto">
                            <a  v-if="order_status !== 'Inactive'" :href="`${print_url}bushman-lpo-pdf/${route.params.order_id}`" 
                                  class="text-success me-3" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a>
                                <a v-if="order_status === 'Inactive'" href="javascript:void(0)" class="me-2 text-warning" title="Approve" data-bs-toggle="tooltip" data-bs-placement="top"  @click="activatePurchaseOrder(route.params.order_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                                </a>
                            <button v-if="order_status === 'Inactive'" class="btn btn-primary" @click="item_registration=!item_registration">                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
                    <!-- form button ends -->
                     
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
 <form v-if="item_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerItem">
        <h4 class="text-center">ITEM  REGISTRATION FORM</h4>
        <div class="row mb-2">
            <div class="col-md-3">
                <label class="form-label">Description of good</label>
                <select class="form-select" v-model="description" @change="handleDescriptionChange" :required="!machine_field">
                    <option value="">Select Item</option>
                    <option v-for="item in items_list" :value="item.name">{{ item.name }}</option>
                    <option value="Direct">Direct</option>
                </select>
            </div>
            <div v-if="machine_field" class="col-md-3">
                <label class="form-label">Select Machine</label>
                <select class="form-select" v-model="selectedMachine" @change="description = selectedMachine">
                    <option value="">Select Machine</option>
                    <option v-for="machine in machines" :key="machine.id" :value="machine.name">
                        {{ machine.name }}
                    </option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label">Unit of measurement</label>
                <select class="form-select" v-model="unit" required>
                    <option value="">Select Unit</option>
                    <option value="Litre">Litre</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label">Quantity</label>
                <input type="number" class="form-control" placeholder="Enter Quantity" v-model="quantity" step="any" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Rate</label>
                <input type="number" class="form-control" placeholder="Enter Rate" v-model="rate" step="any" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Amount</label>
                <input type="text" class="form-control" :value="amount.toLocaleString()" readonly>
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
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">
                                <a href="javascript:void(0)" class="text-success" title="Approve" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                                </a>

                        
                                <!-- <router-link :to="'/requisition-list/' + props.row.id" class="text-primary"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link> -->

                                <router-link :to="'/requisition-list/'" class="text-primary"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link>


                                <a href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
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
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });
    import { useRoute } from 'vue-router';

    const route = useRoute();
   
   
    //table 3
    const columns = ref(['SNo', 'description', 'units','quantity', 'rate', 'amount']);
    const items = ref([]);
    const item_registration = ref(false);
    const description = ref('');
    const machines = ref([]);
    const unit = ref('');
    const machine_field = ref(false);
    const quantity = ref('');
    const rate = ref('');
    const order_status= ref('');
    const amount = ref(0);
    const loading_spinner = ref(false);
    const approval_status = ref(true);
    const spinner = ref(false);
    const print_url = ref(process.env.VUE_APP_API_BASE_URL);
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    import { inject } from 'vue';

   const showMessage = inject('showMessage');
   const showError = inject('showError');

    watch([quantity, rate], () => {
        amount.value = quantity.value * rate.value;
    });
    const table_option = ref({
        perPage: 5,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'first_name', 'last_name', 'email', 'phone'],
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





    //for togle machine
    const handleDescriptionChange = () => {
        if (description.value === 'Direct') {
            fetchMachines();
            machine_field.value = true;
        } else {
            machine_field.value = false;
        }
    };

   //fetching machine list
   const  fetchMachines= async () => {
   // loading_spinner = true;
    axiosInstance
      .get(`/machines`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          machines.value = response.data.map(machine => ({
            id: machine.id,
            name: machine.name,
            type: machine.type_name,          
          }));
        } else {
        error_message.value = "Error fetching machine data: " + error.message;
        console.error(error_message.value);
        }
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error.message);
        
      }
      
    )
     
      .finally(() => {
      //  loading_spinner = false;
      });
}


    const registerItem = () => {
        item_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            order_id: route.params.order_id,
            description: description.value,
            unit_measure:unit.value,
            quantity:quantity.value,
            rate:rate.value,
        };

        axiosInstance
            .post('/items', itemData)
            .then((response) => {
                getItems();
                loading_spinner.value = false;
                if (response.data.status === 201) {
                    description.value = '';
                    unit.value = '';
                    quantity.value = '';
                    rate.value = '';
                   showMessage("Item registered successfully");
                } else {
                   showError(response.data.message);
                }
            })
            .catch((error) => {
                showError(error.message);
            });
    };

    const getItems = async () => {
        loading_spinner.value = true;
        try {
            const response = await    
            axiosInstance.get(`/order-items/${route.params.order_id}`);
            if (response.data && Array.isArray(response.data)) {
                    items.value = response.data.map((order, index) => ({
                        SNo: index + 1,
                        id: order.id,
                        description: order.description,
                        units: order.unit_measure,
                        quantity: order.quantity.toLocaleString(),
                        rate: Number(order.rate).toLocaleString(),
                        amount: (order.quantity * order.rate).toLocaleString(undefined, { maximumFractionDigits: 3 })
                    }));
                    loading_spinner.value = false;
                } else {
                    console.error("Invalid response format");
                }
        } catch (error) {
            console.error("Error fetching purchase order : ", error);
        }
    };

    const approval_status_data = ref({});

    const getApprovalStatus = async () => {
        try {
            const response = await axiosInstance.get(`/approval-check-status/${route.params.order_id}`);
            if (response.data && typeof response.data === 'object') {
                approval_status_data.value = response.data;
                spinner.value=false;
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching approval status: ", error);
        }
    };

    const items_list = ref([]);
    const getItemsList = async () => {
        try {
            const response = await axiosInstance.get(`/item-list`);
            if (response.data && Array.isArray(response.data)) {
                items_list.value = response.data;
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching approval status: ", error);
        }
    };

    const approveCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 1
            });
            getApprovalStatus();
            showMessage("Aproved Successfully");
        } catch (error) {
            console.error("Error approving check:", error.message);
        }
    };

    const getPurchaseOrder = async () => {
    try {
        const response = await axiosInstance.get(`/purchase-order/${route.params.order_id}`);
        if (response.data) {
            order_status.value = response.data.status_name;
            console.log("order status ",order_status.value);
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching purchase order: ", error);
    } finally {
        loading_spinner.value = false;
    }
};  
    const is_project_manager = ref(false);
    const is_operator = ref(false);
    const is_engineer = ref(false);
    const is_md= ref(false);
    const is_fc= ref(false);
    const is_qs= ref(false);
    const is_sa= ref(false);


    const activatePurchaseOrder = (id) => {
        loading_spinner.value = true;
        const activationData = {
            status_name: 'Unapproved',
            status_color: 'secondary',
        };
        
        if (confirm("Are you sure you want to Confirm this Order?")) {
            axiosInstance
                .put(`/purchase-order/${id}`, activationData)
                .then((response) => {
                    getPurchaseOrder();
                    loading_spinner.value = false;
                })
                .catch((error) => {
                    console.error("Error activating order:", error.message);
                    loading_spinner.value = false;
                });
        } else {
            loading_spinner.value = false;
        }
    };


    const approveUnCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 0
            });
            showMessage("Unapproved Successfully")
            getApprovalStatus();
        } catch (error) {
            showError(error.message);
            console.error("Error approving check:", error.message);
        }
            const response = await axiosInstance.put(`/purchase-order/${route.params.order_id}`, {
                        status_name: "Unapproved",
                        status_color:"secondary",
                    });
    };


    onMounted(() => {
        getPurchaseOrder();
        getItemsList();
        getApprovalStatus();
        getItems();
    const storedUser = localStorage.getItem("user");
    const user=ref(null);
    if (storedUser) {
       user.value = JSON.parse(storedUser);
       
       if(user.value.role == 2){
         is_md.value=true;
       }
       if(user.value.role == 3){
         is_fc.value=true;
       }
       if(user.value.role == 4){
        is_sa.value=true;
       }
       if(user.value.role == 5){
        is_qs.value=true;
       }
       if(user.value.role == 6){
        is_engineer.value=true;
       }
       if(user.value.role == 7){
        is_operator.value=true;
       }
       if(user.value.role == 10){
        is_project_manager.value=true;
       }
    }
    });


</script>
