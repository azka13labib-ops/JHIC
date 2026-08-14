<?php

namespace App\Filament\Resources\Guestbooks\Pages;

use App\Filament\Resources\Guestbooks\GuestbookResource;
use Filament\Resources\Pages\CreateRecord;

class CreateGuestbook extends CreateRecord
{
    protected static string $resource = GuestbookResource::class;
}
