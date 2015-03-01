/**
 * Implements a WeakMap
 * for storing private
 * properties.
 *
 * NOTE: requires the --harmony flag
 * @returns {Function}
 */
module.exports = function() {
    var map = new WeakMap();

    return function(object) {
        if (!map.has(object)) {
            map.set(object, {});
        }

        return map.get(object);
    }
}