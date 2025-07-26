<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Spares</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

                     <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

                       <!-- button for addding new spare -->
                    <div class="d-flex me-4 mt-2">
                        <div class="ms-auto">
                            <button class="btn  me-2" 
                            :class="showAddSpareModal ? 'btn-danger':'btn-primary'"
                            @click="showAddSpareModal =! showAddSpareModal">                           
                                <svg
                                v-if="!showAddSpareModal"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                <span v-else>X</span>
                            </button>
                 <!-- creating spare lpo starts -->
<button 
class="btn btn-info"
data-bs-toggle="modal" data-bs-target="#lpo-modal"
>
    Create Spare LPO
</button>
                 <!-- creating spare lpo enes -->

                        </div>
                    </div>  




                    <!-- Add spare form starts -->
                  <form v-if="showAddSpareModal" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerSpares">
                      <h4 class="text-center"> ADD NEW SPARE</h4>
                        <div class="row mb-2">
    
                           <div class="col-md-4">
                              <label class="form-label">Spare Name</label>
                                <input type="text" class="form-control" placeholder="Enter Spare Name" v-model="name" required>
                            </div>

                            <div class="col-md-4">
                              <label class="form-label">Part Number</label>
                                <input type="text" class="form-control" placeholder="Enter Part Number" v-model="part_number" >
                            </div>
                                   <div class="col-md-4">
                                       <label class="form-label">Unit Measure</label>
             <multiselect 
                    v-model="unit"
                    track-by="id"
                    :options= "units"
                    label = "short_name"
                    placeholder="Select Unit"
                    :required = "true"
                    :searchable = "true"        
                    multple="true"
                    >
                </multiselect>
          </div>
                   
                              </div>
                            <div class="text-center gap-2 justify-content-end">
                                <button type="button" class="btn btn-danger me-3" @click="showAddSpareModal = false">Cancel</button>
                                       <button type="submit" class="btn btn-primary" :disabled="loading_spinner" >Add Spare</button>
                             </div>
                    </form>
             <!-- item registration form ends-->
 
                          <!-- loading spinner starts -->
                          <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100px;">
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
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="Spares" :columns="columns" :options="table_option" >
                              <template #quantity="props">
        {{ props.row.sum_quantity }}
                              </template>
                             <!-- Actions column template -->
                            <template #actions="props">
                                <div class="d-flex justify-content-center align-items-center">
                                  
                                      <a href="javascript:;" class="edit me-3" data-bs-toggle="modal" data-bs-target="#editModal" @click="editSpares(props.row)">
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
                                                class="text-primary"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </a>
                          <!-- Delete icon -->
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
                                            @click="deleteSpares(props.row)"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </a>
                                </div>
                            </template>
                            <!-- Actions column template ends -->
                           
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- EDIT SPARES MODAL -->


 <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg"> <!-- Changed to modal-lg -->
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Edit Spares</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row mb-2">
    
            <div class="col-md-4">
                <label class="form-label">Spare Name </label>
                <input type="text" class="form-control" placeholder="Enter Spare Name" v-model="name" required>
            </div>

            <div class="col-md-4">
                <label class="form-label">Part Number</label>
                <input type="text" class="form-control" placeholder="Enter Part Number" v-model="part_number" required>
            </div>

             <div class="col-md-4">
                <label class="form-label">Select Unit</label>
              <multiselect 
                    v-model="unit"
                    track-by="name"
                    :options= "units"
                    label = "short_name"
                    placeholder="Select Unit"
                    :required = "true"
                    :searchable = "true"        
                    multple="true"
                    >
                </multiselect>
            </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateSpare">Save changes</button>
      </div>
      </div>
    </div>
  </div>
</div>

    <!-- EDIT SPARES MODAL ENDS -->

<!-- Modal starts-->
<div class="modal fade" id="lpo-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Local Purchase Order Form</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
      </div>
      <form @submit.prevent="createLpo()">
             <div class="modal-body">
        <!-- approval chain starts -->
          <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
 <table class="table">
        <thead>
            <tr>
                <th>HR</th>
                <th>Operation</th> 
                <th>Engineer</th>                              
                <th>Sr.Accountant</th>
                <th>MD</th>
            </tr>
        </thead>
        <tbody>
          <tr>
                <td class="text-success">
                  Approved 
                </td>
                 <td class="text-danger">
                  Unapproved 
                </td>
                   <td class="text-danger">
                  Unapproved 
                </td>
                <td class="text-danger">
                  Unapproved 
                </td>
                  <td class="text-danger">
                  Unapproved 
                </td>
                
            </tr>
        </tbody>
        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                 <multiselect 
                    v-model="vendor"
                    track-by="id"
                    :options= "vendors"
                    label = "name"
                    placeholder="Select a vendor"
                    :required = "true"
                    :searchable = "true"        
                    multple="true"
                    >
                </multiselect>
            </div>
             <div class="col-md-6">
                <multiselect
                    v-model="payment_terms"
                    :options="['Bank /TT ', 'Cash', 'Cheque', 'M-Pesa', 'On-Account', 'Wakala']"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Payment Terms'"
                    ></multiselect>  
            </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
             <multiselect 
                    v-model="spare"
                    track-by="id"
                    :options= "Spares"
                    label = "name"
                    placeholder="Select a spare"
                    :required = "true"
                    :searchable = "true"        
                    multple="true"
                    >
                </multiselect>
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" placeholder="Enter quantity" v-model="quantity">
          </div>
           <div class="col-md-3">
            <input type="number" class="form-control" placeholder="Enter rate" v-model="rate">
          </div>
          <div class="col-md-1">
            <button class="btn btn-primary" 
            @click="addItem"
            type="button"
            >
                Add
            </button>
          </div>
        </div>
         <!-- approval chain ends -->
          <!-- items list starts -->
            <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                                   <v-client-table :data="items" :columns="lpoColumns"  >
                                   <template #index="{ index }">
                                       {{ index ++ }}
                                    </template>

                            <template #actions="props">
                                <div class="d-flex justify-content-center align-items-center">
        
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
                                            @click="deleteItem(props.row.SNo)"
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
           <!-- items list ends -->
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">
                  <span
                  v-if="sending"
                  class="spinner-border text-white mt-1"
                                      role="status"
                                      style="width: 1.5rem; height: 1.5rem;"
                                      ></span>
       
       <span v-else>  
          Submit
       </span>                               
      </button>
      </div>
          </form>
      
    </div>
  </div>
</div>
<!-- modal ends -->

</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref, computed, inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';
    import * as bootstrap from 'bootstrap';
        import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const loadingIndicator = inject('loadingIndicator');
    const loading = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const editModal = ref(null);
    const quantity = ref('')
    const Spares = ref([]);
    const showAddSpareModal = ref(false);
    const name = ref('');
    const vendor = ref('')
    const payment_terms = ref('')
    const part_number = ref('');
    const editForm = ref({id: null, name: '', part_number: '' , unit :''}); // Added editForm
    const loading_spinner = ref(false);
    const columns = ref(['SNo', 'name','part_number','unit','quantity','actions']);
    const lpoColumns = ref(['index','name','unit','quantity','rate','total','actions'])
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'name'],
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

const units = ref([''])  
 const getUnits = () =>{
            axiosInstance.get('/units').then((response) => {
            units.value = response.data
        });
 }
 const vendors = ref([])
  const getVendors = () =>{
            axiosInstance.get('/vendors').then((response) => {
            vendors.value = response.data
        });
 }
    const getSpares = () => {
        loading_spinner.value = true;
        axiosInstance.get('/spares').then((response) => {
            Spares.value = response.data.data.map((spare, index) => ({
            ...spare,
            SNo: index + 1,
            name : spare.name + (spare.part_number ? ' - ' + spare.part_number : ''),
            quantity: spare.store_items.map(item => item.quantity),
        }));
            loading_spinner.value = false;
        });
    };

const deleteSpares = (row) => {
    if (window.Swal) {
        window.Swal.fire({
            title: 'Delete spare',
            text: 'You are about to delete a Spare',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                loading_spinner.value = true;
                axiosInstance.delete(`spares/${row.id}`)  
                    .then((response) => {
                        loading_spinner.value = false;
                        if (response.data.success) {
                            showMessage('Spare deleted successfully!');
                            getSpares(); 
                        } else {
                            throw new Error(response.data.message || 'Failed to delete');
                        }
                    })
                    .catch((error) => {
                        loading_spinner.value = false;
                        showError(error.message );
                        console.error("Delete error:", error);
                    });
            }
        });
    }
};


const sending = ref(false)
const createLpo = async ()=>{
sending.value = true
     const lpoData = {
            company_id: 6,
            vendor_id: vendor.value.id,
            supplier: "none",
            address: "none",
            project_id: 36,
            project: 'Head Office',
            payment_terms: payment_terms.value,
            location: "none",
            user_id: JSON.parse(localStorage.getItem("user")).id,
            requested_by: JSON.parse(localStorage.getItem("user")).name,
            status_name: 'Inactive',
            status_color: 'dark',
        };
    const payload = {
        items : items.value,
        lpo : lpoData,
    }
     axiosInstance
            .post('create-store-lpo', payload)
            .then((response) => {
                     showMessage(response.data.message);
                   clearForm()
                   sending.value= false
                    document.getElementById('close').click()
                    getSpares()
            })
            .catch((error) => {
                showError(error.message); 
                console.error("Error registering Order:", error);
                sending.value=false
                document.getElementById('close').click()
            });
}
     const unit = ref('')
    const registerSpares = () => {
        showAddSpareModal.value = false;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            part_number: part_number.value,
            unit : unit.value.name
        };

        axiosInstance
            .post('spares', itemData)
            .then((response) => {
                showMessage('Spare Added!');
                getSpares();
                loading_spinner.value = false;
                if (response.data.status == 201) {
                } else {
                    console.error("Error registering Order:", response.data.message);
                }
                   clearForm()
            })
            .catch((error) => {
                showError(error.message); 
                console.error("Error registering Order:", error.message);
            });
    };

    
  // Edit spare function
    const editSpares = (spare) => {
         name.value = spare.name,
         part_number.value = spare.part_number,
         unit.value = spare.unit
        console.log('spare is ',spare.value)
        editForm.value = {
            id: spare.id, 
            name: spare.name,
            part_number: spare.part_number,
            unit : spare.unit
        };
        editModal.value.show();
    };


     const clearForm = () =>{
        name.value = '',
        unit.value = '',
        part_number.value = ''
     }
    const updateSpare = () => {
        const payload = {
            name: name.value,
            part_number: part_number.value,
            unit : unit.value.short_name
        }
        loading_spinner.value = true;
        axiosInstance.put(`spares/${editForm.value.id}`,payload)
            .then((response) => {
                loading_spinner.value = false;
                showMessage('Spare updated successfully!');
                editModal.value.hide();
                getSpares(); 
                clearForm()
            })
            .catch((error) => {
                loading_spinner.value = false;
                showError(error.message || 'Failed to update spare'); 
                console.error("Update error:", error); 
            }); 
    }; 

const spare = ref('')
const rate = ref('')
const items = ref([])
let snoCounter = 1;
const addItem = () =>{
    if(    spare.value ==='' | quantity.value === '' | rate.value === ''){
        showError('Field Required')
        return ;
    }
    const payload = {
        SNo: snoCounter,
        id: spare.value.id,
        unit: spare.value.unit??'nill',
        name:spare.value.name,
        quantity:quantity.value,
        rate:rate.value,
    }
    items.value.push({
              SNo : payload.SNo,
              id: payload.id,
              name: payload.name,
              unit:payload.unit,
              quantity: payload.quantity,
              rate:payload.rate.toLocaleString(),
              total: (payload.quantity * payload.rate).toLocaleString()
    });
    spare.value='',
    quantity.value = ''
    rate.value = ''
    snoCounter ++
}

const deleteItem = (id)=>{
     const index = items.value.findIndex(item => item.SNo === id);
     items.value.splice(index, 1);
}
    onMounted(() => {
        getVendors()
        getUnits()
        getSpares();
        editModal.value = new bootstrap.Modal(document.getElementById('editModal')); 
    });
</script>
