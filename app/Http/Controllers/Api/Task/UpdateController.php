<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateRequest;
use App\Models\Task;

class UpdateController extends Controller
{
    public function __invoke(Task $task, UpdateRequest $request)
    {
        $updatedTask = $request->validated();
        $task->update($updatedTask);

        return response([]);
    }
}
