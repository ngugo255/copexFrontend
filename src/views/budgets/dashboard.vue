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
<!--notification starts  -->
    <div class="d-flex" v-if="amendment_request_count!= 0">
        <div class="ms-auto" >
      <div class="dropdown nav-item notification-dropdown btn-group" >
 <a href="javascript:;" id="ddlnotify" data-bs-toggle="dropdown" aria-expanded="false"
   class="btn dropdown-toggle nav-link position-relative p-0 shadow" >
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       class="feather feather-bell text-danger"
       style="transform:scale(2)"
       >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {{ amendment_request_count}}
  </span>
</a>


  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlnotify">
    <li v-for="amendment in amendmentRequests "  class="dropdown-item">
      <div class="media">
        <div class="media-aside align-self-start" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-server">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6" y2="6"></line>
            <line x1="6" y1="18" x2="6" y2="18"></line>
          </svg>
        </div>
        <div class="media-body" >
          <div class="data-info" >
            <h6 class="mb-0">From : {{ amendment.sender_name }}</h6>
            <p class="mb-0 "> {{amendment.description}}    
            
            <button
            v-if="user_permissions.includes('can_check_budget_remark')" 
             class="btn btn-success p-1 btn-sm me-1" style="cursor:pointer" @click="readRemark()"
             >✔</button></p>
         
          </div><br>
        </div>
      </div>
    </li>
  </ul>
</div>
        </div>
    </div>        
<!-- notification ends -->


        <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1 text-center">
<div class="budgets-container" style="overflow:visible;">
    <div class="d-flex table-responsive" style="overflow:visible;">
        <h4 class="budgets-title">Budgets List </h4>
<div class="mb-2 ms-auto" style="overflow:visible;">
    <Multiselect
        v-model="budget_project"
        :options="budgetProjects"
        label="short_name"
        track-by="id"
        placeholder="Select a project"
        :searchable="true"        
        :append-to-body="true"
    />
</div>    
    </div>
   
<div v-if="budget_project != ''">   
  <div v-if="!newProject" class="budgets-buttons">
    <!-- Accordion Container -->
    <div class="accordion">
      <!-- Content (shows/hides) -->
      <div class="accordion-content" v-show="isAccordionOpen">
        <span 
          v-for="project in projects" 
          class="budget-button project-button" 
          @click="setParam(project)"
        >
          {{ project.name }}
          <span 
            v-if="user_permissions.includes('can_delete_budget') && project.items_count == 0" 
            class="close-mark" 
            @click.stop="deleteBudget(project.id)"
          >
            ×  
          </span>
        </span>
        <span 
          v-if="user_permissions.includes('can_create_budget')" 
          class="budget-button new-project-button" 
          @click="newProject=!newProject,project_name='',project_id=0"
        >
          + New Budget
        </span>
      </div>
      <div 
        class="accordion-toggle" 
        style="text-align: center; margin-top: 8px;"
        @click="isAccordionOpen = !isAccordionOpen"
      >
        <span 
          class="toggle-arrow" 
          style="
            display: inline-block;
            background: white;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 12px;
            cursor: pointer;
          "
        >
          {{ isAccordionOpen ? '▲' : '▼' }}
        </span>
      </div>
    </div>
  </div>
</div>
<div v-else><h6 class="mt-1 text-success">Please Select a project from the list</h6></div>
 
    <!-- New Project Section -->
    <div v-if="newProject" class="d-flex flex-column align-items-center">
      <div class="w-50 mx-auto mt-2"> <!-- Consistent width wrapper -->
        <input 
          type="text" 
          class="form-control" 
          placeholder="Enter budget name"
          v-model="project_name"
        >
      </div>
      <div class="d-flex justify-content-center mt-2"><button 
          type="button" 
          class="btn btn-secondary mx-2"
          @click="newProject = false"
        >
          Cancel
        </button>

        <button 
          type="button" 
          class="btn btn-primary me-2"
          @click="addProject"
        >
          Add Project
        </button>
      </div>
    </div>
</div>

        </div>    
     </div>
        <div>

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
<div v-if="project_id != 0 ">


<!-- project description -->
<div class="table-responsive">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>PROJECT DETAILS</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>PROJECT NAME:</strong></td>
                <td>{{ budget_project.project_name }}</td>
            </tr>
            <tr>
                <td><strong>SHORT NAME:</strong></td>
                <td>{{ budget_project.short_name }}</td>
            </tr>
            <tr>
                <td><strong>CONTRACT NUMBER:</strong></td>
                <td>{{ budget_project.contract_number }}</td>
            </tr>
            <tr>
                <td><strong>FINANCIAL YEAR:</strong></td>
                <td>{{ budget_project.financial_year }}</td>
            </tr>
            <tr>
                <td><strong>PROJECT COST:</strong></td>
                <td>{{ budget_project.project_cost.toLocaleString() }} Tsh</td>
            </tr>
            <tr>
                <td><strong>CLIENT:</strong></td>
                <td>{{ budget_project.client }}</td>
            </tr>
            <tr>
                <td>BUDGET FOR:</td>
                <td @click="project_status === 'open' ?(budget_name =project_name, edit_budget_name = true) : showError('Budget is closed') "> {{ (project_name).toUpperCase() }}</td>
            </tr>
            <tr>
                <td colspan="2" >
                                  <table class="shadow table table-bordered table-responsive table-striped">
                        <thead>
                            <tr >
                                <th class="text-dark fw-bold">ALLOCATED AMOUNT</th>
                                <th class="text-success">ALLOCATED BALANCE</th>
                                 <th class="text-danger">UNALLOCATED AMOUNT</th>
                                 <th class="text-dark">BUDGET COST</th> 
                            </tr>
                            <tr>
                                <td @click="add_fund =! add_fund"  style="cursor:pointer">
                                   {{ funded_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Tsh
                                </td>
                                <td  class="text-success fw-bolder">
                                     {{
            (
                funded_amount -
                items.reduce(
                (grandTotal, item) =>
                    grandTotal +
                    item.item_description.reduce(
                    (itemTotal, desc) => itemTotal + (Number(desc.budget_remark_sum_cost) || 0),
                    0
                    ),
                0
                )
            ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }} Tsh
                                </td>

                                <td class="text-danger fw-bolder">
                                    {{
                                        (
                                            // Unfunded Amount: budget cost - funded amount
                                            items.reduce(
                                                (grandTotal, item) =>
                                                    grandTotal +
                                                    item.item_description.reduce(
                                                        (itemTotal, desc) =>
                                                            itemTotal +
                                                            ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                        0
                                                    ),
                                                0
                                            ) - funded_amount
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }} Tsh
                                </td>
                                  <td>
                                    {{
                                        // Budget Cost: grand total without any deduction from description remark
                                        items.reduce(
                                            (grandTotal, item) =>
                                                grandTotal +
                                                item.item_description.reduce(
                                                    (itemTotal, desc) =>
                                                        itemTotal +
                                                        ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                    0
                                                ),
                                            0
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }} Tsh
                                </td>
                            </tr>
                        </thead>
    </table> 
                    <!-- <table class="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th>Allocated Amount</th>
                                <th>Budget Cost</th>
                                <th>UnAllocated Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td  @click="add_fund = true">
                                    {{ funded_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                                </td>
                                   <td>
                                    {{
                                        // Budget Cost: grand total without any deduction from description remark
                                        items.reduce(
                                            (grandTotal, item) =>
                                                grandTotal +
                                                item.item_description.reduce(
                                                    (itemTotal, desc) =>
                                                        itemTotal +
                                                        ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                    0
                                                ),
                                            0
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }}
                                </td>
                                 <td>
                                    {{
                                        (
                                            // Unfunded Amount: budget cost - funded amount
                                            items.reduce(
                                                (grandTotal, item) =>
                                                    grandTotal +
                                                    item.item_description.reduce(
                                                        (itemTotal, desc) =>
                                                            itemTotal +
                                                            ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                        0
                                                    ),
                                                0
                                            ) - funded_amount
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                </td>
            </tr>
        </tbody>
    </table>

    <h4 class="mb-0  mb-2">
    <div v-if ="edit_budget_name" class="d-flex align-items-center gap-2">
    <input type="text" class="form-control w-50 " v-model="budget_name" :placeholder="project_name">
    <button class="btn btn-primary" @click="editBudget()">Save</button>
    <button class="btn btn-danger r-2" @click="edit_budget_name=!edit_budget_name">X</button>
    </div>
    </h4>
    <h4 class="mb-0  mb-2">
    <div v-if ="add_fund" class="d-flex align-items-center gap-2">
    <input type="number" class="form-control w-25 " v-model="new_fund" placeholder="Enter additional fund" step="any">
     <input type="date" class="form-control w-25 " v-model="fund_date"  >
    <button class="btn btn-primary" @click="addFund()">Save</button>
    <button class="btn btn-danger r-2" @click="add_fund=!add_fund">X</button>
    </div>
</h4>
</div>
 <!-- project description ends -->

              
         <div class="d-flex flex-wrap gap-2 mt-4 justify-content-end align-items-center">
            <div class="btn-group flex-wrap" style="gap: 8px;">
                <button 
                    class="btn btn-success mx-2 mt-2" 
                    @click="printReport" 
                    title="Print Report"
                    :disabled="in_process">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                    </svg>
                    &nbsp;Print
                </button>

                <button 
                    v-if="project_status === 'open' && user_permissions.includes('can_create_budget') && !add_item"
                    class="btn btn-primary mt-2" 
                    @click="add_item =!add_item" 
                    title="Add Item"
                    :disabled="in_process">
                    &nbsp;Add Item
                    
                </button>
                <button 
                    v-if="project_status === 'open' && user_permissions.includes('can_create_budget') && add_item"
                    class="btn btn-danger mt-2" 
                    @click="add_item =!add_item" 
                    title="Add Item"
                    :disabled="in_process">
                    &nbsp;Close Item
                </button>

  

                <button  
                    v-if="project_status === 'open' && user_permissions.includes('can_close_budget')"         
                    class="btn btn-warning mt-2" 
                    @click="closeBudget" 
                    title="Add Item"
                    :disabled="in_process">
                     <span v-if="closing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     <span v-else>&nbsp;Close Budget </span>
                </button>
                <button  
                    v-if="project_status === 'closed' && user_permissions.includes('can_open_budget')"         
                    class="btn btn-success mt-2" 
                    @click="openBudget" 
                    title="Add Item"
                    :disabled="in_process">
                     <span v-if="closing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     <span v-else>&nbsp;Open Budget </span>
                </button>
                  <button  
                    v-if="project_status === 'closed'"         
                    class="btn btn-info mt-2" 
                    @click="amendment_form=!amendment_form">
              Request Amendment
                </button>
 
            </div>
        </div>
<form v-if="amendment_form" class="text-center mt-3" @submit.prevent="requestAmendment()">
  <h4 class="text-center">REQUEST FOR AMENDMENT</h4>
  <div class="d-flex flex-column align-items-center">
    <textarea class="form-control w-75 mb-3" v-model="amendment_description" placeholder="Amendment Description"></textarea>
    <button type="submit" class="btn btn-primary" >Submit</button>
  </div>
</form>



   


        <!--Item form starts  -->
<div v-if="add_item " class="mt-3 p-3 border rounded bg-light mb-2">
    <h5 class="mb-3">Add Item</h5>
    <div class="form-group mb-3 d-flex align-items-center col-12">
        <div class="row d-flex align-items-center col-12">
            <div class="col-md-10 col-10">
                <input type="text" class="form-control" id="item_name" v-model="item_name" placeholder="Enter item name">
            </div>
            <div class="col-md-2 col-2">
                <button type="button" class="btn btn-primary w-100" @click="addItem">Submit</button>
            </div>
        </div>
    </div>
</div>
<!-- item form ends -->
<div class="table-responsive shadow-lg">    

<table class="table table-bordered table-responsive mt-5">
    <thead class="thead-light table-reponsive">
        <tr>
            <th>Sno:</th>
            <th>Item</th>
            <th>Description
                <div class="d-flex">
                    <div v-if="project_status == 'open'" class="ms-auto">
                            <button class="btn btn-dark mx-2 p-1 btn-sm" @click="unlocked=!unlocked, edit_description=''">
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
        <tr v-for="item,i in items" :key="item.SNo">
            <td>{{ i + 1 }}</td>
            <td >
            <span  @click ="editItemRow(item.id)" v-if="edit_item !== item.id ">  {{ item.name }}
            </span>
            <div v-if="edit_item === item.id "  >
            <input type="text" class="form-control" v-model="item.name">
            <button class="btn btn-white md-2 " @click="closeItemEdition()">❌</button>
            <button class="btn btn-white md-2 " @click="updateItem(item)">
                ✅
            </button>
          </div>         
            
            </td>
            <td>
                <div>
                    <table class="table table-bordered table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Units</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Cost</th>
                                <th>Amount</th>
                                <!-- <th>Paid By</th> -->
                                <th>Remark</th>
                                <th>
                                    <div class="d-flex">
                                        <div v-if ="project_status =='open' && user_permissions.includes('can_create_budget')" class="ms-auto" >
                                        <button v-if="add_item_list === item.id " class="btn btn-danger btn-sm p-2" @click="add_item_list = '' ">X</button>
                                        <button v-else  class="btn btn-primary" @click="add_item_list = item.id ">add</button>
                                    </div>
                                    </div>
                                    <button v-if="!unlocked && item.item_description  == '' && user_permissions.includes('can_delete_budget') " class="btn btn-danger btn-sm p-1 mx-1" @click="deleteItem(item.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                 <tbody>
                            <tr  v-for="desc,i in item.item_description" :key="desc.id">
                                <td  >{{ i+1 }}</td>
     <td @click ="editRow(desc)">
      <span v-if="edit_description  !== desc.id ">
        {{ desc.name }}
      </span>        
        <div v-if="edit_description === desc.id ">
            <input type="text" class="form-control" v-model="desc.name">
        </div>
    </td>
    <td @click ="editRow(desc)" > 
        <span v-if="edit_description  !== desc.id ">
        {{ desc.units}}
      </span> 
        <div v-if="edit_description === desc.id "  >
             <Multiselect
        v-model="units"
        :options="unitsOptions"
        label="short_name"
        track-by="id"
        placeholder="Enter Unit"
        :searchable="true"        
        :append-to-body="true"
    />
            <!-- <input type="text" class="form-control" v-model="desc.units"> -->
        </div>
    </td>
   <td @click="editRow(desc)">
  <span v-if="edit_description !== desc.id">
    {{ (desc.quantity).toLocaleString() }} x {{ (desc.quantity_2) }}
  </span>
  <div v-else class="d-flex align-items-center gap-1">
    <input type="text" class="form-control" v-model="desc.quantity" style="width: 70px;">
    <span class="mx-1">X</span>
    <input type="text" class="form-control" v-model="desc.quantity_2" style="width: 70px;">
  </div>
</td>

      <td @click ="editRow(desc)" >
  <div class="d-flex justify-content-between text-dark" >
    <span>Budgeted :</span>
    <span>
       {{(desc.quantity *desc.quantity_2).toLocaleString()}} 
    </span>
  </div>

    <div class="d-flex justify-content-between text-dark" >
    <span>Used :</span>
   <span>
       {{ 
  isNaN(((desc.budget_remark_sum_cost || 0) / (desc.quantity * desc.cost * desc.quantity_2)) * (desc.quantity * desc.quantity_2)) 
    ? 0 
    : (((desc.budget_remark_sum_cost || 0) / (desc.quantity * desc.cost * desc.quantity_2)) * (desc.quantity * desc.quantity_2)).toLocaleString() 
}}
   </span>
  </div>
    <hr class="bg-danger">
    <div class="d-flex justify-content-between text-dark" >
    <span>Balance :</span>
   <span>
     {{(
        (desc.quantity *desc.quantity_2) -
        ((desc.budget_remark_sum_cost || 0) /(desc.quantity * desc.cost * desc.quantity_2)) * ( desc.quantity * desc.quantity_2) 
        || 0
        ).toLocaleString()}} 
   </span>
  </div>

        <div v-if="edit_description === desc.id "  >
        <input type="text" class="form-control" :value="desc.quantity * desc.quantity_2" disabled>
        </div>





    </td>
    <td @click ="editRow(desc)" >
        <span v-if="edit_description  !== desc.id ">
        {{ desc.cost.toLocaleString() }}/=
      </span> 
        <div v-if="edit_description === desc.id "  >
        <input type="text" class="form-control" v-model="desc.cost">
        </div>
    </td>
 <td @click="editRow(desc)">
  <div class="d-flex justify-content-between text-dark" >
    <span>Budgeted :</span>
    <span>{{ ((desc.quantity * desc.cost * desc.quantity_2)).toLocaleString() }} Tsh</span>
  </div>

    <div class="d-flex justify-content-between text-dark" >
    <span>Used :</span>
   <span>{{ Number(desc.budget_remark_sum_cost || 0).toLocaleString() }} Tsh</span>

  </div>
  <hr class="bg-danger">
  <div
  v-if="((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost)<0"
  class="d-flex justify-content-between fw-bolder text-danger" >
    <span>Balance :</span>
    <span>{{ ((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost).toLocaleString() }} Tsh</span>
  </div>

    <div
  v-else
  class="d-flex justify-content-between fw-bolder" style="color:#158c5b">
    <span>Balance :</span>
    <span>{{ ((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost).toLocaleString() }} Tsh</span>
  </div>

</td>

    <!-- <td>{{  desc.paid_by }}<br>
        <sub>{{ desc.ref_number }}</sub>
    </td> -->
    <!-- <td>{{ desc.notice }}</td> -->

    <td>
        <span  v-if="edit_description  !== desc.id " class="mx-2">
            <svg 
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="28" height="28" 
                                     fill="currentColor"
                                      class="bi bi-eye text-secondary" 
                                      viewBox="0 0 16 16"
                                      @click="openRemarkModal(desc,item)">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
        </span> 

       
        <div v-if="edit_description === desc.id " class="d-flex gap-2">
            <button class="btn btn-white md-2 " @click="closeEdition()">❌</button>
            <button class="btn btn-white md-2 " @click="updateItemDescription(desc)">
                ✅
            </button>
        </div>
        <button v-if="!unlocked && user_permissions.includes('can_delete_budget')" class="btn btn-danger btn-sm p-1" @click="deleteItemDescription(desc.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
        <br><span v-if="((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost)<0" class="text-danger">overBudget</span>
    </td>
</tr>
<tr>
    <td></td>
    <td class="fw-bolder">Total Budget</td>
    <td></td>
     <td></td>
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + (desc.quantity *desc.quantity_2), 0).toLocaleString() }}</td>   
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + desc.cost, 0).toLocaleString() }}</td>
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + (desc.quantity * desc.quantity_2 * desc.cost) - desc.budget_remark_sum_cost, 0).toLocaleString() }} Tsh</td>
</tr>

                            <tr v-if="add_item_list === item.id ">
                                <td></td>
                                <td style="min-width: 250px;">
                        <!-- v-model="name"               -->
                    <multiselect
                    v-model="category"
                    :options="['Material','Fuel', 'Labour', 'Equipment','Levy']"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select category '"
                    ></multiselect>

                      <multiselect
                      v-if="category_selector"
                    v-model="material"
                    :options="itemSelector"
                    :multiple="false"
                    :label="'name'"
                    :searchable="true"
                    required 
                    :placeholder="'Select Category'"
                    @select="description_field = true"
                    ></multiselect>
                    <input 
                    v-if="description_field"
                    type="text" class="form-control" v-model="description" placeholder="Enter Description"
                    >
                    <input 
                    v-if="others"
                    type="text" class="form-control" v-model="name" placeholder="Enter Name"
                    >
                                </td>
                                <td style="min-width: 250px;">
                                   <Multiselect
        v-model="units"
        :options="unitsOptions"
        label="short_name"
        track-by="id"
        placeholder="Enter Unit"
        :searchable="true"        
        :append-to-body="true"
    />
                                </td>
                
                                <td style="min-width: 250px;">
    <div style="display: flex; align-items: center; gap: 5px;">
        <input type="number" class="form-control" v-model="quantity" placeholder="qty1"><span>X</span><input type="number" class="form-control" v-model="quantity_2" placeholder="qty2">
    </div>
</td>
                                <td>
                                    <input type="number" class="form-control" v-model="cost" placeholder="cost">
                                </td>
                                <td>
                                    <label >{{ (cost * quantity * quantity_2).toLocaleString() }}</label>
                                </td>
                                <!-- <td>
                                    <input type="text" class="form-control" v-model="paid_by" placeholder="paid by"><br>
                                    <input type="text" class="form-control" v-model="ref_no" placeholder="ref no"><br>
                                </td> -->
                                <!-- <td>
                                    <input type="text" class="form-control" v-model="notice" placeholder="Any Remark">
                                </td> -->
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
    <tfoot>
    
    <tr>
        <td colspan="2" class="text-start fw-bold">
            SUMMARY 
        </td>
        <td>
              <table class="table table-bordered table-responsive table-striped">
                        <thead>
                            <tr >
                                <th class="text-dark fw-bold">ALLOCATED AMOUNT</th>
                                <th class="text-success">ALLOCATED BALANCE</th>
                                <!-- <th class="text-dark">GRAND TOTAL</th> -->
                                 <th class="text-danger">UNALLOCATED AMOUNT</th>
                                 <th class="text-dark">BUDGET COST</th> 
                            </tr>
                            <tr>
                                <td>
                                   {{ funded_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Tsh
                                </td>
                                <td  class="text-success fw-bolder">
                                     {{
            (
                funded_amount -
                items.reduce(
                (grandTotal, item) =>
                    grandTotal +
                    item.item_description.reduce(
                    (itemTotal, desc) => itemTotal + (Number(desc.budget_remark_sum_cost) || 0),
                    0
                    ),
                0
                )
            ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }} Tsh
                                </td>
                                <!-- <td>
                                    {{
                items.reduce(
                    (grandTotal, item) =>
                        grandTotal +
                        item.item_description.reduce(
                            (itemTotal, desc) =>
                                itemTotal +
                                ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)) -
                                (desc.budget_remark_sum_cost || 0),
                            0
                        ),
                    0
                ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }} Tsh 
                                </td> -->
                                <td class="text-danger fw-bolder">
                                    {{
                                        (
                                            // Unfunded Amount: budget cost - funded amount
                                            items.reduce(
                                                (grandTotal, item) =>
                                                    grandTotal +
                                                    item.item_description.reduce(
                                                        (itemTotal, desc) =>
                                                            itemTotal +
                                                            ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                        0
                                                    ),
                                                0
                                            ) - funded_amount
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }} Tsh
                                </td>
                                  <td>
                                    {{
                                        // Budget Cost: grand total without any deduction from description remark
                                        items.reduce(
                                            (grandTotal, item) =>
                                                grandTotal +
                                                item.item_description.reduce(
                                                    (itemTotal, desc) =>
                                                        itemTotal +
                                                        ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)),
                                                    0
                                                ),
                                            0
                                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }} Tsh
                                </td>
                            </tr>
                        </thead>
    </table> 
        </td>
     

    </tr>
  
</tfoot>
</table>
</div>
</div>
        </div>
       
    </div>


<!-- remark modal -->
 <!-- Modal -->
 <teleport to="body">
<div v-if="showRemarkModal"  class="modal fade show d-block" role="dialog" @click.self="closeRemarkModal">
  <div class="modal-dialog modal-dialog modal-xl" >
    <div class="modal-content d-flex flex-column" style="block-size: 90vh;">
  <div class="modal-header flex-column align-items-center">
  <h3 class="text-center">Transaction Remarks</h3>
  <button type="button" class="btn-close" @click="closeRemarkModal"></button>
</div>


      <!-- <div class="d-flex">
        <div class="ms-auto">
            <button 
            class="btn btn-success mx-2 mt-2" 
            @click="printRemarkReport" 
            title="Print Report">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
            </svg>
            &nbsp;Print
            </button>
        </div>
      </div> -->
      <div class="d-flex flex-column">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>BUDGET </th>
                        <th>ITEM</th>
                        <th>DESCRIPTION</th>
                        <th>BUDGET COST</th>
                        <th class="text-center">ACTION</th>
                    </tr>
                    <tr>
                        
                        <td><strong>{{ project_name }}</strong></td>
                        <td><strong>{{ items_project }}</strong></td>
                        <td><strong>{{ description }}</strong></td>
                        <td><strong>{{ (remark_cost).toLocaleString() }}Tsh</strong></td>
                        <td class="text-center">
                            <button 
      class="btn btn-success" 
      @click="printRemarkReport" 
      title="Print Report">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
      </svg>
      &nbsp;Print
    </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
      <div class="modal-body flex-grow-1" style="overflow-y: auto;">
        <div v-if="isfetching" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
          <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>
        <div v-else>
            <div class="panel br-6 p-0">
                    <div class="custom-table">                       
                        <v-client-table :data="budgetRemaks" :columns="remarkcolumns" :options="table_option">
                        <template v-if="user_permissions.includes('can_delete_budget_description_remark')"  #actions="props">                        
                             <svg xmlns="http://www.w3.org/2000/svg"
                                 width="16"
                                  height="16"                                 
                                   fill="currentColor"
                                    class="bi bi-trash text-danger"
                                     @click="deleteBudgetRemark(props.row.id)"
                                     viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            
                        </template>
                        </v-client-table>
                    </div>
                </div>
        </div>
      </div>
      
      <!-- Form for adding a new remark - fixed at bottom -->
<div class="p-3 border-top" style="background-color: #f8f9fa;">
  <form @submit.prevent="saveRemark()">
    <div class="row">
      <div class="col-md-6">
        <input
          v-model="description_cost"
          class="form-control mb-2"
          type="number"
          placeholder="Enter cost spent"
          name="cost_onremark"
        />
      </div>
      <div class="col-md-6">
        <select class="form-control mb-2" v-model="status" required>
          <option value="">Select Transaction Type</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </div>
    </div>

    <textarea
      v-model="newremark"
      class="form-control mb-2"
      rows="1"
      placeholder="Enter remarks"
    ></textarea>

    <div class="d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-secondary" @click="closeRemarkModal">
        Close
      </button>
      <button type="submit" class="btn btn-primary" :disabled="isSending">
        <span v-if="isSending && is_debit">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </span>
        <span v-else>Save</span>
      </button>
    </div>
  </form>
</div>

    </div>
  </div>
</div>
</teleport>

  <!-- Modal Background Overlay -->
  <div v-if="showRemarkModal" class="modal-backdrop fade show"></div>
<!-- remark modal end -->



<!-- ai modal starts-->
<div class="modal fade" id="ai-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-dark ">
        <h1 class="modal-title fs-5 text-white">AI Assistant</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body bg-light">
        <div class="row">
          <div class="col-md-12">
            <div class="card shadow-sm border-0 p-3">
              <h5 class="mb-3 text-primary">🧠 Ask AI</h5>

              <!-- Input & Button -->
              <form class="d-flex gap-2 mb-3" @submit.prevent="RequestAnswer">
                <input 
                  type="text" 
                  class="form-control rounded-pill px-4" 
                  placeholder="Type your question..." 
                  v-model="question"
                >
                <button type="submit" class="btn btn-success rounded-pill px-4">Send</button>
              </form>

              <!-- Chat Box -->
              <div class="p-3 bg-white rounded shadow-sm" style="max-height: 400px; overflow-y: auto;">
                <h6 class="text-muted mb-3">Response Time: {{ seconds }}s</h6>

                <!-- User Message -->
                <div v-if="old_question" class="d-flex justify-content-end mb-3">
                  <div class="bg-success text-white p-3 rounded-4 shadow-sm" style="max-width: 75%;">
                    <small class="d-block fw-bold mb-1">You</small>
                    <span>{{ old_question }}</span>
                  </div>
                </div>

                <!-- AI Message -->
                <div v-if="answer" class="d-flex justify-content-start mb-2">
                  <div class="bg-light border p-3 rounded-4 shadow-sm" style="max-width: 75%;">
                    <small class="d-block text-secondary fw-bold mb-1">AI</small>
                    <span style="white-space: pre-line">{{ answer }}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer bg-light">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- ai modal ends -->



 <div class="mt-5"
 v-if="project_id != 0 "
 data-bs-toggle="modal" data-bs-target="#ai-modal"
 v-html="aiIndicator()"
 ></div>




</template>



<script setup>
    import axios from 'axios';    
    import { onMounted, ref,inject,watch, computed } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    const name = ref('');
    const others = ref(false);
    const category = ref('');

   
    watch(category, (newVal) => {
        category_selector.value = false;
        material.value = ''
        others.value = false;
        itemSelector.value = [''];
        switch ((newVal || '').toLowerCase()) {
            case 'fuel':
                getFuel();
                break;
            case 'material':
                getMaterials();
                break;
            case 'labour':
                getLabour();
                break;
            case 'equipment':
                getEquipments();
                break;
            case 'transport':
                showMessage('Transport');
                break;

            case 'levy':
                description_field.value = true;
                material.value = {
                    name: 'Levy',
                };  
                break;
            case 'others':
                others.value = true;
                break;
            default:
                // Optionally handle unknown values
                break;
        }
    });






    const material = ref('');
        watch(material, (newVal) => {
      if (newVal && typeof newVal === 'object' && 'rate' in newVal) {
        cost.value = newVal.rate;
      } else {
        cost.value = '';
      }
    });

    const description_field = ref(false);
    const category_selector = ref(false);
    const itemSelector = ref(['']);
    const getFuel = async () => {
             await axiosInstance.get('get-materials?category_id=1')
            .then(response => {
              itemSelector.value = response.data
              category_selector.value = true;
            })
            .catch(error => {
                console.error("Error fetching fuel data: ", error);
            });
    };

     const getLabour = async () => {
             await axiosInstance.get('labour-types')
            .then(response => {
              itemSelector.value = response.data
              category_selector.value = true;
            })
            .catch(error => {
                console.error("Error fetching labours : ", error);
            });
    };

      const getEquipments = async () => {
             await axiosInstance.get('get-materials?category_id=6')
            .then(response => {
              itemSelector.value = response.data
              category_selector.value = true;
            })
            .catch(error => {
                console.error("Error fetching fuel data: ", error);
            });
    };

      const getMaterials = async () => {
             await axiosInstance.get('get-materials?category_id=5')
            .then(response => {
              itemSelector.value = response.data
              category_selector.value = true;
            })
            .catch(error => {
                console.error("Error fetching fuel data: ", error);
            });
    };

    const deepseek = inject('deepseek');
    const company_id = ref(6);
    const amendment_form = ref(false);
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    useMeta({ title:'Purchase Order'});
    const add_vendor= ref(false);
    const edit_description = ref('');
    const is_description_edit= ref(false);
    const is_debit = ref('');
    const budget_name = ref('');
    const edit_budget_name = ref(false);
    const add_fund= ref(false);
    const budgetProjects = ref([]);
    const project_status = ref ('');
    const newProject= ref('');
    const projects = ref(['']);
    const unlocked = ref(true);
    const add_item = ref(false);
    const item_name = ref('');
    const cost = ref('');
    const quantity = ref('');
    const quantity_2 = ref('');
    const paid_by = ref('');
    const ref_no = ref('');
    const notice = ref('');
    const units = ref('');
    const add_item_list = ref ('me');
    const loading_spinner = ref(false);
    const aiIndicator = inject('aiIndicator');
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const recordLog = inject('recordLog');
    const project_name = ref('');
    const funded_amount = ref(0);
    const new_fund = ref('');
    const project_id = ref(0);
    const items = ref([]);
    const budget_project = ref('');
    const fund_date = ref(new Date().toISOString().slice(0, 10));
    const purchaseOrders = ref(['']);

    const whatsappNotification = inject('whatsappNotification');

    // Watch for changes in budget_project and fetch projects accordingly
    watch(budget_project, (newVal) => {
        if (newVal && newVal.id) {
            project_id.value = 0;
            getProjects();
        }
    });
    const table_option = ref({
    perPage: 10,
    perPageValues: [5, 10, 20, 50],
    skin: 'table table-hover',
    columnsClasses: { actions: 'actions text-center' },
    pagination: { nav: 'scroll', chunk: 5 },
    texts: {
        count: 'Showing {from} to {to} of {count}',
        filter: '',
        filterPlaceholder: 'Search...',
        limit: 'Results:',
    },
    sortable: ['SNo', 'date_issued', 'fuel_issued'],
    sortIcon: {
        base: 'sort-icon-none',
        up: 'sort-icon-asc',
        down: 'sort-icon-desc',
    },
    resizableColumns: false,
    searchable: true,

});




const editRow = async (desc) => {
    if (project_status.value == "closed") {
        showError("Budget Is Closed ");
          return;        
    } else {       
        unlocked.value=true;
     is_description_edit.value = true;
     edit_description.value= desc.id;
    units.value = unitsOptions.value.find(u => u.short_name === desc.units);
    };
}

    const editBudget = async () => {
         if (project_status.value == "closed") {
        showError("Budget Is Closed ");
          return;        
    } else{
    project_name.value = budget_name.value;
    edit_budget_name.value = false;
    const data = {
        'name': budget_name.value,
    }
    try {
        const response = await axiosInstance2.put(`projects/${project_id.value}`, data);
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
    }

    const user_name = JSON.parse(localStorage.getItem("user")).name;
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const total_fund = ref(0);
    const addFund = async () => {
          total_fund.value =  parseFloat(funded_amount.value) + parseFloat(new_fund.value);
        if (parseFloat(new_fund.value) < 0) {
            showError("Fund can't be less than 0");
            new_fund.value = 0;
            return;
        }
        
        const data = {
            'funded_amount': total_fund.value,
        }
        try {
            const response = await axiosInstance2.put(`projects/${project_id.value}`, data);
            if (response.status == 200) {
                 add_fund.value=false;
                funded_amount.value = total_fund.value,
                getProjects();
                recordLog(user_id,user_name,'funding '+budget_project.value.short_name,project_name.value,project_id.value,'',new_fund.value)
                showMessage('Fund added Successfully');
                new_fund.value = 0;
            } else {
                showError("Fail to Add fund");
            }                    
        } catch (error) {
            console.error('Error Adding fund:', error);
            showError("Fail to Add fund");
        }
    }
        
        const amendment_description = ref('');
         const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

       const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL2
    });
    //  const base_url = "https://construction.trustdigital.space/api/v1/";
        const requestAmendment = async () => {
        const message = "Amendment request for  " + budget_project.value.short_name + " requested  by " + user_name + " on budget " + project_name.value 
        amendment_form.value =! amendment_form.value;
        try {
            const response = await  axiosInstance.post("/remark", {   
                remarker_id: JSON.parse(localStorage.getItem("user")).id,
                description: amendment_description.value,
                type_id:project_id.value,
                remark_type:"amendment"  
            });

            remarks.value.push(response.data); 
            amendment_description.value = ""; 
            showMessage("Amendment Sent");
            whatsappNotification('255713222333','Managing Director',message,'check.');
        } catch (error) {
            showError("Error adding remark:", error.message);
        }
    }

    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance2.get(`projects/${budget_project.value.id}`);
            projects.value = response.data;
            loading_spinner.value=false;
    } catch (error) {
        loading_spinner.value=false;
        showError(error.message);
       
    }
}


    const unitsOptions = ref([]);
    const getUnits = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`units`);
            unitsOptions.value = response.data;
    } catch (error) {
        showError(error.message);
    }
}

const getBudgetProjects = async () => {
    try {
        const response = await axios.get(`https://bcftrack.trustdigital.space/api/v1/projects`);
        let filteredData = response.data;

        if ((user_permissions.includes('can_create_copex_budget'))&&(user_permissions.includes('can_create_bushman_budget'))) {
            filteredData = filteredData.filter(project => project.status === 'active');
        } else if (user_permissions.includes('can_create_copex_budget')) {
            filteredData = filteredData.filter(project => project.company_id === 6 && project.status === 'active');
        } else if (user_permissions.includes('can_create_bushman_budget')) {
            filteredData = filteredData.filter(project => project.company_id === 5 && project.status === 'active');
        } else {
            filteredData = [];
        }
        budgetProjects.value = filteredData; // assuming budgetProjects is a ref()
        getProjects();
    } catch (error) {
        showError(error.message);
      
    }
};


const addProject= async () => {
    newProject.value =! newProject.value;
    loading_spinner.value=true;
        const data = {
            'name':project_name.value,
            'project_id':budget_project.value.id
        }
        try {
            const response = await axiosInstance2.post(`projects`,data);
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
        in_process.value= true;
   
  loading_spinner.value = true;
   const response = await axiosInstance2.delete(`item/${id}`)
      .then((response) => {
          fetchItems();
          getProjects();
          showMessage("Item  deleted");
          loading_spinner.value = false;
          in_process.value= false;      
      });
};
const deleteBudget = async (id) => {
  project_name.value = "";
  loading_spinner.value = true;
   const response = await axiosInstance2.delete(`projects/${id}`)
      .then((response) => {
          getProjects();
          project_id.value= 0;
          showMessage("Budget  deleted");
          loading_spinner.value = false;
      });
};

    const deleteItemDescription = async (id) => {
        loading_spinner.value = true;
         const response = await axiosInstance2.delete(`item-descriptions/${id}`)
            .then((response) => {
                fetchItems();
                showMessage("Description  deleted");
                loading_spinner.value = false;
            });
    };
    const addItem = async () => {
      in_process.value= true;
      loading_spinner.value= true;
      add_item.value =! add_item.value;
      const itemdata={
            'name':item_name.value, 
            'project_id':project_id.value 
              }
        try {
            const response = await axiosInstance2.post(`item`,itemdata);
             in_process.value= false;
            loading_spinner.value= false;
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
             in_process.value= false;
      loading_spinner.value= false;
            console.error('Error fetching items:', error);
            showError(error.message);
        }
    };      
    const addItemDescription = async (id) => {
        if(name.value === '' && material.value === ''){
         showError("Please select a material or enter a name");
         return ;
        }
      if(units.value === ''|| quantity.value === '' || quantity_2.value === '' || cost.value === '' ){
         showError("Please fill in all the fields");
      }else{
      add_item_list.value = '';
      
      const itemDescriptiondata={
             name: name.value !== '' ? name.value : material.value.name +" " + description.value,
            'asset_id':material.value.id,
            'units':units.value.short_name,
            'item_id':id,
            'ref_number':ref_no.value,
            'paid_by': paid_by.value,
            'quantity':quantity.value || 1,
            'quantity_2':quantity_2.value || 1,               
            'cost':cost.value || 0,
            'notice':notice.value
              }
        try {
            const response = await axiosInstance2.post(`item-descriptions`,itemDescriptiondata);
              fetchItems();
             if (response.status == 201) {
                item_name.value = "";
                units.value ="",
                quantity.value='',
                notice.value="",
                cost.value = '',
                name.value = "",
                quantity_2.value='',
                material.value = '';
                itemSelector.value = [''];
                category.value = '';
                description.value= '',
                description_field.value = false;
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
     un_finished.value= false;        
     project_id.value = data.id;
     project_name.value = data.name;
     funded_amount.value = data.funded_amount;
     project_status.value = data.status;
     fetchItems();
}

const user = ref(null);
 
 onMounted(() => {
        const storedUser = localStorage.getItem("user");
        user.value = JSON.parse(storedUser);      
        fetchItems();
        getProjects();
        getBudgetProjects();   
        fetchAmendmentRequests();
        getInstructions()  
        getUnits();  
    });

    
const readRemark = async () => {
    try {
        const response = await axiosInstance.get(`/check-remark`, {
            params: {
                remark_type: 'amendment',
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};


    const fetchItems = async () => {
    purchaseOrders.value = [''];
    loading_spinner.value=true;
        try {
            const response = await axiosInstance2.get(`item/${project_id.value}`);
            items.value = response.data;
            loading_spinner.value=false;
        } catch (error) {
            console.error('Error fetching items:', error);
            loading_spinner.value=false;
        }
    };        


    const amendmentRequests = ref(['']);
    const amendment_request_count = ref(0);
const fetchAmendmentRequests = async () => {
    try {
        const response = await axiosInstance.get(`remark?remark_type=amendment`);
        amendmentRequests.value = response.data.data.filter(item => item.status === "unchecked");
        amendment_request_count.value = response.data.unchecked_count;
    } catch (error) {
        console.error('Error fetching amendment request:', error);
        showError("Failed to load amendment request " + (error.response?.data?.message || error.message));
    } finally {
        isfetching.value = false;
    }
}    
 
// start remarks code 
const in_process = ref(false) 
const isfetching = ref(false);   
const status = ref("");
const newremark = ref();
const description_cost = ref('');
const remarks = ref([]);
const showRemarkModal = ref(false);
const isSending = ref(false);
const description = ref('');
const remark_cost = ref('');
const items_project = ref('');
const budgetRemaks = ref([]);
const budget_item_description_id = ref('');
const remarkcolumns = [ 'sno','filled_by','date' ,'description','debit','credit','balance','actions'];
  
   const openRemarkModal= (desc,item) => {     
        fetchRemarks(desc.id); // Fetch remarks for the selected item
        description.value = desc.name;             
        items_project.value = item.name;
        remark_cost.value = (desc.cost * desc.quantity * desc.quantity_2);
        showRemarkModal.value = true;
        budget_item_description_id.value = desc.id;
    }
  const  closeRemarkModal = () => {
    showRemarkModal.value = false;
    newremark.value = ''; // Clear the remark input
    remarks.value = []; // Reset the remarks list
    description.value = ''; // Clear the machine name
    items_project.value = ''; // Clear the item name
    budget_item_description_id.value = ''; // Clear the item description ID
    description_cost.value = ''; // Clear the cost input 
    fetchItems(); // Refresh the items list
    }
    const saveRemark = async () => {
        if (!newremark.value.trim()) {
            showError("Remark cannot be empty!");
            return;
        }
      isSending.value= true;
        try {
            if (status.value === 'credit') {
                description_cost.value = -Math.abs(description_cost.value);
            } else if( status.value == 'debit' ) {
                description_cost.value = Math.abs(description_cost.value);
            }
            const response = await  axiosInstance2.post(`budget-remarks`, {   
                date: new Date().toISOString().split('T')[0],
                remarker_id: JSON.parse(localStorage.getItem("user")).id,
                description: newremark.value,
                remarker: JSON.parse(localStorage.getItem("user")).name,
                budget_item_description_id: budget_item_description_id.value,
                cost: description_cost.value,
                status: status.value, // Default to unchecked                     
            });
            remarks.value.push(response.data); // Add new remark to the list
            newremark.value = ""; // Clear input field
            description_cost.value = "";
            showMessage("Remark added successfully");
            fetchRemarks(budget_item_description_id.value); // Refresh remarks
        } catch (error) {
            showError("Error adding remark:", error);
        }
        isSending.value= false;
    };

const fetchRemarks = async (id) => {
    isfetching.value = true;
    try {
        const response = await axiosInstance2.get(`budget-item-description-remarks/${id}`);
        let balance = parseFloat(remark_cost.value); // Initialize balance with remark_cost
        budgetRemaks.value = response.data.map((data, i) => {
            balance -= parseFloat(data.cost); // Update balance by subtracting cost
            return {
            sno: i + 1,
            id: data.id,
            filled_by: data.remarker,
            date: data.date,
            debit: data.cost > 0 ? Number(data.cost).toLocaleString() + "Tsh" : "--",
            credit: data.cost < 0 ? Number(Math.abs(data.cost)).toLocaleString() + "Tsh" : "--",
            description: data.description,
            balance: balance.toLocaleString() + "Tsh", // Add balance field
            };
        }); // Store response data
             
    } catch (error) {
       showError(error.message);
        console.error("Error fetching remarks:", error);
    }
    isfetching.value = false;
};
    
const deleteBudgetRemark = async (id) => {
        loading_spinner.value = true;
        if (confirm("Are you sure you want to delete this remark?")) {
            loading_spinner.value = true;
            const response = await axiosInstance2.delete(`budget-remarks/${id}`);

             if (response.status == 200) {
                fetchRemarks(budget_item_description_id.value);               
                loading_spinner.value = false;
                showMessage(response.data.message);
               
            } else {
                showError("Failed to delete remark", error);
                   }         
        } else {
            loading_spinner.value = false;
            return; // Exit if the user cancels
     }                 
};


// end of remark code

//for edit item description
const updateItemDescription = async (desc) => {
    closeEdition();  
      add_item_list.value = '';

      const itemDescriptiondata={
            'name':desc.name,
            'units':units.value.short_name,           
            'ref_number':desc.ref_no,
            'paid_by':desc.paid_by,
            'quantity':desc.quantity || 1,
            'quantity_2':desc.quantity_2 || 1,               
            'cost': desc.cost || 0,
            'notice':desc.notice
              }
        try {
            const response = await axiosInstance2.patch(`item-descriptions/${desc.id}`,itemDescriptiondata);
              fetchItems();
             if (response.status == 200) {             
                showMessage("Description Updated Succesfully");
             }
             else{
                showError("Failed to Update Item");
                console.error(error);  
             }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }; 

const closeEdition = () => {   
   edit_description.value='';
}
//editon fro item
const edit_item = ref('');
const editItemRow = async (id) => {
     if (project_status.value == "closed") {
        showError("Budget Is Closed ");
          return;        
    } else{
    edit_item.value=id;
    unlocked.value=true; 
    }
    };
    
const closeItemEdition = () => {
    edit_item.value='';
    unlocked.value=true;
   
}

const updateItem = async (item) => {
    closeItemEdition();
      add_item.value =! add_item.value;
      const itemdata={
            'name':item.name,             
              }
        try {
            const response = await axiosInstance2.patch(`item/${item.id}`,itemdata);
             
             if (response.status == 200) {
                item_name.value = "";
                showMessage("item Updated Succesfully");
                fetchItems();
             }
             else{
                showError("Failed to updaet Item");
                console.error(error);
                
             }
        } catch (error) {
            console.error('Error Update items:', error);
            showError(error.message);
        }
    };  

//code for closeing budget
  const closing = ref(false);
  const closeBudget = async () => {    
    const data = {
        'status': "closed"
    }
    in_process.value= true;
      closing.value= true;
    try {
        const response = await axiosInstance2.put(`projects/${project_id.value}`, data);
        if (response.status == 200) {
            showMessage("Budget Closed Succesfully");
            project_status.value= response.data.status;
            getProjects();
             in_process.value= false;
              closing.value= false;
        } else {
             in_process.value= false;
              closing.value= false;
            showError("Fail to Close Budget");
        }                    
    } catch (error) {
         in_process.value= false;
          closing.value= false;
        console.error('Error close Budget:', error);
        showError("Fail to close Budget");
    }
     }
      const openBudget = async () => {    
    const data = {
        'status': "open"
    }
     in_process.value= true;
      closing.value= true;
    try {
        const response = await axiosInstance2.put(`projects/${project_id.value}`, data);
        if (response.status == 200) {
             in_process.value= false;
              closing.value= false;
            showMessage("Budget Open Succesfully");
            project_status.value= response.data.status;
            getProjects();
        } else {
             in_process.value= false;
              closing.value= false;
            showError("Fail to open Budget");
        }                    
    } catch (error) {
         closing.value= false;
         in_process.value= false;
        console.error('Error open Budget:', error);
        showError("Fail to open Budget");
    }
     }


const printReport = () => {
    company_id.value= budget_project.value.company_id;
    let role;
    if (company_id.value == 5) {
        role= "Project manager"
    } else {
        role = "Engineer"
    }
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
            
            .fw-bold{
             font-weight:bolder;
            }
        </style>
    </head>
    <body>

        <table>
          <tr>
            <td class="fw-bold">PROJECT&nbsp;NAME&nbsp;: </td>
            <td>${(budget_project.value.project_name).toUpperCase()}</td>
          </tr>
           <tr>
            <td class="fw-bold">SHORT&nbsp;NAME&nbsp;: </td>
            <td>${(budget_project.value.short_name).toUpperCase()}</td>
          </tr>
           <tr>
            <td class="fw-bold">CLIENT&nbsp;: </td>
            <td>${(budget_project.value.client).toUpperCase()}</td>
          </tr>
          <tr>
            <td class="fw-bold">CONTRACT&nbsp;NUMBER&nbsp;: </td>
            <td>${(budget_project.value.contract_number).toUpperCase()} </td>
          </tr>
           <tr>
            <td class="fw-bold">FINANCIAL&nbsp;YEAR&nbsp;: </td>
            <td>${(budget_project.value.financial_year).toUpperCase()} </td>
          </tr>

            <tr>
            <td class="fw-bold">BUDGET&nbsp;FOR&nbsp;: </td>
            <td> ${(project_name.value).toUpperCase()}</td>
          </tr>

        </table>

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
                                        <th>Total</th>
                                        <th>Amount</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${item.item_description.map(desc => `
                                        <tr>
                                            <td>${desc.name || '-'}</td>
                                            <td>${desc.units || '-'}</td>
                                            <td>${(desc.cost || 0).toLocaleString()}Tsh</td>
                                            <td>${(desc.quantity || 0).toLocaleString()} x ${(desc.quantity_2 || 0).toLocaleString()}</td>
                                            <td>${((desc.quantity || 0).toLocaleString() * (desc.quantity_2 || 0).toLocaleString())}</td>
                                            <td>   
                                              ${desc.budget_remark_sum_cost !== null && desc.budget_remark_sum_cost !== undefined ? `
    <span style="text-decoration: line-through;" class="text-danger">
        ${(desc.quantity * desc.cost * desc.quantity_2).toLocaleString()}Tsh
    </span><br>` : ''}
<span>
    ${desc.budget_remark_sum_cost !== null && desc.budget_remark_sum_cost !== undefined ? 
        ((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost).toLocaleString() :
        (desc.quantity * desc.cost * desc.quantity_2).toLocaleString()}Tsh
</span>

                                            </td>

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
                                    <td>Total Balance :</td>
                                    <td>
                                          ${item.item_description.some(desc => desc.budget_remark_sum_cost !== null && desc.budget_remark_sum_cost !== undefined) ? `
                                          <span style="text-decoration: line-through;" class="text-danger">
                                              ${item.item_description.reduce((sum, desc) => sum + ((desc.quantity || 0) * (desc.quantity_2 || 0) * (desc.cost || 0)) , 0).toLocaleString()} Tsh
                                           </span><br>` : ''}
                                           <span>
                                              ${item.item_description.reduce((sum, desc) => sum + ((desc.quantity || 0) * (desc.quantity_2 || 0) * (desc.cost || 0)) - (desc.budget_remark_sum_cost || 0), 0).toLocaleString()} Tsh
                                           </span>
                                        </td>
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
            <td><strong>ALLOCATED AMOUNT</strong></td>
            <td><strong>${funded_amount.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Tsh</strong></td>
            </tr>
            <tr class="grand-total-row">
            <td><strong>ALLOCATED BALANCE</strong></td>
            <td><strong>${
                (
                funded_amount.value -
                items.value.reduce(
                    (grandTotal, item) =>
                    grandTotal +
                    (item.item_description?.reduce(
                        (itemTotal, desc) =>
                        itemTotal + (Number(desc.budget_remark_sum_cost) || 0),
                        0
                    ) || 0),
                    0
                )
                ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            } Tsh</strong></td>
            </tr>
            <tr class="grand-total-row">
            <td><strong>GRAND TOTAL</strong></td>
            <td><strong>${
                items.value.reduce(
                (grandTotal, item) =>
                    grandTotal +
                    (item.item_description?.reduce(
                    (itemTotal, desc) =>
                        itemTotal +
                        ((desc.quantity || 0) * (desc.cost || 0) * (desc.quantity_2 || 0)) -
                        (desc.budget_remark_sum_cost || 0),
                    0
                    ) || 0),
                0
                ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            } Tsh</strong></td>
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
                        <th>${role}'s Sign</th>
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
    
    // Add event listener for after printing
    printWindow.onafterprint = function() {
        printWindow.close();
    };
    
    // Trigger print after a short delay to ensure the content is loaded
    setTimeout(() => {
        printWindow.print();
    }, 0.1);

}



 const isAccordionOpen = ref(true);
const un_finished = ref(false);




 


const printRemarkReport = () => {
    const printWindow = window.open('', 'BudgetRemarkReport');
    printWindow.document.write(`
<html>
    <head>
        <title>Print Item Remark Report</title>
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
            
            .fw-bold{
             font-weight:bolder;
            }

        </style>
    </head>
    <body>
        <h3 style="text-align: center;">BUDGET ITEM TRANSACTION SUMMARY REPORT</h3>
        <table>
         <tr>
            <td class="fw-bold">PROJECT&nbsp;NAME&nbsp;: </td>
            <td>${(budget_project.value.short_name).toUpperCase()}</td>
          </tr>
          <tr>
            <td class="fw-bold">BUDGET&nbsp;NAME&nbsp;: </td>
            <td>${(project_name.value)}</td>
          </tr>
           <tr>
            <td class="fw-bold">ITEM&nbsp;: </td>
            <td>${(items_project.value)}</td>
          </tr>
           <tr>
            <td class="fw-bold">DESCRIPTION&nbsp;: </td>
            <td>${(description.value)}</td>
          </tr>
          <tr>
            <td class="fw-bold">BUDGET&nbsp;COST&nbsp;: </td>
            <td>${(remark_cost.value).toLocaleString()} Tsh</td>
          </tr>
        </table>
 <h4 style="text-align: center;">TRANSACTION RECORD</h4>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Filled&nbsp;by</th>
                    <th>Date&nbsp;</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                ${budgetRemaks.value.map((item,i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${item.filled_by}</td>
                        <td>${item.date}</td>
                        <td>${item.description}</td>
                        <td>${item.debit}</td>
                        <td>${item.credit}</td>
                        <td>${item.balance}
                            ${item.filled_by && item.filled_by.length > 0 ? `
                            ` : 'No description available'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </body>
</html>
`);
     printWindow.document.close();
    
    // Add event listener for after printing
    printWindow.onafterprint = function() {
        printWindow.close();
    };
    
    // Trigger print after a short delay to ensure the content is loaded
    setTimeout(() => {
        printWindow.print();
    }, 0.1 );
    
};

const answer= ref('')
const question = ref('')
const seconds = ref(0)
const timerInterval = ref(0)
const instructions = ref('')
const old_question = ref ('')

const getInstructions = async () =>{
      const response = await axiosInstance.get(`/ai/4`);
      ai.value = response.data
      instructions.value = response.data.instructions
}
const ai = ref('')
const RequestAnswer = async () => {
  old_question.value = question.value
  if (!question.value.trim()) {
    answer.value = 'Question cannot be empty.';
    return;
  }

  answer.value = 'Thinking...';
  seconds.value = 0;

  const startTime = performance.now();
  timerInterval.value = setInterval(() => {
    const now = performance.now();
    seconds.value = ((now - startTime) / 1000).toFixed(2);
  }, 50);

  try {
    let machineSummary = '';
    // ✅ Only fetch if source is a valid URL
    const sourceUrl = ai.value?.source;
    const isValidUrl = sourceUrl && sourceUrl.startsWith('http');

    if (isValidUrl) {
      try {
        const sourceResponse = items.value;
        machineSummary = `Data from source:\n${JSON.stringify(sourceResponse, null, 2)}\n\n`;
      } catch (err) {
        console.warn('Failed to fetch source data:', err.message);
      }
    }

    const instructionText = instructions.value
      .map((i, index) => `${index + 1}. ${i.description}`)
      .join('\n');

    const seek =
      `You are a plain text responder. No Markdown, no special characters like **, -, #, etc.\n\n` +
      (machineSummary || '') +
      `You are giving assistance based on Instructions:\n${instructionText}\n\n` +
      `Now answer this question in clean plain English:\n${question.value}`;

    const rawResponse = await deepseek(seek);

    answer.value = rawResponse
      .trim();

  } catch (error) {
    console.error(error);
    answer.value = 'Error retrieving or processing data.';
  } finally {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    question.value = '';
  }
};


</script>
<style scoped>
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

.accordion {
  position: relative;
}
.accordion-toggle {
  text-align: center;
  cursor: pointer;
  padding: 5px;
  background: #f5f5f5;
  color: red;
}
.toggle-arrow {
  font-size: 16px;
}
.budget-button {
  margin: 2px;
}
</style>