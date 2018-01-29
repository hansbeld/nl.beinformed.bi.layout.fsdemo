// @flow
export type AuthState = {
  isAuthenticated: boolean,
  mustChangePassword: boolean
};

// REDUCER
const initialState = {
  isAuthenticated: false,
  mustChangePassword: false,
  error: null
};

/**
 * Auth reducer
 */
export default function authReducer(
  state: AuthState = initialState,
  action: Action
) {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        mustChangePassword: false
      };

    case "AUTHENTICATION_ERROR":
      return {
        ...state,
        mustChangePassword: false,
        error: action.payload
      };

    case "AUTHENTICATION_LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        error: null
      };
    }

    case "CHANGE_PASSWORD":
      return {
        ...state,
        isAuthenticated: true,
        mustChangePassword: true,
        error: null
      };

    default:
      return state;
  }
}
