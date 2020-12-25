(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{100:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}));var r=n(22),a=n(101);function i(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var i=void 0===r?{}:r,o=i.forcePrependBaseUrl,c=void 0!==o&&o,p=i.absolute,l=void 0!==p&&p;if(!n)return n;if(n.startsWith("#"))return n;if(Object(a.b)(n))return n;if(c)return t+n;var b=n.startsWith(t)?n:t+n.replace(/^\//,"");return l?e+b:b}(i,n,e,t)}}}function o(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},101:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}))},104:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0),a=n.n(r),i=n(100);function o(e){var t=e.src,n=e.caption,r=e.figure_number,o=e.width,c=e.baseUrl,p=e.link;return a.a.createElement("figure",{style:{textAlign:"center",margin:"1em"}},p?a.a.createElement("a",{href:p},a.a.createElement("img",{alt:n,src:c?Object(i.a)(t):t,width:o})):a.a.createElement("img",{alt:n,src:c?Object(i.a)(t):t,width:o}),a.a.createElement("figcaption",{style:{fontStyle:"italic"}},r&&a.a.createElement("strong",null,"Figure ",r," "),n))}},87:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(3),a=n(8),i=(n(0),n(97)),o=n(104),c={id:"index",title:"BDF Parser (Python library)",sidebar_label:"BDF Parser (Python) - Overview",slug:"/"},p={unversionedId:"index",id:"index",isDocsHomePage:!1,title:"BDF Parser (Python library)",description:"Introduction",source:"@site/bdfparser_py/index.mdx",slug:"/",permalink:"/bdfparser_py/",editUrl:"https://github.com/tomchen/font-website/edit/master/bdfparser_py/index.mdx",version:"current",sidebar_label:"BDF Parser (Python) - Overview",sidebar:"sidebar",next:{title:"Font object",permalink:"/bdfparser_py/font"}},l=[{value:"Introduction",id:"introduction",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Quick examples",id:"quick-examples",children:[]},{value:"Copyright &amp; links",id:"copyright--links",children:[]}],b={toc:l};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"introduction"},"Introduction"),Object(i.b)("p",null,"This is a BDF (Glyph Bitmap Distribution; ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Glyph_Bitmap_Distribution_Format"}),"Wikipedia"),"; ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"../bdf_spec/"}),"Spec"),") format bitmap font file parser library in Python. It has ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"font"}),Object(i.b)("inlineCode",{parentName:"a"},"Font")),", ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"glyph"}),Object(i.b)("inlineCode",{parentName:"a"},"Glyph"))," and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"bitmap"}),Object(i.b)("inlineCode",{parentName:"a"},"Bitmap"))," classes providing more than 30 enriched API methods of parsing BDF fonts, getting their meta information, rendering text in any writing direction, adding special effects and manipulating bitmap images. It works seamlessly with ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://pillow.readthedocs.io/en/stable/"}),"PIL / Pillow")," and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://numpy.org/"}),"NumPy"),", and has detailed documentation / tutorials / API reference."),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"pip install bdfparser\n")),Object(i.b)("small",null,"(Python 3.4 and later include pip by default. Read ",Object(i.b)("a",{href:"https://pip.pypa.io/en/stable/installing/#do-i-need-to-install-pip"},"this")," to know how to check whether pip is installed. Read ",Object(i.b)("a",{href:"https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py"},"this")," if you need to install it)"),Object(i.b)("h2",{id:"quick-examples"},"Quick examples"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"from bdfparser import Font\nfont = Font('tests/fonts/unifont-13.0.04.bdf')\nprint(f\"This font's global size is \"\n      f\"{font.headers['fbbx']} x {font.headers['fbby']} (pixel), \"\n      f\"it contains {len(font)} glyphs.\")\n# This font's global size is 16 x 16 (pixel), it contains 57086 glyphs.\n")),Object(i.b)("p",null,'Print cropped and combined "a" and "c" with shadow effect:'),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),'ac = font.glyph("a").draw().crop(6, 8, 1, 2).concat(\n    font.glyph("c").draw().crop(6, 8, 1, 2)\n    ).shadow()\nprint(ac)\n# .####..####..\n# #.&&&##.&&&#.\n# .&...##&....&\n# .######&.....\n# #.&&&##&.....\n# #&...##&.....\n# #&..###&...#.\n# .###.#&####.&\n# ..&&&.&.&&&&.\n')),Object(i.b)("p",null,'Get an enlarged version (8 times both width and height) of this "ac"'),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"ac_8x8 = ac * 8\n")),Object(i.b)("p",null,'And save it as an RGBA (background transparent) image "ac.png", using ',Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://pillow.readthedocs.io/en/stable/"}),"PIL (Pillow)")," library ",Object(i.b)("small",null,"(",Object(i.b)("code",null,"pip install pillow")," if needed)"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"from PIL import Image\nim_ac = Image.frombytes('RGBA',\n                        (ac_8x8.width(), ac_8x8.height()),\n                        ac_8x8.tobytes('RGBA'))\nim_ac.save(\"ac.png\", \"PNG\")\n")),Object(i.b)(o.a,{src:"bdfparser_py/img/ac.png",caption:"ac.png (note its background is transparent)",position:"center",baseUrl:!0,mdxType:"Figure"}),Object(i.b)("p",null,'Print text "Hello!", from right to left, with glowing effect:'),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"hello = font.draw('Hello!', direction='rl').glow()\nprint(hello)\n# ..........................................................\n# ..........................................................\n# ..........................................................\n# ....................&&......&&............................\n# .....&.............&##&....&##&...........&....&..........\n# ....&#&.............&#&.....&#&..........&#&..&#&.........\n# ....&#&....&&&&.....&#&.....&#&....&&&&..&#&..&#&.........\n# ....&#&...&####&....&#&.....&#&...&####&.&#&..&#&.........\n# ....&#&..&#&&&&#&...&#&.....&#&..&#&&&&#&&#&&&&#&.........\n# ....&#&..&#&..&#&...&#&.....&#&..&#&&&&#&&######&.........\n# ....&#&..&#&..&#&...&#&.....&#&..&######&&#&&&&#&.........\n# ....&#&..&#&..&#&...&#&.....&#&..&#&&&&&.&#&..&#&.........\n# .....&...&#&..&#&...&#&.....&#&..&#&...&.&#&..&#&.........\n# ....&#&..&#&&&&#&..&&#&&...&&#&&.&#&&&&#&&#&..&#&.........\n# ....&#&...&####&..&#####&.&#####&.&####&.&#&..&#&.........\n# .....&.....&&&&....&&&&&...&&&&&...&&&&...&....&..........\n# ..........................................................\n# ..........................................................\n")),Object(i.b)("p",null,"This time, try ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://numpy.org/"}),"NumPy")," and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://matplotlib.org/"}),"Matplotlib"),"! ",Object(i.b)("small",null,"(",Object(i.b)("code",null,"pip install")," if you don't have them)")),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"import numpy\nimport matplotlib.pyplot as plt\nnparr = numpy.array(hello.todata(2))\nplt.imshow(nparr, 'Blues')\nplt.show()\n")),Object(i.b)(o.a,{src:"bdfparser_py/img/plot.png",caption:'Plot image "!olleH"',position:"center",baseUrl:!0,mdxType:"Figure"}),Object(i.b)("p",null,"Save all glyphs in ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/GNU_Unifont"}),"Unifont"),' as a black-and-white-two-color-only "font_preview.png" (with default width 512px):'),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-python"}),"font_preview = font.drawall()\nim_ac = Image.frombytes('1',\n                        (font_preview.width(), font_preview.height()),\n                        font_preview.tobytes('1'))\nim_ac.save(\"font_preview.png\", \"PNG\")\n")),Object(i.b)(o.a,{src:"bdfparser_py/img/font_preview_part.png",caption:"Parts of the Unifont preview image (click the image to view the long original)",position:"center",baseUrl:!0,link:"img/font_preview.png",mdxType:"Figure"}),Object(i.b)("h2",{id:"copyright--links"},"Copyright & links"),Object(i.b)("p",null,"Written by ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://tomchen.org/"}),"Tom Chen"),", under ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/tomchen/bdfparser/blob/master/LICENSE"}),"the MIT License"),", a permissive open-source license."),Object(i.b)("p",null,"This library officially supports Python version 3.5 or later."),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/tomchen/bdfparser"}),"GitHub repo")," | ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://pypi.org/project/bdfparser/"}),"PyPI page")),Object(i.b)("p",null,"The documentation belongs to ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://font.tomchen.org/"}),"font.tomchen.org"),", a website where I put font & typography related stuff. ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/tomchen/font-website"}),"The documentation website's GitHub repo")))}s.isMDXComponent=!0},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),b=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=b(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),s=b(n),f=r,d=s["".concat(o,".").concat(f)]||s[f]||u[f]||i;return n?a.a.createElement(d,c(c({ref:t},l),{},{components:n})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);