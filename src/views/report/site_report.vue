<template>
    <div class="layout-px-spacing">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:;">construction report</a></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
      

     



        <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1 text-center"><h4>DAILY CONSTRUCTION SITE REPORT</h4></div>
            <button 
            class="btn btn-primary ms-auto" 
            @click="printReport" 
            title="Print Report">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
            </svg>
            &nbsp;Print
            </button>
        </div>
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link active position-relative" 
                        data-bs-toggle="tab" 
                        data-bs-target="#activities-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab1" 
                        aria-selected="true">
                       Activities
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                           5
                           <span class="visually-hidden">unread messages</span>
                       </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#work-force-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false"
                        >
                        Work Force
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            50
                            <span class="visually-hidden">total workers</span>
                        </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#equipments-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false">
                       Equipments and Machinery
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                           3
                           <span class="visually-hidden">equipment count</span>
                       </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#materials-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false">
                       Materials
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                           3
                           <span class="visually-hidden">material count</span>
                       </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#challenges-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false">
                        Challenges
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            3
                            <span class="visually-hidden">challenge count</span>
                        </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#progress-update-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false">
                       Progress Update
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                           2
                           <span class="visually-hidden">progress updates</span>
                       </span>
                    </button>
                </li>
                <li class="nav-item position-relative" role="presentation">
                    <button 
                        class="nav-link position-relative border-secondary" 
                        data-bs-toggle="tab" 
                        data-bs-target="#recommendations-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="tab2" 
                        aria-selected="false">
                        Recommendations
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                            3
                            <span class="visually-hidden">recommendations</span>
                        </span>
                    </button>
                </li>
            </ul>
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
            <div class="tab-content" id="myTabContent">
                <!-- activities tab starts -->
                <div 
                    class="tab-pane fade show active" 
                    id="activities-tab" 
                    role="tabpanel" 
                    aria-labelledby="activities-tab">
                    <div class="d-flex">

                    <h5 class="text-center mt-3 mb-3 ">ACTIVITIES</h5>
                    <div class="ms-auto">
                        <button  class="btn btn-primary btn-sm p-1 mb-2 mt-3" @click="add_activity_form =! add_activity_form">add activity</button>
                    </div> 
                     </div> 
                     <!-- activity form starts -->
                      <form v-if="add_activity_form" @submit.prevent="addActivity" class="form-control mb-1">
                        <div class="row ">
                            <div class="col-md-3">
                                <input type="text" class="form-control" v-model="activity_name" placeholder="Enter Task" required>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="activity_description" placeholder="Enter Description" required>
                            </div>
                            <div class="col-md-1">
                               <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                      </form>

                      <!-- activity form ends -->
                    <div class="panel p-0">
                    <ol class="list-group list-group-numbered">
                        <li v-for="activity in activities" class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">{{ activity.name }}</div>
                               {{ activity.description }} 
                            </div>
                            <span class="badge bg-dark rounded-pill">{{ activity.status }}</span>
                        </li>
                    </ol>
                </div>
                </div>
                <!-- activities tab ends -->
                 <!-- work force tab starts -->
                 <div 
                    class="tab-pane fade" 
                    id="work-force-tab" 
                    role="tabpanel" 
                    aria-labelledby="work-force-tab">
                                       
                    <div v-if="Object.keys(workforce).length === 0" class="d-flex justify-content-end">
                        <button class="btn btn-success btn-sm p-1 mb-2 mt-3" @click="add_work_force = !add_work_force">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            Add Workforce
                        </button>
                    </div>


                    <div v-if="!add_work_force" >
                     
       <form class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="addWorkForce">
        <h4  class="text-center"> WORKFORCE REGISTRATION  </h4>
        <div class="row mb-2">
            <div class="col-md-3">
                <label class="form-label">Skilled Labour</label>
                <input type="number" class="form-control" placeholder="Enter Number of Skilled Labour" v-model="skilled" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">UnSkilled Labour</label>
                <input type="number" class="form-control" placeholder="Enter Number of Unskilled Labour" v-model="unskilled" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Time From</label>
                <input type="time" class="form-control" placeholder="Enter Current Km of service" v-model="timefrom" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Time To</label>
                <input type="time" class="form-control" placeholder="Enter Next Km of service" v-model="timeto" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click ="add_work_force=true">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
       </form>
             <!-- jobcard registration form ends-->

                    </div>

                       
                    <div class="col-md-12 mt-4" >
      <h4 class="text-center mb-2 text-primary"> WORKFORCE</h4>
      <div class="layout-top-spacing">
        <div class="panel br-6 p-0">
          <div class="custom-table">   

                <div v-if="loading_workfroce" class="d-flex justify-content-center align-items-center" style="block-size: 150px;">
                    <span class="text-primary spinner-border spinner-border-lg" role="status" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                            <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                        </svg>                       
                    </span>
                </div>
                <ol v-else class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">
                               Total Workers on site
                                </div>
                            </div>
                            <span class="badge bg-success rounded-pill"> {{ workforce.skilled + workforce.unskilled }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">
                               Skilled Workers
                                </div>
                            </div>
                            <span class="badge bg-success rounded-pill">{{ workforce.skilled }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">
                               Unskilled Workers
                                </div>
                            </div>
                            <span class="badge bg-success rounded-pill">{{ workforce.unskilled }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold"></div>
                               Working Hours from : {{ workforce.start_time }}  to : {{workforce.end_time}}
                             </div>
                             <span class="badge bg-success rounded-pill">{{ working_hours}}</span> 
                        </li>
                      
            </ol>
          </div>
        </div>
      </div>     
                    </div>
 
                    

                    
                </div>
                <!-- work force tab ends -->
                 <!-- equipments tab starts -->
                <div 
                    class="tab-pane fade" 
                    id="equipments-tab"  
                    role="tabpanel" 
                    aria-labelledby="equipments-tab">
                    <h5 class="text-center mt-3 mb-3">EQUIPMENTS AND MACHINERY </h5>
                    <ol class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">ESCAVATOR</div>
                                Complete foundation work
                            </div>
                            <span class="badge bg-success rounded-pill">3</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">VIBRATORY ROLLER</div>
                                Install scaffolding
                            </div>
                            <span class="badge bg-warning rounded-pill">1</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">CONCRETE MIXER</div>
                                Paint exterior walls
                            </div>
                            <span class="badge bg-danger rounded-pill">3</span>
                        </li>
                    </ol>
                </div>
                <!-- equipment tab ends -->
                 <!-- materials tab starts -->
                  <div class="d-flex">
                    <div class="ms-auto">
                        <button  class="btn btn-primary btn-sm p-1 mb-2 mt-3" @click="add_material_form =! add_material_form">add material</button>
                    </div> 
                  </div>
                                       <!-- matetials form starts -->
                <form v-if="add_material_form" @submit.prevent="addMaterial" class="form-control mb-1">
                        <div class="row ">
                            <div class="col-md-2">
                                <input type="text" class="form-control" v-model="material_name" placeholder="Material Name" required>
                            </div>
                            <div class="col-md-5">
                                <input type="text" class="form-control" v-model="material_description" placeholder="Enter Description" required>
                            </div>
                            <div class="col-md-2">
                                <input type="number" class="form-control" v-model="material_quantity" placeholder="Enter Quantity" required>
                            </div>
                            <div class="col-md-2">
                                <input type="text" class="form-control" v-model="material_unit" placeholder="Enter Units" required>
                            </div>
                            <div class="col-md-1">
                               <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                </form>
                      <!-- materials form ends -->
                <div 
                    class="tab-pane fade" 
                    id="materials-tab" 
                    role="tabpanel" 
                    aria-labelledby="materials-tab">
                    <h5 class="text-center mt-3 mb-3">MATERIALS </h5>
                    <ol class="list-group list-group-numbered">
                        <li v-for="material in materials " class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">{{  material.name }} : {{material.unit}}</div>
                            Task:   {{ material.description }}
                            </div>
                            <span class="badge bg-success rounded-pill">{{ material.quantity }}</span>
                        </li>

                    </ol>
                </div>
                <!-- materials tab ends  -->
                 <!-- challenge starts -->
                <div 
                    class="tab-pane fade" 
                    id="challenges-tab" 
                    role="tabpanel" 
                    aria-labelledby="challenges-tab">
                    <h5 class="text-center mt-3 mb-3">CHALLENGES </h5>
                    <ol class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold text-danger">HEAVY RAINFALL</div>
                                Description : Heavy rain caused delays in construction activities and affected the work schedule.
                            </div>
                            <!-- <span class="badge bg-success rounded-pill">3</span> -->
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold text-danger">ESCAVATOR FAILURE</div>
                                Description : The excavator broke down, causing delays in excavation work.
                            </div>
                            <!-- <span class="badge bg-warning rounded-pill">1</span> -->
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold text-danger">CONCRETE MIXER DAMAGED</div>
                                Description : The concrete mixer was damaged during transportation, leading to delays in concrete pouring.
                            </div>
                            <!-- <span class="badge bg-danger rounded-pill">3</span> -->
                        </li>
                    </ol>
                </div>
                <!-- challenge ends -->
                <div 
                    class="tab-pane fade" 
                    id="progress-update-tab" 
                    role="tabpanel" 
                    aria-labelledby="progress-update-tab">
                    <h5 class="text-center mt-3 mb-3">PROGRESS UPDATE </h5>
                    <ol class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <!-- <div class="fw-bold">ESCAVATOR</div> -->
                               Installing scaffolding for the building
                            </div>
                            <span class="badge bg-success rounded-pill">97%</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <!-- <div class="fw-bold">VIBRATORY ROLLER</div> -->
                              Painting of exterior walls
                            </div>
                            <span class="badge bg-warning rounded-pill">50%</span>
                        </li>
                       
                    </ol>
                </div>
                <!-- reccomendations starts -->
                <div 
                    class="tab-pane fade" 
                    id="recommendations-tab" 
                    role="tabpanel" 
                    aria-labelledby="recommendations-tab">
                    <h5 class="text-center mt-3 mb-3">RECCOMENDATIONS </h5>
                    <ol class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <!-- <div class="fw-bold">ESCAVATOR</div> -->
                               Increase manpower for road grading process
                            </div>
                            <!-- <span class="badge bg-success rounded-pill">3</span> -->
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <!-- <div class="fw-bold">VIBRATORY ROLLER</div> -->
                                Increase manpower for aggregate mixing and fixing the wall
                            </div>
                            <!-- <span class="badge bg-warning rounded-pill">1</span> -->
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <!-- <div class="fw-bold">CONCRETE MIXER</div> -->
                                Increase manpower for construction protective gears
                            </div>
                            <!-- <span class="badge bg-danger rounded-pill">3</span> -->
                        </li>
                    </ol>
                </div>
                <!-- reccomendations ends -->
            </div>
        </div>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <!-- <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table 
                            :data="items" 
                            :columns="columns" 
                            :options="table_option" 
                            @row-click="onRowClick"
                        >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + (props.row.status ? props.row.status.class : '')">{{ props.row.status ? props.row.status.key : 'Unknown' }} </span>
                            </template>
                            <template #actions="props">
                                
                                <a v-if="props.row.status.key !== 'Inactive' && props.row.company_id == 6"  :href="`${print_url}copex-lpo-pdf/${props.row.voucher_number}`" 
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
                                <a v-if="props.row.status.key !== 'Inactive' && props.row.company_id == 5"  :href="`${print_url}bushman-lpo-pdf/${props.row.voucher_number}`" 
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
                                
                                <svg v-if=" props.row.requester === user_id " class="w-6 h-6 text-gray-800 dark:text-white" 

                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                              @click="openEditModal(props.row)" 
                              >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
                      </template>
                        </v-client-table>
                    </div>
                </div> -->
            </div>
        </div>
   
    </div>
</template>

<style scoped>
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

    useMeta({ title: 'Purchase Order' });
    const add_material_form = ref(false);
    const loading_spinner = ref(false);
    const add_activity_form = ref(false);
    const project_id = ref(397);
    const activity_name = ref('');
    const activity_description = ref('');
    const base_url = "https://construction.trustdigital.space/api/v1/";
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const project = ref({ name: 'Wami Mbiki', date: '2025-12-12', prepared_by: 'Lorem Ipsum', submitted_to: 'Managing Director' });
    const workforce = ref('');
    const activities_columns = ref(['SNo','date','requested_by','description','paid_to','amount','payment_type','actions' ,]);
    const columns = ref(['SNo','date','requested_by','description','paid_to','amount','payment_type','actions' ,]);
    const activities_items = ref([
        { SNo: 1, date: '2023-10-01', requested_by: 'John Doe', description: 'Site Construction', paid_to: 'ABC Ltd.', amount: 1000, payment_type: 'Cash', status: { key: 'Active', class: 'success' } },
        { SNo: 2, date: '2023-10-02', requested_by: 'Jane Smith', description: 'Site Construction', paid_to: 'XYZ Ltd.', amount: 2000, payment_type: 'Credit Card', status: { key: 'Inactive', class: 'danger' } }
    ]);
    const items = ref([
        { SNo: 1, date: '2023-10-01', requested_by: 'John Doe', description: 'Site Construction', paid_to: 'ABC Ltd.', amount: 1000, payment_type: 'Cash', status: { key: 'Active', class: 'success' } },
        { SNo: 2, date: '2023-10-02', requested_by: 'Jane Smith', description: 'Site Construction', paid_to: 'XYZ Ltd.', amount: 2000, payment_type: 'Credit Card', status: { key: 'Inactive', class: 'danger' } }
    ]);

    const activities = ref([]);

 onMounted(() => {
        fetchActivities();
        fetchWorkForces();
        fetchMaterials();
    });

    //code fro worksforce
    const add_work_force = ref(true);const loading_workfroce = ref(false);
    const fetchWorkForces = async () => {
        try {
            const response = await axios.get(`${base_url}workforces/${project_id.value}`);
            workforce.value = response.data;  
            
            calculateWorkingHours(response.data.start_time,response.data.end_time);
                    
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };   
    const working_hours = ref('') 
    const skilled = ref('')
    const unskilled = ref('')
    const timefrom = ref('')
    const timeto= ref('')
    const addWorkForce = async () => {
        loading_workfroce.value = true;
        const data={
    'project_id':   project_id.value,         
    "skilled": skilled.value,
    "unskilled":unskilled.value,
    "start_time":timefrom.value,
    "end_time":timeto.value, 
    "working_hours": ' '
    }
        try {
            const response = await axios.post(`${base_url}workforces`,data);
             
             if (response.status == 201) {
                fetchWorkForces();
                clearWorkForceData();
                add_work_force.value =true;
                loading_workfroce.value = false;
                showMessage("WorkForce Succesfully added");
             }
             else{
                showError("Failed to Add WorkForce");
                console.error(error);
                loading_workfroce.value = false;
                
             }
        } catch (error) {
            loading_workfroce.value = false;
            console.error('Error fetching WorkForce:', error);
        }

    }
     const clearWorkForceData = ()=>{
        skilled.value = '';
        unskilled.value = '';
        timefrom.value = '';
        timeto.value = '';
     }
     function calculateWorkingHours(timeFrom, timeTo) {
    // 1. Check if inputs exist and are strings
    if (!timeFrom || !timeTo || typeof timeFrom !== 'string' || typeof timeTo !== 'string') {
        console.error('Invalid time inputs:', { timeFrom, timeTo });
        return '0h0m'; // Fallback value
    }

    // 2. Parse times (default seconds to 0 if missing)
    const [fromH, fromM, fromS = 0] = timeFrom.split(':').map(Number);
    const [toH, toM, toS = 0] = timeTo.split(':').map(Number);

    // 3. Convert to total seconds
    const fromTotalSeconds = fromH * 3600 + fromM * 60 + fromS;
    const toTotalSeconds = toH * 3600 + toM * 60 + toS;

    // 4. Calculate difference (handle overnight)
    let diffSeconds = toTotalSeconds - fromTotalSeconds;
    if (diffSeconds < 0) diffSeconds += 24 * 3600;

    // 5. Format as "XhYmZs"
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    working_hours.value =  seconds > 0 ? `${hours}h${minutes}m${seconds}s` : `${hours}h${minutes}m`;
}








    const addActivity = async () => {
      add_activity_form.value = false;  
      loading_spinner.value= true;
      const itemdata={
            'project_id':project_id.value,
            'name':activity_name.value,
            'description':activity_description.value  
              }
        try {
            const response = await axios.post(`${base_url}activities`,itemdata);
              fetchActivities();
             if (response.status == 201) {
                activity_name.value = "";
                activity_description.value = "";
                loading_spinner.value= false;
                showMessage("Activity Succesfully added");
             }
             else{
                loading_spinner.value= true;
                showError("Failed to Add Item");
                console.error(error);
                
             }
        } catch (error) {
            loading_spinner.value= false;
            showError(error.message);
            console.error('Error fetching items:', error);
        }
    };      
    

    const material_name = ref('');
    const material_description = ref ('');
    const material_quantity = ref('');
    const material_unit = ref('');
    const addMaterial = async () => {
      add_material_form.value = false;  
      loading_spinner.value= true;
      const itemdata={
            'project_id':project_id.value,
            'name':material_name.value,
            'description':material_description.value ,
            'quantity' : material_quantity.value,
            'unit': material_unit.value 
              }
        try {
            const response = await axios.post(`${base_url}materials`,itemdata);
              fetchMaterials();
             if (response.status == 201) {
                material_name.value = "";
                material_description.value = "";
                material_quantity.value = "",
                material_unit.value= "",
                loading_spinner.value= false;
                showMessage("Material Succesfully added");
             }
             else{
                loading_spinner.value= true;
                showError("Failed to Add Item");
                console.error(error);
                
             }
        } catch (error) {
            loading_spinner.value= false;
            showError(error.message);
            console.error('Error fetching items:', error);
        }
    };      
    

    const fetchActivities = async () => {
        try {
            const response = await axios.get(`${base_url}activities`);
            activities.value = response.data;
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }; 
    
    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`${base_url}materials`);
            materials.value = response.data;
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };  

    const machineries = ref([
        { SNo: 1, name: 'Excavator', task: 'Excavation', quantity: 2 },
        { SNo: 2, name: 'Bulldozer', task: 'Grading', quantity: 1 },
        { SNo: 3, name: 'Crane', task: 'Lifting', quantity: 1 }
    ]);  
    
    const materials = ref([]); 
    
    const challenges = ref([
        { SNo: 1, title: 'Heavy Rainfall', description: 'Heavy rain caused delays in construction activities and affected the work schedule.' },
        { SNo: 2, title: 'Excavator Failure', description: 'The excavator broke down, causing delays in excavation work.' },
        { SNo: 3, title: 'Concrete Mixer Damaged', description: 'The concrete mixer was damaged during transportation, leading to delays in concrete pouring.' }
    ]);
 
    const progress = ref([
        { SNo: 1, description: 'Installing scaffolding for the building', percentage: 97 },
        { SNo: 2, description: 'Painting of exterior walls', percentage: 50 },
        { SNo: 3, description: 'Excavation work', percentage: 80 }
    ]);

    const recommendations = ref([
        { SNo: 1, description: 'Increase manpower for road grading process' },
        { SNo: 2, description: 'Increase manpower for aggregate mixing and fixing the wall' },
        { SNo: 3, description: 'Increase manpower for construction protective gears' }
    ]);

    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo', 'voucher_number', 'date', 'phone'],
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


    const printReport = () => {
        const printContent = items.value.map(item => `
            <tr>
                <td>${item.SNo}</td>
                <td>${item.date}</td>
                <td>${item.requested_by}</td>
                <td>${item.description}</td>
                <td>${item.paid_to}</td>
                <td>${item.amount}</td>
                <td>${item.payment_type}</td>
            </tr>
        `).join('');

        const activitiesContents = activities.value.map((activity,i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${activity.name}</td>
                <td>${activity.description}</td>
                <td>${activity.status}</td>
            </tr>
        `).join('');

        const machineryContents = machineries.value.map(machine => `
            <tr>
                <td>${machine.SNo}</td>
                <td>${machine.name}</td>
                <td>${machine.task}</td>
                <td>${machine.quantity}</td>
            </tr>
        `).join('');

        const materialsContents = materials.value.map((material,i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${material.name}</td>
                <td>${material.description}</td>
                <td>${material.quantity}</td>
            </tr>
        `).join('');

        const challengesContents = challenges.value.map(challenge => `
            <tr>
                <td>${challenge.SNo}</td>
                <td>${challenge.title}</td>
                <td>${challenge.description}</td>
            </tr>
        `).join('');

        const progressContents = progress.value.map(prog => `
            <tr>
                <td>${prog.SNo}</td>
                <td>${prog.description}</td>
                <td>${prog.percentage} %</td>
            </tr>
        `).join('');

        const recommendationsContents = recommendations.value.map(recommendation => `
            <tr>
                <td>${recommendation.SNo}</td>
                <td>${recommendation.description}</td>
            </tr>
        `).join('');


        const printWindow = window.open('', 'DailyActivityReport');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Daily Construction site report</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h3>1.) &nbsp;  Project Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Date</th>
                                <th>Prepared By</th>
                                <th>Submitted To</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                <td>${project.value.name}</td>
                                <td>${project.value.date}</td>
                                <td>${project.value.prepared_by}</td>
                                <td>${project.value.submitted_to}</td>
                            </tr>
                        </tbody>
                    </table>
                  <h3 style="margin:10px">2.) &nbsp; Activities  Done </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${activitiesContents}
                        </tbody>
                    </table>
                      <h3>3.) &nbsp; Work Force</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Total Workers</th>
                                <th>Skilled Labors</th>
                                <th>Unskilled Labors</th>
                                <th>Working Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                <td>${workforce.value.total_workers}</td>
                                <td>${workforce.value.skilled}</td>
                                <td>${workforce.value.unskilled}</td>
                                <td>${workforce.value.working_hours}</td>
                            </tr>
                        </tbody>
                    </table>
                     <h3 style="margin:10px"> 4.) &nbsp; Equipments and Machinery </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Name</th>
                                <th>Task</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${machineryContents}
                        </tbody>
                    </table>

                     <h3 style="margin:10px"> 5.)&nbsp;  Materials </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Name</th>
                                <th>Task</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${materialsContents}
                        </tbody>
                    </table>

                     <h3 style="margin:10px"> 6.)&nbsp;  Challenges </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Title</th>
                                <th>Description</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            ${challengesContents}
                        </tbody>
                    </table>

                      <h3 style="margin:10px"> 7.)&nbsp;  Progress Update </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Description</th>
                                <th>Percentage</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            ${progressContents}
                        </tbody>
                    </table>

                     <h3 style="margin:10px"> 8.)&nbsp;  Recommendations </h3>
                       <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Description</th>                           
                            </tr>
                        </thead>
                        <tbody>
                            ${recommendationsContents}
                        </tbody>
                    </table>
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
</style>