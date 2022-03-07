import { AuthActions } from '../actions'

const initialState = {
   isAuth: false,
   error: '',
   message: '',
   isLoading: '',
   user: {}
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case AuthActions.SET_AUTH:
         return { ...state, isAuth: action.payload, isLoading: false }
      case AuthActions.SET_USER:
         return { ...state, user: action.payload }
      case AuthActions.SET_ERROR:
         return { ...state, error: action.payload, isLoading: false }
      case AuthActions.SET_MESSAGE:
         return { ...state, message: action.payload, isLoading: false }
      case AuthActions.SET_IS_LOADING:
         return { ...state, isLoading: action.payload }
      default:
         return state
   }
}