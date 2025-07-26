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
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                <div class="row">

                 <!-- add role filter -->
        
            <div class="d-flex justify-content-center mb-3 ">
                <div class="input-group input-group-md" style="width: 700px;">
                    <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        class="form-control form-control-sm" 
                        placeholder="Search roles..." 
                        v-model="roleFilters[index]"
                    >
                </div>

            </div> 
        
    <!-- add role filter ends -->


                    <!-- card starts -->
                    <div class="col-md-6" v-for="(role, index) in getFilteredRoles(index)">

    <div class="card mb-3">
        <div class="card-header">
            <h5 class="card-title">{{ role.name }}</h5>
            <p class="card-subtitle text-muted mb-0">{{ role.description }}</p>
        </div>
        <div class="card-body text-start">
            <div class="d-flex">
                <button class="ms-auto btn btn-primary p-1" @click="toggleShowAddPermission(index)">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            </button>
            </div> 
            <div class="text-center"><u>PERMISSIONS</u></div>

      <div>

<!-- Add this filter for the displayed permissions -->

    <template v-if="role.permissions && role.permissions.length">
        <button
            class="btn btn-link p-0"
            @click="show[`perm_${index}`] = !show[`perm_${index}`]"
        >
            <span v-if="show[`perm_${index}`]">Hide Permissions ▲</span>
            <span v-else>Show Permissions ▼</span>
        </button>
        <div class="mt-2 mb-3"  v-if="show[`perm_${index}`]">
        <div class="input-group input-group-sm mb-2">
        <span class="input-group-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        </span>
        <input 
            type="text" 
            class="form-control form-control-sm" 
            placeholder="Filter assigned permissions..." 
            v-model="assignedPermissionFilters[index]"
        >
    </div>
</div>
  
        <ol
            v-if="show[`perm_${index}`]"
            class="ps-3 list-unstyled mt-2"
        >
            <li
                v-for="(permission, pIndex) in getFilteredAssignedPermissions(role, index)"
                :key="pIndex"
                class="d-flex justify-content-between align-items-center"
            >
                <span>{{ pIndex + 1 }}.{{ permission.name }}</span>
                <button
                    class="btn btn-danger btn-sm p-0 px-1 ms-1"
                    @click="deleteRolePermission(role.id, permission.id, index, findPermissionIndex(role, permission.id))"
                >
                   ×
                </button>
            </li>
        </ol>
    </template>

    <div v-else class="text-danger ps-3 mt-2">
      No permissions assigned to this role.
    </div>
  </div>  

<div v-if="showAddPermission(index)">

    <!-- add permission filter -->
            <div class="mt-2 mb-3">
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        class="form-control form-control-sm" 
                        placeholder="Search permissions..." 
                        v-model="permissionFilters[index]"
                    >
                </div>

            </div> 
    <!-- add permission filter ends -->

  <button
    v-for="permission in getFilteredAvailablePermissions(role, index)"
    :key="permission.id"
    class="btn btn-success mt-1 p-0 px-2 ms-2"
    @click="addPermissionLocally(role, permission)"
  >
    {{ permission.name }}

  </button>
  
</div>

        </div>
    </div>
</div>
                     <!-- card ends -->
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
    import '@/assets/sass/scrollspyNav.scss';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    const roles = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    const permissions = ref([]);
    const role_registration = ref(false);
    const description = ref('');
    const showMessage = inject('showMessage');
    const showError = inject('showError');

    const show = ref({});
    const permissionFilters = ref({});
    const permissionCategories = ref({});
    const assignedPermissionFilters = ref({});
    const roleFilters = ref({});

    const toggleShowAddPermission = (index) => {
        show.value[index] = !show.value[index];
    };

    const showAddPermission = (index) => {
        return show.value[index] === true;
    };

    const getAvailablePermissions = (role) => {
        return permissions.value.filter(
            (p) => !role.permissions.some(rp => rp.id === p.id)
        );
    };

    const addPermissionLocally = (role, permission) => {
        if (!role.permissions.some(rp => rp.id === permission.id)) {
            role.permissions.push({...permission});
            registerRolePermission(role.id, permission.id);
        }
    };

    const deleteRolePermission = (roleId,permissionId,roleIndex, permissionIndex) => {
        roles.value[roleIndex].permissions.splice(permissionIndex, 1);
        axiosInstance.delete(`/role-permission/${roleId}/${permissionId}`)
            .then((response) => {
                showMessage(response.data.message);
            });
    };

    const getRoles = () => {
        loading_spinner.value = true;
        axiosInstance.get('/roles')
            .then((response) => {
                roles.value = response.data;
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error fetching roles:", error.message);
            });
    };

    const getPermissions = () => {
        loading_spinner.value = true;
        axiosInstance.get('/permission')
            .then((response) => {
                permissions.value = response.data;
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error fetching roles:", error.message);
            });
    };

    const registerRolePermission = (roleId, permissionId) => {
        const itemData = {
            role_id: roleId,
            permission_id: permissionId,
        };
        axiosInstance
            .post('/role-permission', itemData)
            .then((response) => {
                showMessage('Permission Added successfully!');
                name.value = '';
                description.value = '';
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error registering Permission:", error);
            });
    }

    const getPermissionCategories = () => {
        const categories = new Set();
        permissions.value.forEach(permission => {
            categories.add(permission.category);
        });
        return Array.from(categories);
    }

    const getFilteredAvailablePermissions = (role, index) => {
        const availablePermissions = getAvailablePermissions(role);
        const filter = permissionFilters.value[index] || '';
        const category = permissionCategories.value[index] || '';

        return availablePermissions.filter(permission => {
            const nameMatch = permission.name.toLowerCase().includes(filter.toLowerCase());
            const categoryMatch = category === '' || permission.category === category;
            return nameMatch && categoryMatch;
        });
    }

    const getFilteredAssignedPermissions = (role, index) => {
        if (!role.permissions) return [];
        
        // If no filter is applied, return all permissions
        if (!assignedPermissionFilters.value[index] || !assignedPermissionFilters.value[index].trim()) {
            return role.permissions;
        }
        
        // Apply filter to assigned permissions
        const searchTerm = assignedPermissionFilters.value[index].toLowerCase();
        return role.permissions.filter(permission => 
            permission.name.toLowerCase().includes(searchTerm)
        );
    };

    const findPermissionIndex = (role, permissionId) => {
        if (!role.permissions) return -1;
        return role.permissions.findIndex(p => p.id === permissionId);
    };


            //METHOD FOR FILTERING ROLES
      const getFilteredRoles = (index) => {
        if (!roles.value) return [];
        if (!roleFilters.value[index] || !roleFilters.value[index].trim()) {
            return roles.value;
        }       
        const filter = roleFilters.value[index] || '';
        return roles.value.filter(role => {
            const nameMatch = role.name.toLowerCase().includes(filter.toLowerCase());
            return nameMatch;
        });
    };


    onMounted(() => {
        getRoles();
        getPermissions();
    });
</script>
