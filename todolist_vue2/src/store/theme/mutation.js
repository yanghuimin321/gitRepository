import * as func from '../function'

export default{
    SELECTTHEME(state,obj){
        state.theme=obj.theme;
        func.theme_local.set(state);
    }
}