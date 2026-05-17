import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export interface Recipe {
    id: number;
    name: string;
    persons: number;
    duration: number;
    level: string;
    level_label: string;
    image: string;
}

export interface RecipeIngredient {
    id: number;
    name: string;
    quantity: number | null;
    unit_label: string;
}

export interface RecipeDetailed extends Recipe {
    description: string;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
}

export interface RecipeStep {
    id: number | string;
    description: string;
    duration: number | null;
    position: number;
    ingredients : {
      name: string;
      id: number;
    }[]
}

export interface Ingredient {
    id: number;
    name: string;
    image: string;
    unit: string;
    unit_label: string;
}
