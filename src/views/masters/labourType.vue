<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-labour_type"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-labour_type active" aria-current="page"><span>labour Type</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div class="d-flex me-4 mt-2 ">
                        <div class="ms-auto">
                            <button v-if="user_permissions.includes('can_register_wages')" class="btn btn-primary " @click="labour_type_registration =! labour_type_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
                    <!-- loading spinner starts -->
        <div v-if="loading_spinner" class="d-flex justify-content-center align-labour_types-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
        <!-- Loading spinner ends -->
 <!-- labour_type registration form starts -->
 <form v-if="labour_type_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerLabourType">
        <h4 class="text-center">LABOUR TYPE REGISTRATION FORM</h4>
        <div class="row mb-2">    
            <div class="col-md-6">
                <label class="form-label">Labor Type Name</label>
                <input type="text" class="form-control" placeholder="Enter Labour Type Name" v-model="labour_type_name" required>
            </div>          
            <div class="col-md-6">
                <label class="form-label">Rate</label>
                <input type="number" class="form-control" placeholder="Enter Rate" v-model="rate"  step="any" required>
            </div>
            
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="labour_type_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- labour_type registration form ends-->
    


        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="labour_types" :columns="columns" :options="table_option" >
                            <template #engineer="props">
                                <span
                                    :class="props.row.engineer === 'Unapproved' ? 'p-1 bg-danger' : 'p-1 bg-success'"
                                >
                                    {{ props.row.engineer }}
                                </span>
                            </template>
                            <template #md="props">
                                <span
                                    :class="props.row.md === 'Unapproved' ? 'p-1 bg-danger' : 'p-1 bg-success'"
                                >
                                    {{ props.row.md }}
                                </span>
                            </template>
                            <template #actions="props">

<a v-if="user_permissions.includes('can_edit_wages')" href="javascript:void(0)" class="text-primary me-2" title="Edit" @click="openEditModal(props.row)" data-bs-toggle="modal" :data-bs-target="'#modal-' + props.row.id">
   <svg  class="w-6 h-6 text-gray-800 dark:text-white" 

                                aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" 
                                 width="24" height="24" fill="none" 
                                 viewBox="0 0 24 24"
                             
                              >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>                                  

                                    </a>
                <a v-if="user_permissions.includes('can_delete_wages')" href="javascript:void(0)" class="text-danger" title="Delete" @click="deleteLabourType(props.row.id)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm2 .5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1H14a1 1 0 0 1 1 1zm-11-1a.5.5 0 0 0-.5.5V4h11V2.5a.5.5 0 0 0-.5-.5h-10zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118z"/>
    </svg>
</a>
  <a v-if=" props.row.engineer === 'Unapproved' &&  user_permissions.includes('can_approve_wages') "  href="javascript:void(0)" class="text-success" title="Approve" 
     @click="approvalLabourType(props.row.id)"  
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>

   <a v-if=" props.row.engineer === 'approved' &&  props.row.md === 'Unapproved' &&  user_permissions.includes('is_md') "  href="javascript:void(0)" class="text-success" title="Approve" 
     @click="mdApprovalLabourType(props.row.id)"  
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>

 <a  v-if="props.row.engineer !== 'Unapproved' && user_permissions.includes('can_approve_wages')" href="javascript:void(0)" class="text-warning ms-2" title="Unapprove" @click="unapprovalLabourType(props.row.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </a>

                                    <a  v-if="props.row.md !== 'Unapproved'  && user_permissions.includes('is_md')" href="javascript:void(0)" class="text-warning ms-2" title="Unapprove" @click="mdUnapprovalLabourType(props.row.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </a>


  <div class="modal fade modal-bg" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false" >
    <div class="modal-dialog  modal-lg ">
        <!-- modal-dialog-centered -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Update Labour type Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="updateLabourType">
          <div class="modal-body">
            <div class="row">
                <div class="row mb-2">
    
            <div class="col-md-6">
                <label class="form-label">Labor Type Name</label>
                <input type="text" class="form-control" placeholder="Enter Labour Type Name" v-model="labour_type_name">
            </div>          

            <div class="col-md-6">
                <label class="form-label">Rate</label>
                <input type="number" class="form-control" placeholder="Enter rate" v-model="rate"  step="any" >
            </div>
            
        </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="closeinput();">Close</button>
            <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</template>
                        </v-client-table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- approval modal -->
     <!-- Button to trigger modal -->
<!-- Modal -->
<div class="modal fade modal-bg" id="noBackdropModal" tabindex="-1" aria-labelledby="noBackdropModalLabel" aria-hidden="true" data-bs-backdrop="false">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noBackdropModalLabel">LABOUR WAGES APPROVAL</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- approval levels -->
             <div class="row layout-top-spacing">
         <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
           <div class="panel p-0">
                <div class="d-flex">
                   <h6 class="text-center mt-2 mx-2">Approval Status</h6>
                 </div>  
               <div class="custom-table table3 table-responsive">
                   <table class="table">
                       <thead>
                           <tr>
                               <th >Engineer </th>                                 
                               <th>MD</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>


                               <td :class="engineer_status.value === 'approved' ? 'text-danger' : 'text-success'">
                                    {{ engineer_status.value === 'Unapproved' ? 'unchecked' : 'checked' }}
                                    
                                </td>

                               <td :class="md_status.value === 'approved' ? 'text-danger' : 'text-success'">
                                   {{ md_status.value === 'unapproved' ? 'unchecked' : 'checked' }}
                                  
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
       </div>
          
         <!-- approval levels ends -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
     <!-- approval modal ends -->
</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref,inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });
    const showMessage = inject('showMessage');
    const showError = inject('showError');  
    const loading_spinner = ref(false);
    const labour_type_name = ref('');
    const rate = ref('');   
    const user_role = ref('');
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const columns = ref(['Sn','labour_type_name','rate','engineer','md','actions']);
    const labour_types = ref([ ]);
    const md_status= ref('');
    const engineer_status = ref('');
    const labour_type_registration = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['Sn','User ID' ],
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
    // api base user creation for sample 
 
       const triggerNotification = async (phone,sender,action) => {
  const recipientPhone = phone;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

  const requestData = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhone,
    "type": "template",
    "template": {
        "name": "notification",
        "language": {
            "code": "en"
        },
        "components": [
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
                ]
            }
        ]
    }
};
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
  } catch (error) {
    console.error('Error:', error);
  }
};
    

    const axiosInstance = axios.create({
      //  baseURL: process.env.VUE_APP_API_BASE_URL
         baseURL : "https://construction.trustdigital.space/api/v1/"
    });
    const getLabourType = () => {
        loading_spinner.value = true;
         axiosInstance.get('labour-types').
         then((response) => {          
               labour_types.value = response.data.map((labour_type, index) => {
                return{
                Sn: index + 1,
                id:labour_type.id,
                rate: Number(labour_type.rate).toLocaleString(),               
                labour_type_name: labour_type.name,
                engineer:labour_type.status ,
                md:labour_type.md_status, 

                }
            })
            loading_spinner.value = false;
        });
    };
    //method fro register users
    const registerLabourType= () => {
       
    if (!labour_type_name.value || !rate.value) {
    showError("Please!..Provide Labour Type Name and Email.");
    return;
   }
     labour_type_registration.value = false;
   loading_spinner.value = true;
   const labour_typeData = {
            name:labour_type_name.value,
            rate:rate.value,                 
           
        };
        axiosInstance
            .post('labour-types', labour_typeData)
            .then((response) => {
               getLabourType();
                loading_spinner.value = false;
                closeinput(); 
                 triggerNotification('255677771888','Engineer','new labour wages awaiting for your approval') 
                showMessage('Labour Type registered successfully!');
            })
            .catch((error) => {
                loading_spinner.value = false;
                console.error("Error registering Labour Type:", error.message);
                 showError("Fail to register Labour Type" ,error);    
            });
           
            
    };

    //for editing the user details
    const updateLabourType = async () => {
        loading_spinner.value = true;
        try {
            const updatedLabourType = {
                name: labour_type_name.value,
                rate: rate.value,
                status:'Unapproved',
                md_status:"Unapproved",
            };
            const response = await axiosInstance.put(`labour-types/${labour_type_id.value}`, updatedLabourType);
            if (response.status === 200) {
                // triggerNotification('255677771888','Engineer','changes on labour wages awaiting for your approval')
                getLabourType();
                showMessage('Labour Type updated successfully!');
                closedinput();
            } else {
                showError("Failed to update Labour Type.");
            }
        } catch (error) {
            showError("Error updating Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };

     const deleteLabourType = async (id) => {
        loading_spinner.value = true;
        try {
           
            const response = await axiosInstance.delete(`labour-types/${id}`);
            if (response.status === 200) {
                getLabourType();
                showMessage('Labour Type deleted successfully!');
                closedinput();
            } else {
                showError("Failed to deleted Labour Type.");
            }
        } catch (error) {
            showError("Error Deleted Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };


    const approvalLabourType = async (id) => {
        loading_spinner.value = true;
        try {
            const updatedLabourType = {
                status: "approved",               
            };
            const response = await axiosInstance.put(`labour-types/${id}`, updatedLabourType);
            if (response.status === 200) {
                getLabourType();
                //  triggerNotification('255713222333','Managing DIrector','new labour wages awaiting for your approval') 
                showMessage('Labour Type approved successfully!');
                closedinput();
            } else {
                showError("Failed to approvedLabour Type.");
            }
        } catch (error) {
            showError("Error approved Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };

     const mdApprovalLabourType = async (id) => {
        loading_spinner.value = true;
        try {
            const updatedLabourType = {
                md_status: "approved",               
            };
            const response = await axiosInstance.put(`labour-types/${id}`, updatedLabourType);
            if (response.status === 200) {
                getLabourType();
                //  triggerNotification('255677776663','HR','approved labour wages that you recently created.') 
                showMessage('Labour Type approved successfully!');
                closedinput();
            } else {
                showError("Failed to approvedLabour Type.");
            }
        } catch (error) {
            showError("Error approved Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };

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
    const unapprovalLabourType = async (id) => {
        loading_spinner.value = true;
        try {
            const updatedLabourType = {
                status: "Unapproved",               
            };
            const response = await axiosInstance.put(`labour-types/${id}`, updatedLabourType);
            if (response.status === 200) {
                getLabourType();
                showMessage('Labour Type unapproved successfully!');
                closedinput();
            } else {
                showError("Failed to unapprovedLabour Type.");
            }
        } catch (error) {
            showError("Error unapproved Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };

     const mdUnapprovalLabourType = async (id) => {
        loading_spinner.value = true;
        try {
            const updatedLabourType = {
                md_status: "Unapproved",               
            };
            const response = await axiosInstance.put(`labour-types/${id}`, updatedLabourType);
            if (response.status === 200) {
                getLabourType();
                showMessage('Labour Type unapproved successfully!');
                closedinput();
            } else {
                showError("Failed to unapprovedLabour Type.");
            }
        } catch (error) {
            showError("Error unapproved Labour Type: " + (error.response?.data?.message || error.message));
        } finally {
            loading_spinner.value = false;
        }
    };
 const labour_type_id = ref('');
 const openEditModal = (row) => { 
  labour_type_id.value = row.id;
  rate.value = Number(row.rate.toString().replace(/,/g, ''));
  labour_type_name.value = row.labour_type_name;
}

const  closedinput = () => {
labour_type_id.value = '';
rate.value= '';
labour_type_name.value ='';
 }

    onMounted(() => {
       getLabourType();
    });
</script>

<style scoped>
.modal-bg{
  background-color: rgba(128, 128, 128, 0.508);
}
</style>