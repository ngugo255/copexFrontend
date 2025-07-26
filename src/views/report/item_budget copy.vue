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
<div>


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
                <td>{{ budget_project.project_cost?.toLocaleString() }} Tsh</td>
            </tr>
            <tr>
                <td><strong>CLIENT:</strong></td>
                <td>{{ budget_project.client }}</td>
            </tr>
            <tr>
                <td>BUDGET FOR:</td>
                <td @click="project_status === 'open' ?(budget_name =project_name, edit_budget_name = true) : showError('Budget is closed') "> {{ budget.name }}</td>
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
                    v-if="budget.status === 'open' && user_permissions.includes('can_create_budget') && !add_item"
                    class="btn btn-primary mt-2" 
                    @click="add_item =!add_item" 
                    title="Add Item"
                    :disabled="in_process">
                    &nbsp;Add Item
                    
                </button>
                <button 
                    v-if="budget.status === 'open' && user_permissions.includes('can_create_budget') && add_item"
                    class="btn btn-danger mt-2" 
                    @click="add_item =!add_item" 
                    title="Add Item"
                    :disabled="in_process">
                    &nbsp;Close Item
                </button>

                <button 
                    v-if=" user_permissions.includes('can_create_lpo_from_budget') && !hide_lpo"
                    class="btn btn-dark mt-2"           
                    title="Add Item"
                    :disabled="in_process"
                    @click="hide_lpo = true "
                   >
                    <!-- <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> -->        
                    <span v-if="!lpo_list"  @click= "order_registration = true , getVendors(),setEnvForLpoCreation()"> 
                        &nbsp;Create LPO 
                    </span>
                     <span v-else @click="view_lpo_list = true, order_registration = false"> 
                        &nbsp;Fill Lpo 
                    </span>          
                </button>        
                <button 
                    v-if=" user_permissions.includes('can_create_lpo_from_budget') && lpo_creation_window && !un_finished "
                    class="btn btn-danger mt-2" 
                    @click="showMessage('Please wait while Activating LPO'); activatePurchaseOrder();"
                    title=""
                    :disabled="in_process">
                    <span v-if="lpo_window" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <span v-else > &nbsp;Close Lpo Creation Window</span>
                </button>

                <button  
                    v-if="budget.status === 'open' && user_permissions.includes('can_close_budget')"         
                    class="btn btn-warning mt-2" 
                    @click="closeBudget" 
                    title="Add Item"
                    :disabled="in_process">
                     <span v-if="closing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     <span v-else>&nbsp;Close Budget </span>
                </button>
                <button  
                    v-if="budget.status === 'closed' && user_permissions.includes('can_open_budget')"         
                    class="btn btn-success mt-2" 
                    @click="openBudget" 
                    title="Add Item"
                    :disabled="in_process">
                     <span v-if="closing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     <span v-else>&nbsp;Open Budget </span>
                </button>
                  <button  
                    v-if="budget.status === 'closed'"         
                    class="btn btn-info mt-2" 
                    @click="amendment_form=!amendment_form">
              Request Amendment 
                </button>

                <button  
                    v-if="budget.status === 'open' && user_permissions.includes('can_alert_budget_for_review')"         
                    class="btn btn-secondary mt-2" 
                    @click="triggerNotification('255698267662','Dozzaer','check','baba salama');" 
                    title="Add Item"
                    :disabled="in_process">
                  <span v-if="submit" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     <span v-else>&nbsp;Submit For Review </span>
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

<!-- lpo list starts -->
  <div class="d-flex mt-3">
    <div class="ms-auto">
                 <button v-if="hide_lpo" class="btn btn-danger btn-sm " @click="hide_lpo=false,order_registration=false,view_lpo_list=false">
                    X
                </button>  
    </div>
  </div>


         <div v-if="lpo_list && view_lpo_list" class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="purchaseOrders" 
                            :columns="columns" 
                            :options="table_option" 
                           
                        >
                           
                            <template #actions="props">
<span class="me-2">
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-primary bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
</span>

<span class="me-2">
<svg v-if="selected_lpo == props.row.id" 
@click="selected_lpo = 0,showMessage('Lpo Unselected')"
xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-success bi bi-check-circle"  viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>



<svg v-else
@click="selected_lpo = props.row.id, selected_lpo_status = props.row.status, showMessage('LPO selected')"
xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
</svg>

</span>

                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
 <!-- lpo list ends -->
        <!-- order registration starts -->
  
           <form v-if="order_registration" class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="registerPurchaseOrder">
            <h4 class="text-center">LOCAL PURCHASE ORDER REGISTRATION</h4>
            <div class="row mb-2">
                <div v-if="!add_vendor" class="col-md-3">
                    <label class="form-label">Select A Supplier</label>
                    <select class="form-select" v-model="vendor_id" required @change="handleVendorChange">
    <option value="">Select Supplier</option>
    <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">{{ vendor.name }}</option>
    <option value="NEW_VENDOR">New Supplier</option>
</select>
                 


                </div>
                <!-- new vendor  starts-->
                <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Name</label>
              <input type="text" class="form-control" v-model="Vendor_name" name="Vendor_name" required>
          </div>
       
          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Email</label>
              <input type="text" class="form-control" v-model="Vendor_email" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Phone</label>
              <input type="text" class="form-control" v-model="Vendor_phone" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Address</label>
              <input type="text" class="form-control" v-model="Vendor_address" name="Vendor_name" required>
          </div>

          <div  v-if="add_vendor" class="col-md-3">
              <label class="form-label">Supplier Location</label>
              <input type="text" class="form-control" v-model="Vendor_location" name="Vendor_name" required>
          </div>
                <div class="col-md-3">
                    <label class="form-label">Payment Terms</label>
                    
                    <multiselect
                    v-model="payment_terms"
                    :options="['Bank /TT ', 'Cash', 'Cheque', 'M-Pesa', 'On-Account', 'Wakala']"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Payment Terms'"
                    ></multiselect>
                </div>
        
           
            </div>
         
         

            <div class="text-center gap-2 justify-content-end">
                <button v-if="add_vendor" type="button" class="btn btn-dark me-3" @click="add_vendor=false">Back</button>
                <button type="button" class="btn btn-danger me-3" @click="order_registration = false;add_vendor=false;is_closed=true">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>

         <!-- order registration ends -->
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
                    <div v-if="budget.status == 'open'" class="ms-auto">
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
                            <tr  v-for="desc,i in item.item_description" :key="desc.name">
                                <td  >{{ i+1 }}</td>
     <td @click ="editRow(desc.id)">
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
    <td @click ="editRow(desc.id)" >
        <span v-if="edit_description  !== desc.id ">
        {{ desc.cost.toLocaleString() }}/=
      </span> 
        <div v-if="edit_description === desc.id "  >
        <input type="text" class="form-control" v-model="desc.cost">
        </div>
    </td>
 <td @click="editRow(desc.id)">
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

         <span v-if= "selected_lpo != 0" class="mx-2">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" height="28" 
                fill="currentColor"
                class="bi bi-plus text-success" 
                viewBox="0 0 16 16"
                @click="openLpoCreationModal(desc,item)">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h3v-3a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3A.5.5 0 0 1 4 8z"/>
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
  <form @submit.prevent="saveRemark">
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

<!-- creating lpo modal strt -->
 <teleport to="body">
<div v-if="is_create_lpo"  class="modal fade show d-block" role="dialog" @click.self="closeLpoCreationModal">
  <div class="modal-dialog modal-dialog modal-xl" >
    <div class="modal-content d-flex flex-column" style="block-size:auto;">
      <div class="modal-header">
           
   
        <button type="button" class="btn-close" @click="closeLpoCreationModal"></button>
      </div>          
      <div class="modal-body flex-grow-1" style="overflow-y: auto;">

                               <div v-if="selected_lpo_status ==='Inactive'"  class="mt-2 mb-2" >
  <button class="btn btn-warning" @click="activatePurchaseOrder()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                               Ready 
 </button>
        </div>
         
         <form v-if="selected_lpo_status ==='Inactive'" @submit.prevent="registerItem">   
                      <h4>Form For Adding {{ lpo_item_name }} to LOCAL PURCHASSE ORDER </h4>
        <div class="row">
            <div class="col-md-4">
                <label for="unit" class="form-label">Unit</label>
                <input type="text" id="unit" class="form-control" v-model="lpo_item_units" placeholder="Units">
            </div>
            <div class="col-md-4">
                <label for="item" class="form-label">Item</label>
                <input type="text" id="item" class="form-control" v-model="lpo_item_name" placeholder="Item">
            </div>
            <div class="col-md-4">
                <label for="quantity" class="form-label">Quantity (available: {{ Math.max(0, lpo_total_quantity - itemQuantitydFromStorage) }})</label>
                <input
                    type="number"
                    id="quantity"
                    class="form-control"
                    v-model="lpo_item_quantity"
                    placeholder="Quantity"
                    min="1"                   
                />
            </div>
            <div class="col-md-4">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" class="form-control" v-model="lpo_item_cost" placeholder="Price"  disabled >
            </div>
            <div class="col-md-4 ">
                <label for="amount" class="form-label">Amount</label>
                <input type="text" id="amount" class="form-control" :value="(lpo_item_cost * lpo_item_quantity).toLocaleString()" readonly>
            </div>
            <div class="col-md-4 ">
                <label for="remark" class="form-label">Remark</label>
                <input type="text" id="remark" class="form-control" v-model="lpo_item_notice" placeholder="Remark">
            </div>
        </div>
          <div class="d-flex justify-content-end gap-4 mt-4">
            <button type="button" class="btn btn-secondary" @click="closeLpoCreationModal">Close</button>
            <button type="submit" class="btn btn-primary" :disabled="isSending"> 
              <span v-if="isSending && is_debit ">
                <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
                </span>
              <span v-else>Submit</span>
            </button>
          </div>
        </form>
        <v-else>
               <h4>LOCAL PURCHASSE ORDER  LIST</h4>
        </v-else>   
            <div class="row layout-top-spacing">
           <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
               <div class="panel p-0">  
                     <div v-if="loading" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
        <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
            </svg>
           
        </span>
    </div>

                   <div class="custom-table table3 ">           
                           <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template  #actions="props">                              
                               <a v-if="selected_lpo_status ==='Inactive'"  @click=" deleteLpoItem(props.row.id)"  href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top" >
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
      </div>      
     
    </div>
  </div>
</div>
</teleport>
  <!-- Modal Background Overlay -->
  <div v-if="is_create_lpo" class="modal-backdrop fade show"></div>
<!-- creating lpo modal end -->


<!-- unfinished lpo start -->

 <teleport to="body">
<div v-if="is_unfinished_lpo"  class="modal fade show d-block" role="dialog" @click.self="closeLpoCreationModal">
  <div class="modal-dialog modal-dialog modal-xl" >
    <div class="modal-content d-flex flex-column" style="block-size:auto;">
      <div class="modal-header">           
   
        <button type="button" class="btn-close" @click="closeLpoCreationModal"></button>
      </div>          
      <div class="modal-body flex-grow-1" style="overflow-y: auto;">
          <h4>Items For Unfisnished LOCAL PURCHASSE ORDER </h4>        
            <div class="row layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
               <div class="panel p-0"> 
                     <div v-if="loading" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
        <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
            </svg>
           
        </span>
                          </div>
                   <div class="custom-table table3 ">           
                           <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template #actions="props">
                              
                               <a @click=" deleteLpoItem(props.row.id)"  href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top" >
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
            <div class="d-flex justify-content-end gap-3 mt-3">
                <button class="btn btn-primary" @click="un_finished = false; lpo_creation_window = true; lpo_number = lpoNumberFromStorage; closeLpoCreationModal();">
                    Continue With This LPO
                </button>
                <button class="btn btn-danger" @click=" closeLpoCreationModal(); closeLpoCreationWindow(); registerPurchaseOrder(); is_unfinished_lpo = false;">
                    Start New LPO
                </button>
            </div>
           </div>

       </div>     
      </div>      
     
    </div>
  </div>
</div>
</teleport>
  <!-- Modal Background Overlay -->
  <div v-if="is_unfinished_lpo" class="modal-backdrop fade show"></div>

<!-- unfinished lpo end -->








</template>



<script setup>
    import axios from 'axios';    
    import { onMounted, ref,inject,watch, computed } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    import { useRoute } from 'vue-router';
    const hide_lpo = ref(false);
    const selected_lpo = ref(0);
    const view_lpo_list = ref(false);
    const columns = ref(['SNo','LPO_number','requested_by', 'supplier','date','payment', 'actions']);
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
    const budget_project_id = ref(0);
    const budgetProjects = ref([]);
    const project_status = ref ('');
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
    const recordLog = inject('recordLog');
    const project_name = ref('');
    const funded_amount = ref(0);
    const new_fund = ref('');
    const project_id = ref(0);
    const items = ref([]);
    const budget_project = ref('');
    const fund_date = ref(new Date().toISOString().slice(0, 10));
    const lpo_list = ref(false);
    const purchaseOrders = ref(['']);
    const selected_lpo_status = ref('');
    const getPurchaseOrders = async () => {
         try {
            const response = await    
            axios.get(`https://bcftrack.trustdigital.space/api/v1/budget-purchase-orders?project_id=${budget_project.value.id}&budget_name=budget${project_id.value}`);
            if (response.data && Array.isArray(response.data)) {
                   purchaseOrders.value = response.data
  .filter(order => order.status_name === "Inactive" )
  .map((order, index) => ({
    SNo: index + 1,
    id: order.id,
    LPO_number: `${String(order.id).padStart(4, '0')}/${order.date_created.slice(5, 7)}/${order.date_created.slice(2, 4)}`,
    company_id: order.company_id,
    supplier: order.vendor.name,
    address: order.address,
    requested_by: order.requested_by,
    date: order.date_created,
    project: order.project_aka,
    payment: order.payment_terms,
    location: order.location,
    requester: order.user_id,
    status: order.status_name,
  }));


             if (purchaseOrders.value.length > 0) {
                lpo_list.value = true;
            }else{
                lpo_list.value = false;
            }
                    loading_spinner.value = false;
                } else {
                    console.error("Invalid response format");
                }
        } catch (error) {
            console.error("Error fetching  vendors : ", error);
        }
     }

    const vendors= ref(['']);
       const getVendors = async () => {
        loading_spinner.value = true;
        try {
            const response = await    
            axios.get(`https://bcftrack.trustdigital.space/api/v1/vendors`);
            if (response.data && Array.isArray(response.data)) {
                    vendors.value = response.data;
                    loading_spinner.value = false;
                

                } else {
                    console.error("Invalid response format");
                }
        } catch (error) {
            console.error("Error fetching  vendors : ", error);
        }
    };
  
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

  const handleVendorChange = (event) => {
    if (event.target.value === 'NEW_VENDOR') {
        addVendor();
        vendor_id.value = ''; // Reset the selection
    }
}

const addVendor = () => {
    add_vendor.value =! add_vendor.value;
}

const editRow = async (id) => {
    if (budget.value.status == "closed") {
        showError("Budget Is Closed ");
          return;        
    } else {       
        unlocked.value=true;
    is_description_edit.value = true;
     edit_description.value= id;
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
            const response = await axios.put(`${base_url}projects/${project_id.value}`, data);
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
        const requestAmendment = async () => {
        amendment_form.value =! amendment_form.value;
        try {
            const response = await  axiosInstance.post("/remark", {   
                remarker_id: JSON.parse(localStorage.getItem("user")).id,
                description: amendment_description.value,
                type_id:project_id.value,
                remark_type:"amendment"  
            });

            remarks.value.push(response.data); // Add new remark to the list
            amendment_description.value = ""; // Clear input field
            showMessage("Remark added ");
        } catch (error) {
            showError("Error adding remark:", error.message);
        }
    }

    const route = useRoute();
    const budget = ref('');
    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axios.get(`${base_url}projects?budget_id=${route.params.budget_id}`);
            budget.value = response.data;
            funded_amount.value= budget.value.funded_amount;
            
            loading_spinner.value=false;
    } catch (error) {
        loading_spinner.value=false;
        showError(error.message);
       
    }
}
const getBudgetProjects = async () => {
    try {
        const response = await axios.get(`https://bcftrack.trustdigital.space/api/v1/projects/${route.params.project_id}`);
        budget_project.value = response.data;
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
        in_process.value= true;
   
  loading_spinner.value = true;
   const response = await axios.delete(`${base_url}item/${id}`)
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
      in_process.value= true;
      loading_spinner.value= true;
      add_item.value =! add_item.value;
      const itemdata={
            'name':item_name.value, 
            'project_id':project_id.value 
              }
        try {
            const response = await axios.post(`${base_url}item`,itemdata);
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
            'quantity':quantity.value || 1,
            'quantity_2':quantity_2.value || 1,               
            'cost':cost.value || 0,
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
     selected_lpo.value = 0;
     hide_lpo.value= false; 
     un_finished.value= false;        
     lpo_creation_window.value = false;    
     project_id.value = data.id;
     project_name.value = data.name;
     funded_amount.value = data.funded_amount;
     project_status.value = data.status;
    getPurchaseOrders();
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
            const response = await axios.get(`${base_url}item/${route.params.budget_id}`);
            items.value = response.data;
            loading_spinner.value=false;
            console.log('items',items.value);
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

//code for closeing budget
  const closing = ref(false);
  const closeBudget = async () => {    
    const data = {
        'status': "closed"
    }
    in_process.value= true;
      closing.value= true;
    try {
        const response = await axios.put(`${base_url}projects/${project_id.value}`, data);
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
        const response = await axios.put(`${base_url}projects/${project_id.value}`, data);
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

//whatsub trigger for budget review
   // whatsapp notification
  const triggerNotification = async (phone,sender,action,next_designation) => {
  const recipientPhone = phone;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

  const requestData = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhone,
    "type": "template",
    "template": {
        "name": "copex_lpo",
        "language": {
            "code": "en"
        },
        "components": [
            {
                "type": "header",
                "parameters": [
                    {
                        "type": "image",
                        "image": {
                            "link": "https://copexcontractors.co.tz/assets/img/copex-about-img.jpg"
                        }
                    }
                ]
            },
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": sender // Replaced "Engineer" with sender variable
                    },
                    {
                        "type": "text",
                        "text": action // Replaced first "check" with action variable
                    },
                    {
                        "type": "text",
                        "text": next_designation // Replaced "Senior Accountant" with next_designation
                    },
                    {
                        "type": "text",
                        "text": action // Kept second "check" or replaced with action if needed
                    }
                ]
            }
        ]
    }
};
 submit.value= true;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    showMessage("Messange Sent Succesfully")
    submit.value= false;
  } catch (error) {
    submit.value= false;
    console.error('Error:', error);
  }
};

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
            <td> ${(budget.value.name).toUpperCase()}</td>
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
    printWindow.print();
    
};


 //code for creating lpo_items wit all logiks
 const submit = ref(false);
 const isAccordionOpen = ref(true);
const lpoNumberFromStorage = ref('');
const projectIdFromStorage = ref('');
const un_finished = ref(false);
 const lpo_item_description_id = ref('')
 const is_unfinished_lpo =ref(false);
 const   lpo_window = ref(false);
 const is_create_lpo =  ref(false);
 const lpo_item_cost = ref('');
 const lpo_item_name = ref('');
 const lpo_total_quantity= ref('')
 const lpo_item_quantity= ref('');
 const lpo_item_units = ref('');
 const lpo_item_notice =  ref('');
 const lpo_number = ref('');
 const lpo_creation_window = ref(false);
 const lpo_items = ref([]);
const item_columns = ref(['SNo','description', 'units', 'quantity', 'rate', 'amount','actions',]);
const loading = ref('');
const total_amount= ref();
const itemDescriptionIdFromStorage = ref('');
const itemQuantitydFromStorage = ref('');
const order_registration = ref(false);
 const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

const setEnvForLpoCreation = () => {
         order_registration.value=true;
};


  const clearForm = ()=>{
       supplier_name.value='';
       project_name.value='';
       payment_terms.value='';
       supplier_address.value='';
       supplier_location.value='';
       vendor_id.value='';
       Vendor_name.value = '';
    Vendor_phone.value= '';
    Vendor_email.value ='';
    Vendor_address.value ='';
    Vendor_location.value ='';
    order_registration.value = false;
    add_vendor.value = false
    };


 const supplier_name = ref('');
    const supplier_address = ref('');
    const supplier_location = ref('');
       const Vendor_name = ref('');
    const Vendor_phone= ref('');
    const Vendor_email = ref('');
  const Vendor_address =ref ('');
  const Vendor_location=ref('');
    const payment_terms = ref('');
    const vendor_id = ref('');
    const registerPurchaseOrder = async () => {
    try {
        order_registration.value = false;
        loading_spinner.value = true;
        
        // First register vendor if needed
        if (add_vendor.value === true) {
            await registerVendor(); // Wait for vendor registration to complete
        }

        const purchaseOrderData = {
            name: 'budget'+project_id.value,
            company_id: company_id.value,
            vendor_id: vendor_id.value,
            supplier: "none",
            address: "none",
            project_id: budget_project.value.id,
            project: 'empty',
            payment_terms: payment_terms.value,
            location: "none",
            user_id: JSON.parse(localStorage.getItem("user")).id,
            requested_by: JSON.parse(localStorage.getItem("user")).name,
            status_name: 'Inactive',
            status_color: 'dark',
        };

        const response = await axiosInstance2.post('/purchase-order', purchaseOrderData);
        getPurchaseOrders();
        clearForm();
        loading_spinner.value = false;
      if (response.status === 201) {   
            view_lpo_list.value=true;   
            showMessage("Purchase Order Registered Successfully");
        } else {
            showError("Failed to register Purchase Order"); 
            console.error(error);
            
        }
       
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error registering Order:", error);
        loading_spinner.value = false;
    }
};

const registerVendor = async () => {
    try {
        loading_spinner.value = true;
        const VendorData = {
            name: Vendor_name.value,
            phone: Vendor_phone.value,
            email: Vendor_email.value,
            address: Vendor_address.value,
            location: Vendor_location.value,
        };

        const response = await axiosInstance.post('/vendors', VendorData);
        vendor_id.value = response.data.id;
        loading_spinner.value = false;
        return response.data.id; // Return the vendor ID
    } catch (error) {
        showError("Error registering Vendor" + error.status);
        loading_spinner.value = false;
        throw error; // Re-throw the error to be caught in registerPurchaseOrder
    }
};
 
// When saving LPO data


 const openLpoCreationModal = (desc, item) => {
    // Reset stored quantity when opening a new item
    console.log('selected LPO status',selected_lpo_status.value);
    itemQuantitydFromStorage.value = 0;
    itemDescriptionIdFromStorage.value = null;
    
    // Set new item values
    lpo_item_description_id.value = desc.id;
    lpo_item_cost.value = desc.cost;
    lpo_item_name.value = desc.name;
    lpo_item_quantity.value = desc.quantity * desc.quantity_2;
    lpo_item_units.value = desc.units;
    is_create_lpo.value = true;
    lpo_total_quantity.value = desc.quantity * desc.quantity_2;
    
    // Now get items (including stored quantities)
    getItems();
}

const getItems = async () => {
    loading.value = true;
    try { 
        const response = await axiosInstance2.get(`/order-items/${selected_lpo.value}`);
        if (response.data && Array.isArray(response.data)) {
            total_amount.value = response.data.reduce((sum, order) => {
                return sum + (order.quantity * order.rate);
            }, 0);                    
            
            lpo_items.value = response.data.map((order, index) => ({
                SNo: index + 1,
                category: order.category,
                id: order.id,
                description: order.description,
                units: order.unit_measure,
                quantity: order.quantity.toLocaleString(),
                rate: Number(order.rate).toLocaleString(),
                amount: (order.quantity * order.rate).toLocaleString(undefined, { maximumFractionDigits: 3})
            }));
            
            loading.value = false;
        } else {
            loading.value = false;
            console.error("Invalid response format");
        }
    } catch (error) {
        loading.value = false;
        console.error("Error fetching purchase order: ", error);
    }
};

 const registerItem = () => {
    if(!selected_lpo.value){
        showError("No LPO selected");
        return;
    }
    if(lpo_item_quantity.value > lpo_total_quantity.value  ){
        showError("The Quantity exceeds The Quantity Available");
        return;
    } 
  if(lpo_item_quantity.value <= 0) {
    showError("The Quantity Can't be zero or negative");
    return;
}  

    loading.value = true;   
    
    const itemData = {
        order_id: selected_lpo.value,
        description: lpo_item_name.value,
        unit_measure: lpo_item_units?.value || "NO",
        quantity: lpo_item_quantity.value,
        machine_id: 0,
        rate: lpo_item_cost.value,
        item_list_id: budget_project.value.id,
        category: "budget",
    };
    
    axiosInstance2
        .post('/items', itemData)
        .then((response) => {              
            isSending.value = false;   
            loading.value = false;          
            
            if (response.status === 201) {               
                getItems();
                showMessage('Item registered successfully');
            } else {
                showError('Error registering item');
                console.error("Error registering Order:", response.data.message);
            }
        })
        .catch((error) => {
            loading.value = false;
            console.error("Error registering Order:", error.message);
        });
};

 const clearItemForm = () =>{
     lpo_item_cost.value = " ";
    lpo_item_name.value= " ";
    lpo_item_quantity.value= " ";
    lpo_item_units.value= " ";
    lpo_total_quantity.value='';
 }

 const closeLpoCreationModal = () =>{   
    is_create_lpo.value= false;
    is_unfinished_lpo.value = false;
    itemQuantitydFromStorage.value = 0;
 }

 const deleteLpoItem = (id) => {
        loading.value = true;
   if (confirm("Are you sure you want to delete this item?")) {
                  axiosInstance2
            .delete(`/items/${id}`)
            .then((response) => {
                getItems();
                loading.value = false;
                if (response.status === 200) {
                   showMessage('Item Deleted successfully');
                } else {
                    showError('Fail to Delete item');
                    console.error("Error registering Order:", response.data.message);
                }
            })
            .catch((error) => {
                 loading.value = false;
                console.error("Error registering Order:", error.message);
            });  
    
   }
}



const clearLpoStorage = () => {
    // Option 1: Clear completely
    localStorage.removeItem('current_lpo_data');
    
    // Option 2: Clear only current project's LPO
    const storedData = localStorage.getItem('current_lpo_data');
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            let lpoArray = Array.isArray(parsed) ? parsed : [parsed];
            
            // Filter out current project's LPOs
            lpoArray = lpoArray.filter(lpo => 
                String(lpo.project_id) !== String(project_id.value)
            );
            
            // Save back if array not empty
            if (lpoArray.length > 0) {
                localStorage.setItem('current_lpo_data', JSON.stringify(lpoArray));
            } else {
                localStorage.removeItem('current_lpo_data');
            }
        } catch (error) {
            console.error("Error clearing LPO data:", error);
            localStorage.removeItem('current_lpo_data');
        }
    }
};





const activatePurchaseOrder = () => {
        const activationData = {
            status_name: 'Unapproved',
            status_color: 'secondary',
        };        
        if (confirm("Are you sure you want to Close this Order?")) {
            axiosInstance2
                .put(`/purchase-order/${selected_lpo.value}`, activationData)
                .then((response) => {
                if (response.status == 200) {                  
                     showMessage(" Activation Successfuly! Now Waiting for Approvals");
                     selected_lpo_status.value="Unapproved";
                     getPurchaseOrders();
                }
                else{
                    showError("activation Fails");
                }
                })
 
                .catch((error) => {
                    console.error("Error activating order:", error.message);
                });   
        } else {
           
        }
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