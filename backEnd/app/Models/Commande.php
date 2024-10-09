<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = ['utilisateur_id', 'adresse_livraison_id', 'statut'];

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function adresseLivraison(): BelongsTo
    {
        return $this->belongsTo(AdresseLivraison::class);
    }

    public function detailsCommandePredefinis(): HasMany
    {
        return $this->hasMany(DetailCommandePredefini::class);
    }

    public function detailsCommandeCreation(): HasMany
    {
        return $this->hasMany(DetailCommandeCreation::class);
    }
}