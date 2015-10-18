@extends('layouts.app')

@section('content')
<div class="container-fluid ">
    <h1>Boat Owner Dashboard</h1>

    <div class="panel-body">
        @if (session('message'))
            <div class="alert alert-success">
                {{ session('message') }}
            </div>
        @endif

        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There were some problems with your input.<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>

    <div id="editBoat" class='row'>
        {!! Form::open(array('route' => array('user_edit_boat_form'))) !!}
            <div class="form-group col-md-4 col-md-offset-4 text-center">
                {!! Form::label('What is the name of the boat?(example: Friederike)') !!}
                {!! Form::text('boat_name', null,
                array('required',
                'id'=>'boat_name',
                'class'=>'form-control',
                'placeholder'=>'Boat Name')) !!}
            </div>

            <div class="form-group col-md-4 col-md-offset-4 text-center">
                <button class="btn btn-primary" onClick="submitForm()">Edit</button>
            </div>
        {!! Form::close() !!}
    </div>

    <div class='row'>
        <div class='col-md-3 col-md-offset-1'>
            <table class="rwd-table" id='detailsTable'>
            <tr>
                <th>
                    Trip Date
                </th>
                <th>
                    Book DateTime
                </th>
                <th>
                    Tickets Booked
                </th>
                <th>
                    Booking Email
                </th>
                <th>
                    Confirmed
                </th>
            </tr>
            </table>
        </div>
        <div class="col-md-6 col-md-offset-1">
            <table class="rwd-table" id='bookingsTable'>

            </table>
        </div>
    </div>

    <script>
    $('#detailsTable').hide();
    $('#bookingsTable').hide();

    var myStatRef = new Firebase('https://hopwave-boat-stats.firebaseio.com/Katerina/');
    var myDataRef = new Firebase('https://hopwave-boat-details.firebaseio.com/');

    myStatRef.on('child_added', function(snapshot) {
        var book = snapshot.val();

        displayStats(
            book.booking_timestamp,
            book.confirmed,
            book.email,
            book.tickets,
            book.booking_date
        );
        $('#bookingsTable').show();
    });

    myDataRef.orderByKey().equalTo('Katerina').on('child_added', function(snapshot) {
        var boat = snapshot.val();
        displayBoatDetails(
            boat.boat_name,
            boat.boat_type,
            boat.en.route_title,
            boat.gr.route_title,
            boat.route_time_departure,
            boat.route_time_arrival,
            boat.en.boat_starting_point_text,
            boat.gr.boat_starting_point_text,
            boat.boat_trip_price,
            boat.boat_trip_price_secondary,
            boat.en.boat_trip_price_details,
            boat.gr.boat_trip_price_details,
            boat.en.boat_trip_description,
            boat.gr.boat_trip_description
        );
        $('#detailsTable').show();
    });

    function displayStats(
        booking_timestamp,
        confirmed,
        email,
        tickets,
        booking_date) {
        $('<tr/>').append($('<td/>').text(booking_date)).append($('<td/>').text(booking_timestamp)).append($('<td/>').text(tickets)).append($('<td/>').text(email)).append($('<td/>').text(confirmed)).appendTo($('#detailsTable'));
        $('#detailsTable')[0].scrollTop = $('#detailsTable')[0].scrollHeight;
    };

    function displayBoatDetails(
        boat_name,
        boat_type,
        route_title,
        route_title_gr,
        route_time_departure,
        route_time_arrival,
        boat_starting_point,
        boat_starting_point_gr,
        boat_trip_price,
        boat_trip_price_secondary,
        boat_trip_price_details,
        boat_trip_price_details_gr,
        boat_trip_description,
        boat_trip_description_gr) {
        $('<tr/>').append($('<th/>').text('')).append($('<th/>').text('Name: '+boat_name)).append($('<th/>').text('Type: ' +boat_type)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Title:')).append($('<td/>').text(route_title)).append($('<td/>').text(route_title_gr)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Depapture Time:')).append($('<td/>').text(route_time_departure)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Arrival Time:')).append($('<td/>').text(route_time_arrival)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Start:')).append($('<td/>').text(boat_starting_point)).append($('<td/>').text(boat_starting_point_gr)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Price Primary:')).append($('<td/>').text(boat_trip_price)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Price Secondary:')).append($('<td/>').text(boat_trip_price_secondary)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Price Details:')).append($('<td/>').text(boat_trip_price_details)).append($('<td/>').text(boat_trip_price_details_gr)).appendTo($('#bookingsTable'));
        $('<tr/>').append($('<td/>').text('Description:')).append($('<td/>').text(boat_trip_description)).append($('<td/>').text(boat_trip_description_gr)).appendTo($('#bookingsTable'));
        $('#bookingsTable')[0].scrollTop = $('#bookingsTable')[0].scrollHeight;
    };
    </script>
</div>
@stop
