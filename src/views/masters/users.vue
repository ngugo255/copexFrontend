<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Users</span></li>
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
        <div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="height: 100px;">
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
 <!-- item registration form starts -->
 <form v-if="item_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerUser">
        <h4 class="text-center">USER REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-3">
                <label class="form-label">User Name</label>
                <input type="text" class="form-control" placeholder="Enter UserName" v-model="username" required>
            </div>

            <div class="col-md-3">
                <label class="form-label" >User Role</label>
                <Multiselect
  v-model="user_role"
  :options="roles"
  :close-on-select="true"
  label="name"
  value-prop="id"
  placeholder="Select a role"  
  :searchable="true" 
/>
            </div>

            <div class="col-md-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Enter Email" v-model="useremail" step="any" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Enter Password" v-model="password" step="any" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="item_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
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

  <a  href="javascript:void(0)" class="text-success" title="Edit" 
     @click="selectedId = props.row.id ,user_role = props.row.role, useremail=props.row.email, username=props.row.name" data-bs-toggle="modal" 
     :data-bs-target="'#modal-' + props.row.id">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>

  <div class="modal fade" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Update User Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
   <form @submit.prevent="updateUser(selectedId)">
  <div class="modal-body">
    <div class="row">
      <div class="col-md-6">
        <label class="form-label">User Name</label>
        <input type="text" class="form-control" v-model="username" >
      </div>
      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input type="text" class="form-control bg-white" v-model="useremail">
      </div>

      <div class="col-md-6">
        <label class="form-label">User Role</label>
        <Multiselect
          v-model="user_role"
          :options="roles"
          :close-on-select="true"
          label="name"
          value-prop="id"
          placeholder="Select a role"
          :searchable="true"
        />
      </div>

      <div class="col-md-6">
        <label class="form-check-label">
          <input type="checkbox" v-model="updatePassword" class="form-check-input"> Update Password
        </label>
      </div>

      <div class="col-md-6" v-if="updatePassword">
        <label class="form-label">New Password</label>
        <input type="password" v-model="password" class="form-control">
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Save changes</button>
  </div>
</form>

      </div>
    </div>
  </div>
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
    import { onMounted, ref,inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });
    
    const updatePassword = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const name = ref('');
    const loading_spinner = ref(false);
    const username = ref('');
    const useremail = ref('');
    const password = ref(false);
    const user_role = ref('');
    const roles = ref([]);
    const columns = ref(['Sn','User_ID','Role','Username','Email','actions']);
    const items = ref([
        
    ]);
    const item_registration = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['Sn','User ID' ],
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
    // api base user creation for sample 
 
   
    
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });


    const getRoles = () => {
        loading_spinner.value = true;
         axiosInstance.get('/roles').
         then((response) => {
            roles.value= response.data;
            console.log("user roles",response.data);
            loading_spinner.value = false;
        });
    };


    const getUsers = () => {
        loading_spinner.value = true;
         axiosInstance.get('/users').
         then((response) => {
            items.value = response.data.map((item, index) => ({
                ...item,
                Sn: index + 1,
                Role: item.role,
                User_ID: item.id,
                Username: item.name,
                Email: item.email,
                
            }));
            loading_spinner.value = false;
        });
    };
    //method fro register users
    const registerUser= () => {
       
    if (!username.value || !useremail.value) {
    showError("Please!..Provide username and email.");
    return;
   }

   if (!password.value) {
    showError("User must have password...");
    return;
   }
   item_registration.value = false;
   loading_spinner.value = true;
   const itemData = {
            name:username.value,
            email:useremail.value,
            role:user_role.value,
            password:password.value,
           
        };
        axiosInstance
            .post('/users', itemData)
            .then((response) => {
                getUsers();
                loading_spinner.value = false;
                showMessage('User registered successfully!');
            })
            .catch((error) => {
                console.error("Error registering User:", error);
                showError(error.message);
                
            });
            loading_spinner.value = false;
    };

    //for editing the user details
    const updateUser = (id) => {
      loading_spinner.value = true;
    const newItemData = {
       role: user_role.value,
       name: username.value,
       email: useremail.value,
       ...(password.value && { password: password.value }),
};

           axiosInstance
               .put(`/users/${id}`, newItemData)
               .then((response) => {
                   getUsers();
                   loading_spinner.value = false;
                   user_role.value='',
                   password.value='',
                   showMessage('User updated successfully!');
               })
               .catch((error) => {
                showError("Error code : "+ error.status);
                console.log(error);
               });
               loading_spinner.value = false;
       };


    onMounted(() => {
        getUsers();
        getRoles();
    });
</script>