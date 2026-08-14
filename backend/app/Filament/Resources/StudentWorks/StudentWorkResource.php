<?php

namespace App\Filament\Resources\StudentWorks;

use App\Filament\Resources\StudentWorks\Pages\CreateStudentWork;
use App\Filament\Resources\StudentWorks\Pages\EditStudentWork;
use App\Filament\Resources\StudentWorks\Pages\ListStudentWorks;
use App\Filament\Resources\StudentWorks\Schemas\StudentWorkForm;
use App\Filament\Resources\StudentWorks\Tables\StudentWorksTable;
use App\Models\StudentWork;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StudentWorkResource extends Resource
{
    protected static ?string $model = StudentWork::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return StudentWorkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StudentWorksTable::configure($table);
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
            'index' => ListStudentWorks::route('/'),
            'create' => CreateStudentWork::route('/create'),
            'edit' => EditStudentWork::route('/{record}/edit'),
        ];
    }
}
