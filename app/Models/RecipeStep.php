<?php

namespace App\Models;

use Database\Factories\RecipeStepFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecipeStep extends Model
{
  /** @use HasFactory<RecipeStepFactory> */
  use HasFactory;

  protected $fillable = [
    'description',
    'duration',
    'position',
  ];

  /**
   * Une étape peut contenir plusieurs ingrédients.
   * Un ingrédient peut être utilisé dans plusieurs étapes.
   * Table pivot "ingredient_recipe_step"
   */
  public function ingredients(): BelongsToMany
  {
    return $this->belongsToMany(Ingredient::class);
  }
}
