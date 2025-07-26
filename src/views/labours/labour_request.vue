<template>   
    <div class="layout-px-spacing">
        <!-- Breadcrumb -->
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Labour Request</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>

        <!-- Filters Section -->      
        <div>
        <button  class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
        </button>
        
        <div v-if="user_permissions.includes('can_request_labours')" class="d-flex me-4 gap-3">
            <div  class="ms-auto">
                <button v-if="is_closed" class="btn btn-primary" @click="payment_registration= true; is_closed = false; ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
                <button v-else class="btn btn-danger" @click="payment_registration = false; is_closed = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
        </div>


        <form v-if="payment_registration" class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="registerLabourRequest">
           <h4 class="text-center">LABOUR REQUEST FORM </h4>                  
           <div class="row mb-2">

         <div class="col-md-4">
              <label class="form-label">Select Project</label>
           <multiselect 
                    v-model="selected_project"
                    track-by="id"
                    :options= "projects"
                    label = "short_name"
                    placeholder="Select Project"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
          </div>  

            <div class="col-md-4">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" v-model="selected_date" name="date" required>
            </div>     
    
           <div class="col-md-4">
              <label class="form-label">Working Days</label>
              <input type="number" placeholder="Enter Working Days" class="form-control" v-model="labour_days" name="Vendor_name" required>
          </div> 

           <div class="col-md-12">
              <label class="form-label">Task </label>
             <textarea class="form-control" placeholder="Enter Task" required v-model="labour_task"></textarea>
          </div>      

            </div>
            <div class="text-center gap-2 justify-content-end">
                <button type="button" class="btn btn-danger me-3" @click="payment_registration = false;is_closed=true">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        
        </form>

   <div>
        <div  class="text-center"><h4>LABOUR REQUESTS LIST</h4></div>
        <!-- loading starts -->
            <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
         <!-- loading ends -->
        <div v-else class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="row mb-3 d-flex justify-content-center align-items-center">
                </div>
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option"                            
                        >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                            <template #actions="props" >
                                <svg 
                                 style="cursor:pointer"
                                  @click="openModal(props.row)" 
                                  data-bs-toggle="modal"  data-bs-target="#view_modal"
                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-primary bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>

                                <svg

                                v-if="props.row.stat== 'Inactive'"  
                                class="w-6 h-6 text-gray-800 dark:text-white" 
                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                                 @click="prepareLabourRequestEdit(props.row)"
                                 data-bs-toggle="modal"  data-bs-target="#view_modal"
                              >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>

                <svg
                v-if="labour_request.stat ==! 'Inactive'"
                    @click="prepareTable(props.row)"
                    style="cursor:pointer"
                xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-printer text-success" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                </svg>

                <svg
                v-if="user_permissions.includes('can_delete_labour_request') && props.row.stat === 'Inactive'"
                @click="deleteLabourRequest(props.row.id)"
                style="cursor:pointer"
                xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash text-danger" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
<Router-link :to="'/report/allowance-approved/'+props.row.project_id +'/' +props.row.id +'/' + props.row.date" >
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
</Router-link>

                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- view modal starts -->
         <div class="modal fade mymodal" id="view_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header position-relative">
  <h1 v-if="!edit_modal" class="modal-title fs-5 position-absolute start-50 translate-middle-x" id="staticBackdropLabel">
    Labour Registration
  </h1>
  <h1 v-else class="modal-title fs-5 position-absolute start-50 translate-middle-x" id="staticBackdropLabel">
    Edit Labour Request
  </h1>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss" @click="closeModal()"></button>
</div>

      <div>
        
      </div>
<!-- status checking starts -->
<div class="mx-auto mt-2 ">
<!-- <button
 v-if="user_permissions.includes('can_verify_hr') "
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.human_resources === 0,
    'btn-dark': approval_status_data.human_resources === 1
  }"
  @click="approveCheck(approval_check_id, 'human_resources', approval_status_data.human_resources === 0 ? 1 : 0),inactivateLabourRequest(labour_request_id,approval_status_data.human_resources)"
>
<div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
  <span v-else>
  {{ approval_status_data.human_resources === 0 ? 'Check' : 'Uncheck' }}
  </span>
</button> -->

<button
 v-if="user_permissions.includes('can_verify_copex_operator') && approval_status_data.human_resources === 1"
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.operation_department === 0,
    'btn-dark': approval_status_data.operation_department === 1
  }"
  @click="approveCheck(approval_check_id, 'operation_department', approval_status_data.operation_department === 0 ? 1 : 0)"
>
  <div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
  <span v-else>
  {{ approval_status_data.operation_department === 0 ? 'Check' : 'Uncheck' }}
  </span>
</button>

<button
 v-if="user_permissions.includes('can_verify_engineer') && approval_status_data.operation_department === 1"
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.engineer === 0,
    'btn-dark': approval_status_data.engineer === 1
  }"
  @click="approveCheck(approval_check_id, 'engineer', approval_status_data.engineer === 0 ? 1 : 0)"
>
  <div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
  <span v-else>
   {{ approval_status_data.engineer === 0 ? 'Check' : 'Uncheck' }}
  </span>
</button>

<button
 v-if="user_permissions.includes('can_verify_sr_accountant') && approval_status_data.engineer === 1"
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.senior_accountant === 0,
    'btn-dark': approval_status_data.senior_accountant === 1
  }"
  @click="approveCheck(approval_check_id, 'senior_accountant', approval_status_data.senior_accountant === 0 ? 1 : 0)"
>
  <div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
  <span v-else>
  {{ approval_status_data.senior_accountant === 0 ? 'Check' : 'Uncheck' }}
  </span>
</button>

<button
 v-if="user_permissions.includes('is_md') && approval_status_data.senior_accountant === 1"
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.managing_director === 0,
    'btn-dark': approval_status_data.managing_director === 1
  }"
  @click="approveCheck(approval_check_id, 'managing_director', approval_status_data.managing_director === 0 ? 1 : 0),approveLabourRequest(labour_request_id,approval_status_data.managing_director)"
>
  <div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
<span v-else>
  {{ approval_status_data.managing_director === 0 ? 'Check' : 'Uncheck' }}
</span>
</button>

</div>

<!-- status checking en -->
      <div v-if="!edit_modal" class="d-flex mt-2">
       
        <div class="mx-3 mb-2">
        <button
 v-if="user_permissions.includes('can_verify_hr') "
  :class="{
    'btn': true,
    'btn-primary': approval_status_data.human_resources === 0,
    'btn-dark': approval_status_data.human_resources === 1
  }"
  @click="approveCheck(approval_check_id, 'human_resources', approval_status_data.human_resources === 0 ? 1 : 0),inactivateLabourRequest(labour_request_id,approval_status_data.human_resources)"
>
<div v-if="loading_activation" class="spinner-border text-white" role="status">
          <span class="sr-only"></span>
  </div>
  <span v-else>
         
  {{ approval_status_data.human_resources === 0 ? 'Activate' : 'Inactivate' }}
  </span>
        </button>
        </div>


        <div class="mx-3" v-if="user_role != 15">

           <button v-if=" labour_request.stat == 'Inactive' &&  !activated && labourType.length > 0 " class="btn btn-warning" @click="activateLabourRequest(labour_request_id)">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                               Ready 
           </button>
        </div>
    
                           
        <div class="ms-auto me-2">
             <button v-if="labour_request.stat == 'Inactive' &&  !activated " type="button" class="btn btn-primary  me-2" @click="labour_type_registration =! labour_type_registration">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
             </button>
                         <button 
                         v-if="!labourType.length == 0 " 
                class="btn btn-success"
                @click="printTable()"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                </svg>
               
            </button>
        </div>
      </div>
<!-- approvals starts -->
 
<div v-if=" check_status" class="custom-table table3 table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th>HR</th>
                <th>Operation</th> 
                <th>Engineer</th>                              
                <th>Sr.Accountant</th>
                <th>MD</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td :class="{'text-danger': approval_status_data.human_resources === 0, 'text-success': approval_status_data.human_resources === 1}">
                    {{ approval_status_data.human_resources === 0 ? 'unchecked' : 'checked' }}
                </td>
                <td :class="{'text-danger': approval_status_data.operation_department === 0, 'text-success': approval_status_data.operation_department === 1}">
                    {{ approval_status_data.operation_department === 0 ? 'unchecked' : 'checked' }}
                </td>
                 <td :class="{'text-danger': approval_status_data.engineer === 0, 'text-success': approval_status_data.operation_department === 1}">
                    {{ approval_status_data.engineer === 0 ? 'unchecked' : 'checked' }}
                </td>
                <td :class="{'text-danger': approval_status_data.senior_accountant === 0, 'text-success': approval_status_data.senior_accountant === 1}">
                    {{ approval_status_data.senior_accountant === 0 ? 'unchecked' : 'checked' }}
                </td>
                <td :class="{'text-danger': approval_status_data.managing_director === 0, 'text-success': approval_status_data.managing_director === 1}">
                    {{ approval_status_data.managing_director === 0 ? 'unchecked' : 'checked' }}
                </td>
            </tr>
        </tbody>
    </table>

        <table v-if="!user_permissions.includes('can_verify_hr')" class="table">
        <thead>
            <tr>
              <th>SNo</th>
                <th>Type</th>
                <th>Task</th> 
                <th>Quantity</th>                              
                <th>Rate</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="labour,i in labourType">
              <td>{{ i + 1 }}</td>
              <td> {{ labour.labour_type }}</td>
              <td> {{ labour.task }}</td>
              <td> {{ labour.quantity }}</td>
              <td> {{ labour.rate }}</td>
              <td> {{ labour.total }}</td>
            </tr>
        </tbody>
        </table>
</div>
<!-- approvals ends -->
      <!-- labour type registration form starts -->
           <form v-if="labour_type_registration"  @submit.prevent="registerLabourType()">
            <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                     <multiselect 
                    v-model="labour_type"
                    track-by="id"
                    :options= "labourTypeSelection"
                    label = "name"
                    placeholder="Select Labour Type"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
                </div>
                 <div class="col-md-4">
                    <input type="number" class="form-control" v-model="labour_quantity" placeholder="Enter Quantity" required>
                </div>
                 <div class="col-md-4">
                    <input type="text" class="form-control" v-model="labour_task" placeholder="Enter Task" required>
                </div>
                 
            </div>
          </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-danger"   @click="labour_type_registration=false">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
      <!-- labour type registration form ends -->

            <!-- loader starts -->
     <div v-if="loading_labour_types" v-html="loadingIndicator()" class="mt-5"></div>
             <!-- loader ends -->
      <!-- labours registered list starts -->
      <div v-else class="row layout-top-spacing">
  <div v-if="!edit_modal" class="col-12 layout-spacing">
    <div v-if="user_permissions.includes('can_verify_hr')"  class="d-flex flex-wrap gap-3 justify-content-center">
      <div
        v-for="item in labourType"
        :key="item.id"
        class="d-flex align-items-center justify-content-between px-3 py-2 rounded-pill shadow-sm"
        :class="selected_labour_list.id === item.id ? 'bg-success text-white' : 'bg-white border'"
        style="min-width: 120px; max-width: 180px; cursor: pointer; transition: all 0.3s ease;"
        @click="selectLabourType(item)"
      >
        <span  class="text-truncate">{{ item.labour_type }}</span>
        <svg
          v-if="selected_labour_list.id === item.id"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-check-circle ms-2"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14" />
          <path
            d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-circle ms-2 text-muted"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14" />
        </svg>
      </div>
    </div>
    <div  v-if="labourType.length == 0 " class="d-flex flex-wrap gap-3 justify-content-center">
        No labour list registered yet
    </div>
  </div>
  <div v-else>
    <div v-if="updating_request" v-html="loadingIndicator()"></div>
    <div v-else class="container">
        <form @submit.prevent="updateLabourRequest(request_id)">
 <div class="row">
          <div class="col-md-4">
              <label class="form-label">Select Project</label>
          <multiselect 
  v-model="selected_project"
  track-by="id"
  :options="projects"
  label="short_name"
  placeholder="Select Project"
  :required="true"
  :searchable="true"
  :multiple="false"
/>

          </div>  

            <div class="col-md-4">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" v-model="selected_date" name="date" required>
            </div>     
    
           <div class="col-md-4">
              <label class="form-label">Working Days</label>
              <input type="number" placeholder="Enter Working Days" class="form-control" v-model="labour_days" name="Vendor_name" required>
          </div> 

           <div class="col-md-12">
              <label class="form-label">Task </label>
             <textarea class="form-control" placeholder="Enter Task" required v-model="labour_task"></textarea>
          </div>      
          </div>
           <div class="text-end gap-2 justify-content-end mt-2 mb-2">
                <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal" class="btn btn-danger me-3">Cancel</button>
                <button type="submit" class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
  </div>
</div>

      <!-- Labour registered List ends -->
      <!-- selected labour type card starts -->
       <div v-if="selected_labour_list !== ''" class="row mb-3">
        <div class="col-md-6">
<div class="d-flex">
  <div class="ms-auto mb-1"> <button 
        v-if="labourRequestList.length == 0 && labour_request.stat == 'Inactive' && !activated"
        class="btn btn-danger" @click="deleteRequestedLabourType(selected_labour_list.id)">
        Delete
      </button>
  </div>
</div>
<table class="table container table-bordered table-striped">
  <tbody>
    <tr>
      <th>Labour Type </th>
      <td>{{ selected_labour_list.labour_type }}</td>
    </tr>
     <tr>
      <th>Task</th>
      <td>{{ selected_labour_list.task }}</td>
    </tr>
    <tr>
      <th>Quantity</th>
      <td>{{ selected_labour_list.quantity }}</td>
    </tr>
    <tr>
      <th>Rate</th>
      <td>{{ selected_labour_list.rate }}</td>
    </tr>
    <tr>
      <th>Total</th>
      <td>{{ selected_labour_list.total }}</td>
    </tr>
  </tbody>
</table>

        </div>

        <div class="col-md-6">
<!-- labours form list starts -->
 <div v-if="loading_labours" v-html="loadingIndicator()"></div>
<div v-if="!loading_labours && labourRequestList.length < selected_labour_list.labour_count " class="row align-items-center mb-1 me-2">
  <form @submit.prevent="addLabourList()" class="d-flex w-100">
    <div class="col-sm-9">
      <multiselect 
        v-model="selected_labour"
        track-by="id"
        :options="labourListSelection"
        label="name"
        placeholder="Select A Labour"
        :required="true"
        :searchable="true"
        :multiple="false"
        required
      ></multiselect>
    </div>
    <div class="col-sm-3 text-end">
      <button class="btn btn-primary" type="submit">Add</button>
    </div>
  </form>
</div>
<!-- labours form list ends -->


<ol v-if="!loading_labours " class="list-group list-group-numbered me-2 ">
  <li v-for="labour in labourRequestList" class="list-group-item d-flex justify-content-between align-items-start">
    <div class="me-auto">
      <div  class="fw-bold">{{  labour.labour_name }}</div>
    </div>
    <span class="btn btn-danger p-2 btn-sm" @click="deleteLabourList(labour.id)">x</span>
  </li>
</ol>

        </div>
       </div>
       <!-- selected labour type card ends -->
    </div>
  </div>
</div>
         <!-- view modal ends -->
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

    import axios from 'axios';    
    import { onMounted, ref,inject } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Labour Request' });
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const loadingIndicator = inject('loadingIndicator');
    const labour_type_registration = ref(false);
    const labour_type = ref('');
    const payment_registration = ref(false);
    const columns = ref(['SNo','project','requested_by','date','days','task','status','awaits','actions']);
    const labourType = ref([]);
    const labour_type_columns = ref(['SNo','labour_type','task','quantity','rate','total','actions']);
    const items = ref([]);
    const labourTypeSelection = ref([]);
    const project = ref('');


    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo','batch_no','beneficiary_name','date','payment_number','purpose_of_payment','budget','unbudget', 'amount'],
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

    const loading_spinner = ref(false);
  const is_closed = ref(true);
    const axiosInstance = axios.create({
      //  baseURL: process.env.VUE_APP_API_BASE_URL
       baseURL: "https://construction.trustdigital.space/api/v1/"
    });
    const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    const request_id = ref(0);
    const prepareLabourRequestEdit = (request) => {
      request_id.value = request.id;
      edit_modal.value=true;
      labour_days.value = request.days;
      selected_date.value = request.date;
      labour_task.value = request.task;
      selected_project.value = projects.value.find(p => p.id === request.project_id) || null;
    }


   const approval_status_data = ref({
    human_resources: 0,
    operation_department: 0,
    engineer: 0,
    senior_accountant: 0,
    managing_director: 0
});
    const getApprovalStatus = async (request_id) => {
    try {
        const response = await axiosInstance2.get(`/approval-check-status/${request_id}?type=labour_request`);
        if (response.data && typeof response.data === 'object') {
            approval_status_data.value = response.data;
            check_status.value=true;
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching approval status: ", error);
    }
};

const deleteLabourRequest = (id) => {
    if (confirm("Are you sure you want to delete this request ?")) {
        loading_spinner.value = true;
            axiosInstance2
            .delete(`/labour-request/${id}`)
            .then((response) => {
                getLabourRequests();
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Labour Request Deleted successfully');
                } else {
                    showError('Fail to Delete Labour');
                    console.error("Error deleteing labour:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting labours :", error.message);
            });  
    
   }
   else{
    return;
   }
    };


const prepareTable = async (labourRequest) => {
    loading_spinner.value=true;
    labour_request.value = labourRequest;
    labour_request_id.value = labourRequest.id;
    await getRequestedLabourTypes(labourRequest.id);
    await getApprovalStatus(labourRequest.id);
    printTable();
    loading_spinner.value=false;
}

const edit_modal = ref(false);
const editModal = (labourRequest) => {
    edit_modal.value=true;
}

const labour_request = ref('');
const approval_check_id = ref (0);
const openModal = (labourRequest) => {
    approval_check_id.value = labourRequest.approval_check_id,
    labour_request.value = labourRequest;
    labour_request_id.value = labourRequest.id;
    getRequestedLabourTypes(labourRequest.id);
    getApprovalStatus(labourRequest.id);
}

  const labourListSelection = ref([]);
  const fetchLabours = async () => {
      try {
        const response = await axiosInstance2.get('/labours');
        labourListSelection.value = response.data;
      } catch (error) {
        showError(error.message || "Failed to fetch data");
        console.error("API error:", error);
      } finally {
   
      }
    };

      const labourRequestList = ref([]);
      const loading_labours =ref(false);
      const fetchLabourRequestList = async () => {
      loading_labours.value=true;
      try {
        const response = await axiosInstance2.get(`/labour-request-list?request_type_id=${selected_labour_list.value.labour_type_id}`);
        labourRequestList.value = response.data;
        console.log('fetched data', labourRequestList.value);
      } catch (error) {
        showError(error.message || "Failed to fetch data");
        console.error("API error:", error);
      } finally {
        loading_labours.value=false;
      }
    };



const selected_labour_list = ref('');
const selectLabourType = (labour) => {
     selected_labour_list.value = labour;
     fetchLabourRequestList(); 
}

    const loading_labour_types = ref(false);
    const getRequestedLabourTypes = async (request_id) => {
    loading_labour_types.value = true;
    try {
        const response = await axiosInstance2.get(`/request-labour-types?request_id=${request_id}`);
            labourType.value = response.data.map((data,index) => ({
                    SNo:  index + 1,
                    id: data.id,
                    labour_type_id: data.labour_type_id,
                    labour_type:data.labour_type.name,
                    rate:data.labour_type.rate.toLocaleString(),
                    quantity: data.quantity.toLocaleString() + "x " + labour_request.value.days +"(days)",
                    labour_count:data.quantity,
                    total : ((data.labour_type.rate * data.quantity)*labour_request.value.days).toLocaleString(), 
                    task: data.task,
              }));
            loading_labour_types.value = false;
    } catch (error) {
         loading_labour_types.value = false;
    }
};


    const getLabourRequests = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance2.get(`/labour-request`);
         items.value = response.data
  .filter(data => data.status_name !== 'Inactive' || data.user_id === user_id || user_role === 1)
  .map((data, index) => ({
    SNo: index + 1,
    id: data.id,
    project: data.project,
    project_id : data.project_id,
    user_id: data.user_id,
    requested_by: data.requested_by,
    project_id: data.project_id,
    date: data.date,
    days: data.days,
    task: data.task,
    approval_check_id: data.approval_check_id,
    stat: data.status_name,
    status: {
      key: data.status_name,
      class: data.status_color
    },
    awaits: data.awaits,
  }));

            loading_spinner.value = false;
    } catch (error) {
        loading_spinner.value = false;
    }
};



    const projects= ref(['']);
    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance2.get(`/projects`);
             projects.value = response.data.filter(project =>project.company_id == 6)
            loading_spinner.value = false;
    } catch (error) {
        loading_spinner.value = false;
    }
};

    const getLabourTypeSelection = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance2.get(`/labour-types`);
            labourTypeSelection.value = response.data;
            loading_spinner.value = false;
    } catch (error) {
        loading_spinner.value = false;
    }
};




const user = ref('');
const user_permissions = ref([]);
    onMounted(() => {
        const storedUser = localStorage.getItem("user");
        user.value = JSON.parse(storedUser);       
        user_permissions.value = user.value.permissions;
        getLabourRequests();
        getProjects();
        getLabourTypeSelection();
        fetchLabours();
    });


    const labour_quantity =ref ('');
    const labour_task = ref('');
    const labour_request_id = ref(0);
    const registerLabourType = async () =>{
        labour_type_registration.value=false;
        loading_labour_types.value = true;
        const newData = {
           labour_type_id:labour_type.value.id,
           quantity:labour_quantity.value,
           task:labour_task.value,
           labour_request_id:labour_request_id.value,
        };
        axiosInstance2
            .post(`/request-labour-types`, newData)
            .then((response) => {
                getRequestedLabourTypes(labour_request_id.value);
                showMessage("Saved successfully");
                labour_type.value ='';
                labour_task.value = '';
                labour_quantity.value ='';
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
            });
    }
    
    const check_status = ref(false);
    const closeModal = () =>{
        selected_labour_list.value = '';
        edit_modal.value =false;
        check_status.value= false;
        clearLabourRequestForm();
    }
        const labour_days = ref('');
        const selected_date = ref('');
        const selected_project = ref('');
        const updating_request = ref(false);

        const clearLabourRequestForm = () => {
             labour_task.value = '',
             labour_days.value= '',
             selected_date.value = '',
             selected_project.value = ''
        }

    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const registerLabourRequest = async () =>{
        loading_spinner.value=true;
        payment_registration.value = false;
        is_closed.value =true
        updating_request.value=true;
        const newData = {
          user_id : user_id,
          project_id: selected_project.value.id,
          project_name: selected_project.value.name,
          date:   selected_date.value,
          days:   labour_days.value,
          task : labour_task.value,
        };

        axiosInstance2
            .post(`/labour-request`, newData)
            .then((response) => {
             getLabourRequests();
             showMessage('Registered successfully');
             updating_request.value=false;
             clearLabourRequestForm();
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error registering request Data", error);
                updating_request.value=false;
            });
    }

      const activated = ref(false);
      const loading_activation = ref(false);
      const approveCheck = async (id, role ,status) => {
        activated.value = true; 
        loading_activation.value = true; 
        try {
            const response = await axiosInstance2.put(`/approval-check/${id}`, {
                [role]: status
            });
          getApprovalStatus(labour_request_id.value);  
          getLabourRequests();
        } catch (error) {
            console.error("Error approving check:", error.message);
        }
        loading_activation.value = false;
    };

const activateLabourRequest = async (id) => {
  activated.value=true;
    loading_labour_types.value = true;
    const newData = {
        status_name: 'Unapproved',
        status_color: 'secondary',
    };

    try {
        // First update the labour request status
        await axiosInstance2.put(`/labour-request/${id}`, newData);
        
        // Then update the approval check
        // await approveCheck(approval_check_id.value, 'human_resources',1);
        
        // Then refresh both the requests and approval status
        await getLabourRequests();
        await getApprovalStatus(labour_request.value.id);
        
        showMessage('Activated successfully');
    } catch (error) {
        showError(error.message);
        console.error("Error updating request Data", error);
    } finally {
        loading_labour_types.value = false;
    }
};

 const approveLabourRequest = async (id, status) => {
    updating_request.value = true;

    const newData = {
        status_name: status === 1 ? 'Unapproved' : 'Approved',
        status_color: status === 1 ? 'secondary' : 'success',
    };

    axiosInstance2
        .put(`/labour-request/${id}`, newData)
        .then((response) => {
            getLabourRequests();
            if(status === 1){
              showMessage('Request Rejected');
            }else{
              showMessage('Request Approved');
            }
            clearLabourRequestForm();
            updating_request.value = false;
        })
        .catch((error) => {
            showError(error.message);
            console.error("Error updating request data", error);
            updating_request.value = false;
        });
};

 const inactivateLabourRequest = async (id, status) => {
    updating_request.value = true;
    const newData = {
        status_name: status === 1 ? 'Inactive' : 'Unapproved',
        status_color: status === 1 ? 'dark' : 'secondary',
    };

    axiosInstance2
        .put(`/labour-request/${id}`, newData)
        .then((response) => {
            getLabourRequests();
            if(status === 1){
              showMessage('Request Inactivated');
              activated.value=false;
            }else{
              showMessage('Request Activated');
              
            }
            clearLabourRequestForm();
            updating_request.value = false;
        })
        .catch((error) => {
            showError(error.message);
            console.error("Error updating request data", error);
            updating_request.value = false;
        });
};
          
        const updateLabourRequest = async (id) =>{
        updating_request.value=true;
        const newData = {
          project_id: selected_project.value.id,
          date:   selected_date.value,
          days:   labour_days.value,
          task : labour_task.value,
        };

        axiosInstance2
            .put(`/labour-request/${id}`, newData)
            .then((response) => {
             getLabourRequests();
             showMessage('updated successfully');
            updating_request.value=false;
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error updating request Data", error);
                updating_request.value=false;
            });
    }

        const selected_labour = ref('');
        const addLabourList = async () =>{
        loading_labours.value=true;
        const newData = {
           labour_request_id : labour_request_id.value,
           labour_request_type_id:selected_labour_list.value.labour_type_id,
           labour_id: selected_labour.value.id,
           labour_name:selected_labour.value.name,
        };

        axiosInstance2
            .post(`/labour-request-list`, newData)
            .then((response) => {
                fetchLabourRequestList();
                selected_labour.value='';
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
            });
    }

     const deleteRequestedLabourType = async (id) =>{
     loading_labour_types.value = true;
      selected_labour_list.value = '';
        axiosInstance
            .delete(`/request-labour-types/${id}`)
            .then((response) => {
                getRequestedLabourTypes(labour_request.value.id);
                showMessage("Deleted successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
            });
    }


  const deleteLabourList = async (id) =>{
       loading_labours.value=true;
        axiosInstance2
            .delete(`/labour-request-list/${id}`)
            .then((response) => {
                fetchLabourRequestList();
                showMessage("Deleted successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
            });
    }
    
const selectedTypes = ref('');

const printTable = () => {
  const dateParts = labour_request.value.date.split("-");
  const formattedDate = `${dateParts[1]}/${dateParts[2].slice(-2)}`;

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  let grandTotal = 0;

  let labourRows = labourType.value.map(item => {
    const rawTotal = parseFloat(item.total.replace(/,/g, ''));
    grandTotal += rawTotal;
    return `
      <tr>
        <td>${item.labour_type}</td>
        <td>${item.task}</td>
        <td>${item.quantity}</td>
        <td>${item.rate}/=</td>
        <td>${item.total}/=</td>
      </tr>
    `;
  }).join('');

  const formattedGrandTotal = grandTotal.toLocaleString();

  let printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Labour Request Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; margin-bottom: 0; font-size: 22px; font-weight: bold; font-family: "Times New Roman", serif; }
        h2 { text-align: center; margin: 0; font-size: 18px; font-family: "Times New Roman", serif;font-weight: normal; }
        h3 { margin-top: 30px; font-size: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid black; padding: 5px; text-align: left; font-size: 15px; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .top-section { display: flex; justify-content: space-between; align-items: start; }
        .logo { width: 150px; height: auto; }
        .lpo-box {
          border: 1px solid black;
          border-radius: 5px;
          padding: 5px;
          font-size: 13px;
          width: 120px;
        }
        .company-info { text-align: center; margin-top: 10px; }
        .registration {
          position: absolute;
          top: 100px;
          right: 30px;
          font-size: 14px;
          font-weight: bold;
          text-align: right;
        }
        .section-title {
          text-align: center;
          text-decoration: underline;
          font-family: "Times New Roman", serif;
          font-weight: bold;
          font-size: 17px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>

      <div class="top-section">
        <img src="https://bcftrack.trustdigital.space/copex.jpg" class="logo" alt="logo" />
        <div class="lpo-box">
          <strong>REQUEST NO:</strong><br>
          <span style="color:red;">
            ${("0000" + labour_request.value.id).slice(-4)} /${formattedDate}
          </span>
        </div>
      </div>

      <div class="company-info">
        <h1>COPEX CONTRACTORS CO.LTD</h1>
        <h2>Msamvu, P.O.BOX 678, Morogoro</h2>
        <h2>Mobile, 0713 000 777, 0657 111 555</h2>
      </div>

      <div class="registration">
        TIN: 103-826-519,<br>
        VRN: 20-01-017530R
      </div>

      <div class="section-title">LABOUR REQUEST</div>

      <h3>Request Descriptions</h3>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Date</th>
            <th>Working Days</th>
            <th>General Task</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${labour_request.value.project}</td>
            <td>${labour_request.value.date}</td>
            <td>${labour_request.value.days}</td>
            <td>${labour_request.value.task}</td>
          </tr>
        </tbody>
      </table>

      <h2 style="text-align:left; font-weight: bold;">Labours Requested</h2>
      <table>
        <thead>
          <tr>
            <th>Labour Type</th>
            <th>Specific Task</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${labourRows}
          <tr>
            <td colspan="4" style="text-align:right;"><strong>Grand Total</strong></td>
            <td><strong>${formattedGrandTotal}/=</strong></td>
          </tr>
        </tbody>
      </table>

      <table style="width: 100%; margin-top: 50px; font-size: 10px;">
        <tr>
          <td style="text-align: center;">HR Officer</td>
          <td style="text-align: center;">Operation's Dept</td>
          <td style="text-align: center;">Engineer</td>
          <td style="text-align: center;">Sr Accountant</td>
          <td style="text-align: center;">Managing Director</td>
        </tr>
        <tr>
          <td style="text-align: center;height: 50px; color: ${approval_status_data.value.human_resources == 0 ? 'red' : 'green'};">
            ${approval_status_data.value.human_resources == 0 ? 'Unchecked' : 'Checked'}
          </td>
          <td style="text-align: center;height: 50px; color: ${approval_status_data.value.operation_department == 0 ? 'red' : 'green'};">
            ${approval_status_data.value.operation_department == 0 ? 'Unchecked' : 'Checked'}
          </td>
          <td style="text-align: center;eight: 50px; color: ${approval_status_data.value.engineer == 0 ? 'red' : 'green'};">
            ${approval_status_data.value.engineer == 0 ? 'Unchecked' : 'Checked'}
          </td>
          <td style="text-align: center;height: 50px; color: ${approval_status_data.value.senior_accountant == 0 ? 'red' : 'green'};">
            ${approval_status_data.value.senior_accountant == 0 ? 'Unchecked' : 'Checked'}
          </td>
          <td style="text-align: center;height: 50px; color: ${approval_status_data.value.managing_director == 0 ? 'red' : 'green'};">
            ${approval_status_data.value.managing_director == 0 ? 'Unapproved' : 'Approved'}
          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(printContent);
  iframeDoc.close();

  iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
};


</script>;

<style>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }

     .progress {
    position: relative;
    height: 4px;
    display: block;
    width: 100%;
    background-color: rgb(5, 197, 255);
    overflow: hidden
}
.progress .determinate {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #26a69a;
    -webkit-transition: width .3s linear;
    transition: width .3s linear
}
.progress .indeterminate {
    background-color: #e7eef1;
}
.progress .indeterminate:before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite
}
.progress .indeterminate:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s
}
@-webkit-keyframes indeterminate {
    0% {
        left: -35%;
        right: 100%
    }
    60% {
        left: 100%;
        right: -90%
    }
    100% {
        left: 100%;
        right: -90%
    }
}
@keyframes indeterminate {
    0% {
        left: -35%;
        right: 100%
    }
    60% {
        left: 100%;
        right: -90%
    }
    100% {
        left: 100%;
        right: -90%
    }
}
@-webkit-keyframes indeterminate-short {
    0% {
        left: -200%;
        right: 100%
    }
    60% {
        left: 107%;
        right: -8%
    }
    100% {
        left: 107%;
        right: -8%
    }
}
@keyframes indeterminate-short {
    0% {
        left: -200%;
        right: 100%
    }
    60% {
        left: 107%;
        right: -8%
    }
    100% {
        left: 107%;
        right: -8%
    }
}

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>