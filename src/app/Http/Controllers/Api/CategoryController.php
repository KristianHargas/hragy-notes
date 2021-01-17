<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = $request->user()->categories()->orderBy('title')->get();

        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|min:3|max:255',
        ]);

        if ($request->user()->categories()->where('title', $validatedData['title'])->exists()) {
            return response()->json([], 400);
        }

        $category = $request->user()->categories()->create([
            'title' => $validatedData['title'],
            'slug' => Str::slug($validatedData['title']),
        ]);

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $category = $request->user()->categories()->where('id', $id)->first();

        if ($category === null) {
            return response()->json([], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = $request->user()->categories()->where('id', $id)->first();

        if ($category === null) {
            return response()->json([], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|min:3|max:255',
        ]);

        $category->title = $validatedData['title'];
        $category->slug = Str::slug($validatedData['title']);
        $category->save();

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $category = $request->user()->categories()->where('id', $id)->first();

        if ($category === null) {
            return response()->json([], 404);
        }

        $category->delete();

        return response()->json([], 204);
    }
}
