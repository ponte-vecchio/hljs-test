import remarkGfm from "remark-gfm";
import { remark } from "remark";
import { unified } from "unified";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
// import remarkGithub from 'remark-github';
// import stringWidth from 'string-width'
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";
// import rehypeSanitize from 'rehype-sanitize';

const markdownToHTML = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .use(remarkMath)
    .use(rehypeKatex)
    // .use(remarkGithub)
    .use(rehypeHighlight, { plainText: ["txt", "text"] })
    .process(markdown);
  return result.toString();
};


export default markdownToHTML;
