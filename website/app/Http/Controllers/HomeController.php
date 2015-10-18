<?php namespace App\Http\Controllers;

use Input;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('user.dashboard');
	}

	public function createRoute()
	{
		return view('user.addRoute');
	}

	public function storeRoute()
	{
		return \Redirect::route('userDashboard')->with('message', 'Submitted Successfully');
	}

	public function editRoute()
	{
		return view('user.editRoute');
	}

	public function editBoat()
	{
		$boat_name = Input::get('boat_name');

		return view('user.editRoute')->with('boat_name', $boat_name);
	}
}
