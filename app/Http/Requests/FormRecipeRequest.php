<?php

namespace App\Http\Requests;

use App\Models\Enum\RecipeLevel;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FormRecipeRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => ['required', 'string', 'min:3'],
      'persons' => ['required', 'integer', 'min:1'],
      'duration' => ['required', 'integer', 'min:1'],
      'description' => ['required', 'string', 'min:10'],
      'level' => ['required', Rule::enum(RecipeLevel::class)],
      'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
      'ingredients' => ['required', 'array', 'min:1'],
      'ingredients.*.id' => ['required', 'integer', 'min:1'],
      'ingredients.*.quantity' => ['nullable', 'integer', 'min:1'],
      'steps' => ['required', 'array', 'min:1'],
      'steps.*.id' => ['required', 'string'],
      'steps.*.description' => ['required', 'string'],
      'steps.*.duration' => ['nullable', 'integer', 'min:1'],
      'steps.*.position' => ['required', 'integer', 'min:0'],
      'steps.*.ingredients' => ['nullable', 'array', 'min:0'],
      'steps.*.ingredients.*' => ['required', 'integer', 'min:1'],
    ];
  }
}
