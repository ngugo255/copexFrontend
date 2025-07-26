<template>
    <div class="layout-px-spacing">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Purchase Order</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>

<!-- notification starts -->
<div v-if="notification_count > 0 " class="d-flex container position-relative">
  <div class="ms-auto">
    <span data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
      <a href="javascript:;" id="ddlnotify" class="btn dropdown-toggle nav-link position-relative p-0 shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-bell text-danger" style="transform:scale(2)">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ notification_count }}
        </span>
      </a>
    </span>

    <!-- Notifications panel -->
    <div style="position: absolute; top: 100%; right: 0; z-index: 1050;">
      <div class="collapse  shadow" id="collapseWidthExample" style="min-width: 300px;">
        <div class="text-start card card-body text-dark " v-for="notification in notifications" >
          From: {{ notification.sender_name }}<br>
          Message: {{ notification.description }}
          <div class="d-flex">
            <button class="btn btn-success p-1 btn-sm me-1 ms-auto" style="cursor:pointer" @click="readRemark(notification.id)">✔</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- notification ends -->


        <button v-if="is_admin" class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
        </button>
        <div class="d-flex mt-3 gap-3  justify-content-center align-items-center">
            <div class="form-group col-md-4">
            <label for="projectFilter" class="form-label">Filter by Project</label>
            <select id="projectFilter" class="form-select" v-model="selected_project" @change="getPurchaseOrders">
            <option value="">All Projects</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.short_name }}
            </option>
            </select>
            </div>
            <div class="form-group col-md-4">
            <label for="statusFilter" class="form-label">Filter by Status</label>
            <select id="statusFilter" class="form-select" v-model="selected_status" @change="getPurchaseOrders">
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
            <option value="Inactive">Inactive</option>
            </select>
            </div>  
            
            <!-- remark starts -->
                 <div class="form-group col-md-2 mt-4">
                             <button 
            class="btn btn-info  mx-2" 
            @click="openRemarkModal()" 
            title="Print Report">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
            &nbsp;Remark
            </button>
            </div>  
             <!-- remark ends -->
            
        </div>
        <div v-if="user_permissions.includes('can_create_lpo')" class="d-flex me-4">
            <div class="ms-auto">
                <button v-if="is_closed" class="btn btn-primary" @click="getVendors(); is_closed = false; ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
                <button  v-else class="btn btn-danger" @click="order_registration = false; is_closed = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>

                <button 
            class="btn btn-success  mx-2" 
            @click="printLpoReport(items, 'Local Purchase Order Report')" 
            title="Print Report">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
            </svg>
            &nbsp;Print
            </button>
            </div>
        </div>
        <form v-if="order_registration " class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="registerPurchaseOrder">
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
                 <!-- new vendor ends -->
                <div class="col-md-3">
                    <label class="form-label">Select Project Name</label>
                    <multiselect 
                    v-model="project_name"
                    track-by="id"
                    :options= "projects"
                    label = "short_name"
                    placeholder="Select Project"
                    :required = "true"
                    :searchable = "true"        
                    multple="false"
                    ></multiselect>
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
                 <div v-if="(user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo'))"  class="col-md-3">
                    <label class="form-label">Select Company</label>                    
                    <multiselect
                    v-model="selected_company_id"
                    :options="[
                        { id: 5, name: 'BUSHMAN' },
                        { id: 6, name: 'COPEX' }
                    ]"
                    track-by="id"
                    label="name"
                    :multiple="false"
                    :searchable="true"
                    required 
                    :placeholder="'Select Company'"
                    ></multiselect>
                </div>
           
            </div>
         
         

            <div class="text-center gap-2 justify-content-end">
                <button v-if="add_vendor" type="button" class="btn btn-dark me-3" @click="add_vendor=false">Back</button>
                <button type="button" class="btn btn-danger me-3" @click="order_registration = false;add_vendor=false;is_closed=true">Cancel</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>

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

        <div class="text-center"><h6 @click="whatsappNotification2('255698267662','Sr Accountant','check','deal with','Managing Director')">LOCAL PURCHASE ORDER LIST</h6></div>
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option" 
                           
                        >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                            </template>
                         <template #actions="props">
                                
                                <a v-if=" user_role ==1 || (props.row.status.key === 'Inactive' && props.row.requester === user_id )"   href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                   <svg
                                    v-if="user_permissions.includes('can_delete_lpo')"
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
                                       @click="deleteLpo(props.row.id);"
                                   >
                                       <polyline points="3 6 5 6 21 6"></polyline>
                                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                   </svg>
                               </a>
                                    <svg v-if="props.row.status.key !== 'Inactive'"
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="28" height="28" 
                                     fill="currentColor"
                                      class="bi bi-eye text-secondary" 
                                      viewBox="0 0 16 16"
                                      @click="openLpoModal(props.row)">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>

                                    <a v-if=" props.row.status.key !== 'Inactive' && props.row.company_id == 6"  
                                  class="text-primary" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  @click="printLpo(props.row)"
                                  >
                                    <div 
                                     v-if="loader == props.row.id"
                                     class="spinner-border text-primary mt-1"
                                      role="status"
                                      style="width: 1.5rem; height: 1.5rem;"
                                      >
                                      <span class="sr-only">Loading...</span>
                                    </div>
                                     <svg 
                                     v-else
                                     xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a> 

                                   <!-- <a v-if=" props.row.status.key !== 'Inactive' && props.row.company_id == 6"  :href="`${print_url}copex-lpo-pdf/${props.row.id}`" 
                                  class="text-success" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a>  -->
                                <a v-if="props.row.status.key !== 'Inactive' && props.row.company_id == 5"  :href="`${print_url}bushman-lpo-pdf/${props.row.id}`" 
                                  class="text-success" 
                                  title="Print" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="top" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                       <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                       <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                    </svg>
                                </a>  


                                <svg v-if="user_permissions.includes('can_edit_lpo') || props.row.status.key === 'Inactive' && props.row.requester === user_id "  class="w-6 h-6 text-gray-800 dark:text-white" 
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                              @click="openEditModal(props.row)" 
                               >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                        
                             <svg v-if=" props.row.status.key === 'Inactive' && props.row.requester === user_id " xmlns="http://www.w3.org/2000/svg" 
                             width="28" 
                             height="28"
                             fill="currentColor"
                             class="bi bi-plus-circle" 
                             viewBox="0 0 16 16" 
                             @click="openLpoModal(props.row)">
                                <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            
                              
                                
  
    <!-- Modal  for editing-->
   <teleport to="body">
  <div v-if="Show_editing_modal" class="modal fade show d-block " role="dialog">
    <div class="modal-dialog  modal-lg ">
      <div class="modal-content d-flex flex-column" style="block-size: auto;">
        <div class="modal-header">
          <h5 class="modal-title">LPO EDITING </h5>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
        </div>
        <form  class="mt-1 p-3 border rounded bg-white shadow" @submit.prevent="updatePurchaseOrder">
        <div class="modal-body flex-grow-1" >         
           
        
         <div class="row mb-2">
                <div v-if="!add_vendor" class="col-md-4">
                    <label class="form-label">Select A Supplier</label>
                    <select class="form-select" v-model="vendor_id" required @change="handleVendorChange">
                    <option value="">Select Supplier</option>
                     <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">{{ vendor.name }}</option>
                    <option value="NEW_VENDOR">New Supplier</option>
                    </select>                

                </div>
                <!-- new vendor  starts-->
                <div  v-if="add_vendor" class="col-md-4">
              <label class="form-label">Supplier Name</label>
              <input type="text" class="form-control" v-model="Vendor_name" name="Vendor_name" required>
                </div>       
                 <div  v-if="add_vendor" class="col-md-4">
              <label class="form-label">Supplier Email</label>
              <input type="text" class="form-control" v-model="Vendor_email" name="Vendor_name" required>
              </div>
                 <div  v-if="add_vendor" class="col-md-4">
              <label class="form-label">Supplier Location</label>
              <input type="text" class="form-control" v-model="Vendor_location" name="Vendor_name" required>
          </div>               
             <div  v-if="add_vendor" class="col-md-4 ">
              <label class="form-label">Supplier Phone</label>
              <input type="text" class="form-control" v-model="Vendor_phone" name="Vendor_name" required>
             </div>
          <div  v-if="add_vendor" class="col-md-4">
              <label class="form-label">Supplier Address</label>
              <input type="text" class="form-control" v-model="Vendor_address" name="Vendor_name" required>
          </div>
        
          <div class="col-md-4 " >
                    <label class="form-label">Select Project Name</label>
                    <multiselect 
                    v-model="project_name"
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
        </div>
       
        <div class="modal-footer "> 
            <div v-if="add_vendor" class="float-start">
                <button type="button" class="btn btn-dark" @click="add_vendor = false">Back</button>
            </div>
            <div class="float-end">
        <button type="button" class="btn btn-danger" @click="closeEditModal">Cancel</button>  
         &nbsp; 
           <button type="submit" class="btn btn-primary" :disabled="isSending"> 
             <span v-if="isSending">
               <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
             </span>
             <span v-else>Update</span>
           </button>
            </div>

       </div>

        </form> 
        
      </div>
    </div>
  </div>
   </teleport>
                                                                                                                                                        
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- lpo modale start -->
    <teleport to="body">
   <div v-if="showlpoModal" class="modal fade show d-block" role="dialog">
   <div class="modal-dialog  modal-xl">
     <div class="modal-content d-flex flex-column" style="height:90vh;">
       <div class="modal-header">
         <h5 class="modal-title">Details for Local Purchase Order  </h5>
         <button type="button" class="btn-close" @click="closeLpoModal"></button>
       </div>  

                   <!-- remark starts -->
                    <div class="d-flex">
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
               
             <!-- remark ends -->
             <div v-if="showLpoRemark">
        <form class="row mx-4" @submit.prevent="saveRemark()">
  <div class="col-md-10">
    <input type="text"    v-model="newremark"  class="form-control"  placeholder="Enter Remark">
  </div>
  <div class="col-md-1">
    <button type="submit" class="btn btn-primary mb-3">Send</button>
  </div>
</form>
       </div>  

        <div v-if="isActive" class="modal-body flex-grow-1" style="overflow-y: auto;">
           <div  v-if="!loading" class="d-flex justify-content-between align-items-center mb-3">
                           
                           <h5 class="text-dark"><span style="font-weight: bolder;">{{project_name}}</span></h5>
                           
                          <div v-if="user_permissions.includes('can_verify_copex_operator')">
                            <div @click="whatsappNotification2('255677771888','Engineer','check','deal with','Sr Accountant')
                            ">
                            <button v-if="approval_status_data.operation_department === 0 && user_permissions.includes('can_verify_copex_operator')" @click="approveCheck(approval_status_data.id, 'operation_department'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else >Check</div>
                            </button>
                        </div>
                           <button v-if="approval_status_data.operation_department === 1 && user_permissions.includes('can_verify_copex_operator')" @click="approveUnCheck(approval_status_data.id, 'operation_department'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>
                          </div >
                            <div v-if="user_permissions.includes('can_verify_engineer')">
                                <div @click="whatsappNotification2('255657111555','Sr Accountant','check','deal with','Managing Director')
                                ">
                                   <button v-if=" approval_status_data.operation_department === 1 && approval_status_data.engineer === 0 && user_permissions.includes('can_verify_engineer')" @click="approveCheck(approval_status_data.id, 'engineer'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary ">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                </div>                           
                                    <button v-if="approval_status_data.engineer === 1 && user_permissions.includes('can_verify_engineer')" @click="approveUnCheck(approval_status_data.id, 'engineer'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark ">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Uncheck</div>
                                    </button>
                                
                           </div>
                           <div v-if="user_permissions.includes('can_verify_project_manager')">
                            <button v-if="  approval_status_data.operation_department === 1 && approval_status_data.project_manager === 0 && user_permissions.includes('can_verify_project_manager')" @click="approveCheck(approval_status_data.id, 'project_manager'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary ">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Check</div>
                                    </button>
                                  <button v-if="approval_status_data.project_manager === 1 && user_permissions.includes('can_verify_project_manager')" @click="approveUnCheck(approval_status_data.id, 'project_manager'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark ">
                                        <div v-if="spinner" class="spinner-border text-white" role="status">
                                          <span class="sr-only"></span>
                                         </div>
                                         <div v-else>Uncheck</div>
                                    </button>
                           </div>
                           <div v-if="user_permissions.includes('can_verify_sr_accountant')  && is_copex">
                            <div @click="whatsappNotification('255713222333','Managing Director','LPO Requisition ','approve.')">
                            <button v-if="approval_status_data.engineer === 1 && approval_status_data.senior_accountant === 0 && user_permissions.includes('can_verify_sr_accountant')" @click="approveCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Check</div>
                                   </button>
                                </div>
                                 <button v-if="approval_status_data.senior_accountant === 1 && user_permissions.includes('can_verify_sr_accountant')" @click="approveUnCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark p-1 ">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>
                               </div>
                           <div v-if="user_permissions.includes('can_verify_sr_accountant')  && is_bushman">
                            <button v-if="( approval_status_data.project_manager === 1 )&& approval_status_data.senior_accountant === 0 && user_permissions.includes('can_verify_sr_accountant')" @click="approveCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Check</div>
                                   </button>
                                 
                                   <button v-if="approval_status_data.senior_accountant === 1 && user_permissions.includes('can_verify_sr_accountant')" @click="approveUnCheck(approval_status_data.id, 'senior_accountant'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark p-1 btn-sm me-3">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>

                           </div>
                           <div v-if="user_permissions.includes('can_verify_md')">
                            <button v-if="approval_status_data.managing_director === 0 && approval_status_data.senior_accountant === 1 && user_permissions.includes('can_verify_md')" @click="approveCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-primary ">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Check</div>
                                   </button>
                                  <button v-if="approval_status_data.managing_director === 1 && user_permissions.includes('can_verify_md')" @click="approveUnCheck(approval_status_data.id, 'managing_director'),spinner=!spinner" :class="{ disabled: spinner }" class="btn btn-dark p-1 ">
                                       <div v-if="spinner" class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Uncheck</div>
                                   </button>
                            
                           </div>

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
               <div class="custom-table table3 table-responsive">
                   <table class="table">
                       <thead>
                           <tr>
                               <th>Operation's Dept</th>
                               <th v-if="is_copex" >Engineer </th>  
                               <th v-if="is_bushman">Project Manager </th>                                  
                               <th>Sr.Accountant</th>
                               <th>MD</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td :class="approval_status_data.operation_department === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.operation_department === 0 ? 'unchecked' : 'checked' }}             
                               </td>

                               <td v-if="is_copex" :class="approval_status_data.engineer === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.engineer === 0 ? 'unchecked' : 'checked' }}
                                    
                                </td>
                                <td v-if="is_bushman" :class="approval_status_data.project_manager === 0 ? 'text-danger' : 'text-success'">
                                    {{ approval_status_data.project_manager === 0 ? 'unchecked' : 'checked' }}
                                    
                                </td>
               
                               <td :class="approval_status_data.senior_accountant === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.senior_accountant === 0 ? 'unchecked' : 'checked' }}
                                   
                               </td>
                               <td :class="approval_status_data.managing_director === 0 ? 'text-danger' : 'text-success'">
                                   {{ approval_status_data.managing_director === 0 ? 'unchecked' : 'checked' }}
                                  
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
                        
                   <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100px;">
           <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                   <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                   <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                   <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
               </svg>
               Loading...
           </span>
       </div>
                      

                    


                   <div v-else class="custom-table table3 ">
           
                      
                       <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template #actions="props">

                               <a   href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top" >
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
          <!-- approval officers starts -->

       
   
        <!-- approval officers ends -->
       </div> 
      
       <div v-if="!isActive" class="modal-body flex-grow-1" style="overflow-y: auto;" >
        <form v-if="isOpen" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerItem">
               <div class="d-flex">
            <div class="ms-auto">
                <button type="button" class="btn btn-danger me-2" @click="isOpen= false">X</button>
            </div>
        </div>
            <h4 class="text-center">ITEM  REGISTRATION FORM</h4>
        <div class="row mb-2">
            <div class="col-md-6">
                <label class="form-label">Budget </label>
               <multiselect 
  v-model="budget" 
  :options="budgets" 
  label="name" 
  placeholder="Select Budget" 
  :searchable="true" 
  :multiple="false" 
  :required="true"
  track-by="id"
  @input="getBudgetItems"
>
</multiselect>

            </div>

            <div v-if="isFuel" class="col-md-6">
                <label class="form-label">Description of good</label>
                <select class="form-select" v-model="description_of_lpo" @change="handleDescriptionChange">
                    <option value="" disabled>Select Category</option>
                    <option value="Direct" >Direct Filling</option>
                    <option value="Bulk" >Bulk</option>                   
                </select>
            </div>
               
            <div v-if="is_items" class="col-md-6">
                <label class="form-label">Select items</label>
                <Multiselect
                v-model="description"
                :searchable="true"
                :options="items_list"
                :multiple="false"
                required
                track-by="name"
                label="name"
                ></Multiselect>                  
            </div>

   
            <div v-if="budget !== '' "  class="col-md-6">
                <label class="form-label">Category </label>
                <multiselect 
                    v-model="budget_category" 
                    :options="budgetCategory"
                     label = "name"
                     placeholder="Select Category" 
                    :searchable="true" 
                    :multiple="false" 
                    required>
                </multiselect>
            </div>

            <div v-if="budget_category !== '' " class="col-md-5" >
    <label class="form-label">Item </label>
    <multiselect 
        v-model="item" 
        :options="budgetCategoryItems"
        label="name"
        placeholder="Select Item" 
        :searchable="true" 
        :multiple="false" 
        required>
    </multiselect>
            </div>

              <div v-if="item !== '' " class="col-md-1 text-center">
    <label for="machineCheck" class="form-label">Machine</label>
    <input 
        class="form-check-input mt-1" 
        type="checkbox" 
        id="machineCheck" 
        v-model="machine_field" 
        style="width: 25px; height: 25px;">
            </div>

            <div v-if="machine_field" class="col-md-6">
                <label class="form-label">Select Machine</label>              
            <multiselect 
                v-model="machine"
                :searchable="true"
                :options="machines"
                :multiple="false"
                required
                track-by="id"
                label="name"
                ></multiselect>
            </div>

            <div v-if="item !== '' " class="col-md-2">
                <label class="form-label">Units</label>
                <input type="hidden" :value="item.units" name="item_unit">
                <label class="form-control">{{ item.units ?? 'nill' }}  </label>
            </div>
              <div v-if="item !== '' " class="col-md-4">
                <label class="form-label">specification</label>
                <input type="text" class="form-control" v-model="specification">
            </div>

             <div v-if="item !== '' " class="col-md-6" >
                <label class="form-label">Budgeted  Rate  {{ item.rate?.toLocaleString() }}
                    <span class="text-danger" v-if="rate > item.cost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>
                        Over Budget Rate
                    </span>
                </label>
                <input type="number" class="form-control" v-model="rate" required>
            </div>

              <div v-if="used_quantity !=='' "  class="col-md-6">
                <label class="form-label">Quantity maximum {{ item.quantity - used_quantity }}
                      <span class="text-danger" v-if="quantity > (item.quantity - used_quantity)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>
                        Over Budget Quantity
                    </span>
                </label>
                <input type="number" class="form-control" v-model="quantity" step="any" required>
              </div>

              <div v-if="used_quantity !== '' " class="col-md-6">
              <label class="form-label">Amount maximum {{ (item.rate * ( item.quantity - used_quantity))?.toLocaleString() }}
                <span class="text-danger" v-if="amount > item.total">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>
                        Over Budget Total
                    </span>
              </label>
              <label class="form-control">{{ amount.toLocaleString() }}</label>
              </div>
            <!-- <div v-if="machine_field" class="col-md-12">
                <label class="form-label">Task</label>
                <textarea  class="form-control"  name="" v-model=" task" id=""></textarea>
            </div> -->
        </div>
        <div class="d-flex">
            <!-- <button type="button" class="btn btn-dark me-2" @click="closeLpoModal">Close</button> -->
     <div class="ms-auto">
            <button type="button" class="btn btn-secondary me-2" @click="clearItemForm">Clear</button>
            <button type="submit" class="btn btn-primary me-2" :disabled="isSending"  v-if="amount <= (item.rate * ( item.quantity - used_quantity))"> 
             <span v-if="isSending">
               <span class="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>            
             </span>
             <span v-else>Register</span>
           </button>
     </div>
        </div>
        </form>
    <div  class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
               <div class="panel p-0">
                        <div v-if=" !isOpen" class="d-flex justify-content-between mb-3 p-3">
                            <button class="btn btn-warning" @click="activatePurchaseOrder()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                               Ready 
                            </button>
                           
                            <button class="btn btn-primary" @click="isOpen = true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h3V4a.5.5 0 0 1 1 0v3.5h3a.5.5 0 0 1 0 1h-3V12a.5.5 0 0 1-1 0V8.5h-3A.5.5 0 0 1 4 8z"/>
                                </svg>
                                Add Item
                            </button>
                            

                        </div>
                   <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100px;">
           <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                   <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                   <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                   <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
               </svg>
             
           </span>
       </div>
                      

                    


                   <div v-else class="custom-table table3">           
                         <v-client-table :data="lpo_items" :columns="item_columns" :options="table_option" >
                           <template #status="props">
                               <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                           </template>
                           <template #actions="props">

                               <a href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top" @click="deleteItem(props.row.id,props.row.remark_id);">
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
 </teleport>
 
   <!-- Modal Background Overlay -->
   <div v-if="showlpoModal" class="modal-backdrop fade show"></div>
     
     <!-- lpo modal end -->

      <!-- Remark Modal starts -->
     <teleport to="body">
  <div v-if="showRemarkModal" class="modal fade show d-block" role="dialog" @click.self="closeRemarkModal">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content d-flex flex-column" style="height: 90vh;">
        <div class="modal-header">
          <h5 class="modal-title">Remarks for LPOs</h5>
          <button type="button" class="btn-close" @click="closeRemarkModal"></button>
        </div>
        
        <div class="modal-body flex-grow-1 p-3 p-md-4 bg-light" style="overflow-y: auto;">
          <div v-if="isfetching" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else>
        <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="block-size: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
            <div v-else>
  <div v-if="remarks.length === 0" class="text-center py-5">
              <div class="mb-3 text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
              <p  class="text-muted">No remarks yet. Be the first to add one!</p>
            </div>
            <div v-else class="chat-messages">
              <div v-for="(remark, index) in remarks" :key="index" class="mb-3">
                <!-- Current user's message (right aligned) -->
                <div v-if="remark.remarker_id == user_id" class="d-flex justify-content-end" >
                  <div class="chat-message-outgoing shadow text-dark" style="background-color:#E9E9E9;max-width: 250px;" >
                    <div class="small d-flex justify-content-between mb-1 ">
                      <span class="fw-bold mx-2 mt-1">You</span>
                      <span class=" ms-2 mt-1">{{ new Date(remark.created_at).toLocaleString() }}</span>
                    </div>
                    <div class="p-3 rounded-3 rounded-bottom-start-0 shadow-sm">
                      {{ remark.description }}
                    </div>
                  </div>
                </div>
                
                <!-- Other user's message (left aligned) -->
                <div v-else class="d-flex justify-content-start text-dark" >
                  <div class="chat-message-incoming shadow me-2"  style="background-color:#E9E9E9">
                    <div class="small d-flex justify-content-between mb-1">
                      <span class="fw-bold mx-1 mt-1">{{ remark.remarker || remark.sender_name }}</span>
                      <span class="text-muted ms-2 mt-1">{{ new Date(remark.created_at).toLocaleString() }}</span>
                    </div>
                    <div class="p-3  rounded-3 rounded-bottom-start-0 shadow-sm">
                      {{ remark.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          
          </div>
        </div>
        
        <!-- Form for adding a new remark - fixed at bottom -->
        <div class="p-3 border-top bg-white">
          <form @submit.prevent="saveRemark">
            <div class="mb-3">
              <textarea 
                v-model="newremark" 
                class="form-control" 
                rows="2" 
                placeholder="Type your remark here..."
              ></textarea>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-secondary" @click="closeRemarkModal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isSending || !newremark.trim()">
                <span v-if="isSending" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Save
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
     <!-- lpo modal end -->
<!-- remark modal ends -->



</template>

<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>

<script setup>
    import axios from 'axios';
    import { onMounted, ref,inject,watch } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Purchase Order' });

        const readRemark = async (id) => {
         const remarkStatus ={
            'status':'checked by ' + JSON.parse(localStorage.getItem("user")).name ,
              }
    try {
        const response = await axiosInstance.put(`/remark/${id}`,remarkStatus);
        showMessage('checked');
        fetchNotifications(); 
    } catch (error) {
        showError(error.message);
        console.error('Error:', error);
    }
};

    const showRemarkModal = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const printLpoReport = inject('printReport');
    const whatsappNotification = inject('whatsappNotification');
    const whatsappNotification2 = inject('whatsappNotification2');
    const add_vendor = ref(false);
    const order_registration = ref(false);
    const columns = ref(['SNo','LPO_number','requested_by', 'supplier','date', 'project','payment', 'status','awaits', 'actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
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
        searchable: true,
    });
    const isfetching = ref(false);
    const showLpoRemark = ref(false); 
    const notification_count=ref(0);
    const notifications= ref(['']);
    const selected_project = ref('');
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const company_id = ref('');
    const selected_company_id= ref('');
    const selected_status = ref('');
    const loading_spinner = ref(false);
    const supplier_name = ref('');
    const supplier_address = ref('');
    const supplier_location = ref('');
    const payment_terms = ref('');
    const project_name = ref('');
    const vendor_id = ref('');
    const is_admin=ref(false);
    const vendors =  ref([]);
    const isSending = ref(false);
    const is_editor = ref(false); 
    const Vendor_name = ref('');
    const Vendor_phone= ref('');
    const Vendor_email = ref('');
    const Vendor_address =ref ('');
    const Vendor_location=ref('');
    const is_closed = ref(true);
    const order_status=ref('');
    const user_role = JSON.parse(localStorage.getItem("user")).role;
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const print_url = ref(process.env.VUE_APP_API_BASE_URL);
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
     const axiosInstance2 = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL2
    });
    const newremark = ref('');
    const remarks = ref([]);
    const item = ref('');
    const isLoading = ref(false);



const saveRemark = async () => {
    showLpoRemark.value=false;
    // showMessage(newremark.value);
    if (!newremark.value.trim()) {
        showError("Remark cannot be empty!");
        return;
    }else if (showRemarkModal.value == false){
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


const fetchRemarks = async () => {
    isLoading.value=true;
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
        isLoading.value = false;
    }
};



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


const openRemarkModal = () => {
    fetchRemarks();
    showRemarkModal.value = true;
};

const closeRemarkModal = () => {
    showRemarkModal.value = false;
    newremark.value = ''; // Clear the remark input
    remarks.value = []; // Reset the remarks list
};


    const handleVendorChange = (event) => {
    if (event.target.value === 'NEW_VENDOR') {
        vendor_id.value = ''; // Reset the selection
        add_vendor.value = true
    }
}



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
    selected_company_id.value='';
    item.value = '',
    budgetCategory.value = (['']);
    budget.value = (['']);
    description.value = '';
    };

    const registerPurchaseOrder = async () => {
         if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
               company_id.value= selected_company_id.value.id;             
            } else if (user_permissions.includes('can_view_copex_lpo')) {
               company_id.value =6 ;
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                company_id.value = 5;
            }
    try {
        order_registration.value = false;
        loading_spinner.value = true;
        
        // First register vendor if needed
        if (add_vendor.value === true) {
            await registerVendor(); // Wait for vendor registration to complete
        }

        const purchaseOrderData = {
            company_id: company_id.value,
            vendor_id: vendor_id.value,
            supplier: "none",
            address: "none",
            project_id: project_name.value.id,
            project: 'empty',
            payment_terms: payment_terms.value,
            location: "none",
            user_id: user_id,
            requested_by: JSON.parse(localStorage.getItem("user")).name,
            status_name: 'Inactive',
            status_color: 'dark',
        };

        const response = await axiosInstance.post('/purchase-order', purchaseOrderData);
        clearForm();
        getPurchaseOrders();
        loading_spinner.value = false;
        is_closed.value = true;
        if (response.status === 201) {
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

    
    const getVendors = async () => {
        loading_spinner.value = true;
        try {
            const response = await    
            axiosInstance.get(`/vendors`);
            if (response.data && Array.isArray(response.data)) {
                    vendors.value = response.data;
                    loading_spinner.value = false;
                  if (is_editor.value) {
                    // If in edit mode, set the vendor_id to the first vendor's ID
                    order_registration.value = false;           
                  }
                  else {
                    order_registration.value = true; // Reset to false if not in edit mode
                  }

                } else {
                    console.error("Invalid response format");
                }
        } catch (error) {
            console.error("Error fetching purchase order : ", error);
        }
    };
    
    const getPurchaseOrders = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/purchase-order`);
        if (response.data && Array.isArray(response.data)) {
            order_status.value = response.data.status_name;
            let filteredData = response.data;
            if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(order =>  (order.status_name !== "Inactive" || order.user_id == user_id));
            } else if (user_permissions.includes('can_view_copex_lpo')) {
                filteredData = filteredData.filter(order => order.company_id == 6 && (order.status_name !== "Inactive" || order.user_id == user_id));
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(order => order.company_id == 5 && (order.status_name !== "Inactive" || order.user_id == user_id));
            }else if (user_permissions.includes('can_view_all_lpo')) {
                filteredData = filteredData;
            } else {
                filteredData = [];
            }
            
            items.value = filteredData.filter(order => 
                      ((selected_project.value ? order.project_id === selected_project.value : true) && (selected_status.value ? order.status_name === selected_status.value : true)) 
                 ).map((order, index) => ({
                SNo: index + 1,
                id:order.id,
                grn_no:order.grn_no,
                LPO_number:`${String(order.id).padStart(4, '0')}/${
                  order.date_created.slice(5, 7)  
                  }/${
                order.date_created.slice(2, 4)  
                 }`,
                company_id:order.company_id,
                supplier: order.supplier,
                address: order.address,
                requested_by: order.requested_by,
                date: order.date_created,
                project: order.project_aka,
                project_id : order.project_id,
                payment: order.payment_terms,
                location: order.location,
                requester:order.user_id,
                awaits:order.awaits,
                status: {
                    key: order.status_name,
                    class: order.status_color
                },
            }));
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loading_spinner.value = false;
    }
};

    const projects = ref([]);
    const getProjects = async () => {
    loading_spinner.value = true;
    try {
        const response = await axiosInstance.get(`/projects`);
        if (response.data && Array.isArray(response.data)) {
            // Filter projects after receiving the response
            let filteredData = response.data;
            if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData;
            } else if (user_permissions.includes('can_view_copex_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 6);
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 5);
            }
             projects.value = filteredData;
            loading_spinner.value = false;
        } else {
            console.error("Invalid response format");
            loading_spinner.value = false; // Also set to false in error case
        }
    } catch (error) {
        loading_spinner.value = false;
    }
};
   //code for etint model
   const Show_editing_modal = ref(false);
    
   const lpo_number = ref();
   const openEditModal= (row) => {

       
        is_editor.value = true;
        getVendors();
        getProjects();
        Show_editing_modal.value = true;
        lpo_number.value = row.id;
        vendor_id.value = row.vendor_id;
        supplier_name.value = row.supplier;
        supplier_address.value = row.address;
        supplier_location.value = row.location;
        payment_terms.value = row.payment_terms;
        project_name.value = row.project;
        if (row.vendor_id) {
            vendor_id.value = row.vendor_id;
        } else {
            vendor_id.value = ''; 
        }
     
    }
    const   closeEditModal = () => {
        // Reset the form fields
        vendor_id.value = '';
        supplier_name.value = '';
        supplier_address.value = '';
        supplier_location.value = '';
        payment_terms.value = '';
        project_name.value = '';
        add_vendor.value = false;
        order_registration.value = false;
        lpo_number.value = '';
        is_editor.value = false;
        Show_editing_modal.value = false;
    }

    const updatePurchaseOrder = async () => {
    try {
        isSending.value = true; // Set the loading state to true    
        // First register vendor if needed
        if (add_vendor.value === true) {
            await registerVendor(); // Wait for vendor registration to complete
        }

        const purchaseOrderData = {
            vendor_id: vendor_id.value,
            project_id: project_name.value.id,
            payment_terms: payment_terms.value,
        };

        const response = await axiosInstance.patch(`/purchase-order/${lpo_number.value}`,purchaseOrderData);
          if (response.status === 200) {
            clearForm();
            isSending.value = false; // Reset the loading state
            Show_editing_modal.value = false; // Close the modal
            is_editor.value = false; // Reset the edit mode flag
            order_registration.value = false; // Reset the order registration flag
            add_vendor.value = false; // Reset the add vendor flag
           getPurchaseOrders();       
          showMessage("Order Updated Successfully");
        } else {
            showError("Error code " + response.status);
        }      
       
       
    } catch (error) {
        showError("Error code " + error.status);
        console.error("Error rUpdated Order:", error);
        loading_spinner.value = false;
    }
};
        

  const is_copex = ref(false);
  const is_bushman = ref(false);
  const total_amount = ref(0);
   const lpo_items = ref([]);
   const item_columns = ref(['SNo','description','spec', 'units', 'quantity', 'rate', 'amount',]);
   const showlpoModal = ref(false); 
   const loading=  ref(false);
   const isActive= ref(false);

   const approval_status_data = ref({});
 
   const item_list_category = ref([]);
    //table 3
    const isFuel = ref(false);
    const is_bulk = ref(false);
    const is_items = ref(false);
    
  
    const item_list_id = ref('');
    const item_category = ref('')

    const direct_description = ref('');
    const description = ref('');
    const description_of_lpo = ref('');
    const machines = ref([]);
    const unit = ref('');
    const budgets = ref(['']);
    const task = ref('');
    const machine_field = ref(false);
    const quantity = ref('');
    const rate = ref('');
    const items_list = ref([]);
    const isOpen = ref('');
    const amount = ref(0);
    const approval_status = ref(false);
    const spinner = ref(false);
    watch([quantity, rate], () => {
        amount.value = quantity.value * rate.value
    });

   const lpo_id = ref(''); 
   const grn_number = ref(0)
   const openLpoModal= (row) => {
    getBudgets(row.project_id);
        grn_number.value = row.grn_no;
        lpo_number.value = row.id;
        project_name.value = row.project;
        lpo_id.value = row.LPO_number;
        if (row.status.key === "Inactive") {
            if (!item_columns.value.includes('actions')) {
                item_columns.value.push('actions');
            }
        
        
           is_closed.value= true; 
           isActive.value= false;
           getItemListCategory();
           getItems();
        }
        else{
            if (item_columns.value.includes('actions')) {
                item_columns.value.pop('actions');
            }
        getItems();
        getApprovalStatus();
        isActive.value= true;
        approval_status.value = true;
     
        if(row.company_id == 5){
            is_bushman.value= true;
            is_copex.value = false;
        }
        if(row.company_id == 6){
            is_bushman.value= false;
            is_copex.value = true;
        }
     
        }
             showlpoModal.value = true;
         }
    const   closeLpoModal = () => {
      lpo_number.value = "";
      project_name.value = ""; // Clear the project name
      lpo_items.value = [];
      total_amount.value = 0 // Clear the items list
      showlpoModal.value = false;
      isOpen.value= false;
      clearForm();
      clearItemForm();
      }
     
      
    const getItemsList = async (id) => {
        try {
           
            const response = await axiosInstance.get(`/item-list`);
            if (response.data && Array.isArray(response.data)) {
                 const filterdata = response.data.filter((item) => item.category_id == id);
                items_list.value = filterdata.map((data) => ({
                    id: data.id,
                    name: data.name,
                    unit_measure: data.unit_measure,
              }));


            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching approval status: ", error);
        }
    };
  
    const approveCheck = async (id, role) => {
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 1
            });
            getApprovalStatus();
            getPurchaseOrders();
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
    
    const activatePurchaseOrder = () => {
        loading_spinner.value = true;
        const activationData = {
            status_name: 'Unapproved',
            status_color: 'secondary',
        };
        
        if (confirm("Are you sure you want to Confirm this Order?")) {
            axiosInstance
                .put(`/purchase-order/${lpo_number.value}`, activationData)
                .then((response) => {       
                    loading_spinner.value = false;            
                if (response.status == 200) {
                   getPurchaseOrders();
                   closeLpoModal();
                    showMessage(" Activation Successfuly! Now Waiting for Approvals");
                }
                else{
                    showError("activation Fails");
                }
                })
 
                
                .catch((error) => {
                    console.error("Error activating order:", error.message);
                    loading_spinner.value = false;
                });

                
        } else {
            loading_spinner.value = false;
        }
    };


const handleDescriptionChange = () => {
       const item_number = item_category.value.id;
   

        if (item_number == 1) {
              getItemsList(1);
              is_items.value = true;
              isFuel.value = true;  
             
                 if (description_of_lpo.value === 'Direct') {
              fetchMachines();                
              machine_field.value = true;
              is_items.value = true;
              }
                 else{
                machine_field.value = false;
              }
                     
            }
         if(item_number == 2) {
             getItemsList(2);
             is_items.value = true;
             machine_field.value = false;
             isFuel.value = false;
             description_of_lpo.value = ""       
            }
        if(item_number == 3) {
            getItemsList(3);
            is_items.value = true;
            machine_field.value = false;
            isFuel.value = false;
            description_of_lpo.value = ""       
        }
    
    }

   //fetching machine list
   const  fetchMachines= async () => {
    axiosInstance
      .get(`/machines`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          machines.value = response.data.map(machine => ({
            id: machine.id,
            name: machine.name,
            type: machine.type_name,
            category : machine.category.name,          
          }));
        } else {
        error_message.value = "Error fetching machine data: " + error.message;
        console.error(error_message.value);
        }
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error.message);       
      }   
    ) 
      .finally(() => {
      });
}


   const  getBudgets= async (id) => {
    axiosInstance2
      .get(`/projects/${id}`)
      .then((response) => {
       budgets.value= response.data;
      })
      .catch((error) => {
        showError( error.message);
        console.error(error);
      }
    )
}
    const budget = ref('');
    const budget_items = ref(['']);
    const budgetCategory = ref(['']);
    watch(budget, (newVal) => {
  if (newVal) {
    axiosInstance2
      .get(`/item/${newVal.id}`)
      .then((response) => {
       budget_items.value= response.data;
       budgetCategory.value = response.data.map(item =>({
       id :  item.id,
       name : item.name,
       description : item.item_description.map(sub_item =>({
          id :sub_item.id,
          name: sub_item.name,
          units : sub_item.units,
          rate: sub_item.cost,
          cost : sub_item.cost,
          quantity : sub_item.quantity * sub_item.quantity_2,
          total : sub_item.quantity * sub_item.quantity_2 * sub_item.cost
       })),
      }));
      })
      .catch((error) => {
        showError( error.message);
        console.error(error);
      }
    )
  }
});

//dozzer watch
   watch(item, (newItem) => {
  if (newItem) {
   getItemsUsed(newItem.id);
  }
});


    const used_quantity = ref('');
    const getItemsUsed = (id) => {
        axiosInstance
            .get(`/items-used/${id}`)
            .then((response) => {
               used_quantity.value= response.data.used_items;
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error fetching item used quantity:", error);
            });
    };


const transaction_remark_id = ref(0);
const saveTransactionRemark = async () => {
    try {
         const machine_details = machine.value ? 'assigned to ' + machine.value.category + " " + machine.value.type + " "  + machine.value.name : '';
        const payload = {
            date: new Date().toISOString().split('T')[0],
            remarker_id: JSON.parse(localStorage.getItem("user")).id,
            description: "Request from LPO number " + lpo_id.value + " From budget " + budget.value.name + " on " + budget_category.value.name + " for " + item.value.name + " " + machine_details,
            remarker: JSON.parse(localStorage.getItem("user")).name,
            budget_item_description_id: item.value.id,
            cost: rate.value * quantity.value,
            status: 'debit',
        };
        const response = await axiosInstance2.post(`budget-remarks`, payload);
        transaction_remark_id.value = response.data.id;
    } catch (error) {
        showError("Error adding remark:", error);
        console.log(error);
    }
    isSending.value = false;
};



const budget_category = ref('');
const budgetCategoryItems = ref(['']);
   watch(budget_category, (newCat) => {
  if (newCat) {
    budgetCategoryItems.value = newCat.description;
  }
});

    const getItemListCategory= () => {
        axiosInstance
            .get('/item-list-category')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    item_list_category.value = response.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                    }));
                } else {
                    console.error("Invalid response format");
                }
            })
            .catch((error) => {
                console.error("Error fetching item list category:", error.message);
            });
    };


    const machine = ref('');
    const item_unit = ref('nothing');
    const specification = ref('')
const registerItem = async ()  => {
    const machine_details = machine.value ? 'assigned to ' + machine.value.type + " "  + machine.value.category + " "  + machine.value.name : '';
    isSending.value = true;
    loading_spinner.value = true;
    await saveTransactionRemark();
    const itemData = {
        budget_id : budget.value.id,
        order_id: lpo_number.value,
        specification : specification.value,
        description: "From budget " + budget.value.name + " on " + budget_category.value.name + " for " + item.value.name + " " + machine_details,
        unit_measure: item.value.units ?? '',
        quantity: quantity.value,
        machine_id: machine.value?.id ?? 0,
        rate: rate.value,
        item_list_id: item.value.id ?? '',
        category: budget_category.value.name,
        remark_id: transaction_remark_id.value,
        grn_no : grn_number.value 
    };
    axiosInstance
        .post('/items', itemData)
        .then((response) => {
            getItems();
            isSending.value = false;
            loading_spinner.value = false;
            if (response.status === 201) {
                clearItemForm();
                showMessage('Item registered successfully');
            } else {
                showError('Error registering item');
                console.error("Error registering Item:", response.data);
            }
        })
        .catch((error) => {
            showError(error.message);
            console.error("Error registering Order:", error);
        });
};


    const deleteItemRemark = (id) => {
        axiosInstance2.delete(`/budget-remarks/${id}`)
    };

    const deleteItem = (id,remark_id) => {
        loading_spinner.value = true;
   if (confirm("Are you sure you want to delete this item?")) {
              deleteItemRemark(remark_id);
                  axiosInstance
            .delete(`/items/${id}`)
            .then((response) => {
                getItems();
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Item Deleted successfully');
                } else {
                    showError('Fail to Delete item');
                    console.error("Error deleting item :", response.data.message);
                }
            })
            .catch((error) => {
               showError("Error registering Order:", error.message);
               console.error(error);
            });  
    
   }
    };
 
    const clearItemForm = () => {
        isSending.value = false;
        description.value = '';
        unit.value = '';
        quantity.value = '';
        rate.value = '';
        item_list_id.value = '';
        machine.value = '';
        item_category.value = '';
        budget.value = '';
        machine_field.value = false;
        budget_category.value = '';
        item.value = '';
        used_quantity.value = '';
        specification.value = ''
    };


const deleteLpo = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
        loading_spinner.value = true;
            axiosInstance
            .delete(`/purchase-order/${id}`)
            .then((response) => {
                getPurchaseOrders();
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Local Purchase order Deleted successfully');
                } else {
                    showError('Fail to Delete order');
                    console.error("Error delete Order:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deletion Order:", error.message);
            });  
    
   }
   else{
    return;
   }
    };


    //25 june 2025

const getItems = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/order-items/${lpo_number.value}`);
        if (response.data && Array.isArray(response.data)) {
            total_amount.value = response.data.reduce((sum, order) => {
                return sum + (order.quantity * order.rate);
            }, 0);

            isOpen.value = response.data.length === 0;

            lpo_items.value = response.data.map((order, index) => ({
                SNo: index + 1,
                category: order.category,
                id: order.id,
                description: order.description,
                type: order.machine?.type ?? '---',
                spec: order.specification ?? '---',
                units: order.unit_measure,
                quantity: order.quantity.toLocaleString(),
                rate: Number(order.rate).toLocaleString(),
                amount: (order.quantity * order.rate).toLocaleString(undefined, { maximumFractionDigits: 3 })
            }));

            return response.data; // ✅ RETURN RAW DATA or lpo_items.value
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        console.error("Error fetching purchase order: ", error);
    } finally {
        loading.value = false;
    }

    return []; // fallback
};

const getApprovalStatus = async () => {
    try {
        const response = await axiosInstance.get(`/approval-check-status/${lpo_number.value}`);
        if (response.data && typeof response.data === 'object') {
            approval_status_data.value = response.data;
            spinner.value = false;
            return response.data; // ✅ ADD THIS
        } else {
            console.error("Invalid response format");
            return null;
        }
    } catch (error) {
        console.error("Error fetching approval status: ", error);
        return null;
    }
};

  const grn = ref({})
const getGrn = async (id) => {
  try {
    const response = await axiosInstance.get(`/good-received-notes/${id}`);
    if (response.data && Object.keys(response.data).length > 0) {
      return response.data;
    } else {
      return null; // No data found
    }
  } catch (error) {
    return null; // Error or no data
  }
};


const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // gives YYYY-MM-DD
};

const loader = ref(0)
const printLpo = async (lpo) => {
  loader.value = lpo.id 
  lpo_number.value = lpo.id
  grn_number.value = lpo.grn_no
  const changed_date = "2025-12-12";
  const lpo_items = (await getItems()) || [];
  const approvalStatus = (await getApprovalStatus()) || {};
  const grnData = (await getGrn(lpo.grn_no)) || {};
  loader.value = 0
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const dateParts = lpo.date.split("-");
  const formattedDate = `${dateParts[1]}/${dateParts[2].slice(-2)}`;

  const getStatusHtml = (val, role) => {
    if (role === "Prepared By") {
      return val === 1
        ? `<td style="color: green; font-weight: bold;text-align:center"">Checked</td>`
        : `<td style="color: red; font-weight: bold;text-align:center"">Unchecked</td>`;
    }
    if (role === "Checked By") {
      return val === 1
        ? `<td style="color: green; font-weight: bold;text-align:center">Checked</td>`
        : `<td style="color: red; font-weight: bold;text-align:center"">Unchecked</td>`;
    }
    if (role === "Verified By") {
      return val === 1
        ? `<td style="color: green; font-weight: bold;text-align:center"">Verified</td>`
        : `<td style="color: red; font-weight: bold;text-align:center"">Unverified</td>`;
    }
    if (role === "Approved By") {
      return val === 1
        ? `<td style="color: green; font-weight: bold;text-align:center"">Approved</td>`
        : `<td style="color: red; font-weight: bold;text-align:center"">Unapproved</td>`;
    }
    return `<td style="color: gray;">Unchecked</td>`;
  };

  const printContent = `
<!DOCTYPE html>
<html>
<head>
<title>Print LPO</title>
<style>
  body { font-family: Arial, sans-serif; margin: 40px; font-size: 13px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; }
  .logo { width: 160px; height: auto; }
  .lpo-box { border: 1px solid #000; padding: 5px 10px; font-weight: normal; font-size: 13px; text-align: center; margin-left: auto; border-radius: 5px; }
  .company-title { text-align: center; margin-top: 10px; }
  .company-title h2 { margin: 5px 0; }
  .reg-info { position: absolute; top: 120px; right: 40px; text-align: right; font-size: 10px; line-height: 1.4; font-weight: normal; }
  .section-title { text-align: center; font-weight: bold; text-decoration: underline; margin: 20px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; border-radius: 4px; overflow: hidden; }
  table.details td, table.items th, table.items td, .signatures th, .signatures td { border: 0.5px solid #000; padding: 6px; font-weight: normal; }
  table.items thead tr th { background-color: #f8f8f8; border-bottom: 1px solid #000; }
  table tr:first-child th:first-child, table tr:first-child td:first-child { border-top-left-radius: 8px; }
  table tr:first-child th:last-child, table tr:first-child td:last-child { border-top-right-radius: 8px; }
  table tr:last-child td:first-child { border-bottom-left-radius: 8px; }
  table tr:last-child td:last-child { border-bottom-right-radius: 8px; }
  .goods-received { border: 1px solid #000; padding: 10px; margin-top: 30px; font-size: 13px; border-radius: 10px; }
  @media print { body { margin: 10mm; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="header">
  <img src="https://bcftrack.trustdigital.space/copex.jpg" class="logo" />
  <div class="lpo-box">
    LPO NO:<br>
    <span style="color:red;">${("0000" + lpo.id).slice(-4)} /${formattedDate}</span>
  </div>
</div>
<div class="reg-info">
  TIN: 103-826-519<br>
  VRN: 20-01-017530R
</div>
<div class="company-title">
  <h2>COPEX CONTRACTORS CO.LTD</h2>
  <div>Msamvu, P.O.BOX 678, Morogoro</div>
  <div>Mobile, 0713 000 777, 0657 111 555</div>
</div>
<div class="section-title">PURCHASE ORDER</div>
<table class="details">
  <tr>
    <td><strong>Supplier's Name:</strong> ${lpo.supplier}</td>
    <td><strong>Date:</strong> ${lpo.date}</td>
  </tr>
  <tr>
    <td><strong>Address:</strong> ${lpo.location}</td>
    <td><strong>Payment Terms:</strong> ${lpo.payment}</td>
  </tr>
  <tr>
    <td><strong>Project Name:</strong> ${lpo.project}</td>
    <td><strong>Location:</strong> ${lpo.location}</td>
  </tr>
</table>
<p><strong>Please Supply the goods as per details below</strong></p>
<table class="items">
  <thead>
    <tr>
      <th>SN</th>
      <th>Description of Goods</th>
      <th>Spec</th>
      <th>Units</th>
      <th>Quantity</th>
      <th>Rate</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    ${lpo_items
      .map(
        (item, index) => `
    <tr>
      <td >${index + 1}</td>
      <td>${item.description}</td>
      <td>${item.specification ?? '---'}</td>
      <td>${item.unit_measure}</td>
      <td style="text-align:right">${parseFloat(item.quantity).toFixed(2)}</td>
      <td style="text-align:right">${parseFloat(item.rate).toLocaleString()}/=</td>
      <td style="text-align:right">${(item.quantity * item.rate).toLocaleString()}/=</td>
    </tr>
    `
      )
      .join("")}
    <tr>
      <td colspan="6" style="text-align:right;"><strong>TOTAL</strong></td>
      <td><strong>${lpo_items
        .reduce((sum, item) => sum + item.quantity * item.rate, 0)
        .toLocaleString()}</strong></td>
    </tr>
  </tbody>
</table>
<table class="signatures" style="margin-top: 20px;">
  <thead>
    <tr>
      <th>Prepared By</th>
      <th>Checked By</th>
      <th>Verified By</th>
      <th>Approved By</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      ${getStatusHtml(approvalStatus.operation_department, "Prepared By")}
      ${getStatusHtml(approvalStatus.engineer, "Checked By")}
      ${getStatusHtml(approvalStatus.senior_accountant, "Verified By")}
      ${getStatusHtml(approvalStatus.managing_director, "Approved By")}
    </tr>
    <tr>
      <td style="text-align:center">Operation's Dept</td>
      <td style="text-align:center">Engineer</td>
      <td style="text-align:center">Sr.Accountant</td>
      <td style="text-align:center">MD</td>
    </tr>
  </tbody>
</table>
${grnData ? `
<div class="goods-received" style="border: 1px solid #000; padding: 15px; margin-top: 20px; border-radius: 8px; font-size: 13px;">
  <strong>Details of Goods Received</strong>
  <table style="width: 100%; margin-top: 10px; font-size: 13px; border-collapse: collapse; border: 1px solid #000; text-align: center;">
    <thead>
      <tr>
        <th style="padding: 8px; border: 1px solid #000; background-color: #f2f2f2;">GRN No</th>
        <th style="padding: 8px; border: 1px solid #000; background-color: #f2f2f2;">Receiver</th>
        <th style="padding: 8px; border: 1px solid #000; background-color: #f2f2f2;">Received Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td style="padding: 8px; border: 1px solid #000;">GRN-00${grnData.id ?? 'N/A'}</td>
      <td style="padding: 8px; border: 1px solid #000;">${grnData.receiver?.name || 'No Reveiver yet'}</td>
      <td style="padding: 8px; border: 1px solid #000;">${grnData.updated_at ? formatDate(grnData.updated_at) : 'N/A'}</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top: 10px; border-top: 1px solid #000; padding-top: 10px;">
    <strong>Receiver Remarks:</strong><br>
    ${grnData.remarks || "No remarks"}
  </div>
</div>
` : `
<div class="goods-received" style="border: 1px solid #000; padding: 15px; margin-top: 20px; border-radius: 8px; font-size: 13px; text-align: center;">
  <strong>No GRN data found.</strong>
</div>
`}


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

    onMounted(() => {
        getPurchaseOrders();
        getProjects();
        fetchNotifications();
        fetchMachines();
        watch(order_status, (newValue) => {
           
           if  (newValue === 'Inactive') {
               isActive.value= false
               
                  }
           else{
            isActive.value= true;
           }
       });
    });

</script>