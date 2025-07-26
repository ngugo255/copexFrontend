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
                            <option value="all">All Budget</option>
                            <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
                        </select>
                    </div>
                    
                    <!-- Print button -->
                    <button class="btn btn-primary px-3" @click="printTable">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-1">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                        Print
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
             <!-- Total Quantity Row - Centered with Bootstrap classes -->
                       <div class="d-flex mt-3 mb-3">
                         <div class=" ms-auto d-inline-flex align-items-center bg-light p-3 border rounded shadow-sm">
                           <div class="fw-bold me-2">Total Quantity:</div>
                           <div class="bg-white px-3 py-2 rounded fw-bold">{{ formatQuantity(totalQuantity) }}</div>
                         </div>
                       </div>
                       <!-- End of Total Quantity Row -->
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <v-client-table :data="filteredSpares" :columns="columns" :options="table_option">
                            <!-- Format date columns -->
                            <template #date="props">
                                {{ formatDate(props.row.date) }}
                            </template>
                            
                            <template #created_at="props">
                                {{ formatDate(props.row.created_at) }}
                            </template>
                            
                            <template #updated_at="props">
                                {{ formatDate(props.row.updated_at) }}
                            </template>
                            
                            <!-- Format quantity column -->
                            <template #quantity="props">
                                {{ formatQuantity(props.row.quantity) }}
                            </template>
                            
                            <!-- Actions column template -->
                            <template #actions="props">
                                <div class="actions text-center">
                                    <a href="javascript:;" class="cancel" @click="delete_row(props.row)">
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
                                            class="feather feather-x-circle table-cancel"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="15" y1="9" x2="9" y2="15"></line>
                                            <line x1="9" y1="9" x2="15" y2="15"></line>
                                        </svg>
                                    </a>
                                </div>
                            </template>
                        </v-client-table>


                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Budget Allocation Report' });
    import axios from 'axios';
    
    // Add quantity to columns
    const columns = ref(['SNo', 'user_name', 'action', 'type', 'date', 'time', 'quantity']);
    const Spares = ref([]);
    const allSpares = ref([]); // Store all data for filtering
    const loading_spinner = ref(false);
    const selectedType = ref('all');
    
    // Computed property for filtered data - now also filters by quantity > 0
    const filteredSpares = computed(() => {
        let filtered = Spares.value.filter(item => item.quantity > 0);
        
        if (selectedType.value === 'all') {
            return filtered;
        } else {
            return filtered.filter(item => item.type === selectedType.value);
        }
    });
    
    // Computed property to get unique types for dropdown - only from records with quantity > 0
    const uniqueTypes = computed(() => {
        const recordsWithQuantity = allSpares.value.filter(item => item.quantity > 0);
        const types = recordsWithQuantity.map(item => item.type);
        return [...new Set(types)].filter(type => type); // Remove empty values
    });
    
    // Filter function - now also filters by quantity > 0
    const filterByType = () => {
        // First filter all records with quantity > 0
        const recordsWithQuantity = allSpares.value.filter(item => item.quantity > 0);
        
        if (selectedType.value === 'all') {
            Spares.value = [...recordsWithQuantity]; // Show all data with quantity > 0
        } else {
            // Filter data by selected type
            Spares.value = recordsWithQuantity.filter(item => item.type === selectedType.value);
        }
        
        // Update SNo after filtering
        Spares.value = Spares.value.map((item, index) => ({
            ...item,
            SNo: index + 1
        }));
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
      sortable: ['SNo', 'user_name', 'action', 'type', 'date', 'time', 'quantity'],
      sortIcon: {
        base: 'sort-icon-none',
        up: 'sort-icon-asc',
        down: 'sort-icon-desc',
      },
      resizableColumns: false,
    });

    const axiosInstance = axios.create({
      baseURL: 'https://construction.trustdigital.space/api/v1',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Add these formatting functions
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    const formatQuantity = (value) => {
      if (value === null || value === undefined) return '0/=';
      return `${Number(value).toLocaleString()}/=`;
    };

    // Function to print the table directly - now uses filtered data
    const printTable = () => {
      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Get all columns
      const printColumns = columns.value;
      
      // Get the type filter text for the title
      const typeFilterText = selectedType.value === 'all' ? 'All Budget' : `Budget: ${selectedType.value}`;
      
      // Create HTML content for printing
      let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Budget Allocation Report - ${typeFilterText}</title>
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
          <h1>Budget Allocation Report</h1>
          <h2>${typeFilterText}</h2>
          <div class="print-date">Printed on: ${formatDate(new Date().toISOString())}</div>
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
          // Format date columns
          if (col === 'date' || col === 'created_at' || col === 'updated_at') {
            printContent += `<td>${formatDate(row[col])}</td>`;
          }
          // Format quantity column
          else if (col === 'quantity') {
            printContent += `<td>${formatQuantity(row[col])}</td>`;
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
                  <tr>
                    <td colspan="6" class="text-end"><strong>Total Quantity:</strong></td>
                    <td>${formatQuantity(totalQuantity.value)}</td>
                  </tr>
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
    
    const fetchSpares = async () => {
      loading_spinner.value = true;
      
      try {
        const response = await axiosInstance.get('/activity-logs');
        
        // Handle the specific response structure from your API
        if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
          const mappedData = response.data.data.map((item, index) => ({
            SNo: index + 1,
            id: item.id,
            user_id: item.user_id,
            user_name: item.user_name,
            action: item.action,
            type: item.type,
            activity_id: item.activity_id,
            date: item.date,
            time: item.time,
            created_at: item.created_at,
            updated_at: item.updated_at,
            quantity: item.quantity  || 0 // Ensure quantity is at least 0
          }));
          
          // Store all data for filtering
          allSpares.value = [...mappedData];
          
          // Initial filter to only show records with quantity > 0
          const recordsWithQuantity = mappedData.filter(item => item.quantity > 0);
          Spares.value = recordsWithQuantity.map((item, index) => ({
            ...item,
            SNo: index + 1 // Recalculate SNo
          }));
        } else {
          showError("Invalid response format");
          console.error("API response format unexpected:", response.data);
        }
      } catch (error) {
        showError(error.message || "Failed to fetch data");
        console.error("API error:", error);
      } finally {
        loading_spinner.value = false;
      }
    };


 const totalQuantity = computed(() => {
  return filteredSpares.value.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
});

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
