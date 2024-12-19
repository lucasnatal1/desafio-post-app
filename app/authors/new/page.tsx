"use client";

import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';

export default function CreateAuthorPage() {
  const [name, setName] = useState('');
  const { mutateAsync: createAuthor } = trpc.createAuthor.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAuthor(name);
      router.push('/authors');  // Redireciona após a criação
    } catch (error) {
      console.error('Erro ao criar autor', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adicionar Novo Autor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Nome do Autor</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Adicionar
        </button>
      </form>
    </div>
  );
}
