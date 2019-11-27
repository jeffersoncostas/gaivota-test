export enum CredentialActionTypes {
    LOGIN,
    LOGOUT
}
export type CredentialActions =
    | { type: CredentialActionTypes.LOGIN }
    | { type: CredentialActionTypes.LOGOUT };

export interface Credential {
    email: string;
    isLogged: boolean;
}

type State = Credential;

const initialState: State = {
    email: '',
    isLogged: false
};

const CredetialReducer = (
    state = initialState,
    action: CredentialActions
): State => {
    switch (action.type) {
        case CredentialActionTypes.LOGIN:
            return { ...state, isLogged: true };

        default:
            return state;
    }
};

export default CredetialReducer;
