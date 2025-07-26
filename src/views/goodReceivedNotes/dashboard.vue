<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;"
                                    >Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page" ><span>GRNs</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
                    <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
        <div class="d-flex"
        v-if="user_permissions.includes('can_delete_lpo')"
        >
            <div class="ms-auto me-5 mt-3 text-dark" style="cursor: pointer;" @click="unlock  =! unlock">
  <svg v-if="!unlock" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
  
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"/>
</svg>

            </div>
         </div>
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="grns" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">
                                <div class="d-flex justify-content-center align-items-center"></div>
                                    <a href="javascript:;" class="edit me-2" >
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
                                                class="text-primary"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#view_items"
                                                @click="fillModal(props.row)"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                    </a>
<a href="javascript:;" style="color: #25D366;"
data-bs-toggle="modal" data-bs-target="#send_message"
@click="fillModal(props.row)"
class="me-2"
>
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
</a>

<a href="javascript:;"
 class="text-danger"
 v-if="unlock"
 >
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
</a>



                    
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>


 <!-- Edit Grn Modal -->
<div class="modal fade mymodal" id="view_items" data-bs-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document"> <!-- Changed to modal-xl and added scrollable -->
        <div class="modal-content"> <!-- Added min-height -->
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">GOODS RECEIVED LIST </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss" @click="clearForm"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-2">
                        Receiver : {{ receiver }}
                    </div>
                    <div
                      v-if="remarks_original !== ''"
                    class="col-md-2">
                        Remark : {{ receiver_remarks }}
                    </div>
                    </div>
                    <div class="row">
        <div  
        v-if="remarks_original === ''"
        class="col-md-12">
<form class="mt-2" @submit.prevent="addRemark(grn_id)">
  <div class="d-flex">
            <Multiselect
  v-model="store"
  :options="stores"
  :close-on-select="true"
  label="name"
  value-prop="id"
  placeholder="Select Store"  
  :searchable="true" 
/>

    <input type="text" class="form-control me-2" placeholder="Enter Remarks" v-model="receiver_remarks" required>
    <button type="submit" class="btn btn-info btn-sm px-2 py-1">
      <div v-if="sending" class="spinner-border text-white" role="status">
         <span class="sr-only"></span>
       </div>
       <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"/>
        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
      </svg>
    </button>
  </div>
</form>
                    </div>
                </div>
               <!-- items table starts -->
                       <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3 table-responsive">
                      <table class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>SNo</th>
                            <th>Item</th>
                            <th>Desription</th>
                            <th>Unit</th>
                            <th>Expected</th>
                            <th>Excess</th>
                            <th>Shortage</th>
                            <th  v-if="remarks_original === ''">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in items">
                            <td>{{ item.SNo }}</td>
                            <td>{{ item.item }} </td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.unit }}</td>
                            <td>{{ item.expected }}</td> 
                            <td >
                              <input 
                              v-if="edit == item.id "
                              type="number" class="form-control  w-50" placeholder="Excess" v-model="excess">
                              <span v-else>
                              {{ item.excess }}
                              </span>
                            </td>
                            <td>
                               <input 
                               v-if="edit == item.id "
                               type="number" class="form-control w-50" placeholder="shortage" v-model="shortage">
                               <span v-else>
                               {{ item.shortage }}</span>
                            </td>
                            <td  v-if="remarks_original === ''">
                              <div 
                              v-if="remarks_original === ''"
                              style="cursor: pointer;">
<svg
    @click="edit = '', updateGrnItem(item.id)"
v-if="edit === item.id "

                              xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-success bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>


                              <svg
                              @click="edit = item.id "
                              v-else
xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                              </div>
                              
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>

                <!-- items table ends -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="clearForm">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- send message modal starts -->


<!-- Modal -->
<div class="modal fade" id="send_message" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Send Report To :</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close_report" @click="clearForm"></button>
      </div>
      <div class="modal-body">
        <input type="number" class="form-control" v-model="phone" placeholder="Send to : 255...">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-sm py-2 px-2" data-bs-dismiss="modal">Close</button>
        <button type="button" 
        @click="sendTemplate()"
        class="btn btn-success py-2 px-2">
              <div v-if="sending" class="spinner-border text-white" role="status">
         <span class="sr-only"></span>
       </div>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
 <!-- send messge modal ends -->




   </div>
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
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const sending = ref(false)
    const loadingIndicator = inject('loadingIndicator');
    const user  = JSON.parse(localStorage.getItem("user"));
    const reporting = ref(false)
    const receiver_remarks = ref('');
    const remarks_original = ref('')
    const loading_spinner = ref(false);
    const columns = ref(['SNo', 'grn_no','lpo_no','project','receiver','remarks','actions']);
    const items_column = ref(['SNo', 'item','unit','expected','excess','shortage']);
    const grns = ref([]);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const unlock = ref(false);
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const store = ref('');
    const table_option = ref({
        perPage: 10,
        perPageValues: [10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
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


const stores = ref([])
 const getStores = (id) => {
        axiosInstance.get(`/stores`).then((response) => {
            stores.value = response.data.map((item, index) => ({
                ...item,
                name: item.project +" - "+item.name,
            }));
        });
    };

const edit = ref('')
const phone = ref()
const sendTemplate = async () => {
    sending.value=true
 console.log('sending ...');
  const recipientPhone = phone.value;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

const requestData = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": recipientPhone,
  "type": "template",
  "template": {
    "name": "grn_report",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": receiver.value },
          { "type": "text", "text": 'GRN-00'+grn_id.value },
          { "type": "text", "text": formatDate(received_date.value) },
          { "type": "text", "text": receiver_remarks.value }
        ]
      },
      {
        "type": "button",
        "sub_type": "url",
        "index": 0,
        "parameters": [
          { "type": "text", "text": `?grn_no=${grn_id.value}` }
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
    showMessage('Messaage sent')
    clearForm()
    console.log('sent to ',phone.value);
  } catch (error) {
    console.error('Error:', error);
  }
};

  const clearForm = () =>{
    getGrns()
    document.getElementById('dismiss').click()
    document.getElementById('close_report').click()
    receiver.value = '',
    receiver_remarks.value = '',
    remarks_original.value = ''
    reporting.value = false
    phone.value = ''
    sending.value=false
    edit.value = ''
    store.value = ''
  }

  const items = ref([])
  const receiver = ref('')
  const grn_id = ref(0)
  const received_date = ref('')
  const fillModal = (row) => {
  grn_id.value = row.id  
  receiver_remarks.value = row.remarks_original
  remarks_original.value = row.remarks_original
  receiver.value = row.receiver
  received_date.value = row.updated_at
  items.value = (row.items || []).map((data, index) => ({
    SNo: index + 1,
    id : data.id,
    asset_id : data.asset_id,
    unit : data.grn_items?.unit_measure,
    expected : data.grn_items?.quantity  ?? '',
    item: data.grn_items?.category ?? '',
    description : data.grn_items?.description ?? '',
    excess: data.excess,
    shortage: data.shortage
  }))

}

 const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // gives YYYY-MM-DD
};   

        const addRemark = async (id) => {
         sending.value= true
         const remarkData ={
               remarks : receiver_remarks.value,
               user_id : user.id,
              }
        const bulkData = {
            remarkData : remarkData,
            itemData : items.value.map(item => ({
                item_id: item.asset_id,
                quantity : Number(item.expected) + Number(item.excess) - Number(item.shortage),
                store_id : store.value.id,
            }))
        }
              // showMessage('Sending Receive Note...' )
              // console.log('bulkData',bulkData);
              // return ;
    try {
        const response = await axiosInstance.put(`/good-received-notes/${id}`,bulkData);
        showMessage('Receive Note Sent!');
        const index = grns.value.findIndex(g => g.id === id);
if (index !== -1) {
  grns.value[index].remarks = receiver_remarks.value;
  grns.value[index].remarks_original = receiver_remarks.value;
  grns.value[index].receiver = user.name;
}
        clearForm()

    } catch (error) {
        showError(error.message)
        console.error('Error:', error);
    }finally{
        sending.value = false
    }
};

        const excess = ref('')
        const shortage = ref('')
const updateGrnItem = async (id) => {
    // Set defaults
    if (excess.value === '') excess.value = 0;
    if (shortage.value === '') shortage.value = 0;

    // Convert to number
    const excessVal = Number(excess.value);
    const shortageVal = Number(shortage.value);

    // Update local items list first
    const index = items.value.findIndex(g => g.id === id);
    if (index !== -1) {
        items.value[index].excess = excessVal;
        items.value[index].shortage = shortageVal;
    }

    // Skip API if both values are zero
    if (excessVal === 0 && shortageVal === 0) return;

    const itemData = {
        excess: excessVal,
        shortage: shortageVal
    };

    try {
        await axiosInstance.put(`/update-grn-item/${id}`, itemData);
        excess.value = '';
        shortage.value = '';
    } catch (error) {
        showError('Update failed!');
        console.error(error);
    }
};

    const getGrns = () => {
        axiosInstance.get('/good-received-notes').then((response) => {
            grns.value = response.data.map((item, index) => ({
                ...item,
                SNo: index + 1,
                id: item.id,
                lpo_no : '0'+item.order_id,
                project : item?.order.project?.short_name ?? 'No Project',
                receiver : item.receiver?.name ?? "No Receiver",
                grn_no : 'GRN-00'+item.id,
                remarks : item.remarks ?? 'No remark',
                remarks_original : item.remarks ?? ''
            }));
            loading_spinner.value = false;
        });
    };



    onMounted(() => {
        loading_spinner.value = true;
        getGrns();
        getStores();
    });
</script>
<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }</style>
