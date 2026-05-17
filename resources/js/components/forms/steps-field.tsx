import { RecipeDetailed, RecipeIngredient, RecipeStep } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Sortable, SortableItem, SortableItemHandle } from '@/components/ui/sortable';



type Props = {
  steps: RecipeDetailed['steps'];
  errors: Record<string, string>;
  ingredients: RecipeIngredient[];
}

export default function StepsField(props: Props) {
  const [steps, setSteps] = useState(props.steps);
  const errors = props.errors;

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: `new-${Date.now()}`,
        duration: null,
        position: steps.length,
        description: '',
        ingredients: []
      }
    ])
  }

  const updateStep = (index: number, data: Partial<RecipeStep>) => {
    setSteps(steps.map((step, k) => k === index ? {...step, ...data} : step))
  }

    return (
        <div className="space-y-6">
            <Sortable value={steps} onValueChange={setSteps} getItemValue={(step) => step.id.toString()} strategy="vertical" className="space-y-4">
                {steps.map((step, index) => (
                    <SortableItem value={step.id.toString()} key={step.id} className="grid grid-cols-[24px_1fr]">
                        <SortableItemHandle className="text-muted-foreground/50 h-full hover:text-muted-foreground draghandle"></SortableItemHandle>
                        <div>
                            <h2 className="mb-2 flex items-center gap-2 text-lg">Etape #{index + 1}</h2>
                            <input type="hidden" name={`steps.${index}.id`} value={step.id} />
                            <input type="hidden" name={`steps.${index}.position`} value={index} />

                            <Card>
                                <CardContent className="space-y-4 p-4">
                                    <FormField label="Durée" htmlFor={`duration${index}`} error={errors[`steps.${index}.duration`]}>
                                        <div className="flex items-baseline gap-2">
                                            <Input
                                                type="number"
                                                id={`duration${index}`}
                                                name={`steps.${index}.duration`}
                                                defaultValue={step.duration ?? ''}
                                                className="w-30"
                                                aria-invalid={!!errors[`steps.${index}.duration`]}
                                            />
                                            min
                                        </div>
                                    </FormField>
                                    <FormField label="Description" htmlFor={`description${index}`} error={errors[`steps.${index}.description`]}>
                                        <Textarea
                                            id={`description${index}`}
                                            name={`steps.${index}.description`}
                                            rows={4}
                                            defaultValue={step.description}
                                            aria-invalid={!!errors[`steps.${index}.description`]}
                                        />
                                    </FormField>
                                    <IngredientsCombobox
                                        used={step.ingredients.map((ingr) => ingr.id)}
                                        ingredients={props.ingredients}
                                        onSelect={(ingredient) => updateStep(index, { ingredients: [...step.ingredients, ingredient] })}
                                    />
                                    <ul>
                                        {step.ingredients.map((ingredient) => (
                                            <li key={ingredient.id} className="flex items-center border-b py-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mr-1 flex-none text-muted-foreground"
                                                    onClick={() =>
                                                        updateStep(index, { ingredients: step.ingredients.filter((ingr) => ingr.id !== ingredient.id) })
                                                    }
                                                >
                                                    <TrashIcon />
                                                </Button>
                                                {ingredient.name}
                                                <input type="hidden" value={ingredient.id} name={`steps.${index}.ingredients[]`} />
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </SortableItem>
                ))}
            </Sortable>

            <Button type="button" variant="secondary" onClick={addStep}>
                <PlusIcon /> Ajouter une étape
            </Button>
        </div>
    );
}

type IngredientsComboboxProps = {
  used: number[];
  onSelect: (v: RecipeIngredient) => void;
  ingredients: RecipeIngredient[];
}

function IngredientsCombobox({onSelect, ingredients, used}: IngredientsComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filteredIngredients = ingredients.filter(ingr => !used.includes(ingr.id));
  if(filteredIngredients.length === 0) return null;

  return (
      <Command className="relative overflow-visible">
          <CommandInput
            value={search}
            onValueChange={setSearch}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            placeholder="Ajouter un ingrédient"
          />
        {open && <CommandList className="bg-card absolute z-100 shadow-xl top-full left-0 right-0 rounded-lg">
          <CommandEmpty>Aucun ingrédient trouvé.</CommandEmpty>
          <CommandGroup>
            {filteredIngredients.map(ingredient => (
              <CommandItem
                onMouseDown={e => e.preventDefault()}
                key={ingredient.id}
                onSelect={() => {
                  onSelect(ingredient)
                }}
              >
                {ingredient.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>}
      </Command>
  );
}
