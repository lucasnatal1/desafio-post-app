"use client";

import { useState, useEffect } from 'react';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { Author } from '@/models/Author';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState<string>('');

  const { data: authors, isLoading, error } = trpc.getAuthors.useQuery();
  
  const { mutateAsync: createPost } = trpc.createPost.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorId) {
      alert('Por favor, selecione um autor!');
      return;
    }

    try {
      await createPost({ title, content, authorId: +authorId });
      router.push('/posts');  // Redireciona para a página de posts após criação
    } catch (error) {
      console.error('Erro ao criar post', error);
    }
  };

  if (isLoading) return <div>Carregando autores...</div>;
  if (error) return <div>Erro ao carregar autores</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adicionar Novo Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label htmlFor="author" className="block text-lg">Autor</label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecione um autor</option>
            {authors?.map((author: Author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Adicionar
        </button>
      </form>
    </div>
  );
}
