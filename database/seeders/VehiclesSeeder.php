<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use DB;

class VehiclesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
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
}
