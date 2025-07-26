<template>
    <div class="layout-px-spacing">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Cash voucher payment</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
      
        <div v-if="user_role != 2" class="d-flex me-4">
            <div class="ms-auto">
                <button v-if="is_closed" class="btn btn-primary" @click="voucher_registration= true; is_closed = false; ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
                <button v-else class="btn btn-danger" @click="voucher_registration = false; is_closed = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
        </div>
        <form v-if="voucher_registration" class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="registerVoucher">
           <h4 class="text-center">CASH PAYMENT VOUCHER</h4>                  
           <div class="row mb-2">


            <div   class="col-md-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" v-model="date_created" name="date" required>
            </div>
         
          
          <div class="col-md-3">
              <label class="form-label">Paid To(Recipient)</label>
              <input type="text" class="form-control" v-model="paid_to" name="Vendor_name" required>
          </div>

          
          <div   class="col-md-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model="amount" name="Vendor_name" required>
          </div>
           <div class="col-md-3">
                    <label class="form-label">Payment Terms</label>
                     <multiselect
                    v-model="payment_type"
                    :options="['Bank /TT ', 'Cash', 'Cheque', 'M-Pesa', 'On-Account', 'Wakala']"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Payment Terms'"
                    ></multiselect>
            </div>
            <div   class="col-md-12">
              <label class="form-label">Description Of Payment</label>
            <textarea name="" class="form-control md-2" v-model="description" id=""></textarea>
           </div>
              </div>
            <div class="text-center gap-2 justify-content-end">
                <button type="button" class="btn btn-danger me-3" @click="voucher_registration = false;add_vendor=false;is_closed=true">Cancel</button>
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

        <div class="text-center"><h4>CASH PAYMENT VOUCHER</h4></div>
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option" 
                            @row-click="onRowClick"
                        >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                            </template>
                            <template #actions="props">
                                
                                <a v-if="props.row.status.key !== 'Inactive' && props.row.company_id == 6"  :href="`${print_url}copex-lpo-pdf/${props.row.voucher_number}`" 
                                  class="text-success" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a>  
                                <a v-if="props.row.status.key !== 'Inactive' && props.row.company_id == 5"  :href="`${print_url}bushman-lpo-pdf/${props.row.voucher_number}`" 
                                  class="text-success" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a>         
                                
                                <svg v-if=" props.row.requester === user_id " class="w-6 h-6 text-gray-800 dark:text-white" 

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
    <div class="modal-dialog modal-dialog modal-lg ">
      <div class="modal-content d-flex flex-column" style="block-size: auto;">
        <div class="modal-header">
          <h5 class="modal-title">Editing Form for voucher {{ voucher_number }} </h5>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
        </div>
        <form  class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="updateVoucher">
        <div class="modal-body flex-grow-1" style="overflow-y: auto;">         
           
        
            <div class="row mb-2"> 
      <div   class="col-md-6">
  <label class="form-label">Date</label>
  <input type="date" class="form-control" v-model="date_created" name="date" required>
 </div>


<div class="col-md-6">
  <label class="form-label">Paid To(Recipient)</label>
  <input type="text" class="form-control" v-model="paid_to" name="Vendor_name" required>
</div>


<div   class="col-md-6">
  <label class="form-label">Amount</label>
  <input type="number" class="form-control" v-model.number="amount" name="Vendor_name" required>
</div>
<div class="col-md-6">
        <label class="form-label">Payment Terms</label>
        <multiselect
        v-model="payment_type"
        :options="['Bank /TT ', 'Cash', 'Cheque', 'M-Pesa', 'On-Account', 'Wakala']"
        :multiple="false"
        :searchable="true"
        required 
        :placeholder="'Select Payment Terms'"
        ></multiselect>
</div>
<div   class="col-md-12">
  <label class="form-label">Description Of Payment</label>
<textarea name="" class="form-control md-2" v-model="description" id=""></textarea>
</div>
  </div>
        </div>
       
        <div class="modal-footer "> 
              <div class="float-end">
        <button type="button" class="btn btn-danger" @click="closeEditModal">Cancel</button>  
         &nbsp; 
           <button type="submit" class="btn btn-primary" :disabled="isSending"> 
             <span v-if="isSending">
               <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
             </span>
             <span v-else>Update</span>
           </button>
            </div>

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
    const voucher_registration = ref(false);
    const columns = ref(['SNo','date','requested_by','description','paid_to','amount','payment_type','actions' ,]);
    const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'voucher_number', 'date', 'phone'],
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

    const isSending = ref(false);
    const loading_spinner = ref(false);
    const is_editor = ref(false);
    const paid_to = ref('');
    const payment_type = ref('');
    const amount= ref('');
    const description = ref('');    
    const date_created = ref('');
    if (!date_created.value) {
        date_created.value = new Date().toISOString().substr(0, 10);
    }

     
  const is_closed = ref(true);
 
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const print_url = ref(process.env.VUE_APP_API_BASE_URL);
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });


    const clearForm = ()=>{
     description.value =  "";   
     paid_to.value = "";
     payment_type.value = '';
     amount.value = '';
    };

    const registerVoucher = async () => {
    try {
        voucher_registration.value = false;
        loading_spinner.value = true;        
        // First register vendor if needed
            const voucherData = {
            company_id: 5,
            description: description.value,
            date_created:date_created.value,
            payment_type: payment_type.value,
            amount: amount.value,
            receiver:paid_to.value,                
            user_id: JSON.parse(localStorage.getItem("user")).id,
            status_name: 'Inactive',
            status_color: 'dark',
        };

        const response = await axiosInstance.post('/voucher', voucherData);
        clearForm();
        getVoucher();
        loading_spinner.value = false;
        is_closed.value = true;

        showMessage("Voucher Requested Successfully");
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error registering Order:", error);
        loading_spinner.value = false;
    }
};
    const getVoucher = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/voucher`);
        if (response.data && Array.isArray(response.data)) {
            let filteredData = response.data;
                        if (![1,4].includes(Number(user_role))) {
    filteredData = filteredData.filter(order => order.company_id == 5);
} 
            items.value = filteredData.map((order, index) => ({
                SNo: index + 1,
                company_id:order.company_id,
                requested_by: order.user_id,
                date: order.date_created,
                id:order.id,
                description:order.description,
                amount:Number(order.amount).toLocaleString(undefined, { maximumFractionDigits: 3}),
                paid_to:order.receiver,
                requester:order.user_id,
                payment_type: order.payment_type,
                status: {
                    key: order.status_name,
                    class: order.status_color
                },
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
    
   const voucher_number = ref();
   const openEditModal= (row) => {
         is_editor.value = true;
         show_modal.value = true;
         voucher_number.value = row.id;
         paid_to.value=row.paid_to,
         description.value = row.description,
         date_created.value = row.date,
         amount.value = row.amount,
         payment_type.value=row.payment_type

     
    }
    const  closeEditModal = () => {
        // Reset the form fields
        clearForm();
        voucher_registration.value = false;
        // Reset the show_modal flag
        voucher_number.value = '';
        is_editor.value = false;
        show_modal.value = false;
        isSending.value = false;
    }
    const updateVoucher = async () => {
    try {
        isSending.value = true; // Set the loading state to true    
        
            const voucherData = {
            company_id: 5,
            description: description.value,
            date_created:date_created.value,
            payment_type: payment_type.value,
            receiver:paid_to.value,
            amount:amount.value,                  
            user_id: JSON.parse(localStorage.getItem("user")).id,
            status_name: 'Inactive',
            status_color: 'dark',
        };

        const response = await axiosInstance.patch(`/voucher/${voucher_number.value}`,voucherData);
        
 
        if (response.status === 200) {
            clearForm();
            isSending.value = false; // Reset the loading state
            show_modal.value = false; // Close the modal
            is_editor.value = false; // Reset the edit mode flag
            voucher_registration.value = false; // Reset the order registration flag
            add_vendor.value = false; // Reset the add vendor flag
           getVoucher();       
          showMessage("Voucher Updated Successfully");
        } else {

            showError("Error code " + response.status);
        }      
       
       
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error Updated Voucher:", error);
        loading_spinner.value = false;
    }
};


const onRowClick = (row) => {
        // alert("hello");
        // router.push(`/order-items/${row.voucher_number}`);
        //openEditModal(row)
    };

    onMounted(() => {
        // console.log("User Id is :",user_id);
        getVoucher();
       

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
       if(user.value.role == 10){
        is_project_manager.value=true;
       }
       if(user.value.role == 7){
        is_operator.value=true;
       }
       if(user.value.role == 8){
         is_dataentry.value=true;
             } 
       
        
          
 }

 });
</script>