const {basename} = require('path');
const finger = require('fingerprinting');
const {readFile} = require('../afsync');

/**
 * Removes the fingerprint part of a file path string
 * @param  {String} path File path
 * @return {String}
 */
module.exports = async function removeFingerprint(path) {
	const content = await readFile(path);
	const {id} = finger(
		basename(path),
		{content}
	);
	return path.split('.').filter(part => !id.startsWith(part)).join('.');
}
