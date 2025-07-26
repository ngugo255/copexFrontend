<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">App</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Chat</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="chat-section layout-top-spacing">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="chat-system">
                        <div class="hamburger" @click="is_show_user_menu = !is_show_user_menu">
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
                                class="feather feather-menu mail-menu d-lg-none"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </div>
                        <div class="user-list-box" :class="{ 'user-list-box-show': is_show_user_menu }">
                            <div class="search">
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
                                    class="feather feather-search"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input type="text" v-model.trim="search_user" class="form-control" @keyup="search_users()" placeholder="Search" />
                            </div>
                            <perfect-scrollbar class="people" :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                             
                                <div
                                    v-for="(person, index) in groups"
                                    class="person"
                                    :key="index"
                                    :class="{ active: selected_user && selected_user.id == person.id }"
                                    @click="select_user(person)"
                                >
                                  <div class="user-info">
    <!-- 🔴 Red Dot Indicator -->
    <div class="red-dot" v-if="person.unchecked>0">🔴</div>

    <div class="f-head">
        <img :src="require(`@/assets/images/${person.path ? person.path : 'prf.jpg' }`)" alt="avatar" />
    </div>
    
    <div class="f-body">
        <div class="meta-info">
            <span class="user-name" :class="{ 'text-primary': selected_user && selected_user.id == person.id }">{{ person.name }}</span>
            <span class="user-meta-time" :class="{ 'text-primary': selected_user && selected_user.id == person.id }">{{ person.time }}</span>
        </div>
        <span class="preview">{{ person.preview }}</span>
    </div>
</div>

                                </div>
                                <!-- groups starts -->
                                <!-- <div
                                    v-for="group in groups"
                                    class="person"
                                    :key="index"
                                >
                                    <div class="user-info">
                                        <div class="f-head">
                                            <img :src="require(`@/assets/images/prf.jpg`)" alt="avatar" />
                                        </div>
                                        <div class="f-body">
                                            <div class="meta-info">
                                                <span class="user-name" :class="'text-primary'">aaa</span>
                                                <span class="user-meta-time" :class="'text-primary'">bbb</span>
                                            </div>
                                            <span class="preview">ccc</span>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- groups ends -->
                            </perfect-scrollbar>
                        </div>
                        <div class="chat-box" :class="{ active: selected_user }">
                            <div class="chat-not-selected" :class="{ 'd-none': selected_user }">
                                <p>
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
                                        class="feather feather-message-square"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    Click User To Chat
                                </p>
                            </div>

                            <div v-if="selected_user" class="chat-box-inner h-100">
                                <div class="chat-meta-user chat-active">
                                    <div class="current-chat-user-name">
                                        <span>
                                            <img :src="require(`@/assets/images/${selected_user.path ? selected_user.path : 'prf.jpg'}`)" alt="dynamic-image" />
                                            <span class="name">{{ selected_user.name }}</span>
                                        </span>
                                    </div>

                                    <div class="chat-action-btn align-self-center me-5">
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
                                            class="feather feather-phone phone-call-screen"
                                        >
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                            ></path>
                                        </svg>
                                        <!-- <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-video video-call-screen"
                                        >
                                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                        </svg> -->

                                        <!-- <div class="dropdown d-inline-block">
                                            <a href="javascript:;" id="ddlSettings" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
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
                                                    class="feather feather-more-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="12" cy="5" r="1"></circle>
                                                    <circle cx="12" cy="19" r="1"></circle>
                                                </svg>
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
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
                                                            class="feather feather-settings"
                                                        >
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                            <path
                                                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                                                            ></path>
                                                        </svg>
                                                        Settings</a
                                                    >
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
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
                                                            class="feather feather-mail"
                                                        >
                                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                            <polyline points="22,6 12,13 2,6"></polyline>
                                                        </svg>
                                                        Mail</a
                                                    >
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
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
                                                            class="feather feather-copy"
                                                        >
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                        </svg>
                                                        Copy</a
                                                    >
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
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
                                                            class="feather feather-trash-2"
                                                        >
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg>
                                                        Delete</a
                                                    >
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
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
                                                            class="feather feather-share-2"
                                                        >
                                                            <circle cx="18" cy="5" r="3"></circle>
                                                            <circle cx="6" cy="12" r="3"></circle>
                                                            <circle cx="18" cy="19" r="3"></circle>
                                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                                        </svg>
                                                        Share</a
                                                    >
                                                </li>
                                            </ul>
                                        </div> -->
                                    </div>
                              
                                </div>
                                <perfect-scrollbar
                                    class="chat-conversation-box"
                                    :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }"
                                >
                                    <div id="chat-conversation-box-scroll" class="chat-conversation-box-scroll">
                                        <div class="chat active-chat">
                                            <div class="conversation-start">
                                                <span>{{ selected_user.time }}</span>
                                            </div>

<template v-if="selected_user.messages && selected_user.messages.length">
  <div
    v-for="(message, index) in selected_user.messages"
    :key="'msg' + index"
    class="message-block"
  >
    <!-- Show sender name ONLY if it's from someone else AND sender changed -->
    <div
      v-if="
        message.from_user_id !== selected_user.user_id &&
        (index === 0 || selected_user.messages[index - 1].from_user_id !== message.from_user_id)
      "
      class="name-tag name-left"
    >
      From {{ message.sender }}
    </div>

    <!-- Message Bubble -->
    <div
      class="bubble"
      :class="[selected_user.user_id === message.from_user_id ? 'me' : 'you']"
    >
      {{ message.text }}
    </div>
  </div>
</template>



                                        </div>
                                    </div>
                                </perfect-scrollbar>
                                <div class="chat-footer chat-active">
                                    <div class="chat-input">
                                        <div class="chat-form">
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
                                                class="feather feather-message-square"
                                            >
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <input type="text" v-model="text_message" class="mail-write-box form-control" placeholder="Message" @keyup.enter.exact="send_message" />
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
</template>
<script setup>
    import axios from 'axios';
    import { onMounted, ref,inject } from 'vue';
    import '@/assets/sass/apps/chat.scss';
    import { useMeta } from '@/composables/use-meta';
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    useMeta({ title: 'Chat' });

    const is_show_user_menu = ref(false);
    const filterd_contact_list = ref([]);
    const selected_user = ref(null);
    const login_user_id = ref(JSON.parse(localStorage.getItem("user")).id);
    const search_user = ref('');
    const text_message = ref('');
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    onMounted(  async () => {
        await fetchGroups();
    });
     
     const groups = ref([])
     const messages = ref([])
     const fetchGroups = async () => {
    try {
        const response = await axiosInstance.get(`message-groups`);
        groups.value = response.data.totalGroups.map((data,index)=>({
            id: index+1,
            unchecked: data.unchecked,
            messages:data.messages.map((message)=>({
              from_user_id : message.remarker_id,
              to_usr_id : message.receiver_id,  
              text: message.description,
              sender:message.sender.name,
            })),
            user_id : login_user_id.value,
            name : data.remark_type,
            path: 'grp.jpeg',
            time: data.last_time
        }))
        messages.value = response.data.totalGroups
        originalGroups.value = groups.value;
    } catch (error) {
        console.error('Error fetching messages:', error);
        showError(error.message);
    } finally {
       
    }
}


const saveRemark = async (user) => {
    try {
        const remarkData = {
            remarker_id: user.user_id,
            description : text_message.value,
            status: 'unchecked', // Default to unchecked
            type_id: 0,
            remark_type: user.name,
            remarker: JSON.parse(localStorage.getItem("user")).name
        };
    const response = await axiosInstance.post('remark', remarkData);
    } catch (error) {
        console.log(error);
        showError(error.message);
    } finally {

    }
};



    const select_user = (user) => {
        selected_user.value = user;
        scroll_to_bottom();
        is_show_user_menu.value = false;
    };
    const originalGroups = ref([]);
    const search_users = () => {
        groups.value = originalGroups.value.filter((d) => d.name.toLowerCase().includes(search_user.value));
    };
    const send_message = () => {
        if (text_message.value.trim()) {
            const user = groups.value.find((d) => d.id == selected_user.value.id);
            user.messages.push({ from_user_id: selected_user.value.user_id, to_usr_id: login_user_id.value, text: text_message.value });
            saveRemark(user);
            text_message.value = '';
            scroll_to_bottom();
        }
    };
    const scroll_to_bottom = () => {
        setTimeout(() => {
            const element = document.querySelector('.chat-conversation-box');
            element.scrollTop = element.scrollHeight;
            element.behavior = 'smooth';
        });
    };
</script>
<style scoped>
.name-tag {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 8px 0 4px;
  color:  #ffffff;
}
.bubble.me {
  background-color: #dcf8c6;
  text-align: right;
}
.bubble.you {
  background-color: #f1f0f0;
  text-align: left;
}

</style>