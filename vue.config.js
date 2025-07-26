const path = require('path');
module.exports = {
   
    chainWebpack: config => {
        // Remove prefetch plugin and that's it!
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@themeConfig': path.resolve(__dirname, 'theme.config.js'),                
            }
        }
    }
};

// process.env.VUE_APP_API_BASE_URL = "https://ftrack.trustdigital.space/api/";
// process.env.VUE_APP_API_BASE_URL = "http://127.0.0.1:8000/api/v1/";
// process.env.VUE_APP_API_BASE_URL = "https://ftbackend.abooderp.com/api/v1/";
process.env.VUE_APP_API_BASE_URL = "https://bcftrack.trustdigital.space/api/v1/";
process.env.VUE_APP_API_BASE_URL2 = "https://construction.trustdigital.space/api/v1/";

