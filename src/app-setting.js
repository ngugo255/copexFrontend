import store from './store';
import { $themeConfig } from '@themeConfig';

export default {
    init() {
        // set default styles
        let val = localStorage.getItem('dark_mode'); // light, dark, system
        if (!val) {
            val = $themeConfig.theme;
        }
        store.commit('toggleDarkMode', val);

        val = localStorage.getItem('menu_style'); // vertical, collapsible-vertical, horizontal
        if (!val) {
            val = $themeConfig.navigation;
        }
        store.commit('toggleMenuStyle', val);

        val = localStorage.getItem('layout_style'); // full, boxed-layout, large-boxed-layout
        if (!val) {
            val = $themeConfig.layout;
        }
        store.commit('toggleLayoutStyle', val);

        if (!val) {
            val = $themeConfig.lang;

            const list = store.state.countryList;
            const item = list.find((item) => item.code === val);
        }
    },



    toggleMode(mode) {
        if (!mode) {
            let val = localStorage.getItem('dark_mode'); //light|dark|system
            mode = val;
            if (!val) {
                mode = 'light';
            }
        }
        store.commit('toggleDarkMode', mode || 'light');
        return mode;
    },
};
