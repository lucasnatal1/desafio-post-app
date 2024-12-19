"use client";

import { trpc } from '@/app/_trpc/client';
import { Author } from '@/models/Author';
import Link from 'next/link';

export default function AuthorsPage() {
  const { data: authors, isLoading, error } = trpc.getAuthors.useQuery();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar autores</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Autores</h1>
      <div className="space-y-4">
        {authors?.map((author: Author) => (
          <div key={author.id} className="bg-gray-100 p-4 rounded-md">
            <Link href={`/authors/author/${author.id}`} className="text-xl font-semibold text-blue-500 hover:text-blue-700">
              {author.name}
            </Link>
          </div>
        ))}
      </div>
      <Link href="/authors/new" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
        Adicionar Novo Autor
      </Link>
    </div>
  );
}
