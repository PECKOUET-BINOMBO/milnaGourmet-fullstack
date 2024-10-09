<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdresseLivraison extends Model
{
    use HasFactory;
    protected $fillable = ['adresse', 'prix_livraison'];

    public function utilisateurs(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function commandes(): HasMany
    {
        return $this->hasMany(Commande::class);
    }

    public function getPrixLivraisonFormatteAttribute(): string
    {
        return number_format($this->prix_livraison, 0, ',', ' ') . ' FCFA';
    }
}