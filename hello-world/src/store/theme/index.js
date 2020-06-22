import getters from './getter'
import actions from './action'
import mutations from './mutation'
import * as func from '../function'

const state=func.theme_local.get()||{
    theme:'blue'
}

export default {
    state,
    actions,
    getters,
    mutations
}