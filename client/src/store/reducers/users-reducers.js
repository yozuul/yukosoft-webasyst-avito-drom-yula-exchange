import { UsersActions } from '../actions'

const initialState = {
   users: [],
   current: '',
   isLoading: '',
   error: '',
   message: '',
}

export const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case UsersActions.SET_USERS:
         return { ...state, users: action.payload }
      case UsersActions.SET_CURRENT_USER:
         return { ...state, current: action.payload }
      case UsersActions.SET_IS_LOADING:
          return { ...state, isLoading: action.payload }
      case UsersActions.SET_ERROR:
         return { ...state, error: action.payload }
      case UsersActions.SET_MESSAGE:
         return { ...state, message: action.payload }
      default:
         return state
   }
}