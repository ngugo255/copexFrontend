<template>
  <div class="layout-px-spacing">
    <div class="d-flex justify-content-between align-items-center">
      <div class="flex-grow-1 text-center">
        <div 
          class=" mt-5" 
          :style="{ opacity: 1 - 0.1 * clickCount, transition: 'opacity 0.5s' }"
        >
      <div class="d-flex align-items-center justify-content-between mb-3">
  <h4 class=" mb-0" @click="handleClick" style="cursor:pointer;">
    BILL OF QUANTITY 
  </h4>

  <div class="w-25 ms-auto">
    <multiselect 
      v-model="project"
      track-by="id"
      :options="projects"
      label="short_name"
      placeholder="Select A Project"
      :required="true"
      :searchable="true"
      multple="false"
    ></multiselect>
  </div>
</div>

<div v-if="addBoq" class="d-flex justify-content-end mb-2">
  <button @click="addBoq = false" class="btn btn-secondary">View BOQ</button>
</div>

<div v-if="project && !addBoq" class="d-flex justify-content-end mb-2">
  <button @click="addBoq = true" class="btn btn-primary">Add BOQ</button>
</div>

<!-- boq registration starts -->
<div v-if="addBoq" class="accordion accordion-flush" id="accordionFlushExample">
  <div class="bg-dark mt-2 mb-2">
    <h6 class="text-center text-white m-0">{{ project.project_name }}</h6>
  </div>

  <div class="d-flex mb-2">
    <div class="ms-auto">
      <button class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#seriesModal"
              @click="series = ''">
        Add Series
      </button>
    </div>
  </div>

  <div v-for="(item, b) in boq" class="accordion-item" style="border:1px solid green">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#accordion${item.id}`"
              aria-expanded="false"
              :aria-controls="`accordion${item.id}`">
        {{ b + 1 }}. {{ item.name }}
      </button>
    </h2>
    <div :id="`accordion${item.id}`" class="accordion-collapse collapse">
      <div class="accordion-body">

        <!-- Add Section Button -->
        <div class="d-flex mb-2">
          <div class="ms-auto">
            <button class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#sectionModal"
                    @click="series = item">
              Add Section
            </button>
          </div>
        </div>

        <!-- Section Accordion -->
        <div :id="`accordionSeries${item.id}`" class="accordion">
          <div v-for="(lsection, s) in item.sections" class="accordion-item" style="border:1px solid orange">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#section${lsection.id}`"
                      aria-expanded="false"
                      :aria-controls="`section${lsection.id}`">
                {{ s + 1 }}. {{ lsection.name }}
              </button>
            </h2>
            <div :id="`section${lsection.id}`"
                 class="accordion-collapse collapse"
                 :data-bs-parent="`#accordionSeries${item.id}`">
              <div class="accordion-body">

                <!-- Add Sub Section Button -->
                <div class="d-flex mb-2">
                  <div class="ms-auto">
                  <button class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#subSectionModal"
        @click="section = lsection; newSubSectionName = ''">
  Add Sub Section
</button>
                  </div>
                </div>

                <!-- Sub Section Accordion -->
                <div :id="`accordionSub${lsection.id}`" class="accordion">
                  <div v-for="(subsection, sb) in lsection.sub_sections" class="accordion-item" style="border:1px solid blue">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button"
                              data-bs-toggle="collapse"
                              :data-bs-target="`#sub${subsection.id}`"
                              aria-expanded="false"
                              :aria-controls="`sub${subsection.id}`">
                        {{ sb + 1 }}. {{ subsection.name }}
                      </button>
                    </h2>
                    <div :id="`sub${subsection.id}`"
                         class="accordion-collapse collapse"
                         :data-bs-parent="`#accordionSub${lsection.id}`">
                      <div class="accordion-body">

                        <!-- Add Line Button -->
                        <div class="d-flex mb-2">
                          <div class="ms-auto">
                            <button class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#lineModal"
                                    @click="sub_section = subsection">
                              Add Line
                            </button>
                          </div>
                        </div>

                        <!-- Line List -->
                        <!-- Line List -->
<table class="table table-bordered table-sm">
  <thead >
    <tr>
      <th>SN</th>
      <th>Name</th>
      <th>Unit</th>
      <th>Quantity</th>
      <th>Rate</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(line, li) in subsection.lines" :key="line.id">
      <td class="text-center">{{ li + 1 }}</td>
      <td class="text-start">{{ line.name }}</td>
      <td>{{ line.unit }}</td>
      <td>{{ line.quantity }}</td>
      <td class="text-end">{{ (line.rate).toLocaleString() }}</td>
      <td class="text-end">{{ (line.quantity * line.rate).toLocaleString() }}</td>
    </tr>
  </tbody>
</table>
<!-- End Line List -->

                        <!-- End Line List -->

                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sub Section Accordion -->

              </div>
            </div>
          </div>
        </div>
        <!-- End Section Accordion -->

      </div>
    </div>
  </div>
</div>

        <!-- boq registration ends -->
          <!-- boq table starts -->

          <table v-else class="table table-bordered mt-4" v-if="project">
            <thead class="thead-light">
              <tr>
                <th scope="col" class="text-dark">Code/SN</th>
                <th scope="col" class="text-dark">Description</th>
                <th scope="col" class="text-dark">Unit</th>
                <th scope="col" class="text-dark">Quantity</th>
                <th scope="col" class="text-dark">Rate</th>
                <th scope="col" class="text-dark">Total</th>
              </tr>
            </thead>
     <tbody>
  <tr>
    <td colspan="6" class="bg-dark text-white">
      Bill of Quantity {{ project.project_name }}
    </td>
  </tr>

  <template v-for="(series ,i) in boq">
    <tr>
      <th colspan="1" class="text-center">SERIES {{i+1}}</th>
      <th colspan="5" class="text-start">{{ series.name }}</th>
    </tr>

    <template v-for="(section,j) in series.sections">
      <tr>
        <th colspan="1" class="text-center">Section {{ i+1 }}.{{j+1}}</th>
        <th colspan="5" class="text-start">{{ section.name }}</th>
      </tr>

      <template v-for="(sub_section,k) in section.sub_sections">
        <tr>
          <th colspan="1" class="text-center">{{ i+1 }}.{{ j +1 }}.{{ k+1 }}</th>
          <th colspan="5" class="text-start">{{ sub_section.name }}</th>
        </tr>

  <template v-for="(line, a) in sub_section.lines">
  <tr>
    <td class="text-center">{{ String.fromCharCode(97 + a) }}</td>
    <td class="text-start">{{ line.name }}</td>
    <td>{{ line.unit }}</td>
    <td>{{ line.quantity }}</td>
    <td class="text-end">{{ line.rate.toLocaleString() }}</td>
    <td class="text-end">{{ (line.rate * line.quantity).toLocaleString() }}</td>
  </tr>
</template>

      </template>
    </template>
  </template>
  <div v-if="boq.lenght == 0">No Series Set for this project</div>
</tbody>

          </table>
        <div v-if="boq.length === 0 && project" class="text-center">No BoQ set for this project</div>
        <div v-else-if="!project" class="text-center">Select a project to see its BOQ</div>
          <!-- boq table ends -->
        </div>

      </div>    
    </div>

  </div>
  <!-- series register modal starts -->
<div class="modal fade " id="seriesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content ">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add BOQ Items for {{ project.short_name }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
      </div>
    <form @submit.prevent="registerSeries">
      <div class="modal-body">
            <input type="text" class="form-control" v-model="series" placeholder="Enter Series">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
    </div>
  </div>
</div>
   <!-- series register modal ends -->
    <!-- section register modal starts -->
     <div class="modal fade " id="sectionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content ">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add BOQ section for {{ series.name }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSection"></button>
      </div>
    <form @submit.prevent="registerSection()">
      <div class="modal-body">
            <input type="text" class="form-control" v-model="section" placeholder="Enter Section Name">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
    </div>
  </div>
</div>
     <!-- section register modal ends -->
          <!-- Sub section register modal starts -->
     <div class="modal fade " id="subSectionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content ">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add BOQ sub section for {{ section.name }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSubSection"></button>
      </div>
    <form @submit.prevent="registerSubSection()">
      <div class="modal-body">
           <input type="text" class="form-control" v-model="newSubSectionName" placeholder="Enter Sub Section Name">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
    </div>
  </div>
</div>
     <!-- Sub section register modal ends -->

      <!-- boq registration line starts -->
            <div class="modal fade " id="lineModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content ">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add BOQ line  for {{ sub_section.name }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeLine"></button>
      </div>
    <form @submit.prevent="registerBoqLine()">
      <div class="modal-body">
          <div class="row">
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Enter Line Details" v-model="line.name">
            </div>
             <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Enter Unit" v-model="line.unit">
            </div>
             <div class="col-md-3">
              <input type="number" class="form-control" placeholder="Enter Quantity" v-model="line.quantity">
            </div>
             <div class="col-md-3">
              <input type="number" class="form-control" placeholder="Enter Rate" v-model="line.rate">
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
    </div>
  </div>
</div>
       <!-- boq registration line ends -->
</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref,inject,watch } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

const showMessage = inject('showMessage');
const showError = inject('showError');
const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
const addBoq = ref(false);
const project = ref('')
const projects = ref([])
    const getProjects = async () => {
    try {
        const response = await axiosInstance.get(`/projects`);
        if (response.data && Array.isArray(response.data)) {
            let filteredData = response.data;
            if (user_permissions.includes('can_view_copex_lpo') && user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData;
            } else if (user_permissions.includes('can_view_copex_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 6);
            } else if (user_permissions.includes('can_view_bushman_lpo')) {
                filteredData = filteredData.filter(project =>project.company_id == 5);
            }
             projects.value = filteredData;
        } else {
            console.error("Invalid response format");
        }
    } catch (error) {

    }
};

        watch(project, (newValue) => {
          getBoq(newValue.id)
       });

    const boq = ref([]);
    const getBoq = async (id) => {
    try {
        const response = await axiosInstance.get(`/boq?project_id=${id}`);
        boq.value= response.data.data
    } catch (error) {

    }
};


const series = ref('');
const registerSeries = async () => {
    try {
        const formData = {
            project_id: project.value.id,
            name: series.value
        };
        const response = await axiosInstance.post('/boq-series', formData);

        // Safely add new series
        boq.value.push({
            id: response.data.data?.id ?? Date.now(), // fallback if no ID returned
            name: formData.name,
            sections: []
        });

        showMessage("Series registered!");
        document.getElementById('close').click();
        series.value = '';
    } catch (error) {
        showError(error.message);
        console.log(error);
    }
};

const section = ref('')
const registerSection = async () => {
  try {
    const formData = {
      series_id: series.value.id,
      name: section.value
    };
    const response = await axiosInstance.post('/boq-sections', formData);

    // Push the new section into the correct series in boq
    const targetSeries = boq.value.find(item => item.id === series.value.id);
    if (targetSeries) {
      targetSeries.sections.push({
        id: response.data.id,
        name: formData.name,
        sub_sections: []
      });
    }

    showMessage("Section Registered!");
    document.getElementById('closeSection').click();
    section.value = '';
  } catch (error) {
    showError(error.message);
    console.log(error);
  }
};

const newSubSectionName = ref('');

const registerSubSection = async () => {
  try {
    const response = await axiosInstance.post("/boq-sub-sections", {
      name: newSubSectionName.value,
      section_id: section.value.id,
    });

    // Update the UI
    const newSubSection = response.data;
    if (!section.value.sub_sections) {
      section.value.sub_sections = [];
    }
    section.value.sub_sections.push(newSubSection);

    // Reset
    newSubSectionName.value = '';
    document.getElementById('closeSubSection').click();
    showMessage('sub section added!')
  } catch (error) {
    console.error("Error registering sub section:", error);
    showError("Failed to add sub section.");
  }
};

const sub_section = ref('')
const line = ref({
  name: '',
  unit: '',
  quantity: '',
  rate: ''
});

const registerBoqLine = async () => {
  try {
    const formData = {
      name: line.value.name,
      unit: line.value.unit,
      quantity: line.value.quantity,
      rate: line.value.rate,
      sub_section_id: sub_section.value.id
    };
    const response = await axiosInstance.post('/boq-lines', formData);

    // Push the new line into the correct subsection
    boq.value.forEach(seriesItem => {
      seriesItem.sections.forEach(sectionItem => {
        sectionItem.sub_sections.forEach(sub => {
          if (sub.id === formData.sub_section_id) {
            if (!sub.lines) sub.lines = [];
            sub.lines.push({
              id: response.data.id,
              name: formData.name,
              unit: formData.unit,
              quantity: formData.quantity,
              rate: formData.rate
            });
          }
        });
      });
    });

    showMessage("Line Registered!");
    document.getElementById('closeLine').click();
    line.value = { name: '', unit: '', quantity: '', rate: '' };
  } catch (error) {
    showError(error.message);
    console.log(error);
  }
};



    onMounted(() => {
     getProjects()
    });

const clickCount = ref(0);
function handleClick() {
  if(clickCount.value < 10) {
    clickCount.value++;
  }
}
</script>

<style scoped>
.accordion-button {
  background-color: transparent !important;
  /* color: white !important; */
  box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
  background-color: transparent !important;
  /* color: white !important; */
}

.accordion-button:focus {
  box-shadow: none !important;
}
</style>
