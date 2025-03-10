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
            <h4 class="bg-white text-dark fw-bolder">Requisition Details</h4>
        </div>

        <!-- approval officers starts -->

    <div class="row layout-top-spacing">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="panel p-0">
                <div class="custom-table table3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Operation's Dept</th>
                                <th>Engineer</th>
                                <th>Q.S</th>
                                <th>Sr.Accountant</th>
                                <th>FC</th>
                                <th>MD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-success">checked</td>
                                <td class="text-success">checked</td>
                                <td class="text-success">checked</td>
                                <td class="text-danger">unchecked</td>
                                <td class="text-danger">unchecked</td>
                                <td class="text-danger">unchecked</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
         <!-- approval officers ends -->

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">
                                <a href="javascript:void(0)" class="text-success" title="Approve" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                    </svg>
                                </a>

                        
                                <!-- <router-link :to="'/requisition-list/' + props.row.id" class="text-primary"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link> -->

                                <router-link :to="'/requisition-list/'" class="text-primary"  title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                </router-link>


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
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>

<script setup>
    import { onMounted, ref } from 'vue';
    import '@/assets/sass/elements/tooltip.scss';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Custom Table' });
   
   
    //table 3
    const columns = ref(['id', 'description', 'units','quantity', 'rate', 'amount']);
    const items = ref([]);
    const table_option = ref({
        perPage: 5,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'first_name', 'last_name', 'email', 'phone'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search Data...',
            limit: 'Results:',
        },
        resizableColumns: false,
    });

    onMounted(() => {
        bind_data();
        setTimeout(() => {
            initTooltip();
        }, 500);
    });

    const bind_data = () => {
      
        items.value = [
            { id: 1, description: 'Sany excavator and wheel loader', units: 'box', quantity: 26, rate: 2500, amount: 26 * 2500 },
            { id: 2, description: 'Cement', units: 'bag', quantity: 100, rate: 50, amount: 100 * 50 },
            { id: 3, description: 'Sand', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 4, description: 'Ballast', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 5, description: 'Steel bars', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 6, description: 'Timber', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 7, description: 'Paint', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 8, description: 'Nails', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 9, description: 'Pipes', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 10, description: 'Tiles', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
            { id: 11, description: 'Tiles', units: 'ton', quantity: 10, rate: 100, amount: 10 * 100 },
          
        ];
    };

    const initTooltip = () => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    };
</script>
