<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Requisitions</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2">
                        <div class="ms-auto">
              <button v-if="!role_registration" type="button" class="btn btn-primary mb-2"  @click="role_registration = true">
        <template v-if="s && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
     </button>
     <button v-else type="button" class="btn btn-danger mb-2"  @click="role_registration = false">
      X
     </button>
 
                        </div>
                    </div>  


    <!-- requisition registration form starts -->
    <form v-if="role_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerRequisition" id="close">
        <h4 class="text-center">REQUISITION REGISTRATION FORM</h4>
        <div class="row mb-2">
            
                  <div class="col-md-6">
                <label class="form-label">Select Requisition Type </label>
       <multiselect 
                    v-model="requisition_type"
                    track-by="id"
                    :options= "requisitionTypes"
                    label = "name"  
                    placeholder="Select Requisition Type"
                    :searchable = "true"        
                    multple="false"
                    :required="true"
                    :allow-empty="false"
                    >
                </multiselect>
            </div>
              
            <div class="col-md-6">
                <label class="form-label">Select Project </label>
                <Multiselect
                    v-model="selectedProject"
                    :options="projects"
                    label="short_name"
                    track-by="id"
                    placeholder="Select Project"
                    :searchable="true"
                    :required="true"
                    :allow-empty="false"
                />
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="role_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="loading_spinner || !requisition_type || !selectedProject">Register</button>
        </div>
    </form>
             <!-- requisition registration form ends-->
 
                           <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

            <!-- requisition table starts -->
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="Requisitions" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">

                                <a href="javascript:void(0);" title="View"
                             v-if="props.row.status.key === 'Delivered'" 
                                @click.stop.prevent="handleViewDelivery(props.row.gin_id)"
                                      >
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
                                        class="text-info"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </a>
                                 
                                 <a href="javascript:void(0);" title="View" data-bs-toggle="modal" data-bs-target="#view_requisition"
                                 v-if="props.row.status.key === 'Pending' || props.row.status.key === 'Inactive'" 
                                 @click="viewRequisitionItems(props.row)">
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
                                        class="text-info"
                                        data-bs-toggle="modal" data-bs-target="#view_requisition"
                                        
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </a>
                                
<a href="javascript:void(0);" title="View" data-bs-toggle="modal" data-bs-target="#issue_note"
     v-if="props.row.status.key === 'In Transit'"
     @click="showIssuedItems(props.row.gin_id)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-info">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  </a>
                                
                                <a href="javascript:void(0);" title="Delete" @click="deleteRequisition(props.row.id)">
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
                                        v-if="props.row.status.key === 'Inactive'"
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
            <!-- requisition table ends -->


    <!-- view requisition modal for satus Pending and Inactive starts -->
    <div class="modal fade" id="view_requisition" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="height: 90vh;">
        <div class="modal-content d-flex flex-column" style="height: 100%;">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Requisition Items</h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" @click="clearForm"></button>
          </div>
          <div class="modal-body" style="overflow-y: auto; flex: 1 1 auto;">
           
            
            <div class="modal-body">
                      <!-- Add Item Form starts -->
                <div class="d-flex" @click="add_item = !add_item">
                    <div class="ms-auto">
                        <button class="btn btn-sm" 
                                :class="[add_item ? 'btn-danger' : 'btn-primary']"   v-if="status_id === 1">
                            {{ add_item ? 'X' : 'Add Item' }}
                        </button>
                    </div>
                </div>
                
                <form v-if="add_item" @submit.prevent="addNewItem" class="mt-3">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <Multiselect
                                v-model="selectedItem"
                                :options="itemList"
                                label="name"
                                track-by="id"
                                placeholder="Select Item"
                                :searchable="true"
                                :required="true"
                                :allow-empty="false"
                                @select="onItemSelect"
                            />
                        </div>
                        <div class="col-md-6 mb-3">
                            <input type="number" 
                                   class="form-control" 
                                   v-model="newItem.quantity" 
                                   placeholder="Enter Quantity"
                                   required
                                   >
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="text" 
                                   class="form-control" 
                                   v-model="newItem.remark" 
                                   placeholder="Enter Remark"
                                   
                                   >
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-success btn-sm p-2" :disabled="adding_item_spinner">
                                <template v-if="adding_item_spinner">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </template>
                                <template v-else>
                                    Save
                                </template>
                            </button>
                        </div>
                    </div>
                </form>
                <!-- Add Item Form ends -->

                       <!-- Items Table starts -->
            <div class="custom-table">
                <v-client-table :data="items" :columns="itemColumns" :options="items_table_option">
                    <template #Sno="props">
                        {{ props.index + 0 }}
                    </template>
                 <template #actions="props" >
        <a href="javascript:void(0);" title="Delete" @click="deleteItem(props.row)">
            <template v-if="deletingItems[props.row.id]"> 
                <span class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></span>
            </template>
            <template v-else>
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
            </template>
        </a>
                  </template>
                  
                    
                </v-client-table>
            </div>
            <!-- Items Table ends -->   

            </div>
            
          
          </div>
             <div class="modal-footer" style="flex: 0 1 auto;">
            <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
            <button 
            v-if="status_id === 1 && items.length > 0" 
            type="button" 
            class="btn btn-success btn-sm py-2 px-2" 
            @click="activateRequisition(currentRequisitionId)"
            >
              <template v-if="activate_requisition_spinner">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </template>
              <template v-else>
                Save
              </template>
            </button>


          </div>
        </div>
      </div>
    </div>
    <!-- view requisition modal for satus Pending and Inactive ends -->

         <!-- Delivery note modal for status In Transit starts -->
          <div class="modal fade" id="issue_note" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" style="height: 90vh;">
        <div class="modal-content d-flex flex-column" style="height: 100%;">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Delivery Note</h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" ></button>
          </div>
          <div class="modal-body" style="overflow-y: auto; flex: 1 1 auto;">
           
            
            <div class="modal-body">

                <div class="row mb-4">
            <div class="col-md-4">
                <label class="form-label">Select Store</label>
                <Multiselect
                    v-model="selectedStore"
                    :options="stores"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="true"
                    placeholder="Select store"
                    label="name"
                    track-by="id"
                />
            </div>
        </div>

              
<!-- Items Table starts -->
            <div class="custom-table">
                <v-client-table :data="issuedItems" :columns="issuedItemColumns" :options="items_table_option">
<template #received="props">
  <input 
    type="number" 
    class="form-control" 
    v-model="props.row.received" 
    placeholder="Enter Quantity"  
    @input="updateReceivedValue(props.row)"
  />
</template>
                </v-client-table>
            </div>
            <!-- Items Table ends -->


            </div>
            
            
          </div>
             <div class="modal-footer" style="flex: 0 1 auto;">
            <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
            <button 
            
            type="button" 
            class="btn btn-success btn-sm py-2 px-2" 
            @click="submitIssuedItems"
            >
              <template v-if="submittingIssuedItems">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </template>
              <template v-else>
                Save
              </template>
            </button>

          </div>
        </div>
      </div>
    </div>
      <!-- Delivery note modal for status In Transit ends -->
   

      <!-- Delivery note modal for status Delivered starts -->
<div class="modal fade" id="delivery_note" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deliveryNoteLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" style="height: 90vh;">
    <div class="modal-content d-flex flex-column" style="height: 100%;">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="deliveryNoteLabel">Delivery Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_delivery"></button>
      </div>
      <div class="modal-body" style="overflow-y: auto; flex: 1 1 auto;">
        <!-- Add this card section to the modal -->
        <div class="row mb-4">
          <div class="col-md-6">
           <div class="widget widget-statistics h-100 shadow card" @click="navigateToLabourRequests" style="cursor: pointer;">
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label text-dark fw-bold">Received By:</label>
                      <p class="form-control-static fw-bold text-dark">{{ deliveryNoteInfo.received_by || 'N/A' }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label text-dark fw-bold">Date Received:</label>
                      <p class="form-control-static fw-bold text-dark">{{ deliveryNoteInfo.date_received || 'N/A' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-body">
          <!-- Items Table starts -->
          <div class="custom-table">
            <v-client-table :data="goodDeliveryItems" :columns="deliveryItemColumns" :options="items_table_option">
              <template #Sno="props">
                {{ props.index + 0 }}
              </template>  
            </v-client-table>
          </div>
          <!-- Items Table ends -->
        </div>
      </div>
      <div class="modal-footer" style="flex: 0 1 auto;">
        <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
        <button 
          v-if="status_id === 1 && items.length > 0" 
          type="button" 
          class="btn btn-success btn-sm py-2 px-2" 
          @click="activateRequisition(currentRequisitionId)"
        >
          <template v-if="activate_requisition_spinner">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </template>
          <template v-else>
            Save
          </template>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- Delivery note modal for status Delivered ends -->

    </div>
</template>

<script setup>
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { onMounted, ref,inject,computed,watch,reactive } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';
    import Swal from 'sweetalert2';
    import * as bootstrap from 'bootstrap';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

const adding_item_spinner = ref(false);
const activate_requisition_spinner = ref(false);
  const selectedProject = ref(null); 
  const add_item = ref(false);
   const requisitionTypes = ref([]);
   const requisition_type = ref(null);
   const itemList = ref([]);
    const allStatuses = ref([]);
    const loadingIndicator = inject('loadingIndicator');
    const projects = ref([]);
    const Requisitions = ref([]);
    const Issued = ref([]);
    const loading_spinner = ref(false);
    const columns = ref(['Sno', 'requester_name','requester_email','requisition_type','project','status',  'actions']);
     const issuedItemColumns = ref(['Sno', 'item','unit', 'requested','issued','received','remark']); 
    const role_registration = ref(false);
    const deliveryItemColumns = ref(['Sno', 'item','unit', 'requested','issued','received','remark','excess/shortage']);
    const goodDeliveryItems = ref([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const gin_id = ref('');
    // requisition table
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 30, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'role_name'],
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

    // items table
    const items_table_option = ref({
    perPage: 10,
    perPageValues: [10, 20, 30, 50],
    skin: 'table table-hover table-striped',
    columnsClasses: { actions: 'actions text-center' },
    sortable: ['Sno', 'item_name'],
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
    headings: {
        quantity: 'Requested', 
        item_name: 'Item ',
        supplied: function() {
            return status_id.value !== 1 ? '' : 'Supplied';
        },
        actions: function() {
            return status_id.value !== 1 ? '' : 'Actions';
        }
    }
});
    



    const getRequisitions = () => {
        loading_spinner.value = true;
        axiosInstance.get('requisitions')
            .then((response) => {
                Requisitions.value = response.data.map((item, index) => {
                    const type = requisitionTypes.value.find(t => t.id === item.requisition_type_id);
                    return {
                        ...item,
                        Sno: index + 1,
                        requester_name: item.requester_name,
                        project: item.project_name,
                        requester_email: item.requester_email,
                        requisition_type: type ? type.name : 'Unknown Type' ,
                        status_id : item.status.id,
                        status: {
                            key: item.status.name,
                            class: item.status.color
                        },
                    };
                });
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
            });
    };

    
    const getProjects = async () => {
        loading_spinner.value = true;
        try {
            const response = await axiosInstance.get(`/projects`);
                projects.value = response.data;
                loading_spinner.value = false;
        } catch (error) {
            loading_spinner.value = false;
        }
    };

  

    const activateRequisition = async (id)=>{
        activate_requisition_spinner.value = true;
        const payload ={
            status_id : 5
        }
        const payload2 = {
            requisition_id: id,
            issuer_id: JSON.parse(localStorage.getItem("user")).id,
        }
           try {
            const response = await axiosInstance.put(`/requisitions/${id}`,payload);
                await  axiosInstance.post(`/good-issue-notes`, payload2);
                showMessage('Activated Successfully')
                status_id.value = ''
                getRequisitions()
                activate_requisition_spinner.value = false;
        } catch (error) {
           showError(error.message)
        }
    }

    const getRequisitionTypes = async () => {
        loading_spinner.value = true;
        try {
            const response = await axiosInstance.get(`/requisition-types`);
                requisitionTypes.value = response.data;
                loading_spinner.value = false;
        } catch (error) {
            loading_spinner.value = false;
        }
    };

    const registerRequisition = async () => {
        try {
            loading_spinner.value = true;
            const requisitionData = {
                name: JSON.parse(localStorage.getItem("user")).name,
                requester_email: JSON.parse(localStorage.getItem("user")).email,
                project_id: selectedProject.value.id,
                requisition_type_id: requisition_type.value.id,  
                requested_by: JSON.parse(localStorage.getItem("user")).name, 
                requester_id: JSON.parse(localStorage.getItem("user")).id,
            };

            await axiosInstance.post('/requisitions', requisitionData);
            getRequisitions();
            showMessage('Requisition created successfully!');
            resetForm();
            role_registration.value = false;          
            document.getElementById('close').click();          
        } catch (error) {
            showError('Failed to create requisition');
        } finally {
            loading_spinner.value = false;
        }
    };

    const resetForm = () => {
        selectedProject.value = null;
        requisition_type.value = null;
    };


    const items = ref([]);
    const currentRequisitionId = ref(null);
    const newItem = ref({
        name: '',
        description: '',
        unit: '',
        quantity: '',
        remark: '',
        item_id: null
    });
    const editingItemId = ref(null);

const itemColumns = computed(() => {
  let baseColumns = [''];
  if (status_id.value === 1) {
    baseColumns = ['Sno', 'item_name', 'unit', 'quantity', 'remark', 'actions'];
  } else if (status_id.value === 5) {
    baseColumns = ['Sno', 'item_name', 'unit', 'quantity', 'remark', 'supplied'];
  } else {
    baseColumns = ['Sno', 'item_name', 'unit', 'quantity', 'remark'];
  }
  return baseColumns;
});


     
     const status_id = ref('')
    const viewRequisitionItems = (requisition) => {
        gin_id.value = requisition.gin_id || '';
        currentRequisitionId.value = requisition.id;
        items.value = requisition.items;
        add_item.value = false; 
        status_id.value = requisition.status_id;
    };

    const addNewItem = async () => {
        try {
            adding_item_spinner.value = true;
            const payload = {
                ...newItem.value,
                item_id: newItem.value.item_id, 
                item_name: newItem.value.name,
                description: newItem.value.description,
                quantity: newItem.value.quantity,
                remark: newItem.value.remark,
                requisition_id: currentRequisitionId.value,
                
            };

            const response = await axiosInstance.post('/requisition-items', payload);
            showMessage('Item added successfully!');
            getRequisitions();           
            items.value.unshift({
                ...payload,
                id: response.data.id,
                Sno: items.value.length + 0
            });
            
            resetItemForm();
            add_item.value = false; 
        } catch (error) {
            showError('Error saving item');
        } finally {
            adding_item_spinner.value = false;
        }
    };

    const resetItemForm = () => {
        newItem.value = {
            name: '',
            description: '',
            unit: '',
            quantity: '',
            remark: '',
            item_id: null
        };
        selectedItem.value = null;
        editingItemId.value = null;
    };

    const clearForm = () => {
        resetItemForm();
        items.value = [];
        currentRequisitionId.value = null;
        add_item.value = false; 
    };

    const fetchItemList = async () => {
        try {
            loading_spinner.value = true;
            const response = await axiosInstance.get('item-list');
            itemList.value = response.data;
            loading_spinner.value = false;
        } catch (error) {
            loading_spinner.value = false;
            showError('Failed to fetch item list');
        }
    };

   
    const selectedItem = ref(null);

    const onItemSelect = (item) => {
        newItem.value = {
            name: item.name,
            description: item.description,
            unit: item.units,
            item_id: item.id,
            quantity: "",
            remark: "",
            supplied: 0
        };
    }; 

    // delete requisition
const deleteRequisition = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Remove the requisition from the UI before making the API call to avoid flickering
            const deletedRequisition = Requisitions.value.find(req => req.id === id);
            Requisitions.value = Requisitions.value.filter(req => req.id !== id);
            loading_spinner.value = true;
            axiosInstance.delete(`/requisitions/${id}`)
                .then((response) => {
                    showMessage('Requisition deleted successfully!');
                })
                .catch((error) => {
                    // Revert the deletion in the UI
                    Requisitions.value.push(deletedRequisition);
                    Requisitions.value.sort((a, b) => a.Sno - b.Sno); // Maintain original order
                    showError('Failed to delete requisition');
                })
                .finally(() => {
                    loading_spinner.value = false;
                });
        }
    });
};

    // delete requisition item
const deletingItems = ref({}); 

const deleteItem = (item) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set loading state for this specific item
            deletingItems.value[item.id] = true;
            
            axiosInstance.delete(`/requisition-items/${item.id}`)
                .then((response) => {
                    items.value = items.value.filter(i => i.id !== item.id);
                    showMessage('Item deleted successfully!');
                    // Remove the loading state for this item
                    delete deletingItems.value[item.id];
                    getRequisitions();
                })
                .catch((error) => {
                    showError('Failed to delete item');
                    // Remove the loading state for this item
                    delete deletingItems.value[item.id];
                });
        }
    });
};

// Delivery status modal instructions 

// Add this ref at the top with your other refs
const deliveryNoteInfo = ref({
  received_by: '',
  date_received: ''
});

const viewLoading = ref(false);

const handleViewDelivery = (gin_id) => {
    if (viewLoading.value) return;
    viewDeliveryNote(gin_id);
};

const viewDeliveryNote = async (gin_id) => {
    viewLoading.value = true;
    try {
        const response = await axiosInstance.get(`/goods-delivery-notes?gin_id=${gin_id}`);
        
        if (response.data.length > 0) {
            deliveryNoteInfo.value = {
                received_by: response.data[0].received_by,
                date_received: response.data[0].date_received
            };
        }
        
        goodDeliveryItems.value = response.data.flatMap((note, index) =>
            (note.items || []).map((item, i) => ({
                Sno: index * 100 + i + 1,
                item: item.item_name,
                description: item.description || 'No description',
                requested: item.requested_quantity,
                issued: item.supplied_quantity,
                received: item.received_quantity,
                'excess/shortage': item.received_quantity - item.supplied_quantity
            }))
        );

        const modalEl = document.getElementById('delivery_note');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.show();
    } catch (error) {
        showError('Failed to fetch delivery note');
        console.error(error);
    } finally {
        viewLoading.value = false;
    }
};


// In Transit status modal instructions 

// Add these refs
const issuedItems = ref([]);
const selectedStore = ref('');
const stores = ref([]);
const submittingIssuedItems = ref(false);


const showIssuedItems = (ginId) => {
    const selectedGIN = allGINs.value.find(gin => gin.id === ginId);
    if (selectedGIN && selectedGIN.items) {
        issuedItems.value = selectedGIN.items.map((item, index) => ({
            Sno: index + 1,
            gin_item_id: item.gin_item_id,
            inventory_item_id: item.inventory_item_id,
            item: item.item_name,
            unit: item.unit || 'n/a',
            requested: item.requested,
            issued: item.supplied,
            received: '', // Initialize as 0 for user input
            remark: item.remark || "no remark",
            'excess/shortage': 0 // Will be calculated on input
        }));
        gin_id.value = ginId;
    } else {
        showError("No items found for this GIN");
    }
};

const updateReceivedValue = (item) => {
  const existingIndex = issuedItems.value.findIndex(i => i.gin_item_id === item.gin_item_id);
  
  if (existingIndex !== -1) {
    issuedItems.value[existingIndex].received = item.received;
  }
};

const submitIssuedItems = async () => {
  submittingIssuedItems.value = true;
if (selectedStore.value === '') {
    showError("Please select Store ");
    submittingIssuedItems.value = false;
    return;
}
if (issuedItems.value.some(item => !item.received && item.received !== 0)) {
    showError("Please fill the received quantity");
    submittingIssuedItems.value = false;
    return;
}
  try {
    const ginResponse = await axiosInstance.get(`/good-issue-notes/${gin_id.value}`);
    const requisition_id = ginResponse.data.requisition_id;
    let delivery_note_id = ginResponse.data.delivery_note_id;
    if (!delivery_note_id) {
      const deliveryNoteResponse = await axiosInstance.post('/goods-delivery-notes', {
        gin_id: gin_id.value,
        date_received: currentDate,
        received_by_id: JSON.parse(localStorage.getItem("user")).id,
      });
      delivery_note_id = deliveryNoteResponse.data.id;
    }
    const bulkPayload = {
      items: issuedItems.value.map(item => ({
        goods_delivery_note_id: delivery_note_id,
        gin_item_id: item.gin_item_id,
        item_id: item.inventory_item_id,
        quantity: item.received,
        store_id: selectedStore.value.id,
        remark: item.remark || null
      }))
    };

    // 4. Single bulk request instead of loop
    await axiosInstance.post('/goods-delivery-note-items', bulkPayload);

    // 5. Update statuses
    await Promise.all([
      axiosInstance.put(`/requisitions/${requisition_id}`, {
        status_id: 10 // Delivered
      }),
    ]);

    // 6. UI updates
    showMessage(`Items received successfully`);
    document.getElementById('close_editing').click();
    getRequisitions();

  } catch (error) {
    showError(error.message);
  } finally {
    submittingIssuedItems.value = false;
  }
};

// Add this method to fetch stores
const getStores = async () => {
  try {
    const response = await axiosInstance.get('/stores');
    stores.value = response.data;
  } catch (error) {
    showError(error.message);
  }
};

const allGINs = ref([]); // Add this at the top with your other refs

const getIssued = () => {
    loading_spinner.value = true;
    axiosInstance.get('good-issue-notes')
        .then((response) => {
            allGINs.value = response.data; // Store all GINs data
            Issued.value = response.data.map((item, index) => {
                return {
                    // ... existing mapping
                };
            });
            loading_spinner.value = false;
        })
        .catch((error) => {
            showError(error.message);
            loading_spinner.value = false;
        });
};
 


    onMounted(async () => {
        getRequisitionTypes();
        getRequisitions();
        getProjects();
        fetchItemList();
        getStores();
        getIssued(); 
    });
</script>

<style scoped>
    .table3 .actions svg {
        padding: 2px;
    }
</style>