<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">DataTables</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Striped</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <v-client-table :data="approval_check" :columns="columns" :options="table_option">
                            <template #SNo="props">
                                {{ props.index + 0 }}
                            </template>
                            <template #actions="props">
                                <div class="actions text-center">
                                    <a href="javascript:;" class="cancel">
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
                                            @click="deleteapproval_check(props.row)"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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
    import { onMounted, ref,inject } from 'vue';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Striped Table' });
    const approval_check = ref([])
    const columns = ref([ 'SNo','type','purchase_order_id', 'human_resources', 'operation_department', 'engineer', 'project_manager', 'quantity_surveyor', 'senior_accountant', 'financial_controller', 'managing_director', 'status', 'actions']);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [ 'SNo','type', 'human_resources', 'operation_department', 'engineer', 'project_manager', 'quantity_surveyor', 'senior_accountant', 'financial_controller', 'managing_director', 'status'],
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        resizableColumns: false,
         headings: {
            SNo: 'SNo',
            purchase_order_id : 'type id',
            type: 'Type',
            human_resources: 'HR',
            operation_department: 'Ops',
            engineer: 'Eng',
            project_manager: 'PM',
            quantity_surveyor: 'QS',
            senior_accountant: 'Sr Acc',
            financial_controller: 'FC',
            managing_director: 'MD',
            status: 'Status',
            actions: 'Actions'
        }
    });

    const showMessage = inject('showMessage');
    const showError = inject('showError');

    const getapproval_check = async () => {
        try {
            const response = await fetch('https://bcftrack.trustdigital.space/api/v1/approval-check');
            const data = await response.json();
            approval_check.value = data.map((item, index) => ({
            SNo: index + 0,
            ...item
        }));
        } catch (error) {
            console.error('Error fetching approval check:', error);
        }
    };

    const deleteapproval_check = async (row) => {
        if (window.Swal) {
            window.Swal.fire({
                title: 'Delete Item',
                text: 'Are you sure you want to delete this item?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Send delete request to API
                        await fetch(`https://bcftrack.trustdigital.space/api/v1/approval-check/${row.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        // Update local state after successful API call
                        approval_check.value = approval_check.value.filter((d) => d.id !== row.id);
                  showMessage('deleted successfully');
                    } catch (error) {
                        console.error('Error deleting item:', error);
                        // Show error message
                        window.Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to delete item: ' + error.message,
                            padding: '2em',
                        });
                    }
                }
            });
        } else {
            if (confirm('Are you sure want to delete selected row?')) {
                try {
                    // Send delete request to API
                    await fetch(`https://bcftrack.trustdigital.space/api/v1/approval-check/${row.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    // Update local state after successful API call
                    approval_check.value = approval_check.value.filter((d) => d.id !== row.id);
                } catch (error) {
                    console.error('Error deleting item:', error);
                    alert('Failed to delete item: ' + error.message);
                }
            }
        }
    };

    onMounted(() => {
        getapproval_check();
    });

</script>




