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
        Schema::create('details_creation_fruits', function (Blueprint $table) {
            $table->foreignId('detail_commande_creation_id')->constrained('details_commande_creation');
            $table->foreignId('fruit_id')->constrained('fruits');
            $table->primary(['detail_commande_creation_id', 'fruit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_creation_fruits');
    }
};