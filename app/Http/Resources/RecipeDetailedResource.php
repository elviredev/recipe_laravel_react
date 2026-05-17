<?php

namespace App\Http\Resources;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeStep;
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
      'ingredients' => $this->resource->ingredients->map(fn (Ingredient $ingredient) => [
        'id' => $ingredient->id,
        'name' => $ingredient->name,
        'unit_label' => $ingredient->unit->label(),
        'quantity' => $ingredient->pivot->quantity,
      ]),
      'steps' => $this->resource->steps->map(fn (RecipeStep $step) => [
        'id' => $step->id,
        'description' => $step->description,
        'duration' => $step->duration,
        'position' => $step->position,
        'ingredients' => $step->ingredients->map(fn (Ingredient $ingredient) => [
          'id' => $ingredient->id,
          'name' => $ingredient->name,
        ]),
      ])
    ];
  }
}
