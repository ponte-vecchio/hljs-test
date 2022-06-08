import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { getAllPosts } from "src/lib/blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tag", "description", "author"]);
  return {
    props: { allPosts }
  };
};

const Index: NextPage<Props> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title className="text-xl text-fgalt">hljs test</title>
        <meta
          name="description"
          content="Blog-like setup for testing hljs's TeX Highlight"
        />
        {/* use colorwheel.ico */}
        <link rel="icon" href="/colorwheel.ico"></link>
      </Head>
      <div className="flex-col justify-content-center px-auto py-auto mt-10">
        {allPosts.map((post) => (
          <div className="flex-row justify-content-around flex-col mb-10" key={post.slug}
               style={{ verticalAlign: "top" }}>
            <a
              href={"posts/" + post.slug}
              key={post.slug}
              className="click text-darkmagenta rounded"
            >
              <div
                className="flex-col justify-content-xl-start align-items-center text-left text-xl mr-auto"
                style={{ verticalAlign: "bottom" }}
              >
                <h3 className="text-lg">{post.date}</h3>
                <text
                  className="bg-zinc text-white rounded mt-2 text-sm"
                >
                  {post.tag}
                </text>
              </div>
              <div
                className="w-75 flex-col justify-content-between align-items-stretch font-bold text-3xl mb-1"
                style={{ verticalAlign: "bottom" }}
              >
                <h2>{post.title}</h2>
                <p
                  className="mt-2 mb-1 ml-auto text-sm text-justify">
                  {post.description}
                </p>
              </div>
              {/* <div className="text-right justify-center font-bold text-sm mb-1">
							<p>
								{post.tag}
							</p>
						</div> */}
            </a>
            <hr className="border-darkmagenta border-1" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
