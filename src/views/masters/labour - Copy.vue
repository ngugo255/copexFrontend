<template>
    <div class="layout-px-spacing">
  
        <div class="seperator-header layout-top-spacing">
            <div class="d-flex justify-content-between mt-3">
              <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
  </svg>
                </button>
                
                <div class="d-flex align-items-center">
                    <!-- Type filter dropdown -->
                    <div class="dropdown me-3">
                        <select class="form-select" v-model="selectedType" @change="filterByType">
                            <option value="all">All Labours</option>
                            <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
                        </select>
                    </div>
                    
                    <!-- Print button -->
                    <button class="btn btn-success " @click="printTable">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-1">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                        Print Report
                    </button>
                </div>
            </div>
        </div>
   <!-- <button @click="SuccessBox('','')">Success Box</button>  <br>
   <button @click="DeleteConfirmationbox('','')">Delete Confirmation Box</button>  <br>
    <button @click="ErrorBox('')">Error Box</button><br>
    <button @click="showMessage( 'success','success')">Show Message</button> -->





        <div class="mt-3 mx-2">     
          <div v-if="loading_spinner" class="text-center text-primary mt-2 mb-2">
            <span class="text-sm">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Please wait ... 
            </span>
          </div>
        </div>   
      
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <v-client-table :data="labours" :columns="columns" :options="table_option">
                            <!-- Add template for rate column to format numbers -->
                            <template #rate="props">
                                {{ formatCurrency(props.row.rate) }}
                            </template>


                            <!-- Actions column template -->
                            <template #actions="props">
                                <div class="d-flex align-items-center">
                                    <!-- Edit icon -->
                                    <a href="javascript:void(0);" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top" class="me-2">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="text-primary"
                                            @click="editLabour(props.row)"
                                        >
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </a>
                                    
                                    <!-- Delete icon -->
                                    <a href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
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
                                            @click="deleteLabour(props.row)"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </a>
                                </div>
                            </template>
                            <!-- Actions column template ends -->

                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- EDIT LABOUR MODAL -->
<div v-if="showEditModal" class="modal-overlay mymodal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Labour Details</h5>
        <button type="button" class="btn-close" @click="closeEditModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="saveEditedLabour">
          <div class="mb-3">
            <label for="editName" class="form-label">Name</label>
            <input 
              type="text" 
              class="form-control" 
              id="editName" 
              v-model="editForm.name"
              required
            >
          </div>
          <div class="mb-3">
            <label for="editDesignation" class="form-label">Designation</label>
            <input 
              type="text" 
              class="form-control" 
              id="editDesignation" 
              v-model="editForm.designation"
              required
            >
          </div>
          <div class="mb-3">
            <label for="editRate" class="form-label">Rate (TZS)</label>
            <input 
              type="number" 
              class="form-control" 
              id="editRate" 
              v-model="editForm.rate"
              readonly
            >
          </div>
          <div class="mb-3">
            <label for="editLabourType" class="form-label">Labour Type</label>
            <select 
              class="form-select" 
              id="editLabourType" 
              v-model="selected_labour_type"
              required
            >
              <option value="">Select Labour type</option>
              <option v-for ="labourType in labourTypes" :value="labourType.id">{{ labourType.name }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
                <!-- EDIT LABOUR MODAL ENDS -->

</template>
  
<script setup>
    import { onMounted, ref, computed, inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Labour Allocation Report' });
    import axios from 'axios';

    const SuccessBox = inject('SuccessBox');
    const DeleteConfirmationbox = inject('DeleteConfirmationbox');
    const showMessage = inject('showMessage');   // Add quantity to columns
    const ErrorBox = inject('ErrorBox');   // Add quantity to columns  // Add quantity to columns
    // Add quantity to columns
    const columns = ref([ 'name', 'designation', 'rate', 'labour_type', 'actions']);
    const labours = ref([]);
    const allLabours = ref([]); // Store all data for filtering
    const loading_spinner = ref(false);
    const selectedType = ref('all');
    const selected_labour_type = ref('');

         //EDIT MODAL REFS
    const showEditModal = ref(false);
    const editForm = ref({
                       id: null,
                        name: '',
                       designation: '',
                       rate: 0,
                        labour_type: ''
                   });
    
    // Computed property to get unique labour types for dropdown
    const uniqueTypes = computed(() => {
      const types = labours.value.map(item => item.labour_type);
      return [...new Set(types)].filter(type => type); // Remove empty values
    });

    // Filter function for labour types
    const filterByType = () => {
      if (selectedType.value === 'all') {
        // Show all data
        labours.value = [...allLabours.value];
      } else {
        // Filter data by selected labour type
        labours.value = allLabours.value.filter(item => item.labour_type === selectedType.value);
      }
    };
    
    // Define local error handling functions
    const showError = (message) => {
      if (window.Swal) {
        window.Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message,
          padding: '2em',
        });
      } else {
        alert('Error: ' + message);
      }
    };
    
    const table_option = ref({
      perPage: 10,
      perPageValues: [5, 10, 20, 50],
      skin: 'table table-hover',
      pagination: { nav: 'scroll', chunk: 5 },
      texts: {
        count: 'Showing {from} to {to} of {count}',
        filter: '',
        filterPlaceholder: 'Search...',
        limit: 'Results:',
      },
      sortable: ['name', 'designation', 'rate', 'labour_type', 'Action'],
      sortIcon: {
        base: 'sort-icon-none',
        up: 'sort-icon-asc',
        down: 'sort-icon-desc',
      },
      resizableColumns: false,
    });

    const axiosInstance = axios.create({
      baseURL: 'https://construction.trustdigital.space/api/v1/',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Function to print the table directly - now uses filtered data
    const printTable = () => {
      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Get columns excluding 'actions'
      const printColumns = columns.value.filter(col => col !== 'actions');
      
      // Get the type filter text for the title
      const typeFilterText = selectedType.value === 'all' ? 'All Labours' : `Labour: ${selectedType.value}`;
      
      // Create HTML content for printing
      let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Labour Allocation Report - ${typeFilterText}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              text-align: center;
              margin-bottom: 10px;
              font-size: 13px;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
              font-size: 12px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 5px;
              text-align: left;
              font-size: 9px;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .print-date {
              text-align: right;
              margin-bottom: 20px;
              font-size: 9px;
            }
          </style>
        </head>
        <body>
          <h1>Labour Allocation Report</h1>
          <h2>${typeFilterText}</h2>
          <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                ${printColumns.map(col => `<th>${capitalize(col)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
      `;
      
      // Add filtered rows to the print content
      labours.value.forEach(row => {
        printContent += '<tr>';
        printColumns.forEach(col => {
          // Format rate column with commas
          if (col === 'rate') {
            printContent += `<td>${formatCurrency(row[col])}</td>`;
          } 
          // Default formatting for other columns
          else {
            printContent += `<td>${row[col] || ''}</td>`;
          }
        });
        printContent += '</tr>';
      });
      
      // Close the HTML structure
      printContent += `
            </tbody>
          </table>
        </body>
        </html>
      `;
      
      // Write to the iframe and print it
      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(printContent);
      iframeDoc.close();
      
      // Wait for content to load before printing
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        
        // Remove the iframe after printing (or after a timeout)
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };
    };
    
    // Helper function to capitalize column names for display
    const capitalize = (text) => {
      return text
        .replace(/_/g, ' ') // Replace all underscores with spaces
        .replace(/-/g, ' ') // Replace all hyphens with spaces
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    // Fetch labours from API
    const fetchLabours = async () => {
      loading_spinner.value = true;
      
      try {
        const response = await axiosInstance.get('/labours');
        // Store all data for filtering
        allLabours.value = response.data;
        // Initial display shows all data
        labours.value = [...response.data];
      } catch (error) {
        showError(error.message || "Failed to fetch data");
        console.error("API error:", error);
      } finally {
        loading_spinner.value = false;
      }
    };

    // Add a ref for labour types
    const labourTypes = ref([]);

    // Function to fetch labour types from API
    const fetchLabourTypes = async () => {
      try {
        loading_spinner.value = true;
        const response = await axiosInstance.get('/labour-types');
        
        if (Array.isArray(response.data)) {
          labourTypes.value = response.data;
        } else {
          console.error("Invalid labour types response format");
        }
      } catch (error) {
        showError("Failed to fetch labour types: " + error.message);
        console.error("Error fetching labour types:", error);
      } finally {
        loading_spinner.value = false;
      }
    };

    onMounted(() => {
      fetchLabours();
      fetchLabourTypes();
    });
    // Add this formatting function
    const formatCurrency = (value) => {
      if (value === null || value === undefined) return '0';
      return Number(value).toLocaleString();
    };


      // EDIT LABOUR SCRIPTS START

// Edit Labour Method
const editLabour = (row) => {
  editForm.value = {
    id: row.id,
    name: row.name,
    designation: row.designation,
    rate: row.rate,
  };
  showEditModal.value = true;
};
const labour = ref('');
// Save Edited Labour Method
const saveEditedLabour = async () => {

    const editedData = {
    name: editForm.value.name,
    designation: editForm.value.designation,
    rate: editForm.value.rate,
    type_id: selected_labour_type.value,
};

  try {
    loading_spinner.value = true;
    
    // Update in the API
    await axiosInstance.put(`/labours/${editForm.value.id}`, editedData);
    closeEditModal();
    fetchLabours();
    // Show success message
    if (window.Swal) {
      window.Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Labour details updated successfully',
        padding: '2em',
      });
    }
    
  } catch (error) {
    showError(error.response?.data?.message || "Failed to update labour details");
    console.error("Update error:", error);
  } finally {
    loading_spinner.value = false;
  }
};

// Close Modal Method
const closeEditModal = () => {
  showEditModal.value = false;
  // Reset the form
  editForm.value = {
    id: null,
    name: '',
    designation: '',
    rate: 0,
    labour_type: ''
  };
};
      // EDIT LABOUR SCRIPTS END



     // Delete Labour Method
const deleteLabour = async (labour) => {

  // Confirm before deleting
  if (window.Swal) {
    DeleteConfirmationbox('delete','are you sure you want to delete this labour?');
    
    
  } else if (!confirm('Are you sure you want to delete this labour?')) {
    return; // User canceled
  }
  
  try {
    loading_spinner.value = true;
    
    // Send delete request to API
    await axiosInstance.delete(`/labours/${labour.id}`);
    
    // Show success message
    if (window.Swal) {
     SuccessBox('Deleted!','Labour deleted successfully!');
    }
    // Refresh the table
    fetchLabours()

  } catch (error) {
   showError(error.response?.data?.message || "Failed to delete labour");
    console.error("Delete error:", error);
  } finally {
    loading_spinner.value = false;
  }
};


</script>
  
<style scoped>
   .mymodal{
    background-color: rgba(122, 122, 122, 0.653);
   }
   
   @media print {
     .layout-px-spacing {
       margin: 0 !important;
       padding: 0 !important;
     }
     
     .seperator-header,
     .panel-heading,
     .custom-table .VueTables__search,
     .custom-table .VueTables__limit,
     .custom-table .VueTables__pagination {
       display: none !important;
     }
     
     .panel {
       box-shadow: none !important;
       border: none !important;
     }
   }


   /* EDIT MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  padding: 20px; /* Add some padding around the modal */
}

.modal-dialog {
  width: 90%;
  max-width: 1200px; /* Maximum width */
  min-width: 300px; /* Minimum width */
  margin: 0 auto;
}

.modal-content {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-height: 90vh; /* Maximum height */
  display: flex;
  flex-direction: column;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
  padding: 1.5rem;
  flex-shrink: 0;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto; /* Add scroll if content is too long */
  flex-grow: 1;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 1.5rem;
  flex-shrink: 0;
}

/* Form Styles */
.form-label {
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.form-control, 
.form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

/* Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.75rem;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-close:hover {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-dialog {
    width: 95%;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .form-control,
  .form-select {
    padding: 0.6rem 0.8rem;
  }
  
  .btn {
    padding: 0.6rem 1rem;
  }
}

</style> 













