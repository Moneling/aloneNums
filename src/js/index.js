const Grid = require("./ui/grid.js");
const grid = new Grid($("#container"));
const popupNumber = require("./ui/popupnumbers.js");
grid.build();
grid.layout();

const popup = new popupNumber($("#popupNumbers"));
grid.bindPopup(popup);

$("#check").on("click",(e) =>{
	grid.reset();
})

$("#reset").on("click",(e) =>{
	grid.reset();
})
$("#clear").on("click",(e) =>{
	grid.clear();
})

$("#rebuild").on("click",(e) =>{
	console.log('2222');
	grid.rebuild();
})