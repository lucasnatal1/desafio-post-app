"use client";

import { trpc } from '@/app/_trpc/client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PostDetailPage() {
  const router = useRouter();
  const { postId } = useParams(); 

  const { data: post, isLoading, error } = trpc.getPostById.useQuery({
    id: postId? +postId : -1, //Nunca deveria ser undefined
  });

  const { mutateAsync: deletePost } = trpc.deletePost.useMutation();
  const { mutateAsync: updatePost } = trpc.updatePost.useMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title); 
      setContent(post.content); 
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      await deletePost({ id: postId? +postId : -1 });
      router.push('/posts'); // Redireciona para a lista de posts após exclusão
    } catch (error) {
      console.error('Erro ao deletar post', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost({ id: postId? +postId : -1, title, content });
      setIsEditing(false); // Volta para a visualização normal após editar
    } catch (error) {
      console.error('Erro ao atualizar post', error);
    }
  };

  if (isLoading) return <div>Carregando post...</div>;
  if (error) return <div>Erro ao carregar post</div>;
  if (!post) return <div>Post não encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
      <p className="mt-4">Autor: {post.author.name}</p>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-lg">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-lg">Conteúdo</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Atualizar Post
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Editar Post
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Apagar Post
          </button>
        </div>
      )}
    </div>
  );
}
