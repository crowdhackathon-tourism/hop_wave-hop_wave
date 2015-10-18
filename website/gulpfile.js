var gulp    = require('gulp');
var concat 	= require('gulp-concat');
var less    = require('gulp-less');
var sass    = require('gulp-ruby-sass');
var notify  = require('gulp-notify');
var bower   = require('gulp-bower');
var minify 	= require('gulp-minify-css');
var uglify 	= require('gulp-uglify');
var imagemin= require('gulp-imagemin');
var rename 	= require('gulp-rename');
var notify 	= require('gulp-notify');
var growl 	= require('gulp-notify-growl');
var browserSync = require('browser-sync');
var reload 	= browserSync.reload;

var paths = {
	'dev': {
		'less'	   : './resources/assets/less/',
    'sassPath' : './resources/assets/sass',
		'js'	     : './resources/assets/js/',
		'img'	     : './resources/assets/img/',
		'vendor'   : './resources/assets/vendor/',
    'bowerDir' : './bower_components'

	},
	'production': {
		'css'	     : './public/css/',
		'js'	     : './public/js/',
		'img'	     : './public/img/',
    'fonts'    : './public/fonts'
	}
};

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(paths.dev.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(paths.dev.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(paths.production.fonts));
});

gulp.task('less', function() {
	return gulp.src(paths.dev.less + 'app.less')
		.pipe(less())
		.on('error', notify.onError({
			title: 'LESS compilation failed.',
			message: 'Check console for error.'
		}))
		.on('error', function (err) {
			console.log('Error:', err);
			this.end();
		})
		.pipe(gulp.dest(paths.production.css))
		.pipe(minify({keepSpecialComments:0}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.production.css))
    .pipe(reload({stream:true}))
	;
});

gulp.task('sass', function() {
    return sass(paths.dev.sassPath + '/style.scss', {
                style: 'compressed',
                loadPath: [
                    paths.dev.sassPath,
                    paths.dev.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                    paths.dev.bowerDir + '/fontawesome/scss'
                ]
            })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(gulp.dest(paths.production.css));
});

// JS
gulp.task('js', function(){
	return gulp.src([
			paths.dev.bowerDir + '/jquery/dist/jquery.js',
			paths.dev.bowerDir + 'bootstrap-sass-official/assets/javascript/bootstrap.js',
			paths.dev.js + 'js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.production.js))
        .pipe(reload({stream:true}))
	;
});

// IMG Compress
gulp.task('images', function(){
	return gulp.src(paths.dev.img+'**')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.production.img))
	;
});

// PHP Unit
gulp.task('phpunit', function() {
	var options = {debug: false, notify: true};
	return gulp.src('./tests/*.php')
		.pipe(phpunit('./vendor/bin/phpunit', options))

		.on('error', notify.onError({
			title: 'PHPUnit Failed',
			message: 'One or more tests failed.'
		}))

		.pipe(notify({
			title: 'PHPUnit Passed',
			message: 'All tests passed!'
		}))
    .pipe(reload({stream:true}))
	;
});

// Rerun the task when a file changes
gulp.task('watch', function(){
    gulp.watch(paths.dev.sassPath + '/**/*.scss', ['sass']);
    gulp.watch(paths.dev.js + '/*.js', ['js']);
    gulp.watch(paths.dev.img + '*.*', ['images']);
});

gulp.task('default', ['bower', 'icons', 'sass', 'js', 'images', 'watch']);
