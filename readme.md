iZettle library for Titanium
=======

iZettle library for Titanium is a javascript module for Appcelerator Titanium. It allows to make card (VISA, Maestro,...) payments directly from your mobile device.
Check how the whole system work on [iZettle  web page](https://www.izettle.com/). It is very similar (same?) to [Square](https://squareup.com/) but it works in Europe...
well only in few EU countries (Sweden, Denmark, Finland, Norway, UK, Germany and Spain).


##Example Usage
Check the example App to see it in action. It is ridiculously simple. You only need is [developer key from iZettle](https://developer.izettle.com/).

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
I was unable to test payment proces with iZettle app. But according the documentation on their [page](https://developer.izettle.com/) iZettle app is using [x-callback-url](http://x-callback-url.com/).
So it was relatively easy to develop application even i didn't have access to their application.

To test callback from iZettle app i was using Safari browser. So here are the test link for Example App:

izettlepoc://iZettle/success?reference=YOUR_REFERENCE
izettlepoc://iZettle/failure?reference=YOUR_REFERENCE&errorCode=TechnicalError
izettlepoc://iZettle/failure?reference=YOUR_REFERENCE&errorCode=CancelledByUser
izettlepoc://iZettle/failure?reference=YOUR_REFERENCE&errorCode=InvalidCurrency
izettlepoc://iZettle/failure?reference=YOUR_REFERENCE&errorCode=InvalidState
izettlepoc://iZettle/failure?reference=YOUR_REFERENCE&errorCode=MissingParameter

Just copy the links to Safari browser and press Go.
![Demo App Safari testing][2]

Of course in your application you will need to change URL scheme to your scheme.

##Disclaimer
Unfortunately I was unable to test it on real application because iZettle is not available in my country (Slovakia) :(
But it should work... if not please contact me and i will try to help.

Author: [Miroslav Magda](http://blog.ejci.net)
Version 0.1.0

##License
All code is open source and dual licensed under GPL and MIT. Check the individual licenses for more information.


[1]: http://cdn.bitbucket.org/miroslavmagda/izettle-for-titanium/downloads/iZettle_demo.png
[2]: http://cdn.bitbucket.org/miroslavmagda/izettle-for-titanium/downloads/iZettle_demo_test.png