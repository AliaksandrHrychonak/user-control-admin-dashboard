'use client';

import { MultiStepFormStep } from '@shared/ui';

import { ContactUserStep, PasswordStep, ProfileUserStep, ReviewStep } from './steps';
import { UserCreateFormProvider } from '../model';

import type { FC } from 'react';

interface CreateUserFormProps {}

export const CreateUserFormView: FC<CreateUserFormProps> = () => {
    return (
        <UserCreateFormProvider>
            <MultiStepFormStep name='contactInfo'>
                <ContactUserStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='profileInfo'>
                <ProfileUserStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='passwordInfo'>
                <PasswordStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='review'>
                <ReviewStep />
            </MultiStepFormStep>
        </UserCreateFormProvider>
    );
};
