import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';


const AppLayout = function AppLayout({ breadcrumbs = [], children,}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const page = usePage();

    useEffect(() => {
        if (page.props.flash.success) {
            toast.success(page.props.flash.success)
        }
        if (page.props.flash.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props.flash])

    return <AppLayoutTemplate breadcrumbs={breadcrumbs}>
        {children}
        <Toaster richColors position="top-center" closeButton />
    </AppLayoutTemplate>;
};

export function withAppLayout<T>(breadcrumbs: BreadcrumbItem[], component: FunctionComponent<T>) {
    // @ts-expect-error layout exists for inertia
    component.layout = (page: ReactNode) => (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 lg:p-6">{page}</div>
        </AppLayout>
    );
    return component;
}

export default AppLayout;
