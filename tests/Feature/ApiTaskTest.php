<?php

namespace Tests\Feature;

use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiTaskTest extends TestCase
{
    use RefreshDatabase;


    public function test_show()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $task = Task::factory()->create();

        $response = $this->getJson(route('tasks.show', $task->id));

        $task = [
            'id' => $task->id,
            'title' => $task->title,
            'text' => $task->text,
        ];

        $response
            ->assertOk()
            ->assertJsonPath('data', $task)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'title',
                    'text'
                ]
            ]);
    }

    public function test_post()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $task = Task::factory()->make();
        $task = [
            'title' => $task->title,
            'text' => $task->text
        ];

        $response = $this->postJson(route('tasks.store'), $task);

        $response
            ->assertStatus(201)
            ->assertJson(['created' => true]);
    }

    public function test_update()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $task = Task::factory()->create();

        $updatedTask = [
            'title' => '1',
            'text' => 'updated text'
        ];

        $response = $this->patchJson(route('tasks.update', $task->id), $updatedTask);

        $response
            ->assertOk()
            ->assertJson(['updated' => true]);
    }

    public function test_destroy()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        $task = Task::factory()->create([
            'title' => 'deleted'
        ]);

        $response = $this->deleteJson(route('tasks.destroy', $task->id));

        $response
            ->assertOk()
            ->assertJson([
                'destroied' => true
            ]);
    }

    public function test_index()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );

        Task::factory()->create();

        $response = $this->getJson(route('tasks.index'));

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'text'
                    ]
                ]
            ]);

    }
}
