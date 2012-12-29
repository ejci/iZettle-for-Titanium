/*
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/


// This is a single context application with multiple windows in a stack
(function() {
	var Window;
	Window = require('ui/handheld/ApplicationWindow');
	new Window().open();
})();
