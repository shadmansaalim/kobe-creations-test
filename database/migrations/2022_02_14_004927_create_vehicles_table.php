<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->string("Make");
            $table->string("Model");
            $table->string("Type");
            $table->string("PartNo");
        });


        DB::table('vehicles')->insert(
            array(
                [
                   'Make' => 'AIRMAN',
                   'Model' => 'AX08',
                   'Type' => 'Rubber Track',
                   'PartNo' => 'AA6327237X'
                ]
            )
        );
 
    }

    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
