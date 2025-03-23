'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib';

import type { ComponentProps } from 'react';


const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger>;
const SelectTrigger = ({ className, children, ...props }: SelectTriggerProps) => (
    <SelectPrimitive.Trigger
        data-slot='trigger'
        className={cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className='h-4 w-4 opacity-50' />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
);

type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>;
const SelectScrollUpButton = ({ className, ...props }: SelectScrollUpButtonProps) => (
    <SelectPrimitive.ScrollUpButton
        data-slot='scroll-up'
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronUp className='h-4 w-4' />
    </SelectPrimitive.ScrollUpButton>
);

type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownButton>;
const SelectScrollDownButton = ({ className, ...props }: SelectScrollDownButtonProps) => (
    <SelectPrimitive.ScrollDownButton
        data-slot='scroll-down'
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronDown className='h-4 w-4' />
    </SelectPrimitive.ScrollDownButton>
);

type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>;
const SelectContent = ({ className, children, position = 'popper', ...props }: SelectContentProps) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            data-slot='content'
            className={cn(
                'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
                position === 'popper' &&
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    'p-1',
                    position === 'popper' &&
                        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
);

type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>;
const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
    <SelectPrimitive.Label
        data-slot='label'
        className={cn('px-2 py-1.5 text-sm font-semibold', className)}
        {...props}
    />
);

type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;
const SelectItem = ({ className, children, ...props }: SelectItemProps) => (
    <SelectPrimitive.Item
        data-slot='item'
        className={cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
    >
        <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
            <SelectPrimitive.ItemIndicator>
                <Check className='h-4 w-4' />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
);

type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>;
const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
    <SelectPrimitive.Separator data-slot='separator' className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
);

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
