---
title: "Numbers Test"
author: "ponte-vecchio"
date: "2022-06-28"
slug: "numbers"
tag: "TeX"
description: "A Test for Highlighting Numbers, Dimensions, Glues"
---

```latex
% Dimensions as understood by TeX
1pt
'7pc
4.3in
.6bp
+5cm
-.33mm
+ 40,1dd
"Ccc
123456789sp

\the\dimexpr"Ccc\relax
\the\dimexpr'45pc\relax
\the\dimexpr+.6bp - +.33 em + -123456789sp + +"AFcc - -,cm\relax
```