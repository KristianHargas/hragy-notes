<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hragynotes</title>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
    </head>
    <body>
        <div id="app">

        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
