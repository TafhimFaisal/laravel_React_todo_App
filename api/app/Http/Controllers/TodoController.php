<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use Auth;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Models\User;

class TodoController extends Controller
{
    private $user;
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->user = auth()->user();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'todos' => $this->user->todos
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(),[
            'name'=> 'required|max:150',
            'description' => 'max:250',
            'deadline' => 'required'
        ]);

        $todo = $this->user->todos()->create($validated->validated());
        return response()->json([
            "todo" => $todo
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        return response()->json([
            "todo"=>$todo
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        if($this->user->id != $todo->user->id){
            return response()->json([
                    'message'=>"unauthorised attempted"
                ],401
            );
        }
        $updated_todo = null;
        try{
            $updated_todo = $todo->update($request->all());
        }catch(\Exception $e){
            return response()->json(
                ['message'=>$e->getmessage()], 200
            );
        }


        return response()->json(
            ['message'=>"success"], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        if($this->user->id != $todo->user->id){
            return response()->json([
                    'message'=>"unauthorised attempted"
                ],401
            );
        }
        try{
            $todo->delete();
        }catch(\Exception $e){
            return response()->json(
                ['message'=>$e->getmessage()], 200
            );
        }
        return response()->json(
            ['message'=>'success'], 200
        );
    }
}
