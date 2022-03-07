import { UserService, AuthService } from '../../services'

export const UsersActions = {
   SET_USERS: 'SET_USERS',
   SET_CURRENT_USER: 'SET_CURRENT_USER',
   SET_SETTINGS: 'SET_SETTINGS',
   SET_ERROR: 'SET_ERROR',
   SET_MESSAGE: 'SET_MESSAGE',
   SET_IS_LOADING: 'SET_IS_LOADING'
}

export const UsersActionCreators = {
   setUsers: (users) => ({ type: UsersActions.SET_USERS, payload: users }),
   setCurrentUser: (current) => ({ type: UsersActions.SET_CURRENT_USER, payload: current }),
   setSettings: (settings) => ({ type: UsersActions.SET_SETTINGS, payload: settings }),
   setError: (payload) => ({ type: UsersActions.SET_ERROR, payload }),
   setMessage: (payload) => ({ type: UsersActions.SET_MESSAGE, payload }),
   setIsLoading: (payload) => ({ type: UsersActions.SET_IS_LOADING, payload }),

   fetchUsers: () => async (dispatch) => {
      try {
         const users = await UserService.fetchUsers()
         dispatch(UsersActionCreators.setUsers(users.data))
      } catch (err) {
         processError(err, dispatch)
      }
   },

   getUserProfile: (current) => async (dispatch) => {
      try {
         dispatch(UsersActionCreators.setCurrentUser(current))
      } catch (err) {
         processError(err, dispatch)
      }
   },

   updateUserProfile: (current) => async (dispatch) => {
      try {
         dispatch(UsersActionCreators.setCurrentUser(current.userProfile || current))
         const response = await UserService.updateUserProfile(current)
         dispatch(UsersActionCreators.setMessage(response.data.message))
         dispatch(UsersActionCreators.showHideMessage())
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(UsersActionCreators.setError(errMessage))
         dispatch(UsersActionCreators.showHideMessage())
      }
   },

   updateSettings: (settings) => async (dispatch) => {
      try {
         dispatch(UsersActionCreators.setSettings(settings))
         const response = await UserService.updateSettings(settings)
         dispatch(UsersActionCreators.setMessage(response.data.message))
         dispatch(UsersActionCreators.showHideMessage())
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(UsersActionCreators.setError(errMessage))
         dispatch(UsersActionCreators.showHideMessage())
      }
   },

   addAccount: (authData) => async (dispatch) => {
      try {
         dispatch(UsersActionCreators.setIsLoading(true))
         const authResponse = await AuthService.register(authData)
         if(authResponse) {
            dispatch(UsersActionCreators.setMessage('Аккаунт успешно зарегистрирован'))
            dispatch(UsersActionCreators.showHideMessage())
         }
      } catch (err) {
         const errMessage = err.response?.data?.message
         console.log(errMessage)
         dispatch(UsersActionCreators.setError(errMessage))
         dispatch(UsersActionCreators.showHideMessage())
      }
   },

   addUserProfile: (regData) => async (dispatch) =>  {
      try {
         const response = await AuthService.register(regData)
         dispatch(UsersActionCreators.fetchUsers())
      } catch (err) {
         processError(err, dispatch)
      }
   },

   deleteUserProfile: (userData) => async (dispatch) => {
      try {
         UserService.deleteUserProfile(userData)
         dispatch(UsersActionCreators.fetchUsers())
      } catch (err) {
         processError(err, dispatch)
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

function processError(err, dispatch) {
   const errMessage = err.response?.data?.message
   console.log(errMessage)
   dispatch(UsersActionCreators.setError(errMessage))
}