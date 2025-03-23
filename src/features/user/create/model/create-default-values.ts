import type { UserFormData } from './create-user.schema';

export const createDefaultValues = (): UserFormData => {
    return {
        profileInfo: {
            firstName: '',
            lastName: '',
            signUpForm: 'LOCAL',
        },
        contactInfo: {
            email: '',
        },
        passwordInfo: {
            password: '',
        },
    };
};
