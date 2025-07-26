<template>   
    <div class="layout-px-spacing">
        <!-- Breadcrumb -->
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">On Account Payment</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>

        <!-- Filters Section -->
        <div class="row mb-4 justify-content-center align-items-center" >
            <div class="col-md-4">
                <div class="form-group">
                    <label>Company</label>
                    <select 
                        class="form-control" 
                        v-model="company_id" 
                        @change="getPaymentRecords()"
                    >
                        <option value="">All Companies</option>
                        <option :value="6">COPEX</option>
                        <option :value="5">BUSHMAN</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Budget Type</label>
                    <select 
                        class="form-control" 
                        v-model="selectedTypes"
                        @change="getPaymentRecords()"
                    >
                        <option value="">All Types</option>
                        <option value="budgeted">Budgeted</option>
                        <option value="un_budgeted">Unbudgeted</option>
                    </select>
                </div>
            </div>
        </div>        
        <div  >
        <button  class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
        </button>
        
        <div v-if="user_permissions.includes('can_add_payment_record')" class="d-flex me-4 gap-3">
            <div  class="ms-auto">
                <button v-if="is_closed" class="btn btn-primary" @click="payment_registration= true; is_closed = false; ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
                <button v-else class="btn btn-danger" @click="payment_registration = false; is_closed = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
          <div class="text-right mb-3">
            <button 
                class="btn btn-success"
                @click="printPaymentRecords(items,selectedTypes);"
                :disabled="loading_spinner || selectedTypes === ''"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                </svg>
               
            </button>
        </div>
        </div>


        <form v-if="payment_registration" class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="recordPayment">
           <h4 class="text-center">M-PESA PAYMENT TRANSCTION REGISTRATION FORM </h4>                  
           <div class="row mb-2">

            <div   class="col-md-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" v-model="date_created" name="date" required>
            </div>     
            <div class="col-md-3">
              <label class="form-label">Batch NO</label>
              <input type="text" placeholder="Enter Batch Number" class="form-control" v-model="batch_no" name="Vendor_name" required>
          </div>   
           <div class="col-md-3">
              <label class="form-label">Beneficiary Name</label>
              <input type="text" placeholder="Enter Beneficiary Name" class="form-control" v-model="beneficiary_name" name="Vendor_name" required>
          </div>       
           <div class="col-md-3">
              <label class="form-label">LPO Number / Document Number</label>
              <!-- <multiselect
        v-model="lpo_number"
        :options="LPo_numbers"
        :multiple="false"
        :searchable="true"
        label="lpo_number"
        required 
        :placeholder="'Select LPO Number'"
        ></multiselect> -->
          <input type="text" placeholder="Enter lpo/document number " class="form-control" v-model="lpo_number" name="Vendor_name" required>
          </div>          
          <div class="col-md-3">
              <label class="form-label">Project</label>
             <input type="text" placeholder="Enter project name" class="form-control" v-model="project" name="Vendor_name" required>
          </div>         
          <div   class="col-md-3">
              <label class="form-label">Amount</label>
              <input type="number" placeholder="Enter Amount" class="form-control" v-model.number="amount" name="Vendor_name" required>
          </div>
          <div   class="col-md-3">
              <label class="form-label">Account/Phone</label>
              <input type="text" placeholder="Enter phone / account" class="form-control" v-model="payment_number" name="Vendor_name" required>
          </div>
           <div class="col-md-3">
                    <label class="form-label">Budget Type</label>
        <multiselect
        v-model="budget_type"
        :options="['budgeted ', 'un_budgeted']"
        :multiple="false"
        :searchable="true"
        required 
        :placeholder="'Select Budget Type'"
        ></multiselect>
            </div>
            <div   class="col-md-12">
              <label class="form-label">Purpose Of Payment</label>
            <textarea name="" placeholder="Enter Purpose of payment" class="form-control md-2" v-model="description" id=""></textarea>
           </div>
            </div>
            <div class="text-center gap-2 justify-content-end">
                <button type="button" class="btn btn-danger me-3" @click="payment_registration = false;add_vendor=false;is_closed=true">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        
        </form>
        <div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
   <div>
        <div  class="text-center"><h4>M-PESA PAYMENT TRANSACTION RECORDS FOR <span v-if="company_id==5">BUSHMAN</span> <span v-else-if="company_id==6">COPEX</span>  <span v-else>ALL COMPANY</span> </h4></div>
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="row mb-3 d-flex justify-content-center align-items-center">
                    <div v-if="selectedTypes==='budgeted' || selectedTypes===''" class="col-md-5">
                        <div class="card">
                            <div class="card-body d-flex align-items-center">                               
                                <div>
                                    <h5 class="card-title">Total Budgeted</h5>
                             <strong>       <h5 class="card-text text-success fw-4">{{ Number(totalBudgeted).toLocaleString() }} Tsh</h5></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  v-if="selectedTypes === 'un_budgeted' || selectedTypes === ''" class="col-md-5">
                        <div class="card">
                            <div class="card-body d-flex align-items-center">                                
                                <div>
                                    <h5 class="card-title">Total Unbudgeted</h5>
                                 <strong>    <h5 class="card-text text-warning fw-3 ">{{ Number(totalUnbudgeted).toLocaleString() }} Tsh</h5></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option"                            
                        >
                            <template #status="props" >
                                <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                            </template>
                            <template #actions="props" >
                                
                                <svg  
                                v-if="user_permissions.includes('can_edit_payment_record')"
                                class="w-6 h-6 text-gray-800 dark:text-white" 

                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                              @click="openEditModal(props.row)" 
                              >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
  
    <!-- Modal -->
                          <teleport to="body">
  <div v-if="show_modal" class="modal fade show d-block " role="dialog">
    <div class="modal-dialog modal-dialog modal-xl ">
      <div class="modal-content d-flex flex-column" style="block-size: auto;">
        <div class="modal-header">
          <h5 class="modal-title">Editing Form for Payment {{ voucher_number }} </h5>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
           <div v-if="loading_update" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
        <form  v-else class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="updatePaymentRecord">
                      
           <div class="row mb-2">

            <div   class="col-md-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" v-model="date_created" name="date" required>
            </div>     
            <div class="col-md-3">
              <label class="form-label">Batch NO</label>
              <input type="text" class="form-control" v-model="batch_no" name="Vendor_name" required>
          </div>   
           <div class="col-md-3">
              <label class="form-label">beneficiary_name</label>
              <input type="text" class="form-control" v-model="beneficiary_name" name="Vendor_name" required>
          </div>       
           <div class="col-md-3">
              <label class="form-label">LPO Number</label>            
          <input type="text" class="form-control" v-model="lpo_number" name="Vendor_name" required>
          </div>          
          <div class="col-md-3">
              <label class="form-label">Project</label>
             <input type="text" class="form-control" v-model="project" name="Vendor_name" required>
          </div>         
          <div   class="col-md-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model.number="amount" name="Vendor_name" required>
          </div>
          <div   class="col-md-3">
              <label class="form-label">Payment Number</label>
              <input type="text" class="form-control" v-model="payment_number" name="Vendor_name" required>
          </div>
           <div class="col-md-3">
                    <label class="form-label">Budget Type</label>
        <multiselect
        v-model="budget_type"
        :options="['budgeted ', 'un_budgeted']"
        :multiple="false"
        :searchable="true"
        required 
        :placeholder="'Select Budget Type'"
        ></multiselect>
            </div>
            <div   class="col-md-12">
              <label class="form-label">Purpose Of Payment</label>
            <textarea name="" class="form-control md-2" v-model="description" id=""></textarea>
           </div>
            </div>
            <div class="text-center gap-2 justify-content-end">
                <button type="button" class="btn btn-danger me-3" @click="closeEditModal">Cancel</button>
                <button type="submit" class="btn btn-primary">Update</button>
            </div>
        
        </form>
        
      </div>
    </div>
  </div>
   </teleport>
  
    <!-- Modal Background Overlay -->
    <div v-if="show_modal" class="modal-backdrop fade show" style="background-color: rgba(0, 0, 0.5, 0.5);"></div> 
             <svg 
             v-if="user_permissions.includes('can_delete_payment_record')"
              class="w-6 h-6  text-danger" 
               aria-hidden="true" 
               xmlns="http://www.w3.org/2000/svg" 
                 width="24" height="24" fill="none" 
                   viewBox="0 0 24 24" 
                    @click="deletePaymentRecord(props.row.id)"
                      >
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"/>
               </svg>
                            </template>
                        </v-client-table>
                    </div>
                </div>
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

    import axios from 'axios';    
    import { onMounted, ref,inject } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Purchase Order' });
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const add_vendor = ref(false);
    const payment_registration = ref(false);
    const columns = ref(['SNo','batch_no','beneficiary_name','date','payment_number','purpose_of_payment','budget','unbudget','project','actions',]);
    const items = ref([]);
    const type = ref('')
    const is_open = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo','batch_no','beneficiary_name','date','payment_number','purpose_of_payment','budget','unbudget', 'amount'],
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

    const totalBudgeted= ref('');
    const totalUnbudgeted = ref('');
    const loading_spinner = ref(false);
    const project = ref('');
    const payment_number = ref('')
    const beneficiary_name = ref('');    
    const batch_no = ref('');
    const lpo_number= ref('');
    const budget_type = ref('');
    const amount= ref('');
    const description = ref('');    
    const date_created = ref('');
    
    if (!date_created.value) {
        date_created.value = new Date().toISOString().substr(0, 10);
    }

     
  const is_closed = ref(true);
    const company_id = ref('');
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const print_url = ref(process.env.VUE_APP_API_BASE_URL);
    const axiosInstance = axios.create({
      //  baseURL: process.env.VUE_APP_API_BASE_URL
       baseURL: "https://construction.trustdigital.space/api/v1/"
    });


    const clearForm = ()=>{
     description.value =  "";   
     batch_no.value = "";
     budget_type.value = '';
     amount.value = '';
     payment_id.value= "";
     lpo_number.value= '';
     project.value ='';
     payment_number.value = '';
     beneficiary_name.value= '';
    };

    const recordPayment = async () => {

        if(!company_id.value){
            showError("Please Select Company");
            return;
        }
    try {
        payment_registration.value = false;
        loading_spinner.value = true;        
        // First register vendor if needed
               const data = {
            batch_no : batch_no.value,
            beneficiary_name:beneficiary_name.value,
            description: description.value,
            payment_number : payment_number.value,
            date_created:date_created.value,
            budget_type: budget_type.value,
            amount:amount.value,  
            lpo_number:lpo_number.value, 
            project:project.value,    
            company_id:company_id.value             
           
        };

        const response = await axiosInstance.post('/on-account-payment', data);

        if (response.status == 201) {
        clearForm();
        getPaymentRecords();
        loading_spinner.value = false;
        is_closed.value = true;
        showMessage("Voucher Requested Successfully");
        }
        else{
            showError("Faild to Add record",error );
             is_closed.value = true;
             loading_spinner.value = false;
        }
        
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error registering Order:", error);
        loading_spinner.value = false;
          is_closed.value = true;
    }
};
const getPaymentRecords = async () => {
    is_open.value = true;
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/on-account-payment`);
        if (response.data && Array.isArray(response.data)) {
            let filteredData = response.data;

            // Filter by company_id only if it has a value
            if (company_id.value) {
                filteredData = filteredData.filter(item => item.company_id === company_id.value);
            }
             if (selectedTypes.value) {
                filteredData = filteredData.filter(item => item.budget_type === selectedTypes.value);
            }
            // Calculate totals (will apply to all data or filtered data)
            totalBudgeted.value = filteredData
                .filter((item) => item.budget_type === 'budgeted')
                .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

            totalUnbudgeted.value = filteredData
                .filter((item) => item.budget_type === 'un_budgeted')
                .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
            
            // Map the data (no need to filter again as we already filtered above)
            items.value = filteredData.map((order, index) => ({
                SNo: index + 1,
                id: order.id,
                lpo_number: order.lpo_number,
                date: order.date_created,
                amount: order.amount,               
                batch_no: order.batch_no,                
                beneficiary_name: order.beneficiary_name,               
                purpose_of_payment: order.description,               
                project: order.project,           
                budget: order.budget_type === 'budgeted' ?Number(order.amount).toLocaleString(): "---" ,
                unbudget: order.budget_type === 'un_budgeted' ? Number(order.amount).toLocaleString() :"---",
                payment_number: order.payment_number
            }));
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loading_spinner.value = false;
    }
};
    //code for etint model
   const show_modal = ref(false);
   const payment_id = ref('');
   const voucher_number = ref();
   const openEditModal= (row) => {           
        payment_id.value= row.id;
       
        project.value = row.project;
        lpo_number.value = row.lpo_number;
        beneficiary_name.value = row.beneficiary_name;
        amount.value= row.amount;
        payment_number.value=row.payment_number;  
        if (row.budget === "Budgeted") {
          budget_type.value = row.budget;
           } else {
        budget_type.value = row.unbudget; // or your default value
        }
        budget_type.value= row.budget_type;
        description.value=row.purpose_of_payment;
        batch_no.value = row.batch_no;
        show_modal.value = true;      
           
    }
    const  closeEditModal = () => {
        // Reset the form fields
        clearForm();
        show_modal.value = false;
    }
    const loading_update= ref(false);
    const updatePaymentRecord = async () => {
    try {
        payment_registration.value = false;
        loading_update.value = true;        
        // First register vendor if needed
            
            const data = {
            batch_no : batch_no.value,
            beneficiary_name:beneficiary_name.value,
            description: description.value,
            payment_number : payment_number.value,
            date_created:date_created.value,
            budget_type: budget_type.value,
            amount:amount.value,  
            lpo_number:lpo_number.value, 
            project:project.value,    
                     
           
        };

        const response = await axiosInstance.patch(`/on-account-payment/${payment_id.value}`, data);

        if (response.status == 200) {
        clearForm();
        getPaymentRecords();
        loading_update.value = false;
        is_closed.value = true;
        closeEditModal();
        showMessage("Voucher Updated Successfully");
        }
        else{
            showError("Faild to update record",error );
             is_closed.value = true;
             loading_update.value = false;
        }
        
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error update Order:", error);
        loading_update.value = false;
          is_closed.value = true;
    }
};

const deletePaymentRecord = async (id) => {
  if (confirm("are sure u want to delete this record!")) {
    loading_spinner.value= true;
      const responce = await axiosInstance.delete(`on-account-payment/${id}`);
      if (responce.status == 200) {
       
        getPaymentRecords();
         showMessage("deleted Successfully");
      }
      else{
 showError("fail to delete record");
    }
  }
  else{
    return;
  }

}



const user = ref('');
const user_permissions = ref([]);
    onMounted(() => {
        const storedUser = localStorage.getItem("user");
        user.value = JSON.parse(storedUser);       
        user_permissions.value = user.value.permissions;
        getPaymentRecords();
    });


const selectedTypes = ref('');
const printPaymentRecords = (filteredItems, printType) => { 
    if (!Array.isArray(filteredItems)) {
        console.error('filteredItems is not an array:', filteredItems);
        filteredItems = [];
    }   
    
    const companyName = {
        5: "BUSHMAN",
        6: "COPEX"
    }[company_id.value] || "ALL COMPANY";

    const headers = [
        "S/N", "Batch No", "Beneficiary", "Date", 
        "Payment No", "Purpose", "Amount", "Project"
    ];

    const formatCurrency = (amount) => {
        const num = Number(amount);
        return isNaN(num) ? '-' : num.toLocaleString('en-US') + ' Tsh';
    };
    const rows = filteredItems.map((item, idx) => `
        <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
            <td class="center">${idx + 1}</td>
            <td>${item.batch_no || '-'}</td>
            <td>${item.beneficiary_name || '-'}</td>
            <td class="nowrap">${item.date || '-'}</td>
            <td>${item.payment_number || '-'}</td>
            <td>${item.purpose_of_payment || '-'}</td>
            <td class="right bold">${formatCurrency(item.amount)}</td>
            <td>${item.project || '-'}</td>
        </tr>
    `).join('');
    const totalAmount = filteredItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    
    // Use backticks carefully and escape script tags
    printWindow.document.write(`
        <html>
        <head>
            <title>Payment Records - ${companyName}</title>
            <style>
                @page { size: A4 landscape; margin: 0.5cm; }
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 15px; 
                    font-size: 10px;
                }
                .header { text-align: center; margin-bottom: 15px; }
                .summary { text-align: center; margin: 10px 0; font-size: 13px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                th { background: #0066cc; color: white; padding: 8px; text-align: left; }
                td { padding: 6px; border: 1px solid #ddd; }
                .center { text-align: center; }
                .right { text-align: right; }
                .bold { font-weight: bold; }
                .nowrap { white-space: nowrap; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>${printType ? printType.toUpperCase() : 'ALL'} M-PESA PAYMENT RECORDS FOR ${companyName}</h2>
            </div>
            
            <div class="summary">
                <div>Total ${printType ? printType : ''} Amount: ${formatCurrency(totalAmount)}</div>
                <div>Total Records: ${filteredItems.length}</div>
            </div>
            
            <table>
                <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                <tbody>${rows}</tbody>
            </table>
            
            <script>
                // Wait for content to load before printing
                setTimeout(function() {
                    window.print();
                    // Give time for print dialog to appear before closing
                    setTimeout(function() {
                        window.close();
                    }, 500);
                }, 200);
            <\/script>
        </body>
        </html>
    `); // <-- This backtick closes the template literal
    printWindow.document.close();
};
</script>;