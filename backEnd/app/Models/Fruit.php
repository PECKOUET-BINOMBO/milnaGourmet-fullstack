<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Fruit extends Model
{
    use HasFactory;
    protected $fillable = ['nom'];

    public function detailsCreationFruits(): BelongsToMany
    {
        return $this->belongsToMany(DetailCommandeCreation::class, 'details_creation_fruits');
    }
}