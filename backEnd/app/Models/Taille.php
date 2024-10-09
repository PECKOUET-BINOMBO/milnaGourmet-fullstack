<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Taille extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'nb_fruits', 'nb_sauces'];

    public function detailsCommandeCreation(): HasMany
    {
        return $this->hasMany(DetailCommandeCreation::class);
    }
}