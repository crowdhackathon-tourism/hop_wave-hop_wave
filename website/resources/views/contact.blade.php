<section id="contact" class="services bg-secondary">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <h2 class="text-center">Contact Us</h2>
                <h4>Feel free to send us any feedback, any thoughts and any suggestions!</h4>

                <ul>
                    @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>

                {!! Form::open(array('route' => 'contact_store', 'class' => 'form')) !!}
                <div class="form-group">
                    {!! Form::label('Your Name') !!}
                    {!! Form::text('name', null,
                    array('required',
                    'class'=>'form-control',
                    'placeholder'=>'Your name')) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('Your E-mail Address') !!}
                    {!! Form::text('email', null,
                    array('required',
                    'class'=>'form-control',
                    'placeholder'=>'Your e-mail address')) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('Your Message') !!}
                    {!! Form::textarea('message', null,
                    array('required',
                    'class'=>'form-control',
                    'placeholder'=>'Your message')) !!}
                </div>

                <div class="form-group">
                    {!! Form::submit('Send',
                    array('class'=>'btn btn-primary')) !!}
                </div>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
