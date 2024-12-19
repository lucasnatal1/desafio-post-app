Descrição do Desafio

Desenvolver uma aplicação Fullstack utilizando Next.js, tRPC, Prisma, MySQL, Tailwind CSS e executável via Docker, que permita gerenciar um conteúdo simples composto por duas entidades relacionadas: Authors e Posts. O objetivo é criar um CRUD completo, exibindo e manipulando dados em uma interface web simples, mas funcional, no período estimado de até 4 horas.

Especificações Gerais • Entidades: • Author: Representa um autor. Deve ser possível criar, listar, atualizar e remover. • Post: Representa um post. Deve ser possível criar, listar, atualizar e remover. Um Post deve estar associado a um Author. • Relacionamento: Cada Post pertence a um Author. • Interface: • Página para listar Posts e, ao interagir, acessar detalhes ou editar. • Página ou seção para criar/editar Posts. • Página ou seção para gerenciar Authors. • Layout responsivo e simples com Tailwind CSS. • Back-end: • Endpoints tRPC para CRUD completo de Authors e Posts. • Prisma como ORM, rodando migrações para criar as tabelas no MySQL. • MySQL & Docker: • Configuração do ambiente via docker-compose para rodar banco de dados e aplicação. • Dockerfile para containerizar a aplicação. • Código & Organização: • Uso de TypeScript em todo o projeto. • Código limpo, bem estruturado e com organização coerente de rotas, componentes e serviços. • Documentação: • README explicando resumidamente como subir o ambiente (build, migrações, docker-compose up) e como acessar a aplicação localmente.


Neste momento só a base de dados está subindo no Docker, a aplicação quando sobe parece perder o contato com a bd (todas as chamadas retornam 500).

Então para subir a bd: docker-compose up -d
Executar migrações: npx prisma migrate dev --name init   npx prisma generate
Para subir a aplicação:  npm run dev (no diretório do projeto)

acessar app via http://localhost:3000/