<template>
    <div class="layout-px-spacing dash_1">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Sales</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <ul class="navbar-nav flex-row ms-auto">
                <li class="nav-item more-dropdown">
                    <div class="dropdown custom-dropdown-icon">
                        <a href="javascript:;" class="nav-link dropdown-toggle" id="ddlSettings" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Settings</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                            <li><a class="dropdown-item" data-value="Settings" href="javascript:void(0);">Settings</a></li>
                            <li><a class="dropdown-item" data-value="Mail" href="javascript:void(0);">Mail</a></li>
                            <li><a class="dropdown-item" data-value="Print" href="javascript:void(0);">Print</a></li>
                            <li><a class="dropdown-item" data-value="Download" href="javascript:void(0);">Download</a></li>
                            <li><a class="dropdown-item" data-value="Share" href="javascript:void(0);">Share</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">

            <div  class=" col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="border-info card widget widget-top-selling-products">
                    <div class="widget-content mt-3">
                        <h5>Service Types</h5>
                    </div>
                    <div class="widget-content table-responsive">
                        <h2><v-f-number ref="counter" :start-val="0" :end-val="17" :duration="7000" /></h2>
                    </div>
                </div>
            </div>

            
            <div class=" col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="border-success  card widget widget-top-selling-products">
                    <div class="widget-content mt-3">
                        <h5 >Open Job Cards</h5>
                    </div>
                    <div class="widget-content table-responsive">
                        <h2><v-f-number ref="counter" :start-val="0" :end-val="310" :duration="7000" /></h2>
                    </div>
                </div>
            </div>

            <div class=" col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="border-dark card widget widget-top-selling-products">
                    <div class="widget-content mt-3">
                        <h5>Closed Job Cards</h5>
                    </div>
                    <div class="widget-content table-responsive">
                        <h2><v-f-number ref="counter" :start-val="0" :end-val="140" :duration="7000" /></h2>
                    </div>
                </div>
            </div>

            <div class=" col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class=" border-danger card widget widget-top-selling-products">
                    <div class="widget-content mt-3">
                        <h5>Rejected Job Cards</h5>
                    </div>
                    <div class="widget-content table-responsive ">
                       <h2  class="text-danger"><v-f-number ref="counter" :start-val="0" :end-val="14410" :duration="700" /></h2> 
                    </div>
                </div>
            </div>

            <Router-link to="/tables/requisitions" class=" col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="border-primary card widget widget-top-selling-products">
                    <div class="widget-content mt-3">
                        <h5>Requisitions</h5>
                    </div>
                    <div class="widget-content table-responsive">
                        <h2><v-f-number ref="counter" :start-val="0" :end-val="10" :duration="7000" /></h2>
                    </div>
                </div>
            </Router-link>


        </div>
    </div>
</template>

<script setup>
    import '@/assets/sass/widgets/widgets.scss';
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';
    import '@/assets/sass/components/custom-counter.scss';

    import { useMeta } from '@/composables/use-meta';


    import { VFNumber } from 'vue-animation-counter';

    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/components/custom-counter.scss';
    import highlight from '@/components/plugins/highlight.vue';

    useMeta({ title: 'Counter' });

    const code_arr = ref([]);
    const toggleCode = (name) => {
        if (code_arr.value.includes(name)) {
            code_arr.value = code_arr.value.filter((d) => d != name);
        } else {
            code_arr.value.push(name);
        }
    };
   
</script>

<style>
body{
    background-color:white!important;
}
.card {
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor:pointer;
}
</style>
