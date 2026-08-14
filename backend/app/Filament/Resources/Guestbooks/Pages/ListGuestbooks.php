<?php

namespace App\Filament\Resources\Guestbooks\Pages;

use App\Filament\Resources\Guestbooks\GuestbookResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListGuestbooks extends ListRecords
{
    protected static string $resource = GuestbookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
