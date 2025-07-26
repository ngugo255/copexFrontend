<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Alternative Pagination</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                            <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
         <div class="d-flex">
            <div class="ms-auto me-5 mt-3 text-dark" style="cursor: pointer;" @click="unlock  =! unlock">
  <svg v-if="!unlock" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
  
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"/>
</svg>

            </div>
         </div>
                        <v-client-table :data="items" :columns="columns" :options="table_option">
                             <template #SNo="props">
                                      {{ props.index + 0 }}
                             </template>
                            <template #actions="props">
                                <div class="actions text-center">
                                    <a v-if="unlock" href="javascript:;" class="text-danger" @click="deleteItem(props.row.id)">
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
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </a>
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

                                          <router-link :to="`/report/item-budget/${props.row.project.id}/${props.row.budget_id}`" class="edit me-3" >

          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
                                          </router-link>

                                
                                </div>
                            </template>
                            <template #rate="props"> {{ formatNumber(props.row.rate) }}/= </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>



        <!-- Edit lpoItems Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div class="modal-content" style="height: 90vh;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit LPO Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="save_edit">
                    <div class="modal-body">
                        <div class="row mb-2">
                            <div class="col-md-3">
                            <label for="editMachineId">Machine </label>
<Multiselect
    v-model="editingRow.machine"
    :options="machines"
    :close-on-select="true"
    label="name"
    value-prop="id"
    placeholder="Select a Machine"
    :searchable="true"
/>
                             </div>
                            <div class="col-md-3">
                            <label for="editMachineId">Projects</label>
<Multiselect
    v-model="editingRow.project"
    :options="projects"
    :close-on-select="true"
    label="short_name"
    value-prop="id"
    placeholder="Select a Machine"
    :searchable="true"
    :required = "true"
/>
                             </div>
                                <div class="col-md-6">
                            <label for="editMachineId">Budget </label>
<Multiselect
    v-model="budget"
    :options="budgets"
    :close-on-select="true"
    label="name"
    value-prop="id"
    placeholder="Select Budget"
    :searchable="true"
    :required = "true"
/>
                             </div>

                            <div class="col-md-4">
                                <label for="editCategory">Category</label>
                               <Multiselect
    v-model="category"
    :options="categories"
    :close-on-select="true"
    label="name"
    value-prop="id"
    placeholder="Select Category"
    :searchable="true"
    @select="  budgetItem = ''"
/>
                            </div>

                            
                            <div class="col-md-5">
                                <label for="editCategory">Item</label>
                               <Multiselect
    v-model="budgetItem"
    :options="budgetItems"
    :close-on-select="true"
    label="name"
    value-prop="id"
    placeholder="Select Item"
    :searchable="true"
/>
                            </div>
                            <div class="col-md-3">
                                <label for="editUnitMeasure">Unit Measure</label>
                               <Multiselect
    v-model="unit"
    :options="units"
    :close-on-select="true"
    label="name"
    value-prop="id"
    placeholder="Select Budget"
    :searchable="true"
/>
       
                            </div>

                            <div class="col-md-6">
                                <label for="editDescription">Description</label>
                                <input type="text" class="form-control" id="editDescription" v-model="editingRow.description">
                            </div>

                            <div class="col-md-4">
                                <label for="editQuantity">Quantity</label>
                                <input type="number" class="form-control" id="editQuantity" v-model="editingRow.quantity">
                            </div>
                            <div class="col-md-4">
                                <label for="editRate">Rate</label>
                                <input type="number" class="form-control" id="editRate" v-model="editingRow.rate">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" :disabled="isSaving">
                          <span v-if="isSaving" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else>Save changes</span>
                        </button>
                    </div>
</form>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { onMounted, ref,inject,watch } from 'vue';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import * as bootstrap from 'bootstrap';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Alternative Pagination' });
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const loadingIndicator = inject('loadingIndicator');
    const isSaving = ref(false);
    const machine = ref(77);
    let editModal = null;
    const editingRow = ref({});
    const budget = ref('');
    const columns = ref([ 'SNo','id','order_id','project','machine_id','budget_id','item_id', 'category', 'description', 'unit_measure', 'quantity', 'rate', 'actions']);
    const items = ref([]);
    const machines = ref(['']);
    const budgets = ref(['']);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table',
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
   const unlock = ref(false); 
   
   const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
         const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL2
    });
    const loading_spinner = ref(false);

   const getItems = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`items`);
            items.value = response.data;
            loading_spinner.value = false;
    } catch (error) {
        showError(error.message);
        console.log(error);
    }
}
   
const budgetItem = ref('');
const budgetItems = ref(['']);


  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    return Number(num).toLocaleString('en-US');
    };

   const deleteItem = (id) => {
        loading_spinner.value = true;
   if (confirm("Are you sure you want to delete this item?")) {
                  axiosInstance
            .delete(`/items/${id}`)
            .then((response) => {
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Item Deleted successfully');
                   getItems();
                } else {
                    showError('Fail to Delete item');
                    console.error("Error deleting:", response.data);
                }
            })
            .catch((error) => {
                showError("error deleting item");
                console.error("Error deleting item ", error);
            });  
    
   }
    };

     onMounted(() => {
     getItems();   
     editModal = new bootstrap.Modal(document.getElementById('editModal'));
    });


const edit_row = async (row) => {
    loading_spinner.value=true;
    await getBudgets(row.project_id);
    const machineObj = machines.value.find(m => m.id === row.machine_id);
    budget.value = budgets.value.find(b => b.id === row.budget_id);
    editingRow.value = { ...row, machine: machineObj || null };
    editModal.show();
    loading_spinner.value=false;
    await fetchCategory(row.budget_id);
    category.value = categories.value.find(c => c.name === row.category);
    if(category.value?.item_description){
       budgetItems.value = category.value.item_description;
    }
    budgetItem.value = budgetItems.value.find(bi => bi.id === row.item_id);
    unit.value = units.value.find(u => u.name === row.unit_measure);
   

  watch(category, (newItems) => {
  if (newItems) {
    budgetItems.value = newItems.item_description;
  }if(!newItems?.item_description){
    budgetItem.value= '';
  }
});
};

  watch(budget,async (newCategories) => {
  if (newCategories) {
    category.value = '';
    // budgetItems.value = '';
     await fetchCategory(newCategories.id);
  }
  });

const getBudgets = async (id) => {
    try {
        const response = await axiosInstance2.get(`/projects/${id}`);
        budgets.value = response.data;
    } catch (error) {
        showError(error.message);
        console.error(error);
    }
};

    const save_edit = async () => {
        isSaving.value = true;
        if (loading_spinner.value) return;
         if (!budget.value?.id) {
        showError('Please select a budget.');
        isSaving.value = false;
        return;
    }
      if (!category.value?.id) {
        showError('Please select a category.');
        isSaving.value = false;
        return;
    }
    if (!budgetItem.value?.id) {
        showError('Please select an item.');
        isSaving.value = false;
        return;
    }if (!unit.value?.name) {
        showError('Please select a unit');
        isSaving.value = false;
        return;
    }
        try {
           
            loading_spinner.value = true;
            const machineId = editingRow.value.machine ? editingRow.value.machine.id : null;
            const response = await axiosInstance.put(`/items/${editingRow.value.id}`, {
                machineId: machineId || 0, 
                description: editingRow.value.description,
                category: category.value.name,
                item_list_id: budgetItem.value.id,
                unit_measure: unit.value.name,
                quantity: editingRow.value.quantity,
                rate: editingRow.value.rate,
                budget_id: budget.value.id
            });
            
            if (response.status === 200) {
                editModal.hide();
                const index = items.value.findIndex(item => item.id === editingRow.value.id);
                if (index !== -1) {
                    items.value[index].machine_id = machineId;
                    items.value[index].description = editingRow.value.description;
                    items.value[index].category = category.value.name;
                    items.value[index].item_id = budgetItem.value.id;
                    items.value[index].unit_measure = unit.value.name;
                    items.value[index].quantity = editingRow.value.quantity;
                    items.value[index].rate = editingRow.value.rate;
                    items.value[index].budget_id = budget.value.id;
                }
                showMessage('Item updated successfully!');
            }
           
        } catch (error) {  
            showError(error.message);
            console.error(error);
        } finally {
            loading_spinner.value = false;
            isSaving.value = false;
        }
      
    }; 


    

const fetchMachines = async () => {
    try {
        loading_spinner.value = true;
        const response = await axiosInstance.get('/machines');
        machines.value = response.data; 
    } catch (error) {
        showError("Failed to fetch machines: " + error.message);
        console.error("Error fetching machines:", error);
    } finally {
        loading_spinner.value = false;
    }
};

const category = ref('');
const categories = ref(['']);
const fetchCategory = async (id) => {
    try {
        const response = await axiosInstance2.get(`/item/${id}`);
        categories.value = response.data; 
    } catch (error) {
        showError(error.message);
        console.error("Error fetching category:", error);
    } finally {
       
    }
};

const units = ref(['']);
const unit =  ref('');
const fetchUnits = async () => {
    try {
        const response = await axiosInstance.get(`/units`);
        units.value = response.data; 
    } catch (error) {
        showError( error.message);
        console.error("Error fetching category:", error);
    } finally {
        
    }
};

const projects = ref(['']);
const fetchProjects = async () => {
    try {
        loading_spinner.value = true;
        const response = await axiosInstance.get('/projects');
        projects.value = response.data; 
    } catch (error) {
        showError(error.message);
        console.error("Error fetching projects:", error);
    } finally {
        loading_spinner.value = false;
    }
};

onMounted(() => {
    fetchMachines();
    fetchProjects();
    fetchUnits();
});
</script>
