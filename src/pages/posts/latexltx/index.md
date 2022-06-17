---
title: "LaTeX.ltx"
author: "ponte-vecchio"
date: "2022-06-15"
slug: "latexltx"
tag: "LaTeX"
description: "Excerpts from latex.ltx"
---

```latex
%%% From File: ltdirchk.dtx
%% ---- START temporary definitions for bootstrapping; later overwritten ----
\ifnum\catcode`\{=1
    \errmessage
        {LaTeX must be made using an initex with no format preloaded}
\fi
\catcode`\{=1
\catcode`\}=2
\ifx\directlua\undefined
\else
    \ifx\luatexversion\undefined
        \directlua{tex.enableprimitives("",%
            tex.extraprimitives('etex', 'pdftex', 'umath'))}
        \directlua{tex.enableprimitives("",%
            tex.extraprimitives("omega", "aleph", "luatex"))}
    \fi
\fi
\ifx\eTeXversion\undefined
    \errmessage
        {LaTeX requires e-TeX}
    \expandafter\endinput
\fi
\catcode`\#=6
\catcode`\^=7
\chardef\active=13
\catcode`\@=11
\countdef\count@=255
\let\bgroup={ \let\egroup=}
\ifx\@@input\@undefined\let\@@input\input\fi
\ifx\@@end\@undefined\let\@@end\end\fi
\chardef\@inputcheck0
\chardef\sixt@@n=16
\newlinechar`\^^J
\def\typeout{\immediate\write17}
\def\dospecials{\do\ \do\\\do\{\do\}\do\$\do\&%
    \do\#\do\^\do\_\do\%\do\~}
\def\@makeother#1{\catcode`#1=12\relax}
\def\space{ }
\def\@tempswafalse{\let\if@tempswa\iffalse}
\def\@tempswatrue{\let\if@tempswa\iftrue}
\let\if@tempswa\iffalse
\def\loop#1\repeat{\def\iterate{#1\relax\expandafter\iterate\fi}%
    \iterate \let\iterate\relax}
\let\repeat\fi
\def\two@digits#1{\ifnum#1<10 0\fi\number#1}
\long\def\@firstoftwo#1#2{#1}
\long\def\@secondoftwo#1#2{#2}
\def\ProvidesFile#1{%
    \begingroup
        \catcode`\ 10 %
        \ifnum \endlinechar<256 %
            \ifnum \endlinechar>\m@ne
                \catcode\endlinechar 10 %
            \fi
        \fi
        \@makeother\/%
        \@ifnextchar[{\@providesfile{#1}}{\@providesfile{#1}[]}}
\def\@providesfile#1[#2]{%
        \wlog{File: #1 #2}%
        \@addtofilelist{ #2}%
    \endgroup}
\long\def\@addtofilelist#1{}
\def\@empty{}
\catcode`\%=12
\def\@percentchar{%}
\catcode`\%=14
\let\@currdir\@undefined
\let\input@path\@undefined
\let\filename@parse\@undefined
\def\strip@prefix#1>{}
\input texsys.cfg
\begingroup
\count@\time
\divide\count@ 60
\count2=-\count@
\multiply\count2 60
\advance\count2 \time
\edef\today{%
    \the\year/\two@digits{\the\month}/\two@digits{\the\day}:%
        \two@digits{\the\count@}:\two@digits{\the\count2}}
\immediate\openout15=texsys.aux
\immediate\write15{\today^^J}
\immediate\closeout15 %
\def\IfFileExists#1#2#3{%
    \openin\@inputcheck#1 %
    \ifeof\@inputcheck
        #3\relax
    \else
        \read\@inputcheck to \reserved@a
        \ifx\reserved@a\today
            \typeout{#1 found}#2\relax
        \else
        \typeout{BAD: old file \reserved@a (should be \today)}%
        #3\relax
    \fi
\fi
\closein\@inputcheck}
\endlinechar=-1
\ifx\@currdir\@undefined
    \IfFileExists{./texsys.aux}{\gdef\@currdir{./}}%
        {\IfFileExists{[]texsys.aux}{\gdef\@currdir{[]}}%
            {\IfFileExists{:texsys.aux}{\gdef\@currdir{:}}{}}}
    \ifx\@currdir\@undefined
        \global\let\@currdir\@empty
        \typeout{^^J^^J%
            !! No syntax for the current directory could be found^^J%
        }%
    \fi
\else
    \IfFileExists{\@currdir texsys.aux}{}{%
        \edef\reserved@a{\errhelp{%
            texsys.cfg specifies the current directory syntax to be^^J%
            \meaning\@currdir^^J%
            but this does not work on this system.^^J%
            Remove texsys.cfg and restart.}}\reserved@a
        \errmessage{Bad texsys.cfg file: \noexpand\@currdir}\@@end}
\fi
\immediate\closeout15 %
\endgroup
\typeout{^^J^^J%
        \noexpand\@currdir set to:
            \expandafter\strip@prefix\meaning\@currdir.^^J%
}
\typeout{^^J%
        Assuming \noexpand\openin and \noexpand\input^^J%
        \ifx\input@path\@undefined
            have the same search path.^^J%
        \else
            have different  search paths.^^J%
            LaTeX will use the path specified by \noexpand\input@path:^^J%
        \fi
        }
\ifx\filename@parse\@undefined
\def\reserved@a{./}\ifx\@currdir\reserved@a
\typeout{^^JDefining UNIX/DOS style filename parser.^^J}
\def\filename@parse#1{%
\let\filename@area\@empty
\expandafter\filename@path#1/\\}
\def\filename@path#1/#2\\{%
\ifx\\#2\\%
\def\reserved@a{\filename@simple#1.\\}%
\else
\edef\filename@area{\filename@area#1/}%
\def\reserved@a{\filename@path#2\\}%
\fi
\reserved@a}
\else\def\reserved@a{[]}\ifx\@currdir\reserved@a
\typeout{^^JDefining VMS style filename parser.^^J}
\def\filename@parse#1{%
\let\filename@area\@empty
\expandafter\filename@path#1]\\}
\def\filename@path#1]#2\\{%
\ifx\\#2\\%
\def\reserved@a{\filename@simple#1.\\}%
\else
\edef\filename@area{\filename@area#1]}%
\def\reserved@a{\filename@path#2\\}%
\fi
\reserved@a}
\else\def\reserved@a{:}\ifx\@currdir\reserved@a
\typeout{^^JDefining Mac style filename parser.^^J}
\def\filename@parse#1{%
\let\filename@area\@empty
\expandafter\filename@path#1:\\}
\def\filename@path#1:#2\\{%
\ifx\\#2\\%
\def\reserved@a{\filename@simple#1.\\}%
\else
\edef\filename@area{\filename@area#1:}%
\def\reserved@a{\filename@path#2\\}%
\fi
\reserved@a}
\else
\typeout{^^JDefining generic filename parser.^^J}
\def\filename@parse#1{%
\let\filename@area\@empty
\expandafter\filename@simple#1.\\}
\fi\fi\fi
\def\filename@simple#1.#2\\{%
\ifx\\#2\\%
\let\filename@ext\relax
\edef\filename@base{#1}%
\else
\filename@dots{#1}#2\\%
\fi}
\def\filename@dots#1#2.#3\\{%
\ifx\\#3\\%
\def\filename@ext{#2}%
\edef\filename@base{#1}%
\else
\filename@dots{#1.#2}#3\\%
\fi}
\def\filename@dot#1.\\{#1}
\else
\typeout{^^J^^J%
\noexpand\filename@parse was defined in texsys.cfg:^^J%
\expandafter\strip@prefix\meaning\filename@parse.^^J%
}
\fi
\ifx\@TeXversion\@undefined
\ifx\@undefined\inputlineno
\def\@TeXversion{2}
\else
{\catcode`\^^J=\active
\def\reserved@a#1#2\@@{\if#1\string^3\fi}
\edef\reserved@a{\expandafter\reserved@a\string^^J\@@}
\ifx\reserved@a\@empty\else\gdef\@TeXversion{3}\fi}
\fi
\fi
%% ---- END temporary definitions for bootstrapping ----
%%% From File: ltplain.dtx
\catcode`\{=1 % left brace is begin-group character
\catcode`\}=2 % right brace is end-group character
\catcode`\$=3 % dollar sign is math shift
\catcode`\&=4 % ampersand is alignment tab
\catcode`\#=6 % hash mark is macro parameter character
\catcode`\^=7 % circumflex and uparrow are for superscripts
\catcode`\_=8 % underline and downarrow are for subscripts
\catcode`\^^I=10 % ascii tab is a blank space
\chardef\active=13 \catcode`\~=\active % tilde is active
\catcode`\^^L=\active \def^^L{\par}% ascii form-feed is \par
\message{catcodes,}
\def\dospecials{\do\ \do\\\do\{\do\}\do\$\do\&%
\do\#\do\^\do\_\do\%\do\~}
\catcode`@=11
\chardef\@ne=1
\chardef\tw@=2
\chardef\thr@@=3
\chardef\sixt@@n=16
\chardef\@cclv=255
\mathchardef\@cclvi=256
\mathchardef\@m=1000
\mathchardef\@M=10000
\mathchardef\@MM=20000
\message{registers,}
\count10=22 % allocates \count registers 23, 24, ...
\count11=9 % allocates \dimen registers 10, 11, ...
\count12=9 % allocates \skip registers 10, 11, ...
\count13=9 % allocates \muskip registers 10, 11, ...
\count14=9 % allocates \box registers 10, 11, ...
\count15=9 % allocates \toks registers 10, 11, ...
\count16=-1 % allocates input streams 0, 1, ...
\count17=-1 % allocates output streams 0, 1, ...
\count18=3 % allocates math families 4, 5, ...
\count19=0 % allocates \language codes 1, 2, ...
\count20=255 % allocates insertions 254, 253, ...
\countdef\insc@unt=20
\countdef\allocationnumber=21
\countdef\m@ne=22 \m@ne=-1
\def\wlog{\immediate\write\m@ne}
\countdef\count@=255
\dimendef\dimen@=0
\dimendef\dimen@i=1 % global only
\dimendef\dimen@ii=2
\skipdef\skip@=0
\toksdef\toks@=0
\def\newcount {\e@alloc\count \countdef {\count10}\insc@unt\float@count}
\def\newdimen {\e@alloc\dimen \dimendef {\count11}\insc@unt\float@count}
\def\newskip  {\e@alloc\skip  \skipdef  {\count12}\insc@unt\float@count}
\def\newmuskip
{\e@alloc\muskip\muskipdef{\count13}\m@ne\e@alloc@top}
\def\newbox   {\e@alloc\box
{\ifnum\allocationnumber<\@cclvi
\expandafter\chardef
\else
\expandafter\e@alloc@chardef
\fi}
{\count14}\insc@unt\float@count}
\def\newtoks  {\e@alloc\toks \toksdef{\count15}\m@ne\e@alloc@top}
\def\newread  {\e@alloc\read \chardef{\count16}\m@ne\sixt@@n}
\ifx\directlua\@undefined
\def\newwrite   {\e@alloc\write \chardef{\count17}\m@ne\sixt@@n}
\else
\def\newwrite   {\e@alloc\write
{\ifnum\allocationnumber=18
\advance\count17\@ne
\allocationnumber\count17 %
\fi
\global\chardef}%
{\count17}%
\m@ne
{128}}
\fi
\def\new@mathgroup
{\e@alloc\mathgroup\chardef{\count18}\m@ne\e@mathgroup@top}
\let\newfam\new@mathgroup
\ifx\directlua\@undefined
\def\newlanguage  {\e@alloc\language \chardef{\count19}\m@ne\@cclvi}
\else
\def\newlanguage  {\e@alloc\language \chardef{\count19}\m@ne{16384}}
\fi
\ifx\directlua\@undefined
\ifx\widowpenalties\@undefined
\mathchardef\e@alloc@top=255
\let\e@alloc@chardef\chardef
\else
\mathchardef\e@alloc@top=32767
\let\e@alloc@chardef\mathchardef
\fi
\else
\chardef\e@alloc@top=65535
\let\e@alloc@chardef\chardef
\fi
\ifx\Umathcode\@undefined
\chardef\e@mathgroup@top=16
\else
\chardef\e@mathgroup@top=256
\fi
\def\e@alloc#1#2#3#4#5#6{%
\global\advance#3\@ne
\e@ch@ck{#3}{#4}{#5}#1%
\allocationnumber#3\relax
\global#2#6\allocationnumber
\wlog{\string#6=\string#1\the\allocationnumber}}%
\gdef\e@ch@ck#1#2#3#4{%
\ifnum#1<#2\else
\ifnum#1=#2\relax
\global#1\@cclvi
\ifx\count#4\global\advance#1 10 \fi
\fi
\ifnum#1<#3\relax
\else
\errmessage{No room for a new \string#4}%
\fi
\fi}%
\let\float@count\e@alloc@top
\ifx\numexpr\@undefined
\def\extrafloats#1{%
\count@#1\relax
\ifnum\count@>\z@
\newinsert\reserved@a
\global\expandafter\chardef
\csname bx@\the\allocationnumber\endcsname\allocationnumber
\@cons\@freelist{\csname bx@\the\allocationnumber\endcsname}%
\advance\count@\m@ne
\expandafter\extrafloats
\expandafter\count@
\fi
}%
\else
\def\extrafloats#1{%
\ifnum#1>\z@
\count@\numexpr\float@count-1\relax
\ch@ck0\count@\count
\ch@ck1\count@\dimen
\ch@ck2\count@\skip
\ch@ck4\count@\box
\global\e@alloc@chardef\float@count\count@
\global\expandafter\e@alloc@chardef
\csname bx@\the\float@count\endcsname\float@count
\@cons\@freelist{\csname bx@\the\float@count\endcsname}%
\expandafter
\extrafloats\expandafter{\numexpr#1-1\relax}%
\fi}%
\fi
\def\alloc@#1#2#3#4{\e@alloc#2#3{\count1#1}#4\float@count}
\ifx\numexpr\@undefined
\def\newinsert#1{\global\advance\insc@unt \m@ne
\ch@ck0\insc@unt\count
\ch@ck1\insc@unt\dimen
\ch@ck2\insc@unt\skip
\ch@ck4\insc@unt\box
\allocationnumber\insc@unt
\global\chardef#1\allocationnumber
\wlog{\string#1=\string\insert\the\allocationnumber}}
\else
\ifx\directlua\@undefined
\chardef\e@insert@top255
\else
\chardef\e@insert@top\e@alloc@top
\fi
\def\newinsert#1{%
\@tempswafalse
\global\advance\insc@unt\m@ne
\ifnum\count10<\insc@unt
\ifnum\count11<\insc@unt
\ifnum\count12<\insc@unt
\ifnum\count14<\insc@unt
\@tempswatrue
\fi\fi\fi\fi
\if@tempswa
\allocationnumber\insc@unt
\else
\global\advance\insc@unt\@ne
\extrafloats\@ne
\@next\@currbox\@freelist
{\ifnum\@currbox<\e@insert@top
\allocationnumber\@currbox
\else
\ch@ck0\m@ne\insert
\fi}%
{\ch@ck0\m@ne\insert}%
\fi
\global\chardef#1\allocationnumber
\wlog{\string#1=\string\insert\the\allocationnumber}%
}
\fi
\gdef\ch@ck#1#2#3{%
\ifnum\count1#1<#2\else
\errmessage{No room for a new #3}%
\fi}
\def\newhelp#1#2{\newtoks#1#1\expandafter{\csname#2\endcsname}}
\newread\@inputcheck
\newwrite\@unused
\newdimen\maxdimen \maxdimen=16383.99999pt % the largest legal <dimen>
\newskip\hideskip \hideskip=-1000pt plus 1fill % negative but can grow
\newdimen\p@ \p@=1pt % this saves macro space and time
\newdimen\z@ \z@=0pt % can be used both for 0pt and 0
\newskip\z@skip \z@skip=0pt plus0pt minus0pt
\newbox\voidb@x % permanently void box register
\message{parameters,}
\pretolerance=100
\tolerance=200 % INITEX sets this to 10000
\hbadness=1000
\vbadness=1000
\linepenalty=10
\hyphenpenalty=50
\exhyphenpenalty=50
\binoppenalty=700
\relpenalty=500
\clubpenalty=150
\widowpenalty=150
\displaywidowpenalty=50
\brokenpenalty=100
\predisplaypenalty=10000
\doublehyphendemerits=10000
\finalhyphendemerits=5000
\adjdemerits=10000
\tracinglostchars=2
\ifx\directlua\@undefined
% \tracingstacklevels=0 % added in 2021
\else
\newcount\tracingstacklevels
% Code for \tracingstacklevels defined in ltfinal.dtx
\fi
\uchyph=1
\defaulthyphenchar=`\-
\defaultskewchar=-1
\delimiterfactor=901
\showboxbreadth=-1
\showboxdepth=-1
\errorcontextlines=-1
\hfuzz=0.1pt
\vfuzz=0.1pt
\overfullrule=5pt
\maxdepth=4pt
\splitmaxdepth=\maxdimen
\boxmaxdepth=\maxdimen
\delimitershortfall=5pt
\nulldelimiterspace=1.2pt
\scriptspace=0.5pt
\parindent=20pt
\parskip=0pt plus 1pt
\abovedisplayskip=12pt plus 3pt minus 9pt
\abovedisplayshortskip=0pt plus 3pt
\belowdisplayskip=12pt plus 3pt minus 9pt
\belowdisplayshortskip=7pt plus 3pt minus 4pt
\topskip=10pt
\splittopskip=10pt
\parfillskip=0pt plus 1fil
\newskip\normalbaselineskip \normalbaselineskip=12pt
\newskip\normallineskip \normallineskip=1pt
\newdimen\normallineskiplimit \normallineskiplimit=0pt
\newcount\interfootnotelinepenalty \interfootnotelinepenalty=100
\def\magstephalf{1095 }
\def\magstep#1{\ifcase#1 \@m\or 1200\or 1440\or 1728\or
2074\or 2488\fi\relax}
\def\frenchspacing{\sfcode`\.\@m \sfcode`\?\@m \sfcode`\!\@m
\sfcode`\:\@m \sfcode`\;\@m \sfcode`\,\@m}
\def\nonfrenchspacing{\sfcode`\.3000\sfcode`\?3000\sfcode`\!3000%
\sfcode`\:2000\sfcode`\;1500\sfcode`\,1250 }
\def\normalbaselines{\lineskip\normallineskip
\baselineskip\normalbaselineskip \lineskiplimit\normallineskiplimit}
\def\^^M{\ } % control <return> = control <space>
\let\^^I\^^M % same for <tab>
\def\lq{`}
\def\rq{'}
\def\lbrack{[}
\def\rbrack{]}
\def \aa {\r a}
\def \AA {\r A}
\let\endgraf=\par
\let\endline=\cr
\def\space{ }
\let\empty\@empty
\def\null{\hbox{}}
\let\bgroup={
\let\egroup=}
\begingroup
\catcode`\^^M=\active % these lines must end with %
\gdef\obeylines{\catcode`\^^M\active%
\let^^M\obeyedline%
}%
\global\let^^M\par % this is in case ^^M appears in a \write
\endgroup
\protected\gdef\obeyedline{\par}
\global\let\obeyedspace\space
\begingroup
\catcode`\ =\active%
\gdef\obeyspaces{\catcode`\ \active\let =\obeyedspace}%
\global\let =\space%
\endgroup
\long\def \loop #1\repeat{%
\def\iterate{#1\relax  % Extra \relax
\expandafter\iterate\fi
}%
\iterate
\let\iterate\relax
}
\let\repeat=\fi
\def\nointerlineskip{\prevdepth-\@m\p@}
\def\offinterlineskip{\baselineskip-\@m\p@
\lineskip\z@ \lineskiplimit\maxdimen}
\def\vglue{\afterassignment\vgl@\skip@=}
\def\vgl@{\par \dimen@\prevdepth \hrule \@height\z@
\nobreak\vskip\skip@ \prevdepth\dimen@}
\def\hglue{\afterassignment\hgl@\skip@=}
\def\hgl@{\leavevmode \count@\spacefactor \vrule \@width\z@
\nobreak\hskip\skip@ \spacefactor\count@}
\def\slash{/\penalty\exhyphenpenalty}
\def\break{\penalty-\@M}
\def\nobreak{\penalty \@M}
\def\allowbreak{\penalty \z@}
\def\filbreak{\par\vfil\penalty-200\vfilneg}
\def\goodbreak{\par\penalty-500 }
\def\eject{\par\break}
\def\removelastskip{\ifdim\lastskip=\z@\else\vskip-\lastskip\fi}
\def\smallbreak{\par\ifdim\lastskip<\smallskipamount
\removelastskip\penalty-50\smallskip\fi}
\def\medbreak{\par\ifdim\lastskip<\medskipamount
\removelastskip\penalty-100\medskip\fi}
\def\bigbreak{\par\ifdim\lastskip<\bigskipamount
\removelastskip\penalty-200\bigskip\fi}
\def\m@th{\mathsurround\z@}
\def\underbar#1{\underline{\sbox\tw@{#1}\dp\tw@\z@\box\tw@}}
\newbox\strutbox
\def\strut{\relax\ifmmode\copy\strutbox\else\unhcopy\strutbox\fi}
\def\hidewidth{\hskip\hideskip}
\def\narrower{%
\advance\leftskip\parindent
\advance\rightskip\parindent}
\chardef\%=`\%
\chardef\&=`\&
\chardef\#=`\#
\def\leavevmode{\unhbox\voidb@x}
\def\mathhexbox#1#2#3{\mbox{$\m@th \mathchar"#1#2#3$}}
\def\ialign{\everycr{}\tabskip\z@skip\halign} % initialized \halign
\def\oalign#1{\leavevmode\vtop{\baselineskip\z@skip \lineskip.25ex%
\ialign{##\crcr#1\crcr}}}
\def\o@lign{\lineskiplimit\z@ \oalign}
\def\ooalign{\lineskiplimit-\maxdimen \oalign}
\def\sh@ft#1{\dimen@.00#1ex\multiply\dimen@\fontdimen1\font
\kern-.0156\dimen@} % compensate for slant in lowered accents
\def\ltx@sh@ft #1{%
\dimen@ #1%
\kern \strip@pt
\fontdimen1\font \dimen@
} % kern by #1 times the current slant
\def\hrulefill{\leavevmode\leaders\hrule\hfill\kern\z@}
\def\dotfill{%
\leavevmode
\cleaders \hb@xt@ .44em{\hss.\hss}\hfill
\kern\z@}
\sfcode`\)=0 \sfcode`\'=0 \sfcode`\]=0
\def\showoverfull{\tracingonline\@ne}
\gdef\loggingoutput{\tracingoutput\@ne
\showboxbreadth\maxdimen\showboxdepth\maxdimen\errorstopmode}
\gdef\showoutput{\loggingoutput\showoverfull}
\edef\loggingall{%
\tracingstats\tw@
\tracingpages\@ne
\tracinglostchars\thr@@
\tracingparagraphs\@ne
\tracinggroups\@ne
\tracingifs\@ne
\tracingscantokens\@ne
\tracingnesting\@ne
\errorcontextlines\maxdimen
\ifdefined\tracingstacklevels \tracingstacklevels\maxdimen \fi
\noexpand \loggingoutput
\tracingmacros\tw@
\tracingcommands\thr@@
\tracingrestores\@ne
\tracingassigns\@ne
}%
\def\tracingall{\showoverfull\loggingall}
\edef\tracingnone{%
\tracingassigns\z@
\tracingrestores\z@
\tracingonline\z@
\tracingcommands\z@
\showboxdepth\m@ne
\showboxbreadth\m@ne
\tracingoutput\z@
\errorcontextlines\m@ne
\ifdefined\tracingstacklevels \tracingstacklevels\z@ \fi
\tracingnesting\z@
\tracingscantokens\z@
\tracingifs\z@
\tracinggroups\z@
\tracingparagraphs\z@
\tracingmacros\z@
\tracinglostchars\@ne
\tracingpages\z@
\tracingstats\z@
}%
\def\hideoutput{%
\tracingoutput\z@
\showboxbreadth\m@ne
\showboxdepth\m@ne
\tracingonline\m@ne
}%
\nonfrenchspacing
```