<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    @section('head_title')
        <title>HopWave - Island hopping made easy.</title>
    @show

    @section('head_styles')
        <!-- Custom CSS -->
        <link href="css/style.css" rel="stylesheet">
        <style type="text/css">
          html, body, #map-canvas { height: 100%; margin: 0; padding: 0; overflow-x: hidden;}
        </style>
    @show

    @section('head_fonts')
        <!-- Custom Fonts -->
        <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
    @show

    @section('head_scripts')
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <!-- jQuery -->
        <!-- Bootstrap Core JavaScript -->
        <script src="js/app.min.js"></script>
        <script src="js/firebase.js"></script>
        <script type="text/javascript" src="http://www.panoramio.com/wapi/wapi.js?v=1&amp;hl=gr"></script>

        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-63851274-1', 'auto');
          ga('require', 'displayfeatures');
          ga('send', 'pageview');

        </script>
    @show
</head>

<body>
    @section('navigation')
    <!-- Navigation -->
    <a id="menu-toggle" href="#" class="btn btn-dark btn-lg toggle"><i class="fa fa-bars"></i></a>
    <nav id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <a id="menu-close" href="#" class="btn btn-light btn-lg pull-right toggle"><i class="fa fa-times"></i></a>
            <li class="sidebar-brand">
                <a href="#top" onclick = $("#menu-close").click(); >hopwave</a>
            </li>
            <li>
                <a class="scrollItem" href="#top" onclick = $("#menu-close").click(); >Top</a>
            </li>
            <li>
                <a class="scrollItem" href="#about" onclick = $("#menu-close").click(); >Description</a>
            </li>
            <li>
                <a class="scrollItem" href="#services" onclick = $("#menu-close").click(); >Features</a>
            </li>
            <li>
                <a class="scrollItem" href="#partners" onclick = $("#menu-close").click(); >Partners</a>
            </li>
            <!-- <li>
                <a class="scrollItem" href="#contact" onclick = $("#menu-close").click(); >Contact</a>
            </li> -->
            <li>
                <a href="https://play.google.com/store/apps/details?id=com.hopwave.hopwave" style="">
                    <img width="150px" class="img-portfolio img-responsive" src="img/android.png">
                </a>
            </li>
        </ul>
    </nav>
    @show

    @section('header')
    <!-- Header -->
    <header id="top" class="header">
        <div class="text-vertical-center">
            <img src="img/logleuko2.png">
            <br><br>
            <!-- <h3 style="color:#fff; text-shadow: 0px 0px 20px #000000;">Island Hopping made easy</h3> -->
        </div>
    </header>
    @show

    @section('content')
    <!-- About -->
    <section id="about" class="about">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-8 col-md-offset-2 text-center">
                    <h4 style="margin-left: auto; font-size: 1.2em; margin-right: auto; line-height: 1.25;">Hopwave informs you of all the available destinations around your current location and allows you to plan your trip while getting useful information about the means of transport you are about to use. Organise your own island hopping using all possible transportation options like boats, cruiseships, yachts, or even hydroplanes!
                    </h4>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>

    <!-- Services -->
    <!-- The circle icons use Font Awesome's stacked icon classes. For more information, visit http://fontawesome.io/examples/ -->
    <section id="services" class="services bg-primary">
        <div class="container">
            <div class="row text-center">
                <div class="col-lg-10 col-lg-offset-1">
                    <h2>Find your next harbour</h2>
                    <br>
                    <!-- <hr class="small"> -->
                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <img width="190px" src="img/Hoparound.png">
                                <br><br>
                                <h3>Hop Around</h3>
                                <p>Discover every inch of the island’s coastline and the islands around.</p>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <img width="190px" src="img/Hopaway.png">
                                <br><br>
                                <h3>Hop Away</h3>
                                <p>Hop away from your location to discover new starting points.</p>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <img width="190px" src="img/Hopto.png">
                                <br><br>
                                <h3>Hop To</h3>
                                <p>Find the best route to your desired destination.</p>
                            </div>
                        </div>
                    </div>
                    <!-- /.row (nested) -->
                </div>
                <!-- /.col-lg-10 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>

    <!-- Call to Action -->
    <aside class="call-to-action bg-primary" style="height: 300px; background-color:#fff; background: url('img/w_trans.png') no-repeat; background-position-x: -15px;
    background-position-y: 50px; padding-top:50px">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 style="color:#000">Get on board</h2>
                    <h4 style="color:#000; font-weight: 500">Download and start you island hopping experience!</h4>
                    <br>
                    <br>
                    <div class="row">
                        <div class="col-xs-6 col-xs-push-3">
                            <a href="https://play.google.com/store/apps/details?id=com.hopwave.hopwave" target="_blank">
                                <img width="200px" class="img-portfolio img-responsive" src="img/android.png">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    @show

    @section('footer')
    <!-- Footer -->
    <footer>
        <div id="#" class="container">
            <div class="col-sm-5 col-sm-offset-1 text-center">
                <h3>Subscribe to our newsletter</h3>
                <br>
                <form action="http://hopwave.moosend.com/subscribe/67603272-ef16-482e-b4fe-964621fde8ab" method="post" id="ms-sub-form" target="_blank" style="padding-top: 5px;">
                    <input type="email" value="" id="email" name="ms-email" placeholder="Enter your email" tabindex="1" class="form-submit-email" style="width: 195px;">
                    <input type="submit" value="Subscribe" tabindex="2" class="form-submit-button">
                </form>
                </div>
                <div class="col-sm-4 col-sm-offset-2 text-center">
                    <h3>Follow Us</h3>
                    <br>
                    <ul class="list-inline" style="">
                        <li>
                            <a href="https://www.facebook.com/pages/HopWave/1620662111541990" target="_blank"><i class="fa fa-facebook fa-fw fa-3x"></i></a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com/hopwave" target="_blank"><i class="fa fa-twitter fa-fw fa-3x"></i></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/hopwave" target="_blank"><i class="fa fa-instagram fa-fw fa-3x"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/hopwave" target="_blank"><i class="fa fa-linkedin fa-fw fa-3x"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="row">
            <div class="col-xs-12 text-center">
                <p class="text-muted">Copyright &copy; hopwave 2015</p>
            </div>
        </div>

    </div>
</footer>
@show

@section('body_scripts')


<!-- Custom Theme JavaScript -->
<script>
// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page a[href*=#]:not([href=#])
$(function() {
    $("").on('click', function(e) {
       // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 300, function(){
        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = hash;
    });

    });

    $(".scrollItem").click(function(e) {
        e.preventDefault();

        // store hash
        var hash = this.hash;

        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 300, function(){
            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash;
        });
    });
});
</script>
<script type="text/javascript" src="js/main.js"></script>
@show
</body>
</html>
