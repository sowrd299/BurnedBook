let tracking = 35;
let transcriptions = new Map();
let maxTranscriptionLen = 2; // TODO: Don't hard code this

var canvas = document.getElementById("outputarea");
var ctx = canvas.getContext("2d");

// standardize the canvas bitmap grid
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// #layer1, setup the basic canvas scale and position
ctx.save();
ctx.transform(1.500000, 0.000000, 0.000000, 1.500000, tracking/2, -87.000000);


/*
 This is called to write from text instead of letter functions
 It takes in a string, and displays the corresponding elvish
 Also handles displaying multiple words at once
 */
function transcribe(text) {

	text = text.toLowerCase();
	var words = [];
	var letters = [];

	for(var i = 0; i < text.length;) {
		var noMatchFound = true;

		// favor the longest possible match for each character to use
		for(var j = maxTranscriptionLen; j > 0; j--) {
			var sub = text.substring(i, i+j);
			if(transcriptions.has(sub)){
				letters.push(transcriptions.get(sub));
				noMatchFound = false;
				i += sub.length;
				break;
			}
		}

		// skip worthless letters that don't match characters
		if(noMatchFound){

			// handle advancing to the next word
			if(text[i] == ' ') {
				words.push(letters);
				letters = []
			}

			i++;
		}
	}

	words.push(letters);

	var offset = 0; 

	words.forEach(function(word){
		write(word, tracking);

		var wordOffset = tracking * (word.length + 0.5);
		ctx.transform(1, 0, 0, 1, wordOffset, 0);
		offset += wordOffset
	});

	ctx.transform(1, 0, 0, 1, -offset, 0);
	
}

/*
 The only function needed to be called for most writing
 */
function write(word, tracking) {

	let stack = [];
	var first = true;

	beginWord();

	word.forEach(function(writeLetter){
		stack.push(writeLetter(first));
		ctx.transform(1, 0, 0, 1, tracking, 0);
		first = false;
	})

	while(stack.length > 0){
		ctx.transform(1, 0, 0, 1, -tracking, 0);
		var endLetter = stack.pop();
		endLetter();
	}

	endWord();

}
	

/*
To be called to start writing a new word
 */
function beginWord() {
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.lineCap = 'butt';
	ctx.lineWidth = 0.070004;
	ctx.fillStyle = 'rgb(0, 0, 0)';
}

/* 
 To be called as the final step in writing a word
 */
function endWord() {
	ctx.fill();
	ctx.stroke();
}

/*
Returns a function that manages writing the given letter with the given specs
 */
function makeWriteLetter ( offsetX, offsetY, start, write, end ) {
	return function(first) {
		ctx.save();
		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, offsetX, offsetY);
		if(first) start();
		write();
		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -offsetX, -offsetY);

		return function() {
			ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, offsetX, offsetY);
			end();
			ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -offsetX, -offsetY);
		}

	}
}





// USER INPUT
// set up the input to be transcribed from
let from = document.getElementById("transcribefrom");
from.oninput = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	transcribe(from.value);
}






// LETTER FUNCTIONS

// vowels

function writeI(first) {
	ctx.save(first);
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -12.289238, -15.340870);

	if(first) ctx.moveTo(17.495198, 102.340870);
	ctx.bezierCurveTo(22.541260, 107.115970, 28.637440, 108.404130, 37.765205, 106.660710);
	ctx.bezierCurveTo(35.047519, 114.326680, 20.531502, 114.529620, 12.289238, 119.287920);
	ctx.bezierCurveTo(22.371336, 124.414820, 36.091036, 120.367430, 47.512178, 120.673770);

	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 12.289238, 15.340870);

	return function () {
		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -12.289238, -15.340870);

		ctx.bezierCurveTo(37.246016, 117.418420, 25.811601, 120.840710, 22.036564, 118.844870);
		ctx.bezierCurveTo(36.399642, 114.215190, 45.442494, 108.779420, 50.060128, 102.673160);
		ctx.bezierCurveTo(38.622838, 103.338820, 26.431344, 105.010070, 17.495198, 102.340870);

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 12.289238, 15.340870);
	}
}
transcriptions.set("i", writeI);

function writeA(first) {
	ctx.save(first);
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -11.839099, -56.490920);

	if(first) ctx.moveTo(11.839099, 165.724010);
	ctx.bezierCurveTo(18.387203, 158.325890, 24.630742, 153.476090, 31.178845, 143.490920);
	ctx.bezierCurveTo(35.471483, 150.797340, 42.311363, 157.965350, 48.995776, 160.089600);

	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 11.839099, 56.490920);

	return function () {

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -11.839099, -56.490920);

		ctx.bezierCurveTo(41.632395, 161.878230, 32.439261, 156.206490, 31.178845, 149.886740);
		ctx.bezierCurveTo(27.859986, 157.467350, 18.790274, 162.502180, 11.839099, 165.724010);

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 11.839099, 56.490920);

	}
}
transcriptions.set("a", writeA);
	    
let writeU = makeWriteLetter (
	0, 0, 
	function() {
		ctx.moveTo(0.189842, 88.385520);
		ctx.bezierCurveTo(0.189842, 88.385520, 9.848792, 86.622210, 13.811852, 88.911060);
	},
	function() {
		ctx.bezierCurveTo(18.511152, 91.625120, 22.853282, 97.274130, 22.750142, 102.779110);
		ctx.bezierCurveTo(22.655342, 107.840650, 19.069592, 114.630850, 14.059982, 115.210790);
		ctx.bezierCurveTo(9.525402, 115.735720, 4.183112, 110.620710, 3.849052, 106.050600);
		ctx.bezierCurveTo(3.320572, 98.820720, 11.548042, 93.106560, 17.722422, 89.347250);
		ctx.bezierCurveTo(20.851952, 87.441840, 28.450962, 87.000000, 28.450962, 87.000000);
	},
	function () {
		ctx.bezierCurveTo(28.192362, 90.786440, 20.928292, 90.454580, 17.939672, 92.182550);
		ctx.bezierCurveTo(13.214102, 94.914820, 7.792982, 99.678320, 7.902322, 105.151740);
		ctx.bezierCurveTo(7.948122, 107.445280, 10.036942, 110.391720, 12.321952, 110.412590);
		ctx.bezierCurveTo(16.170862, 110.447690, 19.939872, 105.552630, 19.925842, 101.688610);
		ctx.bezierCurveTo(19.908642, 96.964920, 14.863052, 92.861080, 10.553042, 91.092060);
		ctx.bezierCurveTo(7.299362, 89.756600, 0.290752, 92.758480, 0.073492, 91.886080);
		ctx.bezierCurveTo(-0.143758, 91.013670, 0.189842, 88.385520, 0.189842, 88.385520);
	}
);
transcriptions.set("u", writeU);
	
// _o/a

let writeBo = makeWriteLetter (
	-127.948370, -51.709464,
	function () { 
		ctx.moveTo(136.163800, 146.860310);
		ctx.bezierCurveTo(135.809260, 144.114840, 154.656140, 148.414700, 156.963400, 144.114840);
	},
	function () { 
		ctx.bezierCurveTo(157.963900, 142.250260, 152.199940, 139.269710, 149.754440, 140.454220);
		ctx.bezierCurveTo(141.939720, 144.239380, 168.252420, 165.610920, 150.108980, 168.518960);
		ctx.bezierCurveTo(146.311720, 169.127590, 142.087240, 164.368460, 143.845470, 162.112870);
		ctx.bezierCurveTo(146.650460, 158.514410, 162.517840, 161.197720, 162.517840, 161.197720);
	},
	function () {
		ctx.bezierCurveTo(162.754180, 163.485610, 150.185210, 160.192210, 146.918130, 162.875500);
		ctx.bezierCurveTo(145.594020, 163.963020, 146.691860, 167.056240, 148.809010, 166.841170);
		ctx.bezierCurveTo(162.936120, 165.406090, 135.528910, 143.414150, 148.218110, 139.157760);
		ctx.bezierCurveTo(152.573950, 137.696670, 161.342090, 141.651140, 160.154240, 144.724940);
		ctx.bezierCurveTo(158.200980, 149.779460, 136.163800, 146.860310, 136.163800, 146.860310);
	}
);
transcriptions.set("bo", writeBo);
transcriptions.set("ba", writeBo);

let writePo = makeWriteLetter (
	-168.080830, -52.056055,
	function () { 
		ctx.moveTo(168.590860, 147.206900);
		ctx.bezierCurveTo(168.236320, 144.461450, 187.083200, 148.761310, 189.390460, 144.461450);
	},
	function () { 
		ctx.bezierCurveTo(190.390970, 142.596860, 184.627010, 139.616310, 182.181500, 140.800820);
		ctx.bezierCurveTo(177.427130, 143.103670, 182.954830, 155.675340, 181.225370, 161.390810);
		ctx.bezierCurveTo(184.745300, 160.990760, 193.343930, 157.159380, 194.896630, 154.312650);
	},
	function () {
		ctx.bezierCurveTo(191.967920, 161.089750, 176.372210, 167.649140, 175.577170, 165.861640);
		ctx.bezierCurveTo(179.561020, 158.405400, 172.491950, 142.239230, 180.645190, 139.504350);
		ctx.bezierCurveTo(185.001040, 138.043260, 193.769160, 141.997740, 192.581320, 145.071550);
		ctx.bezierCurveTo(190.628050, 150.126060, 168.590890, 147.206900, 168.590890, 147.206900);
	}
);
transcriptions.set("po", writePo);
transcriptions.set("pa", writePo);

let writeSo = makeWriteLetter (
	-86.206309, -52.614450,
	function() {
		ctx.moveTo(89.883349, 150.432880);
		ctx.bezierCurveTo(95.695433, 147.456840, 98.834929, 143.906400, 103.200330, 140.068960);
	},
	function() {
		ctx.bezierCurveTo(105.778110, 148.109200, 113.289020, 158.322720, 114.902500, 161.671660);
		ctx.bezierCurveTo(116.782980, 165.574770, 113.647130, 172.579340, 108.877320, 172.729340);
		ctx.bezierCurveTo(104.579020, 172.864490, 101.059290, 166.688410, 102.598860, 163.132890);
		ctx.bezierCurveTo(104.903840, 157.809710, 115.339900, 145.066010, 117.090140, 139.614450);
		ctx.bezierCurveTo(119.006590, 142.735340, 119.720240, 147.191750, 124.703250, 146.907730);
	},
	function () {
		ctx.bezierCurveTo(120.768960, 149.422310, 118.348240, 147.325200, 117.476250, 142.788500);
		ctx.bezierCurveTo(116.221830, 149.315130, 108.831710, 159.537400, 105.701220, 163.476460);
		ctx.bezierCurveTo(104.100220, 165.491010, 105.863120, 169.446580, 108.449240, 169.698880);
		ctx.bezierCurveTo(111.229040, 169.970060, 113.302000, 166.670060, 113.103990, 163.752750);
		ctx.bezierCurveTo(112.836200, 159.807520, 105.416950, 160.111730, 102.142010, 143.951360);
		ctx.bezierCurveTo(99.499803, 148.811220, 96.193749, 149.761410, 89.883358, 150.432880);
	}
);
transcriptions.set("so", writeSo);
transcriptions.set("sa", writeSo);

function writeTo(first) {
	ctx.save();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -47.787045, -53.205766);

	if(first) ctx.moveTo(58.096665, 147.208970);
	ctx.bezierCurveTo(62.735125, 149.214640, 77.095332, 138.815110, 77.768657, 140.530270);
	ctx.bezierCurveTo(73.435524, 147.789120, 79.729603, 164.272480, 71.455787, 166.617430);
	ctx.bezierCurveTo(67.035518, 167.870210, 58.464892, 163.504180, 59.797233, 160.490190);
	ctx.bezierCurveTo(61.988129, 155.534030, 83.861981, 159.495480, 83.861981, 159.495480);
	console.log("Wrote: To");

	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 47.787045, 53.205766);

	return function () {

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -47.787045, -53.205766);
		
		//ctx.moveTo(83.861986, 159.495480);
		//ctx.lineTo(84.085863, 162.254680);
		ctx.bezierCurveTo(84.085863, 162.254680, 65.464220, 157.065440, 62.955549, 161.250990);
		ctx.bezierCurveTo(61.867710, 163.066000, 67.483752, 166.316670, 69.982705, 165.249520);
		ctx.bezierCurveTo(74.840981, 163.174860, 69.915995, 150.355080, 71.914687, 144.728090);
		ctx.bezierCurveTo(71.131436, 146.874920, 63.601761, 151.157350, 57.922982, 151.149640);

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 47.787045, 53.205766);
	}
}
transcriptions.set("to", writeTo);
transcriptions.set("ta", writeTo);

function writeMo(first) {
	ctx.save();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -206.294100, -53.340880);

	if(first) ctx.moveTo(206.294100, 149.588110);
	//ctx.lineTo(206.546770, 153.559740);
	ctx.bezierCurveTo(206.546770, 153.559740, 221.550340, 149.328010, 227.252040, 153.199330);
	ctx.bezierCurveTo(229.714680, 154.871400, 232.255660, 159.246810, 230.366400, 161.541580);
	ctx.bezierCurveTo(228.194410, 164.179740, 221.664530, 163.025710, 220.210930, 159.937300);
	ctx.bezierCurveTo(217.551410, 154.286800, 222.394150, 144.114850, 229.841600, 143.857730);
	ctx.bezierCurveTo(234.806650, 143.686320, 246.183840, 154.102120, 248.709840, 151.782170);

	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 206.294100, 53.340880);

	console.log("Wrote: Mo");

	return function() {

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -206.294100, -53.340880);

		//ctx.lineTo(249.036510, 148.166050);
		ctx.bezierCurveTo(247.778790, 149.917980, 236.941190, 139.462630, 230.883180, 140.400550);
		ctx.bezierCurveTo(221.507620, 141.852100, 212.738310, 151.870050, 215.461660, 159.602010);
		ctx.bezierCurveTo(217.482990, 165.340840, 229.108750, 168.010160, 233.345330, 163.627150);
		ctx.bezierCurveTo(236.854950, 159.996220, 233.472110, 152.046650, 229.418550, 149.028200);
		ctx.bezierCurveTo(223.245510, 144.431510, 206.294100, 149.588110, 206.294100, 149.588110);

		ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 206.294100, 53.340880);
	}

}
transcriptions.set("mo", writeMo);
transcriptions.set("ma", writeMo);



// _u
	
let writeHu = makeWriteLetter(
	-250.049670, -97.466828,
	function() {
		ctx.moveTo(250.049670, 215.567810);
		ctx.bezierCurveTo(250.049670, 207.799230, 259.047030, 207.620810, 262.512690, 202.805140);
	},
	function() {
		ctx.bezierCurveTo(266.097400, 197.824060, 280.789210, 183.773720, 285.736150, 184.493490);
		ctx.bezierCurveTo(285.736150, 184.493490, 279.157080, 196.977330, 281.036970, 203.082590);
		ctx.bezierCurveTo(282.265240, 207.071550, 290.367220, 211.267350, 290.367220, 211.267350);
	},
	function () {
		ctx.bezierCurveTo(290.707740, 216.400160, 279.660550, 212.356520, 277.427470, 207.452420);
		ctx.bezierCurveTo(275.234640, 202.636710, 279.266270, 191.637810, 279.266270, 191.637810);
		ctx.bezierCurveTo(277.499410, 191.295040, 269.913420, 202.468110, 267.696620, 206.355000);
		ctx.bezierCurveTo(263.916820, 212.982450, 250.049670, 215.567810, 250.049670, 215.567810);
	}
)
transcriptions.set("hu", writeHu);
	
let writeSu = makeWriteLetter(
	-91.054290, -102.811250,
	function() {
		ctx.moveTo(91.452614, 197.279220);
		ctx.bezierCurveTo(101.350350, 200.883370, 111.514960, 190.899130, 113.339560, 197.330590);
	},
	function() {
		ctx.bezierCurveTo(114.844110, 202.633880, 103.506200, 212.187020, 103.506200, 212.187020);
		ctx.bezierCurveTo(119.965840, 211.290080, 117.876230, 205.422440, 125.461290, 209.134590);
	},
	function () {
		ctx.bezierCurveTo(118.227130, 202.787260, 118.163920, 208.064690, 110.305610, 208.522970);
		ctx.bezierCurveTo(111.977760, 208.942090, 120.536390, 197.818310, 117.986990, 192.466450);
		ctx.bezierCurveTo(114.444280, 185.029380, 99.157139, 195.377670, 91.452614, 197.279220);
	}
)
transcriptions.set("su", writeSu);
transcriptions.set("s", writeSu);

let writeTu = makeWriteLetter(
	-55.312531, -97.766372,
	function() {
		ctx.moveTo(55.380721, 200.174170);
		ctx.bezierCurveTo(55.312531, 197.686300, 65.061917, 196.633740, 66.973684, 194.250650);
	},
	function() {
		ctx.bezierCurveTo(70.275650, 190.134630, 76.950964, 184.634350, 80.911473, 184.768790);
		ctx.bezierCurveTo(78.195211, 188.072000, 73.768251, 195.628190, 73.452102, 199.759530);
		ctx.bezierCurveTo(73.029631, 205.280240, 79.131712, 214.113330, 74.202235, 217.213820);
		ctx.bezierCurveTo(71.235030, 219.080090, 64.904211, 216.137300, 64.927867, 212.256830);
		ctx.bezierCurveTo(64.969007, 205.509340, 81.158012, 203.891910, 81.158012, 203.891910);
	},
	function () {
		ctx.bezierCurveTo(81.021622, 208.539090, 69.400905, 207.339250, 68.610338, 212.101930);
		ctx.bezierCurveTo(68.320517, 213.847900, 70.991840, 215.988000, 72.429194, 215.200030);
		ctx.bezierCurveTo(77.330419, 212.513140, 69.404528, 204.015730, 70.526619, 198.540120);
		ctx.bezierCurveTo(71.263044, 194.946500, 75.975275, 188.978720, 75.975275, 188.978720);
		ctx.bezierCurveTo(72.471635, 190.072890, 70.068015, 195.588000, 67.928398, 197.330890);
		ctx.bezierCurveTo(65.283316, 199.485510, 55.380726, 200.174170, 55.380724, 200.174170);
	}
)
transcriptions.set("tu", writeTu);

// front vowels and extra consonanants (the rogues)
	    
let writeVe = makeWriteLetter (
	-253.411130, -148.31694,
	function() {
		ctx.moveTo(253.904880, 251.166850);
		ctx.bezierCurveTo(258.649020, 253.140710, 260.527880, 241.544830, 263.653670, 236.484200);
	},
	function() { 
		ctx.bezierCurveTo(263.653670, 236.484200, 260.019600, 259.629380, 267.245350, 259.716250);
		ctx.bezierCurveTo(274.848050, 259.807750, 271.521140, 235.369070, 271.521140, 235.369070);
		ctx.bezierCurveTo(273.616970, 240.257240, 277.138290, 250.527740, 279.673110, 251.599540);
	},
	function () {
		ctx.bezierCurveTo(276.207580, 252.414400, 276.351870, 251.179450, 273.231420, 242.617460);
		ctx.bezierCurveTo(273.231420, 242.617460, 275.353100, 267.715580, 267.416350, 267.708070);
		ctx.bezierCurveTo(260.129470, 267.701070, 262.114350, 244.661880, 262.114350, 244.661880);
		ctx.bezierCurveTo(259.263830, 256.718640, 256.413310, 253.992150, 253.562770, 255.999120);
	}
);
transcriptions.set("ve", writeVe);
	
// TODO: Does not work
let writeCsu = makeWriteLetter(
	-89.483230, -149.330760,
	() => ctx.moveTo(105.347610, 236.587140),
	function() {
		ctx.bezierCurveTo(99.487694, 242.069940, 104.086010, 246.914960, 108.677880, 247.076780);
		ctx.bezierCurveTo(113.318550, 247.240320, 117.575200, 243.663540, 115.629130, 238.129020);
		ctx.bezierCurveTo(115.341750, 237.311730, 113.446480, 237.171900, 112.739190, 236.330760);
		ctx.bezierCurveTo(113.984580, 241.002410, 111.217960, 243.559500, 108.993950, 243.246250);
		ctx.bezierCurveTo(107.013280, 242.967290, 104.082750, 240.884860, 105.347610, 236.587140);
	},
	function () {
		ctx.moveTo(89.881554, 256.679800);
		ctx.bezierCurveTo(99.779288, 260.283950, 109.943900, 250.299710, 111.768500, 256.731170);
		ctx.bezierCurveTo(113.273050, 262.034460, 101.935140, 271.587600, 101.935140, 271.587600);
		ctx.bezierCurveTo(118.394780, 270.690660, 116.305170, 264.823020, 123.890230, 268.535170);
		ctx.lineTo(124.263470, 264.707330);
		ctx.bezierCurveTo(116.656070, 262.187840, 116.592860, 267.465270, 108.734550, 267.923550);
		ctx.bezierCurveTo(110.406700, 268.342670, 118.965330, 257.218890, 116.415930, 251.867030);
		ctx.bezierCurveTo(112.873220, 244.429960, 97.586078, 254.778250, 89.881554, 256.679800);
	}
)

// TODO: How will I make this work?
function writeVri() {

	ctx.save();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -253.411130, -139.834240);

	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.lineCap = 'butt';
	ctx.lineWidth = 0.070004;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.moveTo(253.904880, 251.166850);
	ctx.bezierCurveTo(258.649020, 253.140710, 260.527880, 241.544830, 263.653670, 236.484200);
	ctx.bezierCurveTo(263.653670, 236.484200, 260.019600, 259.629380, 267.245350, 259.716250);
	ctx.bezierCurveTo(274.848050, 259.807750, 271.521140, 235.369070, 271.521140, 235.369070);
	ctx.bezierCurveTo(273.616970, 240.257240, 277.138290, 250.527740, 279.673110, 251.599540);
	ctx.lineTo(279.644310, 255.874250);
	ctx.bezierCurveTo(276.207580, 252.414400, 276.351870, 251.179450, 273.231420, 242.617460);
	ctx.bezierCurveTo(273.231420, 242.617460, 275.353100, 267.715580, 267.416350, 267.708070);
	ctx.bezierCurveTo(260.129470, 267.701070, 262.114350, 244.661880, 262.114350, 244.661880);
	ctx.bezierCurveTo(259.263830, 256.718640, 256.413310, 253.992150, 253.562770, 255.999120);
	ctx.fill();
    ctx.stroke();

	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.lineCap = 'butt';
	ctx.lineWidth = 0.070004;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.moveTo(265.979910, 235.692330);
	ctx.bezierCurveTo(268.225950, 232.390900, 265.902210, 228.782160, 270.725250, 227.026920);
	ctx.lineTo(270.518910, 230.946990);
	ctx.bezierCurveTo(268.860740, 233.142650, 269.264800, 234.581160, 265.979910, 235.692330);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();

	console.log("Wrote: Vri")
}

// / LETTER FUNCTIONS