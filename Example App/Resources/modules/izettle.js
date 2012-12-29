/*
 * iZettle library for Titanium Appcelerator
 * by Miroslav Magda, blog.ejci.net,
 *
 *
 * Copyright 2012 Miroslav Magda
 *
 *
 */

var iZettle = function(o) {
	//Titanium.include('/lib/json2.js');
	var jsUri = require('/modules/jsuri');
	//Version
	var _version = '0.1.0';
	var _const = {
		iZettleUrl : 'izettle://x-callback-url/payment/1.0'
	};
	var _conf = {
		sourceUrl : '',
		apiKey : '',
		price : 0,
		currency : 'EUR',
		title : 'iZettle library for Titanium Appcelerator payment'
	};
	//Options
	o = (o) ? o : {};
	var _opt = {
		apiKey : (o.apiKey) ? o.apiKey : '',
		sourceUrl : (o.sourceUrl) ? o.sourceUrl : '',
		quiet : ( typeof (o.quiet) === 'undefined') ? true : o.quiet
	};
	var _callback = {};
	_callback.success = function() {
	};
	_callback.failure = function() {
	};
	/**
	 * Log namespace
	 */
	var log = function() {
	};
	log.error = function(t) {
		Ti.API.error('' + t);
	}
	log.info = function(t) {
		if (!_opt.quiet) {
			Ti.API.info(t);
		}
	}
	log.debug = function(t) {
		if (!_opt.quiet) {
			Ti.API.debug('' + t);
		}
	}
	log.trace = function(t) {
		if (!_opt.quiet) {
			Ti.API.trace('' + t);
		}
	}
	//UTILS
	log.info('--------------------------------------');
	log.info('| iZettle library                    |');
	log.info('| Titanium Module (v.:' + _version + ')         |');
	log.info('| by Miroslav Magda                  |');
	log.info('--------------------------------------');
	if (!o.apiKey) {
		log.error('iZettle: It seems you forget to add your development key...')
	}
	if (!o.sourceUrl) {
		log.error('iZettle: It seems you forget to add your sourceUrl...')
	}
	/**
	 * Payment
	 * @param {Object} o Payment options
	 * @example
	 *
	 * {
	 * 	price : 100.35,
	 * 	title : 'Payment title',
	 * 	currency : 'EUR',
	 * 	reference : 'REFERENCE_STRING',
	 * 	success : function(m) {
	 * 		alert('SUCCESS: ' + JSON.stringify(m));
	 * 	}, failure : function(m) {
	 * 		alert('FAILURE: ' + JSON.stringify(m));
	 * 	}
	 * }
	 *
	 */
	function payment(o) {
		o.price = (o.price) ? o.price : _conf.price;
		o.currency = (o.currency) ? o.currency : _conf.currency;
		o.title = (o.title) ? o.title : _conf.title;
		o.reference = (o.reference) ? o.reference : false;
		o.image = (o.image) ? o.image : false;
		o.success = (o.success) ? o.success : function() {
		};
		o.failure = (o.failure) ? o.failure : function() {
		};
		var URI = new jsUri(_const.iZettleUrl);
		if (o.price === _conf.price && o.currency === _conf.currency && o.title == _conf.title) {
			log.error('iZettle: It looks like you forget to fill price, currency and paymant title. Payment will continue with default values...');
		}
		_callback.success = o.success;
		_callback.failure = o.failure;
		URI.addQueryParam('x-source', _opt.sourceUrl);
		URI.addQueryParam('x-success', _opt.sourceUrl + '://iZettle/success');
		URI.addQueryParam('x-failure', _opt.sourceUrl + '://iZettle/failure');
		URI.addQueryParam('api-key', _opt.apiKey);
		URI.addQueryParam('price', o.price);
		URI.addQueryParam('title', o.title);
		URI.addQueryParam('currency', o.currency);
		if (o.reference) {
			URI.addQueryParam('reference', o.reference);
		}
		if (o.image) {
			URI.addQueryParam('image', o.image);
		}
		log.debug('iZettle: URI=> ' + URI.toString());
		try {
			Ti.Platform.openURL(URI.toString())
		} catch(err) {
			log.error('iZettle: ' + err);
		}

	}

	/**
	 * Registering resume events
	 */
	Titanium.App.addEventListener('resumed', function() {
		//Ti.API.info(Ti.App.getArguments());
		var args = Ti.App.getArguments();
		log.trace('iZettle: resume args => ' + JSON.stringify(args));
		if (args.url) {
			var URI = new jsUri(args.url);
			log.trace('iZettle: URI host=> ' + URI.host());
			log.trace('iZettle: URI path=> ' + URI.path());
			log.trace('iZettle: URI reference=> ' + URI.getQueryParamValue('reference'));
			log.trace('iZettle: URI errorCode=> ' + URI.getQueryParamValue('errorCode'));
			if (URI.host() == 'iZettle') {
				if (URI.path() === '/success') {
					//success
					var msg = {};
					if (URI.getQueryParamValue('reference')) {
						msg.reference = URI.getQueryParamValue('reference');
					}
					_callback.success(msg);
				}
				if (URI.path() === '/failure') {
					//failure
					var msg = {};
					msg.errCode = URI.getQueryParamValue('errorCode');
					if (URI.getQueryParamValue('reference')) {
						msg.reference = URI.getQueryParamValue('reference');
					}
					_callback.failure(msg);
				}
			}
		}

	});

	/**
	 * Public methods
	 */
	return {
		payment : payment,
		version : _version
	}
};
/**
 * Exports module
 */
module.exports = iZettle;
