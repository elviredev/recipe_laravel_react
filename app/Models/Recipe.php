<?php

namespace App\Models;

use App\Models\Enum\RecipeLevel;
use App\Models\Traits\HasSortable;
use Database\Factories\RecipeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Recipe extends Model implements HasMedia
{
    /** @use HasFactory<RecipeFactory> */
    use HasFactory, HasSortable, InteractsWithMedia;

    protected $fillable = [
        'name',
        'persons',
        'duration',
        'description',
        'level',
    ];

    protected $sortable = [
        'name',
        'persons',
        'duration',
        'level',
    ];

    protected $casts = [
        'level' => RecipeLevel::class,
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->width(300)
            ->height(300)
            ->sharpen(10);
    }

  /**
   * Une recette peut contenir plusieurs ingrédients.
   * Un ingrédient peut être utilisé dans plusieurs recettes.
   * Table pivot : ingredient_recipe. La relation ne passe pas par une clé étrangère, mais par une table intermédiaire.
   * @return BelongsToMany
   */
    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class)->withPivot('quantity');
    }

  /**
   * Une recette possède plusieurs étapes.
   * Chaque étape appartient à une seule recette (clé étrangère "recipe_id" dans la table recipe_steps).
   */
    public function steps(): HasMany
    {
        return $this->hasMany(RecipeStep::class)->orderBy('position');
    }
}
