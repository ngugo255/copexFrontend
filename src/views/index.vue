<template>
    <div class="layout-px-spacing dash_1">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Sales</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <ul class="navbar-nav flex-row ms-auto">
                <li class="nav-item more-dropdown">
                    <div class="dropdown custom-dropdown-icon">
                        <a href="javascript:;" class="nav-link dropdown-toggle" id="ddlSettings" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Settings</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                            <li><a class="dropdown-item" data-value="Settings" href="javascript:void(0);">Settings</a></li>
                            <li><a class="dropdown-item" data-value="Mail" href="javascript:void(0);">Mail</a></li>
                            <li><a class="dropdown-item" data-value="Print" href="javascript:void(0);">Print</a></li>
                            <li><a class="dropdown-item" data-value="Download" href="javascript:void(0);">Download</a></li>
                            <li><a class="dropdown-item" data-value="Share" href="javascript:void(0);">Share</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">

<!-- lpo -->
 <Router-link to="#"
  v-if="user_permissions.includes('can_view_lpo_card')"
 class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">LPO : {{ summary?.lpo?.total }}</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6">
          <router-link to ="#"
           data-bs-toggle="modal" data-bs-target="#lpos"
           @click="getLpo('status_name=approved')"
          >
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Approved</h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.lpo?.approved ?? 0" :duration="3000"/>
            </h4>
          </div>
          </router-link>

        </div>

        <!-- Unapproved Card -->
        <div 
         data-bs-toggle="modal" data-bs-target="#lpos"
         @click="getLpo('status_name=Unapproved')"
        class="col-6">
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-danger">Unapproved</h6>
            <h4 class="text-danger">
              <v-f-number :start-val="0" :end-val="summary?.lpo?.unapproved ?? 0 " :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Router-link>
<!-- grn -->
<Router-link to="#"
  v-if="user_permissions.includes('can_view_grn_card')"
class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">Goods Received Note</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6">
            <router-link to ="/good-received-notes/dashboard">
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Total</h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.grn?.total ?? 0" :duration="3000"/>
            </h4>
          </div>
            </router-link>
        </div>

        <!-- Unapproved Card -->
        <div class="col-6"
         data-bs-toggle="modal" data-bs-target="#grns"
         @click="getGrn()"
        >
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-danger">Unconfirmed</h6>
            <h4 class="text-danger">
              <v-f-number :start-val="0" :end-val="summary?.grn?.unapproved ?? 0" :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
</Router-link>
<!-- labour request -->
 <Router-link to="/labour-request"
   v-if="user_permissions.includes('can_view_labour_request_card')"
 class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">Labour requests</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6">
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Total</h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.labour_request?.total ?? 0" :duration="3000"/>
            </h4>
          </div>
        </div>

        <!-- Unapproved Card -->
        <div class="col-6">
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-danger">Unapproved</h6>
            <h4 class="text-danger">
              <v-f-number :start-val="0" :end-val="summary?.labour_request?.unapproved ?? 0" :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Router-link>
<!-- assets -->
 <Router-link to="/masters/machines" 
   v-if="user_permissions.includes('can_view_assets_card')"
 class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-4 ">
      <div class="mb-4">
        <h3 class="text-dark">Assets :  <v-f-number :start-val="0" :end-val="summary?.assets?.total_assets ?? 0" :duration="3000"/></h3>
      </div>

      <div class="row g-2">
        <!-- Machines -->
        <div class="col-4">
          <div class="card shadow border-start-primary p-2 text-center">
            <small class="text-dark text-truncate d-block">Machines</small>
            <h5>
              <v-f-number :start-val="0" :end-val="summary?.assets?.machines ?? 0" :duration="3000"/>
            </h5>
          </div>
        </div>

        <!-- Vehicles -->
        <div class="col-4">
          <div class="card shadow border-start-danger p-2 text-center">
            <small class="text-dark text-truncate d-block">Vehicles</small>
            <h5>
              <v-f-number :start-val="0" :end-val="summary?.assets?.vehicles ?? 0" :duration="3000"/>
            </h5>
          </div>
        </div>

        <!-- Supervision -->
        <div class="col-4">
          <div class="card shadow border-start-warning p-2 text-center">
            <small class="text-dark text-truncate d-block">Supervision</small>
            <h5>
              <v-f-number :start-val="0" :end-val="summary?.assets?.supervision ?? 0" :duration="3000"/>
            </h5>
          </div>
        </div>
      </div>
    </div>
</Router-link>
<!-- material requisition -->
  <Router-link to="#" 
    v-if="user_permissions.includes('can_view_material_requisition_card')"
  class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">Requisitions</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6">
          <router-link to ="#"
          data-bs-toggle="modal" data-bs-target="#requisitions"
          @click="getRequisitions()"
          >
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Total</h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.material_requisition?.total ?? 0" :duration="3000"/>
            </h4>
          </div>
          </router-link>

        </div>

        <!-- Unapproved Card -->
        <div 
          data-bs-toggle="modal" data-bs-target="#requisitions"
          @click="getRequisitions('status_id=5')"
        class="col-6">
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-danger">Unchecked</h6>
            <h4 class="text-danger">
              <v-f-number :start-val="0" :end-val="summary?.material_requisition?.pending ?? 0 " :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Router-link>
  <!--goods issue note  -->
    <Router-link to="#" 
    v-if="user_permissions.includes('can_view_material_requisition_card')"
  class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">Issue & Delivery Note</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6">
          <router-link to ="#"
          data-bs-toggle="modal" data-bs-target="#issue_notes"
          @click="getGins('status_id=9')"
          >
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Issued </h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.gin?.total ?? 0" :duration="3000"/>
            </h4>
          </div>
          </router-link>

        </div>

        <!-- Unapproved Card -->
        <div 
        class="col-6">
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-success">Delivered</h6>
            <h4 class="text-success">
              <v-f-number :start-val="0" :end-val="summary?.gin?.delivered ?? 0 " :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Router-link>
<!-- jobcards -->
  <Router-link to="#" 
    v-if="user_permissions.includes('can_view_jobcard_card')"
  class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="card shadow-lg p-3">
      <div class="mb-3">
        <h3 class="text-dark">Jobcards</h3>
      </div>

      <div class="row">
        <!-- Total Card -->
        <div class="col-6"
         data-bs-toggle="modal" data-bs-target="#jobcards"
         @click="getJobCards('status_id=6')"
        >
          <router-link to ="#">
          <div class="card shadow border-start-primary h-100 p-3">
            <h6 class="text-muted">Active</h6>
            <h4>
              <v-f-number :start-val="0" :end-val="summary?.jobcard?.active ?? 0" :duration="3000"/>
            </h4>
          </div>
          </router-link>

        </div>

        <!-- Unapproved Card -->
        <div 
         data-bs-toggle="modal" data-bs-target="#jobcards"
         @click="getJobCards('status_id=8')"
        class="col-6">
          <div class="card shadow border-start-danger h-100 p-3">
            <h6 class="text-success">Completed</h6>
            <h4 class="text-success">
              <v-f-number :start-val="0" :end-val="summary?.jobcard?.completed ?? 0 " :duration="3000"/>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Router-link>

        </div>
    </div>

    <!-- modal starts -->


<!-- Modal -->
<div class="modal fade mymodal" id="lpos" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable"> <!-- Add scrollable class -->
    <div class="modal-content" style="max-height: 95vh; display: flex; flex-direction: column;">
      
      <!-- Fixed Header -->
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">LPOs</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_lpo"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="modal-body flex-grow-1 overflow-auto">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="lpos" :columns="lpoColumns" >
                  <template #status="props">
                    <span class="badge inv-status" :class="'badge-' + props.row.status.color">
                      {{ props.row.status.name }}
                    </span>
                  </template>
                   <template #check="props">
                  <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="orders.includes(props.row.id)"
          @change="triggerOrder(props.row.id, $event.target.checked)"
        >
      </div>
                  </template>
                    <template #approve="props">
                    <button class="btn btn-primary btn-sm p-2"
                    v-if="props.row.awaits === 'MD'"
                     @click="approveCheck(props.row.approval_id, 'managing_director')"
                    >
                   <div v-if="spinner === props.row.approval_id " class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Approve</div>
                  </button>

                    <button class="btn btn-dark btn-sm p-2"
                    v-if="props.row.awaits === 'No one'"
                     @click="approveUncheck(props.row.approval_id, 'managing_director',props.row.id)"
                    >
                   <div v-if="spinner === props.row.approval_id " class="spinner-border text-white" role="status">
                                         <span class="sr-only"></span>
                                        </div>
                                        <div v-else>Unapprove </div>
                  </button>
                    </template>
                </v-client-table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"
         v-if="orders.length != 0 "
        >Approve</button>
      </div>
    </div>
  </div>
</div>

     <!-- moda ends -->
      <!-- grn modal starts  -->
       <div class="modal fade mymodal " id="grns" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-xl modal-dialog-scrollable"> <!-- Add scrollable class -->
    <div class="modal-content" style="max-height: 95vh; display: flex; flex-direction: column;">
      
      <!-- Fixed Header -->
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Unconfirmed GRNs</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="modal-body flex-grow-1 overflow-auto">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="grns" :columns="grnColumns" >
                </v-client-table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"
         :class="{ disabled: orders.length === 0 }"
        >Check</button>
      </div>
    </div>
  </div>
</div>

       <!-- grn modal ends -->
        <!-- jobcard modal starts -->
                <div class="modal fade mymodal " id="jobcards" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-xl modal-dialog-scrollable"> <!-- Add scrollable class -->
    <div class="modal-content" style="max-height: 95vh; display: flex; flex-direction: column;">
      
      <!-- Fixed Header -->
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">JobCards</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="modal-body flex-grow-1 overflow-auto">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="jobcards" :columns="jobcardColumns" >
                  <template #status="props">
                    <span class="badge inv-status" :class="'badge-' + props.row.status.color">
                      {{ props.row.status.name }}
                    </span>
                  </template>
                </v-client-table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
         <!-- jobcard modal ends -->
          <!-- requisition modal starts -->
                           <div class="modal fade mymodal " id="requisitions" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-xl modal-dialog-scrollable"> <!-- Add scrollable class -->
    <div class="modal-content" style="max-height: 95vh; display: flex; flex-direction: column;">
      
      <!-- Fixed Header -->
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Requisitions</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="modal-body flex-grow-1 overflow-auto">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="requisitions" :columns="requisitionsColumns" >
                  <template #status="props">
                    <span class="badge inv-status" :class="'badge-' + props.row.status.color">
                      {{ props.row.status.name }}
                    </span>
                  </template>
                </v-client-table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
           <!-- requisition modal ends -->
            <!-- issue note starts -->
    <div class="modal fade mymodal " id="issue_notes" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-xl modal-dialog-scrollable"> <!-- Add scrollable class -->
    <div class="modal-content" style="max-height: 95vh; display: flex; flex-direction: column;">
      
      <!-- Fixed Header -->
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Good Issue Notes</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="modal-body flex-grow-1 overflow-auto">
        <div class="row">
          <div class="col-md-7">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="gins" :columns="ginColumns" >
                  <template #status="props">
                    <span class="badge inv-status" :class="'badge-' + props.row.status.color">
                      {{ props.row.status.name }}
                    </span>
                  </template>
                  <template #actions="props">
                    <span
                    class="text-success"
                     @click="fillGin(props.row)"
                    >


<svg
 v-if="props.row.id === selectedGinId"
xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
                      <svg
                     v-else
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
          </div>
          <div class="col-md-5">
              <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
              <div class="custom-table table3">
                <v-client-table :data="ginItems" :columns="ginItemColumns" >
               
                </v-client-table>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

      </div>

      <!-- Fixed Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
             <!-- issue note ends -->
</template>

<script setup>
    import '@/assets/sass/widgets/widgets.scss';
    import { ref,inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { VFNumber } from 'vue-animation-counter';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/components/custom-counter.scss';
    useMeta({ title: 'Counter' });
    import axios from 'axios';
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
     const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
     const summary = ref('')
     const showMessage = inject('showMessage');
     const showError = inject('showError');   
    const fetchSummary = () => {
      axiosInstance.get('dashboard/summary')
        .then(response => {
          summary.value = response.data
        })
        .catch(error => {
          console.error('Error fetching summary :', error);
        });
    };
    fetchSummary();
    setInterval(fetchSummary, 10000);
      
        const ginItemColumns = ref(['Sno','item','requested','supplied']);
        const ginItems = ref([])
        const selectedGinId = ref(null);
        const fillGin = (row)=>{
          selectedGinId.value = row.id;
           ginItems.value = row.items.map((item,index) =>({
              ...item,
             Sno : index +1 ,
             item: item.item_name,
             unit: item.unit,
             remark : item.remark,
             requested: item.requested,
             supplied: item.supplied,
            }))
        }

        const lpoColumns = ref(['Sno','order','date','project','supplier','payment','requester','total','awaits','approve']);
        const lpos = ref([])
        const getLpo = async (status)=>{
          axiosInstance.get(`dashboard/lpos?${status}`)
        .then(response => {
            lpos.value = response.data.map((item,index) =>({
              ...item,
             Sno : index +1 ,
             order: '00'+item.id,
             date:item.date_created,
             requester: item.requested_by,
             payment:item.payment_terms,
             total:item.total_amount.toLocaleString()+'/=',
             status:{
              name:item.status_name,
              color:item.status_color,
             }
            }))
        })
        .catch(error => {
            console.error('Error fetching lpos :', error);
        });
        }
        
        const grnColumns = ref(['Sno','grn','order','date','project']);
        const grns = ref([])
        const getGrn = async ()=>{
          axiosInstance.get('dashboard/unchecked-grn')
        .then(response => {
            grns.value = response.data.map((item,index) =>({
              ...item,
             Sno : index +1 ,
             grn: '00'+item.id,
             order :'00'+item.order_id,
             date: item.date_created
            }))
        })
        .catch(error => {
            console.error('Error fetching lpos :', error);
        });
        }

        const jobcardColumns = ref(['Sno','asset','type','service','date','status']);
        const jobcards = ref([])
        const getJobCards = async (id)=>{
          axiosInstance.get(`dashboard/jobcards?${id}`)
        .then(response => {
            jobcards.value = response.data.map((item,index) =>({
              ...item,
             Sno : index +1 ,
             asset: item.machine.name,
             type: item.machine.type_name,
             service: item.service_type,
             date : item.date_created,
             status:{
              name:item.status.name,
              color:item.status.color,
             }
            }))
        })
        .catch(error => {
            console.error('Error fetching lpos :', error);
        });
        }

        const requisitionsColumns = ref(['Sno','type','requester','project','date','status']);
        const requisitions = ref([])
        const getRequisitions = async (id)=>{
          axiosInstance.get(`dashboard/requisitions?${id}`)
        .then(response => {
            requisitions.value = response.data.map((item,index) =>({
              ...item,
             Sno : index +1 ,
             requester: item.requester,
             type: item.type,
             date: new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }),
             status:{
              name:item.status.name,
              color:item.status.color,
             }
            }))
        })
        .catch(error => {
            console.error('Error fetching requisition :', error);
        });
        }
            const gins = ref([])
           const ginColumns = ref(['Sno','issuer','date_issued','actions']);     
          const getGins = async (id)=>{
          axiosInstance.get(`dashboard/gins?${id}`)
        .then(response => {
            gins.value = response.data.map((item,index) =>({
              ...item,
             Sno : index +1 ,
    
             issuer : item.issuer.name,
             date_issued:  new Date(item.date_issued).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
             status:{
              name:item?.status?.name ?? 'Broken',
              color:item?.status?.color ?? 'danger',
             }
            }))
        })
        .catch(error => {
            console.error('Error fetching requisition :', error);
        });
        }

         const orders = ref([])
         const triggerOrder = (id, checked) => {
          if(orders.value.lenghth == 0){
            showMessage('No order')
          }
  if (checked) {
    if (!orders.value.includes(id)) {
      orders.value.push(id);
    }
  } else {
    orders.value = orders.value.filter(item => item !== id);
  }
};


    const spinner = ref('');
    const approveCheck = async (id, role) => {
      spinner.value = id;
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 1
            });
            getLpo();
            showMessage("Order approved successfully");
            spinner.value = '';
            // document.getElementById('close_lpo').click();
        } catch (error) {
            console.error("Error approving check:", error.message);
            showError("Failed to approve order");
            spinner.value = '';
        }
    };

        const approveUncheck = async (id, role,order_id) => {
      spinner.value = id;
        try {
            const response = await axiosInstance.put(`/approval-check/${id}`, {
                [role]: 0
            });
               await axiosInstance.put(`/purchase-order/${order_id}`, {
                status_name: "Unapproved",
                status_color:"secondary",
            });
            getLpo();
            spinner.value = '';
              showMessage("Order unapproved successfully");
        } catch (error) {
            console.error("Error approving check:", error.message);
            showError("Failed to Unapprove order");
            spinner.value = '';
        }
    };

    
</script>

<style>
body{
    background-color:white!important;
}
.card {
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor:pointer;
}
</style>
