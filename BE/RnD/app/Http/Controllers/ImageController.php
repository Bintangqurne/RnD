<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index(){
        $images = Image::all();
        return Inertia::render('Images/Index', ['images' => $images]);
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path = $request->file('image')->store('image', 'public');

        $image = Image::create([
            'title' => $request->title,
            'image_path' => $path
        ]);

        return response()->json($image, 201);
    }

    public function destroy(Image $image){
        Storage::delete('public/'.$image->image_path);
        $image->delete();
        return redirect()->back();
    }
}
