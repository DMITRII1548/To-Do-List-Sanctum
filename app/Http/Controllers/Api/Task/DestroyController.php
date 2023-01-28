<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;

class DestroyController extends Controller
{

    public function __invoke(Task $task)
    {
        $task->delete();

        return response(['destroied' => true]);
    }

}
