<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInquiry extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'name', 'email', 'phone', 'message', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
