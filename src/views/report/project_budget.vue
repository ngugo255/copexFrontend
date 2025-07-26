<template>
    <div class="layout-px-spacing">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Items Budget</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
      

   



        <div class="d-flex justify-content-between ">
            <div class="flex-grow-1 ">


                <div class="budgets-container">
    <div class="d-flex  mb-3">
        <h4 class="budgets-title me-3">Project Details</h4>
        <div class="ms-auto">
            <select class="form-control" v-model="budget_project" @change="project_id = 0, getProjects()">
                <option value=''>Select a project</option>
                <option v-for="project in budgetProjects" :value="project">{{ project.short_name }}</option>
            </select>
        </div>    
    </div>

    <table class="table table-bordered" v-if="budget_project != ''">
        <tbody>
            <tr>
                <th width="30%">Project Name:</th>
                <td>{{ budget_project.project_name }}</td>
            </tr>
            <tr>
                <th>Short Name:</th>
                <td>{{ budget_project.short_name }}</td>
            </tr>
            <tr>
                <th>Contract Number:</th>
                <td>{{ budget_project.contract_number }}</td>
            </tr>
            <tr>
                <th>Financial Year:</th>
                <td>{{ budget_project.financial_year}}</td>
            </tr>
        </tbody>
    </table>
    <div v-else class="mt-2">
       <h6 class="text-success">
        Please select a project from the list
       </h6> 
    </div>
</div>



            </div>    
        </div>
        <div>
      <!--Item form starts  -->

<!-- loading spinner starts -->
<div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
</div>
 <!-- loading spinner ends -->  
<div v-if="budget_project != ''">
            <table class="table table-bordered table-responsive mt-5">
    <thead class="thead-light">
        <tr>
            <th>Sno:</th>
            <th>Budget</th>
            <th>Description
                <div class="d-flex">
                    <div v-if="project_status == 'open'" class="ms-auto">
                            <button class="btn btn-dark mx-2 p-1 btn-sm" @click="unlocked=!unlocked">
                                        <svg v-if="unlocked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
</svg>
                                       <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
</svg>

                            </button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="project,i in projects" :key="project.SNo">
            <td>{{ i + 1 }}</td>
            <td>{{ project.name }}</td>
            <td>
                <div>
                    <table class="table table-bordered table-responsive table-striped">
                        <thead class="thead-light">
        <tr>
            <th>Sno:</th>
            <th>Item</th>
            <th class="text-dark"> {{project.name}}
                <div class="d-flex">
                    <div v-if="project_status == 'open'" class="ms-auto">
                            <button class="btn btn-dark mx-2 p-1 btn-sm" @click="unlocked=!unlocked">
                                        <svg v-if="unlocked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
</svg>
                                       <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
</svg>

                            </button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item,i in project.items" :key="item.SNo">
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
                <div>
                    <table class="table table-bordered table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Units</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Amount</th>
                                <th>Remark</th>
                                <th>
                                    <div class="d-flex">
                                        <div v-if ="project_status =='open'" class="ms-auto" >
                                        <button v-if="add_item_list === item.id " class="btn btn-danger btn-sm p-2" @click="add_item_list = '' ">X</button>
                                        <button v-else  class="btn btn-primary" @click="add_item_list = item.id ">add</button>
                                    </div>
                                    </div>
                                    <button v-if="!unlocked && item.item_description == '' " class="btn btn-danger btn-sm p-1 mx-1" @click="deleteItem(item.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="desc,i in item.item_description" :key="desc.name">
                                <td>{{ i+1 }}</td>
    <td>{{ desc.name }}</td>
    <td> {{ desc.units }} </td>
    <td>{{ (desc.quantity).toLocaleString() }} x {{ (desc.quantity_2) }}</td>
    <td>{{ (desc.cost).toLocaleString()  }}</td>
    <td>{{ (desc.quantity * desc.cost * desc.quantity_2 ).toLocaleString()  }} Tsh</td>
    <td>
        <span class="mx-2">
            <svg 
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="28" height="28" 
                                     fill="currentColor"
                                      class="bi bi-eye text-secondary" 
                                      viewBox="0 0 16 16"
                                      @click="showError('! remark preview is on development')">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
        </span>


        <button v-if="!unlocked" class="btn btn-danger btn-sm p-1" @click="deleteItemDescription(desc.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
    </td>
</tr>
<tr>
    <td></td>
    <td class="fw-bolder">Total Budget</td>
    <td></td>
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + desc.quantity, 0).toLocaleString() }}</td>
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + desc.cost, 0).toLocaleString() }}</td>
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + (desc.quantity * desc.quantity_2 * desc.cost), 0).toLocaleString() }} Tsh</td>
</tr>

                            <tr v-if="add_item_list === item.id ">
                                <td></td>
                                <td>
                                    <input type="text" class="form-control" v-model="name" placeholder="Item">
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="units" placeholder="Units">
                                </td>
                
                                <td>
    <div style="display: flex; align-items: center; gap: 5px;">
        <input type="number" class="form-control" v-model="quantity" placeholder="qty1"> 
        <span>X</span>
        <input type="number" class="form-control" v-model="quantity_2" placeholder="qty2">
    </div>
</td>
                                <td>
                                    <input type="number" class="form-control" v-model="cost" placeholder="cost">
                                </td>
                                <td>
                                    <label >{{ (cost * quantity * quantity_2).toLocaleString() }}</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="notice" placeholder="Any Remark">
                                </td>
                                <td>
                                    <button type="submit" class="btn btn-primary" @click="addItemDescription(item.id)">Submit</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
    
</table>

                </div>
            </td>
        </tr>
    </tbody>
    <tfoot>
    
        <tr>
    <td colspan="5" class="text-end fw-bold">GRAND TOTAL  :
        {{
            projects.reduce(
                (grandTotal, project) => grandTotal + 
                project.items.reduce(
                    (projectTotal, item) => projectTotal + 
                    item.item_description.reduce(
                        (itemTotal, desc) => itemTotal + (desc.quantity * desc.cost * desc.quantity_2),
                    0),
                0),
            0).toLocaleString()
        }} Tsh

    </td>

</tr>

</tfoot>
</table>

</div>

        </div>
     
   
    </div>
</template>



<script setup>
    import axios from 'axios';    
    import { onMounted, ref,inject,watch } from 'vue';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';

    useMeta({ title: 'Purchase Order' });
    const budget_name = ref('');
    const edit_budget_name = ref(false);
    const budget_project_id = ref(0);
    const budgetProjects = ref([]);
    const selectedProject = ref('');
    const project_status = ref ('closed');
    const newProject= ref('');
    const projects = ref(['']);
    const unlocked = ref(true);
    const add_item = ref(false);
    const item_name = ref('');
    const name = ref('');
    const cost = ref('');
    const quantity = ref(1);
    const quantity_2 = ref(1);
    const paid_by = ref('');
    const ref_no = ref('');
    const notice = ref('');
    const units = ref('');
    const add_item_list = ref ('me');
    const loading_spinner = ref(false);
    const base_url = "https://construction.trustdigital.space/api/v1/";
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const project_name = ref('');
    const project_id = ref(0);
    const items = ref([]);
    const budget_project = ref('');

    const editBudget = async () => {
    project_name.value = budget_name.value;
    edit_budget_name.value = false;
    const data = {
        'name': budget_name.value,
    }
    try {
        const response = await axios.put(`${base_url}projects/${project_id.value}`, data);
        if (response.status == 200) {
            getProjects();
        } else {
            showError("Fail to Edit Budget");
        }                    
    } catch (error) {
        console.error('Error Editing Budget:', error);
        showError("Fail to Edit Budget");
    }
}


    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axios.get(`${base_url}project-budgets/${budget_project.value.id}`);
            projects.value = response.data;
            console.log('project budget :',projects.value);
            loading_spinner.value=false;
    } catch (error) {
        loading_spinner.value=false;
        showError(error.message);
        console.log(error);
    }
}

const getBudgetProjects = async () => {
    // loading_spinner.value = true;
    try {
        const response = await axios.get(`https://bcftrack.trustdigital.space/api/v1/projects`);
            budgetProjects.value = response.data;
            getProjects();
    } catch (error) {
        showError(error.message);
        console.log(error);
    }
}


const addProject= async () => {
    newProject.value =! newProject.value;
    loading_spinner.value=true;
        const data = {
            'name':project_name.value,
            'project_id':budget_project.value.id
        }
        try {
            const response = await axios.post(`${base_url}projects`,data);
                loading_spinner.value=false;
                getProjects();
                project_id.value= 0;
                if (response.status == 201) {
                    project_name.value = "";
                    showMessage("Project Added Sussesfully");
                }
                else{
                    console.error(error);
                    showError("Fail to Add Project");
                      }                    
                }
                catch(error){
            console.error('Error Adding projects:', error);
            loading_spinner.value=false;
        }
    };

    
    const deleteItem = async (id) => {
  loading_spinner.value = true;
   const response = await axios.delete(`${base_url}item/${id}`)
      .then((response) => {
          fetchItems();
          getProjects();
          showMessage("Item  deleted");
          loading_spinner.value = false;
      });
};

const deleteBudget = async (id) => {
  project_name.value = "";
  loading_spinner.value = true;
   const response = await axios.delete(`${base_url}projects/${id}`)
      .then((response) => {
          getProjects();
          project_id.value= 0;
          showMessage("Budget  deleted");
          loading_spinner.value = false;
      });
};

    const deleteItemDescription = async (id) => {
        loading_spinner.value = true;
         const response = await axios.delete(`${base_url}item-descriptions/${id}`)
            .then((response) => {
                fetchItems();
                showMessage("Description  deleted");
                loading_spinner.value = false;
            });
    };

    const addItem = async () => {
      add_item.value =! add_item.value;
      const itemdata={
            'name':item_name.value, 
            'project_id':project_id.value 
              }
        try {
            const response = await axios.post(`${base_url}item`,itemdata);
              fetchItems();
             if (response.status == 201) {
                item_name.value = "";
                showMessage("item added Succesfully");
                getProjects();
             }
             else{
                showError("Failed to Add Item");
                console.error(error);
                
             }
        } catch (error) {
            console.error('Error fetching items:', error);
            showError(error.message);
        }
    };      



    const addItemDescription = async (id) => {
      add_item_list.value = '';
      if( quantity.value === '' || quantity_2.value === '' || cost.value === '' ){
         showError("Please fill in all the fields");
      }else{
      const itemDescriptiondata={
            'name':name.value,
            'units':units.value,
            'item_id':id,
            'ref_number':ref_no.value,
            'paid_by': paid_by.value,
            'quantity':quantity.value,
            'quantity_2':quantity_2.value,               
            'cost':cost.value,
            'notice':notice.value
              }
        try {
            const response = await axios.post(`${base_url}item-descriptions`,itemDescriptiondata);
              fetchItems();
             if (response.status == 201) {
                item_name.value = "";
                units.value ="",
                quantity.value=1,
                notice.value="",
                cost.value = 0,
                name.value = "",
                quantity_2.value=1,
                showMessage("Description added Succesfully");

             }
             else{
                showError("Failed to Add Item");
                console.error(error);
                
             }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }
    };      
   
const setParam =  (data)=> {
     project_id.value = data.id;
     project_name.value = data.name;
     project_status.value = data.status;
     fetchItems();
}

const user = ref(null);
const user_permissions = ref([]);

 onMounted(() => {
        const storedUser = localStorage.getItem("user");
        user.value = JSON.parse(storedUser);
        user_permissions.value = user.value.permissions;
        fetchItems();
        getProjects();
        getBudgetProjects();
    });

    

    const fetchItems = async () => {
    loading_spinner.value=true;
        try {
            const response = await axios.get(`${base_url}item/${project_id.value}`);
            items.value = response.data;
            loading_spinner.value=false;
        } catch (error) {
            console.error('Error fetching items:', error);
            loading_spinner.value=false;
        }
    };        

 
   
    const printReport = () => {
        const printWindow = window.open('', 'DailyActivityReport');
        printWindow.document.write(`
<html>
    <head>
        <title>Print Item Budget Report</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            .nested-table {
                width: 100%;
                margin: 0;
                border: none;
            }
            .nested-table th, .nested-table td {
                padding: 5px;
            }
            .total-row {
                font-weight: bold;
                background-color: #f0f0f0;
            }
            .grand-total-row {
                font-weight: bold;
                background-color: #e0e0e0;
                font-size: 1.1em;
            }
            .signature-section {
                page-break-inside: avoid; /* Prevents splitting */
                margin-top: 50px; /* Adds space before signatures */
            }
            .signature-table {
                width: 100%;
                border-collapse: collapse;
            }
            .signature-cell {
                height: 2cm;
                vertical-align: bottom;
                border: 1px solid black;
            }

        </style>
    </head>
    <body>
        <h2>PROJECT : &nbsp; ${(budget_project.value.short_name).toUpperCase()}</h2>
        <h3>BUDGET FOR : &nbsp; ${(project_name.value).toUpperCase()}</h3>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${items.value.map((item,i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${item.name}</td>
                        <td>
                            ${item.item_description && item.item_description.length > 0 ? `
                            <table class="nested-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Units</th>
                                        <th>Cost</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${item.item_description.map(desc => `
                                        <tr>
                                            <td>${desc.name || '-'}</td>
                                            <td>${desc.units || '-'}</td>
                                            <td>${(desc.cost || 0).toLocaleString()} Tsh</td>
                                            <td>${(desc.quantity || 0).toLocaleString()} x ${(desc.quantity_2 || 0).toLocaleString()}  </td>
                                            <td>${((desc.quantity || 0) * (desc.quantity_2 || 0) * (desc.cost || 0)).toLocaleString()} Tsh</td>
                                            <td>${desc.notice || '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            ` : 'No description available'}
                        </td>
                    </tr>
                    ${item.item_description && item.item_description.length > 0 ? `
                    <tr class="total-row">
                        <td colspan="2">Budget</td>
                        <td>
                            <table class="nested-table">
                                <tr>
                                    <td>Total  :</td>
                                    <td>${item.item_description.reduce((sum, desc) => sum + ((desc.quantity || 0) * (desc.quantity_2 || 0) * (desc.cost || 0)), 0).toLocaleString()} Tsh</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                `).join('')}
            </tbody>
        </table>

        <!-- GRAND TOTAL SECTION (AFTER MAIN TABLE) -->
         <table style="margin-top: 20px; width: 50%; float: right;">
            <tr class="grand-total-row">
                <td><strong>GRAND TOTAL</strong></td>
                <td><strong>${
                    items.value.reduce(
                        (grandTotal, item) => grandTotal + 
                        (item.item_description?.reduce(
                            (itemTotal, desc) => itemTotal + ((desc.quantity || 0) * (desc.quantity_2 || 0) * (desc.cost || 0)), 
                        0) || 0
                    ), 0
                ).toLocaleString()} Tsh</strong></td>
            </tr>
        </table>
        <div style="clear: both;"></div>

        <!-- Signatures Section (Ensured to stay intact) -->
        <div class="signature-section">
            <h3>Signatures</h3>
            <table class="signature-table">
                <thead>
                    <tr>
                        <th>Operation's Sign</th>
                        <th>Engineer's Sign</th>
                        <th>Sr Accountant's sign</th>
                        <th>MD's Sign</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="signature-cell"></td>
                        <td class="signature-cell"></td>
                        <td class="signature-cell"></td>
                        <td class="signature-cell"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>
`);
        printWindow.document.close();
        printWindow.print();
        
    };

</script>
<style>
.nav-link.active {
    background-color: #007bff !important;
    color: white !important;
}

.nav-item {
    margin-right: 12px;
    margin-left:5px;
}

.budgets-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.budgets-title {
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 600;
    text-align: center;
}

.budgets-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.budget-button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    min-width: 120px;
    border: none;
    color: white;
}

.project-button {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.project-button:hover {
    background: linear-gradient(135deg, #27ae60, #219653);
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.new-project-button {
    background: linear-gradient(135deg, #3498db, #2980b9);
}

.new-project-button:hover {
    background: linear-gradient(135deg, #2980b9, #1a6ea8);
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}
.budget-button.project-button {
  position: relative;
  padding-right: 20px; /* Make space for the cross mark */
}

.close-mark {
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}

.close-mark:hover {
  color: red;
}


</style>