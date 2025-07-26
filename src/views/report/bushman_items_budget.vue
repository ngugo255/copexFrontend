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
      

   



        <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1 text-center">


<div class="budgets-container">
    <div class="d-flex">
        <h4 class="budgets-title">Budgets List</h4>
<div class="mb-2 ms-auto">
    <select class="form-control " v-model="budget_project" @change="project_id = 0,getProjects()">
                        <option value=''>Select a project </option>
                        <option v-for="project in budgetProjects" :value="project">{{ project.short_name }}</option>
        </select>
</div>    
    </div>
   
    <div v-if="budget_project != ''">   
        <div  v-if="!newProject" class="budgets-buttons" >
        <span 
  v-for="project in projects" 
  class="budget-button project-button" 
  @click="setParam(project)"
>
  {{ project.name }}
  <span v-if="user_permissions.includes('can_delete_budget') && project.items_count == 0" 
      class="close-mark" 
      @click="deleteBudget(project.id)">
    ×  
</span>
</span>
    <span class="budget-button new-project-button" @click="newProject=!newProject,project_name='',project_id=0">+ New Budget</span>
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
<h4 class="mb-0  mb-2">
    <div v-if ="edit_budget_name" class="d-flex align-items-center gap-2">
    <input type="text" class="form-control w-50 " v-model="budget_name" :placeholder="project_name">
    <button class="btn btn-primary" @click="editBudget()">Save</button>
    <button class="btn btn-danger r-2" @click="edit_budget_name=!edit_budget_name">X</button>
    </div>
</h4>

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
            <tr >
                <td>BUDGET FOR:</td>
                <td @click="budget_name = project_name, edit_budget_name = true "> {{ (project_name).toUpperCase() }}</td>
            </tr>
        </tbody>
    </table>
</div>
 <!-- project description ends -->

              
               <div class="d-flex">
                <div class="ms-auto ">
                    <button 
            class="btn btn-success mx-2" 
            @click="printReport" 
            title="Print Report">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
            </svg>
            &nbsp;Print
            </button>

            <button 
             v-if="project_status == 'open'"
            class="btn btn-primary ms-auto" 
            @click="add_item =!add_item" 
            title="Add Item">
            &nbsp;Add Item
            </button>
                </div>
                
               </div>    
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

            <table class="table table-bordered table-responsive mt-5">
    <thead class="thead-light">
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
                                <th>Cost</th>
                                <th>Amount</th>
                                <!-- <th>Paid By</th> -->
                                <th>Remark</th>
                                <th>
                                    <div class="d-flex">
                                        <div v-if ="project_status =='open'" class="ms-auto" >
                                        <button v-if="add_item_list === item.id " class="btn btn-danger btn-sm p-2" @click="add_item_list = '' ">X</button>
                                        <button v-else  class="btn btn-primary" @click="add_item_list = item.id ">add</button>
                                    </div>
                                    </div>
                                    <button v-if="!unlocked && item.item_description  == '' " class="btn btn-danger btn-sm p-1 mx-1" @click="deleteItem(item.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                 <tbody>
                            <tr  v-for="desc,i in item.item_description" :key="desc.name">
                                <td  >{{ i+1 }}</td>
     <td @click ="editRow(desc.id)" > 
      <span v-if="edit_description  !== desc.id ">
        {{ desc.name }}
      </span>        
        <div v-if="edit_description === desc.id ">
            <input type="text" class="form-control" v-model="desc.name">
        </div>
    </td>
    <td @click ="editRow(desc.id)" > 
        <span v-if="edit_description  !== desc.id ">
        {{ desc.units}}
      </span> 
        <div v-if="edit_description === desc.id "  >
            <input type="text" class="form-control" v-model="desc.units">
        </div>
    </td>
    <td @click ="editRow(desc.id)" >
        <span v-if="edit_description  !== desc.id ">
        {{ (desc.quantity).toLocaleString() }} x {{ (desc.quantity_2) }}
      </span>       
        <div class="row" v-if="edit_description === desc.id "  >
            <input type="text" class="form-control w-25" v-model="desc.quantity"> <span class="w-25 mt-2 text-center">X</span> <input type="text" class="form-control w-25" v-model="desc.quantity_2">
        </div>
    </td>
    <td @click ="editRow(desc.id)" >
        <span v-if="edit_description  !== desc.id ">
        {{ desc.cost.toLocaleString() }}
      </span> 
        <div v-if="edit_description === desc.id "  >
        <input type="text" class="form-control" v-model="desc.cost">
        </div>
    </td>
    <td @click ="editRow(desc.id)" >   
    <span v-if="!desc.budget_remark_sum_cost == ''" style="text-decoration: line-through;" class="text-danger">{{((desc.quantity * desc.cost * desc.quantity_2) ).toLocaleString()  }}Tsh</span> 
    <br>
    <span >{{ ((desc.quantity * desc.cost * desc.quantity_2) - desc.budget_remark_sum_cost).toLocaleString() }}Tsh</span>
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
    <td class="fw-bold">{{ item.item_description.reduce((sum, desc) => sum + (desc.quantity * desc.quantity_2 * desc.cost) - desc.budget_remark_sum_cost, 0).toLocaleString() }} Tsh</td>
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
                                <!-- <td>
                                    <input type="text" class="form-control" v-model="paid_by" placeholder="paid by"><br>
                                    <input type="text" class="form-control" v-model="ref_no" placeholder="ref no"><br>
                                </td> -->
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
    <tfoot>
    <tr>
        <td colspan="5" class="text-end fw-bold">GRAND TOTAL</td>
        <td class="fw-bold">
            {{ 
                items.reduce(
                    (grandTotal, item) => grandTotal + 
                    item.item_description.reduce(
                        (itemTotal, desc) => itemTotal + ((desc.quantity * desc.cost * desc.quantity_2)- desc.budget_remark_sum_cost), 
                    0), 
                0).toLocaleString() 
            }} Tsh
        </td>
        <td></td>
    </tr>
</tfoot>
</table>

</div>
        </div>
       
    </div>


<!-- remark modal -->
 <!-- Modal -->
 <teleport to="body">
<div v-if="showRemarkModal"  class="modal fade show d-block" role="dialog" @click.self="closeRemarkModal">
  <div class="modal-dialog modal-dialog modal-xl" >
    <div class="modal-content d-flex flex-column" style="block-size: 90vh;">
      <div class="modal-header">
        <button type="button" class="btn-close" @click="closeRemarkModal"></button>
      </div>
      <div class="d-flex">
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
      </div>
      <h3 class="text-center">Transaction Remarks</h3>
      <div class="d-flex flex-column">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>BUDGET NAME</th>
                        <td><strong>{{ project_name }}</strong></td>
                    </tr>
                    <tr>
                        <th>ITEM</th>
                        <td><strong>{{ items_project }}</strong></td>
                    </tr>
                    <tr>
                        <th>DESCRIPTION</th>
                        <td><strong>{{ description }}</strong></td>
                    </tr>
                    <tr>
                        <th>BUDGET COST</th>
                        <td><strong>{{ (remark_cost).toLocaleString() }}Tsh</strong></td>
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
        <form @submit.prevent="saveRemark">   
                <!-- debit credit radio button starts -->
                <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="debit" value="debit" v-model="status" @change="is_debit = true" >
            <label class="form-check-label" for="debit">Debit</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="credit" value="credit" v-model="status" @change="is_debit = false">
            <label class="form-check-label" for="credit">Credit</label>
          </div>
                 <!-- debit credit radio button ends -->
          <input v-model="description_cost" class="form-control mb-2" type="number" placeholder="Enter cost spent " name="cost_onremark">
          <textarea v-model="newremark" class="form-control mb-2" rows="3" placeholder="Enter remarks"></textarea>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="closeRemarkModal">Close</button>
            <button type="submit" class="btn btn-primary" :disabled="isSending"> 
              <span v-if="isSending && is_debit ">
                <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
              </span>
              <span v-else>Save </span>
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



</template>



<script setup>
    import axios from 'axios';    
    import { onMounted, ref,inject,watch } from 'vue';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';

    useMeta({ title: 'Purchase Order' });
    const edit_description = ref('');
    const is_debit = ref('');
    const budget_name = ref('');
    const edit_budget_name = ref(false);
    const budget_project_id = ref(0);
    const budgetProjects = ref([]);
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
    const is_description_edit = ref(false);
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

const editRow = async (id) => {
    unlocked.value=true;
    is_description_edit.value = true;
     edit_description.value= id;
    };

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
        const response = await axios.get(`${base_url}projects/${budget_project.value.id}`);
            projects.value = response.data;
            loading_spinner.value=false;
    } catch (error) {
        loading_spinner.value=false;
        showError(error.message);
        console.log(error);
    }
}

const getBudgetProjects = async () => {
    try {
        const response = await axios.get(`https://bcftrack.trustdigital.space/api/v1/projects`);
        budgetProjects.value = response.data.filter(project => project.company_id === 5 && project.status === 'active');
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

 
// start remarks code 

const isfetching = ref(false);   
const status = ref("unchecked"); // Default status
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
  const   closeRemarkModal = () => {
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
            if (is_debit.value === false) {
                description_cost.value = -Math.abs(description_cost.value);
            } else if( is_debit.value == true ) {
                description_cost.value = Math.abs(description_cost.value);
            }
            const response = await  axios.post(`${base_url}budget-remarks`, {   
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
        const response = await axios.get(`${base_url}budget-item-description-remarks/${id}`);
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
            const response = await axios.delete(`${base_url}budget-remarks/${id}`);

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
            'units':desc.units,           
            'ref_number':desc.ref_no,
            'paid_by':desc.paid_by,
            'quantity':desc.quantity || 1,
            'quantity_2':desc.quantity_2 || 1,               
            'cost': desc.cost || 0,
            'notice':desc.notice
              }
        try {
            const response = await axios.patch(`${base_url}item-descriptions/${desc.id}`,itemDescriptiondata);
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
    edit_item.value=id;
    unlocked.value=true; 
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
            const response = await axios.patch(`${base_url}item/${item.id}`,itemdata);
             
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
                <td><strong>GRAND TOTAL</strong></td>
                <td><strong>${
                    items.value.reduce(
                        (grandTotal, item) => grandTotal + 
                        (item.item_description?.reduce(
                            (itemTotal, desc) => itemTotal + ((desc.quantity * desc.cost * desc.quantity_2) - (desc.budget_remark_sum_cost || 0)), 
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
                        <th>PM Sign</th>
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
    printWindow.print();
    
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


</style>