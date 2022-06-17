---
title: "Higlight.js Default"
author: "schtandard"
date: "2020-10-18"
slug: "hljsdefault"
tag: "LaTeX"
description: "Highlight.js's Test for Detecting LaTeX syntax"
---
[[source]](https://github.com/highlightjs/highlight.js/blob/main/test/detect/latex/default.txt)

```latex
% !TeX encoding = utf8
\documentclass{article}

\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{amsfonts}
\usepackage{xparse}
\usepackage{mathtools}

\newcommand\hi[1]{Hello #1!}

\ExplSyntaxOn
  % Convert a roman number into an arabic one
  \NewDocumentCommand \romantonum { m }
    { \int_from_roman:n { #1 } }
\ExplSyntaxOff

\begin{document}

\section{Highlight.js}
\hi{you}
This is \LaTeX\ syntax highlighted by \verb|highlight.js|.
You should look at section~\ref{sec:fermat} next.

Did you know that MDCLXI is \romantonum{MDCLXI}? % It's 1661.

\subsection{Fermat}\label{sec:fermat}
I have a wonderful proof that
\[
  a^n + b^n \neq c^n
\]
for \(a, b, c, d, n \in \mathbb{Z}_+\) with \(n > 2\).
Sadly, it is too large to fit in this code snippet.

\end{document}
```

```latex
\mathcode`\'= "8000 % Force ' (right quote) to be active in math mode.
{\catcode`\'=\active \gdef'{^\bgroup\primeA}}% Global change to Plain Tex.
\def\primeA{\prime\futurelet\next\primeB}
\mathchardef\prime="0230 % Page 431 of The TeXBook shows a prime in position
\def\primeB%               "30 of font 2.
{%
     \ifx'\next
          \let\nxt=\primeC
     \else
           \ifx^\next
                \let\nxt=\primeD
           \else
                \let\nxt=\egroup
           \fi
     \fi
     \nxt
}
\def\primeC#1{\primeA}
\def\primeD#1#2{#2\egroup}
If $f(x) = 2x^3-4x^2+5x-6$, $f'(x)=6x^2-8x+5$, $f''(x)=12x-8$, $f'''(x)=12$,
 and $f''''(x) = f^{(4)}(x) = 0$.\par
Also, $x'\cdot x' = x'^2$. But what is $x'^{y^2}$?\par
Compare f'(x) with $f'(x)$.
{\catcode`\'=\active \gdef'{^\bgroup\prim@s}}%reset Plain TeX value.
```