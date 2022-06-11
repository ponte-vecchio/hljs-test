---
title: "filetools.tex"
author: "plante3"
date: "2021-12-04"
slug: "plante_filetools"
tag: "TeX"
description: "plante's filetools"
---

```latex
%% Requires \verbdef!

%% Sample colors
%%     \usepackage{xcolor}
%%     \definecolor{bd}{RGB}{50, 52, 48}
%%     \definecolor{bg}{RGB}{245, 245, 245}
%%     \definecolor{bl}{RGB}{176, 176, 176}
%%     \definecolor{bt}{RGB}{224, 224, 224}
%%     \definecolor{ge}{RGB}{94, 139, 79}
%%     \definecolor{sge}{RGB}{42, 185, 72}
%%     \definecolor{gr}{RGB}{172, 65, 66}
%%     \definecolor{gb}{RGB}{90, 129, 155}
%%     \definecolor{gy}{RGB}{204, 151, 90}

\newcount\tmpCa \newcount\tmpCb \newcount\tmpCc \newread\tmpIa \newwrite\tmpOa

\catcode`*=3

\long\edef\ssvarg#1#2{\noexpand\@ssvarg#1#2 \noexpand\@nnil\space}
\long\def\@ssvarg#1#2 {%
\ifx\@nnil#2\empty \expandafter\@gobbletwo \else
#1{#2}\fi \@ssvarg#1%
}

\long\def\normalizesp#1{\@normalizesp#1 \@nil}
\long\def\@normalizesp#1 #2{\ifx\@nil#2\empty \tofi{#1}\else \afterfi\@normalizesp#1\@nsp#2\fi}

\long\def\len#1{\expandafter\@len\romannumeral-`0\normalizesp{0#1}\@nil}
\long\def\@len#1#2{\ifx\@nil#2\empty #1\else \expandafter\afterfi \expandafter\@len\expandafter{\the\numexpr#1+1}\fi}

\long\def\ifempty#1{\if@mpty#1**@@\@nil}
\long\def\if@mpty#1#2*#3#4\@nil{#3#4}
\long\def\isempty#1{\if\ifempty{#1}\expandafter\@firstoftwo \else \expandafter\@secondoftwo \fi}

\protected\def\@cslet#1{\expandafter\let\csname#1\endcsname}

\def\@secondoftwo@fi{\fi\@secondoftwo}
\def\@firstoftwo@fi{\fi\@firstoftwo}
\def\@@fi{\fi}
\long\def\afterfi#1\fi{\fi#1}
\long\def\tofi#1#2\fi{\fi#1}
\def\@stripast#1*{#1}
\long\def\tonil#1#2\@nnil{#1}

\font\@finfo=cmtex8

\protected\long\def\isin#1#2{%
\isin@init#2%
\let\@isini\@isins
\@isin#1#2%
}
\protected\long\def\isin@init#1{\@isinset\@isins#1{\ifx*##2\tonil\@secondoftwo@fi\else\tonil\@firstoftwo@fi\fi}}
\protected\long\def\replacein#1#2#3{%
\replacein@init#2{#3}%
\let\@isini\@isinr
\@isin#1#2%
}
\protected\long\def\replacein@init#1#2{%
\@isinset\@isinr#1{\ifx*##2\tonil{##1\@stripast##2\@@fi}\else##1#2\afterfi\@isinr##2\fi}%
}
\protected\def\@isinset#1#2{\long\expandafter\def\expandafter#1\expandafter##\expandafter1#2##2}
\long\def\@isin#1#2{%
\expandafter\expandafter\expandafter\@isini
\expandafter\expandafter\expandafter{\expandafter\expandafter\expandafter}\expandafter#1\expandafter{\expandafter}#2*\@nnil
}

\catcode`*=12

\long\def\@fileread#1#2#3#4#5{%
\begingroup\immediate\openin\tmpIa{\romannumeral-`0#1}\tt
\ifeof\tmpIa #5\immediate\closein\tmpIa\endgroup \expandafter\@gobble \else \expandafter\@firstofone \fi
{#3%
\@sanitizex \endlinechar\m@ne \tmpCa\z@
\loop
\immediate\read\tmpIa to\@lastline
\ifeof\tmpIa \else
\advance\tmpCa\@ne#2%
\repeat
#4\immediate\closein\tmpIa \endgroup
}%
}

\def\filelines#1{\@fileread{#1}{}{}{\the\tmpCa}{-1}}
\def\filechars#1{\@fileread{#1}{\advance\tmpCb\@ne \advance\tmpCb\expandafter\len\expandafter{\@lastline}\relax}{\tmpCb\z@}{\the\tmpCb}{-1}}

\def\fileprint{\@ifnextchar[\@fileprint@range\@fileprint}
\def\@fileprint#1{%
\endgraf\@fileread{#1}%
\@fileread@line{\@fileread@linespace}{}{-1}%
}
\def\@fileprint@range[#1-#2]#3{%
\endgraf
\@fileread{#3}{\ifnum\tmpCb<\tmpCa \tmpa \fi}{%
\@fileread@linespace
\tmpCb\numexpr#1-1\relax
\isempty{#2}{%
\let\tmpa\@fileread@line
}{%
\tmpCc\numexpr#2+1\relax
\def\tmpa{\ifnum\tmpCc>\tmpCa \@fileread@line \fi}
}%
}{}{-1}%
}

\def\pdfnocopy#1{%
\pdfliteral page{/Span<</ActualText()>> BDC}%
#1%
\pdfliteral page{EMC}%
}
\def\@fileread@line{%
\raggedright\hangindent3em\hangafter\@ne
\noindent\strut\llap{\@finfo\color{bl}\pdfnocopy{\the\tmpCa}\kern\p@}\quad
\expandafter\@fline \@lastline \@nnil
\endgraf
}
\def\@fileread@linespace{\parskip\z@}

%% Search for text in file.
\protected\def\filesearch{\begingroup\@fsearchfalse\let\verbdefhook\@filesearch\verbdef*\@target}
\newif\if@fsearch
\def\@filesearch#1{%
\ifx\@target\@empty \@toendgroup{\@@fi\fileprint{#1}}\fi
\@fileread{#1}{%
\@isin \@lastline\@target
{\@fsearchswitch
\begingroup
\let\@isini\@isinr
\edef\@lastline{\@isin \@lastline\@target}%
\@fileread@line
\endgroup
}{}%
}{%
\@fileread@linespace
\isin@init\@target
\replacein@init\@target{{\relax{{\@fhl@target\@target}}}}%
\let\@isini\@isins
}{\if@fsearch\else0\fi}{-1\@fsearchswitch}%
\endgroup
}
\def\@fsearchswitch{\endgraf\@fsearchtrue\let\@fsearchswitch\relax}
%% Syntax highlighting.
\begingroup
\lccode`+`\ %
\lccode`!`\\
\lccode`-`\%
\lccode`?`\^^I
\lccode`:`\#
\lccode`[`\{
\catcode`*\thr@@
\lowercase{\endgroup
\def\@fline#1{%
\ifx\@nnil#1\empty \expandafter\@gobble \else
\penalty\z@
\ifx+#1\copy\invispace \else
\ifx?#1\copy\invistab \else
\ifx-#1\@fcomment\fi
\ifx!#1\@fescape\fi
\ifx:#1\@fparam\fi
#1%
\fi\fi
\fi \@fline
}
\def\@fline@#1{%
\ifx\@nnil#1\empty \expandafter\@gobble \else
\penalty\z@
\ifx+#1\relax \copy\invispace\else#1\fi
\fi \@fline@
}
\def\@fescape#1\@fline{\fi\fi\fi\fi \@fescape@*}
\def\@fescape@#1*#2{%
\ifx\@nnil#2\empty \@fhl@cs{#1}\@fescape@end\else
\ifx!#2\@fescape@sy{#1}!\fi
\ifx+#2\@fescape@sy{#1}+\fi
\ifx-#2\@fescape@sy{#1}-\fi
\ifx:#2\@fescape@sy{#1}:\fi
\if\ifempty{#2}\@fescape@break{\@fhl@cs{#1}\tonil{}}\fi
%% Intervening material (such as highlighted text).
\if\relax\@car#2\@nil\relax\@fhl@cs{#1}\@fescape@break{#2\@fline}\fi
\ifcase\uccode`#2\@fhl@cs{#1}\@fescape@break{\@fline#2}\fi
\fi \@fescape@#1#2*%
}
\def\@fescape@end#1*{\fi}
\def\@fescape@sy#1#2#3*{\fi\fi
\isempty{#1}{!#2\@fline}{%
\@fhl@cs{#1}\@fline#2}%
}
\def\@fescape@s#1#2#3*{\fi\fi\@fhl@cs{#1}#2}
\def\@fescape@break#1#2*{\fi\fi#1}
\def\@fhl@cs#1{%
\begingroup
\ifcsname @fhl/#1\endcsname
\csname @fhl/#1\endcsname
\else
\expandafter\ifpdfprimitive\csname#1\endcsname
\@fhl@primitive
\fi
\fi
!#1%
\endgroup
}
\def\@fparam#1\@fline{\fi\fi\fi\fi\begingroup\@fhl@parameter:\@fparam@}
\def\@fparam@#1{%
\ifx:#1\relax :\else
\ifnum\z@<0#1\relax #1\@fparam@break@i
\else \ifx[#1\relax [\@fparam@break@ii{}%
\else \@fparam@break@ii{#1}\fi\fi
\fi \@fparam@
}
\def\@fparam@break@i#1\@fparam@{\fi\fi\endgroup\@fline}
\def\@fparam@break@ii#1#2\@fparam@{\endgroup\fi\fi\fi\@fline#1}
\def\@fcomment#1\@fline#2\@nnil{\fi\fi\fi\fi\textcolor{bl}{\slshape-\@fline@#2\@nnil}}
\protected\def\nofhl{\def\@fhl@cs{!\@firstofone}\let\@fparam\relax}
}

\protected\def\@fhl@target{\color{sge}}
\protected\def\@fhl@primitive{\color{ge}}
\protected\def\@fhl@parameter{\color{gy}}
\newbox\invispace \newbox\invistab
\setbox\invispace\hbox{\textcolor{bt}{\tt\char`\ }}
\setbox\invistab\hb@xt@4\wd\invispace{\textcolor{bt}{%
\hss
$\vcenter{\pdfliteral{q .4 w 1 j -.8 -1 m -.8 1 l .8 0 l b Q}}\m@th$%
\hss
}}%

\protected\def\fhlfam#1{%
\def\tmpa{#1}\def\tmpb##1{\@cslet{@fhl/##1}\tmpa}%
\ssvarg\tmpb
}
\fhlfam{\color{gr}}{%
if ifcat ifnum ifdim
ifodd ifvmode ifhmode ifmmode
ifinner ifvoid ifhbox ifvbox
ifx ifeof iftrue iffalse
ifcase ifdefined ifcsname iffontchar
ifpdfabsnum ifpdfabsdim ifincsname ifpdfprimitive
unless else fi%% <-- Do not remove.
}
%% These require a nonzero \uccode`@ to work!
\fhlfam{\color{gb}}{%
@namedef @nameuse @ifnextchar @ifstar
@dblarg @ifundefined @ifdefinable @cons
@car @cdr @nil @nnil
@gobble @gobbletwo @gobblethree @gobblefour
@firstofone @iden @firstoftwo @secondoftwo
fi@firstoftwo fi@secondoftwo @xp @undefined
m@ne z@ z@skip p@ @ne tw@ thr@@ sixt@@n @cclv @cclvi
@m @M @Mi @Mii @Miii @Miv @MM
count@ dimen@ dimen@i dimen@ii skip@ toks@ maxdimen
box@ copy@ wd@ ht@ dp@
space @spaces bgroup egroup endgraf endline csstring
empty @empty loop iterate repeat replicate next do
newcount newdimen newskip newmuskip
newbox newhelp newtoks newread
newwrite newfam newlanguage newinsert newif
optdef stardef eoldef verbdef
makeatletter makeatother dospecials other active @sanitize @sanitizex protect
documentclass usepackage RequirePackage
newcommand renewcommand providecommand
newenvironment renewenvironment%
}%

\protected\def\texfhl{%
\fhlfam{\@fhl@primitive}{%
input par end - / everymath everydisplay underline shipout
%% standalone.cls
output mark insert%
}%
\uccode`@\@ne
}
\protected\def\explfhl{%
\uccode`_\@ne\uccode`:\@ne\uccode`@\@ne
}

\protected\def\filewrite{\begingroup\let\verbdefhook\@filewrite\verbdef*\tmpa}
\def\@filewrite#1{%
\immediate\openout\tmpOa{\romannumeral-`0#1}%
\newlinechar\endlinechar
\immediate\write\tmpOa{\tmpa}%
\immediate\closeout\tmpOa
\endgroup
}
```