<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', [
  'as'      => 'welcome',
  'uses'    => 'WelcomeController@index'
]);

Route::get('home', [
  'as'      => 'home',
  'uses'    => 'WelcomeController@index'
]);

Route::get('addroute', [
  'as'      => 'user_add_route_form',
  'uses'    => 'HomeController@createRoute'
]);

Route::post('addroute', [
  'as'      => 'user_add_route_store',
  'uses'    => 'HomeController@storeRoute'
]);

Route::get('editroute', [
  'as'      => 'user_edit_route_form',
  'uses'    => 'HomeController@editRoute'
]);

Route::post('editroute', [
  'as'      => 'user_edit_route_store',
  'uses'    => 'HomeController@storeRoute'
]);

Route::post('addboat', [
    'as'    => 'user_edit_boat_form',
    'uses'  => 'HomeController@editBoat'
]);

Route::get('dashboard', [
    'as'    => 'userDashboard',
    'uses'  => 'HomeController@index'
]);

Route::get('posthttpmail', [
    'as'    => 'posthttpmail',
    'uses'  => 'WelcomeController@postHttpMail'
]);

Route::post('posthttpmail', function(){

    return response()->view('postHttpMail')->header('Content-Type', $type);
}, ['middleware' => 'Cors']);

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::get('contact',
    ['as' => 'contact', 'uses' => 'ContactController@createContactUs']);
Route::post('contact',
    ['as' => 'contact_store', 'uses' => 'ContactController@storeContactUs']);
