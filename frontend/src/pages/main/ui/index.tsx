import { ButtonLogout } from '@features/session';
import { UsersTable } from '@widgets/users-table';

import type { FC, JSX } from 'react';

export const MainPage: FC = (): JSX.Element => {
    return (
        <main className='grid min-h-svh pt-20 pr-20 pl-20 max-[900px]:pr-5 max-[900px]:pl-5'>
            <ButtonLogout />
            <UsersTable />
        </main>
    );
};

export default MainPage;
