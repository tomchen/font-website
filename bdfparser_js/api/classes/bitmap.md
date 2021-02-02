---
id: "bitmap"
title: "Class: Bitmap"
sidebar_label: "Bitmap"
custom_edit_url: null
hide_title: true
---

# Class: Bitmap

`Bitmap` object

**`see`** [http://localhost:3000/bdfparser_js/bitmap](http://localhost:3000/bdfparser_js/bitmap)

## Hierarchy

* **Bitmap**

## Constructors

### constructor

\+ **new Bitmap**(`bin_bitmap_list`: *string*[]): [*Bitmap*](bitmap.md)

Initialize a `Bitmap` object. Load binary bitmap data (`array` of `string`s).

**`see`** [http://localhost:3000/bdfparser_js/bitmap#bitmap](http://localhost:3000/bdfparser_js/bitmap#bitmap)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bin_bitmap_list` | *string*[] | Binary bitmap data    |

**Returns:** [*Bitmap*](bitmap.md)

Defined in: bdfparser.ts:1184

## Properties

### bindata

• **bindata**: *string*[]

Defined in: bdfparser.ts:1184

## Methods

### bytepad

▸ **bytepad**(`bits?`: *null* \| *number*): [*Bitmap*](bitmap.md)

Pad each line (row) to multiple of 8 (or other numbers) bits/pixels, with `'0'`s.

Do this before using the bitmap for a glyph in a BDF font.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#bytepad](http://localhost:3000/bdfparser_js/bitmap#bytepad)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bits?` | *null* \| *number* | Each line should be padded to multiple of how many bits/pixels    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`

Defined in: bdfparser.ts:1730

___

### clone

▸ **clone**(): [*Bitmap*](bitmap.md)

Get a deep copy / clone of the `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#clone](http://localhost:3000/bdfparser_js/bitmap#clone)

**Returns:** [*Bitmap*](bitmap.md)

A deep copy of the original `Bitmap` object

Defined in: bdfparser.ts:1252

___

### concat

▸ **concat**(`bitmap`: [*Bitmap*](bitmap.md), `options?`: { `align?`: *undefined* \| *null* \| *0* \| *1* ; `direction?`: *undefined* \| *null* \| *0* \| *1* \| *-1* \| *2* ; `offset?`: *undefined* \| *null* \| *number*  }): [*Bitmap*](bitmap.md)

Concatenate another `Bitmap` objects to the current one.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#concat](http://localhost:3000/bdfparser_js/bitmap#concat)

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bitmap` | [*Bitmap*](bitmap.md) | - | Bitmap to concatenate   |
`options` | { `align?`: *undefined* \| *null* \| *0* \| *1* ; `direction?`: *undefined* \| *null* \| *0* \| *1* \| *-1* \| *2* ; `offset?`: *undefined* \| *null* \| *number*  } | ... | - |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`

Defined in: bdfparser.ts:1534

___

### crop

▸ **crop**(`w`: *number*, `h`: *number*, `xoff?`: *null* \| *number*, `yoff?`: *null* \| *number*): [*Bitmap*](bitmap.md)

Crop and/or extend the bitmap.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#crop](http://localhost:3000/bdfparser_js/bitmap#crop)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`w` | *number* | Width   |
`h` | *number* | Height   |
`xoff?` | *null* \| *number* | X offset   |
`yoff?` | *null* \| *number* | Y offset    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has only the specified area as its `.bindata`

Defined in: bdfparser.ts:1376

___

### draw2canvas

▸ **draw2canvas**(`context`: CanvasContext, `pixelcolors?`: *null* \| *Record*<*0* \| *1* \| *2*, *null* \| *string*\>): [*Bitmap*](bitmap.md)

Draw the bitmap to HTML canvas

**`see`** [http://localhost:3000/bdfparser_js/bitmap#draw2canvas](http://localhost:3000/bdfparser_js/bitmap#draw2canvas)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`context` | CanvasContext | Canvas 2D context (`canvas.getContext("2d")`)   |
`pixelcolors?` | *null* \| *Record*<*0* \| *1* \| *2*, *null* \| *string*\> | Object mapping `'0'`/`'1'`/`'2'` in the bitmap data to color    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself

Defined in: bdfparser.ts:1802

___

### enlarge

▸ **enlarge**(`x?`: *number*, `y?`: *number*): [*Bitmap*](bitmap.md)

Enlarge a `Bitmap` object, by multiplying every pixel in x (right) direction and in y (top) direction.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#enlarge](http://localhost:3000/bdfparser_js/bitmap#enlarge)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x?` | *number* | Multiplier in x (right) direction   |
`y?` | *number* | Multiplier in y (top) direction    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has the enlarged bitmap as its `.bindata`

Defined in: bdfparser.ts:1589

___

### glow

▸ **glow**(`mode?`: *null* \| *0* \| *1*): [*Bitmap*](bitmap.md)

Add glow effect to the shape in the bitmap.

The glowing area is one pixel up, right, bottom and left to the original pixels (corners will not be filled in default mode 0 but will in mode 1), and will be filled by `'2'`s.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#glow](http://localhost:3000/bdfparser_js/bitmap#glow)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mode?` | *null* \| *0* \| *1* | Mode    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has a bitmap of the original shape with glow effect as the `Bitmap` object's `.bindata`

Defined in: bdfparser.ts:1686

___

### height

▸ **height**(): *number*

Get the height of the bitmap.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#height](http://localhost:3000/bdfparser_js/bitmap#height)

**Returns:** *number*

Height of the bitmap

Defined in: bdfparser.ts:1241

___

### overlay

▸ **overlay**(`bitmap`: [*Bitmap*](bitmap.md)): [*Bitmap*](bitmap.md)

Overlay another bitmap over the current one.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#overlay](http://localhost:3000/bdfparser_js/bitmap#overlay)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bitmap` | [*Bitmap*](bitmap.md) | The incoming bitmap to overlay over the current one    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`

Defined in: bdfparser.ts:1392

___

### replace

▸ **replace**(`substr`: *string* \| *number*, `newsubstr`: *string* \| *number*): [*Bitmap*](bitmap.md)

Replace a string by another in the bitmap.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#replace](http://localhost:3000/bdfparser_js/bitmap#replace)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`substr` | *string* \| *number* | Substring to be replaced   |
`newsubstr` | *string* \| *number* | New substring as the replacement    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`

Defined in: bdfparser.ts:1604

___

### repr

▸ **repr**(): *string*

Gets a programmer-readable (multi-line) `string` representation of the `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#repr](http://localhost:3000/bdfparser_js/bitmap#repr)

**Returns:** *string*

String representation

Defined in: bdfparser.ts:1219

___

### shadow

▸ **shadow**(`xoff?`: *null* \| *number*, `yoff?`: *null* \| *number*): [*Bitmap*](bitmap.md)

Add shadow to the shape in the bitmap.

The shadow will be filled by `'2'`s.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#shadow](http://localhost:3000/bdfparser_js/bitmap#shadow)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`xoff?` | *null* \| *number* | Shadow's offset in x (right) direction   |
`yoff?` | *null* \| *number* | Shadow's offset in y (top) direction    |

**Returns:** [*Bitmap*](bitmap.md)

The `Bitmap` object itself, which now has a bitmap of the original shape with its shadow as the `Bitmap` object's `.bindata`

Defined in: bdfparser.ts:1642

___

### toString

▸ **toString**(): *string*

Gets a human-readable (multi-line) `string` representation of the `Bitmap` object.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#tostring](http://localhost:3000/bdfparser_js/bitmap#tostring)

**Returns:** *string*

String representation

Defined in: bdfparser.ts:1204

___

### todata

▸ **todata**<T\>(`datatype?`: T): [*TodataFuncRetType*](../types/todatafuncrettype.md)<T\>

Get the bitmap's data in the specified type and format.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#todata](http://localhost:3000/bdfparser_js/bitmap#todata)

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *null* \| *0* \| *1* \| *2* \| *4* \| *3* \| *5* |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`datatype?` | T | Output data type    |

**Returns:** [*TodataFuncRetType*](../types/todatafuncrettype.md)<T\>

Bitmap data in the specified type (list or string) and format

Defined in: bdfparser.ts:1750

___

### width

▸ **width**(): *number*

Get the width of the bitmap.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#width](http://localhost:3000/bdfparser_js/bitmap#width)

**Returns:** *number*

Width of the bitmap

Defined in: bdfparser.ts:1230

___

### \_\_crop\_bitmap

▸ `Private` `Static`**__crop_bitmap**(`bitmap`: *string*[], `w`: *number*, `h`: *number*, `xoff`: *number*, `yoff`: *number*): *string*[]

#### Parameters:

Name | Type |
------ | ------ |
`bitmap` | *string*[] |
`w` | *number* |
`h` | *number* |
`xoff` | *number* |
`yoff` | *number* |

**Returns:** *string*[]

Defined in: bdfparser.ts:1343

___

### \_\_crop\_string

▸ `Private` `Static`**__crop_string**(`s`: *string*, `start`: *number*, `length`: *number*): *string*

#### Parameters:

Name | Type |
------ | ------ |
`s` | *string* |
`start` | *number* |
`length` | *number* |

**Returns:** *string*

Defined in: bdfparser.ts:1256

___

### \_\_enlarge\_bindata

▸ `Private` `Static`**__enlarge_bindata**(`bindata`: *string*[], `x?`: *null* \| *number*, `y?`: *null* \| *number*): *string*[]

#### Parameters:

Name | Type |
------ | ------ |
`bindata` | *string*[] |
`x?` | *null* \| *number* |
`y?` | *null* \| *number* |

**Returns:** *string*[]

Defined in: bdfparser.ts:1552

___

### \_\_listofstr\_offset\_concat

▸ `Private` `Static`**__listofstr_offset_concat**(`list1`: *string*[], `list2`: *string*[], `offset?`: *null* \| *number*): *string*[]

#### Parameters:

Name | Type |
------ | ------ |
`list1` | *string*[] |
`list2` | *string*[] |
`offset?` | *null* \| *number* |

**Returns:** *string*[]

Defined in: bdfparser.ts:1302

___

### \_\_string\_offset\_concat

▸ `Private` `Static`**__string_offset_concat**(`s1`: *string*, `s2`: *string*, `offset?`: *null* \| *number*): *string*

#### Parameters:

Name | Type |
------ | ------ |
`s1` | *string* |
`s2` | *string* |
`offset?` | *null* \| *number* |

**Returns:** *string*

Defined in: bdfparser.ts:1275

___

### concatall

▸ `Static`**concatall**(`bitmaplist`: [*Bitmap*](bitmap.md)[], `options?`: { `align?`: *undefined* \| *null* \| *0* \| *1* ; `direction?`: *undefined* \| *null* \| *0* \| *1* \| *-1* \| *2* ; `offsetlist?`: *undefined* \| *null* \| *number*[]  }): [*Bitmap*](bitmap.md)

Concatenate all `Bitmap` objects in an `array`.

**`see`** [http://localhost:3000/bdfparser_js/bitmap#bitmapconcatall](http://localhost:3000/bdfparser_js/bitmap#bitmapconcatall)

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bitmaplist` | [*Bitmap*](bitmap.md)[] | - | List of bitmaps to concatenate   |
`options` | { `align?`: *undefined* \| *null* \| *0* \| *1* ; `direction?`: *undefined* \| *null* \| *0* \| *1* \| *-1* \| *2* ; `offsetlist?`: *undefined* \| *null* \| *number*[]  } | ... | - |

**Returns:** [*Bitmap*](bitmap.md)

`Bitmap` object

Defined in: bdfparser.ts:1424
