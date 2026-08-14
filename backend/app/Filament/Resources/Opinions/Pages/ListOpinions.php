<?php

namespace App\Filament\Resources\Opinions\Pages;

use App\Filament\Resources\Opinions\OpinionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOpinions extends ListRecords
{
    protected static string $resource = OpinionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
