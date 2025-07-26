<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Items</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2 ">
                        <div class="ms-auto">
                            <button class="btn btn-primary " @click="item_registration =! item_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  

         
        <!-- loading spinner starts -->
        <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

        
 <!-- item registration form starts -->
 <form v-if="item_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerItem">
        <h4 class="text-center">ITEM  REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-3">
                <label class="form-label">Item Name</label>
                <input type="text" class="form-control" placeholder="Enter Item Name" v-model="name" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Item </label>
                <multiselect 
                    v-model="category"
                    :options="itemCategory"
                    track-by="id"
                    label="name"
                    placeholder="Select Item Category"
                    :searchable="true"
                    :multiple="false"
                    required>
                </multiselect>
            </div>
            <div class="col-md-6">
                <label class="form-label">Item Description</label>
                <input type="text" class="form-control" placeholder="Enter Item Description" v-model="description" step="any" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="item_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>

<!-- item edit modal starts -->
<div class="modal fade" id="edit_role" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ITEM EDITING {{category}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" @click="clearForm"></button>
      </div>
      <form @submit.prevent="updateItem()">
      <div class="modal-body">
        <div class="row mb-2">
            <div class="col-md-4">
                <label class="form-label">Item Name</label>
                <input type="text" class="form-control" v-model="editName" placeholder="Enter Item Name" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" v-model="editDescription" placeholder="Enter Description" required>
            </div>

            <div class="col-md-4">
                <label class="form-label">Item Category</label>
                <multiselect 
                    v-model="editCategory"
                    :options="itemCategory"
                    track-by="id"
                    label="name"
                    placeholder="Select Item Category"
                    :searchable="true"
                    :multiple="false"
                    required>
                </multiselect>
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
                                                data-bs-target="#edit_role"
                                                @click="editItem(props.row)"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                    </a>


                        
                                <!-- <a href="javascript:void(0);" class="text-primary"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </a> -->
                                
                                <a href="javascript:void(0);" title="Delete" @click="deleteItem(props.row.id)">
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
                              
<!-- modal starts -->

 
                                
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
    import { onMounted, ref,inject,computed } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import Swal from 'sweetalert2';
    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });


    const loadingIndicator = inject('loadingIndicator'); 
    const name = ref('');
    const loading_spinner = ref(false);
    const category = ref('');
    const columns = ref(['Sno','id', 'name','description','category','actions']);
    const items = ref([]);
    const itemCategory = ref([]);
    const item_registration = ref(false);
    const description = ref('');
    const editName = ref('');
    const editDescription = ref('');
    const editCategory = ref({});
    const editId = ref(null);
    const sending = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'service_name'],
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

    const getItems = () => {
        loading_spinner.value = true;
        axiosInstance.get('/item-list').then((response) => {
            items.value = response.data.map((item, index) => ({
                ...item,
                Sno: index + 1,
                category: item.category ? item.category.name : '',

            }));
            loading_spinner.value = false;
        });
    };

    const getItemCategory = () => {
        loading_spinner.value = true;
        axiosInstance.get('/store-item-categories').then((response) => {
            itemCategory.value = response.data;
            loading_spinner.value = false;
        });
    };

    const registerItem = () => {
        item_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            category_id: category.value.id,
            description: description.value,
        };

        axiosInstance
            .post('/item-list', itemData)
            .then((response) => {
                getItems();
                loading_spinner.value = false;
                showMessage('Item registered successfully!');
                if (response.data.status === 201) {
                } else {
                    console.error("Error registering Order:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error registering Order:", error.message);
            });
    };

    const showMessage = inject('showMessage');
    const showError = inject('showError');

   const deleteItem = (id) => {
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
                loading_spinner.value = true;
                axiosInstance.delete(`/item-list/${id}`)
                    .then((response) => {
                        getItems();
                        showMessage(response.data.message);
                        loading_spinner.value = false;
                    });
            }
        })
    };

 



  
    const editItem = (row) => {
        editId.value = row.id;
        editName.value = row.name;
        editDescription.value = row.description;
        editCategory.value = row.category;
        editCategory.value = itemCategory.value.find(item => item.name === row.category);
    };

    const updateItem = () => {
        sending.value = true;
        const itemData = {
            name: editName.value,
            category_id: editCategory.value.id,
            description: editDescription.value,
        };

        axiosInstance.put(`/item-list/${editId.value}`, itemData)
            .then((response) => {
                getItems();
                sending.value = false;
                document.getElementById('close_editing').click();
                showMessage('Item updated successfully!');
            })
            .catch((error) => {
                sending.value = false;
                showError(error.message);
                console.error("Error updating item:", error.message);
            });
    };

    onMounted(() => {
        getItems();
        getItemCategory();
    });
</script>
