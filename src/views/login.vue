<template>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">

                            <img src="@/assets/images/logo.png" class="navbar-logo" alt="logo" style="width: 150px; height: auto;" />

                            
                            <p class="">Log in to your account to continue.</p>

                            <div ref="toast" class="toast">
                         <div class="toast-body"></div>
                        </div>

                            <form class="text-start" @submit.prevent="login">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <label for="username">EMAIL</label>
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
                                            class="feather feather-user"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input v-model="email" type="email" class="form-control" placeholder="e.g user@gmail.com" />
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">PASSWORD</label>
                                           
                                        </div>
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
                                            class="feather feather-lock"
                                        >
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input :type="pwd_type" v-model="password" class="form-control" placeholder="Password" />
                                        <svg
                                            @click="set_pwd_type"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            id="toggle-password"
                                            class="feather feather-eye"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary"
                                            :class="{disabled:loading_spinner}"
                                            >
                                                <div v-if="loading_spinner" class="d-flex flex-column align-items-center">
                                                    
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Please wait ...
                                                </div>
                                               
                                                <div v-else>Log In</div>
                                            </button>
                                        </div>
                                    </div>

                                    

 
                                     
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


    import {  ref,inject } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import axios from "axios";
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Login' });
    import { useRouter } from 'vue-router';
    const router = useRouter();


    const toastref = ref(null);
    const pwd_type = ref('password');
    const loading_spinner= ref(false);
    const email = ref("");
    const password = ref("");
    const error = ref({ })
    
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

    const  login = async () => {
      loading_spinner.value = true;
        try {
        const response = await axiosInstance.post(
          "/user/login", 
          {
            email: email.value,
            password:password.value,
          }
        );

        if (response.data.token) {
          showMessage("Welcome Back! " + response.data.user.name);
          // Storing token and user details in local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
           router.push(`${response.data.user.path}`);
        //   setTimeout(() => {
        //     router.push(`${response.data.user.path}`);
        //   }, 500);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            showError('Invalid Credentials');
          }
        } else {
            showError(error.message);
            loading_spinner.value = false;
        }
      } finally {
        loading_spinner.value = false;
      }
     }

    
    const showMessage = inject('showMessage');
    const showError = inject('showError');

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    };
</script>
