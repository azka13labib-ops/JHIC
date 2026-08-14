<?php

namespace App\Filament\Resources\Guestbooks;

use App\Filament\Resources\Guestbooks\Pages\CreateGuestbook;
use App\Filament\Resources\Guestbooks\Pages\EditGuestbook;
use App\Filament\Resources\Guestbooks\Pages\ListGuestbooks;
use App\Filament\Resources\Guestbooks\Schemas\GuestbookForm;
use App\Filament\Resources\Guestbooks\Tables\GuestbooksTable;
use App\Models\Guestbook;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class GuestbookResource extends Resource
{
    protected static ?string $model = Guestbook::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return GuestbookForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GuestbooksTable::configure($table);
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
            'index' => ListGuestbooks::route('/'),
            'create' => CreateGuestbook::route('/create'),
            'edit' => EditGuestbook::route('/{record}/edit'),
        ];
    }
}
