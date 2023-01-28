<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class ShowController extends Controller
{
    public function __invoke(Task $task)
    {
        return new TaskResource($task);
    }
}
