<template>
    <div class="layout-px-spacing">  
        <!-- Existing code -->

        <!-- Toast notification starts -->
        <button type="button" class="btn btn-danger" @click="showToast">Top Right</button>

        <div ref="toastTopRight" class="toast position-fixed top-0 end-0 m-2" style="z-index: 1080" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body toast-info d-flex justify-content-between">
                Example notification text.
                <a href="javascript:;" class="text-success ms-2" data-bs-dismiss="toast">DISMISS</a>
            </div>
        </div>
        <!-- Toast notification ends -->
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';

    useMeta({ title: 'Custom Table' });

    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1",
    });

    const ServiceTypes = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    let toastTopRight = ref(null);
    const columns = ref(['id', 'name', 'actions']);
    const items = ref([]);
    const table_option = ref({
        perPage: 5,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'service_name'],
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

    const getServiceTypes = () => {
        loading_spinner.value = true;
        axiosInstance.get('/service-type').then((response) => {
            ServiceTypes.value = response.data;
            items.value = response.data; // Bind the data to items
            console.log("service Types: ",response.data);
            loading_spinner.value = false;
        });
    };

    const showToast = () => {
        if (toastTopRight.value) {
            toastTopRight.value.show();
        }
    };

    const initToast = () => {
        if (toastTopRight.value) {
            toastTopRight.value = new window.bootstrap.Toast(toastTopRight.value);
        }
    };

    onMounted(() => {
        initToast();
        getServiceTypes();
    });
</script>
