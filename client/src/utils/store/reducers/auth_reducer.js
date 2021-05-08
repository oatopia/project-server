import * as ACTION_TYPES from '../actions/action_types.js'

export const initialState = {
  is_authenticated: false,
  profile: null
}

export const renew = (newState) => { 
  return newState;
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false
        }
      case ACTION_TYPES.ADD_PROFILE:
      return {
          ...state,
          profile: action.payload,
        }
      case ACTION_TYPES.REMOVE_PROFILE:
      return {
          ...state,
          profile: null,
        }
      case ACTION_TYPES.RESET_PROFILE: // action corresponding to the action reset profile ***
        return { 
           ...state,
          is_authenticated: action.state.is_authenticated,
          profile: action.state.profile
        }
      default:
        return state
    }
}
