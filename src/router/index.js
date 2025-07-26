import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/index.vue';
import store from '../store';

// Vue.use(VueRouter);
// import { createApp } from 'vue';
// const app = createApp();
// app.use(createRouter);

const routes = [
    //dashboard
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/login.vue'),
        meta: { layout: 'auth' },
    },
    { path: '/home', name: 'Home', component: Home },

    {
        path: '/bulk-statements',
        name: 'bulk-statements',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/distribution/bulk_statements.vue'),
    },
    {
        path: '/machine-statement/:distribution_id',
        name: 'machine-statement',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/distribution/machine_statement.vue'),
    },

    {
        path: '/assets/machines',
        name: 'assets-machines',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/assets/machines.vue'),
    },

    {
        path: '/bulk-distribution/:project_id',
        name: 'bulk',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/distribution/bulk_distribution.vue'),
    },

    {
        path: '/direct-filling/',
        name: 'direct-filling',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/distribution/direct_fill.vue'),
    },



    {
        path: '/direct-fill-statement/:distribution_id',
        name: 'direct-fill-statement',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/distribution/direct_fill_statement.vue'),
    },

  {
        path: '/jobcard/:jobcard_id/:machine_id',
        name: 'jobcard',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/jobcards/jobcard.vue'),
    },
    {
        path: '/jobcards',
        name: 'jobcards',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/jobcards/jobcard_list.vue'),
    },

    {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/preview.vue'),
    },

       {
        path: '/requisitions',
        name: 'requisitions',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/requisition.vue'),
    },

           {
        path: '/good-issue-notes',
        name: 'good-issue-notes',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/goodIssueNote.vue'),
    },
        {
        path: '/orders2',
        name: 'orders2',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/preview2.vue'),
    },
    

    {
        path: '/copex-order-items/:order_id',
        name: 'copex-order-items',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/copex_items_list.vue'),
    },

    {
        path: '/bushman-order-items/:order_id',
        name: 'bushman-order-items',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/orders/bushman_items_list.vue'),
    },

       {
        path: '/masters/ai',
        name: 'masters-ai',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/ai.vue'),
    },

                {
        path: '/masters/approval-check',
        name: 'masters-approval-check',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/approvalCheck.vue'),
    },


            {
        path: '/masters/labours',
        name: 'masters-labours',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/labour.vue'),
    },

                {
        path: '/masters/labour-request',
        name: 'masters-labour-request',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/labourRequest.vue'),
    },


        {
        path: '/masters/labour-type',
        name: 'masters-labour-type',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/labourType.vue'),
    },

    
        {
        path: '/masters/lpo-items',
        name: 'masters-lpo-items',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/lpoItems.vue'),
    },

    {
        path: '/masters/machines',
        name: 'masters-machines',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/machines.vue'),
    },

      {
        path: '/masters/machine-type',
        name: 'masters-machine-type',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/machine_type.vue'),
    },

    {
        path: '/masters/service',
        name: 'masters-service',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/service.vue'),
    },
    {
        path: '/masters/vendors',
        name: 'masters-vendors',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/vendors.vue'),
    },
    {
        path: '/masters/employees',
        name: 'masters-employees',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/employees.vue'),
    },

    {
        path: '/masters/items-list',
        name: 'masters-items',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/items/dashboard.vue'),
    },

        {
        path: '/masters/item-categories',
        name: 'masters-item-categories',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/items/category.vue'),
    },

      {
        path: '/masters/logs',
        name: 'masters-logs',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/logs.vue'),
    },
    {
        path: '/masters/units',
        name: 'masters-units',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/units.vue'),
    },
    {
        path: '/masters/users',
        name: 'masters-users',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/users.vue'),
    },
    {
        path: '/masters/role',
        name: 'masters-roles',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/role.vue'),
    },

    {
        path: '/masters/role-permissions',
        name: 'masters-role-permissions',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/rolePermissions.vue'),
    },


    
    {
        path: '/masters/permissions',
        name: 'masters-permission',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/permission.vue'),
    },

    {
        path: '/masters/projects',
        name: 'masters-projects',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/projects.vue'),
    },

        {
        path: '/masters/remark-records',
        name: 'masters-remark-records',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/masters/remark_records.vue'),
    },

    {
        path: '/user/profile',
        name: 'user-profile',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/user/profile.vue'),
    },
   

      {
        path: '/chats',
        name: 'system-chats',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/chats/dashboard.vue'),
    },


    {
        path: '/company/copex',
        name: 'copex-company',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/companies/copex/dashboard.vue'),
    },

        {
        path: '/company/copex2',
        name: 'copex-company2',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/companies/copex/dashboard2.vue'),
    },

    {
        path: '/company/bushman',
        name: 'bushman-company',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/companies/bushman/dashboard.vue'),
    },

    {
        path: '/assets/spares',
        name: 'assets-spares',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/assets/spares_list.vue'),
    },


     {
        path: '/report/item-budget/:project_id/:budget_id',
        name: 'item-budget-report',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/item_budget.vue'),
    },

    {
        path: '/budgets',
        name: 'budgets',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/budgets/dashboard.vue'),
    },

    {
        path: '/report/project-budget',
        name: 'project-budget-report',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/project_budget.vue'),
    },

    {
        path: '/report/machine-usage/:machine_id',
        name: 'machine-usage-report',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/machine_report.vue'),
    },
{
    path: '/report/site-report',
    name: 'site-report',
    component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/site_report.vue'),
},
{
    path: '/report/boq',
    name: 'boq-report',
    component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/boq.vue'),
},

{
    path: '/report/allowance',
    name: 'allowance-report',
    component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/allowance.vue'),
},

{
    path: '/report/allowance-approved/:project_id/:request_id/:date',
    name: 'allowance-approved-report',
    component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/allowanceApproved.vue'),
},

{
    path: '/report/allocation',
    name: 'allocation-report',
    component: () => import(/* webpackChunkName: "components-tabs" */ '../views/report/allocation.vue'),
},
    {
        path: '/voucher',
        name: 'voucher',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/voucher/index.vue'),
    },

     {
        path: '/payment',
        name: 'payment',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/payment/index.vue'),
    },


      {
        path: '/labour-request',
        name: 'labour-request',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/labours/labour_request.vue'),
    },
// 25 june 2025

      {
        path: '/good-received-notes/dashboard',
        name: 'good-received-notes-dashboard',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/goodReceivedNotes/dashboard.vue'),
    },

        {
        path: '/stores/dashboard',
        name: 'stores-dashboard',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/stores/dashboard.vue'),
    },
        {
        path: '/logs/deleted-orders',
        name: 'logs-deleted-orders',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/logs/deletedOrders.vue'),
    },
            {
        path: '/budgets',
        name: 'budgets',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/budgets/dashboard.vue'),
    },
   
];

const router = new createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;
