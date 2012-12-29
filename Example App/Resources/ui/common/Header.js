//Header Component Constructor
function Header(o) {
	o = (o) ? o : {};
	o.title = (o.title) ? o.title : '';

	var self = Titanium.UI.createView({
		width : 320,
		height : 50,
		top: 0,
		color : o.color,
		backgroundGradient : {
			type : 'linear',
			colors : ['#3f3f3f', '#202020'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 50
			},
			backFillStart : false
		}
	});
	var label = Ti.UI.createLabel({
		color : '#eee',
		text : o.title,
		textAlign : 'center',
		font : {
			fontSize : 24,
			fontWeight : 'bold'

		},
		shadowColor : '#222',
		shadowOffset : {
			x : 1,
			y : 1
		},
		height : 50,
		width : 320
	});
	self.add(label);
	return self;
}

module.exports = Header;
