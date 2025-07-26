<template>
    <div :class="[$store.state.layout_style, $store.state.menu_style]">
        <component v-bind:is="layout"></component>
    </div>
</template>
<script setup>
    import { computed,provide } from 'vue';
    import axios from 'axios';   
    import '@/assets/sass/app.scss';

    import { useMeta } from '@/composables/use-meta';
    import { useStore } from 'vuex';

    useMeta({ title: 'Sales Admin' });

    const store = useStore();

    const layout = computed(() => {
        return store.getters.layout;
    });
const showMessage = (msg = '', type = 'success') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const showError =  (msg = '', type = 'error') => {

const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
}


const showSuccessbox = (title = '',msg = '',icon = 'success') => {
    window.Swal.fire({
        icon: icon,
        title: title,
        text: msg,
        padding: '2em',
      });
    }



    const showErrorBox = (msg = '', type = 'error') => {
    window.Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        padding: '2em',
      });
    }

        const showDeleteConfirmation = (title = '',msg = '') => {
     window.Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  }







// table printout starts
const printReport = (dataArray, reportTitle = "Report") => {
    const formatCell = (value, key) => {
        if (typeof value === 'number') return `<span class="number">${value}</span>`;
        return value !== null && value !== undefined ? value : '';
    };

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("No data provided or empty array!");
        return;
    }

    const excludeKeys = ['actions', 'status'];
    const headers = Object.keys(dataArray[0]).filter(key => !excludeKeys.includes(key));
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <html>
            <head>
                <title>Print ${reportTitle}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 10px; }
                    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
                    th, td { 
                        border: 1px solid #ccc; 
                        padding: 4px; 
                        text-align: left; 
                        font-size: 15px; 
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    th { background-color: #f1f1f1; }
                    td.number { text-align: right; }
                    @media print { body { zoom: 90%; } }
                </style>
            </head>
            <body>
                <h2>${reportTitle}</h2>
                <div style="overflow-x:auto;">
                    <table>
                        <thead><tr>${headers.map(key => `<th>${key}</th>`).join('')}</tr></thead>
                        <tbody>${dataArray.map(item => `
                            <tr>${headers.map(key => `<td>${formatCell(item[key], key)}</td>`).join('')}</tr>
                        `).join('')}</tbody>
                    </table>
                </div>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};


const now = new Date();
const nowDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
const nowTime = now.toTimeString().slice(0, 8); // HH:MM:SS


// table printout ends
const recordLog = async (user_id,user_name,action,type,activity_id,date,quantity) => {
      try {
        const formData = {
          user_id: user_id,
          user_name: user_name,
          action: action,
          type: type,
          activity_id: activity_id,
          date: date ?? nowDate,
          time: nowTime,
          quantity:quantity
        };
        
        // Send POST request to create new activity
        const response = await axios.post('https://construction.trustdigital.space/api/v1/activity-logs', formData);
        
        if (response.data && response.data.status === "success") {
            console.log('log:OK');
        } else {
           console.log('log:FAIL');
        }
      } catch (error) {
        console.log('log:Error',error);
      } 
    };
// recording log starts

// recording log ends 



// Provide globally
provide('DeleteConfirmationbox', showDeleteConfirmation);
provide('SuccessBox', showSuccessbox);
provide('ErrorBox', showErrorBox);
provide('showMessage', showMessage);
provide('showError', showError);
provide('printReport', printReport);
provide('recordLog', recordLog);

</script>
<script>
    // layouts
    import appLayout from './layouts/app-layout.vue';
    import authLayout from './layouts/auth-layout.vue';

    export default {
        components: {
            app: appLayout,
            auth: authLayout,
        },
    };

    
</script>
