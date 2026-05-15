<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

trait HasSortable
{
    // créer un scope pour organiser la requête HTTP avec "sort" & "dir"
    #[Scope]
    protected function orderFromRequest(Builder $builder, Request $request): Builder
    {
        // si pas de sortable dans la requête, on ne fait rien
        if(empty($this->sortable)) {
            return $builder;
        }

        // validation
        $validated = $request->validate([
            'dir' => ['nullable', Rule::in(['asc', 'desc'])],
            'sort' => ['nullable', Rule::in($this->sortable)]
        ]);

        // si pas de clé "sort" dans la requête, organiser par défaut sur date de création
        if(empty($validated['sort'])) {
            return $builder->orderByDesc('created_at');
        }

        // si clé "sort" présente, organiser le tri selon sa valeur
        return $builder->orderBy(
            $validated['sort'],
            $validated['dir'] ?? 'desc'
        );
    }

}
