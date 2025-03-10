<template>
    <div class="container">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Components</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Counter</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="container">
            <div id="navSection" class="nav sidenav">
                <div class="sidenav-content" v-scroll-spy-active v-scroll-spy-link>
                    <a href="#counterbasic" class="nav-link">Basic</a>
                    <a href="#countericon" class="nav-link">Icon</a>
                </div>
            </div>
            <div class="row layout-top-spacing">
                <div class="col-12">
                    <div class="alert alert-arrow-left alert-icon-left alert-light-info mb-0 text-break">
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
                            class="feather feather-bell"
                        >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        Documentation:
                        <a target="_blank" href="https://www.npmjs.com/package/vue-animation-counter" class="text-info"> https://www.npmjs.com/package/vue-animation-counter </a>
                    </div>
                </div>
            </div>
            <div v-scroll-spy class="row layout-top-spacing">
                <div id="counterbasic" class="col-lg-12 col-12 layout-spacing">
                    <div class="statbox panel box box-shadow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                    <h4>Simple Counter</h4>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body text-center">
                            <div class="simple--counter-container">
                                <div class="counter-container">
                                    <div class="counter-content">
                                        <h1 class="s-counter2 s-counter">
                                            <v-f-number ref="counter1" :start-val="0" :end-val="710" :duration="7000" />
                                        </h1>
                                    </div>
                                    <p class="s-counter-text">HOURS</p>
                                </div>

                                <div class="counter-container">
                                    <div class="counter-content">
                                        <h1 class="s-counter3 s-counter">
                                            <v-f-number ref="counter2" :start-val="0" :end-val="915" :duration="7000" />
                                        </h1>
                                    </div>
                                    <p class="s-counter-text">TICKETS</p>
                                </div>

                                <div class="counter-container">
                                    <div class="counter-content">
                                        <h1 class="s-counter4 s-counter">
                                            <v-f-number ref="counter3" :start-val="0" :end-val="580" :duration="7000" />
                                        </h1>
                                    </div>
                                    <p class="s-counter-text">CUSTOMERS</p>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { VFNumber } from 'vue-animation-counter';

    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/components/custom-counter.scss';
    import highlight from '@/components/plugins/highlight.vue';

    import { useMeta } from '@/composables/use-meta';
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
