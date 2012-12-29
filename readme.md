iZettle library for Titanium
=======

iZettle library for Titanium is a javascript module for Appcelerator Titanium. It allows to make card (VISA, Maestro,...) payments directly from your mobile device.
Check how the whole system work on [iZettle  web page](https://www.izettle.com/). It is very similar (same?) to [Square](https://squareup.com/) but it works in Europe...
well only in few EU countries (Sweden, Denmark, Finland, Norway, UK, Germany and Spain).


##Example Usage
Check the example App to see it in action. It is ridiculously simple. You only need is [developer key from iZettle](https://developer.izettle.com/).
Of course you can test it with their URL tester app like i did because their currently 

###Titanium code:
	
	:::javascript
	//initialize module
	var iZettle = new (require('modules/izettle'))({
		sourceUrl : 'izettlepoc', //your app URL scheme
		apiKey : 'MY_SECRET_DEV_KEY', //your api key from iZettle
		quiet : false, //debuging on=false/off=true
	});
	
	//create some button
	var pay = Ti.UI.createButton({
		title : 'Pay with iZettle'
	});
	//do some action...
	pay.addEventListener('click', function() {
		//iZettle call application with paym,ent options
		iZettle.payment({
			price : inputPrice.getValue(),
			title : inputDescription.getValue(),
			currency : 'EUR',
			reference : 'REFERENCE_STRING',
			success : function(m) {
				//success callback
				alert('SUCCESS: ' + JSON.stringify(m));
			},
			failure : function(m) {
				//failure callback :(
				alert('FAILURE: ' + JSON.stringify(m));
			}
		});
	});


###Titanium demo:
![Demo App][1]

##Testing
TODO:

##Disclaimer
Unfortunately I was unable to test it on real application because iZettle is not available in my country (Slovakia) :(
But it should work... if not please contact me and i will try to help.

Author: [Miroslav Magda](http://blog.ejci.net)
Version 0.1.0

##License
All code is open source and dual licensed under GPL and MIT. Check the individual licenses for more information.


[1]: https://bitbucket.org/miroslavmagda/izettle-for-titanium/downloads/iZettle_demo.png
