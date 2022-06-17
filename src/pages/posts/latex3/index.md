---
title: "LaTeX3 test"
author: "ponte-vecchio"
date: "2022-06-12"
slug: "latex3"
tag: "LaTeX"
description: "Explicit Syntax for LaTeX3"
---

```latex
\ExplSyntaxOn

\msg_new:nnn
{ switchcase }
{ no-match }
{ There~is~no~entry~`#1'~in~the~switch~statement! }

\NewDocumentCommand\matchcase{ m m }
{
    \str_case:nnF { #1 } { #2 } { \msg_error:nnn { switchcase } { no-match } { #1 } }
}

\ExplSyntaxOff

```