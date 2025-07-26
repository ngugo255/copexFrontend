<template>
    <div class="layout-px-spacing">
      
        
        <div class="text-center mb-4">
            <h4>COPEX CONTRACTORS COMPANY LTD</h4>
        </div>

        <!-- Tab navigation -->
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === 'labour_requests' }"
                    @click="viewLabourRequests"
                >
                    Labour Request
                </button>
            </li>
            <li class="nav-item">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === 'labour_types' }"
                    @click="viewLabourTypes"
                >
                    Labour Type
                </button>
            </li>
            <li class="nav-item">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === 'labour_request_list' }"
                    @click="viewLabourRequestList"
                >
                    Labour Request List
                </button>
            </li>
        </ul>

        <!-- Tables Container -->
        <div class="table-container">
            <!-- Labour Requests Table -->
            <div v-if="activeTab === 'labour_requests'" class="row">
                <div class="col-xl-12 col-lg-12 col-sm-12">
                    <div class="panel br-6 p-0">
                        <div class="panel-heading">
                            <h4 class="panel-title">Labour Requests</h4>
                        </div>
                        <div class="custom-table">
                            <v-client-table :data="labour_requests" :columns="columns" :options="table_option">
                                <template #actions="props">
                                    <div class="actions text-center">
                                        <a href="javascript:;" class="edit me-2" @click="edit_row(props.row, 'labour_requests')">
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
                                                class="feather feather-edit-2 text-success"
                                            >
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
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
                                                class="feather feather-x-circle table-cancel"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </template>
                            </v-client-table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Labour Types Table -->
            <div v-if="activeTab === 'labour_types'" class="row">
                <div class="col-xl-12 col-lg-12 col-sm-12">
                    <div class="panel br-6 p-0">
                        <div class="panel-heading">
                            <h4 class="panel-title">Labour Types</h4>
                        </div>
                        <div class="custom-table">
                            <v-client-table :data="labour_types" :columns="labour_types_columns" :options="table_option">
                                    <template #rate="props">
                                      {{ Number(props.row.rate).toLocaleString() }}

                                </template>
                                <template #actions="props">
                                    <div class="actions text-center">
                                        <a href="javascript:;" class="edit me-2" @click="edit_row(props.row, 'labour_types')">
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
                                                class="feather feather-edit-2 text-success"
                                            >
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
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
                                                class="feather feather-x-circle table-cancel"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </template>
                            </v-client-table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Labour Request List Table -->
            <div v-if="activeTab === 'labour_request_list'" class="row">
                <div class="col-xl-12 col-lg-12 col-sm-12">
                    <div class="panel br-6 p-0">
                        <div class="panel-heading">
                            <h4 class="panel-title">Labour Request List</h4>
                        </div>
                        <div class="custom-table">
                            <v-client-table :data="labour_request_list" :columns="labour_request_list_columns" :options="table_option">
                                <template #actions="props">
                                    <div class="actions text-center">
                                        <a href="javascript:;" class="edit me-2" @click="edit_row(props.row, 'labour_request_list')">
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
                                                class="feather feather-edit-2 text-success"
                                            >
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
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
                                                class="feather feather-x-circle table-cancel"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </template>
                            </v-client-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit {{ getModalTitle() }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Labour Requests Edit Form -->
                        <div v-if="currentTableType === 'labour_requests'">
                            <div class="form-group mb-3">
                                <label for="project">Project</label>
                                <multiselect 
                                    v-model="editingRow.project_obj"
                                    track-by="id"
                                    :options="projects"
                                    label="short_name"
                                    placeholder="Select Project"
                                    :searchable="true"
                                    :required="true"
                                    :multiple="false"
                                    selected-label=""
                                    select-label=""
                                    deselect-label=""
                                    @input="updateProjectName"
                                ></multiselect>
                            </div>
                            <div class="form-group mb-3">
                                <label for="date">Date</label>
                                <input type="date" class="form-control" id="date" v-model="editingRow.date">
                            </div>
                            <div class="form-group mb-3">
                                <label for="days">Days</label>
                                <input type="number" class="form-control" id="days" v-model="editingRow.days">
                            </div>
                        </div>

                        <!-- Labour Types Edit Form -->
                        <div v-if="currentTableType === 'labour_types'">
                            <div class="form-group mb-3">
                                <label for="labour_type">Labour Type</label>
                                <multiselect 
                                    v-model="editingRow.labour_type_obj"
                                    track-by="id"
                                    :options="labourTypesList"
                                    label="name"
                                    placeholder="Select Labour Type"
                                    :searchable="true"
                                    :required="true"
                                    :multiple="false"
                                    selected-label=""
                                    select-label=""
                                    deselect-label=""
                                    @input="updateLabourType"
                                ></multiselect>
                                <div v-if="labourTypesList.length === 0" class="text-danger mt-1">
                                    Loading labour types...
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="task">Task</label>
                                <input type="text" class="form-control" id="task" v-model="editingRow.task">
                            </div>
                            <div class="form-group mb-3">
                                <label for="quantity">Quantity</label>
                                <input type="number" class="form-control" id="quantity" v-model="editingRow.quantity">
                            </div>
                            <div class="form-group mb-3">
                                <label for="rate">Rate</label>
                                <input type="number" class="form-control" id="rate" v-model="editingRow.rate" readonly>
                                <small class="form-text text-muted">Rate is determined by the selected labour type</small>
                            </div>
                        </div>

                        <!-- Labour Request List Edit Form -->
                        <div v-if="currentTableType === 'labour_request_list'">
                            <div class="form-group mb-3">
                                <label for="labour_id">Labour ID</label>
                                <input type="text" class="form-control" id="labour_id" v-model="editingRow.labour_id">
                            </div>
                            <div class="form-group mb-3">
                                <label for="labour_name">Labour Name</label>
                                <input type="text" class="form-control" id="labour_name" v-model="editingRow.labour_name">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="save_edit">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch,inject } from 'vue';
    import { Modal } from 'bootstrap';
    import axios from 'axios';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { useMeta } from '@/composables/use-meta';
    
    useMeta({ title: 'Basic Table' });
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const isLoading = ref(false);
    
    // Define columns for each table
    const labour_request_list_columns = ref(['SNo', 'labour_id', 'labour_name', 'actions']);
    const columns = ref(['SNo', 'project', 'date', 'days', 'actions']);
    const labour_types_columns = ref(['SNo', 'labour_type', 'task', 'quantity', 'rate', 'actions']);
    
    // Data for each table
    const labour_requests = ref([]);
    const labour_request_list = ref([]);
    const labour_types = ref([]);
    
    
    // Table options
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        resizableColumns: false,
    });

    // Active tab state
    const activeTab = ref('labour_requests');
    
    // Edit modal reference
    let editModal = null;
    
    // Current editing state
    const editingRow = ref({});
    const editingIndex = ref(-1);
    const currentTableType = ref('');
    
    // Projects list for dropdown
    const projects = ref([]);
    
    // Labour types list for dropdown
    const labourTypesList = ref([]);
    
    // Tab switching functions
    const viewLabourRequests = () => {
        
        activeTab.value = 'labour_requests';
        fetchLabourRequests();
    };
    
    const viewLabourTypes = () => {
        
        activeTab.value = 'labour_types';
        fetchLabourTypes();
    };
    
    const viewLabourRequestList = () => {
        
        activeTab.value = 'labour_request_list';
        fetchLabourRequestList();
    };

    // API fetch functions
    const fetchLabourRequests = async () => {
        try {
            const response = await fetch('https://bcftrack.trustdigital.space/api/v1/labour-request');
            const data = await response.json();
            
            // Process data if needed
            const processedData = Array.isArray(data) ? data.map((item, index) => ({
                ...item,
                SNo: index + 1
            })) : [];
            
            labour_requests.value = processedData.length > 0 ? processedData : [
                
            ];
        } catch (error) {
            
            labour_requests.value = [
                
            ];
        }
    };
   
    const fetchLabourTypes = async () => {
        isLoading.value = true;
        try {
            console.log("Fetching labour types...");
            const response = await axios.get('https://construction.trustdigital.space/api/v1/request-labour-types');
            const data = response.data;
            console.log("Labour types API response:", data);
            
            // Transform data to match table columns
            const transformedData = Array.isArray(data) ? data.map((item, index) => {
                return {
                    id: item.id,
                    SNo: index + 1,
                    labour_type: item.labour_type?.name || 'Unknown',
                    task: item.task,
                    quantity: item.quantity,
                    rate: item.labour_type?.rate || 0,
                    // Keep the original data for reference
                    labour_type_id: item.labour_type_id,
                    labour_request_id: item.labour_request_id,
                    // Store the complete labour_type object for the dropdown
                    labour_type_obj: item.labour_type,
                    _original: item
                };
            }) : [];
            
            console.log("Transformed labour types data:", transformedData);
            labour_types.value = transformedData.length > 0 ? transformedData : [];
        } catch (error) {
            console.error('Error fetching labour types:', error);
            console.error('Error details:', error.response?.data || error.message);
            labour_types.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    const fetchLabourRequestList = async () => {
        try {
            const response = await fetch('https://bcftrack.trustdigital.space/api/v1/labour-request-list');
            const data = await response.json();
            
            // Process data if needed
            const processedData = Array.isArray(data) ? data.map((item, index) => ({
                ...item,
                SNo: index + 1
            })) : [];
            
            labour_request_list.value = processedData.length > 0 ? processedData : [
               
            ];
        } catch (error) {
            
            labour_request_list.value = [
                
            ];
        }
    };

    // Delete row function
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
                isLoading.value = true;
                try {
                    let endpoint = '';
                    let refreshFunction = null;
                    
                    // Determine the correct endpoint and refresh function
                    if (activeTab.value === 'labour_requests') {
                        endpoint = `https://bcftrack.trustdigital.space/api/v1/labour-request/${row.id}`;
                        refreshFunction = fetchLabourRequests;
                    } else if (activeTab.value === 'labour_types') {
                        endpoint = `https://construction.trustdigital.space/api/v1/request-labour-types/${row.id}`;
                        refreshFunction = fetchLabourTypes;
                    } else if (activeTab.value === 'labour_request_list') {
                        endpoint = `https://bcftrack.trustdigital.space/api/v1/labour-request-list/${row.id}`;
                        refreshFunction = fetchLabourRequestList;
                    }
                    
                    // First make the API call
                    await axios.delete(endpoint);
                    
                    // Only update local state after successful API call
                    if (activeTab.value === 'labour_requests') {
                        labour_requests.value = labour_requests.value.filter((d) => d.id !== row.id);
                    } else if (activeTab.value === 'labour_types') {
                        labour_types.value = labour_types.value.filter((d) => d.id !== row.id);
                    } else if (activeTab.value === 'labour_request_list') {
                        labour_request_list.value = labour_request_list.value.filter((d) => d.id !== row.id);
                    }
                
                    showMessage('Deleted Successfully')
                    // Refresh data from server
                    await refreshFunction();
                    
                } catch (error) {
                    console.error('Error deleting item:', error);
                    
                    // Show error message
                    window.Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete item: ' + (error.response?.data?.message || error.message),
                        padding: '2em',
                    });
                } finally {
                    isLoading.value = false;
                }
            }
        });
    }
};
    

    // Edit row function with improved handling for labour types
    const edit_row = (row, tableType) => {
        console.log("Editing row:", row, "Table type:", tableType);
        
        // Set the current table type
        currentTableType.value = tableType;
        
        // Create a deep copy of the row to edit
        editingRow.value = JSON.parse(JSON.stringify(row));
        
        // Find the index of the row in the appropriate array
        if (tableType === 'labour_requests') {
            editingIndex.value = labour_requests.value.findIndex(item => item.id === row.id);
            // Make sure projects are loaded when editing a labour request
            fetchProjects().then(() => {
                // Find the matching project object for the multiselect
                if (editingRow.value.project_id && projects.value.length > 0) {
                    const matchingProject = projects.value.find(p => p.id === editingRow.value.project_id);
                    if (matchingProject) {
                        editingRow.value.project_obj = matchingProject;
                        
                    } 
                }
            });
        } else if (tableType === 'labour_types') {
            editingIndex.value = labour_types.value.findIndex(item => item.id === row.id);
            console.log("Editing labour type at index:", editingIndex.value);
            console.log("Editing row labour type:", editingRow.value.labour_type);
            // Make sure labour types list is loaded when editing a labour type
            fetchLabourTypesList().then(() => {
                // Find the matching labour type object for the multiselect
                if (editingRow.value.labour_type_id && labourTypesList.value.length > 0) {
                    const matchingLabourType = labourTypesList.value.find(lt => lt.id === editingRow.value.labour_type_id);
                    if (matchingLabourType) {
                        console.log("Found matching labour type:", matchingLabourType);
                        editingRow.value.labour_type_obj = matchingLabourType;
                    } else {
                        console.warn("No matching labour type found in dropdown list");
                        // If we can't find it in the dropdown, use the one from the row data
                        if (row.labour_type_obj) {
                            editingRow.value.labour_type_obj = row.labour_type_obj;
                        }
                    }
                }
            });
        } else if (tableType === 'labour_request_list') {
            editingIndex.value = labour_request_list.value.findIndex(item => item.id === row.id);
        }
        
        // Show the edit modal
        editModal.show();
    };

    // Save edited row with improved error handling and debugging
    const save_edit = async () => {
        console.log("Saving edited row:", editingRow.value, "Table type:", currentTableType.value);
        isLoading.value = true;
        
        try {
            if (currentTableType.value === 'labour_types') {
                // Make sure to use the labour type ID from the selected labour type object
                if (editingRow.value.labour_type_obj) {
                    editingRow.value.labour_type = editingRow.value.labour_type_obj.name;
                    editingRow.value.labour_type_id = editingRow.value.labour_type_obj.id;
                    editingRow.value.rate = editingRow.value.labour_type_obj.rate || 0;
                }
                
                // Prepare data for API - only include fields the API expects
                const dataToSend = {
                    labour_request_id: editingRow.value.labour_request_id || 0,
                    labour_type_id: editingRow.value.labour_type_id,
                    quantity: parseInt(editingRow.value.quantity) || 0,
                    task: editingRow.value.task || ""
                };
                
                console.log("Sending labour type update to API:", dataToSend);
                
                // Log the full request details for debugging
                console.log("Request URL:", `https://construction.trustdigital.space/api/v1/request-labour-types/${editingRow.value.id}`);
                console.log("Request method: PUT");
                console.log("Request headers:", {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                });
                console.log("Request body:", JSON.stringify(dataToSend));
                
                // Try with axios first
                try {
                    const response = await axios.put(
                        `https://construction.trustdigital.space/api/v1/request-labour-types/${editingRow.value.id}`, 
                        dataToSend, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }
                    );
                    
                    console.log("Labour type update response:", response);
                    
                    // Update local data and show success
                    handleSuccessfulUpdate(response.data);
                } catch (axiosError) {
                    console.error("Axios error:", axiosError);
                    
                    // If axios fails, try with fetch as a fallback
                    console.log("Trying with fetch as fallback...");
                    
                    const fetchResponse = await fetch(
                        `https://construction.trustdigital.space/api/v1/request-labour-types/${editingRow.value.id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(dataToSend)
                        }
                    );
                    
                    console.log("Fetch response status:", fetchResponse.status);
                    console.log("Fetch response headers:", fetchResponse.headers);
                    
                    // Check if the response is JSON
                    const contentType = fetchResponse.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await fetchResponse.json();
                        console.log("Fetch response data:", data);
                        
                        if (fetchResponse.ok) {
                            // Update local data and show success
                            handleSuccessfulUpdate(data);
                        } else {
                            throw new Error(`Server responded with ${fetchResponse.status}: ${JSON.stringify(data)}`);
                        }
                    } else {
                        const text = await fetchResponse.text();
                        console.log("Fetch response text:", text);
                        
                        if (fetchResponse.ok) {
                            // Try to refresh data from server
                            await fetchLabourTypes();
                            
                            // Close modal and show success
                            editModal.hide();
                            showSuccessMessage('Row edited successfully');
                        } else {
                            throw new Error(`Server responded with ${fetchResponse.status}: ${text}`);
                        }
                    }
                }
            } 
            else if (currentTableType.value === 'labour_requests') {
                // Make sure to use the project ID from the selected project object
                if (editingRow.value.project_obj) {
                    editingRow.value.project = editingRow.value.project_obj.name;
                    editingRow.value.project_id = editingRow.value.project_obj.id;
                }
                
                // Prepare data for API
                const dataToSend = {
                    id: editingRow.value.id,
                    project_id: editingRow.value.project_id,
                    date: editingRow.value.date,
                    days: editingRow.value.days,
                    task: editingRow.value.task || "Road and gravel clearence" // Default task if not provided
                };
                
                // Send update to API
                const response = await axios.put(`https://bcftrack.trustdigital.space/api/v1/labour-request/${editingRow.value.id}`, dataToSend);
                // Update local data
                labour_requests.value[editingIndex.value] = response.data;
                
                // Refresh the data from server
                fetchLabourRequests();
            } 
            else if (currentTableType.value === 'labour_request_list') {
                // Prepare data for API
                const dataToSend = {
                    id: editingRow.value.id,
                    labour_id: editingRow.value.labour_id,
                    labour_name: editingRow.value.labour_name
                    // Add any other fields that need to be updated
                };
                
                
                // Send update to API
                const response = await axios.put(`https://bcftrack.trustdigital.space/api/v1/labour-request-list/${editingRow.value.id}`, dataToSend);
                
                // Update local data
                if (response.data) {
                    labour_request_list.value[editingIndex.value] = { 
                        ...labour_request_list.value[editingIndex.value],
                        ...response.data,
                        SNo: labour_request_list.value[editingIndex.value].SNo // Preserve the SNo
                    };
                } else {
                    // If the API doesn't return the updated data, update with local data
                    labour_request_list.value[editingIndex.value] = { ...editingRow.value };
                }
                
                // Refresh the data from server to ensure we have the latest
                fetchLabourRequestList();
            }
            
            // Close the modal
            editModal.hide();
            
            // Reset editing state
            editingRow.value = {};
            editingIndex.value = -1;
            
            // Show success message
            showSuccessMessage('Row edited successfully');
        } catch (error) {
            console.error("Error saving edit:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
            
            // Show error message
            showErrorMessage('Failed to save changes: ' + (error.response?.data?.message || error.message));
        } finally {
            isLoading.value = false;
        }
    };
    
    // Helper function to handle successful update
    const handleSuccessfulUpdate = (data) => {
        // Update the item in the local array if we have data
        if (data && editingIndex.value !== -1) {
            // Update the item in the local array
            const updatedItem = {
                ...labour_types.value[editingIndex.value],
                labour_type: editingRow.value.labour_type,
                task: editingRow.value.task,
                quantity: editingRow.value.quantity,
                rate: editingRow.value.rate,
                labour_type_id: editingRow.value.labour_type_id,
                labour_request_id: editingRow.value.labour_request_id,
                labour_type_obj: editingRow.value.labour_type_obj
            };
            
            labour_types.value[editingIndex.value] = updatedItem;
        }
        
        // Refresh the data from server
        fetchLabourTypes();
        
        // Close the modal
        editModal.hide();
        
        // Reset editing state
        editingRow.value = {};
        editingIndex.value = -1;
        
        // Show success message
        showSuccessMessage('Row edited successfully');
    };
    
    // Helper function to show success message
    const showSuccessMessage = (message) => {
        if (window.Swal) {
            window.Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
                padding: '2em',
            });
        } else {
            alert(message);
        }
    };
    
    // Helper function to show error message
    const showErrorMessage = (message) => {
        if (window.Swal) {
            window.Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                padding: '2em',
            });
        } else {
            alert('Error: ' + message);
        }
    };

    // Get modal title based on current table type
    const getModalTitle = () => {
        if (currentTableType.value === 'labour_requests') {
            return 'Labour Request';
        } else if (currentTableType.value === 'labour_types') {
            return 'Labour Type';
        } else if (currentTableType.value === 'labour_request_list') {
            return 'Labour Request List';
        }
        return '';
    };

    // Update project name when project object is selected
    const updateProjectName = () => {
        if (editingRow.value.project_obj) {
            editingRow.value.project = editingRow.value.project_obj.name;
            editingRow.value.project_id = editingRow.value.project_obj.id;
            
        }
    };

    // Fetch projects for dropdown
    const fetchProjects = async () => {
        try {
            
            const response = await axios.get('https://bcftrack.trustdigital.space/api/v1/projects');
            
            
            if (Array.isArray(response.data)) {
                projects.value = response.data;
            } else {
                
                projects.value = [
                   
                ];
            }
        } catch (error) {
            
            projects.value = [
              
            ];
        }
    };

    // Fetch labour types for dropdown
    const fetchLabourTypesList = async () => {
        try {
            console.log("Fetching labour types list for dropdown...");
            const response = await axios.get('https://construction.trustdigital.space/api/v1/labour-types');
            console.log("Labour types list API Response:", response.data);
            
            if (Array.isArray(response.data)) {
                labourTypesList.value = response.data;
            } else {
                console.error("Labour types list response data is not an array:", response.data);
                labourTypesList.value = [];
            }
        } catch (error) {
            console.error("Error fetching labour types list:", error);
            console.error("Error details:", error.response?.data || error.message);
            labourTypesList.value = [];
        }
    };

    // Update labour type when selected from dropdown
    const updateLabourType = () => {
        if (editingRow.value.labour_type_obj) {
            console.log("Updating labour type with:", editingRow.value.labour_type_obj);
            editingRow.value.labour_type = editingRow.value.labour_type_obj.name;
            editingRow.value.labour_type_id = editingRow.value.labour_type_obj.id;
            editingRow.value.rate = editingRow.value.labour_type_obj.rate || 0;
        }
    };

    // Initialize data and modal on component mount
    onMounted(() => {
        
        fetchLabourRequests();
        fetchProjects(); // Fetch projects on mount
        fetchLabourTypesList(); // Fetch labour types list on mount
        
        // Initialize the edit modal
        editModal = new Modal(document.getElementById('editModal'));
    });
</script>

<style scoped>
.nav-tabs {
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 20px;
}

.nav-tabs .nav-link {
    margin-bottom: -1px;
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.nav-tabs .nav-link.active {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
}

.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #f5f5f5;
}

.panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;
    color: inherit;
}

.custom-table {
    padding: 15px;
}

.actions a {
    margin-right: 5px;
    cursor: pointer;
}

.edit svg {
    color: #28a745;
}

.cancel svg {
    color: #dc3545;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>

<style>
    /* Add any additional styling for multiselect if needed */
    .multiselect {
        min-height: 38px;
    }
    
    .multiselect__tags {
        min-height: 38px;
        padding: 6px 40px 0 8px;
    }
    
    .multiselect__select {
        height: 38px;
    }
    
    .multiselect__placeholder {
        padding-top: 0;
        margin-bottom: 0;
    }

    
</style>















