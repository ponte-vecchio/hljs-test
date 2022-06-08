import type { InferGetStaticPropsType, NextPage } from "next";

export default function Custom404() {
  return (
    <>
      <body className="bg-bg text-yellow text-center mt-0 text-2xl font-firacode">
      {/* Monospace Font + No Gap Between Lines */}
      <p>,_ _ </p>
      <p> |\\_,-~/ ! 404 !</p>
      <p> / ㅡ ㅡ | ,--. / </p>
      <p>( @ @ ) / ,-' </p>
      <p> \ _Y_/-._( ( </p>
      <p> / `. \ </p>
      <p>| _ \ | </p>
      <p>\ \ , / | </p>
      <p> | | |-_\__ / </p>
      <p>( (_/`(____,-' </p>
      <p className="text-center mt-20 text-3xl font-bold">
        Page not found.
      </p>
      </body>
    </>
  );
}
