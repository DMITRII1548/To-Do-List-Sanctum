<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;

class MeController extends Controller
{

    public function __invoke()
    {
        if (auth()->user()) {
            return new UserResource(auth()->user());
        } else {
            return response([], 401);
        }
    }

}
