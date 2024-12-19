"use client";

import { trpc } from '@/app/_trpc/client';
import { Post } from '@/models/Post';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AuthorDetailPage() {
  const router = useRouter();
  const { authorId } = useParams(); 

  const { data: author, isLoading, error } = trpc.getAuthorById.useQuery({
    id: authorId? +authorId : -1, // Nunca deveria ser undefined
  });

  const { mutateAsync: deleteAuthor } = trpc.deleteAuthor.useMutation();
  const { mutateAsync: updateAuthor } = trpc.updateAuthor.useMutation();

  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (author) {
      setName(author.name); 
    }
  }, [author]);

  const handleDelete = async () => {
    try {
      await deleteAuthor({ id: authorId? +authorId : -1 });
      router.push('/authors'); // Redireciona para a lista de autores após exclusão
    } catch (error) {
      console.error('Erro ao deletar autor', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAuthor({ id: authorId? +authorId : -1, name });
      setIsEditing(false); // Volta para a visualização normal após editar
    } catch (error) {
      console.error('Erro ao atualizar autor', error);
    }
  };

  if (isLoading) return <div>Carregando autor...</div>;
  if (error) return <div>Erro ao carregar autor</div>;
  if (!author) return <div>Autor não encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
      <p className="text-lg">ID do Autor: {author.id}</p>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Atualizar Autor
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Editar Autor
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Apagar Autor
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8">Posts deste autor</h2>
      <div className="space-y-4">
        {author.posts.map((post: Post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content.substring(0, 150)}...</p>
            <a href={`/posts/post/${post.id}`} className="text-blue-500">Ver Post</a>
          </div>
        ))}
      </div>
    </div>
  );
}
