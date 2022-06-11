/*
Language: LaTeX
Author: ponte-vecchio <zkogdxdkur@p.monash.edu>
Website: https://www.latex-project.org
Category: markup
*/

/** @type LanguageFn */
function latex(hljs) {
  const regex = hljs.regex;
  const KNOWN_CONTROL_WORDS = regex.either(...[
    "(?:NeedsTeXFormat|RequirePackage|GetIdInfo)",
    "Provides(?:Expl)?(?:Package|Class|File)",
    "(?:DeclareOption|ProcessOptions)",
    "(?:documentclass|usepackage|input|include)",
    "makeat(?:letter|other)",
    "ExplSyntax(?:On|Off)",
    "(?:new|renew|provide)?command",
    "(?:re)newenvironment",
    "(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand",
    "(?:New|Renew|Provide|Declare)DocumentEnvironment",
    "(?:(?:e|g|x)?def|let)",
    "(?:begin|end)",
    "(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)",
    "caption",
    "(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)",
    "(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)",
    "(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)",
    "(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)",
    "(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)",
    "(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  const TEX_PRIMITIVES = regex.either(...[
    "above?(?:displayshortskip|displayskip|withdelims)",
    // 'abovedisplayshortskip',
    // 'abovedisplayskip',
    // 'abovewithdelims',
    "accent",
    "adjdemerits",
    "advance",
    "afterassignment",
    "aftergroup",
    "atop?(?:withdelims)",
    // 'atopwithdelims',
    "badness",
    "baselineskip",
    "batchmode",
    "begingroup",
    "belowdisplay?(?:short)skip",
    // 'belowdisplayskip',
    "binoppenalty",
    "botmark",
    "box",
    "boxmaxdepth",
    "brokenpenalty",
    "catcode",
    "char",
    "chardef",
    "charsubdef",
    "charsubdefmax",
    "cleaders",
    "closein",
    "closeout",
    "clubpenalty",
    "copy",
    "count",
    "countdef",
    "cr{1,2}",
    // 'crcr',
    "csname",
    "day",
    "deadcycles",
    "def",
    "defaulthyphenchar",
    "defaultskewchar",
    "delcode",
    "delimiter?(?:factor|shortfall)",
    // 'delimiterfactor',
    // 'delimitershortfall',
    "dimen?(?:def)",
    // 'dimendef',
    "discretionary",
    "displayindent",
    "displaylimits",
    "displaystyle",
    "displaywidowpenalty",
    "displaywidth",
    "divide",
    "doublehyphendemerits",
    "dp",
    "dump",
    // 'edef',
    "else",
    "emergencystretch",
    "end",
    "endcsname",
    "endgroup",
    "endinput",
    "endlinechar",
    "endmubyte",
    "eqno",
    "errhelp",
    "errmessage",
    "errorcontextlines",
    "errorstopmode",
    "escapechar",
    "every?(?:cr|display|[hv]box|job|math|par)",
    // 'everydisplay',
    // 'everyhbox',
    // 'everyjob',
    // 'everymath',
    // 'everypar',
    // 'everyvbox',
    "exhyphenpenalty",
    "expandafter",
    "fam",
    "fi",
    "finalhyphendemerits",
    "firstmark",
    "floatingpenalty",
    "font",
    "fontdimen",
    "fontname",
    "futurelet",
    "[gef]def",
    "global?(?:defs)",
    // 'globaldefs',
    "[hv]align",
    "hang?(?:after|indent)",
    // 'hangindent',
    "[hv]badness",
    "[hv]box",
    "hfi[l]{1,3}",
    "hfilneg",
    "[hv]fuzz",
    "[hv]offset",
    "holdinginserts",
    "[hv]rule",
    "[hv]size",
    "[hv]skip",
    "[hv]ss",
    "ht",
    "hyphen?(?:(ation|char|penalty))",
    "if?(?:case|cat|dim|eof|[hv]mode|[hv]box|inner|true|num|odd|void|x)",
    // 'ifcase',
    // 'ifcat',
    // 'ifdim',
    // 'ifeof',
    // 'iffalse',
    // 'ifhbox',
    // 'ifhmode',
    // 'ifinner',
    // 'ifmmode',
    // 'ifnum',
    // 'ifodd',
    // 'iftrue',
    // 'ifvbox',
    // 'ifvmode',
    // 'ifvoid',
    // 'ifx',
    "ignorespaces",
    "immediate",
    "indent",
    "input",
    "inputlineno",
    "insert",
    "insertpenalties",
    "interlinepenalty",
    "jobname",
    "kern",
    "language",
    "lastbox",
    "lastkern",
    "lastpenalty",
    "lastskip",
    "lccode",
    "leaders",
    "left",
    "lefthyphenmin",
    "leftskip",
    "leqno",
    "let",
    "limits",
    "linepenalty",
    "lineskip",
    "lineskiplimit",
    "long",
    "looseness",
    "lower",
    "lowercase",
    "mag",
    "mark",
    "mathaccent",
    "mathbin",
    "mathchar",
    "mathchardef",
    "mathchoice",
    "mathclose",
    "mathcode",
    "mathinner",
    "mathop",
    "mathopen",
    "mathord",
    "mathpunct",
    "mathrel",
    "mathsurround",
    "maxdeadcycles",
    "maxdepth",
    "meaning",
    "medmuskip",
    "message",
    "mkern",
    "month",
    "moveleft",
    "moveright",
    "mskip",
    "mubyte",
    "mubytein",
    "mubytelog",
    "mubyteout",
    "multiply",
    "muskip",
    "muskipdef",
    "newlinechar",
    "noalign",
    "noboundary",
    "noconvert",
    "noexpand",
    "noindent",
    "nolimits",
    "nonscript",
    "nonstopmode",
    "nulldelimiterspace",
    "nullfont",
    "number",
    "omit",
    "openin",
    "openout",
    "or",
    "outer",
    "output",
    "outputpenalty",
    "over",
    "overfullrule",
    "overline",
    "overwithdelims",
    "pagedepth",
    "pagefilllstretch",
    "pagefillstretch",
    "pagefilstretch",
    "pagegoal",
    "pageshrink",
    "pagestretch",
    "pagetotal",
    "par",
    "parfillskip",
    "parindent",
    "parshape",
    "parskip",
    "patterns",
    "pausing",
    "penalty",
    "postdisplaypenalty",
    "predisplaypenalty",
    "predisplaysize",
    "pretolerance",
    "prevdepth",
    "prevgraf",
    "radical",
    "raise",
    "read",
    "relax",
    "relpenalty",
    "right",
    "righthyphenmin",
    "rightskip",
    "romannumeral",
    "scriptfont",
    "scriptscriptfont",
    "scriptscriptstyle",
    "scriptspace",
    "scriptstyle",
    "scrollmode",
    "setbox",
    "setlanguage",
    "sfcode",
    "shipout",
    "show",
    "showbox",
    "showboxbreadth",
    "showboxdepth",
    "showlists",
    "showthe",
    "skewchar",
    "skip",
    "skipdef",
    "spacefactor",
    "spaceskip",
    "span",
    "special",
    "specialout",
    "splitbotmark",
    "splitfirstmark",
    "splitmaxdepth",
    "splittopskip",
    "string",
    "synctex",
    "tabskip",
    "textfont",
    "textstyle",
    "the",
    "thickmuskip",
    "thinmuskip",
    "time",
    "toks",
    "toksdef",
    "tolerance",
    "topmark",
    "topskip",
    "tracingcharsubdef",
    "tracingcommands",
    "tracinglostchars",
    "tracingmacros",
    "tracingonline",
    "tracingoutput",
    "tracingpages",
    "tracingparagraphs",
    "tracingrestores",
    "tracingstats",
    "uccode",
    "uchyph",
    "underline",
    "unhbox",
    "unhcopy",
    "unkern",
    "unpenalty",
    "unskip",
    "unvbox",
    "unvcopy",
    "uppercase",
    "vadjust",
    "valign",
    "vbadness",
    "vbox",
    "vcenter",
    "vfil",
    "vfill",
    "vfilneg",
    // 'vfuzz',
    "voffset",
    "vrule",
    "vsize",
    "vskip",
    "vsplit",
    "vss",
    "vtop",
    "wd",
    "widowpenalty",
    "write",
    "xchrcode",
    "xdef",
    "xleaders",
    "xordcode",
    "xprncode",
    "xspaceskip",
    "year"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  // eTeX primitives not in TeX
  const ETEX_PRIMITIVES = regex.either(...[
    "beginL",
    "beginR",
    "botmarks",
    "clubpenalties",
    "currentgrouplevel",
    "currentgrouptype",
    "currentifbranch",
    "currentiflevel",
    "currentiftype",
    "detokenize",
    "dimexpr",
    "displaywidowpenalties",
    "endL",
    "endR",
    "eTeXrevision",
    "eTeXversion",
    "everyeof",
    "firstmarks",
    "fontchardp",
    "fontcharht",
    "fontcharic",
    "fontcharwd",
    "glueexpr",
    "glueshrink",
    "glueshrinkorder",
    "gluestretch",
    "gluestretchorder",
    "gluetomu",
    "ifcsname",
    "ifdefined",
    "iffontchar",
    "interactionmode",
    "interlinepenalties",
    "lastlinefit",
    "lastnodetype",
    "marks",
    "middle",
    "muexpr",
    "mutoglue",
    "numexpr",
    "pagediscards",
    "parshapedimen",
    "parshapeindent",
    "parshapelength",
    "predisplaydirection",
    "protected",
    "readline",
    "savinghyphcodes",
    "savingvdiscards",
    "scantokens",
    "showgroups",
    "showifs",
    "showtokens",
    "splitbotmarks",
    "splitdiscards",
    "splitfirstmarks",
    "TeXXeTstate",
    "topmarks",
    "tracingassigns",
    "tracinggroups",
    "tracingifs",
    "tracingnesting",
    "tracingscantokens",
    "unexpanded",
    "unless",
    "widowpenalties"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  // pdfTeX primitives not in above primitives
  const PDFTEX_PRIMITIVES = regex.either(...[
    "efcode",
    "ifincsname",
    "ifpdfabsdim",
    "ifpdfabsnum",
    "ifpdfprimitive",
    "knaccode",
    "knbccode",
    "knbscode",
    "leftmarginkern",
    "letterspacefont",
    "lpcode",
    "pdfadjustinterwordglue",
    "pdfadjustspacing",
    "pdfannot",
    "pdfappendkern",
    "pdfcatalog",
    "pdfcolorstack",
    "pdfcolorstackinit",
    "pdfcompresslevel",
    "pdfcopyfont",
    "pdfcreationdate",
    "pdfdecimaldigits",
    "pdfdest",
    "pdfdestmargin",
    "pdfdraftmode",
    "pdfeachlinedepth",
    "pdfeachlineheight",
    "pdfelapsedtime",
    "pdfendlink",
    "pdfendthread",
    "pdfescapehex",
    "pdfescapename",
    "pdfescapestring",
    "pdffakespace",
    "pdffiledump",
    "pdffilemoddate",
    "pdffilesize",
    "pdffirstlineheight",
    "pdffontattr",
    "pdffontexpand",
    "pdffontname",
    "pdffontobjnum",
    "pdffontsize",
    "pdfforcepagebox",
    "pdfgamma",
    "pdfgentounicode",
    "pdfglyphtounicode",
    "pdfhorigin",
    "pdfignoreddimen",
    "pdfimageapplygamma",
    "pdfimagegamma",
    "pdfimagehicolor",
    "pdfimageresolution",
    "pdfincludechars",
    "pdfinclusioncopyfonts",
    "pdfinclusionerrorlevel",
    "pdfinfo",
    "pdfinfoomitdate",
    "pdfinsertht",
    "pdfinterwordspaceoff",
    "pdfinterwordspaceon",
    "pdflastannot",
    "pdflastlinedepth",
    "pdflastlink",
    "pdflastmatch",
    "pdflastobj",
    "pdflastxform",
    "pdflastximage",
    "pdflastximagecolordepth",
    "pdflastximagepages",
    "pdflastxpos",
    "pdflastypos",
    "pdflinkmargin",
    "pdfliteral",
    "pdfmapfile",
    "pdfmapline",
    "pdfmatch",
    "pdfmdfivesum",
    "pdfminorversion",
    "pdfmovechars",
    "pdfnames",
    "pdfnobuiltintounicode",
    "pdfnoligatures",
    "pdfnormaldeviate",
    "pdfobj",
    "pdfobjcompresslevel",
    "pdfoptionalwaysusepdfpagebox",
    "pdfoptionpdfinclusionerrorlevel",
    "pdfoptionpdfminorversion",
    "pdfoutline",
    "pdfoutput",
    "pdfpageattr",
    "pdfpagebox",
    "pdfpageheight",
    "pdfpageref",
    "pdfpageresources",
    "pdfpagesattr",
    "pdfpagewidth",
    "pdfpkmode",
    "pdfpkresolution",
    "pdfprependkern",
    "pdfprimitive",
    "pdfprotrudechars",
    "pdfpxdimen",
    "pdfrandomseed",
    "pdfrefobj",
    "pdfrefxform",
    "pdfrefximage",
    "pdfresettimer",
    "pdfrestore",
    "pdfretval",
    "pdfsave",
    "pdfsavepos",
    "pdfsetmatrix",
    "pdfsetrandomseed",
    "pdfshellescape",
    "pdfsnaprefpoint",
    "pdfsnapy",
    "pdfsnapycomp",
    "pdfstartlink",
    "pdfstartthread",
    "pdfstrcmp",
    "pdfsuppressptexinfo",
    "pdfsuppresswarningdupdest",
    "pdfsuppresswarningdupmap",
    "pdfsuppresswarningpagegroup",
    "pdftexbanner",
    "pdftexrevision",
    "pdftexversion",
    "pdfthread",
    "pdfthreadmargin",
    "pdftracingfonts",
    "pdftrailer",
    "pdftrailerid",
    "pdfunescapehex",
    "pdfuniformdeviate",
    "pdfuniqueresname",
    "pdfvorigin",
    "pdfxform",
    "pdfxformname",
    "pdfximage",
    "pdfximagebbox",
    "quitvmode",
    "rightmarginkern",
    "rpcode",
    "shbscode",
    "stbscode",
    "tagcode"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  // XeTeX primitives not in above primitives
  const XETEX_PRIMITIVES = regex.either(...[
    "ifprimitive",
    "mdfivesum",
    "primitive",
    "shellescape",
    "strcmp",
    "suppressfontnotfounderror",
    "Uchar",
    "Ucharcat",
    "Udelcode",
    "Udelcodenum",
    "Udelimiter",
    "Umathaccent",
    "Umathchar",
    "Umathchardef",
    "Umathcharnum",
    "Umathcharnumdef",
    "Umathcode",
    "Umathcodenum",
    "Uradical",
    "XeTeXcharclass",
    "XeTeXcharglyph",
    "XeTeXcountfeatures",
    "XeTeXcountglyphs",
    "XeTeXcountselectors",
    "XeTeXcountvariations",
    "XeTeXdashbreakstate",
    "XeTeXdefaultencoding",
    "XeTeXdelcode",
    "XeTeXdelcodenum",
    "XeTeXdelimiter",
    "XeTeXfeaturecode",
    "XeTeXfeaturename",
    "XeTeXfindfeaturebyname",
    "XeTeXfindselectorbyname",
    "XeTeXfindvariationbyname",
    "XeTeXfirstfontchar",
    "XeTeXfonttype",
    "XeTeXgenerateactualtext",
    "XeTeXglyph",
    "XeTeXglyphbounds",
    "XeTeXglyphindex",
    "XeTeXglyphname",
    "XeTeXhyphenatablelength",
    "XeTeXinputencoding",
    "XeTeXinputnormalization",
    "XeTeXinterchartokenstate",
    "XeTeXinterchartoks",
    "XeTeXinterwordspaceshaping",
    "XeTeXisdefaultselector",
    "XeTeXisexclusivefeature",
    "XeTeXlastfontchar",
    "XeTeXlinebreaklocale",
    "XeTeXlinebreakpenalty",
    "XeTeXlinebreakskip",
    "XeTeXmathaccent",
    "XeTeXmathchar",
    "XeTeXmathchardef",
    "XeTeXmathcharnum",
    "XeTeXmathcharnumdef",
    "XeTeXmathcode",
    "XeTeXmathcodenum",
    "XeTeXOTcountfeatures",
    "XeTeXOTcountlanguages",
    "XeTeXOTcountscripts",
    "XeTeXOTfeaturetag",
    "XeTeXOTlanguagetag",
    "XeTeXOTscripttag",
    "XeTeXpdffile",
    "XeTeXpdfpagecount",
    "XeTeXpicfile",
    "XeTeXprotrudechars",
    "XeTeXradical",
    "XeTeXrevision",
    "XeTeXselectorcode",
    "XeTeXselectorname",
    "XeTeXtracingfonts",
    "XeTeXupwardsmode",
    "XeTeXuseglyphmetrics",
    "XeTeXvariation",
    "XeTeXvariationdefault",
    "XeTeXvariationmax",
    "XeTeXvariationmin",
    "XeTeXvariationname",
    "XeTeXversion"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  const LUATEX_PRIMITIVES = regex.either(...[
    "adjustspacing",
    "alignmark",
    "aligntab",
    "attribute",
    "attributedef",
    "automaticdiscretionary",
    "automatichyphenmode",
    "automatichyphenpenalty",
    "begincsname",
    "bodydir",
    "bodydirection",
    "boundary",
    "boxdir",
    "boxdirection",
    "breakafterdirmode",
    "catcodetable",
    "clearmarks",
    "compoundhyphenmode",
    "copyfont",
    "crampeddisplaystyle",
    "crampedscriptscriptstyle",
    "crampedscriptstyle",
    "crampedtextstyle",
    "csstring",
    "directlua",
    "draftmode",
    "dviextension",
    "dvifeedback",
    "dvivariable",
    "endlocalcontrol",
    "eTeXminorversion",
    "eTeXVersion",
    "etoksapp",
    "etokspre",
    "exceptionpenalty",
    "exhyphenchar",
    "expanded",
    "expandglyphsinfont",
    "explicitdiscretionary",
    "explicithyphenpenalty",
    "firstvalidlanguage",
    "fixupboxesmode",
    "fontid",
    "formatname",
    "gleaders",
    "glet",
    "gtoksapp",
    "gtokspre",
    "hjcode",
    "hpack",
    "hyphenationbounds",
    "hyphenationmin",
    "hyphenpenaltymode",
    "ifabsdim",
    "ifabsnum",
    "ifcondition",
    "ignoreligaturesinfont",
    "immediateassigned",
    "immediateassignment",
    "initcatcodetable",
    "insertht",
    "lastnamedcs",
    "lastsavedboxresourceindex",
    "lastsavedimageresourceindex",
    "lastsavedimageresourcepages",
    "lastxpos",
    "lastypos",
    "latelua",
    "lateluafunction",
    "leftghost",
    "letcharcode",
    "linedir",
    "linedirection",
    "localbrokenpenalty",
    "localinterlinepenalty",
    "localleftbox",
    "localrightbox",
    "luabytecode",
    "luabytecodecall",
    "luacopyinputnodes",
    "luadef",
    "luaescapestring",
    "luafunction",
    "luafunctioncall",
    "luatexbanner",
    "luatexrevision",
    "luatexversion",
    "mathdelimitersmode",
    "mathdir",
    "mathdirection",
    "mathdisplayskipmode",
    "matheqnogapstep",
    "mathflattenmode",
    "mathitalicsmode",
    "mathnolimitsmode",
    "mathoption",
    "mathpenaltiesmode",
    "mathrulesfam",
    "mathrulesmode",
    "mathrulethicknessmode",
    "mathscriptboxmode",
    "mathscriptcharmode",
    "mathscriptsmode",
    "mathstyle",
    "mathsurroundmode",
    "mathsurroundskip",
    "nohrule",
    "nokerns",
    "noligs",
    "normaldeviate",
    "nospaces",
    "novrule",
    "outputbox",
    "outputmode",
    "pagebottomoffset",
    "pagedir",
    "pagedirection",
    "pageheight",
    "pageleftoffset",
    "pagerightoffset",
    "pagetopoffset",
    "pagewidth",
    "pardir",
    "pardirection",
    "pdfextension",
    "pdffeedback",
    "pdfvariable",
    "postexhyphenchar",
    "posthyphenchar",
    "prebinoppenalty",
    "predisplaygapfactor",
    "preexhyphenchar",
    "prehyphenchar",
    "prerelpenalty",
    "protrudechars",
    "protrusionboundary",
    "pxdimen",
    "randomseed",
    "rightghost",
    "saveboxresource",
    "savecatcodetable",
    "saveimageresource",
    "savepos",
    "scantextokens",
    "setfontid",
    "setrandomseed",
    "shapemode",
    "suppressifcsnameerror",
    "suppresslongerror",
    "suppressmathparerror",
    "suppressoutererror",
    "suppressprimitiveerror",
    "textdir",
    "textdirection",
    "toksapp",
    "tokspre",
    "tpack",
    "tracingfonts",
    "Udelimiterover",
    "Udelimiterunder",
    "Uhextensible",
    "Uleft",
    "Umathaxis",
    "Umathbinbinspacing",
    "Umathbinclosespacing",
    "Umathbininnerspacing",
    "Umathbinopenspacing",
    "Umathbinopspacing",
    "Umathbinordspacing",
    "Umathbinpunctspacing",
    "Umathbinrelspacing",
    "Umathcharclass",
    "Umathcharfam",
    "Umathcharslot",
    "Umathclosebinspacing",
    "Umathcloseclosespacing",
    "Umathcloseinnerspacing",
    "Umathcloseopenspacing",
    "Umathcloseopspacing",
    "Umathcloseordspacing",
    "Umathclosepunctspacing",
    "Umathcloserelspacing",
    "Umathconnectoroverlapmin",
    "Umathfractiondelsize",
    "Umathfractiondenomdown",
    "Umathfractiondenomvgap",
    "Umathfractionnumup",
    "Umathfractionnumvgap",
    "Umathfractionrule",
    "Umathinnerbinspacing",
    "Umathinnerclosespacing",
    "Umathinnerinnerspacing",
    "Umathinneropenspacing",
    "Umathinneropspacing",
    "Umathinnerordspacing",
    "Umathinnerpunctspacing",
    "Umathinnerrelspacing",
    "Umathlimitabovebgap",
    "Umathlimitabovekern",
    "Umathlimitabovevgap",
    "Umathlimitbelowbgap",
    "Umathlimitbelowkern",
    "Umathlimitbelowvgap",
    "Umathnolimitsubfactor",
    "Umathnolimitsupfactor",
    "Umathopbinspacing",
    "Umathopclosespacing",
    "Umathopenbinspacing",
    "Umathopenclosespacing",
    "Umathopeninnerspacing",
    "Umathopenopenspacing",
    "Umathopenopspacing",
    "Umathopenordspacing",
    "Umathopenpunctspacing",
    "Umathopenrelspacing",
    "Umathoperatorsize",
    "Umathopinnerspacing",
    "Umathopopenspacing",
    "Umathopopspacing",
    "Umathopordspacing",
    "Umathoppunctspacing",
    "Umathoprelspacing",
    "Umathordbinspacing",
    "Umathordclosespacing",
    "Umathordinnerspacing",
    "Umathordopenspacing",
    "Umathordopspacing",
    "Umathordordspacing",
    "Umathordpunctspacing",
    "Umathordrelspacing",
    "Umathoverbarkern",
    "Umathoverbarrule",
    "Umathoverbarvgap",
    "Umathoverdelimiterbgap",
    "Umathoverdelimitervgap",
    "Umathpunctbinspacing",
    "Umathpunctclosespacing",
    "Umathpunctinnerspacing",
    "Umathpunctopenspacing",
    "Umathpunctopspacing",
    "Umathpunctordspacing",
    "Umathpunctpunctspacing",
    "Umathpunctrelspacing",
    "Umathquad",
    "Umathradicaldegreeafter",
    "Umathradicaldegreebefore",
    "Umathradicaldegreeraise",
    "Umathradicalkern",
    "Umathradicalrule",
    "Umathradicalvgap",
    "Umathrelbinspacing",
    "Umathrelclosespacing",
    "Umathrelinnerspacing",
    "Umathrelopenspacing",
    "Umathrelopspacing",
    "Umathrelordspacing",
    "Umathrelpunctspacing",
    "Umathrelrelspacing",
    "Umathskewedfractionhgap",
    "Umathskewedfractionvgap",
    "Umathspaceafterscript",
    "Umathstackdenomdown",
    "Umathstacknumup",
    "Umathstackvgap",
    "Umathsubshiftdown",
    "Umathsubshiftdrop",
    "Umathsubsupshiftdown",
    "Umathsubsupvgap",
    "Umathsubtopmax",
    "Umathsupbottommin",
    "Umathsupshiftdrop",
    "Umathsupshiftup",
    "Umathsupsubbottommax",
    "Umathunderbarkern",
    "Umathunderbarrule",
    "Umathunderbarvgap",
    "Umathunderdelimiterbgap",
    "Umathunderdelimitervgap",
    "Umiddle",
    "uniformdeviate",
    "Unosubscript",
    "Unosuperscript",
    "Uoverdelimiter",
    "Uright",
    "Uroot",
    "useboxresource",
    "useimageresource",
    "Uskewed",
    "Uskewedwithdelims",
    "Ustack",
    "Ustartdisplaymath",
    "Ustartmath",
    "Ustopdisplaymath",
    "Ustopmath",
    "Usubscript",
    "Usuperscript",
    "Uunderdelimiter",
    "Uvextensible",
    "vpack",
    "wordboundary",
    "xtoksapp",
    "xtokspre"
  ].map(word => word + "(?![a-zA-Z@:_])"));
  const L3_REGEX = new RegExp([
    // A function \module_function_name:signature or \__module_function_name:signature,
    // where both module and function_name need at least two characters and
    // function_name may contain single underscores.
    "(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*",
    // A variable \scope_module_and_name_type or \scope__module_ane_name_type,
    // where scope is one of l, g or c, type needs at least two characters
    // and module_and_name may contain single underscores.
    "[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}",
    // A quark \q_the_name or \q__the_name or
    // scan mark \s_the_name or \s__vthe_name,
    // where variable_name needs at least two characters and
    // may contain single underscores.
    "[qs]__?[a-zA-Z](?:_?[a-zA-Z])+",
    // Other LaTeX3 macro names that are not covered by the three rules above.
    "use(?:_i)?:[a-zA-Z]*",
    "(?:else|fi|or):",
    "(?:if|cs|exp):w",
    "(?:hbox|vbox):n",
    "::[a-zA-Z]_unbraced",
    "::[a-zA-Z:]"
  ].map(pattern => pattern + "(?![a-zA-Z:_])").join("|"));
  const L2_VARIANTS = [
    { begin: /[a-zA-Z@]+/ }, // control word
    { begin: /[^a-zA-Z@]?/ } // control symbol
  ];
  const DOUBLE_CARET_VARIANTS = [
    { className: "char.escape", begin: /\^{6}[\da-f]{6}/ },
    { className: "char.escape", begin: /\^{5}[\da-f]{5}/ },
    { className: "char.escape", begin: /\^{4}[\da-f]{4}/ },
    { className: "char.escape", begin: /\^{3}[\da-f]{3}/ },
    { className: "char.escape", begin: /\^{2}[\da-f]{2}/ },
    { className: "char.escape", begin: /\^{2}[\u0000-\u007f]/ }
  ];
  const ARITHMETIC_CS = [
    // just numbers
    { className: "number", begin: /\b\d+\b/ },
    // decimals e.g. 1.0, 2.0
    { className: "number", begin: /\b\d+\.\d+\b/ },
    // dot decimals e.g. .5
    { className: "number", begin: /\b\.\d+\b/ },
    // number + dimen e.g. 1cm  -3.5in  0em  2fill
    { className: "number", begin: /\b(\d+)(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/ },
    { className: "number", begin: /\b(\d+\.\d+)(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/ },
    { className: "number", begin: /\b(\.\d+)(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/ },
    // arg + number + dimen e.g. to4em
    {
      className: "number",
      begin: /\b(to|plus|minus|height|depth|width)?\d+?(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/
    },
    {
      className: "number",
      begin: /\b(to|plus|minus|height|depth|width)?\d+\.\d+?(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/
    },
    {
      className: "number",
      begin: /\b(to|plus|minus|height|depth|width)\.\d+?(pt|pc|bp|in|cm|mm|dd|cc|sp|ex|em|mu|fi[l]{1,3})\b/
    },
    // " for hexadecimal, ' for octal, none for decimal
    { className: "number", begin: /(?:'|")+([\da-fA-F]{2,8})\b/ },
    // operators
    { className: "literal", begin: /=/ },
    { className: "operator", begin: /(\+|-|\*|\/|\^|>|<|&&|&=|&)/ },
    { className: "operator", begin: /\\(plus|minus|multiply|divide)\b/ },
    { className: "number", begin: /(plus|minus|multiply|divide)\b/ }
  ];
  const FUNCTION_CS = [
    {
      className: "builtin",
      begin: /\\(the[a-zA-Z@_]{1,99}|[a-z]{3}expr|expandafter|providecommand|protected|string|long|the)\b/
    },
    { // declarative builtins
      className: "builtin",
      begin: /\\((?:mathchar|char|count|skip|toks|dimen)def|[xeg]def|def|global|outer|futurelet|begingroup|endgroup|relax|let|advance|undefined|every?(?:cr|display|[hv]box|job|math|par))\b/
    },
    { // conditionals
      className: "operator",
      begin: /\\(else|loop|repeat|@ifpackageloaded|if?(case|cat|dim|eof|false|[hvm]mode|inner|num|odd|true|void|x)|if@[a-zA-Z@_]{0,15}|if[a-zA-Z@_]{0,15}|[a-zA-Z@_]{1,25}true|[a-zA-Z@_]{1,25}false|if|or|fi)\b/
    },
    {
      className: "section",
      begin: /\\(csname|endcsname)\b/
    },
    {
      className: "title",
      begin: /\\(documentclass|usepackage|begin|end)\b/
    }
  ];
  const INTERNAL_QUANTITY = [
    { // primitive constants for lengths
      className: "meta keyword",
      begin: /\\(baseline(skip|stretch)|(above|below|inter)display(shortskip|skip)|columnsep|columnwidth|evensidemargin|linewidth|oddsidemargin|paperwidth|paperheight|(?:no|display|par|hang|text)indent|indent|(line)skiplimit|(?:parfill|par|splittop|top|left|right|line|tab|xspace|space)skip|(thin|med|thick)muskip|muskip|tabcolsep|textheight|textwidth|topmargin|unitlength)\b/
    },
    { // badness
      className: "meta keyword",
      begin: /\\([hv]badness|badness|(cat|sf|lc|uc)code|inputlineno|font|fontdimen|nullfont|lastskip|hyphenchar|deadcycles|lastkern|delcode|mathcode|script?font|skewchar|textfont|pagedepth|pagefil{1,3}stretch|pagegoal|pageshrink|pagestretch|pagetotal|parshape|prevgraf|spacefactor|lastpenalty|(off|no)interlineskip)\b/
    },
    { // penalties
      className: "meta.keyword",
      begin: /\\(penalty|insertpenalties)\b/
    },
    {
      className: "type",
      begin: /\\(counter|count[\da-zA-Z@_]{0,15}|count|dimen@[\da-zA-Z@_]{0,15}|dimen[@\d]{0,3}|dimen|muskip|skip[\d@]{1,3}|skip|toks[\d@]{1,3}|toks|accent[\d@]{0,15}|accent)\b/
    },
    {
      className: "meta keyword",
      begin: /\\new?(if|length|box|counter|count|dimen|muskip|skip|toks)\b/
    },
    {
      className: "property",
      begin: /\\set(to(width|height|depth)|length|box|counter|count|dimen|muskip|skip|toks)\b/
    }
    // {
    //     className: 'type',
    //     begin: /\\()/
    // }
  ];
  const BUILTIN_CS = [
    // Font control
    { className: "property", begin: /\\text(tt|bf|sf|sl|it|rm)\b/ },
    { className: "property", begin: /\\(ttfamily|sfshape|slshape|itshape|bfseries|rmshape)\b/ },
    { className: "property", begin: /\\(tt|sf|sl|it|bf|rm)\b/ },
    // Font size
    { className: "property", begin: /\\((script|footnote|normal)size|[lL]arge|LARGE|[hH]uge|tiny|small)\b/ }
  ];
  const TEX_SPACING_CS = [
    {
      className: "meta keyword",
      begin: /\\([hv]top|[hvmfp]box|un[hv]box|[hv]ss|[hv]size|[hv]skip|[hv]space|[hv]fil|[hv]fill|par|cr{1,2}|(small|med|large)skip|\\)\b/
    }
  ];
  const CONTROL_SEQUENCE = {
    className: "keyword",
    begin: /\\/,
    relevance: 0,
    contains: [
      {
        endsParent: true,
        begin: TEX_PRIMITIVES
      },
      {
        endsParent: true,
        begin: ETEX_PRIMITIVES
      },
      {
        endsParent: true,
        begin: PDFTEX_PRIMITIVES
      },
      {
        endsParent: true,
        begin: XETEX_PRIMITIVES
      },
      {
        endsParent: true,
        begin: LUATEX_PRIMITIVES
      },
      {
        endsParent: true,
        begin: KNOWN_CONTROL_WORDS
      },
      {
        endsParent: true,
        begin: L3_REGEX
      },
      {
        endsParent: true,
        variants: DOUBLE_CARET_VARIANTS
      },
      {
        endsParent: true,
        relevance: 0,
        variants: L2_VARIANTS
      }
    ]
  };
  const MACRO_PARAM = {
    className: "params",
    relevance: 0,
    begin: /#+\d?/
  };
  const DOUBLE_CARET_CHAR = {
    // relevance: 1
    variants: DOUBLE_CARET_VARIANTS
  };
  const SPECIAL_CATCODE = {
    className: "built_in",
    relevance: 0,
    begin: /[$&^_]/
  };
  const MAGIC_COMMENT = {
    className: "meta",
    begin: /% ?!(T[eE]X|tex|BIB|bib)/,
    end: "$",
    relevance: 10
  };
  const COMMENT = hljs.COMMENT(
    "%",
    "$",
    { relevance: 0 }
  );
  const EVERYTHING_BUT_VERBATIM = [
    ARITHMETIC_CS, FUNCTION_CS, BUILTIN_CS, TEX_SPACING_CS,
    INTERNAL_QUANTITY,
    CONTROL_SEQUENCE,
    MACRO_PARAM,
    DOUBLE_CARET_CHAR,
    SPECIAL_CATCODE,
    MAGIC_COMMENT,
    COMMENT
  ];
  const BRACE_GROUP_NO_VERBATIM = {
    begin: /\{/,
    end: /\}/,
    relevance: 0,
    contains: [
      "self",
      ...EVERYTHING_BUT_VERBATIM
    ]
  };
  const ARGUMENT_BRACES = hljs.inherit(
    BRACE_GROUP_NO_VERBATIM,
    {
      relevance: 1,
      endsParent: true,
      contains: [
        BRACE_GROUP_NO_VERBATIM,
        ...EVERYTHING_BUT_VERBATIM
      ]
    }
  );
  const ARGUMENT_BRACKETS = {
    begin: /\[/,
    end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [
      BRACE_GROUP_NO_VERBATIM,
      ...EVERYTHING_BUT_VERBATIM
    ]
  };
  const SPACE_GOBBLER = {
    begin: /\s+/,
    relevance: 0
  };
  const ARGUMENT_M = [ARGUMENT_BRACES];
  const ARGUMENT_O = [ARGUMENT_BRACKETS];
  const ARGUMENT_AND_THEN = function(arg, starts_mode) {
    return {
      contains: [SPACE_GOBBLER],
      starts: {
        relevance: 0,
        contains: arg,
        starts: starts_mode
      }
    };
  };
  const CSNAME = function(csname, starts_mode) {
    return {
      begin: "\\\\" + csname + "(?![a-zA-Z@:_])",
      keywords: {
        $pattern: /\\[a-zA-Z]+/,
        keyword: "\\" + csname
      },
      relevance: 0,
      contains: [SPACE_GOBBLER],
      starts: starts_mode
    };
  };
  const BEGIN_ENV = function(envname, starts_mode) {
    return hljs.inherit(
      {
        begin: "\\\\begin(?=[ \t]*(\\r?\\n[ \t]*)?\\{" + envname + "\\})",
        keywords: {
          $pattern: /\\[a-zA-Z]+/,
          keyword: "\\begin"
        },
        relevance: 0
      },
      ARGUMENT_AND_THEN(ARGUMENT_M, starts_mode)
    );
  };
  const VERBATIM_DELIMITED_EQUAL = (innerName = "string") => {
    return hljs.END_SAME_AS_BEGIN({
      className: innerName,
      begin: /(.|\r?\n)/,
      end: /(.|\r?\n)/,
      excludeBegin: true,
      excludeEnd: true,
      endsParent: true
    });
  };
  const VERBATIM_DELIMITED_ENV = function(envname) {
    return {
      className: "string",
      end: "(?=\\\\end\\{" + envname + "\\})"
    };
  };

  const VERBATIM_DELIMITED_BRACES = (innerName = "string") => {
    return {
      relevance: 0,
      begin: /\{/,
      starts: {
        endsParent: true,
        contains: [
          {
            className: innerName,
            end: /(?=\})/,
            endsParent: true,
            contains: [
              {
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ["self"]
              }
            ]
          }
        ]
      }
    };
  };
  const VERBATIM = [
    ...[
      "verb",
      "lstinline"
    ].map(csname => CSNAME(csname, { contains: [VERBATIM_DELIMITED_EQUAL()] })),
    CSNAME("mint", ARGUMENT_AND_THEN(ARGUMENT_M, { contains: [VERBATIM_DELIMITED_EQUAL()] })),
    CSNAME("mintinline", ARGUMENT_AND_THEN(ARGUMENT_M, {
      contains: [
        VERBATIM_DELIMITED_BRACES(),
        VERBATIM_DELIMITED_EQUAL()
      ]
    })),
    CSNAME("url", {
      contains: [
        VERBATIM_DELIMITED_BRACES("link"),
        VERBATIM_DELIMITED_BRACES("link")
      ]
    }),
    CSNAME("hyperref", { contains: [VERBATIM_DELIMITED_BRACES("link")] }),
    CSNAME("href", ARGUMENT_AND_THEN(ARGUMENT_O, { contains: [VERBATIM_DELIMITED_BRACES("link")] })),
    ...[].concat(...[
      "",
      "\\*"
    ].map(suffix => [
      BEGIN_ENV("verbatim" + suffix, VERBATIM_DELIMITED_ENV("verbatim" + suffix)),
      BEGIN_ENV("filecontents" + suffix, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV("filecontents" + suffix))),
      ...[
        "",
        "B",
        "L"
      ].map(prefix =>
        BEGIN_ENV(prefix + "Verbatim" + suffix, ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV(prefix + "Verbatim" + suffix)))
      )
    ])),
    BEGIN_ENV("minted", ARGUMENT_AND_THEN(ARGUMENT_O, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV("minted"))))
  ];

  return {
    name: "LaTeX",
    aliases: ["tex"],
    contains: [
      ...VERBATIM,
      ...EVERYTHING_BUT_VERBATIM
    ]
  };
}

export default latex;
  