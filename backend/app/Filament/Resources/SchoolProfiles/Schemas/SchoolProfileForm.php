<?php

namespace App\Filament\Resources\SchoolProfiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SchoolProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Textarea::make('tagline')
                    ->columnSpanFull(),
                Textarea::make('vision')
                    ->columnSpanFull(),
                Textarea::make('mission')
                    ->columnSpanFull(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                Textarea::make('address')
                    ->columnSpanFull(),
                TextInput::make('headmaster_name'),
                FileUpload::make('headmaster_image')
                    ->image(),
                Textarea::make('headmaster_message')
                    ->columnSpanFull(),
            ]);
    }
}
