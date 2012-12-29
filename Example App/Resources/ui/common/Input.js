//Input field Component Constructor
function Input(o) {
	o = (o) ? o : {};
	o.title = (o.title) ? o.title : '';
	o.value = (o.value) ? o.value : '';
	o.color = (o.color) ? o.color : '#222';
	o.change = (o.change) ? o.change : function() {
	};
	o.focus = (o.focus) ? o.focus : function() {
	};
	o.blur = (o.blur) ? o.blur : function() {
	};
	o.width = (o.width) ? o.width : 300;
	o.height = (o.height) ? o.height : 40;
	o.keyboard = (o.keyboard) ? o.keyboard : Titanium.UI.KEYBOARD_DEFAULT;
	//create object instance, a parasitic subclass of Observable
	var self = Titanium.UI.createView({
		width : o.width,
		height : o.height,
		top : 0,
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 2,
		color : o.color,
		backgroundGradient : {
			type : 'linear',
			colors : ['#eee', '#fff'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : o.height
			},
			backFillStart : false
		},
		borderWidth : 1,
		borderColor : o.color
	});

	var done = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.DONE
	});

	var flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var field = Titanium.UI.createTextField({
		width : o.width - 20,
		height : o.height - 5,
		value: ''+o.value,
		keyboardType : o.keyboard,
		keyboardToolbar : [flexSpace, flexSpace, done],
		keyboardToolbarColor : o.color,
		keyboardToolbarHeight : 40,
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		font : {
			fontSize : o.height - 16,
			//fontWeight : 'bold'
		},
		color : o.color,
		backgroundColor : 'transparent',
		borderWidth : 0
	});

	if (o.top) {
		self.top = o.top
	};
	if (o.left) {
		self.left = o.left
	};
	if (o.bottom) {
		self.bottom = o.bottom
	};
	if (o.right) {
		self.right = o.right
	};
	var label = Ti.UI.createLabel({
		color : o.color,
		text : o.title,
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
		height : o.height,
		width : o.width
	});
	//Add behavior for UI
	field.addEventListener('change', function(e) {
		hint();
		o.change(e)
	});
	field.addEventListener('focus', function(e) {
		field.color='#900';
		self.borderColor='#900';
		label.text = '';
		o.focus(e)
	});
	field.addEventListener('blur', function(e) {
		field.color=o.color;
		self.borderColor=o.color;
		hint();
		o.blur(e)
	});

	self.add(label);
	self.add(field);

	var fulltrim = function(str) {
		return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
	};
	var hint = function() {
		var v = fulltrim(field.value);
		if (v === '') {
			label.text = o.title;
		} else {
			label.text = '';
		}
	};
	self.getValue = function() {
		return fulltrim(field.value);
	}
	done.addEventListener('click', function() {
		field.blur();
	});
	//
	hint();
	return self;
}

module.exports = Input;
