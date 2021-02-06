---
id: "_font"
title: "Function: $Font"
sidebar_label: "$Font"
custom_edit_url: null
hide_title: true
---

# Function: $Font

▸ `Const`**$Font**(`filelines`: *AsyncIterableIterator*<*string*\>): *Promise*<[*Font*](../classes/font.md)\>

Shortcut for `new Font().load_filelines(filelines)` so you don't need to write `new` and `.load_filelines`

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filelines` | *AsyncIterableIterator*<*string*\> | Asynchronous iterator containing each line in string text from the font file    |

**Returns:** *Promise*<[*Font*](../classes/font.md)\>

The newly instantiated `Font` object that's loaded the font file

Defined in: [bdfparser.ts:1838](https://github.com/tomchen/bdfparser-js/blob/dfd4e71/src/bdfparser.ts#L1838)
