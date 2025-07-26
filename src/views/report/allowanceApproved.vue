<template>
   
    <div class="layout-px-spacing horizontal-scroll-container">
           
      <div class="mx-3">
          <!-- <ul class="navbar-nav ">
            <li> 
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">Weekly Allowance</a></li>
                        </ol>
                    </nav>
            </li>
        </ul> -->
         <div class="mb-3 fw-bold">Weekly Allowance</div>
        <button  class="btn btn-dark px-3" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
        </button>
      </div>
        <div class="d-flex justify-content-between align-items-center horizontal-scroll-content">
            <div class="flex-grow-1 text-center">
<div class="container mt-5">
     <!--notification starts  -->
    <div class="mb-5 d-flex" v-if="allowance_remark_count!= 0">
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
    {{ allowance_remark_count}}
  </span>
</a>


  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlnotify">
    <li v-for="allowance in allowanceRemarks "  class="dropdown-item">
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
            <h6 class="mb-0">From : {{ allowance.sender_name }}</h6>
            <p class="mb-0 "> {{allowance.description}}    <button class="btn btn-success p-1 btn-sm me-1" style="cursor:pointer" @click="readRemark(allowance.id)">✔</button></p>
         
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
        </div>
    </div>        
<!-- notification ends -->
</div>


<div >
   <div class="text-center">
     <h4 class="budgets-title" @click="sylvesterIncrement()">WEEKLY ALLOWANCE</h4>  
       <h5 class="budgets-title">PROJECT : {{ project.short_name }}</h5> 
    </div>
    <div class="d-flex align-items-center">
       
        <div class="ms-auto">
            <button class="btn btn-success me-2" @click="printWeeklyWages">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" me-2 bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
            </svg>
                Print
            </button>
            <button class="btn btn-info me-2" @click="openRemarkModal" title="Add Remark" >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    style="cursor: pointer;"
                >
                    <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 4v-16a2 2 0 0 1 2-2z" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        fill="none" 
                        stroke-linejoin="round"/>
                </svg>
                Add Remark
            </button>
        </div>
    </div>


 <!-- loading spinner starts -->
<div v-if="loading_spinner" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  
   
<!-- boq tabale starts -->
<div class="allowance-table-container">
<table class="table table-bordered mt-4">
    <thead class="thead-light">
        <tr>
            <th rowspan="2" class="align-middle text-dark">SN</th>
            <th rowspan="2" class="align-middle text-dark">Name</th>
            <!-- <th rowspan="2" class="align-middle text-dark">Designation</th> -->
            <th colspan="7" class="text-center text-dark">Days (Tuesday - Monday)</th>
            <th rowspan="2" class="align-middle text-dark">Days</th>
            <th rowspan="2" class="align-middle text-dark">Advance</th>
            <th rowspan="2" class="align-middle text-dark">Rate</th>
            <th rowspan="2" class="align-middle text-dark">Total</th>
        </tr>
        <tr>
            <th class="text-dark text-center">Tuesday</th>
            <th class="text-dark text-center">Wednesday</th>
            <th class="text-dark text-center">Thursday</th>
            <th class="text-dark text-center">Friday</th>
            <th class="text-dark text-center">Saturday</th>
            <th class="text-dark text-center">Sunday</th>
            <th class="text-dark text-center">Monday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <!-- <td></td> -->
            <td></td>
            <td></td>
         <td
  v-for="(date, idx) in getWeekDates()" 
  :key="'date-' + idx"
  class="text-center text-muted small"
>
  {{ date }}
</td>

            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr v-for="(labour, i) in labours" :key="labour.id">
            <td class="text-start">{{ i + 1 }}</td>
            <td class="text-start">{{ labour.name }}</td>
            <!-- <td class="text-start">{{ labour.designation }}</td> -->
            <td
                v-for="(day, idx) in ['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday']"
                :key="day"
                class="text-center"
                  @click="getModal(labour, labour.id, getWeekDates()[idx])"
            >
                <span
                    style="cursor:pointer"
                >
                    <span v-if="labour.weekly_work && labour.weekly_work[day] && labour.weekly_work[day].hours !== '---'">
                        <span
                            class="badge px-2"
                            :class="labour.weekly_work[day].target === 'Achieved' ? 'bg-success' : 'bg-danger'"
                        >
                            {{ labour.weekly_work[day].target }}
                        </span>
                    </span>
                    <span v-else>
                        <!-- <span class="badge bg-info px-2">
                            not filled
                        </span> -->
 
                    </span>
                </span>
            </td>
            <td class="text-center">
                {{ calculateDaysWorked(labour) }}
            </td>
             <td class="text-end">{{ Number(labour.total_advance).toLocaleString() }}/=</td>
            <td class="text-end">{{ Number(labour.rate ).toLocaleString() }}/=</td>
            <td class="text-end">
                {{ ((Number(labour.rate) * calculateDaysWorked(labour)) - labour.total_advance ).toLocaleString() }}/=
            </td>
        </tr>
    </tbody>
</table>
</div>
 <!-- boq table ends -->
 
</div>



            </div>    
        </div>
        <div>
      <!--Item form starts  -->



                              <!-- modal starts  -->
<div class="modal fade custom-backdrop mymodal" data-bs-backdrop="false" :id="'modal-' + form_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl ">
     <div class="modal-content " >
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Daily Work Allowance</h1>
     
          <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
        </div>
     <div class="modal-body">
          <!-- Preview Section -->
           <!-- loading spinner starts -->
<div v-if="loading_spinner" v-html="loadingIndicator()" >
           
</div>
<div v-else>
          <div class="mb-4">
                <div class="row g-2 align-items-center">
                     <div class="col-md-3 col-6 ">
                          <div class="fw-bold text-secondary small">Date</div>
                          <div class="fs-6 ">{{ labour_date }}</div>
                     </div>
                     <div class="col-md-3 col-6">
                          <div class="fw-bold text-secondary small">Labourer Name</div>
                          <div class="fs-6 text-start">{{ labour_name }} </div>
                     </div>
                     <div class="col-md-3 col-6">
                          <div class="fw-bold text-secondary small">Daily Wages</div>
                          <div class="fs-6">{{ (labour_rate).toLocaleString() }}/=</div>
                     </div>
                      <div class="col-md-3 col-6">
                          <div class="fw-bold text-secondary small">Was Machine Used ?</div>
                          <div class="fs-6">
                                 <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="machine_used"> 
                                 {{ machine_used ? "Yes" : "No" }}
                          </div>
                     </div>

                     <!-- <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> -->
                     
                </div>
                <hr>
          </div>

          <form v-if="workLogForm" @submit.prevent="addWorkLog()">
                <div class="row g-3">
                      <div class="col-md-3">
                          <label class="form-label">Advance</label>
                          <input type="number" class="form-control" v-model="advance" placeholder="Advance">
                     </div>
                    <div class="col-md-9">
                          <label class="form-label">Activity</label>
                          <input type="text" class="form-control"  v-model="activity" required placeholder="Enter activity">
                     </div>
                     <template v-if="machine_used">
                                          <div class="col-md-3">
                          <label class="form-label">Start Hour </label>
                          <input type="text" class="form-control" v-model="start_hour" required placeholder="Odometer Reading /Time in">
                     </div>
                     <div class="col-md-3">
                          <label class="form-label">End Hour</label>
                          <input type="text" class="form-control" v-model="end_hour" required placeholder="Odometer Reading /Time out">
                     </div>
                       <div  class="col-md-3">
                          <label class="form-label">Select Machine</label>
                          <multiselect 
                v-model="selected_machine"
                :searchable="true"
                :options="machines"
                :multiple="false"
                required
                track-by="id"
                label="name"
                :placeholder="'Select A Machine '"
                ></multiselect>
                     </div>
                     <div  class="col-md-3" >
                          <label class="form-label">Fuel Used </label>
                          <input type="number" class="form-control" placeholder="enter fuel used" v-model="fuel_used" required step="any">
                     </div>

                    </template>

                     <div class="col-md-10">
                          <label class="form-label">Target</label>
                          <input type="text" class="form-control" v-model="target_description" required placeholder="Enter Target">
                     </div>
                       <div class="col-md-2">
                         <label class="form-label">Achieve Status</label>
                          <select v-model="target" class="form-control" required>
                                <option value="Achieved">Achieved</option>
                                <option value="Not achieved">Not achieved</option>
                          </select>
                        </div>
                     <div class="col-md-12">
                          <label class="form-label">Remark</label>
                          <textarea placeholder="Enter Remark" class="form-control" v-model="remark" ></textarea>
                     </div>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >Close</button>
                     <button type="submit" class="btn btn-secondary" >Save changes</button>
                </div>
          </form>
          <div v-else>
            <div class="d-flex">
                <div class="ms-auto">
                   <button class="btn btn-danger" @click="deleteWorkLog(workLog.id)">Clear Record</button>
                </div>
            </div>
                <h5 class="mb-3">Work Log Details</h5>
                <div class="row g-3">
                     <div class="col-md-6">
                          <div class="card p-3 h-100 text-start">
                                <div class="mb-2"><strong>Date:</strong> {{ workLog.work_date }}</div>
                                <div class="mb-2"><strong>Labourer Name:</strong> {{ labour_name }}</div>
                                <!-- <div class="mb-2"><strong>Designation:</strong> {{ labour_designation }}</div> -->
                                <div class="mb-2"><strong>Daily Wages:</strong> {{ (labour_rate).toLocaleString() }}/=</div>
                                   <div class="mb-2"><strong>Advance:</strong> {{ (labour_advance).toLocaleString() }}/=</div>
                          </div>
                     </div>
                     <div class="col-md-6">
                          <div class="card p-3 h-100 text-start">
                                <div class="mb-2"><strong>Start Hour:</strong> {{ workLog.start_hour }}</div>
                                <div  class="mb-2"><strong>End Hour:</strong> {{ workLog.end_hour }}</div>
                                <div v-if="workLog.machine !== null " class="mb-2"><strong>Machine:</strong> {{ workLog.machine }}</div>
                                <div v-if="workLog.fuel_used != 0.00 "  class="mb-2"><strong>Fuel Used :</strong> {{ workLog.fuel_used }} Litres</div>
                                <div class="mb-2"><strong>Target:</strong> {{ workLog.target_description }}</div>
                                <div class="mb-2"><strong>Status:</strong> {{ workLog.target }}</div>
                          </div>
                     </div>
                     <div class="col-12">
                          <div class="card p-3 text-start">
                                <div class="mb-2 text-start"><strong>Activity:</strong> <span class="text-muted">{{ workLog.activity }}</span></div>
                                <div class="mb-2 text-start"><strong>Remark:</strong> <span class="text-muted">{{ workLog.remark }}</span></div>
                                  <div v-if="workLog.md_remark !== null " class="mb-2 text-start"><strong>MD's Remark:</strong> <span class="text-muted">{{ workLog.md_remark }}</span></div>
                          </div>
                     </div>
                </div>
                <div class="row mt-2" v-if="workLog.md_remark === null && user_permissions.includes('is_md') ">
                    <div class="col-md-0">
                        <form @submit.prevent="addMdRemark(workLog)">
                        <label class="form-label me-2">MD's Remark</label>
                          <textarea placeholder="Enter Remark" class="form-control" v-model="remark" required></textarea>
                          <div class="text-center">
                             <button type="submit" class=" mt-2 text-center btn btn-primary">Send</button>
                          </div>
                        </form>
                         
                        </div>
                </div>
                <div class="modal-footer mt-3">
                     <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >Close</button>
                </div>
          </div>
</div>
 <!-- loading spinner ends -->  

     </div>
     </div>
</div>

</div>



                               <!-- modal ends -->
<!-- marequee starts -->
 <div v-if="sylvester" style="background-color:yellow;padding-top:1px">
    <h4 class="mt-4 mb-1">  <marquee>MD ANATAKA WATU WAKUTANE CONFERENCE ROOM KWA AJILI YA MKUTANO .ASANTENI</marquee></h4>
 </div>

 <!-- marquee ends -->
        </div>
       
    </div>

    <!-- Remark Modal -->
    <div v-if="showRemarkModal" class="remark-modal-overlay">
        <div class="remark-modal-container">
            <!-- Modal Header -->
            <div class="remark-modal-header">
                <h5 class="remark-modal-title">Remark(s) On Weekly Allowance</h5>
                <button type="button" class="remark-modal-close" @click="closeRemarkModal">×</button>
            </div>
            
            <!-- Modal Body - Chat messages -->
            <div class="remark-modal-body">
                <div v-for="(remark, index) in remarks" :key="index" class="remark-message-container">
                    <div :class="[
                        'remark-message', 
                        remark.remarker_id == currentUserId ? 'remark-message-own' : 'remark-message-other'
                    ]">
                        <div class="remark-sender">
                            {{ remark.remarker_id == currentUserId ? 'You' : (remark.remarker || remark.sender_name) }}
                        </div>
                        <div class="remark-text">{{ remark.description }}</div>
                    </div>
                </div>
            </div>
            
            <!-- Modal Footer - Input field -->
            <div class="remark-modal-footer">
                <input 
                    type="text" 
                    v-model="newremark" 
                    class="remark-input" 
                    placeholder="Enter your remark"
                />
                <div class="remark-modal-buttons">
                    <button class="remark-btn remark-btn-close" @click="closeRemarkModal">Close</button>
                    <button 
                        class="remark-btn remark-btn-save" 
                        @click="saveRemark" 
                        :disabled="isSending || !newremark.trim()"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal backdrop -->
    <div v-if="showRemarkModal" class="modal-backdrop fade show"></div>

</template>



<script setup>
    import axios from 'axios';
    import { useRoute } from 'vue-router';     
    import { onMounted, ref, inject, watch } from 'vue';
     import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css'
    import '@/assets/sass/elements/tooltip.scss';
    import { useMeta } from '@/composables/use-meta';
    import Multiselect from '@suadelabs/vue3-multiselect';
    useMeta({ title: 'Weekly Allowance' });
    const loadingIndicator = inject('loadingIndicator');
    const add_labour_form = ref(false);
    const loading_spinner = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');

    const sylvester= ref(false);
    const sylvester_increment = ref(0);
    const sylvesterIncrement =  () => {
        sylvester_increment.value += 1;

        if(sylvester_increment.value>=3){
            sylvester.value= true;
            sylvester_increment.value=1;
        }else if(sylvester_increment.value<3){
            sylvester.value=false;
        }
    }
const route = useRoute();

const calculateDaysWorked = (labour) => {
    if (!labour?.weekly_work) return 0;

    let totalDays = 0;

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
        const entry = labour.weekly_work[day];

        if (!entry || entry === '---') return;

        if (entry.target === 'Achieved') {
            totalDays += 1;
        } else if (entry.target === 'Not achieved') {
            totalDays += 0.5;
        }
    });

    return parseFloat(totalDays.toFixed(1));
};



const machines = ref([]);
const selected_machine = ref('');
   const  fetchMachines= async () => {
    axiosInstance
      .get(`/machines`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          machines.value = response.data.map(machine => ({
            id: machine.id,
            name: machine.name,        
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

   const project = ref('');
   const  fetchProject= async () => {
    axiosInstance
      .get(`/projects/${project_id.value}`)
      .then((response) => {
        project.value= response.data;
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error.message);   
      }     
    )    
      .finally(() => {
      });
}

const machine_used = ref(false)
const labour_name = ref('');
const labour_designation = ref('');
const labour_type = ref('');
const labour_rate= ref('');
const labour_advance=ref(0);
const changed_date = ref(route.params.date);
const request_id = ref(route.params.request_id);
const project_id = ref(route.params.project_id);
const form_modal = ref(0);
const labour_date = ref('');
const labour_id = ref('');
const target = ref('Not achieved');
const activity = ref('');
const remark = ref('');
const start_hour = ref('');
const end_hour = ref('');
const fuel_used = ref();
const selected_project = ref(0)
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // gives YYYY-MM-DD
};
const target_description = ref('');
const advance = ref(null);

const deleteWorkLog = async (id) => {
  if (confirm("Are you sure you want to delete this record ?")) {
        loading_spinner.value = true;
            axiosInstance
            .delete(`daily-work-logs/${id}`)
            .then((response) => {
                fetchWorkLog();
                labour_type.value='';
                fetchLabours();
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Record Deleted Successfully');
                } else {
                    showError('Fail to Delete Record');
                    console.error("Error delete record:", response.data.message);
                }
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error deletion Record:", error);
            });  
    
   }
   else{
    return;
   }
} 

const addWorkLog = async () => { 
loading_spinner.value=true;
  add_labour_form.value = false;
  const worklogdata = {
    'labour_id': labour_id.value,
    'work_date': formatDate(labour_date.value),
    'start_hour': start_hour.value,
    'end_hour': end_hour.value,
    'machine_id' : selected_machine.value.id,
    'machine' : selected_machine.value.name ,
    'fuel_used' : fuel_used.value,
    'activity': activity.value,
    'target': target.value,
    'remark': remark.value,
    'target_description':target_description.value,
    'advance':advance.value || 0,
    'request_id':request_id.value,
  };

  try {
    const response = await axiosInstance.post(`daily-work-logs`, worklogdata);
    if (response.status == 201) {
        fetchWorkLog();
        fetchLabours();
        remark.value='';
      showMessage("Work log added Successfully");
          selected_machine.value = '',
          fuel_used.value = 0.00,
          loading_spinner.value=false;

    } else {
      showError("Failed to Add Work Log");
          loading_spinner.value=false;

      console.error(error);
    }
  } catch (error) {
        loading_spinner.value=false;

    console.error('Error fetching work Log:', error);
    showError(error.message);
  }
};


const addMdRemark = async (workLog) => {
      const itemdata={
            'md_remark':remark.value,             
              }
        newremark.value  = "For "+ workLog.labour.designation +" "+ workLog.labour.name + " on "+ workLog.work_date +" , "+ remark.value 
        try {
            const response = await axiosInstance.patch(`daily-work-logs/${workLog.id}`,itemdata);
             
             if (response.status == 200) {
                remark.value = "";
                saveRemark(); 
                showMessage("Remark added Succesfully");
                fetchWorkLog();
             }
             else{
                remark.value='';
                showError("Failed to add Remark");
                console.error(error);       
             }
        } catch (error) {
            remark.value ='';
            console.error('Error Adding Remark:', error);
            showError(error.message);
        }
    };  

const getModal = (labour,id,date) => {
    form_modal.value = id;
    labour_id.value = labour.id;
    labour_name.value = labour.name;
    labour_designation.value = labour.designation;
    labour_rate.value = labour.rate;
    labour_type.value = labour.labour_type;
    labour_date.value = date;
    fetchWorkLog();
    setTimeout(() => {
        const modalEl = document.getElementById('modal-' + id);
        if (modalEl) {
            // Bootstrap 5 modal
            const modal = window.bootstrap ? new window.bootstrap.Modal(modalEl) : null;
            if (modal) {
                modal.show();
            }
        }
    }, 100);
}
const getWeekDates = () => {
    const selected = changed_date.value ? new Date(changed_date.value) : new Date();
    const day = selected.getDay(); // 0=Sunday, 1=Monday, 2=Tuesday, ..., 6=Saturday
    
    // Find Tuesday of the current week
    const tuesday = new Date(selected);
    const diffToTuesday = day <= 2 ? 2 - day : 9 - day; // Tuesday is day 2
    tuesday.setDate(selected.getDate() - (day - 2 + 7) % 7);
    
    const weekDates = [];
    // Add 7 days (Tuesday to next Monday)
    for (let i = 0; i < 7; i++) {
        const d = new Date(tuesday);
        d.setDate(tuesday.getDate() + i);
        weekDates.push(d.toISOString().split('T')[0]);
    }
    
    return weekDates; // Now contains Tuesday to next Monday
};


    const labours = ref([]);
    const originalLabours = ref([]);
    const fetchLabours = async () => {
        loading_spinner.value= true;
        try {
            const response = await axiosInstance.get(`approved-labours?date=${changed_date.value}&request_id=${request_id.value}`);
            originalLabours.value= response.data;
            if (Array.isArray(response.data)) {
            labours.value = labour_type.value
                ? response.data.filter(labour => labour.labour_type === labour_type.value)
                : response.data;
            } else {
            labours.value = [];
            }
            loading_spinner.value=false;
        } catch (error) {
            loading_spinner.value=false;
            console.error('Error fetching labours:', error);
        }
    };
const useFilter = () => {
    if (selected_project.value.id === 0) {
    labours.value = originalLabours.value;
    }else{
    labours.value= originalLabours.value;    
    labours.value = labours.value.filter(labour => labour.project_id === selected_project.value.id);
    }
};
    

    const workLog = ref('');
    const workLogForm = ref(false);
    const fetchWorkLog = async () => {
        loading_spinner.value = true;
        try {
            const response = await axiosInstance.get(
                `day-work-log?labour_id=${labour_id.value}&work_date=${labour_date.value}`
            );
            workLog.value = response.data;
            labour_advance.value = workLog.value.advance ?? 0;
            workLogForm.value = !response.data || Object.keys(response.data).length === 0;
            loading_spinner.value = false;
        } catch (error) {
            console.error('Error fetching work log:', error);
            loading_spinner.value = false;
        }
    };

    const requestWorks = ref([])
       const fetchRequestWorks = async () => {
        try {
            const response = await axiosInstance.get(
                `labours-work?request_id=${request_id.value}`
            );
            requestWorks.value = response.data;
        } catch (error) {
            console.error('Error fetching works:', error);
        }
    };





const printWeeklyWages = async () => {
    // Create a hidden iframe for printing
    await fetchRequestWorks()
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const weekDates = getWeekDates();
    const formatPrintDate = (dateStr) => {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    };

    const dateParts = changed_date.value.split("-");
    const formattedDate = `${dateParts[1]}/${dateParts[2].slice(-2)}`;
    const filteredLabours = labours.value.filter(labour => 
        (calculateDaysWorked(labour) * Number(labour.rate)) - labour.total_advance > 0
    );

    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Weekly Wages Report</title>
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
            ${("0000" + request_id.value).slice(-4)} /${formattedDate}
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

      <div class="section-title" style="margin-bottom:10px">WEEKLY WAGES REPORT</div>

                <table>
                  <thead>
                    <tr>
                        <th class="text-start">WEEK</th>
                        <th class="text-start">PROJECT</th>
                        </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-start"> ${formatPrintDate(weekDates[0])} to ${formatPrintDate(new Date(new Date(weekDates[5]).getTime() + 86400000))}</td>
                      <td class="text-start">${project.value.short_name ?? "NO PROJECT "}</td>
                    </tr>  
                  </tbody>
                </table>

            <table>
                <thead>
                    <tr >
                        <th>SN</th>
                        <th>Name</th>
                        ${['Tue', 'Wed', 'Thur', 'Friday', 'Sat', 'Sun', 'Mon'].map(day => `<th>${day}</th>`).join('')}
                        <th>Days</th>
                        <th>Advance</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredLabours.map((labour, i) => `
                        <tr>
                            <td class="text-start">${i + 1}</td>
                            <td class="text-start">${labour.name}</td>
                            ${['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'].map(day => `
                                <td class="text-center">
                                    ${labour.weekly_work?.[day]?.target || '-'}
                                </td>
                            `).join('')}
                            <td class="text-center">${calculateDaysWorked(labour)}</td>
                            <td class="text-end">${Number(labour.total_advance).toLocaleString()}/=</td>
                            <td class="text-end">${Number(labour.rate).toLocaleString()}/=</td>
                            <td class="text-end">
                                ${(((calculateDaysWorked(labour) * Number(labour.rate)) - labour.total_advance ).toLocaleString())}/=
                            </td>
                        </tr>
                    `).join('')}
                    <tr class="total-row">
                        <td></td>
                        <td></td>
                        <td colspan="10" class="text-end">Grand Total:</td>
                        <td class="text-end">
                            ${
                                filteredLabours.reduce((sum, labour) => {
                                    return sum + ((calculateDaysWorked(labour) * Number(labour.rate)) - labour.total_advance);
                                }, 0).toLocaleString()
                            }/=
                        </td>
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
          <td style="text-align: center;height: 50px; color: green'};">         
          </td>
             <td style="text-align: center;height: 50px; color: green'};">
          </td>
              <td style="text-align: center;height: 50px; color: green'};">            
          </td>
              <td style="text-align: center;height: 50px; color: green'};">
          </td>
              </td>
              <td style="text-align: center;height: 50px; color: green'};">
          </td>
        </tr>
      </table>
            <div style="page-break-before: always;"></div>
            <center>
            <h3>LABOURS GENERAL WORKING REPORT</h3>
            </center> 
            <table>
                  <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Machine</th>
                        <th>Fuel Used</th>
                        <th>Start Hour</th>
                        <th>End Hour</th>
                        <th>Activity</th>
                        <th>Target</th>
                        <th>Advance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                  ${requestWorks.value.map((item, index) => `
  <tr>
    <td>${index + 1}</td>
    <td>${item.labour?.name ?? '-'}</td>
    <td>${item.machine?.name ?? '-'}</td>
    <td>${item?.fuel_used ? item.fuel_used + 'Litres' : '-'}</td>
    <td>${item.start_hour ?? '-'}</td>
    <td>${item.end_hour ?? '-'}</td>
    <td>${item.activity ?? '-'}</td>
    <td>${item.target ?? '-'}</td>
    <td>${item.advance.toLocaleString() ?? '-'}</td>
    <td>${
    item.created_at 
    ? new Date(item.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }) 
    : '-'
     }
    </td>
  </tr>
`).join('')}

                </tbody>
            </table>
        </body>
        </html>
    `;

    // Write to the iframe and print
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();

    // Wait for content to load before printing
    iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Remove the iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    };
};


const user = ref(null);
const user_permissions = ref([]);

 onMounted(() => {
        const storedUser = localStorage.getItem("user");
        user.value = JSON.parse(storedUser);
        user_permissions.value = user.value.permissions;
        fetchProject();
        fetchLabours();
        fetchMachines();
        fetchAllowanceRemarks();
    });

// Add these variables for the remark functionality
const showRemarkModal = ref(false);
const remarks = ref([]);
const newremark = ref('');
const isSending = ref(false);
const isfetching = ref(false);
const currentUserId = JSON.parse(localStorage.getItem("user")).id;


// Function to open the remark modal
const openRemarkModal = () => {
    showRemarkModal.value = true;
    fetchRemarks();
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

// Function to close the remark modal
const closeRemarkModal = () => {
    showRemarkModal.value = false;
    newremark.value = '';
    // Restore body scrolling
    document.body.style.overflow = '';
};

// Function to fetch remarks
const fetchRemarks = async () => {
    isfetching.value = true;
    try {
        // Use the current week date to fetch relevant remarks
        const response = await axiosInstance.get(`remark?remark_type=allowance&week_date=${changed_date.value}`);
        
        if (response.data && Array.isArray(response.data.data)) {
            remarks.value = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
            remarks.value = response.data;
        } else {
            remarks.value = [];
        }
        
        // Scroll to the bottom of remarks after they load
        setTimeout(() => {
            const modalBody = document.querySelector('.remark-modal-body');
            if (modalBody) modalBody.scrollTop = modalBody.scrollHeight;
        }, 100);
    } catch (error) {
        console.error('Error fetching remarks:', error);
        showError("Failed to load remarks");
    } finally {
        isfetching.value = false;
    }
};

    const readRemark = async (id) => {
         const remarkStatus ={
        'status':'checked by ' + JSON.parse(localStorage.getItem("user")).name ,
              }
    try {
        const response = await axiosInstance.put(`/remark/${id}`,remarkStatus);
        showMessage('checked');
        fetchAllowanceRemarks(); 
    } catch (error) {
        console.error('Error:', error);
    }
};


const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
const allowance_remark_count = ref(0);
const allowanceRemarks= ref(['']);
const fetchAllowanceRemarks = async () => {
    try {
        const response = await axiosInstance.get(`remark?remark_type=allowance`);
        allowanceRemarks.value = response.data.data.filter(item => item.status === "unchecked");
        allowance_remark_count.value = response.data.unchecked_count;
    } catch (error) {
        console.error('Error fetching allowance remark :', error);
        showError("Failed to load allowance remark " + (error.response?.data?.message || error.message));
    } finally {
        isfetching.value = false;
    }
}  

// Function to save a new remark
const saveRemark = async () => {
    if (!newremark.value.trim()) {
        showError("Remark cannot be empty");
        return;
    }
    
    isSending.value = true;
    try {
        // Create the payload with the correct field names and type
        const remarkData = {
            remarker_id: currentUserId,
            description: newremark.value,
            remark_type: "allowance",
            type_id: 0,
            week_date: changed_date.value,
            remarker: JSON.parse(localStorage.getItem("user")).name,
            created_at: new Date().toISOString()
        };
        
        const response = await axiosInstance.post('/remark', remarkData);
        
        if (response.status === 201 || response.status === 200) {
            if (response.data) {
                fetchAllowanceRemarks();
                remarks.value.push(response.data);
            } else {
                remarks.value.push(remarkData);
            }
            newremark.value = '';
            setTimeout(() => {
                const modalBody = document.querySelector('.remark-modal-body');
                if (modalBody) modalBody.scrollTop = modalBody.scrollHeight;
            }, 100);
        }
    } catch (error) {
        console.error('Error saving remark:', error);
        showError("Failed to save remark");
    } finally {
        isSending.value = false;
    }
};

// Add a watcher to reload remarks when the week date changes
watch(changed_date, () => {
    if (showRemarkModal.value) {
        fetchRemarks();
    }
});         


</script>
<style scoped>
/* Enable horizontal scrolling for the entire page */
.horizontal-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  padding-bottom: 20px; /* Add some padding at the bottom */
}

.horizontal-scroll-content {
  min-width: 768px; /* Minimum width to ensure content doesn't get too compressed */
  width: max-content; /* Allow content to determine width */
  padding: 0 15px; /* Add some padding on the sides */
}

/* Make sure tables maintain their structure */
table {
  width: 100%;
  min-width: 768px; /* Ensure table doesn't get too narrow */
}

/* Ensure the modal appears above the scrollable content */
.modal.show {
  z-index: 1050;
}

/* Add a visual indicator for horizontal scrolling on mobile */
@media (max-width: 767px) {
  .horizontal-scroll-container::after {
    content: "";
    position: fixed;
    top: 50%;
    right: 0;
    width: 20px;
    height: 40px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20px 0 0 20px;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 10;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 0.2; }
    50% { opacity: 0.8; }
    100% { opacity: 0.2; }
  }
}

/* Mobile Modal Styles */
.mobile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.mobile-modal-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.mobile-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 0;
  cursor: pointer;
  color: #6c757d;
}

.mobile-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  -webkit-overflow-scrolling: touch;
}

.mobile-modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 10px;
  background-color: #f8f9fa;
}

.mobile-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.remarks-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.no-remarks {
  text-align: center;
  color: #6c757d;
  padding: 30px 0;
}

.remark-item {
  background-color: #f1f3f5;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.remark-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.remark-content {
  white-space: pre-wrap;
  word-break: break-word;
}

.remark-form {
  display: flex;
  flex-direction: column;
}

.remark-input {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  resize: none;
}

.remark-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.remark-submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remark-submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Floating Action Button */
.floating-action-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  z-index: 1000;
  cursor: pointer;
  font-size: 24px;
}

/* Add a pulse animation to make the button more noticeable */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
}

.floating-action-button {
  animation: pulse 2s infinite;
}

.floating-action-button:active {
  transform: scale(0.95);
}

/* Remark Modal Styles (Matching the image exactly) */
.remark-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remark-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  height: 80%;
  max-height: 600px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.remark-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
}

.remark-modal-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.remark-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  color: #666;
}

.remark-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.remark-message-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;
}

.remark-message {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #e0e0e0;
  position: relative;
}

.remark-message-own {
  align-self: flex-end;
  margin-left: auto;
  background-color: #e9ecef;
}

.remark-message-other {
  align-self: flex-start;
  background-color: #e0e0e0;
}

.remark-sender {
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
}

.remark-text {
  word-break: break-word;
  color: #333;
}

.remark-modal-footer {
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
}

.remark-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 1rem;
}

.remark-modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.remark-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.remark-btn-close {
  background-color: #9c27b0;
  color: white;
}

.remark-btn-save {
  background-color: #4361ee;
  color: white;
}

.remark-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Floating Action Button for Mobile */
.remark-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4361ee;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  z-index: 1000;
  cursor: pointer;
  font-size: 24px;
}

.remark-fab:active {
  transform: scale(0.95);
}

/* Full-width container styles */
.allowance-table-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Remove any default padding from parent containers */
.layout-px-spacing {
  padding: 0 !important;
}

.horizontal-scroll-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.horizontal-scroll-content {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0 15px;
}

/* Centered Remark Modal Styles */
.remark-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remark-modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    max-height: 80vh;
}

.remark-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
}

.remark-modal-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

.remark-modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    padding: 0;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.remark-modal-close:hover {
    color: #333;
    background-color: rgba(0, 0, 0, 0.05);
}

.remark-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    max-height: calc(85vh - 140px);
}

.remarks-list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 30px;
}

.no-remarks {
    text-align: center;
    color: #6c757d;
    padding: 60px 0;
    font-style: italic;
    font-size: 1.1rem;
}

.remarks-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.remark-item {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.08);
    border-left: 5px solid #4361ee;
}

.remark-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1rem;
}

.remark-author {
    font-weight: 600;
    color: #495057;
}

.remark-date {
    color: #6c757d;
}

.remark-content {
    white-space: pre-wrap;
    word-break: break-word;
    color: #212529;
    line-height: 1.6;
    font-size: 1.05rem;
}

.new-remark-form {
    margin-top: auto;
    border-top: 1px solid #e9ecef;
    padding-top: 25px;
}

.new-remark-form textarea {
    resize: none;
    border: 1px solid #ced4da;
    border-radius: 8px;
    padding: 15px;
    font-size: 1.05rem;
    transition: border-color 0.2s;
    height: 120px;
}

.new-remark-form textarea:focus {
    border-color: #4361ee;
    box-shadow: 0 0 0 0.25rem rgba(67, 97, 238, 0.25);
}

.new-remark-form .btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 6px;
}

/* Responsive adjustments */
@media (max-width: 1900px) {
    .remark-modal-container {
        width: 75%;
        max-width: 2000px;
    }
}

@media (max-width: 992px) {
    .remark-modal-container {
        width: 80%;
        min-width: 500px;
    }
    
    .remark-modal-header {
        padding: 15px 25px;
    }
    
    .remark-modal-body {
        padding: 25px;
    }
    
    .remark-modal-title {
        font-size: 1.3rem;
    }
}

@media (max-width: 768px) {
    .remark-modal-container {
        width: 90%;
        min-width: 400px;
        max-height: 90vh;
    }
    
    .remark-modal-header {
        padding: 15px 20px;
    }
    
    .remark-modal-body {
        padding: 20px;
    }
    
    .new-remark-form textarea {
        height: 100px;
    }
}

@media (max-width: 576px) {
    .remark-modal-container {
        width: 95%;
        min-width: auto;
        height: 85vh;
    }
    
    .remark-modal-header {
        padding: 12px 15px;
    }
    
    .remark-modal-body {
        padding: 15px;
    }
    
    .remark-modal-title {
        font-size: 1.2rem;
    }
    
    .remark-item {
        padding: 15px;
    }
}

 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }

</style>
