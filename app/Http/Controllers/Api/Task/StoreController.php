<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $newTask = $request->validated();
        $newTask['user_id'] = auth()->user()->id;

        $task = Task::create($newTask);

        return new TaskResource($task);
    }
}
