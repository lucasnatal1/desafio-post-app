"use client";

import { trpc } from '@/app/_trpc/client';
import { Post } from '@/models/Post';
import Link from 'next/link';

export default function PostsPage() {
  const { data: posts, isLoading, error } = trpc.getPosts.useQuery();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar posts</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="space-y-4">
        {posts?.map((post: Post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-md">
            <Link href={`/posts/post/${post.id}`} className="text-xl font-semibold text-blue-500 hover:text-blue-700">
              {post.title}
            </Link>
          </div>
        ))}
      </div>
      <Link href="/posts/new" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
        Adicionar Novo Post
      </Link>
    </div>
  );
}
