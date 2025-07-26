<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Custom</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="seperator-header layout-top-spacing">
        </div>
        <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                     <div class="d-flex justify-content-between align-items-center mb-3">  

                <div class="ms-auto">
                        <button class="btn btn-success" @click="printTable">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-1">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Print Report
                        </button>
                    </div>
    </div>
                
                <!-- Add print button above the search area -->
                 <div class="d-flex justify-content-center align-items-center">
                        <select class="mt-1 mx-2 form-control w-25" v-model="selected_project" @change="getPurchaseOrderItems">
                            <option value="">ALL PROJECT</option>
                            <option v-for="project in projects" :value="project">{{ project.short_name }}</option>
                        </select>

                        <input type="date" class="form-control w-25" v-model="filling_date" @change="getPurchaseOrderItems()">
                      <button class="btn btn-primary mx-2" @click="filling_date='',selected_project='',getPurchaseOrderItems()">ALL Data</button>
                    </div>   
           
       
        <div class="row layout-top-spacing">            
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            
            </span>
        </div>
                        <v-client-table  :data="items" :columns="columns" :options="table_option">
                        <template #actions="props">
                              <div class="actions text-center">
                                <a class="btn btn-primary btn-sm p-1" href="javascript:;" @click="setRatioFormValues(props.row)" data-bs-toggle="modal" 
  :data-bs-target="'#modal-' + props.row.id">
 View
</a>
<span >
<a v-if="user_permissions.includes('can_edit_direct_fill')"   class="btn btn-dark p-1 mx-2" href="javascript:;" @click="setEditFormValues(props.row)" data-bs-toggle="modal" 
  :data-bs-target="'#modal1-' + props.row.id">
  edit
</a>
</span>


                                  &nbsp;
                              </div>
                              <!-- modal starts  -->
                              <div class="modal fade mymodal" data-bs-backdrop="false" :id="'modal-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content " >
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Ratio Filling Record for </h1><br>
       
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="fillRatio(selectedId)">
        <div class="modal-body">
               <h4 cmass="mb-5">{{ machine}}</h4>
<div class="row mt-3">
  <div class="col-md-5 ">
    <label class="form-label">Initial Reading</label>
    <input type="number" class="form-control" v-model="initial_reading">
  </div>

  <div class="col-md-5 ">
    <label class="form-label">Final Reading</label>
    <input type="number" class="form-control" step="any" v-model="final_reading">
  </div>

  <div class="col-md-2">
    <label class="form-label d-block">Lastly Full? </label>
    <div class="form-check">
      <input type="checkbox" class="form-check-input mt-3" id="machineFull" v-model="was_full" style="transform:scale(1.5)">
      <label class="form-check-label mt-3" for="machineFull" >{{ was_full || 'No' }}</label>
    </div>
  </div>

</div>

</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal"
           @click="
           whatsappNotification('255677141203',project,'2025-12-12','Plate No',asset_name,type,machine,fuel,initial_reading,final_reading,was_full,ratio),
           whatsappNotification2('255698267662',project,'2025-12-12','Plate No',asset_name,type,machine,fuel,initial_reading,final_reading,was_full,ratio),
           selectedId = props.row.id"
           >
            Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

                               <!-- modal ends -->
                                 <!-- edit  modal starts  -->
                              <div class="modal fade mymodal" data-bs-backdrop="false" :id="'modal1-' + props.row.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content " >
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Distribution  </h1><br>
       
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="editDistribution(selectedId)">
        <div class="modal-body">
<div class="row mt-3">
  <div class="col-md-12 ">
    <label class="form-label">Edit Details</label>
    <textarea class="form-control" v-model="machine"></textarea>
  </div>

</div>

</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" @click="selectedId = props.row.id">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

                               <!--edit  modal ends -->
                          </template>
                        </v-client-table>
                    </div>
                </div>
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
    import { onMounted, ref,inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import axios from "axios";
    useMeta({ title: 'Bulk Statement' });
      
    const columns = ref(['SNo' ,'Machine','type','fuel_quantity','initial','final','ratio','date', 'actions',]);
    const items = ref([]);
    const loading = ref(true); // Add loading state
    const was_full = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError'); 
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo' ,'LPO_Number','Machine','date', 'fuel_quantity','rate','total','initial','final', 'date_created'],
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

    const axiosInstance = axios.create({

        baseURL:process.env.VUE_APP_API_BASE_URL
    });
    const filling_date = ref('');
    const getPurchaseOrderItems = async () => {
        loading.value = true; // Set loading to true when fetching data
    try {
        const response = await axiosInstance.get("/items");
        let filteredData = response.data;
        
        
        // Apply project filtering if project is selected
        if (selected_project.value?.id) {
            filteredData = filteredData.filter(item => item.project_id === selected_project.value.id && item.consuption !== 'not_machine');
        }
        
        // Apply final status and description filtering
const filteredResponse = filteredData.filter(item => {
    const itemDate = item.created_at?.split('T')[0];
    return (
        item.status === 'approved' &&
        item.consuption !== 'not_machine' &&
        (filling_date.value === '' || itemDate === filling_date.value)
    );
});


        
        // Map to final output format
items.value = filteredResponse.map((item, index) => {
    const ratio = item.was_full === 1
        ? (item.consuption === 'km/Litre'
            ? ((item.final - item.initial) / item.quantity).toFixed(2) + ' km/Litre'
            : (item.quantity / (item.final - item.initial)).toFixed(2) + ' Litre/hr')
        : '--';

    return {
        'SNo': index + 1,
        'id': item.id,
        'LPO_Number': item.id,
        'project':item.project.short_name,
        'asset_name':item.asset_name,
        'fuel_quantity': item.quantity,
        'Machine': item.description,
        'type':item.type,
        // 'rate': Number(item.rate).toLocaleString('en-US')+'/=',
        // 'total': (item.rate * item.quantity).toLocaleString('en-US')+' /=',
        'date': new Date(item.created_at).toISOString().split('T')[0].replace(/-/g, '.'),
        'initial': item.initial,
        'final': item.final,
        'ratio': ratio,
    };
});



        // Set loading to false after data is fetched
        
    } catch (error) {

        console.error("Error fetching purchase order items:", error);
        showError(error.message);
    } finally {
        loading.value = false;
    }
};
   
 
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const loading_spinner = ref(false);
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const selected_project = ref('');
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
                }else{
                    filteredData = filteredData.filter(project =>project.company_id == 6); 
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

    const initial_reading = ref('');
    const final_reading = ref('');
    const machine = ref('');
    const selectedId = ref('');
    const type = ref('');
    const ratio = ref('');
    const fuel = ref('');
    const project = ref('');
    const asset_name = ref('');
    const setRatioFormValues = (record) => {
        selectedId.value = record.id;
        machine.value = record.Machine;  
        initial_reading.value = record.initial;
        final_reading.value = record.final;
        type.value = record.type;
        ratio.value= record.ratio;
        fuel.value= record.fuel_quantity;
        project.value= record.project;
        asset_name.value = record.asset_name;
    };

     const setEditFormValues = (record) => {
        selectedId.value = record.id;
        machine.value = record.Machine;  
    };

    const fillRatio = (id) => {
        loading.value = true;
        const updateRatioData = {
            initial_odometer_reading: initial_reading.value,
            final_odometer_reading: final_reading.value,
            was_full: was_full.value,
        };

        axiosInstance
            .put(`/items/${id}`, updateRatioData)
            .then((response) => {
                getPurchaseOrderItems();
                loading.value = false;
                showMessage("Updated successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error updating ratio", error);
                loading_spinner.value = false;
            });
    };

        const editDistribution = (id) => {
        loading.value = true;
        const updateEditedData = {
            description: machine.value,
        };

        axiosInstance
            .put(`/items/${id}`, updateEditedData)
            .then((response) => {
                getPurchaseOrderItems();
                loading.value = false;
                showMessage("Updated successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error updating record", error);
                loading_spinner.value = false;
            });
    };

     const whatsappNotification = async (phone,project,date,asset,asset_name,asset_type,description,fuel,initial_odometer_reading,final_odometer_reading,tank_status,ratio) => {
  const recipientPhone = phone;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

  const requestData = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhone,
    "type": "template",
    "template": {
        "name": "ratios",
        "language": {
            "code": "en"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": project 
                    },
                    {
                        "type": "text",
                        "text": new Date().toISOString().split('T')[0]
                    },

                     {
                        "type": "text",
                        "text": asset 
                    },

                      {
                        "type": "text",
                        "text": asset_name 
                    },

                      {
                        "type": "text",
                        "text": asset_type 
                    },

                      {
                        "type": "text",
                        "text": description 
                    },

                      {
                        "type": "text",
                        "text": fuel 
                    },

                      {
                        "type": "text",
                        "text": initial_odometer_reading 
                    },
                    
                      {
                        "type": "text",
                        "text": final_odometer_reading
                    },
                    
                        {
                        "type": "text",
                        "text": tank_status 
                    },

                        {
                        "type": "text",
                        "text": ratio 
                    },

                        {
                        "type": "text",
                        "text": JSON.parse(localStorage.getItem("user")).name
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

 const whatsappNotification2 = async (phone,project,date,asset,asset_name,asset_type,description,fuel,initial_odometer_reading,final_odometer_reading,tank_status,ratio) => {
  const recipientPhone = phone;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

  const requestData = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhone,
    "type": "template",
    "template": {
        "name": "ratios",
        "language": {
            "code": "en"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": project 
                    },
                    {
                        "type": "text",
                        "text": new Date().toISOString().split('T')[0]
                    },

                     {
                        "type": "text",
                        "text": asset 
                    },

                      {
                        "type": "text",
                        "text": asset_name 
                    },

                      {
                        "type": "text",
                        "text": asset_type 
                    },

                      {
                        "type": "text",
                        "text": description 
                    },

                      {
                        "type": "text",
                        "text": fuel 
                    },

                      {
                        "type": "text",
                        "text": initial_odometer_reading 
                    },
                    
                      {
                        "type": "text",
                        "text": final_odometer_reading
                    },
                    
                        {
                        "type": "text",
                        "text": tank_status 
                    },

                        {
                        "type": "text",
                        "text": ratio 
                    },

                        {
                        "type": "text",
                        "text": JSON.parse(localStorage.getItem("user")).name
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


    onMounted(() => {
        getPurchaseOrderItems();
        getProjects();
        console.log('user perm',user_permissions);
    });

    const printTable = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Get the current date for the report header
        const currentDate = new Date().toLocaleDateString();
        
        // Filter out any hidden columns and prepare visible columns
        const visibleColumns = columns.value.filter(col => col !== 'actions');

        // Get the type filter text for the title
      const typeFilterText = selected_project.value === '' ? 'All PROJECT' : ` ${selected_project.value.short_name}`;
        
        // Create the HTML content for printing
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Direct Fill Report  ${typeFilterText} </title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                    }
                    .report-info {
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: space-between;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                    @media print {
                        @page {
                            size: landscape;
                            margin: 10mm;
                        }
                    }
                </style>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    }
                <\/script>
            </head>
            <body>
                <div class="header">
                    <h1>Direct Fill Report <br> <br> ${typeFilterText}</h1> 
                </div>
                
                <div class="report-info">
                    <div>
                        <strong>Date Generated:</strong> ${currentDate}
                    </div>
                    <div>
                        <strong>Total Records:</strong> ${items.value.length}
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            ${visibleColumns.map(col => `<th>${col}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${items.value.map(item => `
                            <tr>
                                ${visibleColumns.map(col => {
                                    // Format numbers with commas
                                    if (typeof item[col] === 'number') {
                                        return `<td>${item[col].toLocaleString()}</td>`;
                                    }
                                    // Return regular cell
                                    return `<td>${item[col] || ''}</td>`;
                                }).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>This report is system generated. For any queries, please contact the administrator.</p>
                </div>
            </body>
            </html>
        `);
        
        // Close the document
        printWindow.document.close();
    };
</script>

<style>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }
</style> 
