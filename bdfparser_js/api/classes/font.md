---
id: "font"
title: "Class: Font"
sidebar_label: "Font"
custom_edit_url: null
hide_title: true
---

# Class: Font

`Font` object

**`see`** [http://localhost:3000/bdfparser_js/font](http://localhost:3000/bdfparser_js/font)

## Hierarchy

* **Font**

## Constructors

### constructor

\+ **new Font**(): [*Font*](font.md)

**Returns:** [*Font*](font.md)

## Properties

### \_\_curline\_chars

• `Private` **\_\_curline\_chars**: *null* \| *string*= null

Defined in: bdfparser.ts:196

___

### \_\_curline\_startchar

• `Private` **\_\_curline\_startchar**: *null* \| *string*= null

Defined in: bdfparser.ts:195

___

### \_\_f

• `Private` `Optional` **\_\_f**: *undefined* \| *AsyncIterableIterator*<*string*\>

Defined in: bdfparser.ts:197

___

### \_\_glyph\_count\_to\_check

• `Private` **\_\_glyph\_count\_to\_check**: *null* \| *number*= null

Defined in: bdfparser.ts:194

___

### \_\_headers

• `Private` **\_\_headers**: *Partial*<[*Headers*](../types/headers.md)\>

Defined in: bdfparser.ts:191

___

### glyphs

• **glyphs**: *Map*<*number*, [*GlyphMetaInFont*](../types/glyphmetainfont.md)\>

Defined in: bdfparser.ts:193

___

### headers

• **headers**: *undefined* \| [*Headers*](../types/headers.md)

Defined in: bdfparser.ts:190

___

### props

• **props**: [*Props*](../types/props.md)

Defined in: bdfparser.ts:192

## Accessors

### length

• **length**(): *number*

Same as `.length()`
Returns how many glyphs actually exist in the font.

**`see`** [http://localhost:3000/bdfparser_js/font#length](http://localhost:3000/bdfparser_js/font#length)

**Returns:** *number*

Actual glyph count in the font

Defined in: bdfparser.ts:529

## Methods

### \_\_parse\_glyph\_count

▸ `Private`**__parse_glyph_count**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: bdfparser.ts:378

___

### \_\_parse\_headers

▸ `Private`**__parse_headers**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: bdfparser.ts:228

___

### \_\_parse\_headers\_after

▸ `Private`**__parse_headers_after**(): *void*

**Returns:** *void*

Defined in: bdfparser.ts:332

___

### \_\_parse\_props

▸ `Private`**__parse_props**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: bdfparser.ts:339

___

### \_\_prepare\_glyphs

▸ `Private`**__prepare_glyphs**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: bdfparser.ts:400

___

### \_\_prepare\_glyphs\_after

▸ `Private`**__prepare_glyphs_after**(): *void*

**Returns:** *void*

Defined in: bdfparser.ts:508

___

### draw

▸ **draw**(`str`: *string*, `options?`: { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `missing?`: *undefined* \| *null* \| [*Glyph*](glyph.md) \| [*GlyphMeta*](../types/glyphmeta.md) ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  }): [*Bitmap*](bitmap.md)

Draw (render) the glyphs of the specified words / setences / paragraphs (as a `string`), to a `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/font#draw](http://localhost:3000/bdfparser_js/font#draw)

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`str` | *string* | - | String to draw   |
`options` | { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `missing?`: *undefined* \| *null* \| [*Glyph*](glyph.md) \| [*GlyphMeta*](../types/glyphmeta.md) ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  } | ... | - |

**Returns:** [*Bitmap*](bitmap.md)

`Bitmap` object

Defined in: bdfparser.ts:885

___

### drawall

▸ **drawall**(`options?`: { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `order?`: *undefined* \| *0* \| *1* \| *-1* \| *2* ; `r?`: *undefined* \| *number* \| [*number*, *number*] \| [*number*, *number*][] ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  }): [*Bitmap*](bitmap.md)

Draw all the glyphs in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default), to a `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/font#drawall](http://localhost:3000/bdfparser_js/font#drawall)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`options` | { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `order?`: *undefined* \| *0* \| *1* \| *-1* \| *2* ; `r?`: *undefined* \| *number* \| [*number*, *number*] \| [*number*, *number*][] ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  } | ... |

**Returns:** [*Bitmap*](bitmap.md)

`Bitmap` object

Defined in: bdfparser.ts:935

___

### drawcps

▸ **drawcps**(`cps`: *number*[], `options?`: { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `missing?`: *undefined* \| *null* \| [*Glyph*](glyph.md) \| [*GlyphMeta*](../types/glyphmeta.md) ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  }): [*Bitmap*](bitmap.md)

Draw the glyphs of the specified codepoints, to a `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/font#drawcps](http://localhost:3000/bdfparser_js/font#drawcps)

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`cps` | *number*[] | - | Array of codepoints to draw   |
`options` | { `direction?`: *undefined* \| *null* \| *lrtb* \| *rltb* \| *tbrl* \| *btrl* \| *lr* \| *rl* \| *tb* \| *bt* \| *lrbt* \| *rlbt* \| *tblr* \| *btlr* ; `linelimit?`: *undefined* \| *null* \| *number* ; `missing?`: *undefined* \| *null* \| [*Glyph*](glyph.md) \| [*GlyphMeta*](../types/glyphmeta.md) ; `mode?`: *undefined* \| *null* \| *0* \| *1* ; `usecurrentglyphspacing?`: *undefined* \| *null* \| *boolean*  } | ... | - |

**Returns:** [*Bitmap*](bitmap.md)

`Bitmap` object

Defined in: bdfparser.ts:690

___

### glyph

▸ **glyph**(`character`: *string*): *null* \| [*Glyph*](glyph.md)

Get a glyph (as `Glyph` object) by its character.

**`see`** [http://localhost:3000/bdfparser_js/font#glyph](http://localhost:3000/bdfparser_js/font#glyph)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`character` | *string* | Character    |

**Returns:** *null* \| [*Glyph*](glyph.md)

`Glyph` object, or `null` if the glyph does not exist in the font

Defined in: bdfparser.ts:649

___

### glyphbycp

▸ **glyphbycp**(`codepoint`: *number*): *null* \| [*Glyph*](glyph.md)

Get a glyph (as Glyph Object) by its codepoint.

**`see`** [http://localhost:3000/bdfparser_js/font#glyphbycp](http://localhost:3000/bdfparser_js/font#glyphbycp)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`codepoint` | *number* | Codepoint    |

**Returns:** *null* \| [*Glyph*](glyph.md)

`Glyph` object, or `null` if the glyph does not exist in the font

Defined in: bdfparser.ts:621

___

### itercps

▸ **itercps**(`order?`: *null* \| *0* \| *1* \| *-1* \| *2*, `r?`: *null* \| *number* \| [*number*, *number*] \| [*number*, *number*][]): *number*[]

Similar to `.iterglyphs()`, except it returns an `array` of glyph codepoints instead of an `iterator` of `Glyph` objects.

**`see`** [http://localhost:3000/bdfparser_js/font#itercps](http://localhost:3000/bdfparser_js/font#itercps)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`order?` | *null* \| *0* \| *1* \| *-1* \| *2* | Order   |
`r?` | *null* \| *number* \| [*number*, *number*] \| [*number*, *number*][] | Codepoint range    |

**Returns:** *number*[]

An iterator of the codepoints of glyphs

Defined in: bdfparser.ts:543

___

### iterglyphs

▸ **iterglyphs**(`order?`: *null* \| *0* \| *1* \| *-1* \| *2*, `r?`: *null* \| *number* \| [*number*, *number*] \| [*number*, *number*][]): *IterableIterator*<*null* \| [*Glyph*](glyph.md)\>

Returns an iterator of all the glyphs (as `Glyph` objects) in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default).

**`see`** [http://localhost:3000/bdfparser_js/font#iterglyphs](http://localhost:3000/bdfparser_js/font#iterglyphs)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`order?` | *null* \| *0* \| *1* \| *-1* \| *2* | Order   |
`r?` | *null* \| *number* \| [*number*, *number*] \| [*number*, *number*][] | Codepoint range    |

**Returns:** *IterableIterator*<*null* \| [*Glyph*](glyph.md)\>

An iterator of glyphs as `Glyph` objects. Missing glyphs are replaced by `null`

Defined in: bdfparser.ts:603

___

### lacksglyphs

▸ **lacksglyphs**(`str`: *string*): *null* \| *string*[]

Check if there is any missing glyph and gets these glyphs' character.

**`see`** [http://localhost:3000/bdfparser_js/font#lacksglyphs](http://localhost:3000/bdfparser_js/font#lacksglyphs)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`str` | *string* | string to check    |

**Returns:** *null* \| *string*[]

List of missing glyph(s)' characters, or `null` if all the glyphs in your string exist in the font

Defined in: bdfparser.ts:663

___

### load\_filelines

▸ **load_filelines**(`filelines`: *AsyncIterableIterator*<*string*\>): *Promise*<[*Font*](font.md)\>

Load the BDF font file (file line async iterator).

**`see`** [http://localhost:3000/bdfparser_js/load_filelines](http://localhost:3000/bdfparser_js/load_filelines)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filelines` | *AsyncIterableIterator*<*string*\> | Asynchronous iterable iterator representing each line in string text from the font file    |

**Returns:** *Promise*<[*Font*](font.md)\>

The current `Font` object

Defined in: bdfparser.ts:208