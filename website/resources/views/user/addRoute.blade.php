@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Add routes and boats</h1>

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

    {!! Form::open(array('route' => 'user_add_route_store', 'id' => 'boatForm', 'class' => 'form', 'novalidate'=>'""')) !!}
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the route title?(example: Kos-Kalumnos-mpla-mpla)') !!}
        {!! Form::text('route_title_en', null,
        array('required',
        'id'=>'route_title_en',
        'class'=>'form-control',
        'placeholder'=>'Route Title')) !!}
    </div>
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the route title?(example: Kos-Kalumnos-mpla-mpla)') !!}
        {!! Form::text('route_title_gr', null,
        array('required',
        'id'=>'route_title_gr',
        'class'=>'form-control',
        'placeholder'=>'Δρομολόγιο')) !!}
    </div>

    <div class="form-group text-center">
        {!! Form::label('What is the route departure time?(example: 10:00)') !!}
        {!! Form::text('route_time_departure', null,
        array('required',
        'id'=>'route_time_departure',
        'class'=>'form-control',
        'placeholder'=>'Route time departure')) !!}
    </div>

    <div class="form-group text-center">
        {!! Form::label('What is the route arrival time?(example: 16:30)') !!}
        {!! Form::text('route_time_arrival', null,
        array('required',
        'id'=>'route_time_arrival',
        'class'=>'form-control',
        'placeholder'=>'Route time arrival')) !!}
    </div>

    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the name of the boat?(example: Friederike)') !!}
        {!! Form::text('boat_name_en', null,
        array('required',
        'id'=>'boat_name_en',
        'class'=>'form-control',
        'placeholder'=>'Boat Name')) !!}
    </div>
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the name of the boat?') !!}
        {!! Form::text('boat_name_gr', null,
        array('required',
        'id'=>'boat_name_gr',
        'class'=>'form-control',
        'placeholder'=>'Όνομα Βάρκας')) !!}
    </div>

    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the type of the boat?') !!}
        {!! Form::select('boat_type_en', array(
                'Pirate Boat' => 'Pirate Boat',
                'Ferry Boat' => 'Ferry Boat',
                'Cruiser Boat' => 'Cruiser Boat'
            ), 'Pirate Boat', array('required',
            'id'=>'boat_type_en',
            'class'=>'form-control')) !!}
    </div>
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the type of the boat?') !!}
        {!! Form::select('boat_type_gr', array(
            'Pirate Boat' => 'Pirate Boat',
            'Ferry Boat' => 'Ferry Boat',
            'Cruiser Boat' => 'Cruiser Boat'
            ), 'Τύπου Πειρατικό', array('required',
            'id'=>'boat_type_gr',
            'class'=>'form-control')) !!}
    </div>

    <div class="form-group text-center">
        <div class="col-md-6">
            {!! Form::label('What is the starting point of the boat?(example: Port of Kos') !!}
            {!! Form::text('boat_starting_point_text_en', null,
            array('required',
            'id'=>'boat_starting_point_text_en',
            'class'=>'form-control',
            'placeholder'=>'Boat Starting Point Text')) !!}
        </div>
        <div class="col-md-6">
            {!! Form::label('What is the starting point of the boat?(example: Port of Kos') !!}
            {!! Form::text('boat_starting_point_text_gr', null,
            array('required',
            'id'=>'boat_starting_point_text_gr',
            'class'=>'form-control',
            'placeholder'=>'Σημείο Αφετηρίας')) !!}
        </div>
        <div class="col-md-12">
            {!! Form::label('What is the starting point of the boat?(example longitude: 23.72475, example latitude: 37.97799)') !!}
        </div>
        <div class="col-md-6">
            {!! Form::text('boat_starting_point_longitude', null,
            array('required',
            'id'=>'boat_starting_point_longitude',
            'class'=>'form-control',
            'placeholder'=>'Boat Starting Point Longitude')) !!}
        </div>
        <div class="col-md-6">
            {!! Form::text('boat_starting_point_latitude', null,
            array('required',
            'id'=>'boat_starting_point_latitude',
            'class'=>'form-control',
            'placeholder'=>'Boat Starting Point Latitude')) !!}
        </div>
    </div>

    <div class="form-group text-center">
        {!! Form::label('What is the price of the trip in euros?(example: 25)') !!}
        {!! Form::text('boat_trip_price', null,
        array('required',
        'id'=>'boat_trip_price',
        'class'=>'form-control',
        'placeholder'=>'Trip Price')) !!}
    </div>

    <div class="form-group text-center">
        {!! Form::label('What is the secondary price of the trip in euros?(if it exists. example: /20/15/10/5 )') !!}
        {!! Form::text('boat_trip_price_secondary', null,
        array('required',
        'id'=>'boat_trip_price_secondary',
        'class'=>'form-control',
        'placeholder'=>'Trip Secondary Prices')) !!}
    </div>

    <div class="form-group text-center">
        {!! Form::label('Phone number if needed to book?(example: 6975123456)') !!}
        {!! Form::text('boat_phone', null,
        array('required',
        'id'=>'boat_phone',
        'class'=>'form-control',
        'placeholder'=>'Phone number')) !!}
    </div>

    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the text for the trip price details?') !!}
        {!! Form::textarea('boat_trip_price_details_en', null,
        array('required',
        'id'=>'boat_trip_price_details_en',
        'class'=>'form-control',
        'placeholder'=>'Trip Price Details')) !!}
    </div>
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the text for the trip price details?') !!}
        {!! Form::textarea('boat_trip_price_details_gr', null,
        array('required',
        'id'=>'boat_trip_price_details_gr',
        'class'=>'form-control',
        'placeholder'=>'Λεπτομέρειες Τιμής')) !!}
    </div>

    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the text for the details in the trip description') !!}
        {!! Form::textarea('boat_trip_description_en', null,
        array('required',
        'id'=>'boat_trip_description_en',
        'class'=>'form-control',
        'placeholder'=>'Trip Description Text')) !!}
    </div>
    <div class="form-group col-md-6 text-center">
        {!! Form::label('What is the text for the details in the trip description') !!}
        {!! Form::textarea('boat_trip_description_gr', null,
        array('required',
        'id'=>'boat_trip_description_gr',
        'class'=>'form-control',
        'placeholder'=>'Λεπτομέρειες Ταξιδιού')) !!}
    </div>

    <div class="form-group text-center">
        {!! Form::label('What is the the image for the boat?(provide the link of the image)') !!}
        <input id="file-upload" style="width:100%;" class="btn btn-warning" type="file" accept="image/*" capture="camera">
    </div>

    {!! Form::close() !!}

    <div class="form-group text-center">
        <button class="btn btn-primary" onClick="addRoute()">Add Route</button>
        <!-- <button class="btn btn-primary" onClick="addDetails()">Add Details</button>
        <button class="btn btn-primary" onClick="addThumbnail()">Add Selected Photo As Thumbnail</button> -->
        <button class="btn btn-primary" onClick="addPhoto()">Add Selected Photo As Boat Photo</button>
    </div>

    <div class="form-group text-center">
        <button class="btn btn-primary" onClick="submitForm()">Submit Form</button>
    </div>

    <div id='wait'>
        <h3>GEORGIA WAIT!!</h3>
        <p>Georgia stop spamming!!</p>
    </div>
    <div id='messagesDiv'></div>

</div>
@stop

@section('body_scripts')
<script>
var routeRefs = [];
var imageRefs = [];
var enRefs = [];
var grRefs = [];
var route_id = '';

function addRoute() {
    $('#wait').hide();

    routeRefs = [];
    imageRefs = [];
    enRefs = [];
    grRefs = [];
    route_id = '';

    var myDataRef = new Firebase('https://hopwave-routes.firebaseio.com/boats/');

    var first = new Date("2015-08-08");
    var last = new Date("2015-09-30");
    var dates = [];

    for (var first = new Date("2015-08-08"); first <= last; first.setDate(first.getDate() + 1)) {
        cur_date = new Date(first);
        cur_date = cur_date.toString();
        cur_date = cur_date.substr(4,3)+cur_date.substr(8,2);
        dates.push(cur_date);
    }

    for(id in dates){
        var routeRef = new Firebase('https://hopwave-routes.firebaseio.com/boats/'+dates[id]+'/routes');
        var newRoute = routeRef.push();
        route_id = newRoute.key();
        newRoute.update({
            route_id : newRoute.key(),
            route_date : dates[id]
        });
        var imageRef = new Firebase('https://hopwave-routes.firebaseio.com/boats/'+dates[id]+'/routes/'+newRoute.key()+'/boat_images');
        var enRef = new Firebase('https://hopwave-routes.firebaseio.com/boats/'+dates[id]+'/routes/'+newRoute.key()+'/en');
        var grRef = new Firebase('https://hopwave-routes.firebaseio.com/boats/'+dates[id]+'/routes/'+newRoute.key()+'/gr');
        routeRefs.push(newRoute);
        imageRefs.push(imageRef);
        enRefs.push(enRef);
        grRefs.push(grRef);
    }

    addDetails();
    addThumbnail();
}

function submitForm() {
    document.getElementById("boatForm").submit();
}

function addDetails() {
    var tmp_route_title_en = $('#route_title_en').val();
    var tmp_route_title_gr = $('#route_title_gr').val();
    var tmp_boat_name_en = $('#boat_name_en').val();
    var tmp_boat_name_gr = $('#boat_name_gr').val();
    var tmp_boat_type_en = $('#boat_type_en').val();
    var tmp_boat_type_gr = $('#boat_type_gr').val();
    var tmp_boat_starting_point_text_en = $('#boat_starting_point_text_en').val();
    var tmp_boat_starting_point_text_gr = $('#boat_starting_point_text_gr').val();
    var tmp_boat_trip_price_details_en = $('#boat_trip_price_details_en').val();
    var tmp_boat_trip_price_details_gr = $('#boat_trip_price_details_gr').val();
    var tmp_boat_trip_description_en = $('#boat_trip_description_en').val();
    var tmp_boat_trip_description_gr = $('#boat_trip_description_gr').val();

    for(ref in enRefs){
        enRefs[ref].update({
            route_title: tmp_route_title_en,
            boat_name: tmp_boat_name_en,
            boat_type: tmp_boat_type_en,
            boat_trip_price_details: tmp_boat_trip_price_details_en,
            boat_trip_description: tmp_boat_trip_description_en,
            boat_starting_point_text: tmp_boat_starting_point_text_en
        });
    }
    for(ref in grRefs){
        grRefs[ref].update({
            route_title: tmp_route_title_gr,
            boat_name: tmp_boat_name_gr,
            boat_type: tmp_boat_type_gr,
            boat_trip_price_details: tmp_boat_trip_price_details_gr,
            boat_trip_description: tmp_boat_trip_description_gr,
            boat_starting_point_text: tmp_boat_starting_point_text_gr
        });
    }

    var tmp_route_time_departure = $('#route_time_departure').val();
    var tmp_route_time_arrival = $('#route_time_arrival').val();
    var tmp_boat_starting_point_longitude = $('#boat_starting_point_longitude').val();
    var tmp_boat_starting_point_latitude = $('#boat_starting_point_latitude').val();
    var tmp_boat_trip_price = $('#boat_trip_price').val();
    var tmp_boat_trip_price_secondary = $('#boat_trip_price_secondary').val();
    var tmp_boat_phone = $('#boat_phone').val();

    for(ref in routeRefs){
        routeRefs[ref].update({
            route_time_departure: tmp_route_time_departure,
            route_time_arrival: tmp_route_time_arrival,
            boat_starting_point_longitude: tmp_boat_starting_point_longitude,
            boat_starting_point_latitude: tmp_boat_starting_point_latitude,
            boat_trip_price: tmp_boat_trip_price,
            boat_trip_price_secondary: tmp_boat_trip_price_secondary,
            boat_phone : tmp_boat_phone
        });
    }
}

function clearValues() {
    $('#route_title_en').val('');
    $('#route_title_gr').val('');
    $('#boat_name_en').val('');
    $('#boat_name_gr').val('');
    $('#boat_type_en').val('');
    $('#boat_type_gr').val('');
    $('#route_time_departure').val();
    $('#route_time_arrival').val();
    $('#boat_trip_price_details_en').val('');
    $('#boat_trip_price_details_gr').val('');
    $('#boat_trip_description_en').val('');
    $('#boat_trip_description_gr').val('');
    $('#boat_starting_point_text_en').val('');
    $('#boat_starting_point_text_gr').val('');
    $('#boat_starting_point_longitude').val('');
    $('#boat_starting_point_latitude').val('');
    $('#boat_trip_price').val('');
    $('#boat_trip_price_secondary').val('');
}

function addThumbnail() {
    var f = $("#file-upload")[0].files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var filePayload = e.target.result;
            for(ref in routeRefs){
                routeRefs[ref].update({
                    boat_thumbnail_image : filePayload
                });
            }
        };
    })(f);
    reader.readAsDataURL(f);
    $('#file-upload').val('');
    $('#wait').show();
}

function addPhoto() {
    var tmp_boat_name = $('#boat_name_en').val();
    var boatImagesRef = new Firebase('https://hopwave-boat-images.firebaseio.com/'+tmp_boat_name+'/boat_images');

    var f = $("#file-upload")[0].files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var filePayload = e.target.result;
            var newPhoto = boatImagesRef.push();

            newPhoto.set({
                image : filePayload
            }), function() {

            };
        };
    })(f);
    reader.readAsDataURL(f);
    $('#file-upload').val('');
}
</script>
@stop
