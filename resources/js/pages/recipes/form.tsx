import { withAppLayout } from '@/layouts/app-layout';
import type { BreadcrumbItem, RecipeDetailed } from '@/types';
import recipes from '@/routes/recipes';
import { Form, Head } from '@inertiajs/react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TopActions } from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import { type SelectOption, SelectWithItems } from '@/components/ui/select-with-items';
import { ImageInput } from '@/components/ui/image-input';
import { Card, CardContent } from '@/components/ui/card';
import { IngredientsField } from '@/components/forms/ingredients-field';
import StepsField from '@/components/forms/steps-field';
import { useState } from 'react';

type Props = {
    recipe: RecipeDetailed;
    levels: SelectOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recettes',
        href: recipes.index().url,
    },
    {
        title: 'Editer',
        href: '#',
    },
];

export default withAppLayout<Props>(breadcrumbs, ({ recipe, levels }: Props) => {
    const action = recipe.id ? recipes.update.form({ recipe: recipe.id }) : recipes.store.form();

    const [ingredients, setIngredients] = useState(recipe.ingredients);

    return (
        <>
            <Head title="Editer une recette" />
            <Form {...action} className="space-y-4">
                {({ errors, processing, progress }) => (
                    <div className="grid items-start gap-8 md:grid-cols-[1fr_350px]">
                        <main className="space-y-4">
                            <FormField label="Nom" htmlFor="name" error={errors['name']}>
                                <Input id="name" name="name" defaultValue={recipe.name} aria-invalid={!!errors['name']} />
                            </FormField>
                            <FormField label="Description" htmlFor="description" error={errors['description']}>
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    defaultValue={recipe.description}
                                    aria-invalid={!!errors['description']}
                                />
                            </FormField>
                            <StepsField ingredients={ingredients} steps={recipe.steps} errors={errors}/>
                        </main>
                        <Card>
                            <ImageInput
                                id="image"
                                progress={progress?.progress}
                                className="aspect-video"
                                name="image"
                                aria-invalid={!!errors['image']}
                                defaultValue={recipe.image}
                            />
                            <CardContent className="space-y-4 px-4 pb-6">
                                <FormField label="Nombre de personnes" htmlFor="persons" error={errors['persons']}>
                                    <Input id="persons" name="persons" type="number" min="1" defaultValue={recipe.persons} aria-invalid={!!errors['persons']} />
                                </FormField>

                                <FormField label="Durée (en minutes)" htmlFor="duration" error={errors['duration']}>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        min="1"
                                        defaultValue={recipe.duration}
                                        aria-invalid={!!errors['duration']}
                                    />
                                </FormField>

                                <FormField label="Niveau de difficulté" htmlFor="level" error={errors['level']}>
                                    <SelectWithItems items={levels} id="level" name="level" defaultValue={recipe.level} aria-invalid={!!errors['level']} />
                                </FormField>

                                <IngredientsField
                                  ingredients={ingredients}
                                  onValueChange={setIngredients}
                                  errors={errors}
                                />
                            </CardContent>
                        </Card>

                        <TopActions>
                            <Button disabled={processing}>
                                <SaveIcon /> Enregistrer
                            </Button>
                        </TopActions>
                    </div>
                )}
            </Form>
        </>
    );
});
