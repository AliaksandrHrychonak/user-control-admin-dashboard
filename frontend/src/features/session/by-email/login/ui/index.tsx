'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormFieldProvider } from '@shared/lib';
import { Form, FormControl, FormItem, FormLabel, FormMessage, Input, Button } from '@shared/ui';

import { useLoginFormController, createDefaultValues, LoginFormSchema } from '../model';

import type { LoginFormData } from '../model';
import type { FC } from 'react';

interface ILoginFormProps {
    onComplete?: () => void;
}

export const LoginForm: FC<ILoginFormProps> = ({ onComplete }) => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: createDefaultValues(),
        mode: 'onChange',
    });

    const {
        formState: { isValid },
    } = form;

    const { handleSubmit } = useLoginFormController({
        onComplete: () => {
            onComplete?.();
            form.reset();
        },
    });

    const canSubmit = [isValid].every(Boolean);

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex size-full flex-col overflow-hidden p-2 gap-4'
            >
                <FormFieldProvider
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='example@mail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormFieldProvider
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='*' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={!canSubmit}>
                    Sign in with email
                </Button>
            </form>
        </Form>
    );
};
