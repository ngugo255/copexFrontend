<template>
  <div class="layout-px-spacing mt-3">

      <div class="text-center"><h4>COPEX CONTRACTORS COMPANY LTD</h4></div>
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
                                       @click="openLpoModal(props.row)">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg>
                                   
  
   <!-- Speech Bubble -->
   
 
   <!-- Modal -->
   <teleport to="body">
    <transition name="fade-slide" mode="out-in">
        <div v-if="showlpoModal" class="modal fade show d-block mt-5" role="dialog" @click.self="closeLpoModal">
   <div class="modal-dialog modal-dialog modal-xl">
     <div v-if="is_lpo_modal" class="modal-content d-flex flex-column" style="block-size:auto;">
  
           <div class="modal-header">
         <h5 class="modal-title">Details for Local Purchase Order  </h5>
         <button type="button" class="btn-close" @click="closeLpoModal"></button>
           </div>  
           <div class="modal-body flex-grow-1" style="overflow-y: auto;">
           <div  v-if="!loading" class="d-flex justify-content-between align-items-center mb-3">
                           
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
           <div v-if="!loading" class="row layout-top-spacing">
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
                       <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template #actions="props">
                             

                       
                               <!-- <router-link :to="'/requisition-list/' + props.row.id" class="text-primary"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg> switchTab('item'); 
                               </router-link> -->
                               <a class="text-primary" @click="openItemDetail(props.row);"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                   </svg>
                               </a>

          
<!-- Backdrop -->
<transition name="fade-only">
  <div v-if="showitemDetail" class="modal-backdrop show"></div>
</transition>


                           </template>
                          
                       </v-client-table>
                   </div>
               </div>
           </div>
       </div> 
          <!-- approval officers starts -->

       
   
        <!-- approval officers ends -->
           </div>             
     </div>
     <div v-if="!is_lpo_modal" class="modal-content">
          <div class="modal-header"> 
            <h5 class="modal-title">Statement for Machine {{selecte_machine_name}}</h5>
            <button type="button" class="btn-close" @click="closeItemDetail"></button>
          </div>
          <div class="modal-body">
  <!-- Ratio Chart Section -->
  <!-- <div  class="mt-4">
    <h6 class="text-center">Ratio Trend Chart</h6>
    <canvas ref="chartRef" height="200"></canvas>
  </div> -->

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
      <div v-if="is_machine" class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">
            <v-client-table :data="fuelFromBulk" :columns="bulk_columns" :options="table_option">
              <template #actions="props">
                 Action buttons here 
               </template>
            </v-client-table>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-muted mt-2">
        <p class="text-dark fx-3">No Data Available</p>
      </div>
    </div> 

    <!-- Fuel From Direct -->
    <div class="col-md-12">
      <h4 class="text-center mb-2 text-primary"> Direct Fuel From LPO</h4>
      <div v-if="is_machine" class="layout-top-spacing">
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
      <div v-else class="text-center text-muted mt-2">
        <p class="text-dark fx-3">No Data Available</p>
      </div>
    </div>

  </div>
          </div>

     </div>


   </div>
 </div>
      </transition>
 </teleport>
 
   <!-- Modal Background Overlay -->
   <div v-if="showlpoModal" class="modal-backdrop fade show"></div>
                                                                                                            
                           </template>
                      </v-client-table>
                  </div>
              </div>
     <!-- LPO ends -->
      <!-- machines starts -->
      <div v-if="view_machines" class="panel p-0" >
                  <div class="custom-table table3">
                      <!-- <select class="mt-1 mx-2 form-control w-25" v-model="selected_project" @change="getPurchaseOrders">
                          <option value="">All Machines</option>
                          <option v-for="project in projects" :value="project">{{ project.short_name }}</option>
                      </select> -->
                     <!-- <div class="text-center mt-1"><h6>{{ selected_project && typeof selected_project === 'object' ? selected_project.project_name : '' }}</h6></div>
                    -->   
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
  <!-- Ratio Chart Section -->
  <!-- <div  class="mt-4">
    <h6 class="text-center">Ratio Trend Chart</h6>
    <canvas ref="chartRef" height="200"></canvas>
  </div> -->

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
  
<!-- notification circle starts -->
  <!-- <circle cx="19" cy="6" r="6" fill="red" stroke="white" stroke-width="1.5"/> -->
<!-- notification circle ends -->
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
            <button type="button" class="btn btn-secondary" @click="closeRemarkModal">Close</button>
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
  <div v-if="showRemarkModal" class="modal-backdrop fade show"></div>


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
  const onRowClick = (row) => {
      // alert("hello"+row);
      // router.push(`/order-items/${row.value.LPO_number}`);
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

// remarks codes starts
const name =  ref();
const isfetching = ref(false);   
const status = ref("unchecked"); // Default status
const usage = ref(); // Default usage ID
const newremark = ref();
const remarks = ref([]);
const showRemarkModal = ref(false);
const useId =  JSON.parse(localStorage.getItem("user")).id;
const isSending = ref(false);
   const openRemarkModal= (row) => {
    fetchRemarks(row.id);
    name.value= row.machine
    usage.value = row.id;     
        showRemarkModal.value = true;
    }
  const   closeRemarkModal = () => {
    showRemarkModal.value = false;
    newremark.value = ''; // Clear the remark input
    remarks.value = []; // Reset the remarks list
    name.value = ''; // Clear the machine name
    
    }
  const saveRemark = async () => {
        if (!newremark.value.trim()) {
            showError("Remark cannot be empty!");
            return;
        }
   isSending.value= true;
        try {
            const response = await  axiosInstance.post("/remark", {   
                created_at: new Date().toISOString(), 
                remarker_id: JSON.parse(localStorage.getItem("user")).id,
                description: newremark.value,
                status: status.value, // Default to unchecked
                usage_id:usage.value,  
            });
            remarks.value.push(response.data); // Add new remark to the list
            newremark.value = ""; // Clear input field
            showMessage("Remark added:", "success");
        } catch (error) {
            showerror("Error adding remark:", error);
        }
        isSending.value= false;
    };

  const fetchRemarks = async (id) => {
    isfetching.value = true;
    try {
        const response = await axiosInstance.get(`/usage-remark/${id}`);
        remarks.value = response.data; // Store response data
       
    } catch (error) {
       showError(error.message);
        console.error("Error fetching remarks:", error);
    }
    isfetching.value = false;
  };


import { inject } from 'vue';
const showMessage = inject('showMessage');
const showError = inject('showError');   



// remarks codes ends
  onMounted(() => {
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
   const item_columns = ref(['SNo', 'description', 'units', 'quantity', 'rate', 'amount','actions']);
   const showlpoModal = ref(false); 
   const loading=  ref(false);
   const lpo_number = ref('');
   const spinner= ref(false);
   const approval_status_data = ref({});
   const approval_status = ref(false);
   const openLpoModal= (row) => {
        lpo_number.value = row.id;
        project_name.value = row.project;     
        //lpo_number.value = row.LPO_number;
        //project_name.value = row.project;
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
const openItemDetail = (row) => {   // Close previous modal
  //  row.description.split("(")[1].split(")")[0];
  
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
const direct_columns = ref(['SNo', 'date_issued','project', 'fuel' ,'task',]);
const bulk_columns = ref(['SNo', 'date_issued','project', 'fuel','task',]);
const fuelFromBulk= ref([]);
const fuelFromDirect= ref([]);
const loading_machine = ref(false);

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
        })
        .catch((error) => {
            console.error("Error fetching machine data:", error);
        })
        .finally(() => {
            loading_machine.value = false;
        });
};

const fetchDirectFuelDistibution = async () => {
        try {
            const response = await axiosInstance.get("/items");
            if (response.status !== 200) {
                return console.error("Error fetching items:", response.statusText);
               }
            const filteredResponse = response.data.filter(item =>  item.description !== "Diesel" && item.description !== "Petrol" && item.machine_id === selectedMachine.value);
            fuelFromDirect.value = filteredResponse.map((item, index) => ({
              'SNo': item.machine_id,
              'project': item.project?.short_name || 'N/A',
              'LPO_Number': item.id,
              'fuel': item.quantity,
           //   'task': item.description,
              'task': item.description.includes("(") && item.description.includes(")")
                ? item.description.split("(")[1].split(")")[0]
                : item.description || 'N/A',
              'rate': Number(item.rate).toLocaleString('en-US', { style: 'currency', currency: 'Tsh' }),
              'total_Amount': (item.rate * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'Tsh' }),
              'date_issued': new Date(item.created_at).toLocaleDateString('en-US'),
            }));          
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false; // Set loading to false after data is loaded
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