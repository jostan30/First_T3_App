import { api } from '~/trpc/server'

export default async function Posts(){

 const posts = await api.post.usePosts();
 console.log(posts);
  return <div className='flex-col'>
    <h1 className='font-bold'>Posts</h1>
    <div  className='flex-row space-x-2'>
                <span>Id</span>
                <span>Name</span>
            </div>
    {
      posts.map((post)=>{
        return (
            <div key={post.id} className='flex-row space-x-2'>
                <span>{post.id}</span>
                <span>{post.name}</span>
            </div>
            )
        })

    }
  </div>
}
