# Testing your own TeX syntax

## Editing the syntax

Change the syntax of `latex_new.js` located in `src/languages/` folder.
It is preferable that you make full use of RegEx, e.g. `/\b\\if[hvm]mode\b/` to capture `\ifhmode`, `\ifvmode`
and `\ifmmode`.

## Creating a test file

To create your own test file,

1. Create a directory at `src/pages/posts/`, preferably using alphanumeric characters only.
2. Therein create a markdown file named `index.md`.
3. In the markdown file, fill in the following:

```md
---
title: "<Name of your post>"
author: "<name of the author>"
date: "<YYYY-MM-DD>"
slug: "<slug of the post>"
tag: "<TeX, LaTeX>"
description: "<description of your post>"
---
```

Note that `title`, `author` and `tag` will will be shown on the main index page.
Also ensure that `slug` is the same as the name of the directory you created.
As for the `date`, use the `YYYY-MM-DD` format. `DD` is not necessary.

Once the header is completed, write the content of your post as you should any markdown file, typically as:

    # Title of the file you should like to test

    ```latex
    <source code>
    ```

## Testing the syntax

To view the blog-esque website locally, run

```sh
npm run dev
```

on your terminal.
The website will typically be served on http://localhost:3000.

## Comparing the syntaxes

To compare the original syntax as provided by `highligh.js` with your new syntax,
either comment/uncomment the following in [`src/pages/posts/[slug].tsx`](./src/pages/posts/[slug].tsx):

```js
// New Syntax
import latex from "src/languages/latex_new.js";
```

```js
// Old Syntax
// import latex from "highlight.js/lib/languages/latex"
```

By default, the new syntax set out by `latex_new.js` is enabled.

## Comparing the styles

The default style used in this repository is `chameleon.css` which can be found in `src/styles/`.
If you wish to fiddle around with different styles as set out by `highlight.js`,
first comment out the `chameleon.css` line and load a css file in `_app.js` in `src/pages/`.
For a list of themes, see [highlightjs.org](https://highlightjs.org/static/demo/).