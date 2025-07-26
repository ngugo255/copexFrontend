<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Units</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2 ">
                        <div class="ms-auto">
                            <button class="btn btn-primary " @click="unit_registration =! unit_registration">                           
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
 <form v-if="unit_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerUnit">
        <h4 class="text-center">UNIT REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-4">
                <label class="form-label">Unit Name</label>
                <input type="text" class="form-control" placeholder="Enter Unit Name" v-model="name" required>
            </div>

            <div class="col-md-4">
                <label class="form-label">Unit Short Name</label>
                <input type="text" class="form-control" placeholder="Enter Unit Short Name" v-model="short_name" required>
            </div>

            <div class="col-md-4" >
                    <label for="editunitStatus">Unit Status</label>
                    <select class="form-control form-select" id="editunitStatus" v-model="status" required>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="unit_registration = false; resetForm();">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- item registration form ends-->
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="units" :columns="columns" :options="table_option">
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
                              
<!-- modal starts -->

 
                                
                            </template>
                           <template #footer>
                               <div class="modal-footer">
                                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                   <button type="button" class="btn btn-primary" @click="save_edit" :disabled="isSaving" >Save changes</button>
                               </div>
                           </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>


 <!-- Edit Labour Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document"> <!-- Changed to modal-xl and added scrollable -->
        <div class="modal-content"> <!-- Added min-height -->
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Unit</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row mb-2">
                <div class= "col-md-4" >
                    <label for="editunitName">Unit Name</label>
                    <input type="text" class="form-control" id="editunitName" v-model="editingRow.name">
                </div>
                 <div class= "col-md-4">
                    <label for="editunitShortName">Unit Short Name</label>
                    <input type="text" class="form-control" id="editunitShortName" v-model="editingRow.short_name">
                </div>
                <div class="col-md-4" >
                    <label for="editunitStatus">Unit Status</label>
                    <select class="form-control form-select" id="editunitStatus" v-model="editingRow.status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

                <!-- Add more content here as needed -->
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
    import { onMounted, ref,inject } from 'vue';
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
    const short_name = ref('');
    const status = ref('');
    const loading_spinner = ref(false);
    const columns = ref(['SNo', 'name', 'short_name', 'status', 'actions']);
    const units = ref([]);
    const unit_registration = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'name','short_name','status'],
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

    const getunits = () => {
        loading_spinner.value = true;
        axiosInstance.get('/units').then((response) => {
            
            units.value = response.data.map((item, index) => {
                
                return {
                    SNo: index + 1,
                    id: item.id,
                    name: item.name,
                    short_name: item.short_name,
                    status: item.status, 
                };
            });
            
            loading_spinner.value = false;
        }).catch(error => {
            showError(error.message || "Failed to fetch units");
            loading_spinner.value = false;
        });
    };
    const registerUnit = () => {
        unit_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            short_name: short_name.value,
            status: status.value,
        };

        axiosInstance
            .post('/units', itemData)
            .then((response) => {
                getunits();
                loading_spinner.value = false;
                showMessage('Unit registered successfully!');
                resetForm();
                if (response.data.status === 201) {
                } else {
                    console.error("Error registering Order:", response.data.message);
                }
            })
            .catch((error) => {
                showError("Error registering Unts:", error.message);
                console.error(error);
            });
    };

    const showMessage = inject('showMessage');
    const showError = inject('showError');


    const delete_row = async (row) => {
    if (window.Swal) {
        window.Swal.fire({
            title: 'Delete Item',
            text: 'Are you sure you want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                loading_spinner.value = true;
                try {
                    await axiosInstance.delete(`/units/${row.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    // Remove the deleted row
                    units.value = units.value.filter((d) => d.id !== row.id);
                    
                    // Update SNo values to maintain sequential order
                    units.value = units.value.map((item, index) => ({
                        ...item,
                        SNo: index + 1
                    }));
                    
                    
                    
                    showMessage('Item deleted successfully');
                } catch (error) {
                    console.error('Error deleting item:', error);
                    showError('Failed to delete item: ' + error.message);
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
            const response = await axiosInstance.put(`/units/${editingRow.value.id}`, {
                name: editingRow.value.name,
                short_name: editingRow.value.short_name,
                status: editingRow.value.status
            });
            
            if (response.status === 200) {
                const index = units.value.findIndex(item => item.id === editingRow.value.id);
                if (index !== -1) {
                    units.value[index].name = editingRow.value.name;
                    units.value[index].short_name = editingRow.value.short_name;
                    units.value[index].status = editingRow.value.status;
                }
                showMessage('Unit updated successfully!');
            }
           
        } catch (error) {
            showError("Error updating Unit: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
      
    }; 


    const resetForm = () => {
    name.value = '';
    short_name.value = '';
    status.value = '';
};

    onMounted(() => {
        getunits();
        editModal = new bootstrap.Modal(document.getElementById('editModal'));
    });
</script>

