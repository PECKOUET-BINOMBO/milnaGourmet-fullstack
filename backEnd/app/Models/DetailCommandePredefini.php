<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetailCommandePredefini extends Model
{
    use HasFactory;
    protected $fillable = ['commande_id', 'gout_id', 'quantite'];

    public function commande(): BelongsTo
    {
        return $this->belongsTo(Commande::class);
    }

    public function gout(): BelongsTo
    {
        return $this->belongsTo(Gout::class);
    }
}