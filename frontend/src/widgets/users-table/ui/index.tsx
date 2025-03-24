'use client';

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Plus, Trash, Lock, LockOpen } from 'lucide-react';
import {useRouter} from "next/navigation";
import { useState} from 'react';

import {useProfileQuery} from "@entities/session";
import { useListQuery } from '@entities/user';
import {
    BlockUserButton,
    CreateUserFormView, DeleteUserButton, UnblockUserButton,
    useUserBlockController,
    useUserDeleteController,
    useUserUnblockController,
} from '@features/user';
import {cn, DialogProvider} from '@shared/lib';
import {
    Button,
    Checkbox,
    DialogWindow,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Preloader,
} from '@shared/ui';

import type { IUser, IUserBlockRequest, IUserDeleteRequest, IUserUnblockRequest } from '@shared/api';
import type {
    ColumnDef,
    ColumnSort} from '@tanstack/react-table';
import type {JSX} from 'react';

// TODO need fix before review
const SORTABLE_COLUMNS = ['id', 'email', 'firstName', 'lastName', 'lastSeenAt'];
const PAGE_SIZES = [5, 10, 20, 50, 100];

export const columns: ColumnDef<IUser>[] = [
    {
        id: 'select',
        header: ({ table }): JSX.Element  => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }): JSX.Element => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'email',
        header: ({ column }): JSX.Element | string => {
            const isSorted = column.getIsSorted();
            return SORTABLE_COLUMNS.includes('email') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(isSorted === 'asc')}
                    className={cn(
                        'p-0',
                        isSorted && 'bg-accent text-accent-foreground'
                    )}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            ) : (
                'Email'
            );
        },
    },
    {
        accessorKey: 'firstName',
        header: ({ column }): JSX.Element | string => {
            const isSorted = column.getIsSorted();
            return SORTABLE_COLUMNS.includes('firstName') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(isSorted === 'asc')}
                    className={cn(
                        'p-0',
                        isSorted && 'bg-accent text-accent-foreground'
                    )}
                >
                    First Name
                    <ArrowUpDown />
                </Button>
            ) : (
                'First Name'
            );
        },
    },
    {
        accessorKey: 'lastName',
        header: ({ column }): JSX.Element | string => {
            const isSorted = column.getIsSorted();
            return SORTABLE_COLUMNS.includes('lastName') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(isSorted === 'asc')}
                    className={cn(
                        'p-0',
                        isSorted && 'bg-accent text-accent-foreground'
                    )}
                >
                    Last Name
                    <ArrowUpDown />
                </Button>
            ) : (
                'Last Name'
            );
        },
    },
    {
        accessorKey: 'lastSeenAt',
        header: ({ column }): JSX.Element | string => {
            const isSorted = column.getIsSorted();
            return SORTABLE_COLUMNS.includes('lastSeenAt') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(isSorted === 'asc')}
                    className={cn(
                        'p-0',
                        isSorted && 'bg-accent text-accent-foreground'
                    )}
                >
                    Last Seen
                    <ArrowUpDown />
                </Button>
            ) : (
                'Last Seen'
            );
        },
        cell: ({ row }): unknown => {
            return row.getValue('lastSeenAt');
        },
    },
    {
        accessorKey: 'blocked',
        header: 'blocked',
    }
];

export const UsersTable = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<ColumnSort[]>([
        {
            id: 'lastSeenAt',
            desc: true,
        },
    ]);
    const router = useRouter();

    const {data: dataProfile } = useProfileQuery()

    const { data, isLoading } = useListQuery({
        page,
        limit: pageSize,
        search: searchTerm,
        sortBy: sorting[0] ? `${sorting[0].id}:${sorting[0].desc ? 'DESC' : 'ASC'}` : '',
    });

    const { onBlock } = useUserBlockController({
        onComplete: () => setRowSelection([]),
    });
    const { onUnblock } = useUserUnblockController({
        onComplete: () => setRowSelection([]),
    });
    const { onDelete } = useUserDeleteController({
        onComplete: () => setRowSelection([]),
    });

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        state: {
            sorting,
            rowSelection,
        },
        manualPagination: true,
        pageCount: Math.ceil((data?.meta.totalItems ?? 0) / pageSize),
    });

    const selectedUsers: IUserDeleteRequest | IUserBlockRequest | IUserUnblockRequest = {
        users: Object.keys(rowSelection)
            .map((key) => data?.data[parseInt(key)]?.id ?? '')
            .filter(Boolean),
    };

    const handleBlock = async (): Promise<void> => {
        await onBlock(selectedUsers);
        if(dataProfile?.data?.id && selectedUsers.users.includes(dataProfile?.data?.id)) {
            router.push('/sign-up')
        }
    };

    const handleUnblock = async (): Promise<void> => {
        await onUnblock(selectedUsers);
    };

    const handleDelete = async (): Promise<void> => {
        await onDelete(selectedUsers);
        if(dataProfile?.data?.id && selectedUsers.users.includes(dataProfile?.data?.id)) {
            router.push('/sign-up')
        }
    };

    return (
        <div className='w-full max-w-[1440px] mx-auto overflow-hidden'>
            <div className='flex items-center justify-between py-4 max-[550px]:flex-col max-[550px]:items-start gap-5'>
                <Input
                    placeholder='Search users...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='max-w-sm'
                />
                <div className='flex items-center space-x-2'>
                    <DialogProvider>
                        <DialogWindow
                            trigger={
                                <Button>
                                    <Plus /> Create
                                </Button>
                            }
                        >
                            {({ renderHeader, renderCloseButton }) => {
                                return (
                                    <>
                                        {renderHeader?.({
                                            title: 'Create User',
                                            description:
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan mauris vitae diam facilisis gravida.',
                                        })}
                                        <CreateUserFormView />
                                        {renderCloseButton?.({})}
                                    </>
                                );
                            }}
                        </DialogWindow>
                    </DialogProvider>
                    <BlockUserButton onClick={handleBlock} disabled={!selectedUsers.users.length}>
                        <Lock />
                    </BlockUserButton>
                    <UnblockUserButton onClick={handleUnblock} disabled={!selectedUsers.users.length}>
                        <LockOpen />
                    </UnblockUserButton>
                    <DeleteUserButton onClick={handleDelete} disabled={!selectedUsers.users.length} variant='destructive'>
                        <Trash />
                    </DeleteUserButton>
                </div>
            </div>
            <div className="overflow-x-auto border rounded">
                        <Table className="w-full min-w-[800px]">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                            <Preloader />
                                        </TableCell>
                                    </TableRow>
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                </div>
            <div className='flex items-center justify-between space-x-2 py-4 max-[550px]:flex-col max-[550px]:items-start gap-5'>
                <div className='flex items-center space-x-2'>
                    <p className='text-sm font-medium'>Rows per page</p>
                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                        <SelectTrigger className='h-8 w-[70px]'>
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side='top'>
                            {PAGE_SIZES.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center space-x-6'>
                    <p className='text-sm text-muted-foreground'>
                        Page {page} of {Math.ceil((data?.meta.totalItems ?? 0) / pageSize)}
                    </p>
                    <div className='space-x-2'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page >= Math.ceil((data?.meta.totalItems ?? 0) / pageSize)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
