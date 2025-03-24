'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { RegisterForm } from '@features/session';
import { Button } from '@shared/ui';

import type {JSX} from 'react';

const SignUpPage = (): JSX.Element => {
    const router = useRouter();
    return (
        <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <section className='rounded-xl border bg-card text-card-foreground shadow w-full max-w-sm p-6'>
                <h1 className='font-semibold tracking-tight text-2xl px-2'>Sign up</h1>
                <p className='text-sm text-muted-foreground px-2'>Enter your info below to sign up</p>
                <Button
                    variant='link'
                    onClick={() => router.push('/sign-in')}
                    className='text-sm text-muted-foreground px-2 py-0 h-fit'
                >
                    Already have an account? Sign in ⇒
                </Button>
                {/*// TODO Routes should be taken from the config, need fix after review*/}
                <RegisterForm onComplete={() => router.push('/sign-in')} />
            </section>
        </main>
    );
};

export default SignUpPage;
