"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Bitmap = exports.$Glyph = exports.$Font = exports.Bitmap = exports.Glyph = exports.Font = void 0;
const setProperty = (obj, key, value) => {
    obj[key] = value;
};
const PATTERN_VVECTOR_DELIMITER = '[\\s]+';
const EMPTY_GLYPH = {
    glyphname: 'empty',
    codepoint: 8203,
    bbw: 0,
    bbh: 0,
    bbxoff: 0,
    bbyoff: 0,
    swx0: 0,
    swy0: 0,
    dwx0: 0,
    dwy0: 0,
    swx1: 0,
    swy1: 0,
    dwx1: 0,
    dwy1: 0,
    vvectorx: 0,
    vvectory: 0,
    hexdata: [],
};
const META_TITLES = [
    'glyphname',
    'codepoint',
    'bbw',
    'bbh',
    'bbxoff',
    'bbyoff',
    'swx0',
    'swy0',
    'dwx0',
    'dwy0',
    'swx1',
    'swy1',
    'dwx1',
    'dwy1',
    'vvectorx',
    'vvectory',
    'hexdata',
];
const DIRE_SHORTCUT_MAP = {
    lr: 'lrtb',
    rl: 'rltb',
    tb: 'tbrl',
    bt: 'btrl',
    lrtb: undefined,
    lrbt: undefined,
    rltb: undefined,
    rlbt: undefined,
    tbrl: undefined,
    tblr: undefined,
    btrl: undefined,
    btlr: undefined,
};
const DIRE_MAP = { lr: 1, rl: 2, tb: 0, bt: -1 };
/**
 * `Font` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font}
 */
class Font {
    constructor() {
        this.headers = undefined;
        this.__headers = {};
        this.props = {};
        this.glyphs = new Map();
        this.__glyph_count_to_check = null;
        this.__curline_startchar = null;
        this.__curline_chars = null;
    }
    /**
     * Load the BDF font file (file line async iterator).
     *
     * @param filelines - Asynchronous iterable iterator containing each line in string text from the font file
     *
     * @returns The current `Font` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#load_filelines}
     */
    load_filelines(filelines) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.__f = filelines;
                yield this.__parse_headers();
            }
            finally {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (typeof Deno !== 'undefined') {
                    // Deno needs to run to the end and close the file
                    if (this.__f !== undefined) {
                        try {
                            for (var _b = __asyncValues(this.__f), _c; _c = yield _b.next(), !_c.done;) {
                                const _ = _c.value;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
            }
            return this;
        });
    }
    __parse_headers() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            while (1) {
                const line = (_b = (yield ((_a = this.__f) === null || _a === void 0 ? void 0 : _a.next()))) === null || _b === void 0 ? void 0 : _b.value;
                const kvlist = line.split(/ (.+)/, 2);
                const l = kvlist.length;
                let nlist;
                if (l === 2) {
                    const key = kvlist[0];
                    const value = kvlist[1].trim();
                    switch (key) {
                        case 'STARTFONT':
                            this.__headers['bdfversion'] = parseFloat(value);
                            break;
                        case 'FONT':
                            this.__headers['fontname'] = value;
                            break;
                        case 'SIZE':
                            nlist = value.split(' ');
                            this.__headers['pointsize'] = parseInt(nlist[0], 10);
                            this.__headers['xres'] = parseInt(nlist[1], 10);
                            this.__headers['yres'] = parseInt(nlist[2], 10);
                            break;
                        case 'FONTBOUNDINGBOX':
                            nlist = value.split(' ');
                            this.__headers['fbbx'] = parseInt(nlist[0], 10);
                            this.__headers['fbby'] = parseInt(nlist[1], 10);
                            this.__headers['fbbxoff'] = parseInt(nlist[2], 10);
                            this.__headers['fbbyoff'] = parseInt(nlist[3], 10);
                            break;
                        case 'STARTPROPERTIES':
                            this.__parse_headers_after();
                            yield this.__parse_props();
                            return;
                        case 'COMMENT':
                            if (!('comment' in this.__headers) ||
                                !Array.isArray(this.__headers.comment)) {
                                this.__headers.comment = [];
                            }
                            this.__headers.comment.push(value.replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g, ''));
                            break;
                        case 'SWIDTH':
                            nlist = value.split(' ');
                            this.__headers['swx0'] = parseInt(nlist[0], 10);
                            this.__headers['swy0'] = parseInt(nlist[1], 10);
                            break;
                        case 'DWIDTH':
                            nlist = value.split(' ');
                            this.__headers['dwx0'] = parseInt(nlist[0], 10);
                            this.__headers['dwy0'] = parseInt(nlist[1], 10);
                            break;
                        case 'SWIDTH1':
                            nlist = value.split(' ');
                            this.__headers['swx1'] = parseInt(nlist[0], 10);
                            this.__headers['swy1'] = parseInt(nlist[1], 10);
                            break;
                        case 'DWIDTH1':
                            nlist = value.split(' ');
                            this.__headers['dwx1'] = parseInt(nlist[0], 10);
                            this.__headers['dwy1'] = parseInt(nlist[1], 10);
                            break;
                        case 'VVECTOR':
                            nlist = PATTERN_VVECTOR_DELIMITER.split(value);
                            this.__headers['vvectorx'] = parseInt(nlist[0], 10);
                            this.__headers['vvectory'] = parseInt(nlist[1], 10);
                            break;
                        case 'METRICSSET':
                        case 'CONTENTVERSION':
                            this.__headers[key.toLowerCase()] = parseInt(value, 10);
                            break;
                        case 'CHARS':
                            console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword");
                            this.__parse_headers_after();
                            this.__curline_chars = line;
                            yield this.__parse_glyph_count();
                            return;
                        case 'STARTCHAR':
                            console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword");
                            console.warn("Cannot find 'CHARS' line");
                            this.__parse_headers_after();
                            this.__curline_startchar = line;
                            yield this.__prepare_glyphs();
                            return;
                    }
                }
                if (l === 1 && kvlist[0].trim() === 'ENDFONT') {
                    console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword");
                    console.warn('This font does not have any glyphs');
                    return;
                }
            }
        });
    }
    __parse_headers_after() {
        if (!('metricsset' in this.__headers)) {
            this.__headers['metricsset'] = 0;
        }
        this.headers = this.__headers;
    }
    __parse_props() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            while (1) {
                const line = (_b = (yield ((_a = this.__f) === null || _a === void 0 ? void 0 : _a.next()))) === null || _b === void 0 ? void 0 : _b.value;
                const kvlist = line.split(/ (.+)/, 2);
                const l = kvlist.length;
                if (l === 2) {
                    const key = kvlist[0];
                    const value = kvlist[1].replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g, '');
                    if (key === 'COMMENT') {
                        if (!('comment' in this.props) ||
                            !Array.isArray(this.props.comment)) {
                            this.props.comment = [];
                        }
                        this.props.comment.push(value.replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g, ''));
                    }
                    else {
                        this.props[key.toLowerCase()] = value;
                    }
                }
                else {
                    if (l === 1) {
                        const key = kvlist[0].trim();
                        if (key === 'ENDPROPERTIES') {
                            yield this.__parse_glyph_count();
                            return;
                        }
                        if (key === 'ENDFONT') {
                            console.warn('This font does not have any glyphs');
                            return;
                        }
                        else {
                            this.props[key] = null;
                        }
                    }
                }
            }
        });
    }
    __parse_glyph_count() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let line;
            if (this.__curline_chars === null) {
                line = (_b = (yield ((_a = this.__f) === null || _a === void 0 ? void 0 : _a.next()))) === null || _b === void 0 ? void 0 : _b.value;
            }
            else {
                line = this.__curline_chars;
                this.__curline_chars = null;
            }
            if (line.trim() === 'ENDFONT') {
                console.warn('This font does not have any glyphs');
                return;
            }
            const kvlist = line.split(/ (.+)/, 2);
            if (kvlist[0] === 'CHARS') {
                this.__glyph_count_to_check = parseInt(kvlist[1].trim(), 10);
            }
            else {
                this.__curline_startchar = line;
                console.warn("Cannot find 'CHARS' line next to 'ENDPROPERTIES' line");
            }
            yield this.__prepare_glyphs();
        });
    }
    __prepare_glyphs() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let glyph_codepoint = 0;
            // Array(17).fill(null) 's tuple representation
            // prettier-ignore
            let glyph_meta = [
                null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null,
            ]; // TODO: remove initial value
            let glyph_bitmap = []; // TODO: remove initial value
            let glyph_bitmap_is_on = false;
            let glyph_end = false;
            while (1) {
                let line;
                if (this.__curline_startchar === null) {
                    line = (_b = (yield ((_a = this.__f) === null || _a === void 0 ? void 0 : _a.next()))) === null || _b === void 0 ? void 0 : _b.value;
                }
                else {
                    line = this.__curline_startchar;
                    this.__curline_startchar = null;
                }
                if (line === undefined || line === null) {
                    console.warn("This font does not have 'ENDFONT' keyword");
                    this.__prepare_glyphs_after();
                    return;
                }
                const kvlist = line.split(/ (.+)/, 2);
                const l = kvlist.length;
                if (l === 2) {
                    const key = kvlist[0];
                    const value = kvlist[1].trim();
                    let nlist;
                    switch (key) {
                        case 'STARTCHAR':
                            // Array(17).fill(null) 's tuple representation
                            // prettier-ignore
                            glyph_meta = [
                                null, null, null, null, null, null, null, null, null, null,
                                null, null, null, null, null, null, null,
                            ];
                            glyph_meta[0] = value;
                            glyph_end = false;
                            break;
                        case 'ENCODING':
                            glyph_codepoint = parseInt(value, 10);
                            glyph_meta[1] = glyph_codepoint;
                            break;
                        case 'BBX':
                            nlist = value.split(' ');
                            glyph_meta[2] = parseInt(nlist[0], 10);
                            glyph_meta[3] = parseInt(nlist[1], 10);
                            glyph_meta[4] = parseInt(nlist[2], 10);
                            glyph_meta[5] = parseInt(nlist[3], 10);
                            break;
                        case 'SWIDTH':
                            nlist = value.split(' ');
                            glyph_meta[6] = parseInt(nlist[0], 10);
                            glyph_meta[7] = parseInt(nlist[1], 10);
                            break;
                        case 'DWIDTH':
                            nlist = value.split(' ');
                            glyph_meta[8] = parseInt(nlist[0], 10);
                            glyph_meta[9] = parseInt(nlist[1], 10);
                            break;
                        case 'SWIDTH1':
                            nlist = value.split(' ');
                            glyph_meta[10] = parseInt(nlist[0], 10);
                            glyph_meta[11] = parseInt(nlist[1], 10);
                            break;
                        case 'DWIDTH1':
                            nlist = value.split(' ');
                            glyph_meta[12] = parseInt(nlist[0], 10);
                            glyph_meta[13] = parseInt(nlist[1], 10);
                            break;
                        case 'VVECTOR':
                            nlist = PATTERN_VVECTOR_DELIMITER.split(value);
                            glyph_meta[14] = parseInt(nlist[0], 10);
                            glyph_meta[15] = parseInt(nlist[1], 10);
                            break;
                    }
                }
                else {
                    if (l === 1) {
                        const key = kvlist[0].trim();
                        switch (key) {
                            case 'BITMAP':
                                glyph_bitmap = [];
                                glyph_bitmap_is_on = true;
                                break;
                            case 'ENDCHAR':
                                glyph_bitmap_is_on = false;
                                glyph_meta[16] = glyph_bitmap;
                                this.glyphs.set(glyph_codepoint, glyph_meta);
                                glyph_end = true;
                                break;
                            case 'ENDFONT':
                                if (glyph_end) {
                                    this.__prepare_glyphs_after();
                                    return;
                                }
                            default:
                                if (glyph_bitmap_is_on) {
                                    glyph_bitmap.push(key);
                                }
                                break;
                        }
                    }
                }
            }
        });
    }
    __prepare_glyphs_after() {
        const l = this.glyphs.size;
        if (this.__glyph_count_to_check !== l) {
            if (this.__glyph_count_to_check === null) {
                console.warn("The glyph count next to 'CHARS' keyword does not exist");
            }
            else {
                console.warn(`The glyph count next to 'CHARS' keyword is ${this.__glyph_count_to_check.toString()}, which does not match the actual glyph count ${l.toString()}`);
            }
        }
    }
    /**
     * Same as `.length()`
     * Returns how many glyphs actually exist in the font.
     *
     * @returns Actual glyph count in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#length}
     */
    get length() {
        return this.glyphs.size;
    }
    /**
     * Similar to `.iterglyphs()`, except it returns an `array` of glyph codepoints instead of an `iterator` of `Glyph` objects.
     *
     * @param order  - Order
     * @param r  - Codepoint range
     *
     * @returns An iterator of the codepoints of glyphs
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#itercps}
     */
    itercps(order, r) {
        const _order = order !== null && order !== void 0 ? order : 1;
        const _r = r !== null && r !== void 0 ? r : null;
        let ret;
        const ks = [...this.glyphs.keys()];
        switch (_order) {
            case 1:
                ret = ks.sort((a, b) => a - b);
                break;
            case 0:
                ret = ks;
                break;
            case 2:
                ret = ks.sort((a, b) => b - a);
                break;
            case -1:
                ret = ks.reverse();
                break;
        }
        if (_r !== null) {
            const f = (cp) => {
                if (typeof _r === 'number') {
                    return cp < _r;
                }
                else if (Array.isArray(_r) &&
                    _r.length === 2 &&
                    typeof _r[0] === 'number' &&
                    typeof _r[1] === 'number') {
                    return cp <= _r[1] && cp >= _r[0];
                }
                else {
                    if (Array.isArray(_r) && Array.isArray(_r[0])) {
                        for (const t of _r) {
                            const [t0, t1] = t;
                            if (cp <= t1 && cp >= t0) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            };
            ret = ret.filter(f);
        }
        return ret;
    }
    /**
     * Returns an iterator of all the glyphs (as `Glyph` objects) in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default).
     *
     * @param order  - Order
     * @param r  - Codepoint range
     *
     * @returns An iterator of glyphs as `Glyph` objects. Missing glyphs are replaced by `null`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#iterglyphs}
     */
    *iterglyphs(order, r) {
        for (const cp of this.itercps(order, r)) {
            yield this.glyphbycp(cp);
        }
    }
    /**
     * Get a glyph (as Glyph Object) by its codepoint.
     *
     * @param codepoint - Codepoint
     *
     * @returns `Glyph` object, or `null` if the glyph does not exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#glyphbycp}
     */
    glyphbycp(codepoint) {
        const b = this.glyphs.get(codepoint);
        if (b === undefined || b === null) {
            console.warn(`Glyph "${String.fromCodePoint(codepoint)}" (codepoint ${codepoint.toString()}) does not exist in the font. Will return 'null'`);
            return null;
        }
        else {
            const d = {};
            META_TITLES.forEach((val, i) => {
                setProperty(d, val, b[i]);
            });
            return new Glyph(d, this);
        }
    }
    /**
     * Get a glyph (as `Glyph` object) by its character.
     *
     * @param character - Character
     *
     * @returns `Glyph` object, or `null` if the glyph does not exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#glyph}
     */
    glyph(character) {
        const ret = character.codePointAt(0);
        return ret === undefined ? null : this.glyphbycp(ret);
    }
    /**
     * Check if there is any missing glyph and gets these glyphs' character.
     *
     * @param str - string to check
     *
     * @returns List of missing glyph(s)' characters, or `null` if all the glyphs in your string exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#lacksglyphs}
     */
    lacksglyphs(str) {
        const l = [];
        const len = str.length;
        for (let c, i = 0; i < len; i++) {
            c = str[i];
            const cp = c.codePointAt(0);
            if (cp === undefined || !this.glyphs.has(cp)) {
                l.push(c);
            }
        }
        return l.length !== 0 ? l : null;
    }
    /**
     * Draw the glyphs of the specified codepoints, to a `Bitmap` object.
     *
     * @param cps - Array of codepoints to draw
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     * @param options.missing - Missing glyph replacement
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#drawcps}
     */
    drawcps(cps, options = {}) {
        var _a, _b, _c, _d, _e, _f, _g;
        const _linelimit = (_a = options.linelimit) !== null && _a !== void 0 ? _a : 512;
        const _mode = (_b = options.mode) !== null && _b !== void 0 ? _b : 1;
        const _direction = (_c = options.direction) !== null && _c !== void 0 ? _c : 'lrtb';
        const _usecurrentglyphspacing = (_d = options.usecurrentglyphspacing) !== null && _d !== void 0 ? _d : false;
        const _missing = (_e = options.missing) !== null && _e !== void 0 ? _e : null;
        if (this.headers === undefined) {
            throw new Error('Font is not loaded');
        }
        let align_glyph, align_line = undefined, bitmap = undefined, bitmaplist, cp = undefined, dire_glyph, dire_line, fbbsize = undefined, glyph = undefined, interglyph, interglyph_global, interglyph_str = undefined, interglyph_str2 = undefined, offset = undefined, offsetlist, size, skip, w = undefined;
        const dire = (_f = DIRE_SHORTCUT_MAP[_direction]) !== null && _f !== void 0 ? _f : _direction;
        const dire_glyph_str = dire.slice(0, 2);
        const dire_line_str = dire.slice(2, 4);
        if (dire_glyph_str in DIRE_MAP && dire_line_str in DIRE_MAP) {
            dire_glyph = DIRE_MAP[dire_glyph_str];
            dire_line = DIRE_MAP[dire_line_str];
        }
        else {
            dire_glyph = 1;
            dire_line = 0;
        }
        if (dire_line === 0 || dire_line === 2) {
            align_glyph = 1;
        }
        else {
            if (dire_line === 1 || dire_line === -1) {
                align_glyph = 0;
            }
        }
        if (dire_glyph === 1 || dire_glyph === -1) {
            align_line = 1;
        }
        else {
            if (dire_glyph === 2 || dire_glyph === 0) {
                align_line = 0;
            }
        }
        if (_mode === 1) {
            fbbsize = dire_glyph > 0 ? this.headers['fbbx'] : this.headers['fbby'];
            if (dire_glyph > 0) {
                interglyph_str = 'dwx0';
                interglyph_str2 = 'dwy0';
            }
            else {
                interglyph_str = 'dwx1';
                interglyph_str2 = 'dwy1';
            }
            if (interglyph_str in this.headers) {
                interglyph_global = this.headers[interglyph_str];
            }
            else {
                if (interglyph_str2 in this.headers) {
                    interglyph_global = this.headers[interglyph_str2];
                }
                else {
                    interglyph_global = null;
                }
            }
        }
        const list_of_bitmaplist = [];
        bitmaplist = [];
        const list_of_offsetlist = [];
        offsetlist = [];
        size = 0;
        const append_bitmaplist_and_offsetlist = () => {
            list_of_bitmaplist.push(bitmaplist);
            if (_usecurrentglyphspacing) {
                offsetlist.shift();
            }
            else {
                offsetlist.pop();
            }
            list_of_offsetlist.push(offsetlist);
        };
        const cpsiter = cps[Symbol.iterator]();
        skip = false;
        while (1) {
            if (skip) {
                skip = false;
            }
            else {
                cp = (_g = cpsiter.next()) === null || _g === void 0 ? void 0 : _g.value;
                if (cp === undefined) {
                    break;
                }
                const glyphTemp = this.glyphbycp(cp);
                if (glyphTemp !== null) {
                    glyph = glyphTemp;
                }
                else {
                    if (_missing) {
                        if (_missing instanceof Glyph) {
                            glyph = _missing;
                        }
                        else {
                            glyph = new Glyph(_missing, this);
                        }
                    }
                    else {
                        glyph = new Glyph(EMPTY_GLYPH, this);
                    }
                }
                bitmap = glyph.draw();
                w = bitmap.width();
                offset = 0;
                if (_mode === 1 &&
                    interglyph_str !== undefined &&
                    interglyph_str2 !== undefined) {
                    interglyph = glyph.meta[interglyph_str] || glyph.meta[interglyph_str2];
                    if (interglyph === undefined || interglyph === null) {
                        interglyph = interglyph_global;
                    }
                    if (interglyph !== undefined &&
                        interglyph !== null &&
                        fbbsize !== undefined) {
                        offset = interglyph - fbbsize;
                    }
                }
            }
            if (w !== undefined &&
                offset !== undefined &&
                bitmap !== undefined &&
                glyph !== undefined &&
                cp !== undefined) {
                size += w + offset;
                if (size <= _linelimit) {
                    bitmaplist.push(bitmap);
                    offsetlist.push(offset);
                }
                else {
                    if (bitmaplist.length === 0) {
                        throw new Error(`\`_linelimit\` (${_linelimit}) is too small the line can't even contain one glyph: "${glyph.chr()}" (codepoint ${cp}, width: ${w})`);
                    }
                    append_bitmaplist_and_offsetlist();
                    size = 0;
                    bitmaplist = [];
                    offsetlist = [];
                    skip = true;
                }
            }
        }
        if (bitmaplist.length !== 0) {
            append_bitmaplist_and_offsetlist();
        }
        const list_of_bitmap_line_lists = list_of_bitmaplist.map((bitmaplist, i) => Bitmap.concatall(bitmaplist, {
            direction: dire_glyph,
            align: align_glyph,
            offsetlist: list_of_offsetlist[i],
        }));
        return Bitmap.concatall(list_of_bitmap_line_lists, {
            direction: dire_line,
            align: align_line,
        });
    }
    /**
     * Draw (render) the glyphs of the specified words / setences / paragraphs (as a `string`), to a `Bitmap` object.
     *
     * @param str - String to draw
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     * @param options.missing - Missing glyph replacement
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#draw}
     */
    draw(str, options = {}) {
        const { linelimit, mode, direction, usecurrentglyphspacing, missing, } = options;
        return this.drawcps(str.split('').map((c) => {
            const cp = c.codePointAt(0);
            if (cp === undefined) {
                return 8203;
            }
            else {
                return cp;
            }
        }), {
            linelimit,
            mode,
            direction,
            usecurrentglyphspacing,
            missing,
        });
    }
    /**
     * Draw all the glyphs in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default), to a `Bitmap` object.
     *
     * @param options.order - Order
     * @param options.r - Codepoint range
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#drawall}
     */
    drawall(options = {}) {
        const { order, r, linelimit, mode, direction, usecurrentglyphspacing, } = options;
        const _mode = mode !== null && mode !== void 0 ? mode : 0;
        return this.drawcps(this.itercps(order, r), {
            linelimit,
            mode: _mode,
            direction,
            usecurrentglyphspacing,
        });
    }
}
exports.Font = Font;
/**
 * `Glyph` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph}
 */
class Glyph {
    /**
     * `Glyph` object constructor
     *
     * @param meta_obj - Meta information
     * @param font - The font the glyph belongs to
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph}
     */
    constructor(meta_obj, font) {
        this.meta = meta_obj;
        this.font = font;
    }
    /**
     * Gets a human-readable (multi-line) `string` representation of the `Glyph` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#tostring}
     */
    toString() {
        return this.draw().toString();
    }
    /**
     * Gets a programmer-readable `string` representation of the `Glyph` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#repr}
     */
    repr() {
        var _a;
        return ('Glyph(' +
            JSON.stringify(this.meta, null, 2) +
            ', ' +
            'Font(<' + ((_a = this.font.headers) === null || _a === void 0 ? void 0 : _a.fontname) +
            '>' +
            ')');
    }
    /**
     * Get the codepoint of the glyph.
     *
     * @returns Codepoint of the glyph
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#cp}
     */
    cp() {
        return this.meta['codepoint'];
    }
    /**
     * Get the character of the glyph.
     *
     * @returns Character (one character string) of the glyph
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#chr}
     */
    chr() {
        return String.fromCodePoint(this.cp());
    }
    /**
     * Draw the glyph to a `Bitmap` object.
     *
     * @param mode - Mode
     * @param bb - Bounding box
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#draw}
     */
    draw(mode, bb) {
        const _mode = mode !== null && mode !== void 0 ? mode : 0;
        const _bb = bb !== null && bb !== void 0 ? bb : null;
        let retbitmap;
        switch (_mode) {
            case 0:
                retbitmap = this.__draw_fbb();
                break;
            case 1:
                retbitmap = this.__draw_bb();
                break;
            case 2:
                retbitmap = this.__draw_original();
                break;
            case -1:
                if (_bb !== null) {
                    retbitmap = this.__draw_user_specified(_bb);
                }
                else {
                    throw new Error('Parameter bb in draw() method must be set when mode=-1');
                }
                break;
        }
        return retbitmap;
    }
    __draw_user_specified(fbb) {
        const bbxoff = this.meta['bbxoff'];
        const bbyoff = this.meta['bbyoff'];
        const [fbbx, fbby, fbbxoff, fbbyoff] = fbb;
        const bitmap = this.__draw_bb();
        return bitmap.crop(fbbx, fbby, -bbxoff + fbbxoff, -bbyoff + fbbyoff);
    }
    __draw_original() {
        return new Bitmap(this.meta['hexdata'].map((val) => val
            ? parseInt(val, 16)
                .toString(2)
                .padStart(val.length * 4, '0')
            : ''));
    }
    __draw_bb() {
        const bbw = this.meta['bbw'];
        const bbh = this.meta['bbh'];
        const bitmap = this.__draw_original();
        const bindata = bitmap.bindata;
        const l = bindata.length;
        if (l !== bbh) {
            console.warn(`Glyph "${this.meta['glyphname'].toString()}" (codepoint ${this.meta['codepoint'].toString()})'s bbh, ${bbh.toString()}, does not match its hexdata line count, ${l.toString()}`);
        }
        bitmap.bindata = bindata.map((val) => val.slice(0, bbw));
        return bitmap;
    }
    __draw_fbb() {
        const fh = this.font.headers;
        if (fh === undefined) {
            throw new Error('Font is not loaded');
        }
        return this.__draw_user_specified([
            fh['fbbx'],
            fh['fbby'],
            fh['fbbxoff'],
            fh['fbbyoff'],
        ]);
    }
    /**
     * Get the relative position (displacement) of the origin from the left bottom corner of the bitmap drawn by the method `.draw()`, or vice versa.
     *
     * @param options.mode - Mode
     * @param options.fromorigin - From or to the origin
     * @param options.xoff - X offset
     * @param options.yoff - Y offset
     *
     * @returns The relative position (displacement) represented by `[x, y]` array / tuple (where right and top directions are positive)
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#origin}
     */
    origin(options = {}) {
        var _a, _b, _c, _d;
        const _mode = (_a = options.mode) !== null && _a !== void 0 ? _a : 0;
        const _fromorigin = (_b = options.fromorigin) !== null && _b !== void 0 ? _b : false;
        const _xoff = (_c = options.xoff) !== null && _c !== void 0 ? _c : null;
        const _yoff = (_d = options.yoff) !== null && _d !== void 0 ? _d : null;
        let ret;
        const bbxoff = this.meta['bbxoff'];
        const bbyoff = this.meta['bbyoff'];
        switch (_mode) {
            case 0:
                const fh = this.font.headers;
                if (fh === undefined) {
                    throw new Error('Font is not loaded');
                }
                ret = [fh['fbbxoff'], fh['fbbyoff']];
                break;
            case 1:
                ret = [bbxoff, bbyoff];
                break;
            case 2:
                ret = [bbxoff, bbyoff];
                break;
            case -1:
                if (_xoff !== null && _yoff !== null) {
                    ret = [_xoff, _yoff];
                }
                else {
                    throw new Error('Parameter xoff and yoff in origin() method must be all set when mode=-1');
                }
                break;
        }
        return _fromorigin ? ret : [0 - ret[0], 0 - ret[1]];
    }
}
exports.Glyph = Glyph;
/**
 * `Bitmap` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap}
 */
class Bitmap {
    /**
     * Initialize a `Bitmap` object. Load binary bitmap data (`array` of `string`s).
     *
     * @param bin_bitmap_list - Binary bitmap data
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap}
     */
    constructor(bin_bitmap_list) {
        this.bindata = bin_bitmap_list;
    }
    /**
     * Gets a human-readable (multi-line) `string` representation of the `Bitmap` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#tostring}
     */
    toString() {
        return this.bindata
            .join('\n')
            .replace(/0/g, '.')
            .replace(/1/g, '#')
            .replace(/2/g, '&');
    }
    /**
     * Gets a programmer-readable (multi-line) `string` representation of the `Bitmap` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#repr}
     */
    repr() {
        return `Bitmap(${JSON.stringify(this.bindata, null, 2)})`;
    }
    /**
     * Get the width of the bitmap.
     *
     * @returns Width of the bitmap
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#width}
     */
    width() {
        return this.bindata[0].length;
    }
    /**
     * Get the height of the bitmap.
     *
     * @returns Height of the bitmap
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#height}
     */
    height() {
        return this.bindata.length;
    }
    /**
     * Get a deep copy / clone of the `Bitmap` object.
     *
     * @returns A deep copy of the original `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#clone}
     */
    clone() {
        return new Bitmap([...this.bindata]);
    }
    static __crop_string(s, start, length) {
        let stemp = s;
        const l = s.length;
        let left = 0;
        if (start < 0) {
            left = 0 - start;
            stemp = stemp.padStart(left + l, '0');
        }
        if (start + length > l) {
            stemp = stemp.padEnd(start + length - l + stemp.length, '0');
        }
        const newstart = start + left;
        return stemp.slice(newstart, newstart + length);
    }
    static __string_offset_concat(s1, s2, offset) {
        const _offset = offset !== null && offset !== void 0 ? offset : 0;
        if (_offset === 0) {
            return s1 + s2;
        }
        const len1 = s1.length;
        const len2 = s2.length;
        const s2start = len1 + _offset;
        const s2end = s2start + len2;
        const finalstart = Math.min(0, s2start);
        const finalend = Math.max(len1, s2end);
        const news1 = Bitmap.__crop_string(s1, finalstart, finalend - finalstart);
        const news2 = Bitmap.__crop_string(s2, finalstart - s2start, finalend - finalstart);
        return news1
            .split('')
            .map((val, i) => (parseInt(news2[i], 10) || parseInt(val, 10)).toString())
            .join('');
    }
    static __listofstr_offset_concat(list1, list2, offset) {
        const _offset = offset !== null && offset !== void 0 ? offset : 0;
        let s1, s2;
        if (_offset === 0) {
            return list1.concat(list2);
        }
        const width = list1[0].length;
        const len1 = list1.length;
        const len2 = list2.length;
        const s2start = len1 + _offset;
        const s2end = s2start + len2;
        const finalstart = Math.min(0, s2start);
        const finalend = Math.max(len1, s2end);
        const retlist = [];
        for (let i = finalstart; i < finalend; i++) {
            if (i < 0 || i >= len1) {
                s1 = '0'.repeat(width);
            }
            else {
                s1 = list1[i];
            }
            if (i < s2start || i >= s2end) {
                s2 = '0'.repeat(width);
            }
            else {
                s2 = list2[i - s2start];
            }
            retlist.push(s1
                .split('')
                .map((val, i) => (parseInt(s2[i], 10) || parseInt(val, 10)).toString())
                .join(''));
        }
        return retlist;
    }
    static __crop_bitmap(bitmap, w, h, xoff, yoff) {
        let bn;
        const retlist = [];
        const l = bitmap.length;
        for (let n = 0; n < h; n++) {
            bn = l - yoff - h + n;
            if (bn < 0 || bn >= l) {
                retlist.push('0'.repeat(w));
            }
            else {
                retlist.push(Bitmap.__crop_string(bitmap[bn], xoff, w));
            }
        }
        return retlist;
    }
    /**
     * Crop and/or extend the bitmap.
     *
     * @param w - Width
     * @param h - Height
     * @param xoff - X offset
     * @param yoff - Y offset
     *
     * @returns The `Bitmap` object itself, which now has only the specified area as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#crop}
     */
    crop(w, h, xoff, yoff) {
        const _xoff = xoff !== null && xoff !== void 0 ? xoff : 0;
        const _yoff = yoff !== null && yoff !== void 0 ? yoff : 0;
        this.bindata = Bitmap.__crop_bitmap(this.bindata, w, h, _xoff, _yoff);
        return this;
    }
    /**
     * Overlay another bitmap over the current one.
     *
     * @param bitmap - The incoming bitmap to overlay over the current one
     *
     * @returns The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#overlay}
     */
    overlay(bitmap) {
        const bindata_a = this.bindata;
        const bindata_b = bitmap.bindata;
        if (bindata_a.length !== bindata_b.length) {
            console.warn('the bitmaps to overlay have different height');
        }
        if (bindata_a[0].length !== bindata_b[0].length) {
            console.warn('the bitmaps to overlay have different width');
        }
        this.bindata = bindata_a.map((val, li) => {
            const la = val;
            const lb = bindata_b[li];
            return la
                .split('')
                .map((val, i) => (parseInt(lb[i], 10) || parseInt(val, 10)).toString())
                .join('');
        });
        return this;
    }
    /**
     * Concatenate all `Bitmap` objects in an `array`.
     *
     * @param bitmaplist - List of bitmaps to concatenate
     * @param options.direction - Direction
     * @param options.align - Align
     * @param options.offsetlist - List of spacing offsets between every two glyphs
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#bitmapconcatall}
     */
    static concatall(bitmaplist, options = {}) {
        var _a, _b, _c;
        const _direction = (_a = options.direction) !== null && _a !== void 0 ? _a : 1;
        const _align = (_b = options.align) !== null && _b !== void 0 ? _b : 1;
        const _offsetlist = (_c = options.offsetlist) !== null && _c !== void 0 ? _c : null;
        let bd, ireal, maxsize, offset, ret, w, xoff;
        if (_direction > 0) {
            maxsize = Math.max(...bitmaplist.map((val) => val.height()));
            ret = Array(maxsize).fill('');
            const stroffconcat = (s1, s2, offset) => {
                if (_direction === 1) {
                    return Bitmap.__string_offset_concat(s1, s2, offset);
                }
                else {
                    // if (_direction === 2)
                    return Bitmap.__string_offset_concat(s2, s1, offset);
                }
            };
            for (let i = 0; i < maxsize; i++) {
                if (_align) {
                    ireal = -i - 1;
                }
                else {
                    ireal = i;
                }
                offset = 0;
                const bl = bitmaplist.length;
                for (let bi = 0; bi < bl; bi++) {
                    const bitmap = bitmaplist[bi];
                    if (_offsetlist && bi !== 0) {
                        offset = _offsetlist[bi - 1];
                    }
                    if (i < bitmap.height()) {
                        if (ireal >= 0) {
                            ret[ireal] = stroffconcat(ret[ireal], bitmap.bindata[ireal], offset);
                        }
                        else {
                            ret[maxsize + ireal] = stroffconcat(ret[maxsize + ireal], bitmap.bindata[bitmap.height() + ireal], offset);
                        }
                    }
                    else {
                        if (ireal >= 0) {
                            ret[ireal] = stroffconcat(ret[ireal], '0'.repeat(bitmap.width()), offset);
                        }
                        else {
                            ret[maxsize + ireal] = stroffconcat(ret[maxsize + ireal], '0'.repeat(bitmap.width()), offset);
                        }
                    }
                }
            }
        }
        else {
            maxsize = Math.max(...bitmaplist.map((val) => val.width()));
            ret = [];
            offset = 0;
            const bl = bitmaplist.length;
            for (let bi = 0; bi < bl; bi++) {
                const bitmap = bitmaplist[bi];
                if (_offsetlist && bi !== 0) {
                    offset = _offsetlist[bi - 1];
                }
                bd = bitmap.bindata;
                w = bitmap.width();
                if (w !== maxsize) {
                    if (_align) {
                        xoff = 0;
                    }
                    else {
                        xoff = w - maxsize;
                    }
                    bd = this.__crop_bitmap(bd, maxsize, bitmap.height(), xoff, 0);
                }
                if (_direction === 0) {
                    ret = Bitmap.__listofstr_offset_concat(ret, bd, offset);
                }
                else {
                    // if (_direction === -1)
                    ret = Bitmap.__listofstr_offset_concat(bd, ret, offset);
                }
            }
        }
        return new this(ret);
    }
    /**
     * Concatenate another `Bitmap` objects to the current one.
     *
     * @param bitmap - Bitmap to concatenate
     * @param options.direction - Direction
     * @param options.align - Align
     * @param options.offset - Spacing offset between the glyphs
     *
     * @returns The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#concat}
     */
    concat(bitmap, options = {}) {
        const { direction, align, offset } = options;
        const _offset = offset !== null && offset !== void 0 ? offset : 0;
        this.bindata = Bitmap.concatall([this, bitmap], {
            direction,
            align,
            offsetlist: [_offset],
        }).bindata;
        return this;
    }
    static __enlarge_bindata(bindata, x, y) {
        const _x = x !== null && x !== void 0 ? x : 1;
        const _y = y !== null && y !== void 0 ? y : 1;
        let ret = [...bindata];
        if (_x > 1) {
            ret = ret.map((v) => v
                .split('')
                .reduce((acc, cur) => {
                return acc.concat(Array(_x).fill(cur));
            }, [])
                .join(''));
        }
        if (_y > 1) {
            ret = ret.reduce((acc, cur) => {
                return acc.concat(Array(_y).fill(cur));
            }, []);
        }
        return ret;
    }
    /**
     * Enlarge a `Bitmap` object, by multiplying every pixel in x (right) direction and in y (top) direction.
     *
     * @param x - Multiplier in x (right) direction
     * @param y - Multiplier in y (top) direction
     *
     * @returns The `Bitmap` object itself, which now has the enlarged bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#enlarge}
     */
    enlarge(x, y) {
        this.bindata = Bitmap.__enlarge_bindata(this.bindata, x, y);
        return this;
    }
    /**
     * Replace a string by another in the bitmap.
     *
     * @param substr - Substring to be replaced
     * @param newsubstr - New substring as the replacement
     *
     * @returns The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#replace}
     */
    replace(substr, newsubstr) {
        const _substr = typeof substr === 'number' ? substr.toString() : substr;
        const _newsubstr = typeof newsubstr === 'number' ? newsubstr.toString() : newsubstr;
        const replaceAll = (str, substr, newsubstr) => {
            if ('replaceAll' in String.prototype) {
                return str.replaceAll(substr, newsubstr);
            }
            else {
                const escapeRegExp = (s) => s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
                return str.replace(new RegExp(escapeRegExp(substr), 'g'), newsubstr);
            }
        };
        this.bindata = this.bindata.map((val) => replaceAll(val, _substr, _newsubstr));
        return this;
    }
    /**
     * Add shadow to the shape in the bitmap.
     *
     * The shadow will be filled by `'2'`s.
     *
     * @param xoff - Shadow's offset in x (right) direction
     * @param yoff - Shadow's offset in y (top) direction
     *
     * @returns The `Bitmap` object itself, which now has a bitmap of the original shape with its shadow as the `Bitmap` object's `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#shadow}
     */
    shadow(xoff, yoff) {
        const _xoff = xoff !== null && xoff !== void 0 ? xoff : 1;
        const _yoff = yoff !== null && yoff !== void 0 ? yoff : -1;
        let h, resized_xoff, resized_yoff, shadow_xoff, shadow_yoff, w;
        const bitmap_shadow = this.clone();
        w = this.width();
        h = this.height();
        w += Math.abs(_xoff);
        h += Math.abs(_yoff);
        bitmap_shadow.bindata = bitmap_shadow.bindata.map((val) => val.replace(/1/g, '2'));
        if (_xoff > 0) {
            resized_xoff = 0;
            shadow_xoff = -_xoff;
        }
        else {
            resized_xoff = _xoff;
            shadow_xoff = 0;
        }
        if (_yoff > 0) {
            resized_yoff = 0;
            shadow_yoff = -_yoff;
        }
        else {
            resized_yoff = _yoff;
            shadow_yoff = 0;
        }
        this.crop(w, h, resized_xoff, resized_yoff);
        bitmap_shadow.crop(w, h, shadow_xoff, shadow_yoff);
        bitmap_shadow.overlay(this);
        this.bindata = bitmap_shadow.bindata;
        return this;
    }
    /**
     * Add glow effect to the shape in the bitmap.
     *
     * The glowing area is one pixel up, right, bottom and left to the original pixels (corners will not be filled in default mode 0 but will in mode 1), and will be filled by `'2'`s.
     *
     * @param mode - Mode
     *
     * @returns The `Bitmap` object itself, which now has a bitmap of the original shape with glow effect as the `Bitmap` object's `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#glow}
     */
    glow(mode) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const _mode = mode !== null && mode !== void 0 ? mode : 0;
        let line, pixel, w, h;
        w = this.width();
        h = this.height();
        w += 2;
        h += 2;
        this.crop(w, h, -1, -1);
        const b = this.todata(2);
        const bl = b.length;
        for (let i_line = 0; i_line < bl; i_line++) {
            line = b[i_line];
            const ll = line.length;
            for (let i_pixel = 0; i_pixel < ll; i_pixel++) {
                pixel = line[i_pixel];
                if (pixel === 1) {
                    (_a = b[i_line])[_b = i_pixel - 1] || (_a[_b] = 2);
                    (_c = b[i_line])[_d = i_pixel + 1] || (_c[_d] = 2);
                    (_e = b[i_line - 1])[i_pixel] || (_e[i_pixel] = 2);
                    (_f = b[i_line + 1])[i_pixel] || (_f[i_pixel] = 2);
                    if (_mode === 1) {
                        (_g = b[i_line - 1])[_h = i_pixel - 1] || (_g[_h] = 2);
                        (_j = b[i_line - 1])[_k = i_pixel + 1] || (_j[_k] = 2);
                        (_l = b[i_line + 1])[_m = i_pixel - 1] || (_l[_m] = 2);
                        (_o = b[i_line + 1])[_p = i_pixel + 1] || (_o[_p] = 2);
                    }
                }
            }
        }
        this.bindata = b.map((l) => l.map((val) => val.toString()).join(''));
        return this;
    }
    /**
     * Pad each line (row) to multiple of 8 (or other numbers) bits/pixels, with `'0'`s.
     *
     * Do this before using the bitmap for a glyph in a BDF font.
     *
     * @param bits - Each line should be padded to multiple of how many bits/pixels
     *
     * @returns The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#bytepad}
     */
    bytepad(bits) {
        const _bits = bits !== null && bits !== void 0 ? bits : 8;
        const w = this.width();
        const h = this.height();
        const mod = w % _bits;
        if (mod === 0) {
            return this;
        }
        return this.crop(w + _bits - mod, h);
    }
    /**
     * Get the bitmap's data in the specified type and format.
     *
     * @param datatype - Output data type
     *
     * @returns Bitmap data in the specified type (list or string) and format
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#todata}
     */
    todata(datatype) {
        const _datatype = datatype !== null && datatype !== void 0 ? datatype : 1;
        let ret;
        switch (_datatype) {
            case 0:
                ret = this.bindata.join('\n');
                break;
            case 1:
                ret = this.bindata;
                break;
            case 2:
                ret = this.bindata.map((l) => l.split('').map((s) => parseInt(s, 10)));
                break;
            case 3:
                ret = [].concat(...this.todata(2));
                break;
            case 4:
                // if there are '2's, it will throw error
                ret = this.bindata.map((s) => {
                    if (!/^[01]+$/.test(s)) {
                        throw new Error(`Invalid binary string: ${s}`);
                    }
                    return parseInt(s, 2)
                        .toString(16)
                        .padStart(Math.floor((-1 * this.width()) / 4) * -1, '0');
                });
                break;
            case 5:
                // if there are '2's, it will throw error
                ret = this.bindata.map((s) => {
                    if (!/^[01]+$/.test(s)) {
                        throw new Error(`Invalid binary string: ${s}`);
                    }
                    return parseInt(s, 2);
                });
                break;
        }
        return ret;
    }
    /**
     * Draw the bitmap to HTML canvas
     *
     * @param context - Canvas 2D context (`canvas.getContext("2d")`)
     * @param pixelcolors - Object mapping `'0'`/`'1'`/`'2'` in the bitmap data to color
     *
     * @returns The `Bitmap` object itself
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#draw2canvas}
     */
    draw2canvas(context, pixelcolors) {
        const _pixelcolors = pixelcolors !== null && pixelcolors !== void 0 ? pixelcolors : {
            '0': null,
            '1': 'black',
            '2': 'red',
        };
        this.todata(2).forEach((line, y) => {
            line.forEach((pixel, x) => {
                const s = pixel.toString();
                if (s === '0' || s === '1' || s === '2') {
                    const color = _pixelcolors[s];
                    if (color !== null && color !== undefined) {
                        context.fillStyle = color;
                        context.fillRect(x, y, 1, 1);
                    }
                }
            });
        });
        return this;
    }
}
exports.Bitmap = Bitmap;
/**
 * Shortcut for `new Font().load_filelines(filelines)` so you don't need to write `new` and `.load_filelines`
 *
 * @param filelines - Asynchronous iterator containing each line in string text from the font file
 *
 * @returns The newly instantiated `Font` object that's loaded the font file
 */
const $Font = (filelines) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Font().load_filelines(filelines);
});
exports.$Font = $Font;
/**
 * Shortcut for `new Glyph(meta_obj, font)` so you don't need to write `new`
 *
 * @param meta_obj - Meta information
 * @param font - The font the glyph belongs to
 *
 * @returns The newly instantiated `Glyph` object
 */
const $Glyph = (meta_obj, font) => {
    return new Glyph(meta_obj, font);
};
exports.$Glyph = $Glyph;
/**
 * Shortcut for `new Bitmap(bin_bitmap_list)` so you don't need to write `new`
 *
 * @param bin_bitmap_list - Binary bitmap data
 *
 * @returns The newly instantiated `Bitmap` object
 */
const $Bitmap = (bin_bitmap_list) => {
    return new Bitmap(bin_bitmap_list);
};
exports.$Bitmap = $Bitmap;
