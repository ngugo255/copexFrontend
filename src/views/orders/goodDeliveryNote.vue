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

     
 
                           <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

      
            <!-- requisition table starts -->
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="Requisitions.filter(req => req.status.key !== 'Inactive' && req.status.key !== 'Pending')" :columns="columns" :options="table_option" >
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
                                 v-else
                                 @click="viewIssuedItens(props.row.items, props.row.gin_id)">
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
                                        data-bs-toggle="modal" data-bs-target="#issue_note"
                                        
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </a>
                            </template>
                           
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
            <!-- requisition table ends -->



    
     <!-- Issue note modal starts -->
          <div class="modal fade" id="issue_note" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" style="height: 90vh;">
        <div class="modal-content d-flex flex-column" style="height: 100%;">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Good Issue Note</h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" ></button>
          </div>
          <div class="modal-body" style="overflow-y: auto; flex: 1 1 auto;">
           
            
            <div class="modal-body">

                <div class="row mb-4">
            <div class="col-md-4">
                <label class="form-label">Select Store</label>
                <Multiselect
                    v-model="selectedStores"
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
      <!-- Issue note modal ends -->
          

<!-- Delivery note modal starts -->
<div class="modal fade" id="delivery_note" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deliveryNoteLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" style="height: 90vh;">
    <div class="modal-content d-flex flex-column" style="height: 100%;">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="deliveryNoteLabel">Good Delivery Note</h1>
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
<!-- Delivery note modal ends -->

    </div>
</template>

<script setup>
    
    import Multiselect from '@suadelabs/vue3-multiselect';     // import the component
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { onMounted, ref,inject,computed,watch,reactive } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';
 

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });


    const stores = ref([]);
    const selectedStores = ref([]);
const activate_requisition_spinner = ref(false);
  const add_item = ref(false);
    const loadingIndicator = inject('loadingIndicator');
    const Requisitions = ref([]);
    const loading_spinner = ref(false);
    const columns = ref(['Sno', 'issuer_name','issuer_email','date_issued','status', 'actions']);
     const issuedItemColumns = ref(['Sno', 'item','unit', 'requested','issued','received','remark']); 
    const deliveryItemColumns = ref(['Sno', 'item','unit', 'requested','issued','received','remark','excess/shortage']);
    const goodDeliveryItems = ref([]);
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
    perPage: 5,
    perPageValues: [5, 20, 30, 50],
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
            return status_id.value !== 5 ? '' : 'Supplied';
        },
        actions: function() {
            return status_id.value !== 1 ? '' : 'Actions';
        }
    }
});
     const currentDate = new Date().toISOString().split('T')[0];

    

const issuedItems = ref([]); 
const viewIssuedItens = (items, ginId) => {
   gin_id.value = ginId; 
   issuedItems.value = items.map((item, index) => ({
        Sno: index + 1,
        gin_item_id  : item.gin_item_id,
        gin_id: ginId, 
        inventory_item_id: item.inventory_item_id,
        item: item.item_name,  
        unit: item.unit ?? 'nill',
        requested: item.requested,
        issued: item.supplied,
        remark: item.remark ?? "no remark",
        received: item.received, 
        'excess/shortage': item.requested - item.supplied
    }));
};


const updateReceivedValue = (item) => {
  const existingIndex = issuedItems.value.findIndex(i => i.gin_item_id === item.gin_item_id);
  

  if (existingIndex !== -1) {
    issuedItems.value[existingIndex].received = item.received;
  }
};


const submittingIssuedItems = ref(false);
const submitIssuedItems = async () => {
    submittingIssuedItems.value = true;
    
    try {
        // 1. Get GIN details
        const ginResponse = await axiosInstance.get(`/good-issue-notes/${gin_id.value}`);
        const requisition_id = ginResponse.data.requisition_id;

        // 2. Create delivery note if needed
        let delivery_note_id = ginResponse.data.delivery_note_id;
        if (!delivery_note_id) {
            const deliveryNoteResponse = await axiosInstance.post('/goods-delivery-notes', {
                gin_id: gin_id.value,
                date_received: currentDate,
                received_by_id: JSON.parse(localStorage.getItem("user")).id,
            });
            delivery_note_id = deliveryNoteResponse.data.id;
        }

        // 3. Prepare bulk payload (updated for bulk endpoint)
        const bulkPayload = {
            items: issuedItems.value.map(item => ({
                goods_delivery_note_id: delivery_note_id,
                gin_item_id: item.gin_item_id,
                item_id: item.inventory_item_id,
                quantity: item.received,
                store_id: selectedStores.value.id,
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
        showMessage(`items received successfully`);
        document.getElementById('close_editing').click();
        getRequisitions();

    } catch (error) {
        showError(error.message);
    } finally {
        submittingIssuedItems.value = false;
    }
};

const getRequisitions = () => {
    loading_spinner.value = true;
    axiosInstance.get('good-issue-notes')
        .then((response) => {
            Requisitions.value = response.data.map((item, index) => {
                return {
                    Sno: index + 1,
                    gin_id: item.id,  // GIN id
                    requisition_id: item.requisition_id,
                    date_issued: item.date_issued,
                    issuer_name: item.issuer?.name || 'N/A',
                    issuer_email: item.issuer?.email || 'N/A',
                    status_id: item.status?.id,
                    status: {
                        key: item.status?.name || 'Unknown',
                        class: item.status?.color || 'default'
                    },
                    items: item.items || [], // Optional: pass raw items
                    items_count: item.items?.length || 0 // Optional: count
                };
            });
            loading_spinner.value = false;
        })
        .catch((error) => {
            showError(error.message);
            loading_spinner.value = false;
        });
};

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

    const getStores = async () => {
        try {
            const response = await axiosInstance.get('/stores');
            stores.value = response.data;
        } catch (error) {
            showError(error.message);
        }
    };



    onMounted(async () => {
        await getStores();    
        getRequisitions();
    });
</script>

<style scoped>
    .table3 .actions svg {
        padding: 2px;
    }
</style>