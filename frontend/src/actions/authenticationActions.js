
export const setAuthenticatedAction = (isAuthenticated) => {
  return {
    type: 'SET_AUTHENTICATED',
    data: {
      isAuthenticated,
    }
  }
}
