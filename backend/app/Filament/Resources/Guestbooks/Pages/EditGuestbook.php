<?php

namespace App\Filament\Resources\Guestbooks\Pages;

use App\Filament\Resources\Guestbooks\GuestbookResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditGuestbook extends EditRecord
{
    protected static string $resource = GuestbookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
