//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundGradient : {
			type : 'linear',
			colors : ['#ddd', '#f0f0f0'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : '100%',
				y : '100%'
			},
			backFillStart : false
		}
	});
	var Button = require('ui/common/Button');
	var Input = require('ui/common/Input');
	var Header = require('ui/common/Header');

	var iZettle = new (require('modules/izettle'))({
		sourceUrl : 'izettlepoc',
		apiKey : 'MY_SECRET_DEV_KEY',
		quiet : false,
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color : '#555',
		text : 'iZettle lib v' + iZettle.version + '\nDemo application',
		textAlign : 'center',
		//top : 20,
		font : {
			fontSize : 18
		},
		shadowColor : '#fff',
		shadowOffset : {
			x : 1,
			y : 1
		},
		height : 60,
		width : 300
	});
	var header = new Header({
		title : 'iZettle POC'
	});
	var buttonPay = new Button({
		bottom : 10,
		left : 10,
		title : 'Pay with iZettle',
		action : function() {
			//alert('Pay with iZettle' + inputPrice.getValue());
			iZettle.payment({
				price : inputPrice.getValue(),
				title : inputDescription.getValue(),
				currency : 'EUR',
				reference : 'REFERENCE_STRING',
				success : function(m) {
					alert('SUCCESS: ' + JSON.stringify(m));
				},
				failure : function(m) {
					alert('FAILURE: ' + JSON.stringify(m));
				}
			});
		}
	});
	var inputPrice = new Input({
		value : 64.35,
		top : 60,
		left : 10,
		title : 'Price',
		keyboard : Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	var inputDescription = new Input({
		value : 'Payment description',
		top : 130,
		left : 10,
		title : 'Description'
	});
	//Add UI to view
	self.add(header);
	self.add(label);
	self.add(inputPrice);
	self.add(inputDescription);
	self.add(buttonPay);

	return self;
}

module.exports = FirstView;
