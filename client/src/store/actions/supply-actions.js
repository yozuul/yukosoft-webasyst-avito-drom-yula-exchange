import { SupplyService } from '../../services'

export const SupplyActions = {
   SET_SUPPLY: 'SET_SUPPLY',
   SET_CURRENT_SUPPLY: 'SET_CURRENT_SUPPLY',
   SET_ERROR: 'SET_ERROR',
   SET_MESSAGE: 'SET_MESSAGE',
   SET_IS_LOADING: 'SET_IS_LOADING'
}

export const SupplyActionsCreators = {
   setSupplies: (payload) => ({ type: SupplyActions.SET_SUPPLY, payload }),
   setCurrentSupply: (payload) => ({ type: SupplyActions.SET_CURRENT_SUPPLY, payload }),
   setError: (payload) => ({ type: SupplyActions.SET_ERROR, payload }),
   setMessage: (payload) => ({ type: SupplyActions.SET_MESSAGE, payload }),
   setIsLoading: (payload) => ({ type: SupplyActions.SET_IS_LOADING, payload }),

   fetchSypplies: () => async (dispatch) => {
      try {
         const supplies = await SupplyService.fetchSupplies()
         dispatch(SupplyActionsCreators.setSupplies(supplies.data))
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(SupplyActionsCreators.setError(errMessage))
      }
   }
}
