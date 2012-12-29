//Button Component Constructor
function Button(o) {
	o = (o) ? o : {};
	o.title = (o.title) ? o.title : '';
	o.action = (o.action) ? o.action : function() {
	};
	o.width = (o.width) ? o.width : 300;
	o.height = (o.height) ? o.height : 60;

	//create object instance, a parasitic subclass of Observable
	var self = Titanium.UI.createButton({
		title : o.title,
		width : o.width,
		height : o.height,
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 2,//Math.round(o.width / 2, 0),
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		backgroundGradient : {
			type : 'linear',
			colors : ['#3f3f3f', '#202020'],
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
		borderColor : '#202020'
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

	//Add behavior for UI
	self.addEventListener('click', function(e) {
		o.action(e)
	});
	self.addEventListener('touchstart', function(e) {
		self.backgroundGradient = {
			type : 'linear',
			colors : ['#900', '#700'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 80
			},
			backFillStart : false
		};
	});
	self.addEventListener('touchend', function(e) {
		self.backgroundGradient = {
			type : 'linear',
			colors : ['#3f3f3f', '#202020'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 80
			},
			backFillStart : false
		};
	});

	return self;
}

module.exports = Button;
