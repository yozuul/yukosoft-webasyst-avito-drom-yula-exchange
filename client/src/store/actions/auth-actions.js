import { AuthService } from '../../services'
import { UsersActionCreators } from './users-actions'

export const AuthActions = {
   SET_AUTH: 'SET_AUTH',
   SET_USER: 'SET_USER',
   SET_ERROR: 'SET_ERROR',
   SET_MESSAGE: 'SET_MESSAGE',
   SET_IS_LOADING: 'SET_IS_LOADING'
}

export const AuthActionCreators = {
   setIsAuth: (auth) => ({ type: AuthActions.SET_AUTH, payload: auth }),
   setError: (payload) => ({ type: AuthActions.SET_ERROR, payload }),
   setMessage: (payload) => ({ type: AuthActions.SET_MESSAGE, payload }),
   setUser: (user) => ({ type: AuthActions.SET_USER, payload: user }),
   setIsLoading: (payload) => ({ type: AuthActions.SET_IS_LOADING, payload }),

   login: (authData) => async (dispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true))
         const authResponse = await AuthService.login(authData)
         if(authResponse) {
            const userData = authResponse.data.user
            userData.settings = authResponse.data.settings
            dispatch(AuthActionCreators.setIsAuth(true))
            fillLocal(userData, authResponse.data.accessToken)
            dispatch(AuthActionCreators.setUser(userData))
         }
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(AuthActionCreators.setError(errMessage))
      }
   },

   register: (authData) => async (dispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true))
         const authResponse = await AuthService.register(authData)
         if(authResponse) {
            dispatch(AuthActionCreators.setUser({}))
            dispatch(AuthActionCreators.setIsAuth(false))
            localStorage.setItem('emailActivated', false)
            dispatch(AuthActionCreators.setMessage('Аккаунт успешно зарегистрирован'))
            dispatch(AuthActionCreators.showHideMessage())
         }
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(AuthActionCreators.setError(errMessage))
         dispatch(AuthActionCreators.showHideMessage())
      }
   },

   activate: (activationLink) => async (dispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true))
         const response = await AuthService.activate({ url: activationLink })
      if(response.data) {
         dispatch(AuthActionCreators.setMessage(response.data.message))
         localStorage.setItem('emailActivated', true)
      }
   } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(AuthActionCreators.setError(errMessage))
      }
   },

   resendActivationLink: (userEmail) => async (dispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true))
         const response = await AuthService.resendActivationLink(userEmail)
         if(response.data) {
            dispatch(AuthActionCreators.setMessage(response.data.message))
            dispatch(AuthActionCreators.showHideMessage())
         }
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(AuthActionCreators.setError(errMessage))
         dispatch(AuthActionCreators.showHideMessage())
      }
   },

   logout: () => async (dispatch) => {
      dispatch(AuthActionCreators.setIsAuth(false))
      dispatch(AuthActionCreators.setUser({}))
      const fields = [
         'id', 'status', 'token', 'role', 'emailActivated', 'name', 'email', 'login', 'apiKey', 'apiToken'
      ]
      fields.map((item) => localStorage.removeItem(item))
   },

   checkAuth: () => async (dispatch) => {
      try {
         const authResponse = await AuthService.checkAuth()
      if(authResponse.data) {
         const userData = authResponse.data.user
         dispatch(AuthActionCreators.setIsAuth(true))
         dispatch(AuthActionCreators.setUser(userData))
         fillLocal(userData, authResponse.data.accessToken)
      }
   } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(AuthActionCreators.setError(errMessage))
      }
   },

   showHideMessage: () => async (dispatch) => {
      const hideMessages = () => {
         dispatch(UsersActionCreators.setMessage(''))
         dispatch(UsersActionCreators.setError(''))
      }
      setTimeout(hideMessages, 3000);
   }
}

function fillLocal(data, accessToken) {
   console.log(data)
   const { id, name, login, email, apiKey, apiToken, status, role_id, email_activated, settings } = data
   localStorage.setItem('token', accessToken)
   localStorage.setItem('role', role_id)
   localStorage.setItem('emailActivated', email_activated)
   localStorage.setItem('id', id)
   localStorage.setItem('status', status)
   localStorage.setItem('name', name)
   localStorage.setItem('login', login)
   localStorage.setItem('email', email)
   localStorage.setItem('apiKey', apiKey)
   localStorage.setItem('apiToken', apiToken)
   localStorage.setItem('avitoMinPrice', settings.avito_min_price)
   localStorage.setItem('companyAdress', settings.company_adress)
   localStorage.setItem('companyPhone', settings.company_phone)
   localStorage.setItem('defaultText', prepareText(settings.default_text))
}

function prepareText(text) {
   const textReplaceBr = text.replace(/<br \/>/g, '\n')
   const textReplaceP = textReplaceBr.replace(/<p>/g, '')
   const textReplacePP = textReplaceP.replace(/<\/p>/g, '')
   return textReplacePP
}