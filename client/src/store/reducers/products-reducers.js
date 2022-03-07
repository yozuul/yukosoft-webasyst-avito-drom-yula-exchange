import { ProductsActions } from '../actions'

const initialState = {
   products: [],
   current: '',
   isLoading: '',
   error: '',
   message: '',
}

export const productsReducer = (state = initialState, action) => {
   switch (action.type) {
      case ProductsActions.SET_PRODUCTS:
         return { ...state, products: action.payload }
      case ProductsActions.SET_CURRENT_PRODUCT:
         return { ...state, current: action.payload }
      case ProductsActions.SET_IS_LOADING:
          return { ...state, isLoading: action.payload }
      case ProductsActions.SET_ERROR:
         return { ...state, error: action.payload }
      case ProductsActions.SET_MESSAGE:
         return { ...state, message: action.payload }
      default:
         return state
   }
}