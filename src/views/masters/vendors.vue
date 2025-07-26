<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Totaly Vendors</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>    
        <div class="seperator-header layout-top-spacing">
            <div class="d-flex justify-content-between mt-3">
              <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
  </svg>
                </button>
                <button class="btn btn-primary me-2" @click="register_Vendor=!register_Vendor ">
                    <i class="bi bi-plus"></i>Add
                </button>
            </div>
        </div>
  
        
   
        <div class="mt-3 mx-2">
          <!-- add consumer starts -->
          <form class="p-3 border rounded bg-white shadow" v-if="register_Vendor" id="consumer" @submit.prevent="registerVendor">
      <h3 class="text-center">Vendor Registration </h3>
      <div class="row mb-2">
          <div class="col-md-4">
              <label class="form-label">Vendor Name</label>
              <input type="text" class="form-control" v-model="Vendor_name" name="Vendor_name" required>
          </div>
       
          <div class="col-md-4">
              <label class="form-label">Vendor Email</label>
              <input type="text" class="form-control" v-model="Vendor_email" name="Vendor_name" required>
          </div>

          <div class="col-md-4">
              <label class="form-label">Vendor Phone</label>
              <input type="text" class="form-control" v-model="Vendor_phone" name="Vendor_name" required>
          </div>

          <div class="col-md-4">
              <label class="form-label">Vendor Address</label>
              <input type="text" class="form-control" v-model="Vendor_address" name="Vendor_name" required>
          </div>

          <div class="col-md-4">
              <label class="form-label">Vendor Location</label>
              <input type="text" class="form-control" v-model="Vendor_location" name="Vendor_name" required>
          </div>
          
      </div>
   
      <div class="d-flex gap-2 justify-content-end">
          <button type="submit" class="btn btn-primary">Register</button>
          <button type="button" class="btn btn-danger" onclick="document.getElementById('consumer').style.display='none'">Cancel</button>
      </div>
  </form>
           
  <div v-if="loading_spinner" class="text-center text-danger mt-2 mb-2">
                <span class=" text-sm">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Please wait ... 
                </span>
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
                        <v-client-table :data="Vendors" :columns="columns" :options="table_option">
                            <template #actions="props">
                                <div class="actions text-center">
                                  
                                  <a href="javascript:;" @click="setEditFormValues(props.row)" data-bs-toggle="modal" 
    :data-bs-target="'#modal-' + props.row.id">
    <button type="button" class="btn btn-primary p-1 btn-sm">View</button>
  </a>
           
                                </div>
                                <!-- modal starts  -->
                                <div class="modal fade mymodal" data-bs-backdrop="false" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content " >
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Update Vendor Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="updateVendor(selectedId)">
          <div class="modal-body">
    <div class="row">
      <div class="col-md-6">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="Vendor_name">
      </div>
     
      <div class="col-md-6">
        <label class="form-label">Phone</label>
        <input type="text" class="form-control" v-model="Vendor_phone">
      </div>
     
      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input type="text" class="form-control" v-model="Vendor_email">
      </div>
     
      <div class="col-md-6">
        <label class="form-label">Address</label>
        <input type="text" class="form-control bg-white" step="any" v-model="Vendor_address">
      </div>
      <div class="col-md-6">
        <label class="form-label">Location</label>
        <input type="text" class="form-control bg-white" step="any" v-model="Vendor_location">
      </div>
    </div>
  </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" @click="selectedId = props.row.id">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
                                 <!-- modal ends -->
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
                                       @click="deleteVendor(props.row.id);"
                                   >
                                       <polyline points="3 6 5 6 21 6"></polyline>
                                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                   </svg>
                               </a>
                            </template>
                            <template #salary="props"> ${{ props.row.salary }} </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
  </div>
  </template>
  
  <script setup>
    import { onMounted, ref ,inject} from 'vue';
  
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Default Order Sorting Table' });
    import axios from 'axios';

    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const columns = ref(['SNo', 'name', 'email', 'phone', 'address', 'location', 'actions']);
    const Vendors = ref([]);
    const loading_spinner = ref(false);
    const register_Vendor = ref(false);
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
        sortable: ['SNo', 'name', 'email', 'phone', 'location'],
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
    
  
    const fetchVendors = async () => {
  //    loading_spinner.value = true;
    axiosInstance
      .get(`/vendors`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          Vendors.value = response.data.map((Vendor, index) => ({
            SNo: index + 1,
            id: Vendor.id,
            name: Vendor.name,
            email: Vendor.email,
            phone:Vendor.phone,
            address: Vendor.address,
            location: Vendor.location
          }));
        } else {
            showError("Invalid response format");
        }
      })
      .catch((error) => {
        showError("Error fetching Vendor data:", error.message);
      })
      .finally(() => {
       loading_spinner = false;
      });
  }
  
 
  
  const Vendor_name = ref('');
  const  Vendor_phone= ref('');
  const Vendor_email = ref('');
  const Vendor_address =ref ('');
  const Vendor_location=ref('');


  const registerVendor = () => {
        register_Vendor.value = false;
        loading_spinner.value = true;
        const VendorData = {
           name: Vendor_name.value,
           phone:Vendor_phone.value,
           email:Vendor_email.value,
           address:Vendor_address.value,
           location:Vendor_location.value,
        };
  
        axiosInstance
            .post('/vendors', VendorData)
            .then((response) => {
                showMessage("Registered successfully");
                clearForm();
                fetchVendors();
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError("Error registering Vendor"+ error.status);
                loading_spinner.value = false;
            });
    };
  
  
    const updateVendor = (id) => {
    loading_spinner.value = true;
    const updateVendorData = {
           name: Vendor_name.value,
           phone:Vendor_phone.value,
           email:Vendor_email.value,
           address:Vendor_address.value,
           location:Vendor_location.value,
    };
  
    axiosInstance
      .put(`/vendors/${id}`, updateVendorData)
      .then((response) => {
        clearForm();
        fetchVendors();
        loading_spinner.value = false;
      showMessage("Vendor Updated successfully");
      })
      .catch((error) => {
        showError("Error updating Vendor..", error);
        loading_spinner.value = false;
      });
  };
  
    const clearForm = () => {
    Vendor_name.value = '';
    Vendor_phone.value= '';
    Vendor_email.value ='';
    Vendor_address.value ='';
    Vendor_location.value ='';
 
  };
  const setEditFormValues = (Vendor) => {
    Vendor_name.value = Vendor.name;
    Vendor_email.value = Vendor.email;
    Vendor_phone.value = Vendor.phone;
    Vendor_address.value = Vendor.address;
    Vendor_location.value = Vendor.location;
  };
  
    onMounted(() => {
         fetchVendors();
    });
  
    const selectedVendor = ref(null);
  
    const deleteVendor = (id) => {
    if (confirm("Are you sure you want to delete this Vendor?")) {
        loading_spinner.value = true;
            axiosInstance
            .delete(`/vendors/${id}`)
            .then((response) => {
                   loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Vendor Deleted successfully');
                    fetchVendors();
                } else {
                    showError('Fail to Delete vendor');
                    console.error("Error delete vendor:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deletion vendor:", error.message);
            });  
    
   }
   else{
    return;
   }
    };

  </script>
  
  <style>
   .mymodal{
    background-color: rgba(122, 122, 122, 0.653);
   }
  </style> 