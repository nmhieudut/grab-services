import * as ActionTypes from './types'

export const registerAction = (email, password, username, roles) => ({
    type: ActionTypes.AUTH_REGISTER,
    email,
    password,
    username,
    roles
});