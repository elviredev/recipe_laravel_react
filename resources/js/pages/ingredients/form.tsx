import { withAppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem, Ingredient } from '@/types';
import ingredients from '@/routes/ingredients';
import { Form } from '@inertiajs/react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { TopActions } from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import { SelectOption, SelectWithItems } from '@/components/ui/select-with-items';
import { ImageInput } from '@/components/ui/image-input';

type Props = {
    ingredient: Ingredient;
    units: SelectOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ingrédients',
        href: ingredients.index().url,
    },
    {
        title: 'Editer',
        href: '#',
    },
];

export default withAppLayout<Props>(breadcrumbs, ({ ingredient, units }) => {
    const action = ingredient.id ? ingredients.update.form({ ingredient: ingredient.id }) : ingredients.store.form()

    return (
        <Form {...action} className="space-y-4">
            {({ errors, processing, progress }) => (
                <>
                    <FormField label="Image" error={errors['image']}>
                        <ImageInput progress={progress?.progress} className="w-40 aspect-square" id="image" name="image" aria-invalid={!!errors['image']} defaultValue={ingredient.image} />
                    </FormField>
                    <FormField label="Nom" htmlFor="name" error={errors['name']}>
                        <Input id="name" name="name" defaultValue={ingredient.name} aria-invalid={!!errors['name']} />
                    </FormField>

                    <FormField label="Unité de mesure" htmlFor="unit" error={errors['unit']}>
                        <SelectWithItems
                            items={units}
                            id="unit"
                            name="unit"
                            defaultValue={ingredient.unit}
                            aria-invalid={!!errors['unit']}
                        />
                    </FormField>

                    <TopActions>
                        <Button type="submit" disabled={processing}>
                            <SaveIcon /> Enregistrer
                        </Button>
                    </TopActions>
                </>
            )}
        </Form>
    );
});
