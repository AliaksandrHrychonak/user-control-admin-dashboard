'use client'


import {useRouter} from "next/navigation";
import React from 'react';
import {useDispatch} from "react-redux";

import {invalidateTokens} from "@shared/api";
import {Button} from "@shared/ui";

import type {JSX} from 'react';

export const ButtonLogout = (): JSX.Element => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <Button
            variant='ghost'
            onClick={() => {
                dispatch(invalidateTokens());
                router.push('/sign-in');
            }}
            className='fixed top-5 right-5'
        >
            Logout
        </Button>
    );
};
