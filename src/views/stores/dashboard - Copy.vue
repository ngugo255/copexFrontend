<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;"
                                    >Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page" ><span>Stores</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
                    <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
        <div class="d-flex"
        v-if="user_permissions.includes('can_register_store') "
        >

            <div class="ms-auto me-5 mt-3 text-dark" >
                        <button 
        data-bs-toggle="modal" 
        data-bs-target="#register_store"
        class="btn btn-primary  p-2 me-3">
         Add Store
        </button>
                <span 
                style="cursor: pointer;" @click="unlock  =! unlock"
                >
  <svg v-if="!unlock" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
  
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"/>
</svg>
                </span>


            </div>
         </div>
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="stores" :columns="columns" :options="table_option" >
                            <template #actions="props">
                                <div class="d-flex justify-content-center align-items-center"></div>
                                     <a href="javascript:;" class="edit me-2" >
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
                                                data-bs-toggle="modal" 
                                                data-bs-target="#edit_store"
                                                @click="edit_store(props.row)"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                    </a> 
                                        <a href="javascript:;" class="edit me-2" 
                                             data-bs-toggle="modal" 
                                             data-bs-target="#view_store"
                                               @click="fillModal(props.row)"
                                        >
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-primary bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>

                                        </a>
                                

<a href="javascript:;"
 class="text-danger"
 v-if="unlock"
 >
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
</a>



                    
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
   </div>
   <!-- Store registration starts -->
    <div class="modal fade" id="register_store" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">STORE REGISTRATION :</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_report" @click="clearForm"></button>
      </div>
    <form @submit.prevent="registerStore()">
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6">
             <input type="text" class="form-control" v-model="name" placeholder="Enter Store Name">
            </div>
              <div class="col-md-6">
                  <multiselect 
                    v-model="project"
                    track-by="id"
                    :options= "projects"
                    label = "short_name"
                    placeholder="Select Project"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
            </div>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
        <button type="submit" 
        class="btn btn-success py-2 px-2">
              <div v-if="sending" class="spinner-border text-white" role="status">
         <span class="sr-only"></span>
       </div>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
          </svg>
        </button>
        
      </div>
      </form>
    </div>
  </div>
  
</div>

    <!-- store registration ends -->


<!-- store edit modal starts -->
<div class="modal fade mymodal" id="edit_store" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">STORE EDITING </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" @click="clearForm"></button>
      </div>
      <form @submit.prevent="updateStore()">
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6">
             <input type="text" class="form-control" v-model="editName" placeholder="Enter Store Name" required >
            </div>
            <div class="col-md-6">
              <label  class="form-control" placeholder="Enter Project Name" >CENTER : {{ editProject }}</label>
            </div>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success py-2 px-2">
          <div v-if="sending" class="spinner-border text-white" role="status">
            <span class="sr-only"></span>
          </div>
          <span v-else>Save changes</span>
        </button>
      </div>
      </form>
    </div>
  </div>
</div>





     <!-- store preview modal starts -->
          <div class="modal fade" id="view_store" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"> {{ store.project }} - {{ store.name }} </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_report" @click="clearForm"></button>
      </div>
      <div class="modal-body">
        <div class="d-flex"
        @click="add_item =! add_item"
                >
            <div class="ms-auto">
                <button class="btn btn-sm "
                :class="[add_item ? 'btn-danger' : 'btn-success']"
                > {{ add_item ? 'X':'Add Item' }}</button>
            </div>
        </div>
        <form 
        v-if="add_item"
        @submit.prevent="registerStoreItem()" class="mt-3">
            <div class="row">
                <div class="col-md-6">
                  <multiselect 
                    v-model="item"
                    track-by="id"
                    :options= "items"
                    label = "name"
                    placeholder="Select An Item"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
                </div>
                <div class="col-md-5">
                    <input type="number" class="form-control" v-model="quantity" placeholder="Enter Item Quantity">
                </div>
                 <div class="col-md-1">
                  <button type="submit" class="btn btn-success btn-sm p-2">Save</button>
                 </div>
            </div>
        </form>
      <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="storeItems" :columns="itemsColumns" :options="table_option" >
                            <template #actions="props">
                                <div class="d-flex justify-content-center align-items-center"></div>
                                    <a href="javascript:;" class="edit me-2" >
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
                                                data-bs-toggle="modal" 
                                                data-bs-target="#view_items"
                                                @click="fillModal(props.row)"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                    </a>
                                        <a href="javascript:;" class="edit me-2" 
                                             data-bs-toggle="modal" 
                                             data-bs-target="#view_store"
                                               @click="fillModal(props.row)"
                                        >
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>

                                        </a>
                                

<a href="javascript:;"
 class="text-danger"
 v-if="unlock"
 >
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
</a>
  



                    
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>

      </div>

    </div>
  </div>

</div>
      <!-- store preview modal ends -->
</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref,inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    const sending = ref(false)
    const loadingIndicator = inject('loadingIndicator');
    const user = JSON.parse(localStorage.getItem("user"));
    const loading_spinner = ref(false);
    const columns = ref(['SNo', 'name','project','actions']);
    const itemsColumns = ref(['SNo', 'name','quantity']);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const unlock = ref(false);
    const project = ref('')
    const name = ref('')
    const add_item = ref(false);
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    
    // Add these new refs for edit functionality
    const editName = ref('');
    const editProject = ref('');
    const currentStoreId = ref(null);
    
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
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
    
    const store = ref('')
    const fillModal = (data) => {
        store.value = data;
        project.value = data.project || '';
        name.value = data.name || '';
        getStoreItems(data.id);
    }

    // Modified edit_store function
    const edit_store = (row) => {
        currentStoreId.value = row.id;
        editName.value = row.name;
        editProject.value = row.project || '';
        getStoreItems(row.id);
    };

    const stores = ref([])
    const getStores = () => {
        axiosInstance.get('/stores').then((response) => {
            stores.value = response.data.map((store,index) => ({
                ...store,
                SNo: index + 1,
                project: store.project
            }));
            loading_spinner.value = false;
        });
    };
    
    const storeItems = ref([])
    const getStoreItems = (id) => {
        axiosInstance.get(`/get-store-items?store_id=${id}`).then((response) => {
            storeItems.value = response.data.map((store,index) => ({
                ...store,
                SNo: index + 1,
                name: store?.items?.name || '',
            }));
            loading_spinner.value = false;
        });
    };
     
    const items = ref([])
    const getItems = () => {
        axiosInstance.get('/item-list').then((response) => {
            items.value = response.data
        });
    };

    const projects = ref([])
    const getProjects = () => {
        axiosInstance.get('/projects').then((response) => {
            projects.value = response.data
        });
    };
        
    const registerStore = () => {
        sending.value = true;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            project_id: project.value.id,
        };

        axiosInstance
            .post('/stores', itemData)
            .then((response) => {
              getStores();
              showMessage('Store registered')
              sending.value = false
              document.getElementById('close_report').click(); // Close modal
            })
            .catch((error) => {
                console.error("Error registering Store:", error.message);
                showError(error.message);
                sending.value = false
            });
    };  

    // Updated updateStore function
    const updateStore = () => {
        if (!currentStoreId.value) return;
        
        sending.value = true;
        const payload = {
            name: editName.value,
            project_id: editProject.value.id,
        }
        
        loading_spinner.value = true;
        axiosInstance.put(`/stores/${currentStoreId.value}`, payload)
            .then((response) => {
                loading_spinner.value = false;
                showMessage('Store updated successfully!');
                document.getElementById('close_editing').click();
                getStores();
                sending.value = false;
                document.getElementById('close_report').click(); // Close modal
            })
            .catch((error) => {
                loading_spinner.value = false;
                sending.value = false;
                showError(error.response?.data?.message || error.message || 'Failed to update store'); 
                console.error("Update error:", error); 
            }); 
    };
    
    const clearForm = () => {
        name.value = '';    
        quantity.value = '';
        item.value = '';
        editName.value = '';
        editProject.value = '';
        currentStoreId.value = null;
    }

    const item = ref('')
    const quantity = ref('')
    const registerStoreItem = () => {
        sending.value = true;
        loading_spinner.value = true;
        const itemData = {
            item_id: item.value.id,
            store_id: store.value.id,
            quantity: quantity.value,
        };

        axiosInstance
            .post('/store-items', itemData)
            .then((response) => {
              getStoreItems(store.value.id);
              showMessage('Item registered')
              sending.value = false
              clearForm()
            })
            .catch((error) => {
                console.error("Error registering Item:", error.message);
                showError(error.message);
                sending.value = false
            });
    };  

    onMounted(() => {
        loading_spinner.value = true;
        getStores();
        getProjects()
        getItems();
    });
</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }
 .table3 .actions svg {
    padding: 2px;
}
</style>
