import mutations from './mutation'
import actions from './action'
import getters from './getter'
import * as func from '../function'
const state=func.local.get()||{
    event:[],
    count:0
}

export default {
    state,
    getters,
    mutations,
    actions
}