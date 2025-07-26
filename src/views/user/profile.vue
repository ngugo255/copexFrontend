<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">User</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Account Settings</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>
        <button  class="btn mt-2 btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button>
        <div class="account-settings-container layout-top-spacing">
            <div class="account-content">
                <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="general-info" class="section general-info"  @submit.prevent="updateProfile">
                                <div class="info">
                                    <h6 class="">General Information</h6>
                                    <div class="row">
                                        <div class="col-lg-11 mx-auto">
                                            <div class="row">
                                                <div class="col-xl-2 col-lg-12 col-md-4">
                                                    <div class="upload mt-4 pe-md-4">
                                                        <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                        <img
                                                            :src="selected_file ? selected_file : require('@/assets/images/prf.jpg')"
                                                            alt="profile"
                                                            class="profile-preview"
                                                            @click="$refs.fl_profile.click()"
                                                        />
                                                        <p class="mt-2">Upload Picture</p>
                                                    </div>
                                                </div>
                                                <div class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                    <div class="form">
                                                        <div class="row">
                                                            <div class="row">

                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="fullName">Full Name</label>
                                                                    <button class="btn btn-light w-100 text-start mb-4" disabled>
                                                                        <span class="nav-link text-dark" style="font-size: 1.2em; font-weight: bold;">{{ user ? user.email : "Please Login" }}</span>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                <label for="profession">Role</label>
                                                                 <button class="btn btn-light w-100 text-start mb-4" disabled>
                                                                  <span class="nav-link text-dark" style="font-size: 1.2em; font-weight: bold;">{{ user ? user.name : "" }}</span>
                                                                 </button>
                                                           </div>
                                                           
                                                            </div>
                                                          
                                                            <div class="row">  

                                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="password">New Password</label>
                                                        <input class="form-control mb-4" v-model="newpassword" type="password" />
                                                    </div>
                                                                </div>
                                                               <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="password">Confirm New Password</label>
                                                        <input class="form-control mb-4" v-model="confpassword" type="password" />
                                                    </div>
                                                              </div>
                                                            </div>
                                                            </div>
                                                         </div>  
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="account-settings-footer bg-white">
                                      <div class="as-footer-container">
                                       <button type="button" class="btn btn-primary bg-danger"  @click="clearField()">Cancel</button>
                                       <button type="submit" class="btn btn-primary">
                                        <div v-if="loading_spinner" class="d-flex flex-column align-items-center">
                                         <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Please wait ...
                                        </div>
                                               
                                        <div v-else>Save Changes</div>
                                        </button>
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
    import { onMounted, ref } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/account-setting.scss';
    import axios from "axios";

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Account Setting' });

    const selected_file = ref(null);
    const oldpassword = ref();
    const newpassword = ref();
    const confpassword = ref();
    const password = ref();
    const loading_spinner =ref(false);
    const change_file = (event) => {
        selected_file.value = URL.createObjectURL(event.target.files[0]);
    };


    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

    const save = () => {
        if (newpassword.value != confpassword.value) {
            showerror(' Please make sure the confirm password its matches the new password');
        }
        else {

            password==confpassword;
          updateProfile();
          clearField();
          }
    };




    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({
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
       
  



    const showerror = (msg = '', type = 'error') => {
        const toast = window.Swal.mixin({
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


     const  clearField = async () =>  {
            oldpassword.value = "";
            newpassword.value = "";
            confpassword.value= "";
        }


        const updateProfile = async () => {
    if (!user.value) {
        showerror("User not logged in.");
        return;
    }

    if (!newpassword.value || !confpassword.value) {
    showerror("Password can't be empty! Please fill it in.");
    return;
   }


    if (newpassword.value !== confpassword.value) {
        showerror("Please make sure the confirm password matches the new password.");
        return;
    }

    loading_spinner.value = true;
    password.value = confpassword.value;

    try {
        const response = await axiosInstance.patch(`/users/${user.value.id}`, {
           password: password.value,
        });
  

        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            user.value = response.data;
            showMessage("Profile updated successfully!");
            clearField();
        }
        
    } catch (error) {
        console.error("Error updating profile:", error);
        showerror(error.response.data.message);
    }

    loading_spinner.value = false;
};




       
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});
</script>
