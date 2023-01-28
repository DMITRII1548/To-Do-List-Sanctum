<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreRequest;
use App\Models\Task;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $newTask = $request->validated();
        $newTask['user_id'] = auth()->user()->id;

        Task::create($newTask);

        return response(['created' => true], 201);
    }
}
