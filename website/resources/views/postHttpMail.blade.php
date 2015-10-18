@extends('layouts.master')

@section('content')
    <div id='messagesDiv'>

    </div>
@stop

@section('body_scripts')
    @parent
    <script type="text/javascript">
        var myDataRef = new Firebase('https://blazing-inferno-533.firebaseio.com/');

        var routeRef = myDataRef.push();

        routeRef.set({
            test: "test"
        });

    </script>
@stop
