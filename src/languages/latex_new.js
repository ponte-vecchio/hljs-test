/*
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Contributor: ponte-vecchio <zkogdxdkur@p.monash.edu>
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
		"(?:documentclass|usepackage)",
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
		"if(?:case|cat|dim|eof|[hv]mode|[hv]box|inner|true|num|odd|void|x)",
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
	// const DOUBLE_CARET_VARIANTS = [
	// 	{ className: "char escape", begin: /\^{6}[0-9a-f]{6}/ },
	// 	{ className: "char escape", begin: /\^{5}[0-9a-f]{5}/ },
	// 	{ className: "char escape", begin: /\^{4}[0-9a-f]{4}/ },
	// 	{ className: "char escape", begin: /\^{3}[0-9a-f]{3}/ },
	// 	{ className: "char escape", begin: /\^{2}[0-9a-f]{2}/ },
	// 	// { className: "char escape", begin: /\\(\^\^[a-zA-Z\d!@#$%^&*(){}_\[\]\\\/ .;:<>=?|]{1,2})/},
	// 	// { className: "char escape", begin: /\b\\\^{2}[A-Z^_!@#$%&*()\[\]{}~`]\b/ },
	// 	// escaped tokens
	// 	// { className: "char escape", begin: /\b`[a-zA-Z\d!@#$%^&*(){}_\[\]\\\/ .;:<>=?|]\b/ },
	// ];
	const ARITHMETIC_CS = [
		// just numbers
		{ className: "number", begin: /(?:\d+?(\.\d+)|\d+|\.\d+)\b/ },
		// number + dimen
		{
			className: "number",
			begin: /((?:\d+\.\d+|\d+|\.\d+)(?:p[tc]|([bs]p)|in|([cm]m)|dd|cc|e[xm]|m(?:uh|u)|fil{1,3}))/
		},
		{ // arg + number
			className: "number",
			begin: /((?:(?:pl|min)us|height|(?:dep|wid)th|to)(?:\d+|\d+\.\d+|\.\d+))/
		},
		{ // arg + number + dimen
			className: "number",
			begin: /(?:(?:pl|min)us|height|(?:dep|wid)th|to)?(?:\d+|\d+\.\d+|\.\d+)(?:(p[tc])|([bs]p)|in|([cm]m)|dd|cc|(e[xm])|m(?:uh|u)|fil{1,3})?/
		},
		//  hexadecimal
		{ className: "number", begin: /("+[\dA-F]{2,8})\b/ },
		// ' for octal
		{ className: "number", begin: /('+[0-7]{2,8})\b/ },
		// operators
		{ className: "operator", begin: /=/ },
		{ className: "operator", begin: /(!`(?:&{1,5}?(=)|\+|-|\*|\/|\|>|<|!|\?|:|^))/ },
		{ className: "operator", begin: /\\(?:plus|minus|multiply|divide)\b/ },
		{ className: "number", begin: /(?:plus|minus|multiply|divide)\b/ }
	];
	const FUNCTION_CS = [
		{
			className: "builtin",
			begin: /\\(?:the[a-zA-Z@_]{3,25}|a-z]{3}expr|expandafter|makeat(?:lett|oth)er|protected|string|long|the|leaders|end)\b/
		},
		{ // file I/O & Debugging
			className: "meta string",
			begin: /\\((?:open|close)(?:in|out)|inputlineno|(?:out|endin|in)put|read|write?(:\d{1,2})|write|typeout|immediate|shipout|(super)?eject|bye)\b/
		},
		{
			className: "meta string",
			begin: /\\(?:tracing(?:commands|lostchars|macros|online|output|pages|paragraphs|restores|stats)|show(?:box(?:breadth|depth)|box|lists|the)|show|(?:split|box)?maxdepth|err(?:message|help)|error(?:contextlines|stopmode)|meaning|message|pausing|(?:batch|scroll)mode)\b/
		},
		{ // Macro builtins
			className: "builtin",
			begin: /\\(?:(?:csname|mathchar|char|count|(mu)?skip|toks|dimen|([xeg]))?def|global|outer|futurelet|(?:begin|end|[be])group|(end)?csname|relax|future|let|advance|undefined|(un)?([hv])?copy|[o@]penup)\b/
		},
		{ // Logical builtins
			className: "title function",
			begin: /\\(?:else|@ifpackageloaded|if(?:case|cat|dim|eof|false|[hvm]mode|inner|num|odd|true|void|x)|if([a-zA-Z_]|@){0,15}|if|or|fi)\b/,
			relevance: 1
		},
		{ // Logical Macros
			className: "variable constant",
			begin: /\\(?:loop|repeat|next|iterate|[a-zA-Z@_]{1,25}true|[a-zA-Z@_]{1,25}false|every?(?:cr|display|[hv]box|job|math|par))\b/
		},
		{
			className: "meta keyword",
			begin: /\\(?:documentclass|usepackage|begin|end)\b/
		}
	];
	const INTERNAL_QUANTITY = [
		{ // primitive constants for lengths
			className: "property",
			begin: /\\((?:baseline|line)(?:skiplimit|skip|stretch|s)|(?:above|below|inter)display(?:shortskip|skip)|columnsep|columnwidth|evensidemargin|linewidth|oddsidemargin|paperwidth|paperheight|(?:no|display|par|hang|text)indent|indent|(?:parfill|par|(split)?top|left|right|(base)?line|tab|(x)?space)skip|(?:thin|med|thick)muskip|tabcolsep|textheight|textwidth|topmargin|unitlength|jot)\b/
		},
		{ // Character types
			className: "type",
			begin: /\\((?:math|cat|sf|[lu]c)code|(?:lower|upper)case|string|romannumeral|number|(?:end|new)linechar|mathchar|char|accent)\b/
		},
		{
			className: "property",
			begin: /\\(?:[hv]badness|badness|inputlineno|fontdimen|font|nullfont|lastskip|(?:left|right|ex)?hyphen?(min)|hyphenchar|deadcycles|delcode|skewchar|textfont|pagedepth|pagefil{1,3}stretch|page(?:shrink|stretch|total|goal)|parshape|prevgraf|spacefactor|(?:off|no)interlineskip|normal(?:baseline|line)(?:skiplimit|skip)|ht|dp|wd)\b/
		},
		{ // penalties, tolerances, demerits
			className: "property",
			begin: /\\(?:(?:last|(inter){0,1}line|(?:left|right|ex)?hyphen?(min)|binop|rel|club|(display)?widow|(?:pre|post)display|broken|floating|output|inter(?:display|footnote)line)?penalty|insertpenalties|(pre)?tolerance|(?:(?:double|final)hyphen|adj)demerits)\b/
		},
		{ // Registers
			className: "type",
			begin: /\\(?:counter|count[@\d]{0,3}|count[@\da-zA-Z]{1,10}|dimen[@\da-zA-Z]{1,10}|dimen|skip[\d@]{1,3}|(?:mu|hide|m)?skip|toks[\d@]{1,3}|toks|mathaccent|accent?([\d@]{1,3})|box|(?:tt|sl|bf|it)?fam|language|char?([@\d]{0,3}))/
		},
		{ // new IQs
			className: "meta keyword",
			begin: /\\new(?:if|help|length|box|counter|count|dimen|muskip|skip|toks|read|write|fam|language|insert)/
		},
		{ // remove IQs
			className: "meta keyword",
			begin: /\\remove(?:if|help|length|box|counter|count|dimen|muskip|skip|toks|read|write|fam|language)\b/
		},
		{ // set IQs
			className: "meta keyword",
			begin: /\\set(?:to(?:width|height|depth)|length|box|counter|count|dimen|muskip|skip|toks)/
		}
		// {
		//     className: 'type',
		//     begin: /\\()/
		// }
	];
	const BUILTIN_CS = [
		// Font control
		{ className: "type", begin: /\\(?:(?:script){1,2}|text)font/ },
		{ className: "type", begin: /\\text(?:tt|bf|sf|sl|it|rm)\b/ },
		{ className: "type", begin: /\\(?:ttfamily|sfshape|slshape|itshape|bfseries|rmshape)\b/ },
		{ className: "type", begin: /\\(?:mit|cal|tt|sf|sl|it|bf|rm)\b/ },
		{ className: "title function", begin: /\\Make(?:Upper|Lower)case/ },
		{ className: "builtin", begin: /\\(?:[lr](?:q|brack|matho(?:rd|p))|leavevmode)\b/ },
		// Font size
		{ className: "property", begin: /\\(?:(?:script|footnote|normal)size|[lL]arge|LARGE|[hH]uge|tiny|small)\b/ },
		// Positioning
		{ className: "property", begin: /\\(?:centering|[hv]phantom|phantom|raise|lower)\b/ },
		// Misc
		{ className: "string", begin: /\\(?:copyright|A[AE]|a[ae]|OE|oe|ss|[iOlLHvut])\b/ },
		// Maths - primitives
		{
			className: "property",
			begin: /\\(mathhexbox([@\dA-F]{0,3})|mathhexbox|m@th)\b/
		},
		{
			className: "string",
			relevance: 1,
			begin: /\\(?:(?:[Ll]eft|[Rr]ight|[Ll]ong|over|hook)?(?:leftright|right|left)?arrow|(?:left|right)harpoon(?:down|up)|[ij]math|partial|(?:over|under)brace|emptyset|[bB]ig{1,2}([lrm])?|[bB]ig{1,2}|r[o@]{2}t|brac[ke]|[rl](?:moustache|group|brace|floor|ceil|hook|lap)|(?:[bn]|ln)ot|hbar|top|bigtriangle(?:down|up)|triangle(?:right|left)|(?:tri|[rl])?angle|(?:[aA]rrow|brace)vert|(?:[uU]p(down)?|[dD]own)arrow|forall|backslash|exists|natural|(?:diamond|club|spade|heart)suit|parallel|bullet|diamond|setminus|joinrel|[rR]elbar|mapstochar|smallint|(?:oi|i)(?:ntop|nt)|coprod|big(?:wedge|vee|[ou](?:times|plus|dot)|(?:times|c[ua]p|dot)|sqcup|circ)|(?:sim|succ|prec)(eq)?|[ou](?:slash|times|minus|plus)|[co]dot|sq(?:c[au]p|su[bp]seteq)|su[bp](?:seteq|set)|c[au]p|nolimits|bowtie|choose|n@space|(?:(script){1,2}|display)style|([sn][we])arrow|[lgn](?:eq|or|and|e)|([dchvlr])?dot([sp])?|models|approx|right|left|doteq|equiv|perp|aleph|amalg|prime|nabla|infty|wedge|times|asymp|smile|sqrt|colon|frown|check|smash|dashv|vdash|skew|sharp|owns|[vV]ert|circ|star|surd|flat|gets|prod|sum|[gl]{2}|[pm]{2}|d(?:(d)?ag(ger)?|iv)|(wide)?(?:tilde|hat|breve|acute|grave|bar)|ve[ce]|ast|ell|mid|neg|w[pr]|Re|Im|ni|in|(?:prop|(?:long|set)?maps)?to|over|atop|iff|mathrel|[SPcbd]|Orb|TeX)\b/
		},
		{ // Maths - Operators
			className: "string",
			begin: /\\(?:l(?:og|im(?:sup|inf)?|n)|brace[lrud]{2}|arc(?:sin|cos|tan)|(?:sin|co[st]|tan)(h)?|(?:cs|se)c|m(?:ax|in)|sup|inf|arg|rad|de[gt]|ker|dim|hom|exp|gcd|Pr)\b/
		},
		{ // Maths - Greek primitives
			className: "string",
			begin: /\\(?:alpha|(?:[bB]|[zZ]|[tT]h)?eta|[gG]amma|[dD]elta|[lL]ambda|[eEuU]psilon|[iI]ota|[kK]appa|[mMnN]u|(?:[pP]s|[pP]|[xX]|[pPcC]h|var(?:ph|p))i|var(?:epsilon|theta|sigma|rho)|[rR]ho|[sS]igma|[oO]mega|[tT]au)\b/
		}
	];
	const TEX_SPACING_CS = [
		{
			className: "property",
			begin: /\\(?:(?:(non)?french|normal)spacing|[hv](?:glue|top|size|filneg|fil{1,2}|fuzz|ss)|[hvmfp]box|un[hv]box|par|(?:small|large|last|[eu]n|med|big|[hvm])(?:skipamount|skip)|displaywidth|(?:[hv]|negthin|thin|en)space|q{1,2}uad|space|empty|null|(end)?graf)\b/
		},
		{ // tables
			className: "property",
			begin: /\\(?:everycr|(cr){1,2}|(?:o{1,2}|no|[hvi])align|omit|strut|span|tabskip|sh@ft|hidewidth)\b/
		},
		{ // breaks
			className: "property",
			begin: /\\((?:no|allow|small|med|big)break|break|endline)\b/
		},
		{ // special break
			className: "literal",
			relevance: 1,
			begin: /!(`)\\(?:s[pb]|,|;|!)\b/
		},
		{ // fills and rules
			className: "property",
			begin: /\\(?:(?:[hv]rule|(?:right|left)arrow|(?:up|down)brace|dot)fill|[hv]rule)\b/
		}
	];
	const SPECIAL_ESCAPES = [
		{ // ^^
			className: "char escape",
			relevance: 1,
			begin: /(\\)?\^{2}[a-zA-Z@\[\]\\^_?]/
		}
	];
	const PRIMITIVES = {
		className: "literal",
		begin: /\\/,
		relavance: 0,
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
			}
		]
	};
	const CONTROL_SEQUENCE = {
		className: "keyword",
		begin: /\\/,
		relevance: 0,
		contains: [
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
				variants: SPECIAL_ESCAPES
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
		// relevance: 0,
		variants: SPECIAL_ESCAPES
	};
	const SPECIAL_CATCODE = {
		className: "operator",
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
		ARITHMETIC_CS,
		FUNCTION_CS,
		BUILTIN_CS,
		TEX_SPACING_CS,
		SPECIAL_ESCAPES,
		INTERNAL_QUANTITY,
		CONTROL_SEQUENCE,
		PRIMITIVES,
		MACRO_PARAM,
		// DOUBLE_CARET_CHAR,
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
			relevance: 0,
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
			begin: "\\\\" + csname + "(?![\da-zA-Z@:_])",
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
				className: "meta",
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
	const MATHMODE_DELIITED = (innerName = "literal") => {
		return hljs.END_SAME_AS_BEGIN({
			className: "char escape",
			relevance: 1,
			begin: /(.\${1,2}\r?\n)/,
			end: /(.\${1,2}\r?\n)/,
			excludeBegin: true,
			excludeEnd: true,
			endsParent: true
		});
	};
	const VERBATIM_DELIMITED_EQUAL = (innerName = "literal") => {
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

	const VERBATIM_DELIMITED_BRACES = (innerName = "literal") => {
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
			"verb", "verbatim", "verbatim*",
			"lstinline", "lstlisting", "lstlisting*"
		].map(csname => CSNAME(csname, { contains: [VERBATIM_DELIMITED_EQUAL(), MATHMODE_DELIITED()] })),
		CSNAME("mint", ARGUMENT_AND_THEN(ARGUMENT_M, { contains: [VERBATIM_DELIMITED_EQUAL(), MATHMODE_DELIITED()] })),
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
  