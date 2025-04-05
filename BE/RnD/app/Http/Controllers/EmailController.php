<?php

namespace App\Http\Controllers;

use App\Mail\BlastEmail;
use App\Models\Recipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;


class EmailController extends Controller
{

public function create()
{
    return Inertia::render('Email/Form');
}

public function send(Request $request)
{
    $request->validate([
        'subject' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    $recipients = Recipient::all();

    foreach ($recipients as $recipient) {
        Mail::to($recipient->email)
            ->send(new BlastEmail($request->subject, $request->content));
    }

    return redirect()->back()->with('success', 'Email terkirim ke ' . $recipients->count() . ' penerima!');
}
}
