import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Gerenciador de Conteúdo</h1>
      <p className="text-lg mb-4">Gerencie Autores e Posts facilmente.</p>
      <div className="space-y-4">
        <Link href="/authors" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-white inline-block">
          Ver Autores
        </Link>
        <Link href="/posts" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-white ms-4 inline-block">
          Ver Posts
        </Link>
      </div>
    </div>
  );
}