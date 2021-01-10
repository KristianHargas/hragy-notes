<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
        'user_id',
        'color',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
