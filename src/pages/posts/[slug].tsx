import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { getAllPosts, getPostBySlug } from "src/lib/blog";
import markdownToHTML from "src/lib/markdownToHTML";
import { useEffect, useLayoutEffect } from "react";
import hljs from "highlight.js/lib/core";

// New Syntax
import latex from "src/languages/latex_new.js";
// Old Syntax
// import latex from "highlight.js/lib/languages/latex"

hljs.registerLanguage("latex", latex);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
	const posts = getAllPosts(["slug"]);
	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug
				}
			};
		}),
		fallback: false
	};
};

export const getStaticProps = async ({ params }: any) => {
	const post = getPostBySlug(params.slug, [
		"slug",
		"title",
		"author",
		"date",
		"description",
		"content",
		"tag"
	]);
	const content = await markdownToHTML(post.content);
	return {
		props: {
			post: {
				...post,
				content
			}
		}
	};
};

const Post: NextPage<Props> = ({ post }) => {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}
	useEffect(() => {
		hljs.highlightAll();
	}, []);
	return (
		<>
			<Head>
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
					@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap');
				</style>
				<title>{post.title + " | ponte-vecchio"}</title>
				<meta name="description" content={post.description} />
			</Head>
			<article>
				<h1 className="font-ibm text-5xl text-center mt-20 mb-10 text-fg font-bold">
					{post.title}
				</h1>
				<div>
					<p className="font-ibm text-1xl text-justify mb-10 text-fgalt">
						{post.description}
					</p>
				</div>
				<div className="font-ibm text-left text-fgalt text-xl">
					<hr className="border-black border-1 mb-2" />
					<p className="text-sm mb-1 text-red"><sub>AUTHOR</sub></p>
					<p className="mb-2 font-normal">{post.author}</p>
					<p className="text-sm mt-2 mb-1 text-red"><sub>DATE</sub></p>
					<p className="mb-2 font-normal">{post.date}</p>
					<hr className="border-black border-1 mb-5" />
				</div>


				<div
					className="px-auto py-auto mx-auto my-auto font-ibm max-w-none
					text-fgalt2 prose text-lg
					prose-h1:text-darkmagenta
					prose-h2:text-magenta
					prose-h3:text-cyan
					prose-h4:text-darkcyan
					prose-h5:text-blue
					prose-h6:text-darkblue
					prose-p:text-fgalt2
					prose-a:text-fgalt2
					prose-a:no-underline
					prose-blockquote:text-fg
					prose-blockquote:before:block
					prose-figure:text-blue
					prose-figcaption:text-blue
					prose-strong:text-red
					prose-strong:font-weight-bold
					prose-em:text-fgalt
					prose-em:font-weight-thin
					prose-code:text-darkmagenta
					prose-code:rounded
					prose-code:bg-bg
					prose-code:before:text-zinc
					prose-code:after:text-zinc
					prose-pre:text-fg
					prose-pre:bg-magenta
					prose-ol:text-red
					prose-ul:text-fgalt
					prose-li:text-fgalt
					prose-li:marker:text-fgalt
					prose-li:font-weight-thin
					prose-table:text-fg
					prose-thead:text-fg
					prose-tr:text-fgalt
					prose-tr:bg-zinc
					prose-th:text-fgalt
					prose-td:text-fgalt
					prose-img:text-fgalt
					prose-video:text-fgalt
					prose-hr:text-black
					text-justify"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</article>
		</>
	);
};

export default Post;
