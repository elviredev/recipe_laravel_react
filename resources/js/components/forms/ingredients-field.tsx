import { Ingredient, RecipeIngredient } from '@/types';
import { Input } from '@/components/ui/input';
import { ValidationErrors } from '@/components/ui/validation-errors';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandLoading,
} from "@/components/ui/command"
import { router, usePage } from '@inertiajs/react';
import { FormField } from '@/components/ui/form-field';

type Props = {
  ingredients: RecipeIngredient[]
  errors: Record<string, string>
}

export function IngredientsField(props: Props) {
  const [ingredients, setIngredients] = useState(props.ingredients)
  const focusRef = useRef(false)

  useEffect(() => {
    focusRef.current = true
  }, [])

  const onRemove = (id: number) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }

  const onAdd = (ingredient: Ingredient) => {
    setIngredients([
      ...ingredients,
      {
        id: ingredient.id,
        quantity: null,
        unit_label: ingredient.unit_label,
        name: ingredient.name,
      }
    ])
  }

  return (
    <FormField label="Ingrédients">
      <div className="space-y-2">
        <ValidationErrors prefix="ingredients" />
        <ul className="space-y-2">
          {ingredients.map((ingredient, k) => (
            <li key={ingredient.id} className="flex items-center gap-2">
              <Input
                autoFocus={focusRef.current}
                aria-invalid={!!props.errors[`ingredients.${k}.quantity`]}
                name={`ingredients.${k}.quantity`}
                type="number"
                defaultValue={ingredient.quantity ?? ''}
                className="w-15 flex-none"
              />
              <input type="hidden" name={`ingredients.${k}.id`} defaultValue={ingredient.id} />
              <div className="flex-none text-sm text-muted-foreground">
                {ingredient.unit_label}
              </div>
              <div className="h-3 w-full border-b border-dashed border-muted-foreground/50" />
              <div className="text-sm whitespace-nowrap">
                {ingredient.name}
              </div>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="flex-none"
                onClick={() => onRemove(ingredient.id)}
              >
                <TrashIcon className="size-4" />
              </Button>
            </li>
          ))}
        </ul>

        <IngredientsCombobox onSelect={onAdd} />

      </div>
    </FormField>
  )
}

function IngredientsCombobox(props: { onSelect: (ingredient: Ingredient) => void }) {
  const page = usePage<{ingredients: Ingredient[]}>()
  const ingredients = page.props.ingredients ?? []
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = (s: string) => {
    setSearch(s)
    clearTimeout(timerRef.current)
    router.cancelAll()
    if (s.length < 2) return
    setFetching(true)

    timerRef.current = setTimeout(() => {
      router.reload({
        only: ['ingredients'],
        data: { q: s },
        onSuccess (){
          setFetching(false)
        }
      })
    }, 300)
  }

  const onSelect = (ingredient: Ingredient) => {
    setSearch('')
    props.onSelect(ingredient)
  }

  console.log(ingredients);

  return <Command shouldFilter={false} className="max-w-sm rounded-lg border">
    <CommandInput
      value={search}
      onValueChange={handleSearch}
      placeholder="Ajouter un ingrédient"
    />
    {search.length >= 2 && <CommandList>
      {fetching ? (
        <CommandLoading>Recherche...</CommandLoading>
      ) : (
        <>
        <CommandEmpty>Aucun ingrédient trouvé</CommandEmpty>
          <CommandGroup>
            {ingredients.map(ingredient => (
              <CommandItem key={ingredient.id} onSelect={() => onSelect(ingredient)}>
                {ingredient.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </>
      )}
    </CommandList>}
  </Command>
}
