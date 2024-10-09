<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('details_creation_sauces', function (Blueprint $table) {
            $table->foreignId('detail_commande_creation_id')->constrained('details_commande_creation');
            $table->foreignId('sauce_id')->constrained('sauces');
            $table->primary(['detail_commande_creation_id', 'sauce_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_creation_sauces');
    }
};