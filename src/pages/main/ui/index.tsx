import { UsersTable } from '@widgets/users-table';

import type { FC, JSX } from 'react';

export const MainPage: FC = (): JSX.Element => {
    return (
        <main className='grid min-h-svh pt-20 pr-20 pl-20'>
            <UsersTable />
        </main>
    );
};

export default MainPage;
