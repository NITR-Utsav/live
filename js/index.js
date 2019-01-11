$(".cumple").show();
var paths = $('#cumple path:not(defs path)');

paths.each(function(i, e) {
	e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
});

var tl = new TimelineMax();

tl.add([
	TweenLite.to(paths.eq(0), 0.3, {strokeDashoffset: 0, delay: 0.0}),
	TweenLite.to(paths.eq(1), 0.2, {strokeDashoffset: 0, delay: 0.3}),
	TweenLite.to(paths.eq(2), 0.3, {strokeDashoffset: 0, delay: 0.5}),
	TweenLite.to(paths.eq(3), 0.4, {strokeDashoffset: 0, delay: 0.8}),
	TweenLite.to(paths.eq(4), 1.8, {strokeDashoffset: 0, delay: 1.2}),
	TweenLite.to(paths.eq(5), 2.5, {strokeDashoffset: 0, delay: 3}),
	TweenLite.to(paths.eq(6), 0.3, {strokeDashoffset: 0, delay: 5.2}),
	TweenLite.to(paths.eq(7), 0.2, {strokeDashoffset: 0, delay: 5.4}),
	TweenLite.to(paths.eq(8), 0.2, {strokeDashoffset: 0, delay: 5.6}),
	TweenLite.to(paths.eq(9), 0.2, {strokeDashoffset: 0, delay: 5.8})
]);

//Bulb
for (var i=0;i<9;i++){
	var bulb= document.createElement("div");
	bulb.className="bulb";
	document.getElementById("reg-desk-lights").appendChild(bulb);
}