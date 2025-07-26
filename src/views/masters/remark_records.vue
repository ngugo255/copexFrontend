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
                            <option value="all">All Types</option>
                            <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
                        </select>
                    </div>
                    
                    <!-- Print button -->
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
        </div>
  
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
                        <v-client-table :data="remarksRecord" :columns="columns" :options="table_option">
                            <!-- Simple display of quantity from endpoint -->
                            <template #actions="props">
                              <a  href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
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
                                       @click="deleteRemark(props.row.id);"
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
</template>
  
<script setup>
    import { onMounted, ref, computed,inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Activity Logs' });
    import axios from 'axios';
    const showMessage = inject('showMessage');
    // Add quantity to columns
    const columns = ref(['id', 'sender_name' ,'description', 'remark_type', 'type_id', 'remarker_id', 'status', 'created_at','updated_at','actions']);
    const Spares = ref([]);
    const allSpares = ref([]); // Store all data for filtering
    const loading_spinner = ref(false);
    const selectedType = ref('all');
    
    // Computed property for filtered data
    const filteredSpares = computed(() => {
        if (selectedType.value === 'all') {
            return Spares.value;
        } else {
            return Spares.value.filter(item => item.type === selectedType.value);
        }
    });
    
    // Computed property to get unique types for dropdown
    const uniqueTypes = computed(() => {
        const types = allSpares.value.map(item => item.type);
        return [...new Set(types)].filter(type => type); // Remove empty values
    });
    
    // Filter function
    const filterByType = () => {
        if (selectedType.value === 'all') {
            Spares.value = [...allSpares.value]; // Show all data
        } else {
            // Filter data by selected type
            Spares.value = allSpares.value.filter(item => item.type === selectedType.value);
        }
        
        // Update SNo after filtering
        Spares.value = Spares.value.map((item, index) => ({
            ...item,
            SNo: index + 1
        }));
    };
    

    const deleteRemark = (id) => {
    if (confirm("Are you sure you want to delete this remark?")) {
        loading_spinner.value = true;
            axiosInstance
            .delete(`/${id}`)
            .then((response) => {
                fetchSpares();
                loading_spinner.value = false;
                if (response.status === 200) {
                   showMessage('Remark Deleted successfully');
                } else {
                    showError('Fail to Delete Remark');
                    console.error("Error deleting remark:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting remark:", error.message);
            });  
    
   }
   else{
    return;
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
      sortable: ['id', 'description', 'remark_type', 'type_id', 'remarker_id', 'status', 'created_at','updated_at', 'sender_name'],
      sortIcon: {
        base: 'sort-icon-none',
        up: 'sort-icon-asc',
        down: 'sort-icon-desc',
      },
      resizableColumns: false,
    });

    const axiosInstance = axios.create({
      baseURL: 'https://bcftrack.trustdigital.space/public/api/v1/remark',
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
      
      // Get all columns
      const printColumns = columns.value;
      
      // Get the type filter text for the title
      const typeFilterText = selectedType.value === ' ' ? 'All Types' : ` ${selectedType.value}`;
      
      // Create HTML content for printing
      let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Activity Logs Report- ${typeFilterText}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              text-align: center;
              margin-bottom: 10px;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
              font-size: 16px;
              color: #666;
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
            .print-date {
              text-align: right;
              margin-bottom: 20px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>Activity Logs Report</h1> <br> <br>
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
      filteredSpares.value.forEach(row => {
        printContent += '<tr>';
        printColumns.forEach(col => {
          // Handle special case for quantity
          if (col === 'quantity') {
            printContent += `<td>${row[col] || 0}</td>`;
          } else {
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
    

    const remarksRecord = ref(['']);
    const fetchSpares = async () => {
      loading_spinner.value = true;
      
      try {
        const response = await axiosInstance.get('');
        console.log(response.data.data);
        remarksRecord.value = response.data.data;
        // Handle the specific response structure from your API
        if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
         
        }
      } catch (error) {
        showError(error.message || "Failed to fetch data");
        console.error("API error:", error);
      } finally {
        loading_spinner.value = false;
      }
    };
    
    onMounted(() => {
      fetchSpares();
    });
</script>
  
<style>
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
</style> 













