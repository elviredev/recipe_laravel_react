<?php

namespace App\Http\Resources;

use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;

/**
 * @property Recipe $resource
 */
class RecipeDetailedResource extends RecipeResource
{
  public static $wrap = null;

  public function toArray(Request $request): array
  {
    return [
      ...parent::toArray($request),
      'description' => $this->resource->description,
//      'ingredients' => $this->ingredients->map(fn (Ingredient $ingredient) => [
//        'id' => $ingredient->id,
//        'name' => $ingredient->name,
//        'unit_label' => $ingredient->unit->label(),
//        'quantity' => $ingredient->pivot->quantity,
//      ])
    ];
  }

}
