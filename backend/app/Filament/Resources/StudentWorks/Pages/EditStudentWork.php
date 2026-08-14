<?php

namespace App\Filament\Resources\StudentWorks\Pages;

use App\Filament\Resources\StudentWorks\StudentWorkResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditStudentWork extends EditRecord
{
    protected static string $resource = StudentWorkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
