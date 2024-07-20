<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{

    protected $teacher;
    public function __construct()
    {
        $this->teacher = new Teacher();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->teacher->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->teacher->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $teacher = $this->teacher->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $teacher = $this->teacher->find($id);

        $teacher->update($request->all());

        return  $teacher;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $teacher = $this->teacher->find($id);
        return $teacher->delete();
    }
}
