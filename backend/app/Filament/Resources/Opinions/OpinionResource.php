<?php

namespace App\Filament\Resources\Opinions;

use App\Filament\Resources\Opinions\Pages\CreateOpinion;
use App\Filament\Resources\Opinions\Pages\EditOpinion;
use App\Filament\Resources\Opinions\Pages\ListOpinions;
use App\Filament\Resources\Opinions\Schemas\OpinionForm;
use App\Filament\Resources\Opinions\Tables\OpinionsTable;
use App\Models\Opinion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OpinionResource extends Resource
{
    protected static ?string $model = Opinion::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return OpinionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OpinionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOpinions::route('/'),
            'create' => CreateOpinion::route('/create'),
            'edit' => EditOpinion::route('/{record}/edit'),
        ];
    }
}
