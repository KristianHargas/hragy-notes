<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChecklistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $checklists = $request->user()->checklists()->with('categories:id,title')
            ->latest()->get();

        return response()->json($checklists, 200);
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
            'items' => 'json',
            'color' => 'required|max:32',
            'categories' => 'present|array',
            'categories.*' => 'exists:categories,id',
        ]);

        // Check if all passed categories belong to the current user.
        $userCategories = $request->user()->categories()->pluck('id');

        foreach ($validatedData['categories'] as $category) {
            if (!$userCategories->contains($category)) {
                return response()->json([], 400);
            }
        }

        $checklist = null;

        DB::transaction(function () use ($request, $validatedData, &$checklist) {
            $checklist = $request->user()->checklists()->create([
                'title' => $validatedData['title'],
                'items' => $validatedData['items'],
                'color' => $validatedData['color'],
            ]);

            // Assign newly created checklist with categories.
            $checklist->categories()->attach($validatedData['categories']);

            // Load basic category information.
            $checklist->load('categories:id,title');
        });

        return response()->json($checklist, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $checklist = $request->user()->checklists()->with('categories:id,title')
            ->where('id', $id)->first();

        if ($checklist === null) {
            return response()->json([], 404);
        }

        return response()->json($checklist, 200);
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
        $checklist = $request->user()->checklists()->with('categories:id,title')
            ->where('id', $id)->first();

        if ($checklist === null) {
            return response()->json([], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'items' => 'json',
            'color' => 'required|max:32',
            'categories' => 'present|array',
            'categories.*' => 'exists:categories,id',
        ]);

        // Check if all passed categories belong to the current user.
        $userCategories = $request->user()->categories()->pluck('id');

        foreach ($validatedData['categories'] as $category) {
            if (!$userCategories->contains($category)) {
                return response()->json([], 400);
            }
        }

        DB::transaction(function () use ($validatedData, &$checklist) {
            $checklist->title = $validatedData['title'];
            $checklist->items = $validatedData['items'];
            $checklist->color = $validatedData['color'];
            $checklist->save();

            // Assign newly created note with categories.
            $checklist->categories()->detach($checklist->categories->pluck('id'));
            $checklist->categories()->attach($validatedData['categories']);

            // Load basic category information.
            $checklist->load('categories:id,title');
        });

        return response()->json($checklist, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $checklist = $request->user()->checklists()->where('id', $id)->first();

        if ($checklist === null) {
            return response()->json([], 404);
        }

        $checklist->delete();

        return response()->json([], 204);
    }
}
