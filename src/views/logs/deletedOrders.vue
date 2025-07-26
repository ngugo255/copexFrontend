<template>
    <div class="layout-px-spacing">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Deleted Purchase Orders </a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>

<!-- notification starts -->
<div v-if="notification_count > 0 " class="d-flex container position-relative">
  <div class="ms-auto">
    <span data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
      <a href="javascript:;" id="ddlnotify" class="btn dropdown-toggle nav-link position-relative p-0 shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-bell text-danger" style="transform:scale(2)">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ notification_count }}
        </span>
      </a>
    </span>

    <!-- Notifications panel -->
    <div style="position: absolute; top: 100%; right: 0; z-index: 1050;">
      <div class="collapse  shadow" id="collapseWidthExample" style="min-width: 300px;">
        <div class="text-start card card-body text-dark " v-for="notification in notifications" >
          From: {{ notification.sender_name }}<br>
          Message: {{ notification.description }}
          <div class="d-flex">
            <button class="btn btn-success p-1 btn-sm me-1 ms-auto" style="cursor:pointer" @click="readRemark(notification.id)">✔</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- notification ends -->


        <button v-if="is_admin" class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
        </button>
 
       
        <form v-if="order_registration " class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="registerPurchaseOrder">
            <h4 class="text-center">LOCAL PURCHASE ORDER REGISTRATION</h4>
            <div class="row mb-2">
                <div v-if="!add_vendor" class="col-md-3">
                    <label class="form-label">Select A Supplier</label>
                    <select class="form-select" v-model="vendor_id" required @change="handleVendorChange">
    <option value="">Select Supplier</option>
    <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">{{ vendor.name }}</option>
    <option value="NEW_VENDOR">New Supplier</option>
</select>
                 


                </div>
                <!-- new vendor  starts-->
                <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Name</label>
              <input type="text" class="form-control" v-model="Vendor_name" name="Vendor_name" required>
          </div>
       
          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Email</label>
              <input type="text" class="form-control" v-model="Vendor_email" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Phone</label>
              <input type="text" class="form-control" v-model="Vendor_phone" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Address</label>
              <input type="text" class="form-control" v-model="Vendor_address" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Location</label>
              <input type="text" class="form-control" v-model="Vendor_location" name="Vendor_name" required>
          </div>
                 <!-- new vendor ends -->
                <div class="col-md-3">
                    <label class="form-label">Select Project Name</label>
                    <multiselect 
                    v-model="project_name"
                    track-by="id"
                    :options= "projects"
                    label = "short_name"
                    placeholder="Select Project"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Payment Terms</label>
                    
                    <multiselect
                    v-model="payment_terms"
                    :options="['Bank /TT ', 'Cash', 'Cheque', 'M-Pesa', 'On-Account', 'Wakala']"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Payment Terms'"
                    ></multiselect>
                </div>
                 <div v-if="(user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo'))"  class="col-md-3">
                    <label class="form-label">Select Company</label>                    
                    <multiselect
                    v-model="selected_company_id"
                    :options="[
                        { id: 5, name: 'BUSHMAN' },
                        { id: 6, name: 'COPEX' }
                    ]"
                    track-by="id"
                    label="name"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Company'"
                    ></multiselect>
                </div>
           
            </div>
         
         

            <div class="text-center gap-2 justify-content-end">
                <button v-if="add_vendor" type="button" class="btn btn-dark me-3" @click="add_vendor=false">Back</button>
                <button type="button" class="btn btn-danger me-3" @click="order_registration = false;add_vendor=false;is_closed=true">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>


                     <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

        <div class="text-center"><h6>DELETED LOCAL PURCHASE ORDERS </h6></div>
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option" 
                           
                        >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                            </template>
                         <template #actions="props">
                                
                               <a href="javascript:void(0);" title="Restore" data-bs-toggle="tooltip" data-bs-placement="top">
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
            class="text-success"
            @click="undeletePurchaseOrder(props.row.id)"
        >
            <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path>
            <polyline points="7 11 12 16 17 11"></polyline>
            <line x1="12" y1="4" x2="12" y2="16"></line>
        </svg>
    </a>
                                    <svg 
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="28" height="28" 
                                     fill="currentColor"
                                      class="bi bi-eye text-secondary" 
                                      viewBox="0 0 16 16"
                                      @click="openLpoModal(props.row)">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- lpo modale start -->
   <teleport to="body">
   <div v-if="showlpoModal" class="modal fade show d-block" role="dialog">
   <div class="modal-dialog  modal-xl">
     <div class="modal-content d-flex flex-column" style="height:90vh;">
       <div class="modal-header">
         <h5 class="modal-title">Details for Deleted Local Purchase Order  </h5>
         <button type="button" class="btn-close" @click="closeLpoModal"></button>
       </div>  
<div v-if="isActive" class="modal-body flex-grow-1" style="overflow-y: auto;">
       
       <div v-if="deleted_date" class="mb-4 w-100" style="pointer-events: none;">
           <div class="p-3 bg-light rounded">
               <div class="w-100">
                   <h6 class="mb-3" style="font-weight: bold;">Reason for LPO Deletion by {{ deleted_by }}  </h6>
                   <div class="card w-100">
                     <div class="card-body text-start">
                       <p class="mb-0 text-start" style="color: #000000; font-weight: 500;"> {{ deleted_reason }}</p>
                     </div>
                   </div>
               </div>
           </div>
       </div>
    
        
          
           <div class="row layout-top-spacing">


           <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
               <div class="panel p-0">
                        
   
                     <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
                      

                    


                   <div v-else class="custom-table table3 ">
           
                      
                       <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           
                          
                       </v-client-table>
                   </div>
               </div>
           </div>
       </div> 
          <!-- approval officers starts -->

       
   
        <!-- approval officers ends -->
       </div> 
      
       <div v-if="!isActive" class="modal-body flex-grow-1" style="overflow-y: auto;" >
        
    <div  class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
               <div class="panel p-0">


<div v-if="deleted_date" class="mb-4 w-100" style="pointer-events: none;">
           <div class="p-3 bg-light rounded">
               <div class="w-100">
                   <h6 class="mb-3" style="font-weight: bold;">Reason for LPO Deletion by {{ deleted_by }}  </h6>
                   <div class="card w-100">
                     <div class="card-body text-start">
                       <p class="mb-0 text-start"> {{ deleted_reason }}</p>
                     </div>
                   </div>
               </div>
           </div>
       </div>
          
                
                     <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
                      

                    


                   <div v-else class="custom-table table3">           
                         <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                          
                          
                       </v-client-table>
                   </div>
               </div>
           </div>
       </div> 
     </div>
   </div>
 </div>
 </teleport>
 
   <!-- Modal Background Overlay -->
   <div v-if="showlpoModal" class="modal-backdrop fade show"></div>
     
     <!-- lpo modal end -->

</template>

<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>

<script setup>
    import axios from 'axios';
    import { onMounted, ref,inject,watch } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Purchase Order' });

        const readRemark = async (id) => {
         const remarkStatus ={
            'status':'checked by ' + JSON.parse(localStorage.getItem("user")).name ,
              }
    try {
        const response = await axiosInstance.put(`/remark/${id}`,remarkStatus);
        showMessage('checked');
        fetchNotifications(); 
    } catch (error) {
        showError(error.message);
        console.error('Error:', error);
    }
};
    
    const loadingIndicator = inject('loadingIndicator');
    const showRemarkModal = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const printLpoReport = inject('printReport');
    const add_vendor = ref(false);
    const order_registration = ref(false);
    const columns = ref(['SNo','LPO_number','requested_by', 'supplier', 'project','deleted_date', 'deleted_by','status', 'actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'LPO_number', 'date', 'phone'],
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
        searchable: true,
    });

   const deleted_date = ref('');
const deleted_reason = ref('');
const deleted_by = ref('');
    const showDeleteModal = ref(false);
    const deleteReason = ref('');
    const lpoToDelete = ref(null);
    const isfetching = ref(false);
    const showLpoRemark = ref(false); 
    const notification_count=ref(0);
    const notifications= ref(['']);
    const selected_project = ref('');
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const company_id = ref('');
    const selected_company_id= ref('');
    const selected_status = ref('');
    const loading_spinner = ref(false);
    const supplier_name = ref('');
    const supplier_address = ref('');
    const supplier_location = ref('');
    const payment_terms = ref('');
    const project_name = ref('');
    const vendor_id = ref('');
    const is_admin=ref(false);
    const vendors =  ref([]);
    const isSending = ref(false);
    const is_editor = ref(false); 
    const Vendor_name = ref('');
    const Vendor_phone= ref('');
    const Vendor_email = ref('');
    const Vendor_address =ref ('');
    const Vendor_location=ref('');
    const is_closed = ref(true);
    const order_status=ref('');
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const print_url = ref(process.env.VUE_APP_API_BASE_URL);
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
     const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL2
    });
    const newremark = ref('');
    const remarks = ref([]);
    const item = ref('');
  





    const fetchNotifications = async () => {
    try {
        const response = await axiosInstance.get(`remark?remark_type=LPO`);
        notifications.value = response.data.data.filter(item => item.status === "unchecked");
        notification_count.value = response.data.unchecked_count ;
    } catch (error) {
        console.error('Error fetching amendment request:', error);
        showError("Failed to load amendment request " + (error.response?.data?.message || error.message));
    } finally {
        isfetching.value = false;
    }
}


    
    const getPurchaseOrders = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/deleted-orders`);
        if (response.data && Array.isArray(response.data)) {
            order_status.value = response.data.status_name;
            let filteredData = response.data;
            if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(order =>  (order.status_name !== "Inactive" || order.user_id == user_id));
            } else if (user_permissions.includes('can_view_copex_lpo')) {
                filteredData = filteredData.filter(order => order.company_id == 6 && (order.status_name !== "Inactive" || order.user_id == user_id));
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(order => order.company_id == 5 && (order.status_name !== "Inactive" || order.user_id == user_id));
            }else if (user_permissions.includes('can_view_all_lpo')) {
                filteredData = filteredData;
            } else {
                filteredData = [];
            }
            
            items.value = filteredData.filter(order => 
                      ((selected_project.value ? order.project_id === selected_project.value : true) && (selected_status.value ? order.status_name === selected_status.value : true)) 
                 ).map((order, index) => ({
                SNo: index + 1,
                id:order.id,
                grn_no:order.grn_no,
                LPO_number:`${String(order.id)}/${
                  order.date_created.slice(8, 10)
                  }/${
                  order.date_created.slice(5, 7)  
                  }/${
                  order.date_created.slice(2, 4)  
                 }`,
                company_id:order.company_id,
                supplier: order.supplier,
                address: order.address,
                requested_by: order.requested_by,
                date: order.date_created,
                project: order.project_aka,
                project_id : order.project_id,
                payment: order.payment_terms,
                location: order.location,
                requester:order.user_id,
                awaits:order.awaits,
                deleted_date: order.deleted_date ? order.deleted_date.split(' ')[0] : '',
                deleted_reason: order.deleted_reason,
                deleted_by: order.deleted_by,
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

    const projects = ref([]);
    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/projects`);
        if (response.data && Array.isArray(response.data)) {
            // Filter projects after receiving the response
            let filteredData = response.data;
            if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData;
            } else if (user_permissions.includes('can_view_copex_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 6);
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 5);
            }
             projects.value = filteredData;
            loading_spinner.value = false;
        } else {
            console.error("Invalid response format");
            loading_spinner.value = false; // Also set to false in error case
        }
    } catch (error) {
        loading_spinner.value = false;
    }
};
   //code for etint model
   const Show_editing_modal = ref(false);
    
   const lpo_number = ref();
   const openEditModal= (row) => {

       
        is_editor.value = true;
        getVendors();
        getProjects();
        Show_editing_modal.value = true;
        lpo_number.value = row.id;
        vendor_id.value = row.vendor_id;
        supplier_name.value = row.supplier;
        supplier_address.value = row.address;
        supplier_location.value = row.location;
        payment_terms.value = row.payment_terms;
        project_name.value = row.project;
        if (row.vendor_id) {
            vendor_id.value = row.vendor_id;
        } else {
            vendor_id.value = ''; 
        }
     
    }
    const   closeEditModal = () => {
        // Reset the form fields
        vendor_id.value = '';
        supplier_name.value = '';
        supplier_address.value = '';
        supplier_location.value = '';
        payment_terms.value = '';
        project_name.value = '';
        add_vendor.value = false;
        order_registration.value = false;
        lpo_number.value = '';
        is_editor.value = false;
        Show_editing_modal.value = false;
    }

    const updatePurchaseOrder = async () => {
    try {
        isSending.value = true; // Set the loading state to true    
        // First register vendor if needed
        if (add_vendor.value === true) {
            await registerVendor(); // Wait for vendor registration to complete
        }

        const purchaseOrderData = {
            vendor_id: vendor_id.value,
            project_id: project_name.value.id,
            payment_terms: payment_terms.value,
        };

        const response = await axiosInstance.patch(`/purchase-order/${lpo_number.value}`,purchaseOrderData);
          if (response.status === 200) {
            clearForm();
            isSending.value = false; // Reset the loading state
            Show_editing_modal.value = false; // Close the modal
            is_editor.value = false; // Reset the edit mode flag
            order_registration.value = false; // Reset the order registration flag
            add_vendor.value = false; // Reset the add vendor flag
           getPurchaseOrders();       
          showMessage("Order Updated Successfully");
        } else {
            showError("Error code " + response.status);
        }      
       
       
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error rUpdated Order:", error);
        loading_spinner.value = false;
    }
};
        

  const is_copex = ref(false);
  const is_bushman = ref(false);
  const total_amount = ref(0);
   const lpo_items = ref([]);
   const item_columns = ref(['SNo','description','spec', 'units', 'quantity', 'rate', 'amount',]);
   const showlpoModal = ref(false); 
   const loading=  ref(false);
   const isActive= ref(false);

   const approval_status_data = ref({});
 
   const item_list_category = ref([]);
    //table 3
    const isFuel = ref(false);
    const is_bulk = ref(false);
    const is_items = ref(false);
    
  
    const item_list_id = ref('');
    const item_category = ref('')

    const direct_description = ref('');
    const description = ref('');
    const description_of_lpo = ref('');
    const machines = ref([]);
    const unit = ref('');
    const budgets = ref(['']);
    const task = ref('');
    const machine_field = ref(false);
    const quantity = ref('');
    const rate = ref('');
    const items_list = ref([]);
    const isOpen = ref('');
    const amount = ref(0);
    const approval_status = ref(false);
    const spinner = ref(false);
    watch([quantity, rate], () => {
        amount.value = quantity.value * rate.value
    });

   const lpo_id = ref(''); 
   const grn_number = ref(0)
   const openLpoModal= (row) => {
    getBudgets(row.project_id);
        grn_number.value = row.grn_no;
        lpo_number.value = row.id;
        project_name.value = row.project;
        lpo_id.value = row.LPO_number;
    deleted_date.value = row.deleted_date ? row.deleted_date.split(' ')[0] : '';
    deleted_reason.value = row.deleted_reason || '';
    deleted_by.value = row.deleted_by || '';
        if (row.status.key === "Inactive") {
           is_closed.value= true; 
           isActive.value= false;
           getItemListCategory();
           getItems();
        }
        else{
            getItems();
            getApprovalStatus();
            isActive.value= true;
            approval_status.value = true;
         
            if(row.company_id == 5){
                is_bushman.value= true;
                is_copex.value = false;
            }
            if(row.company_id == 6){
                is_bushman.value= false;
                is_copex.value = true;
            }
        }
        showlpoModal.value = true;
    }
    const   closeLpoModal = () => {
      lpo_number.value = "";
      project_name.value = ""; // Clear the project name
      lpo_items.value = [];
      total_amount.value = 0 // Clear the items list
      showlpoModal.value = false;
      isOpen.value= false;
      clearForm();
      clearItemForm();
      }
     
      
    const getItemsList = async (id) => {
        try {
           
            const response = await axiosInstance.get(`/item-list`);
            if (response.data && Array.isArray(response.data)) {
                 const filterdata = response.data.filter((item) => item.category_id == id);
                items_list.value = filterdata.map((data) => ({
                    id: data.id,
                    name: data.name,
                    unit_measure: data.unit_measure,
              }));


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
            getPurchaseOrders();
        } catch (error) {
            console.error("Error approving check:", error.message);
        }
    };

    const approveUnCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 0
            });
            getApprovalStatus();
        } catch (error) {
            console.error("Error approving check:", error.message);
        }

        const response = await axiosInstance.put(`/purchase-order/${id}`, {
                status_name: "Unapproved",
                status_color:"secondary",
            });
    };   
    
    const activatePurchaseOrder = () => {
        loading_spinner.value = true;
        const activationData = {
            status_name: 'Unapproved',
            status_color: 'secondary',
        };
        
        if (confirm("Are you sure you want to Confirm this Order?")) {
            axiosInstance
                .put(`/purchase-order/${lpo_number.value}`, activationData)
                .then((response) => {       
                    loading_spinner.value = false;            
                if (response.status == 200) {
                   getPurchaseOrders();
                   closeLpoModal();
                    showMessage(" Activation Successfuly! Now Waiting for Approvals");
                }
                else{
                    showError("activation Fails");
                }
                })
 
                
                .catch((error) => {
                    console.error("Error activating order:", error.message);
                    loading_spinner.value = false;
                });

                
        } else {
            loading_spinner.value = false;
        }
    };


const handleDescriptionChange = () => {
       const item_number = item_category.value.id;
   

        if (item_number == 1) {
              getItemsList(1);
              is_items.value = true;
              isFuel.value = true;  
             
                 if (description_of_lpo.value === 'Direct') {
              fetchMachines();                
              machine_field.value = true;
              is_items.value = true;
              }
                 else{
                machine_field.value = false;
              }
                     
            }
         if(item_number == 2) {
             getItemsList(2);
             is_items.value = true;
             machine_field.value = false;
             isFuel.value = false;
             description_of_lpo.value = ""       
            }
        if(item_number == 3) {
            getItemsList(3);
            is_items.value = true;
            machine_field.value = false;
            isFuel.value = false;
            description_of_lpo.value = ""       
        }
    
    }

   //fetching machine list
   const  fetchMachines= async () => {
    axiosInstance
      .get(`/machines`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          machines.value = response.data.map(machine => ({
            id: machine.id,
            name: machine.name,
            type: machine.type_name,
            category : machine.category.name,          
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
      });
}


   const  getBudgets= async (id) => {
    axiosInstance2
      .get(`/projects/${id}`)
      .then((response) => {
       budgets.value= response.data;
      })
      .catch((error) => {
        showError( error.message);
        console.error(error);
      }
    )
}
    const budget = ref('');
    const budget_items = ref(['']);
    const budgetCategory = ref(['']);
    watch(budget, (newVal) => {
  if (newVal) {
    axiosInstance2
      .get(`/item/${newVal.id}`)
      .then((response) => {
       budget_items.value= response.data;
       budgetCategory.value = response.data.map(item =>({
       id :  item.id,
       name : item.name,
       description : item.item_description.map(sub_item =>({
          id :sub_item.id,
          name: sub_item.name,
          units : sub_item.units,
          rate: sub_item.cost,
          cost : sub_item.cost,
          quantity : sub_item.quantity * sub_item.quantity_2,
          total : sub_item.quantity * sub_item.quantity_2 * sub_item.cost
       })),
      }));
      })
      .catch((error) => {
        showError( error.message);
        console.error(error);
      }
    )
  }
});

//dozzer watch
   watch(item, (newItem) => {
  if (newItem) {
   getItemsUsed(newItem.id);
  }
});


    const used_quantity = ref('');
    const getItemsUsed = (id) => {
        axiosInstance
            .get(`/items-used/${id}`)
            .then((response) => {
               used_quantity.value= response.data.used_items;
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error fetching item used quantity:", error);
            });
    };


const budget_category = ref('');
const budgetCategoryItems = ref(['']);
   watch(budget_category, (newCat) => {
  if (newCat) {
    budgetCategoryItems.value = newCat.description;
  }
});

    const getItemListCategory= () => {
        axiosInstance
            .get('/item-list-category')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    item_list_category.value = response.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                    }));
                } else {
                    console.error("Invalid response format");
                }
            })
            .catch((error) => {
                console.error("Error fetching item list category:", error.message);
            });
    };


    const machine = ref('');
    const item_unit = ref('nothing');
    const specification = ref('')




    //25 june 2025

const getItems = async () => {
    loading_spinner.value = true; 
    try {
        const response = await axiosInstance.get(`/order-items/${lpo_number.value}`);
        if (response.data && Array.isArray(response.data)) {
            total_amount.value = response.data.reduce((sum, order) => {
                return sum + (order.quantity * order.rate);
            }, 0);

            isOpen.value = response.data.length === 0;

            lpo_items.value = response.data.map((order, index) => ({
                SNo: index + 1,
                category: order.category,
                id: order.id,
                description: order.description,
                type: order.machine?.type ?? '---',
                spec: order.specification ?? '---',
                units: order.unit_measure,
                quantity: order.quantity.toLocaleString(),
                rate: Number(order.rate).toLocaleString(),
                amount: (order.quantity * order.rate).toLocaleString(undefined, { maximumFractionDigits: 3 })
            }));

            return response.data; 
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching purchase order: ", error);
    } finally {
        loading_spinner.value = false; 
    }

    return []; // fallback
};

const getApprovalStatus = async () => {
    try {
        const response = await axiosInstance.get(`/approval-check-status/${lpo_number.value}`);
        if (response.data && typeof response.data === 'object') {
            approval_status_data.value = response.data;
            spinner.value = false;
            return response.data; // ✅ ADD THIS
        } else {
            console.error("Invalid response format");
            return null;
        }
    } catch (error) {
        console.error("Error fetching approval status: ", error);
        return null;
    }
};

  const grn = ref({})
const getGrn = async (id) => {
  try {
    const response = await axiosInstance.get(`/good-received-notes/${id}`);
    if (response.data && Object.keys(response.data).length > 0) {
      return response.data;
    } else {
      return null; // No data found
    }
  } catch (error) {
    return null; // Error or no data
  }
};


const undeletePurchaseOrder = async (id) => {
    if (confirm("Are you sure you want to restore this purchase order?")) {
        try {
            loading_spinner.value = true;
            const response = await axiosInstance.put(`/purchase-order/${id}`, {
                deleted: 0,
            });
            
            if (response.status === 200) {
                showMessage(response.data.message); 
                getPurchaseOrders(); 
            } else {
                showError(error.message);
            }
        } catch (error) {
            showError(error.message);
        } finally {
            loading_spinner.value = false;
        }
    }
};



    onMounted(() => {
        getPurchaseOrders();
        getProjects();
        fetchNotifications();
        fetchMachines();
        watch(order_status, (newValue) => {
           
           if  (newValue === 'Inactive') {
               isActive.value= false
               
                  }
           else{
            isActive.value= true;
           }
       });
    });

</script>