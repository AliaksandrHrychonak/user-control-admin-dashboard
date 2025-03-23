'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { LoginForm } from '@features/session';
import { Button } from '@shared/ui';

import type {JSX} from 'react';

const SignInPage = (): JSX.Element => {
    const router = useRouter();
    return (
        <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <section className='rounded-xl border bg-card text-card-foreground shadow w-full max-w-sm p-6'>
                <h1 className='font-semibold tracking-tight text-2xl px-2'>Login</h1>
                <p className='text-sm text-muted-foreground px-2 py-0'>
                    Enter your email below to login to your account
                </p>
                <Button
                    variant='link'
                    onClick={() => router.push('/sign-up')}
                    className='text-sm text-muted-foreground px-2 py-0 h-fit'
                >
                    No account yet? Sign up ⇒
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                </Button>
                // TODO Routes should be taken from the config, need fix after review
                <LoginForm onComplete={() => router.push('/')} />
            </section>
        </main>
    );
};

export default SignInPage;
