<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRecipeRequest;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeDetailedResource;
use App\Http\Resources\RecipeResource;
use App\Models\Enum\RecipeLevel;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Recipe::query()->with('media')->orderFromRequest($request);
        $search = $request->input('q');

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        return Inertia::render('recipes/index', [
            'q' => $search,
            'collection' => RecipeResource::collection(
                $query->paginate(10)
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $recipe = new Recipe([
            'level' => RecipeLevel::EASY,
            'persons' => 4,
            'duration' => 30,
        ]);

        return $this->edit($recipe);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRecipeRequest $request)
    {
        $recipe = Recipe::create($request->validated());
        $this->handleFormRequest($recipe, $request);

        return to_route('recipes.index')->with('success', 'La recette a bien été créée');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        return Inertia::render('recipes/form', [
            'recipe' => fn () => new RecipeDetailedResource($recipe),
            'levels' => fn () => RecipeLevel::getOptions(),
            'ingredients' => Inertia::optional($this->ingredients(...)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormRecipeRequest $request, Recipe $recipe)
    {
        $recipe->update($request->validated());
        $this->handleFormRequest($recipe, $request);

        return to_route('recipes.index')->with('success', "La recette a bien été mise à jour.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        $recipe->delete();

        return to_route('recipes.index')->with('success', "La recette a bien été supprimée.");
    }

    private function handleFormRequest(Recipe $recipe, FormRecipeRequest $request)
    {
        $image = $request->validated('image');

        if ($image && $image instanceof UploadedFile) {
            $recipe->clearMediaCollection('image');
            $recipe->addMedia($image)->toMediaCollection('image');
        }

        // On attache des ingrédients à la recette
        $recipe->ingredients()->sync(
            collect($request->validated('ingredients'))
                ->keyBy('id')
                ->select('quantity')
        );

        // on attache les étapes
        $steps = $request->validated('steps');
        foreach($steps as $data) {
          if(str_starts_with(haystack: $data['id'], needle: 'new')) {
            $step = $recipe->steps()->create($data);
          } else {
            $step = $recipe
              ->steps
              ->where('id', $data['id'])
              ->firstorfail();
            $step->update($data);
          }
          $step->ingredients()->sync($data['ingredients'] ?? []);
        }
    }

    private function ingredients()
    {
        $search = \request('q');
        return IngredientResource::collection(Ingredient::limit(10)->whereLike('name', '%' . $search . '%')->get())->collection;
    }
}
