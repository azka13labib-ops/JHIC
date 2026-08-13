<?php

namespace App\Filament\Resources\SchoolProfiles;

use App\Filament\Resources\SchoolProfiles\Pages\CreateSchoolProfile;
use App\Filament\Resources\SchoolProfiles\Pages\EditSchoolProfile;
use App\Filament\Resources\SchoolProfiles\Pages\ListSchoolProfiles;
use App\Filament\Resources\SchoolProfiles\Schemas\SchoolProfileForm;
use App\Filament\Resources\SchoolProfiles\Tables\SchoolProfilesTable;
use App\Models\SchoolProfile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SchoolProfileResource extends Resource
{
    protected static ?string $model = SchoolProfile::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return SchoolProfileForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SchoolProfilesTable::configure($table);
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
            'index' => ListSchoolProfiles::route('/'),
            'create' => CreateSchoolProfile::route('/create'),
            'edit' => EditSchoolProfile::route('/{record}/edit'),
        ];
    }
}
