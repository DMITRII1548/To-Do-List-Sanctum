<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiUserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_route_user_me()
    {
        $user = Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $response = $this->post(route('users.me'));

        $response
            ->assertJsonPath('data.name', $user->name)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'email_verified'
                ]
            ])
            ->assertOk();
    }

    public function test_route_user_destroy()
    {
        $user = Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $unAuthUser = User::factory()->create();

        $response = $this->deleteJson(route('users.destroy', $user->id));
        $response
            ->assertOk()
            ->assertJson(['destroyed' => true]);

        $response = $this->deleteJson(route('users.destroy', $unAuthUser->id));
        $response
            ->assertStatus(403)
            ->assertJson(['destroyed' => false]);
    }
}
