<?php

namespace App\Models\Enum;

enum RecipeLevel: string
{
    case EASY = 'easy';
    case MEDIUM = 'medium';
    case HARD = 'hard';

    public function label(): string
    {
        return match ($this) {
            self::EASY => 'Facile',
            self::MEDIUM => 'Moyen',
            self::HARD => 'Difficile',
        };
    }

    public static function getOptions(): array
    {
        return array_map(fn ($unit) => [
            'value' => $unit->value,
            'label' => $unit->label(),
        ], self::cases());
    }
}
