const SoxCommand = require('sox-audio');
const helpers = require('./helpers');

const sourceFolder = './files';
const files = [
	'01-061 - emsis - bass part.mp3',
	'01-061 - emsis - cello part.mp3',
	'01-061 - emsis - clarinet guitar part.mp3',
	'01-061 - emsis - flute and gutar part.mp3',
	'01-061 - emsis - viola part.mp3',
	'01-061 - emsis - violin part.mp3'
];

const combinations = helpers.getCombinations(files);


const generateCombinationFile = (combo) => {
	return new Promise((resolve) => {
		const command = SoxCommand();

		// append all the source files for this particular combination
		for (let i=0; i<combo.files.length; i++) {
			command.input(`${sourceFolder}/${combo.files[i]}`)
		}

		command.output(`./generated/${combo.label}.mp3`).outputFileType('mp3');
		command.combine('mix');

		// command.on('prepare', function(args) {
		// 	console.log('Preparing sox command with args ' + args.join(' '));
		// });

		// command.on('start', function(commandLine) {
		// 	console.log('Spawned sox with command ' + commandLine);
		// });

		// command.on('progress', function(progress) {
		// 	console.log('Processing progress: ', progress);
		// });

		command.on('error', (err, stdout, stderr) => {
			console.log('Cannot process audio: ' + err.message, stdout, stderr);
		});

		command.on('end', () => {
			console.log('Generated: ', combo.label);
			resolve();
		});
		command.run();
	});
};


function processAll(array, fn) {
	var index = 0;

	function next() {
		if (index < array.length) {
			fn(array[index++]).then(next);
		}
	}
	next();
}


processAll(combinations, generateCombinationFile);

