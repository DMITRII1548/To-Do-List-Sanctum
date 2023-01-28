<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class UpdateController extends Controller
{
    public function __invoke(UpdateRequest $request, Task $task)
    {
        $data = $request->validated();

        $task = $task->update($data);
        return response(['updated' => true]);
    }
}
