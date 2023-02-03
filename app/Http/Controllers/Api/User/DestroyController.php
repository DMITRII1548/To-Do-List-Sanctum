<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DestroyController extends Controller
{

    public function __invoke(User $user)
    {
        $user->delete();

        return response(['destroied' => true]);
    }

}
