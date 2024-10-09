<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sauce extends Model
{
    use HasFactory;
    protected $fillable = ['nom'];

    public function detailsCreationSauces(): BelongsToMany
    {
        return $this->belongsToMany(DetailCommandeCreation::class, 'details_creation_sauces');
    }
}