<?php

namespace App\Filament\Resources\QuickLinks\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class QuickLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('url')
                    ->url()
                    ->required(),
            ]);
    }
}
