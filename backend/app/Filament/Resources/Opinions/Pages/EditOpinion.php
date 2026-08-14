<?php

namespace App\Filament\Resources\Opinions\Pages;

use App\Filament\Resources\Opinions\OpinionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOpinion extends EditRecord
{
    protected static string $resource = OpinionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
