import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    phoneType:'Android',
    appID: null,
    userID: null,
}
const getters = {
    appID(state){
        if(!state.appID){
            state.appID = sessionStorage.getItem('AppID')
        }
        return state.appID
    },
    userID(state){
        if(!state.userID){
            state.userID = sessionStorage.getItem('UserID')
        }
    }
}

const mutations = {
    getPhoneType(state,type){
        state.phoneType = type;
    },
    getAppID(state,num){
        state.appID = num
    },
    getUserID(state,num){
        state.userID = num;
    }
}

const actions = {
    setPhoneType(context,type){
        context.commit('getPhoneType',type)
    },
    setAppID(context,num){
        context.commit('getAppID',num)
    },
    setUserID(context,num){
        context.commit('getUserID',num)
    },
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
 
export default store;