<?php

namespace Database\Seeders;

use App\Models\Enum\IngredientUnit;
use App\Models\Ingredient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //        User::firstOrCreate([
        //            ['email' => 'john@example.com'],
        //            [
        //                'name' => 'John Doe',
        //                'password' => Hash::make('12345678'),
        //                'email_verified_at' => now(),
        //            ],
        //        ]);

        $ingredients = [
            ['name' => 'Beurre doux', 'unit' => IngredientUnit::Grams],
            ['name' => 'Farine de blé', 'unit' => IngredientUnit::Grams],
            ['name' => 'Sucre blanc', 'unit' => IngredientUnit::Grams],
            ['name' => 'Sucre roux', 'unit' => IngredientUnit::Grams],
            ['name' => 'Lait entier', 'unit' => IngredientUnit::Ml],
            ['name' => 'Eau', 'unit' => IngredientUnit::Ml],
            ['name' => 'Huile d’olive', 'unit' => IngredientUnit::Ml],
            ['name' => 'Huile de tournesol', 'unit' => IngredientUnit::Ml],
            ['name' => 'Sel', 'unit' => IngredientUnit::Grams],
            ['name' => 'Poivre noir', 'unit' => IngredientUnit::Grams],
            ['name' => 'Levure chimique', 'unit' => IngredientUnit::Grams],
            ['name' => 'Levure boulangère', 'unit' => IngredientUnit::Grams],
            ['name' => 'Œuf', 'unit' => IngredientUnit::None],
            ['name' => 'Jaune d’œuf', 'unit' => IngredientUnit::None],
            ['name' => 'Blanc d’œuf', 'unit' => IngredientUnit::None],
            ['name' => 'Crème fraîche', 'unit' => IngredientUnit::Ml],
            ['name' => 'Fromage râpé', 'unit' => IngredientUnit::Grams],
            ['name' => 'Parmesan', 'unit' => IngredientUnit::Grams],
            ['name' => 'Mozzarella', 'unit' => IngredientUnit::Grams],
            ['name' => 'Poulet', 'unit' => IngredientUnit::Grams],
            ['name' => 'Bœuf haché', 'unit' => IngredientUnit::Grams],
            ['name' => 'Saumon', 'unit' => IngredientUnit::Grams],
            ['name' => 'Thon', 'unit' => IngredientUnit::Grams],
            ['name' => 'Pommes de terre', 'unit' => IngredientUnit::Kilograms],
            ['name' => 'Carottes', 'unit' => IngredientUnit::Grams],
            ['name' => 'Courgettes', 'unit' => IngredientUnit::Grams],
            ['name' => 'Aubergines', 'unit' => IngredientUnit::Grams],
            ['name' => 'Tomates', 'unit' => IngredientUnit::Grams],
            ['name' => 'Oignon', 'unit' => IngredientUnit::None],
            ['name' => 'Ail', 'unit' => IngredientUnit::None],
            ['name' => 'Échalote', 'unit' => IngredientUnit::None],
            ['name' => 'Persil', 'unit' => IngredientUnit::Grams],
            ['name' => 'Basilic', 'unit' => IngredientUnit::Grams],
            ['name' => 'Thym', 'unit' => IngredientUnit::Grams],
            ['name' => 'Laurier', 'unit' => IngredientUnit::None],
            ['name' => 'Paprika', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Curry', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Curcuma', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Moutarde', 'unit' => IngredientUnit::Tablespoon],
            ['name' => 'Mayonnaise', 'unit' => IngredientUnit::Tablespoon],
            ['name' => 'Ketchup', 'unit' => IngredientUnit::Tablespoon],
            ['name' => 'Vinaigre balsamique', 'unit' => IngredientUnit::Ml],
            ['name' => 'Vinaigre de cidre', 'unit' => IngredientUnit::Ml],
            ['name' => 'Miel', 'unit' => IngredientUnit::Tablespoon],
            ['name' => 'Confiture', 'unit' => IngredientUnit::Tablespoon],
            ['name' => 'Pain de mie', 'unit' => IngredientUnit::Slice],
            ['name' => 'Baguette', 'unit' => IngredientUnit::None],
            ['name' => 'Riz', 'unit' => IngredientUnit::Grams],
            ['name' => 'Pâtes', 'unit' => IngredientUnit::Grams],
            ['name' => 'Semoule', 'unit' => IngredientUnit::Grams],
        ];

        // Ingredient::factory()->createMany($ingredients);
    }
}
