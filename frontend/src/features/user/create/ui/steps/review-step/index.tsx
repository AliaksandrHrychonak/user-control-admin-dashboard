'use client';

import { useMultiStepFormContext } from '@shared/lib';
import { Button } from '@shared/ui';

import { useUserCreateFormContext } from '../../../model';

import type { userFormSchema } from '../../../model';
import type { JSX } from 'react';

export const ReviewStep = (): JSX.Element => {
    const { prevStep, form, isValid } = useMultiStepFormContext<typeof userFormSchema>();
    const values = form.getValues();
    const { isLoading } = useUserCreateFormContext();

    return (
        <div className='flex flex-col space-y-4'>
            <dl className='flex flex-col space-y-2 text-sm'>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-semibold'>First Name:</dt>
                    <dd>{values.profileInfo.firstName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-semibold'>Last Name:</dt>
                    <dd>{values.profileInfo.lastName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-semibold'>Sign up form:</dt>
                    <dd>{values.profileInfo.signUpForm}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-semibold'>Email:</dt>
                    <dd>{values.contactInfo.email}</dd>
                </div>
            </dl>
            <footer className='flex justify-end space-x-2'>
                <Button type='button' variant='outline' onClick={prevStep}>
                    Back
                </Button>
                <Button type='submit' autoFocus disabled={!isValid || isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                </Button>
            </footer>
        </div>
    );
};
