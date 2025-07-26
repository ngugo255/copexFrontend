<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active" aria-current="page"><span>Jobcards</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div class="d-flex me-4 mt-2">
                         
        <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
                        <div class="ms-auto">
                            <button class="btn btn-primary" @click="jobcard_registration=!jobcard_registration">                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
      <!-- jobcard registration form starts -->
    <form v-if="jobcard_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerAiModel">
        <h4  class="text-center"> AI MODEL REGISTRATION </h4>
        <div class="row mb-2">

            <div class="col-md-4">
                <label class="form-label">Model Name</label>
                <input type="text" class="form-control" placeholder="Enter Model Name" v-model="name" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Model Description </label>
                <input type="text" class="form-control" placeholder="Enter Model Description" v-model="description" required>
            </div>
             <div class="col-md-4">
                <label class="form-label">Source</label>
                <input type="text" class="form-control" placeholder="Enter Model Data Source" v-model="source" required>
            </div>
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="jobcard_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- jobcard registration form ends-->


        <div class="text-center"><h4>ARTIFICIAL INTELLIGENCE SAMPLES</h4>
 

        </div>
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                                      <!-- loading spinner starts -->
        <div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="height: 100px;">
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
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }}</span>
                            </template>
                            <template #actions="props">
                                <span 
                                @click="instructions = props.row.instructions,ai=props.row"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                class="text-primary"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </span>
                            </template>
                           
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- modal starts  -->
 <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6">
                <div class="d-flex">
                    <h5>MODEL INSTRUCTIONS </h5>
                    <div class="ms-auto">
                        <button 
                        @click="add_instruction =! add_instruction "
                        class="btn  btn-sm p-1"
                        :class="add_instruction ? 'btn-danger px-2' : 'btn-primary'"
                        >
                            {{ add_instruction ? 'X' : 'Add' }}
                        </button>
                    </div>
                </div>
               <form v-if="add_instruction" class="d-flex gap-2 mt-1 mb-1" @submit.prevent="addInstruction">
    <input type="text" class="form-control" placeholder="Fill Instructions for the modal" v-model="instruction" required>
    <button class="btn btn-primary  p-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg>
    </button>
  </form>
<ol class="instruction-list">
  <li v-for="(instruction, index) in instructions" :key="instruction.description" class="mt-2 position-relative pe-5">
    {{ instruction.description }}
    <button 
      class="btn btn-sm btn-danger position-absolute top-0 end-0 p-1 me-2 mt-1"
      @click="removeInstruction(index,instruction.id)"
    >✕</button>
  </li>
</ol>

            </div>
<div class="col-md-6">
  <div class="card shadow-sm p-3">
    <h5 class="mb-3 text-primary">🧠 Test AI Model</h5>
    <!-- Input & Button -->
    <form class="d-flex gap-2 mb-3" @submit.prevent="RequestAnswer">
      <input 
        type="text" 
        class="form-control" 
        placeholder="Ask something..." 
        v-model="question"
      >
      <button type="submit" class="btn btn-primary px-4">Ask</button>
    </form>

    <!-- Answer Display Card -->
    <div class="card bg-light border-0">
      <div class="card-body">
        <h6 class="text-muted">Response: {{ seconds }}s</h6>
        <p class="mb-0" style="white-space: pre-line">{{ answer || 'No response yet.' }}</p>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm p-2" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
 <!-- modal ends -->
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
    import '@/assets/sass/scrollspyNav.scss';
    const selected_machine = ref(null);
    const selected_service = ref(null);
    const machine_filter = ref(null);
    const current_km_of_service = ref('');
    const next_km_of_service = ref('');
    const loading_spinner = ref(true);
    const jobcard_registration = ref(false);
    const services = ref([]);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const aiAnswer = inject('aiAnswer');
    useMeta({ title: 'AI Masters' });
    const add_instruction = ref(false)
    const columns = ref(['Sno','id','name','description','source','actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id','status'],
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
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    
    const instructions = ref([''])
    const fetchAis = () => {
    loading_spinner.value = true;
    axiosInstance
        .get('/ai')
        .then((response) => {
         items.value = response.data.map((item, index) => ({
    ...item,
    Sno: index + 1,
    instructions: item.instructions,
    source : item.source ?? 'No source',
    data_source : item.source
}));

            loading_spinner.value = false;
        })
        .catch((error) => {
            showError(error.message);
            loading_spinner.value = false;
        });
};


const instruction = ref('');
const ai = ref('')
const addInstruction = async () => {
    const instructionData = {
        ai_id: ai.value.id,
        description: instruction.value,
    };

    try {
        const response = await axiosInstance.post(
            '/artificial-intelligence-training',
            instructionData
        );

        if (response && response.data) {
            // Assuming the response contains the full created instruction object including the ID
            instructions.value.push({
                id: response.data.id,
                description: response.data.description,
                ai_id: response.data.ai_id // optional if you need it
            });

            instruction.value = '';
        } else {
            showError('Unexpected response format');
        }
    } catch (error) {
        console.error('Error adding instruction:', error);
        showError('Error Occurred');
    }
};


const removeInstruction = (index,id) => {
  instructions.value.splice(index, 1);
  axiosInstance.delete(`/artificial-intelligence-training/${id}`);
};

const question = ref('')
const answer = ref('')

const aiAnswer2 = async (message) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        // model: 'mistralai/mistral-7b-instruct:free',
        model: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      }
    );

    return response.data.choices?.[0]?.message?.content || 'No answer received.';
  } catch (error) {
    console.error(error);
    return 'Failed to get an answer. Check the console for details.';
  }
};



const seconds = ref(0);
const timerInterval = ref(null);
const RequestAnswer = async () => {
  if (!question.value.trim()) {
    answer.value = 'Question cannot be empty.';
    return;
  }

  answer.value = 'Thinking...';
  seconds.value = 0;

  const startTime = performance.now();
  timerInterval.value = setInterval(() => {
    const now = performance.now();
    seconds.value = ((now - startTime) / 1000).toFixed(2);
  }, 50);

  try {
    let machineSummary = '';
    // ✅ Only fetch if source is a valid URL
    const sourceUrl = ai.value?.source;
    const isValidUrl = sourceUrl && sourceUrl.startsWith('http');

    if (isValidUrl) {
      try {
        const sourceResponse = await axios.get(sourceUrl);
        machineSummary = `Data from source:\n${JSON.stringify(sourceResponse.data, null, 2)}\n\n`;
      } catch (err) {
        console.warn('Failed to fetch source data:', err.message);
      }
    }

    const instructionText = instructions.value
      .map((i, index) => `${index + 1}. ${i.description}`)
      .join('\n');

    const seek =
      `You are a plain text responder. No Markdown, no special characters like **, -, #, etc.\n\n` +
      (machineSummary || '') +
      `You are giving assistance based on Instructions:\n${instructionText}\n\n` +
      `Now answer this question in clean plain English:\n${question.value}`;

    const rawResponse = await aiAnswer(seek);

    answer.value = rawResponse
      .replace(/\*\*/g, '')
      .replace(/[•*_`#>-]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  } catch (error) {
    console.error(error);
    answer.value = 'Error retrieving or processing data.';
  } finally {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    question.value = '';
  }
};



    const name = ref('')
    const description = ref( '')
    const source = ref('')
 const registerAiModel = () => {
    jobcard_registration.value = false;
    loading_spinner.value = true;

    const modelData = {
        name: name.value,
        description: description.value,
        source: source.value,
    };

    axiosInstance
        .post('/ai', modelData)
        .then((response) => {
            const newModel = response.data;

            // Push the new model into the array
            items.value.push({
                id: newModel.id,
                name: newModel.name,
                description: newModel.description,
                source: newModel.source
            });

            showMessage('Model registered successfully!');
            loading_spinner.value = false;

            // Optionally reset the form fields
            name.value = '';
            description.value = '';
            source.value = '';
        })
        .catch((error) => {
            showError(error.message);
            console.error(error);
            loading_spinner.value = false;
        });
};




    onMounted(() => {
        fetchAis();
    });
</script>

