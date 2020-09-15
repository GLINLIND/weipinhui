import Vue from 'vue'
Vue.filter('wh',function(val,data){
    return val.replace(/w.h/,data);
})