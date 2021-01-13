<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->with('categories:id,title')
            ->latest()->get();

        return response()->json($notes, 200);
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
            'title' => 'required|max:255',
            'text' => 'max:1024',
            'color' => 'max:32',
            'categories.*' => 'exists:categories,id',
        ]);

        // Check if all passed categories belong to the current user.
        $categories = $request->user()->categories()->pluck('id');

        foreach ($request->input('categories') as $category) {
            if (!$categories->contains($category)) {
                return response()->json([], 400);
            }
        }

        $note = null;

        DB::transaction(function () use ($request, $validatedData, &$note) {
            $note = $request->user()->notes()->create([
                'title' => $validatedData['title'],
                'text' => $validatedData['text'],
                'color' => $validatedData['color'],
            ]);

            // Assign newly created note with categories.
            $note->categories()->attach($request->input('categories'));

            // Load basic category information.
            $note->load('categories:id,title');
        });

        return response()->json($note, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $note = $request->user()->notes()->where('id', $id)->first();

        if ($note === null) {
            return response()->json([], 404);
        }

        // Load basic category information.
        $note->load('categories:id,title');

        return response()->json($note, 200);
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
        $note = $request->user()->notes()->with('categories:id,title')
            ->where('id', $id)->first();

        if ($note === null) {
            return response()->json([], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'text' => 'max:1024',
            'color' => 'max:32',
            'categories.*' => 'exists:categories,id',
        ]);

        // Check if all passed categories belong to the current user.
        $categories = $request->user()->categories()->pluck('id');

        foreach ($request->input('categories') as $category) {
            if (!$categories->contains($category)) {
                return response()->json([], 400);
            }
        }

        DB::transaction(function () use ($request, $validatedData, &$note) {
            $note->title = $validatedData['title'];
            $note->text = $validatedData['text'];
            $note->color = $validatedData['color'];
            $note->save();

            // Assign newly created note with categories.
            $note->categories()->detach($note->categories->pluck('id'));
            $note->categories()->attach($request->input('categories'));

            // Load basic category information.
            $note->load('categories:id,title');
        });

        return response()->json($note, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $note = $request->user()->notes()->where('id', $id)->first();

        if ($note === null) {
            return response()->json([], 404);
        }

        $note->delete();

        return response()->json([], 204);
    }
}
