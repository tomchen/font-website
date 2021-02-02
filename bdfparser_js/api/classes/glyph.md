---
id: "glyph"
title: "Class: Glyph"
sidebar_label: "Glyph"
custom_edit_url: null
hide_title: true
---

# Class: Glyph

`Glyph` object

**`see`** [http://localhost:3000/bdfparser_js/glyph#glyph](http://localhost:3000/bdfparser_js/glyph#glyph)

## Hierarchy

* **Glyph**

## Constructors

### constructor

\+ **new Glyph**(`meta_obj`: [*GlyphMeta*](../types/glyphmeta.md), `font`: [*Font*](font.md)): [*Glyph*](glyph.md)

`Glyph` object constructor

**`see`** [http://localhost:3000/bdfparser_js/glyph#glyph](http://localhost:3000/bdfparser_js/glyph#glyph)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`meta_obj` | [*GlyphMeta*](../types/glyphmeta.md) | Meta information   |
`font` | [*Font*](font.md) | The font the glyph belongs to    |

**Returns:** [*Glyph*](glyph.md)

Defined in: bdfparser.ts:970

## Properties

### font

• **font**: [*Font*](font.md)

Defined in: bdfparser.ts:970

___

### meta

• **meta**: [*GlyphMeta*](../types/glyphmeta.md)

Defined in: bdfparser.ts:969

## Methods

### \_\_draw\_bb

▸ `Private`**__draw_bb**(): [*Bitmap*](bitmap.md)

**Returns:** [*Bitmap*](bitmap.md)

Defined in: bdfparser.ts:1095

___

### \_\_draw\_fbb

▸ `Private`**__draw_fbb**(): [*Bitmap*](bitmap.md)

**Returns:** [*Bitmap*](bitmap.md)

Defined in: bdfparser.ts:1112

___

### \_\_draw\_original

▸ `Private`**__draw_original**(): [*Bitmap*](bitmap.md)

**Returns:** [*Bitmap*](bitmap.md)

Defined in: bdfparser.ts:1083

___

### \_\_draw\_user\_specified

▸ `Private`**__draw_user_specified**(`fbb`: [*number*, *number*, *number*, *number*]): [*Bitmap*](bitmap.md)

#### Parameters:

Name | Type |
------ | ------ |
`fbb` | [*number*, *number*, *number*, *number*] |

**Returns:** [*Bitmap*](bitmap.md)

Defined in: bdfparser.ts:1075

___

### chr

▸ **chr**(): *string*

Get the character of the glyph.

**`see`** [http://localhost:3000/bdfparser_js/glyph#chr](http://localhost:3000/bdfparser_js/glyph#chr)

**Returns:** *string*

Character (one character string) of the glyph

Defined in: bdfparser.ts:1031

___

### cp

▸ **cp**(): *number*

Get the codepoint of the glyph.

**`see`** [http://localhost:3000/bdfparser_js/glyph#cp](http://localhost:3000/bdfparser_js/glyph#cp)

**Returns:** *number*

Codepoint of the glyph

Defined in: bdfparser.ts:1020

___

### draw

▸ **draw**(`mode?`: *null* \| *0* \| *1* \| *-1* \| *2*, `bb?`: *null* \| [*number*, *number*, *number*, *number*]): [*Bitmap*](bitmap.md)

Draw the glyph to a `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/glyph#draw](http://localhost:3000/bdfparser_js/glyph#draw)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mode?` | *null* \| *0* \| *1* \| *-1* \| *2* | Mode   |
`bb?` | *null* \| [*number*, *number*, *number*, *number*] | Bounding box    |

**Returns:** [*Bitmap*](bitmap.md)

`Bitmap` object

Defined in: bdfparser.ts:1045

___

### origin

▸ **origin**(`mode?`: *null* \| *0* \| *1* \| *-1* \| *2*, `fromorigin?`: *null* \| *boolean*, `xoff?`: *null* \| *number*, `yoff?`: *null* \| *number*): [*number*, *number*]

Get the relative position (displacement) of the origin from the left bottom corner of the bitmap drawn by the method `.draw()`, or vice versa.

**`see`** [http://localhost:3000/bdfparser_js/glyph#origin](http://localhost:3000/bdfparser_js/glyph#origin)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mode?` | *null* \| *0* \| *1* \| *-1* \| *2* | Mode   |
`fromorigin?` | *null* \| *boolean* | From or to the origin   |
`xoff?` | *null* \| *number* | X offset   |
`yoff?` | *null* \| *number* | Y offset    |

**Returns:** [*number*, *number*]

The relative position (displacement) represented by `[x, y]` array / tuple (where right and top directions are positive)

Defined in: bdfparser.ts:1137

___

### repr

▸ **repr**(): *string*

Gets a programmer-readable `string` representation of the `Glyph` object.

**`see`** [http://localhost:3000/bdfparser_js/glyph#repr](http://localhost:3000/bdfparser_js/glyph#repr)

**Returns:** *string*

String representation

Defined in: bdfparser.ts:1003

___

### toString

▸ **toString**(): *string*

Gets a human-readable (multi-line) `string` representation of the `Glyph` object.

**`see`** [http://localhost:3000/bdfparser_js/glyph#tostring](http://localhost:3000/bdfparser_js/glyph#tostring)

**Returns:** *string*

String representation

Defined in: bdfparser.ts:992
