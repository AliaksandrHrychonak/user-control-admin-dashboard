import { z } from 'zod';

import { emailScheme, firstNameScheme, lastNameScheme, passwordScheme } from '@shared/api';
import { createStepSchema } from '@shared/lib';

export const userFormSchema = createStepSchema({
    profileInfo: z.object({
        firstName: firstNameScheme,
        lastName: lastNameScheme,
        // TODO Errors texts should be in the config, need fix after review
        signUpForm: z.enum(['LOCAL'], {
            required_error: 'Please select a valid sign up method',
            invalid_type_error: 'Sign up method must be either LOCAL',
        }),
    }),
    contactInfo: z.object({
        email: emailScheme,
    }),
    passwordInfo: z.object({
        password: passwordScheme,
    }),
});

export type UserFormSchema = typeof userFormSchema;
export type UserFormData = z.infer<typeof userFormSchema>;
