<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DestroyController extends Controller
{

    public function __invoke(User $user)
    {
        if (auth()->user()->id === $user->id) {
            $user->delete();

            return response(['destroyed' => true]);
        }

        return response(['destroyed' => false], 403);
    }

}
