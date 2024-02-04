import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "$gfm";
import { Post, getPost } from "@utils/posts.ts";

// Syntax highlighting
import "https://esm.sh/prismjs@1.29.0/components/prism-bash";

import "https://esm.sh/prismjs@1.29.0/components/prism-python";

// prism-cpp requires prism-c to be loaded
import "https://esm.sh/prismjs@1.29.0/components/prism-c";
import "https://esm.sh/prismjs@1.29.0/components/prism-cpp";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const post = await getPost(ctx.params.slug);
      return ctx.render(post as Post);
    } catch {
      return ctx.renderNotFound();
    }
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <title>{post.title} - Лёшапомоги</title>
        <meta name="description" content={post.description} />
        <meta name="og:description" content={post.description} />
      </Head>

      <main class="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <time class="text-gray-300">
          {new Date(post.publishedAt).toLocaleDateString("ru-ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          class="mt-8 markdown-body"
          data-color-mode="auto"
          data-light-theme="light"
          data-dark-theme="dark"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </>
  );
}
