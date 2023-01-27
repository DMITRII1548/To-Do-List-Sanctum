<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class IndexController extends Controller
{
    public function __invoke()
    {
        $tasks = Task::where('user_id', auth()->user()->id)->get();

        return TaskResource::collection($tasks);
    }
}
