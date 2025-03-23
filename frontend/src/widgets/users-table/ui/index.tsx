'use client';

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Plus } from 'lucide-react';
import { useState} from 'react';

import { useListQuery } from '@entities/user';
import {
    CreateUserFormView,
    useUserBlockController,
    useUserDeleteController,
    useUserUnblockController,
} from '@features/user';
import { DialogProvider } from '@shared/lib';
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
            return SORTABLE_COLUMNS.includes('email') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='p-0'
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
            return SORTABLE_COLUMNS.includes('firstName') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='p-0'
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
            return SORTABLE_COLUMNS.includes('lastName') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='p-0'
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
            return SORTABLE_COLUMNS.includes('lastSeenAt') ? (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='p-0'
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
];

export const UsersTable = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<ColumnSort[]>([
        {
            id: 'lastSeenAt',
            desc: false,
        },
    ]);

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
    };

    const handleUnblock = async (): Promise<void> => {
        await onUnblock(selectedUsers);
    };

    const handleDelete = async (): Promise<void> => {
        await onDelete(selectedUsers);
    };

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-4'>
                <Input
                    placeholder='Search users...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='max-w-sm'
                />
                <div className='space-x-2'>
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
                    <Button onClick={handleBlock} disabled={!selectedUsers.users.length}>
                        Block
                    </Button>
                    <Button onClick={handleUnblock} disabled={!selectedUsers.users.length}>
                        Unblock
                    </Button>
                    <Button onClick={handleDelete} disabled={!selectedUsers.users.length} variant='destructive'>
                        Delete
                    </Button>
                </div>
            </div>
            <div className='rounded-md border'>
                <Table>
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
                                    Loading...
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
            <div className='flex items-center justify-between space-x-2 py-4'>
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
