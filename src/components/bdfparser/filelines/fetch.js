var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
/**
 * Read text file line by line with native `fetch()` method
 *
 * This is to be used in modern browsers or Deno
 *
 * See ./nodefs.ts for Node file system version and ../../deno/filelines.ts for Deno file system version
 *
 * @param filepath - Path of the text file
 *
 * @returns An asynchronous iterable iterator representing each line in string text from the text file
 */
export default function (filepath) {
    return __asyncGenerator(this, arguments, function* () {
        const response = yield __await(fetch(filepath));
        const text = yield __await(response.text());
        const rows = text.split('\n');
        for (const row of rows) {
            yield yield __await(row);
        }
    });
}
