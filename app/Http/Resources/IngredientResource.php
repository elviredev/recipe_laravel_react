<?php

namespace App\Http\Resources;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Ingredient $resource
 */
class IngredientResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'unit' => $this->resource->unit,
            'unit_label' => $this->resource->unit->label(),
            'image' => $this->resource->getFirstMediaUrl('image', 'thumb'),
        ];
    }
}
