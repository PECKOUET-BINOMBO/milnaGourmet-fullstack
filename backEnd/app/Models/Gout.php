<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gout extends Model
{
    use HasFactory;
    protected $fillable = ['categorie_id', 'nom', 'description', 'prix', 'disponible'];

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function getPrixFormatteAttribute(): string
    {
        return number_format($this->prix, 0, ',', ' ') . ' FCFA';
    }
}