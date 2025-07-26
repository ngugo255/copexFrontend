<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>roles</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2">
                        <div class="ms-auto">
                            <button class="btn btn-primary" @click="role_registration =! role_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
                    <!-- role registration form starts -->
 <form v-if="role_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerRole">
        <h4 class="text-center">ROLE  REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-4">
                <label class="form-label">Role Name</label>
                <input type="text" class="form-control" placeholder="Enter role Name" v-model="name" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" placeholder="Enter role Description" v-model="description" step="any" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Path</label>
                <input type="text" class="form-control" placeholder="Enter Path" v-model="path" step="any" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="role_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- item registration form ends-->
 
                           <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->

        
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
                                                @click="edit_role(props.row)"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                    </a>
                                
                                <a href="javascript:void(0);" title="Delete" @click="deleteRole(props.row.id)">
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

        
<!-- role edit modal starts -->
<div class="modal fade" id="edit_role" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ROLE EDITING</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_editing" @click="clearForm"></button>
      </div>
      <form @submit.prevent="updateRole()">
      <div class="modal-body">
        <div class="row mb-2">
            <div class="col-md-4">
                <label class="form-label">Role Name</label>
                <input type="text" class="form-control" v-model="editName" placeholder="Enter Role Name" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" v-model="editDescription" placeholder="Enter Description" required>
            </div>
       
      
            <div class="col-md-4">
                <label class="form-label">Path</label>
                <input type="text" class="form-control" v-model="editPath" placeholder="Enter Path">
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
    import '@/assets/sass/scrollspyNav.scss';
    import Swal from 'sweetalert2';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const loadingIndicator = inject('loadingIndicator');
    
    const roles = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    const columns = ref(['id', 'name','description', 'path','actions']);
    const items = ref([]);
    const role_registration = ref(false);
    const description = ref('');
    const path = ref('');
    const editId = ref(null);
    const editName = ref('');
    const editDescription = ref('');
    const editPath = ref('');
    const sending = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
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

    const getRoles = () => {
        loading_spinner.value = true;
        axiosInstance.get('/roles')
            .then((response) => {
               roles.value = response.data;
                items.value = response.data; // Bind the data to items
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error fetching roles:", error.message);
            });
    };

    const deleteRole = (id) => {
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
                axiosInstance.delete(`/roles/${id}`)
                    .then((response) => {
                        getRoles();
                        showMessage(response.data.message);
                        loading_spinner.value = false;
                        Swal.fire(
                            'Deleted!',
                            'Role has been deleted.',
                            'success'
                        )
                    });
            }
        })
    };

    const registerRole = () => {
        role_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            name: name.value,
            description: description.value,
            path: path.value
        };

        axiosInstance
            .post('/roles', itemData)
            .then((response) => {
                getRoles();
                loading_spinner.value = false;
                showMessage('role registered successfully!');
                name.value = '';
                description.value = '';
                path.value = '';
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error registering Order:", error.message);
            });
    };


const edit_role = (row) => {
    editId.value = row.id;
    editName.value = row.name;
    editDescription.value = row.description;
    editPath.value = row.path;
};

const updateRole = () => {
    sending.value = true;
    const roleData = {
        name: editName.value,
        description: editDescription.value,
        path: editPath.value
    };

    axiosInstance.put(`/roles/${editId.value}`, roleData)
        .then((response) => {
            getRoles();
            sending.value = false;
            document.getElementById('close_editing').click();
            showMessage('Role updated successfully!');
        })
        .catch((error) => {
            sending.value = false;
            showError(error.message);
            console.error("Error updating role:", error.message);
        });
};

const clearForm = () => {
    editId.value = null;
    editName.value = '';
    editDescription.value = '';
    editPath.value = '';
};



    onMounted(() => {
        getRoles();
    });
</script>
