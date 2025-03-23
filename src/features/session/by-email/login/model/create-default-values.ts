import type { LoginFormData } from './login.schema';

export const createDefaultValues = (): LoginFormData => {
    return {
        email: '',
        password: '',
    };
};
