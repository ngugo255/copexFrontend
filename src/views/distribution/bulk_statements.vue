<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Bulk Statement</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="seperator-header layout-top-spacing">
        </div>
        <button v-if="!user_role == 8 " class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                
        <div class="row layout-top-spacing" >
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3" >
                        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            
            </span>
                        </div>
                        <v-client-table v-else :data="items" :columns="columns" :options="table_option">
                            <template #actions="props">
                                <router-link :to="'/bulk-distribution/' + props.row.project_id" class="text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link>
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
    import { useMeta } from '@/composables/use-meta';
    import axios from "axios";
    useMeta({ title: 'Bulk Statement' });
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const columns = ref(['SNo' ,'project','diesel','petrol',  'actions',]);
    const items = ref([]);
    const loading = ref(true); 
    // const showMessage = inject('showMessage');
    const showError = inject('showError');
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo' ,'project',  ],
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

    const axiosInstance = axios.create({

        baseURL:process.env.VUE_APP_API_BASE_URL
    });

//     const getLPO = async () => {
//         try {
//             const response = await axiosInstance.get("/items");
//             const filteredResponse = response.data.filter(item => 
//   item.status === 'approved' && 
//   (['1', '2'].includes(user_role) || item.project.company_id === 6)
// );
//             const projectTotals = {};
//             filteredResponse.forEach(item => {
//                 if (!projectTotals[item.project_id]) {
//                     projectTotals[item.project_id] = {
//                         project_name: item.project.short_name,
//                         total_petrol:0,
//                         total_amount: 0,
//                         total_diesel: 0,
//                         date_created: new Date(item.project.created_at).toLocaleDateString('en-GB'),
//                         project_id:item.project_id
//                         }
                      
//                     };
//                     if (item.description === "Petrol") {                         
//                             projectTotals[item.project_id].total_petrol += parseFloat(item.quantity); 
//                         }

//                     else if (item.description === "Diesel") {                          
//                             projectTotals[item.project_id].total_diesel += parseFloat(item.quantity); 
//                         }
                   
                
//             });

//             items.value = Object.entries(projectTotals).map(([project_id, data], index) => ({
//                 SNo: index + 1,
//                 project: data.project_name,
//                 diesel: data.total_diesel + ' litres',
//                 petrol: data.total_petrol + ' litres',
//                 project_id : data.project_id,
//                 date_created:data.date_created,
//             }));
//         } catch (error) {
//             showError(error.message);
//             console.error(error);
//         } finally {
//             loading.value = false; // Set loading to false after data is loaded
//         }
//     };

  const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
 const getLPO = async () => {
    try {
        loading.value = true;
        const response = await axiosInstance.get("/items");
        
        // Validate response
        if (!Array.isArray(response?.data)) {
            throw new Error("Invalid response format");
        }

        // Permission-based filtering
        let filteredResponse = [];
        if (user_permissions.includes('can_view_bushman_bulk') && 
            user_permissions.includes('can_view_copex_bulk')) {
            filteredResponse = response.data.filter(item => item.status === 'approved'  && (item.category==="Bulk" || item.description === "Petrol"||item.description === "Diesel" ));
        } 
        else if (user_permissions.includes('can_view_copex_bulk')) {
            filteredResponse = response.data.filter(item => 
                item.status === 'approved' && 
                ( item.project?.company_id === 6) &&  (item.category==="Bulk" || item.description === "Petrol"||item.description === "Diesel" )
            );
        } 
        else if (user_permissions.includes('can_view_bushman_bulk')) {
            filteredResponse = response.data.filter(item => 
                item.status === 'approved' &&  (item.category==="Bulk" || item.description === "Petrol"||item.description === "Diesel" ) &&
                (item.project?.company_id === 5)
            );
        }

        const projectTotals = {};
        const individualItems = [];
        let serialNumber = 1;

        filteredResponse.forEach(item => {
            // Validate required fields
            if (!item.project || !item.project_id) {
                console.warn("Item missing project data:", item);
                return;
            }

            // Handle Bushman items (company_id=5) as individual entries
            if (item.project.company_id === 5) {
                const quantity = parseFloat(item.quantity) || 0;
                individualItems.push({
                    SNo: serialNumber++,
                    project: item.project.short_name || 'N/A',
                    diesel: item.description === "Diesel" ? `${quantity} litres` : '0 litres',
                    petrol: item.description === "Petrol" ? `${quantity} litres` : '0 litres',
                    project_id: item.project_id,
                    date_created: formatDate(item.date_created || item.project.created_at),
                    isIndividual: true
                });
            } 
            // Aggregate other projects
            else {
                if (!projectTotals[item.project_id]) {
                    projectTotals[item.project_id] = {
                        SNo: serialNumber++,
                        project: item.project.short_name || 'N/A',
                        total_petrol: 0,
                        total_diesel: 0,
                        date_created: formatDate(item.project.created_at),
                        project_id: item.project_id
                    };
                }
                const quantity = parseFloat(item.quantity) || 0;
                if (item.description === "Petrol") {
                    projectTotals[item.project_id].total_petrol += quantity;
                } 
                else if (item.description === "Diesel") {
                    projectTotals[item.project_id].total_diesel += quantity;
                }
            }
        });

        // Convert aggregated projects to table format
        const aggregatedItems = Object.values(projectTotals).map(project => ({
            ...project,
            diesel: `${project.total_diesel} litres`,
            petrol: `${project.total_petrol} litres`,
            isIndividual: false
        }));

        // Combine both arrays while maintaining SNo order
        items.value = [...aggregatedItems, ...individualItems]
            .sort((a, b) => a.SNo - b.SNo);

    } catch (error) {
        showError(error.message);
        console.error("Fetch error:", error);
        items.value = []; // Clear items on error
    } finally {
        loading.value = false;
    }
};

// Helper function for consistent date formatting
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB') || 'N/A';
}



    onMounted(() => {
        getLPO();
        
    });

</script>
