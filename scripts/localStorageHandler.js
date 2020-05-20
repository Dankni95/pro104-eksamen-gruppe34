/**
 * This is a handler for localStorage.
 */

/**
 * 
 * @param {String} value The value to get in localStorage
 * @returns {String}
 */
function getStorage(value) {
	if (!window) throw ReferenceError("This has to be run in a browser.");
	return window.localStorage.getItem(value);
}

/**
 * 
 * @param {String} value The value to get in localStorage
 * @returns {Number}
 */
function getStorageAsNumber(value) {
	if (!window) throw ReferenceError("This has to be run in a browser.");
	const _value = window.localStorage.getItem(value);
	if (!isNaN(_value)) return parseInt(_value);
	else return NaN;
}

function removeStorage(name) {
	window.localStorage.removeItem(name);
}

/**
 * 
 * @param {String} name 
 * @param {any} value 
 * @param {Boolean} overwrite 
 */
function addStorage(name, value, overwrite = false) {
	if (!window) throw ReferenceError("This has to be run in a browser.");
	const array = [];
	if (typeof value == "Number") value = value.toString();
	if (!overwrite) {
		if (window.localStorage.getItem(name)) {
			for (const c of JSON.parse(window.localStorage.getItem(name))) {
				array.push(c);
			}
		}
		array.push(value);
		window.localStorage.setItem(name, JSON.stringify(array));
	} else {
		window.localStorage.setItem(name, [value]);
	}
}