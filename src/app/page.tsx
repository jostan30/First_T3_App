
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const ApiCheck = await api.post.T3();
  void api.post.getLatest.prefetch();


  return (
    <div className="flex-col">
      <div>{hello?.greeting}</div>
      <div>{ApiCheck?.annonce}</div>

      {
        //nAVIGATE TO POSTS PAGE
        <div className="flex justify-center">
          <a href="/posts">Posts</a>
          <a href="/users">Users Login </a>
        </div>
      }

    </div>
  );
}
