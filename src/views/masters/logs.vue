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
          <div class="text-center text-primary mt-2 mb-2">
                <!-- loading spinner starts -->
                 <div v-if="loading_spinner" v-html="loadingIndicator()"></div>
        <!-- Loading spinner ends -->
          </div>
        </div>   
  
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <v-client-table :data="Logs" :columns="columns" :options="table_option">
                            <!-- Simple display of quantity from endpoint -->
                            <template #quantity="props">
                                {{ (props.row.quantity || 0 ).toLocaleString()}}/=
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { onMounted, ref, computed, inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Activity Logs' });
    import axios from 'axios';
    
    const loadingIndicator = inject('loadingIndicator');
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const loading_spinner = ref(false);
    // Add quantity to columns
    const columns = ref(['SNo', 'user_name', 'action', 'type', 'date', 'time', 'quantity']);
    const Logs = ref([]);
    const selectedType = ref('all');
    const allLogs = ref([]); // Store all logs for filtering

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

    // Computed property to get unique types for dropdown
    const uniqueTypes = computed(() => {
        const types = allLogs.value.map(item => item.type);
        return [...new Set(types)].filter(type => type); // Remove empty values
    });

    // Filter function for types
    const filterByType = () => {
        if (selectedType.value === 'all') {
            // Show all data
            Logs.value = [...allLogs.value];
        } else {
            // Filter data by selected type
            Logs.value = allLogs.value.filter(item => item.type === selectedType.value);
        }
        
        // Update SNo after filtering
        Logs.value = Logs.value.map((item, index) => ({
            ...item,
            SNo: index + 1
        }));
    };

   const getLogs = async () => {
    loading_spinner.value = true;
    try {
        const response = await axios.get(`https://construction.trustdigital.space/api/v1/activity-logs`);
        if (response.data && response.data.data) {
            // Store all logs for filtering
            allLogs.value = response.data.data.map((item, index) => ({
                ...item,
                SNo: index + 1
            }));
            
            // Initialize the displayed logs with all logs
            Logs.value = [...allLogs.value];
            
            console.log("Unique types:", uniqueTypes.value); // Debug log
        }
        loading_spinner.value = false;
    } catch (error) {
        showError(error.message);
        console.log(error);
        loading_spinner.value = false;
    }
}
 

    
    // Function to print the table directly - now uses filtered data
    const printTable = () => {
      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Get all columns
      const printColumns = columns.value;
      
      // Get the type filter text for the title
      const typeFilterText = selectedType.value === 'all' ? 'All Types' : `Type: ${selectedType.value}`;
      
      // Helper function to format date as YYYY.MM.DD
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid date
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
      };
      
      // Helper function to format quantity with commas and /= suffix
      const formatQuantity = (value) => {
        if (value === null || value === undefined) return '0/=';
        return `${Number(value).toLocaleString()}/=`;
      };
      
      // Create HTML content for printing
      let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Activity Logs - ${typeFilterText}</title>
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
          <h1>Activity Logs Report</h1>
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
      Logs.value.forEach(row => {
        printContent += '<tr>';
        printColumns.forEach(col => {
          // Format date column
          if (col === 'date') {
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
    
   
    
    onMounted(() => {
      getLogs();
    });
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
</style> 


