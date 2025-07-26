<template>
    <div class="layout-px-spacing">  
        <ul class="navbar-nav flex-row mt-2">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><span>Store Item Categories</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>

        <div class="d-flex me-4 mt-2 ">
            <div class="ms-auto">
               <button v-if="!store_item_registration" type="button" class="btn btn-outline-primary mb-2"  @click="store_item_registration = true">
        <template v-if="s && loading_spinner">
                    <span class="spinner-border spinner-border-sm text-success ms-2" role="status" aria-hidden="true"></span>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </template>
     </button>
     <button v-else type="button" class="btn btn-danger mb-2"  @click="store_item_registration = false">
      X
     </button>
            </div>
        </div>  

        <!-- loading spinner starts -->
        <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
        
        <!-- item registration form starts -->
        <form v-if="store_item_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerStoreItem">
            <h4 class="text-center">ITEM CATEGORY REGISTRATION FORM</h4>
            <div class="row mb-2">
                <div class="col-md-12">
                    <label class="form-label"> Name</label>
                    <input type="text" class="form-control" placeholder="Enter Item Category Name" v-model="name" required>
                </div>
            </div>
            <div class="text-center gap-2 justify-content-end">
                <button type="button" class="btn btn-danger me-3" @click="store_item_registration = false; resetForm();">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
        <!-- item registration form ends-->
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="StoreItemCategories" :columns="columns" :options="table_option">
                            <template #status="props">
                                <span class="badge" :class="props.row.status === 'Active' ? 'bg-success' : 'bg-secondary'">
                                    {{ props.row.status }}
                                </span>
                            </template>
                            <template #actions="props">
                                <a href="javascript:;" class="edit me-3" @click="edit_row(props.row)">
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
                                <a href="javascript:;" class="cancel" @click="delete_row(props.row)">
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

        <!-- Edit Labour Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Item Category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-2">
                            <div class="col-md-12">
                                <label for="editunitName">Item Category Name</label>
                                <input type="text" class="form-control" id="editunitName" v-model="editingRow.name">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="save_edit" :disabled="isSaving">Save changes</button>
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
    import { onMounted, ref, inject, computed } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

    const loadingIndicator = inject('loadingIndicator');
    let editModal = null;
    const editingRow = ref({});
    const name = ref('');
    const loading_spinner = ref(false);
    const columns = ref(['SNo', 'name',  'actions']);
    const StoreItemCategories = ref([]);
    const store_item_registration = ref(false);
    const isSaving = ref(false);
    
  
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

    const getStoreItemCategories = () => {
        loading_spinner.value = true;
        axiosInstance.get('store-item-categories').then((response) => {
            StoreItemCategories.value = response.data.map((item, index) => ({
                ...item,
                SNo: index + 1
            }));
              
            loading_spinner.value = false;
        }).catch(error => {
            showError(error.message);
            loading_spinner.value = false;
        });
    };

    const showMessage = inject('showMessage');
    const showError = inject('showError');

    const registerStoreItem = () => {
        loading_spinner.value = true;
        store_item_registration.value = false;
        const itemData = {
            name: name.value,
        };
    
        axiosInstance
            .post('store-item-categories', itemData)
            .then((response) => {
                getStoreItemCategories();
                loading_spinner.value = false;
                showMessage('Item Category registered successfully!');
                resetForm();
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
            });
    };

    const delete_row = async (row) => {
        if (window.Swal) {
            window.Swal.fire({
                title: 'Delete Item Category',
                text: 'Are you sure you want to delete Item Category?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    loading_spinner.value = true;
                    try {
                        await axiosInstance.delete(`store-item-categories/${row.id}`);
                        StoreItemCategories.value = StoreItemCategories.value.filter((d) => d.id !== row.id);
                        StoreItemCategories.value = StoreItemCategories.value.map((item, index) => ({
                            ...item,
                            SNo: index + 1
                        }));
                        showMessage('Item Category deleted successfully');
                    } catch (error) {
                        showError(error.message);
                    } finally {
                        loading_spinner.value = false;
                    }
                }
            });
        }
    };

    const edit_row = (row) => {
        editingRow.value = { ...row }; 
        editModal.show();
    };

     const save_edit = async () => {
        editModal.hide();
        if (loading_spinner.value) return;
        try {
            
            loading_spinner.value = true;
            const response = await axiosInstance.put(`/store-item-categories/${editingRow.value.id}`, {
                name: editingRow.value.name
            });
            
            if (response.status === 200) {
                const index = StoreItemCategories.value.findIndex(item => item.id === editingRow.value.id);
                if (index !== -1) {
                    StoreItemCategories.value[index].name = editingRow.value.name;
                }
                showMessage('Item Category updated successfully!');
            }
           
        } catch (error) {
            showError( error.message);
        } finally {
            loading_spinner.value = false;
        }
      
    };

    const resetForm = () => {
        name.value = '';
    };


    onMounted(() => {
        getStoreItemCategories();
        editModal = new bootstrap.Modal(document.getElementById('editModal'));
    });
</script>