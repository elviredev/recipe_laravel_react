import { PropsWithChildren } from 'react';

export function TopActions(props: PropsWithChildren) {
    return <div
        className="absolute top-1.5 right-4 lg:right-6 flex items-center gap-2 justify-end"
        {...props}
    />
}
