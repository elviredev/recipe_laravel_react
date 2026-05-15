<?php

namespace App\Http\Resources;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Recipe $resource
 */
class RecipeResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'persons' => $this->resource->persons,
            'duration' => $this->resource->duration,
            'level' => $this->resource->level,
            'level_label' => $this->resource->level->label(),
            'image' => $this->resource->getFirstMediaUrl('image', 'thumb'),
        ];
    }
}
