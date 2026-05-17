<?php

use App\Models\Ingredient;
use App\Models\RecipeStep;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('ingredient_recipe_step', function (Blueprint $table) {
      $table->primary(['ingredient_id', 'recipe_step_id']);
      $table->foreignIdFor(Ingredient::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(RecipeStep::class)->constrained()->cascadeOnDelete();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('ingredient_recipe_step');
  }
};
