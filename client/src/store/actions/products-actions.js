import { ProductService } from '../../services'

export const ProductsActions = {
   SET_PRODUCTS: 'SET_PRODUCTS',
   SET_CURRENT_PRODUCT: 'SET_CURRENT_PRODUCT',
   SET_UPDATE_PRODUCT: 'SET_UPDATE_PRODUCT',
   SET_ERROR: 'SET_ERROR',
   SET_MESSAGE: 'SET_MESSAGE',
   SET_IS_LOADING: 'SET_IS_LOADING'
}

export const ProductsActionsCreators = {
   setProducts: (products) => ({ type: ProductsActions.SET_PRODUCTS, payload: products }),
   setCurrentProduct: (current) => ({ type: ProductsActions.SET_CURRENT_PRODUCT, payload: current }),
   setUpdateProduct: (data) => ({ type: ProductsActions.SET_UPDATE_PRODUCT, payload: data }),
   setError: (payload) => ({ type: ProductsActions.SET_ERROR, payload }),
   setMessage: (payload) => ({ type: ProductsActions.SET_MESSAGE, payload }),
   setIsLoading: (payload) => ({ type: ProductsActions.SET_IS_LOADING, payload }),

   fetchProducts: () => async (dispatch) => {
      try {
         const products = await ProductService.fetchProducts()
         dispatch(ProductsActionsCreators.setProducts(products.data))
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(ProductsActionsCreators.setError(errMessage))
      }
   },

   getProductByID: (id) => async (dispatch) => {
      try {
         const product = await ProductService.getProductByID(id)
         dispatch(ProductsActionsCreators.setCurrentProduct(product.data))
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(ProductsActionsCreators.setError(errMessage))
      }
   },

   updateProduct: (data) => async (dispatch) => {
      try {
         const product = await ProductService.updateProduct(data)
         dispatch(ProductsActionsCreators.setMessage(product.data.message))
         dispatch(ProductsActionsCreators.showHideMessage())
      } catch (err) {
         console.log(err)
         const errMessage = err.response?.data?.message
         dispatch(ProductsActionsCreators.setError(errMessage))
      }
   },

   showHideMessage: () => async (dispatch) => {
      const hideMessages = () => {
         dispatch(ProductsActionsCreators.setMessage(''))
         dispatch(ProductsActionsCreators.setError(''))
      }
      setTimeout(hideMessages, 3000);
   }
}
