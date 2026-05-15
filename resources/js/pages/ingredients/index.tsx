import { withAppLayout } from '@/layouts/app-layout';
import ingredients from '@/routes/ingredients';
import { BreadcrumbItem, Ingredient, PaginatedCollection } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CollectionPagination } from '@/components/collection-pagination';
import { TopActions } from '@/components/top-actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, Link } from '@inertiajs/react';
import { SortableTableHead } from '@/components/sortable-table-head';
import { EditIcon,
    PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ingrédients',
        href: ingredients.index().url,
    },
];

type Props = {
    collection: PaginatedCollection<Ingredient>;
    q: string | null;
};

export default withAppLayout(breadcrumbs, ({ collection, q }: Props) => {
    return (
        <div className="space-y-4">
            <TopActions>
                <Form {...ingredients.index.form()} className="flex items-center gap-1">
                    <Input name="q" defaultValue={q ?? ''} autoFocus placeholder="Rechercher un ingrédient" />
                    <Button>Rechercher</Button>
                </Form>
            </TopActions>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableTableHead field="id">ID</SortableTableHead>
                        <TableHead />
                        <SortableTableHead field="name">Nom</SortableTableHead>
                        <SortableTableHead field="unit">Unité</SortableTableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={ingredients.create()}>
                                    <PlusIcon />
                                    Ajouter un ingrédient
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    {collection.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.image ?
                                <img src={item.image} alt="" className="aspect-square size-20 object-cover rounded-lg" /> :
                                <div className="aspect-square size-20 bg-gray-200"/>
                            }</TableCell>
                            <TableCell>
                                <Link
                                    href={ingredients.edit({ ingredient: item.id })}
                                    className="hover:underline"
                                >
                                    {item.name}
                                </Link>
                            </TableCell>
                            <TableCell>{item.unit_label}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 justify-end">
                                    <Button asChild size="icon" variant="outline">
                                        <Link href={ingredients.edit({ ingredient: item.id })}>
                                            <EditIcon size={16} />
                                        </Link>
                                    </Button>
                                    <Button asChild size="icon" variant="destructive-outline">
                                        <Link
                                            href={ingredients.destroy({ ingredient: item.id })}
                                            onBefore={() => confirm('Voulez-vous vraiment supprimer cet ingrédient ?')}
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
});
