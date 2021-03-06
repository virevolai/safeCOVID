const common = {
	Primary2: '#012842', // navy
	Primary3: '#D6580E', // orange
	Primary4: '#CE283D', // red
	Primary5: '#FFFFFF', // white

	Secondary1: '#999999', // dark grey
	Secondary2: '#D2D2D2', // silver grey
	Secondary3: '#F8F8F8', // off white
}

const Colors = {

	...common,

	Primary	 : common.Primary2,
	Plight	 : common.Primary2,
	Pdark		 : common.Primary3,

	Secondary: common.Secondary1,
	Slight	 : '#5ddef4',
	Sdark		 : '#007c91',

	textP		 : common.Primary2,
	textS		 : common.Secondary3,
	textB		 : common.Primary4, // Button text, same as secondary
	textDisabled: 'grey',
	textFontFamily: "Helvetica",

	Pbackground: common.Secondary3,
	Sbackground: common.Secondary2,

}

export default Colors;
