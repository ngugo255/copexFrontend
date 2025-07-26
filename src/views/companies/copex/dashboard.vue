<template>
  <div class="layout-px-spacing mt-3">

      <div class="text-center"><h4 @click="openModal('statement')">COPEX CONTRACTORS COMPANY LTD</h4></div>
                  <!-- remark starts -->
                   <div class="d-flex">
 <div class="ms-auto form-group col-md-2 mt-4">
                             <button 
            class="btn btn-info  mx-2" 
            @click="openModal('remark');fetchRemarks()"
            title="Print Report">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
            &nbsp;Remark
            </button>
            </div>  
                   </div>
                
             <!-- remark ends -->

  <!-- tab starts -->
  <ul class="nav nav-tabs">
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: activeTab === 'lpo' }"
      @click="viewLpo"
    >
      LPO's
    </button>
  </li>
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: activeTab === 'distribution' }"
      @click="viewDistribution"
    >
      Bulk Statement
    </button>
  </li>
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: activeTab === 'machines' }"
      @click="viewMachines"
    >
      Machines
    </button>
  </li>
</ul>
   <!-- tab ends -->
    <!-- LPO starts -->
              <div v-if="view_lpo" class="panel p-0" >
                  <div class="custom-table table3  text-no-wrap">
                      <select class="mt-1 mx-2 form-control w-25" v-model="selected_project" @change="getPurchaseOrders">
                          <option value="">All LPO's</option>
                          <option v-for="project in projects" :value="project">{{ project.short_name }}</option>
                      </select>
                      <div class="text-center mt-1"><h6>{{ selected_project && typeof selected_project === 'object' ? selected_project.project_name : '' }}</h6></div>
                      
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
                      <v-client-table 
                          :data="items" 
                          :columns="columns" 
                          :options="table_option" 
                          @row-click=""                         
                      >
                          <template #status="props">
                              <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                          </template>
                        
  <template #actions="props">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                       width="28" height="28"
                                        fill="currentColor"
                                       
                                         class="text-primary bi bi-eye" 
                                           style="cursor: pointer;"
                                         viewBox="0 0 16 16"
                                       @click="openModal('lpo',props.row)">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg>
                                   
  
   <!-- Speech Bubble -->
   
              </template>
                      </v-client-table>
                  </div>
              </div>
     <!-- LPO ends -->
      <!-- lpo/remark/statement modal starts -->
  <div v-if="showModal" class="modal fade show d-block mt-5" role="dialog"  @click="closeModal()" >
   <div class="modal-dialog modal-dialog modal-xl"  @click.stop>
     <div class="modal-content d-flex flex-column" style="block-size:auto;">
  
        <div class="modal-header">
          <h5 v-if="lpo_modal" class="modal-title">Details for Local Purchase Order </h5>
          <h5 v-if="remark_modal" class="modal-title">Remarks for Local Purchase Order </h5>
          <h5 v-if="statement_modal" class="modal-title">Statements for Local Purchase Order </h5>
          <button type="button" class="btn-close" @click="closeModal()"></button>
        </div>  

                 <div class="modal-body flex-grow-1" style="overflow-y: auto;">
             <!-- remark form starts -->
                <div class="d-flex" v-if="!remark_modal">
                          <div class="form-group col-md-2 mt-4 ms-auto">
                             <button 
            class="btn btn-info  mx-2" 
            @click="showLpoRemark =! showLpoRemark" 
            title="Print Report">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
            &nbsp;Remark
            </button>
            </div>  
                </div>
                <div v-if="showLpoRemark && !remark_modal">
        <form class="row mx-4" @submit.prevent="saveRemark()">
  <div class="col-md-10">
    <input type="text"    v-model="newremark"  class="form-control"  placeholder="Enter Remark">
  </div>
  <div class="col-md-1">
    <button type="submit" class="btn btn-primary mb-3">Send</button>
  </div>
</form>
                </div>  
             <!-- remark form ends -->
              
              <!-- remarks details starts-->
             <!-- REMARK MODAL CONTENT ONLY UPDATED PART -->
<div v-if="remark_modal" class="d-flex flex-column flex-grow-1">
  <!-- Scrollable remarks area -->
     <!-- Loading Spinner -->
  <div v-if="loading_spinner" class="mt-3 mx-2">
    <div  class="text-center text-primary mt-2 mb-2">
      <span class="text-sm">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      
      </span>
    </div>
  </div>
  <div v-else class="flex-grow-1 overflow-auto px-3" style="max-height: 400px;">
    <div v-if="remarks.length === 0" class="text-center py-5 text-muted">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <p>No remarks yet. Be the first to add one!</p>
    </div>

    <div v-else class="chat-messages">
      <div v-for="(remark, index) in remarks" :key="index" class="mb-3">
        <div v-if="remark.remarker_id == user_id" class="d-flex justify-content-end">
          <div class="chat-message-outgoing shadow text-dark bg-light rounded p-3" style="max-width: 550px;">
            <div class="small d-flex justify-content-between mb-1">
              <span class="fw-bold mx-2">You</span>
              <span>{{ new Date(remark.created_at).toLocaleString() }}</span>
            </div>
            {{ remark.description }}
          </div>
        </div>
        <div v-else class="d-flex justify-content-start text-dark">
          <div class="chat-message-incoming shadow bg-light rounded p-3 me-2" style="max-width: 550px;">
            <div class="small d-flex justify-content-between mb-1">
              <span class="fw-bold">{{ remark.remarker || remark.sender_name }}</span>
              <span class="text-muted">{{ new Date(remark.created_at).toLocaleString() }}</span>
            </div>
            {{ remark.description }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fixed input form -->
  <div class="p-3 border-top bg-white">
    <form @submit.prevent="saveRemark">
      <div class="mb-1">
        <textarea 
          v-model="newremark" 
          class="form-control" 
          rows="2" 
          placeholder="Type your remark here..."
        ></textarea>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="submit" class="btn btn-primary">
          <span v-if="isSending" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Save
        </button>
      </div>
    </form>
  </div>
</div>

               <!-- adding new remark ends -->
              <!-- remarks details ends -->

              <!-- lpo details starts -->

                      <div v-if="lpo_modal" class="modal-body flex-grow-1" style="overflow-y: auto;">
           <div  v-if="!loading " class="d-flex justify-content-between align-items-center mb-3">
                           
                           <h5 class="text-dark"><span style="font-weight: bolder;">Project : {{project_name}}</span></h5>
                           <button v-if="approval_status_data.managing_director === 0 && approval_status_data.senior_accountant === 1 && is_md" @click="approveCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Approve</div>
                                   </button>
                                   <button v-if="approval_status_data.managing_director === 1 && is_md" @click="approveUnCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Unapprove</div>
                                   </button>
                           <h5 class="text-dark">Tsh {{ Number(total_amount).toLocaleString() }} </h5>
                       </div>
                    <div class="d-flex">
                      <div class="ms-auto">
                    <button @click="show_status =! show_status" class="btn btn-white">
                      <svg v-if="!show_status" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>
                    </button>
                      </div>
                    </div>
           <div v-if="!loading && show_status" class="row layout-top-spacing">
       <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
           <div class="panel p-0">
               <!-- close button starts -->
                <div class="d-flex">
                   <h6 class="text-center mt-2 mx-2">Approval Status</h6>
                 </div>  
                <!-- close button ends -->
                 
               <div class="custom-table table3  table-responsive">
                   <table class="table">
                       <thead>
                           <tr>
                               <th>Operation's Dept</th>
                               <th>Engineer </th>                                
                               <th>Sr.Accountant</th>
                               <th>MD</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td :class="approval_status_data.operation_department === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.operation_department === 0 ? 'unchecked' : 'checked' }}
                                   <button v-if="approval_status_data.operation_department === 0 && is_operator" @click="approveCheck(approval_status_data.id, 'operation_department'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Check</div>
                                   </button>
                                   <button v-if="approval_status_data.operation_department === 1 && is_operator" @click="approveUnCheck(approval_status_data.id, 'operation_department'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-danger p-1 btn-sm me-2">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>
                               </td>
                               <td :class="approval_status_data.engineer === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.engineer === 0 ? 'unchecked' : 'checked' }}
                                    <button v-if="approval_status_data.engineer === 0 && is_engineer" @click="approveCheck(approval_status_data.id, 'engineer'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                    <button v-if="approval_status_data.engineer === 1 && is_engineer" @click="approveUnCheck(approval_status_data.id, 'engineer'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-danger p-1 btn-sm me-2">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Uncheck</div>
                                    </button>
                                </td>
                 
                               <td :class="approval_status_data.senior_accountant === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.senior_accountant === 0 ? 'unchecked' : 'checked' }}
                                   <button v-if="approval_status_data.senior_accountant === 0 && is_sa" @click="approveCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary p-1 btn-sm me-2">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Check</div>
                                   </button>
                                   <button v-if="approval_status_data.senior_accountant === 1 && is_sa" @click="approveUnCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-danger p-1 btn-sm me-2">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>
                               </td>
                 
                               <td :class="approval_status_data.managing_director === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.managing_director === 0 ? 'Unapproved' : 'Approved' }}
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
          </div>
          
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
               Loading...
           </span>
       </div>
                      

                    


                   <div v-else class="custom-table table3">
           
                    <div v-if="show_status">
                                             <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template #actions="props">
                             
                               <a class="text-primary"  @click="openModal('statement',props.row);show_usage=true"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg>
                               </a>

          
<!-- Backdrop -->


                           </template>
                          
                       </v-client-table>
                    </div>
                   </div>
               </div>
           </div>
       </div> 
                      </div>    
               <!-- lpo detials ends -->
  
                  <div v-if="statement_modal" class="row d-flex flex-column justify-content-between mt-3">
                  <div class="d-flex">
                      <div class="ms-auto">
                    <button @click="show_statement =! show_statement" class="btn btn-white">
                      <svg v-if="!show_statement" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>
                    </button>
                      </div>
                    </div>


 <div v-if="show_statement">
  <!-- total fuel display starts -->
<div class="container py-4">
  <div class="row text-center text-dark">
    <div v-if="total_bulk_fuel != 0" class="col-md-4 mb-3">
      <div class="p-3 bg-light rounded shadow">
        <h5 class="mb-1">Bulk Fuel</h5>
        <p class="mb-0">{{ total_bulk_fuel }} Litres</p>
      </div>
    </div>
    <div v-if="total_direct_fuel != 0" class="col-md-4 mb-3">
      <div class="p-3 bg-light rounded shadow">
        <h5 class="mb-1">Direct Fuel</h5>
        <p class="mb-0">{{ total_direct_fuel }} Litres</p>
      </div>
    </div>
    <div v-if="total_bulk_fuel != 0" class="col-md-4 mb-3">
      <div class="p-3 bg-light rounded shadow">
        <h5 class="mb-1">Total Used</h5>
        <p class="mb-0">{{ total_bulk_fuel + total_direct_fuel }} Litres</p>
      </div>
    </div>
  </div>
</div>

    <!-- total fuel display ends -->
    <!-- Fuel From Direct -->
    <div v-if="total_direct_fuel != 0" class="col-md-12">
      <h4 class="text-center mb-2 text-primary"> Direct Fuel Filling</h4>
      <div class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">
            <v-client-table :data="fuelFromDirect" :columns="direct_columns" :options="table_option">
              <template #actions="props">
                <!-- Action buttons here -->
              </template>
            </v-client-table>
          </div>
        </div>
      </div>     
    </div>
    <!-- direct fuel filling ends -->
    <!-- Fuel From Bulk -->
    <div  v-if="total_bulk_fuel != 0" class="col-md-12" >
      <h4 class="text-center text-warning mb-2">Fuel from Bulk</h4>
      <div class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">
            <v-client-table :data="fuelFromBulk" :columns="bulk_columns" :options="table_option">
              <template #actions="props">
                
               </template>
            </v-client-table>
          </div>
        </div>
      </div>
     
    </div>
    <!--Bulk fuel ends  -->
 </div>                   

  </div>
         </div> 
     </div>
   </div>
  </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
 <!-- lpo/remark/statement modal ends -->

     
      <!-- machines starts -->
      <div v-if="view_machines" class="panel p-0" >
                  <div class="custom-table table3">
     
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
      <v-client-table :data="Machines" :columns="machineColumns" :options="table_option" >
                          <template #actions="props">
                              <div class="actions text-center">             
                                      <!-- <router-link :to="`/report/machine-usage/${props.row.id}`" class="btn btn-primary btn-sm">View</router-link>                         -->
                                      <a class="text-primary" @click="openMachineDetail(props.row);"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg>
                               </a>   
                                  
                              </div>

<!-- //modal for Machine details starts -->
<teleport to="body">
  <transition name="fade-zoom">
    <div
      v-if="machineDetails"
      class="modal d-block"
      role="dialog"
      @click.self="closeMachineDetail"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header"> 
            <h5 class="modal-title">Statement for Machine {{selecte_machine_name}}</h5>
            <button type="button" class="btn-close" @click="closeMachineDetail"></button>
          </div>
          <div class="modal-body">

  <!-- Loading Spinner -->
  <div v-if="loading_machine" class="mt-3 mx-2">
    <div  class="text-center text-primary mt-2 mb-2">
      <span class="text-sm">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      
      </span>
    </div>
  </div>

  <!-- Fuel Distribution Tables -->
  <div v-else class="row d-flex flex-column justify-content-between mt-3">

    <!-- Fuel From Bulk -->
    <div class="col-md-12">
      <h4 class="text-center text-warning mb-2">Fuel from Bulk</h4>
      <div class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">
            <v-client-table :data="fuelFromBulk" :columns="bulk_columns" :options="table_option">
              <template #actions="props">
                
               </template>
            </v-client-table>
          </div>
        </div>
      </div>
     
    </div>
      <!--Bulk fuel ends  -->

    <!-- Fuel From Direct -->
    <div class="col-md-12">
      <h4 class="text-center mb-2 text-primary"> Direct Fuel From LPO</h4>
     
      <div class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">
            <v-client-table :data="fuelFromDirect" :columns="direct_columns" :options="table_option">
              <template #actions="props">
                <!-- Action buttons here -->
              </template>
            </v-client-table>
          </div>
        </div>
      </div>     
    </div>
    <!-- direct fuel filling ends -->

  </div>
          </div>

     </div>
      </div>
    </div>
  </transition>
</teleport>

<div v-if="machineDetails" class="modal-backdrop fade show"></div>                        

<!-- modal for Machine details ends  -->
                         
                          </template>
                      </v-client-table>
                  </div>
              </div>
    
       <!-- machines ends -->
           <!-- distribution starts -->
      <div v-if="view_distribution" class="panel p-0" >
                  <div class="custom-table table3 ">
                         <div class=" col-12 d-flex align-items-center justify-content-between">
                          <select class="mt-1 mx-2 form-control w-25" v-model="selected_project" @change="getBulkDistribution">
                          <option value="">All DISTRIBUTIONS</option>
                          <option v-for="project in projects" :value="project">{{ project.short_name }}</option>
                      </select>
                      <div v-if="!(selected_project ==! 'Undefined')" class="  d-flex flex-column align-items-start p-1 ">                            
                        <table class="table">
  <thead>
    <tr>
      <th></th>
      <th class="text-primary">Diesel</th>
      <th class="text-success">Petrol</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="fw-bold">Used</td>
      <td>{{ total_diesel_used.toLocaleString() }} L</td>
      <td>{{ total_petrol_used.toLocaleString() }} L</td>
    </tr>
    <tr>
      <td class="fw-bold">Balance</td>
      <td>{{ (totalDiesel - total_diesel_used).toLocaleString() }} L</td>
      <td>{{ (totalPetrol - total_petrol_used).toLocaleString() }} L</td>
    </tr>
     </tbody>
</table>


                      </div>

                         </div>
                      
                      
                      <div class="text-center mt-1"><h6>{{ selected_project && typeof selected_project === 'object' ? selected_project.project_name : '' }}</h6></div>
                      <div class="d-flex">
                         
                  </div>
                      
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

      <v-client-table :data="bulkDistribution" :columns="distributionColumn" :options="table_option" >
                          <template #actions="props">

                              <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  fill="currentColor" 
  viewBox="0 0 24 24"
  style="cursor: pointer;"
  title="Add Remark"
  @click="openRemarkModal(props.row)"
>
  <!-- Speech Bubble -->
  <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 4v-16a2 2 0 0 1 2-2z" 
        stroke="currentColor" 
        stroke-width="2" 
        fill="none" 
        stroke-linejoin="round"/>
  
  <!-- Horizontal Remark Lines -->
  <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="7" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>

</svg>

  <!-- Modal -->
  <teleport to="body">
<div v-if="showRemarkModal" class="modal fade show d-block" role="dialog" @click.self="closeRemarkModal">
  <div class="modal-dialog modal-dialog modal-lg">
    <div class="modal-content d-flex flex-column" style="block-size: 90vh;">
      <div class="modal-header">
        <h5 class="modal-title">Remark(s) On Machine <span style="color:blue;">{{ name }}</span></h5>
        <button type="button" class="btn-close" @click="closeRemarkModal"></button>
      </div>

      <div class="modal-body flex-grow-1" style="overflow-y: auto;">
        <div v-if="isfetching" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
          <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>
        <div v-else>
          <div v-for="remark in remarks" :key="remark.id">
            <div v-if="remarks.length === 0" class="text-center">
              <p>No remarks found</p>
            </div>
            <!-- Current user's remark -->
            <div v-else>
              <div v-if="remark.remarker_id == useId" class="d-flex justify-content-end mb-2">
                <div class="chat-bubble p-3 shadow-sm" style="background-color: rgb(221 226 226); max-inline-size: 80%; font-size: 0.5rem;">
                  <p class="mb-0 fw-bold text-dark fs-5">You</p> 
                  <hr class="mt-0" style="border: 1px solid #ccc;" />
                  <p class="mb-0 text-dark fs-4">{{ remark.description }}</p>
                </div>
              </div>

              <!-- Other users' remarks -->
              <div v-if="remark.remarker_id !== useId" class="d-flex justify-content-start mb-2">
                <div class="chat-bubble p-3 shadow-sm" style="background-color: rgb(241 226 226); max-inline-size: 80%; font-size: 0.5rem;">
                  <p class="mb-0 fw-bold text-dark fs-5">{{ remark.sender_name}}</p>
                  <hr class="mt-0" style="border: 1px solid #ccc;" />
                  <p class="mb-0 text-dark fs-4">{{ remark.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Form for adding a new remark - fixed at bottom -->
      <div class="p-3 border-top" style="background-color: #f8f9fa;">
        <form @submit.prevent="saveRemark">
          <textarea v-model="newremark" class="form-control mb-2" rows="3" placeholder="Enter your remark"></textarea>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="submit" class="btn btn-primary" :disabled="isSending"> 
              <span v-if="isSending">
                <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
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



                          </template>
                      </v-client-table>
      
                  </div>
              </div>
    
<!-- distribution ends -->
  </div>
</template>

<style>
  .table3 .actions svg {
      padding: 2px;

  }

  @media (max-inline-size: 768px) {
  .chart-wrapper {
    block-size: 250px;
  }

  canvas {
    inline-size: 100% !important;
    block-size: auto !important;
  }
}
</style>
<style scoped>



</style>

<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
   import '@/assets/sass/elements/tooltip.scss';
  import { useMeta } from '@/composables/use-meta';
  useMeta({ title: 'Purchase Order' });
  
  const showModal = ref(false);
  const activeTab = ref("lpo");
  const Machines = ref([]);
  const bulkDistribution = ref([]);
  const company = ref(6);
  const distributionColumn = ref(['SNo','date_issued', 'driver','machine','type', 'consuption_type','supervisor','task','fuel','initial_reading','final_reading','ratio','actions']);
  const machineColumns = ref(['SNo', 'name', 'type', 'category', 'capacity', 'reserve_litre', 'actions']);
  const columns = ref(['SNo','LPO_number','project','requested_by', 'supplier','date','payment_terms', 'status','await_for','actions']);
  const items = ref([]);
  const table_option = ref({
      perPage: 10,
      perPageValues: [10, 20, 50],
      skin: 'table table-hover table-striped',
      columnsClasses: { actions: 'actions text-center' },
      sortable: ['SNo', 'LPO_number', 'date', 'phone'],
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
  const view_lpo = ref(true);
  const view_machines = ref(false);
  const view_distribution = ref(false);
  const loading_spinner = ref(false);
  const total_diesel_used = ref(0);
  const total_petrol_used = ref(0);
  const selected_project = ref('');
  const user_role = JSON.parse(localStorage.getItem("user")).role;
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const print_url = ref(process.env.VUE_APP_API_BASE_URL);
  const axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL
  });

  

  const viewLpo = ()=>{
      activeTab.value = "lpo";
      getPurchaseOrders();
    view_machines.value = false;  
    view_distribution.value=false;
    view_lpo.value=true;
  }
   
  const viewDistribution = ()=>{
      activeTab.value = "distribution";
    getBulkDistribution();  
    view_lpo.value = false;
    view_machines.value=false;
    view_distribution.value=true;
  }

  const viewMachines = ()=>{
      activeTab.value = "machines";
  fetchMachines();
  view_lpo.value=false; 
    view_distribution.value=false;
    view_machines.value=true; 
  }

  const getPurchaseOrders = async () => {
             loading_spinner.value = true;
      try {
            const response = await Promise.race([
              axiosInstance.get(`/purchase-order`),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Network Error")), 6000))
            ]);
          if (response.data && Array.isArray(response.data)) {
           if(response.status == 200){
              items.value = response.data
                    .filter(order => 
                      (selected_project.value.id ? order.project_id === selected_project.value.id : order.company_id === company.value) &&
                      order.user_id !== 20 && order.status_name !== "Inactive"
                    )
                  .map((order, index) => ({
                      SNo: index + 1,
                      id:order.id,
                      LPO_number:`${String(order.id).padStart(4, '0')}/${
                  order.date_created.slice(5, 7)  
                  }/${
                order.date_created.slice(2, 4)  
                 }`,
                      supplier: order.supplier,
                      address: order.address,
                      requested_by:order.requested_by,
                      date: order.date_created,
                      await_for: order.awaits,
                      project: order.project_aka,
                      payment_terms: order.payment_terms,
                      location: order.location,
                      status: {
                          key: order.status_name,
                          class: order.status_color
                      },
                  }));
                }
                else{
                  showError(error);
                }
                  
          } else {
            showError(error.message);
              console.error("Invalid response format");
          }
      } catch (error) {
        showError(error.message);
          console.error("Error fetching purchase order: ", error);
      } finally {
          loading_spinner.value = false;
      }
  };
  
  const projects = ref([]);
  const getProjects = async () => {
      loading_spinner.value = true;

     
      try {
          const response = await Promise.race([
              axiosInstance.get(`/projects`),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Network Error")), 6000))
            ]);           
          if (response.data && Array.isArray(response.data)) {
            if (response.status !==200) {
              loading_spinner.value= false;
              showError(error);
              return;
            }
              projects.value = response.data.filter(project => project.company_id === company.value);
              loading_spinner.value = false;
          } else {
            showError(error.message);
              console.error("Invalid response format");
          }
      } catch (error) {
         showError(error.message);
          console.error("Error fetching projects: ", error);
      }
      finally{
        loading_spinner.value= false;
      }
  };
  const getBulkDistribution = async () => {
    getTotalFuel();
  loading_spinner.value = true;
  try {
    const response = await axiosInstance.get(`/fuel-usage`);
    if (Array.isArray(response.data)) {      
      const filteredData = response.data.filter(distribution => 
          !selected_project.value && distribution.company_id === company.value || distribution.project_id === selected_project.value.id
        );
      
      // Calculate the sum of all fuel_quantity (ensure numeric conversion)
      total_diesel_used.value = filteredData.filter((fuel)=>fuel.item_id== 2).reduce((sum, statement) => {
        return sum + Number(statement.fuel_quantity);
      }, 0);
      total_petrol_used.value = filteredData.filter((fuel)=>fuel.item_id== 4).reduce((sum, statement) => {
        return sum + Number(statement.fuel_quantity);
      }, 0);
      
        
      bulkDistribution.value = filteredData.map((statement, index) => {
        let ratio;
        if (statement.ratio_factor === "Litre/hr") {
          ratio = statement.fuel_quantity / (statement.final_reading - statement.initial_reading);
        } else {
          ratio = (statement.final_reading - statement.initial_reading) / statement.fuel_quantity;
        }
        ratio = ratio > 50 ? "---" : ratio.toFixed(2);

        return {
          SNo: index + 1,
          id:statement.id,
          fuel: statement.fuel_quantity,
          consuption_type: statement.ratio_factor,
          date_issued: statement.usage_date,
          task: statement.task,
          driver: statement.driver_name,
          supervisor: statement.supervisor_name,
          initial_reading: statement.initial_reading,
          final_reading: statement.final_reading,
          machine: statement.machine,
          type: statement.type,
          ratio: ratio,
          project_id: statement.project_id,
        };
      });
      loading_spinner.value = false;
    } else {
      console.error("Invalid response format");
    }
  } catch (error) {
    showError(error.message);
    console.error("Error fetching Bulk Distribution: ", error);
  }
  };

  const fetchMachines = async () => {
      loading_spinner.value=true;
  axiosInstance
    .get(`/machines`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        Machines.value = response.data.map((machine, index) => ({
          SNo: index + 1,
          id: machine.id,
          name: machine.name,
          type: machine.type_name,
          ratio: machine.ratio,
          category: machine.category_id === 1 ? 'machine' : 
                   machine.category_id === 2 ? 'vehicle' : 
                   machine.category_id === 3 ? 'supervision' : 'no category',
          capacity: machine.capacity,
          category_id:machine.category_id,
          reserve_litre: machine.reserve_litre
        }));
      } else {
        console.error("Invalid response format");
      }
    })
    .catch((error) => {
      showError(error.message);
      console.error("Error fetching machine data:", error.message);
    })
    .finally(() => {
     loading_spinner.value = false;
    });
}

const totalDiesel = ref(0);
const totalPetrol = ref(0);
const getTotalFuel = async () => {
  loading_spinner.value = true;
  
  try {
      const response = await axiosInstance.get(`/fuel-sum/${selected_project.value.id}`);
      if (response.data) {
          totalDiesel.value = parseFloat(response.data.diesel_sum) 
          totalPetrol.value = parseFloat(response.data.petrol_sum) 
      } 
      else {
          console.error("Invalid response format");
      }
  } catch (error) {
      console.error("Error fetching total fuels: ", error);
  } finally {
      loading_spinner.value = false;
  }
};

// modals constants starts
const remark_modal = ref(false);
const lpo_modal = ref(false);
const statement_modal= ref(false);

const openModal = (modal_type,row) => {
  showModal.value = true;
  const modalVar =  modal_type + '_modal';
  if (typeof eval(modalVar) !== 'undefined') {
    eval(modalVar).value = true;
  }

  if ( modal_type === 'lpo'){
        lpo_number.value = row.id;
        project_name.value = row.project;     
        lpo_id.value = row.LPO_number;
        getItems();
        getApprovalStatus();
  }

  if ( modal_type === 'statement'){
     selectedMachine.value = row.machine_id;
  if (selectedMachine.value!==0) {
    selecte_machine_name.value = row.description.split("(")[0];
    is_machine.value = true; 
      fetchFuelDistribution();
      fetchDirectFuelDistibution();
  }
  }
};

const show_statement = ref(true);
const closeModal = (modalName = null) => {
  show_status.value=true;
  show_statement.value=true;
  showModal.value=false;
  lpo_modal.value = modalName === 'lpo';
  remark_modal.value = modalName === 'remark';
  statement_modal.value = modalName === 'statement';
};

const show_status = ref(true);
// modals constants ends

// remarks codes starts
const showLpoRemark = ref(false);
const name =  ref();
const isfetching = ref(false);   
const status = ref("unchecked"); // Default status
const usage = ref(); // Default usage ID
const newremark = ref();
const remarks = ref([]);
const is_remarks_modal = ref(false);
const showRemarkModal = ref(false);
const useId =  JSON.parse(localStorage.getItem("user")).id;
const isSending = ref(false);
   const openRemarkModal= () => {
       is_lpo_modal.value = false;
       showlpoModal.value = true;
       is_remarks_modal.value=true;
    }
  const   closeRemarkModal = () => {
    }
  const saveRemark = async () => {
    showLpoRemark.value=false;
    if (newremark.value === '') {
        showError("Remark cannot be empty!");
        return;
    }else if (remark_modal.value == false){
            newremark.value = "For lpo " + lpo_id.value +" "+ newremark.value ;
        }else{
            lpo_number.value = 0;
        }
    
    isSending.value = true;
    
    try {
        const remarkData = {
            remarker_id: user_id,
            description : newremark.value,
            status: status.value, // Default to unchecked
            type_id: lpo_number.value ,
            remark_type: "LPO",
            remarker: JSON.parse(localStorage.getItem("user")).name
        };
        
         const response = await axiosInstance.post('remark', remarkData);
        
        if (response.status === 201 || response.status === 200) {
            // Add the new remark to the list
            if (response.data) {
                remarks.value.push(response.data);
            } else {
                // If the API doesn't return the created remark, add our local version
                remarks.value.push(remarkData);
            }
            
            // Clear the input field
            newremark.value = '';
            showMessage("Remark added successfully");
            fetchNotifications();
        }
    } catch (error) {
        console.log(error);
        showError(error.message);
    } finally {
        isSending.value = false;
    }
};

const notifications = ref([]);
const notification_count = ref(0);
 const fetchNotifications = async () => {
    try {
        const response = await axiosInstance.get(`remark?remark_type=LPO`);
        notifications.value = response.data.data.filter(item => item.status === "unchecked");
        notification_count.value = response.data.unchecked_count ;
    } catch (error) {
        console.error('Error fetching amendment request:', error);
        showError("Failed to load amendment request " + (error.response?.data?.message || error.message));
    } finally {
        isfetching.value = false;
    }
}

const fetchRemarks = async () => {
  loading_spinner.value=true;
    try {
        const response = await axiosInstance.get(`remark?remark_type=LPO`);
        if (Array.isArray(response.data)) {
            remarks.value = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
            remarks.value = response.data.data;
        } else {
            remarks.value = [];
        }
    } catch (error) {
        console.error("Error fetching remarks:", error);
        showError("Failed to load remarks");
    } finally {
    }
    loading_spinner.value=false;
};


import { inject } from 'vue';
const showMessage = inject('showMessage');
const showError = inject('showError');   



// remarks codes ends
  onMounted(() => {
     fetchNotifications();
     getPurchaseOrders();
     getProjects();  
   

    
    const storedUser = localStorage.getItem("user");
    const user=ref(null);
    if (storedUser) {
       user.value = JSON.parse(storedUser);
       
       if(user.value.role == 2){
         is_md.value=true;
       }
       if(user.value.role == 3){
         is_fc.value=true;
       }
       if(user.value.role == 4){
        is_sa.value=true;
       }
       if(user.value.role == 5){
        is_qs.value=true;
       }
       if(user.value.role == 10){
        is_project_manager.value=true;
       }
       if(user.value.role == 7){
        is_operator.value=true;
       }
       if(user.value.role == 8){
         is_dataentry.value=true;
       }  
       if(user.value.role == 6){
         is_engineer.value=true;
       } 
 } 

  });
  

// code for lpo modal 
const is_engineer= ref(false);
  const project_name = ref('');
  const is_operator = ref(false);
  const is_project_manager = ref(false);
  const is_md= ref(false);
  const is_sa= ref(false);
  const total_amount = ref(0);
   const lpo_items = ref([]);
   const item_columns = ref(['SNo', 'description','type', 'units', 'quantity', 'rate', 'amount','actions']);
   const showlpoModal = ref(false); 
   const loading=  ref(false);
   const lpo_number = ref('');
   const spinner= ref(false);
   const approval_status_data = ref({});
   const approval_status = ref(false);

   const lpo_id = ref(''); 
   const openLpoModal= (row) => {
        lpo_number.value = row.id;
        project_name.value = row.project;     
        lpo_id.value = row.LPO_number;
        getItems();
        getApprovalStatus();
        approval_status.value = true;
        showlpoModal.value = true;
        }

  const closeLpoModal = () => {
      getPurchaseOrders();
     
      // Clear the items list

      if (is_lpo_modal.value === false) {
        closeItemDetail();
        getItems();
        is_lpo_modal.value = true; // Reset the modal state
      } else {
        showlpoModal.value = false;
        lpo_number.value = "";
        project_name.value = ""; // Clear the project name
       lpo_items.value = [];
       total_amount.value = 0
      }
    
     
      }

      const getItems = async () => {
        loading.value = true;
        try {
            const response = await    
            axiosInstance.get(`/order-items/${lpo_number.value}`);
            if (response.data && Array.isArray(response.data)) {
                 total_amount.value = response.data.reduce((sum, order) => {
                        return sum + (order.quantity * order.rate);
                    }, 0);
                    
                    
                    lpo_items.value = response.data.map((order, index) => ({
                        SNo: index + 1,
                        category:order.category,
                        id: order.id,
                        machine_id: order.machine_id,
                        type:order.machine.type,
                        description: order.description,
                        units: order.unit_measure,
                        quantity: order.quantity.toLocaleString(),
                        rate: Number(order.rate).toLocaleString(),
                        amount: (order.quantity * order.rate).toLocaleString(undefined, { maximumFractionDigits: 3})
                    }));

                    loading.value = false;
                } else {
                    console.error("Invalid response format");
                }
        } catch (error) {
            console.error("Error fetching purchase order : ", error);
        }
    };

    
    const approveCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 1
            });
            getApprovalStatus();
        } catch (error) {
            console.error("Error approving check:", error.message);
        }
    };

    const approveUnCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 0
            });
            getApprovalStatus();
        } catch (error) {
            console.error("Error approving check:", error.message);
        }

        const response = await axiosInstance.put(`/purchase-order/${id}`, {
                status_name: "Unapproved",
                status_color:"secondary",
            });
    };
    

const getApprovalStatus = async () => {
    try {
        const response = await axiosInstance.get(`/approval-check-status/${lpo_number.value}`);
        if (response.data && typeof response.data === 'object') {
            approval_status_data.value = response.data;
            spinner.value=false;
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching approval status: ", error);
    }
};

// lpo modal ends




// Default active tab
const is_lpo_modal = ref(true);
const showitemDetail = ref(false);
const selectedMachine= ref('');
const is_machine = ref(true);
const selecte_machine_name = ref('');
const openItemDetail = (row) => {   
  selectedMachine.value = row.machine_id;
  if (selectedMachine.value!==0) {
    selecte_machine_name.value = row.description.split("(")[0];
    is_machine.value = true; // Set to true if machine_id is not 0
      fetchFuelDistribution();
      fetchDirectFuelDistibution();
  }
  is_lpo_modal.value = false;
  
};
const closeItemDetail = () => {
  selectedMachine.value = ''; // Clear selected machine
  is_lpo_modal.value = true;
  is_machine.value = false; // Reset machine flag
  selecte_machine_name.value = ''; // Clear selected machine name
  fuelFromDirect.value = [];
  fuelFromBulk.value = []; // Clear fuel data
};

const closeRemarkDetails = () => {
   showlpoModal.value = false;
};

const direct_columns = ref(['SNo', 'date_issued','project', 'fuel' ,'task',]);
const bulk_columns = ref(['SNo', 'date_issued','project', 'fuel','task',]);
const fuelFromBulk= ref([]);
const fuelFromDirect= ref([]);
const loading_machine = ref(false);


const show_usage = ref(false);
const total_bulk_fuel = ref(0);

const fetchFuelDistribution = async () => {
  
    loading_machine.value = true;
    axiosInstance
        .get(`/machine-fuel-usage/${selectedMachine.value}`)
        .then((response) => {
            if (Array.isArray(response.data)) {
             // Set machine name
                fuelFromBulk.value = response.data.filter((i)=>i.project!== null).map((distribution, index) => {
                    const difference = distribution.final_reading - distribution.initial_reading;
                    let ratio = distribution.ratio_factor === "Litre/hr" 
                        ? (distribution.fuel_quantity / difference) 
                        : (difference / distribution.fuel_quantity);
                    
                    ratio = ratio > 50 ? "---" : ratio.toFixed(2);
                    return {
                        SNo: index + 1,
                        id: distribution.id,
                        project:distribution.project?.short_name || 'N/A',
                        driver:distribution.driver,
                        task:distribution.task,
                        date_issued:distribution.usage_date,
                        fuel: distribution.fuel_quantity ,
                        ratio_factor: distribution.ratio_factor,
                        ratio
                    };
                });                             
            } else {
                console.error("Invalid response format");
            }
         total_bulk_fuel.value = fuelFromBulk.value.reduce((sum, distribution) => sum + Number(distribution.fuel), 0);

        })
        .catch((error) => {
          if(error.status == 404 ){
            total_bulk_fuel.value= 0;
          }else{
            console.error("Error fetching machine data:", error);
          }
        })
        .finally(() => {
            loading_machine.value = false;
        });
};


const total_direct_fuel = ref(0);

const fetchDirectFuelDistibution = async () => {
    try {
        const response = await axiosInstance.get("/items");
        if (response.status !== 200) {
            return console.error("Error fetching items:", response.statusText);
        }
        const filteredResponse = response.data.filter(item =>
            item.description !== "Diesel" &&
            item.description !== "Petrol" &&
            item.machine_id === selectedMachine.value
        );

        fuelFromDirect.value = filteredResponse.map((item, index) => ({
            'SNo': item.machine_id,
            'project': item.project?.short_name || 'N/A',
            'LPO_Number': item.id,
            'fuel': item.quantity,
            'task': item.description.includes("(") && item.description.includes(")")
                ? item.description.split("(")[1].split(")")[0]
                : item.description || 'N/A',
            'rate': Number(item.rate).toLocaleString('en-US', { style: 'currency', currency: 'Tsh' }),
            'total_Amount': (item.rate * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'Tsh' }),
            'date_issued': new Date(item.created_at).toLocaleDateString('en-US'),
        }));

        total_direct_fuel.value = filteredResponse.reduce((sum, item) => sum + Number(item.quantity), 0);
        
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

//code fro machinedetaisl
const machineDetails = ref(false);
const openMachineDetail = (row) => {
selectedMachine.value = row.id;
selecte_machine_name.value = row.name;
  fetchFuelDistribution();
  fetchDirectFuelDistibution();
  machineDetails.value = true; // Set to true if machine_id is not 0
};
const closeMachineDetail = () => {

selectedMachine.value = ''; // Clear selected machine
machineDetails.value = false;
selecte_machine_name.value = ''; // Clear selected machine name 

fuelFromBulk.value = []; // Clear fuel data
fuelFromDirect.value = []; // Clear fuel data
};



</script>