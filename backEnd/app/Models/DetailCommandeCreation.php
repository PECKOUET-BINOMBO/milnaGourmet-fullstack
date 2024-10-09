<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DetailCommandeCreation extends Model
{
    use HasFactory;
    protected $fillable = ['commande_id', 'taille_id'];

    public function commande(): BelongsTo
    {
        return $this->belongsTo(Commande::class);
    }

    public function taille(): BelongsTo
    {
        return $this->belongsTo(Taille::class);
    }

    public function fruits(): BelongsToMany
    {
        return $this->belongsToMany(Fruit::class, 'details_creation_fruits');
    }

    public function sauces(): BelongsToMany
    {
        return $this->belongsToMany(Sauce::class, 'details_creation_sauces');
    }
}