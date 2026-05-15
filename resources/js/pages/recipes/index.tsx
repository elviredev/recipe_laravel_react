import { withAppLayout } from '@/layouts/app-layout'
import { BreadcrumbItem, PaginatedCollection, Recipe } from '@/types';
import recipes from '@/routes/recipes';
import { TopActions } from '@/components/top-actions';
import { Form, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SortableTableHead } from '@/components/sortable-table-head';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { CollectionPagination } from '@/components/collection-pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Recettes',
    href: recipes.index().url,
  },
];

type Props = {
  collection: PaginatedCollection<Recipe>;
  q: string | null;
};

export default withAppLayout(breadcrumbs, ({ collection, q }: Props) => {
  return (
      <div className="space-y-4">
          <TopActions>
              <Form {...recipes.index.form()} className="flex items-center gap-1">
                  <Input autoFocus defaultValue={q ?? ''} placeholder="Rechercher une recette" name="q" />
                  <Button>Rechercher</Button>
              </Form>
          </TopActions>
          <Table>
              <TableHeader>
                  <TableRow>
                      <SortableTableHead className="w-5" field="id">
                          ID
                      </SortableTableHead>
                      <TableHead className="w-20" />
                      <SortableTableHead field="name">Nom</SortableTableHead>
                      <SortableTableHead field="persons">Personnes</SortableTableHead>
                      <SortableTableHead field="duration">Durée (min)</SortableTableHead>
                      <SortableTableHead field="level">Niveau</SortableTableHead>
                      <TableHead className="w-20 text-end">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                      <TableCell colSpan={7}>
                          <Button asChild variant="outline" className="w-full">
                              <Link href={recipes.create()}>
                                  <PlusIcon />
                                  Ajouter une recette
                              </Link>
                          </Button>
                      </TableCell>
                  </TableRow>

                  {collection.data.map((item) => (
                      <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell className="px-0">
                              {item.image ? (
                                  <img src={item.image} alt="" className="aspect-square w-20 rounded-lg object-cover" />
                              ) : (
                                  <div className="aspect-square size-20 bg-background" />
                              )}
                          </TableCell>
                          <TableCell>
                              <Link
                                  className="hover:underline"
                                  href={recipes.edit({
                                      recipe: item.id,
                                  })}
                              >
                                  {item.name}
                              </Link>
                          </TableCell>
                          <TableCell>{item.persons}</TableCell>
                          <TableCell>{item.duration}</TableCell>
                          <TableCell>{item.level_label}</TableCell>
                          <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                  <Button asChild size="icon" variant="outline">
                                      <Link
                                          href={recipes.edit({
                                              recipe: item.id,
                                          })}
                                      >
                                          <EditIcon size={16} />
                                      </Link>
                                  </Button>
                                  <Button asChild size="icon" variant="destructive-outline">
                                      <Link
                                          href={recipes.destroy({
                                              recipe: item.id,
                                          })}
                                          onBefore={() => confirm('Voulez vous vraiment supprimer cette recette')}
                                      >
                                          <TrashIcon size={16} />
                                      </Link>
                                  </Button>
                              </div>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
          <CollectionPagination collection={collection} />
      </div>
  );
})
