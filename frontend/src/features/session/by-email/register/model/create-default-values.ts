import type { RegisterFormData } from './register.schema';

export const createDefaultValues = (): RegisterFormData => {
    return {
        profileInfo: {
            firstName: '',
            lastName: '',
        },
        contactInfo: {
            email: '',
        },
        passwordInfo: {
            password: '',
            confirmPassword: '',
        },
    };
};
