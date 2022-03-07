import { SupplyActions } from '../actions'

const initialState = {
   supplies: [],
   current: '',
   isLoading: '',
   error: '',
   message: '',
}

export const suppliesReducer = (state = initialState, action) => {
   switch (action.type) {
      case SupplyActions.SET_SUPPLY:
         return { ...state, supplies: action.payload }
      case SupplyActions.SET_CURRENT_SUPPLY:
         return { ...state, current: action.payload }
      case SupplyActions.SET_IS_LOADING:
          return { ...state, isLoading: action.payload }
      case SupplyActions.SET_ERROR:
         return { ...state, error: action.payload }
      case SupplyActions.SET_MESSAGE:
         return { ...state, message: action.payload }
      default:
         return state
   }
}