# Gerenciador de Tarefas - Akira Test

Um gerenciador de tarefas moderno e intuitivo desenvolvido com Next.js 15, utilizando autenticação avançada, interface Kanban e análise de dados.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS 4 + shadcn/ui
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: Better Auth
- **Gerenciamento de Estado**: Zustand
- **Drag & Drop**: @dnd-kit
- **Validação**: Zod + React Hook Form
- **Analytics**: PostHog
- **Notificações**: Sonner
- **Containerização**: Docker

## 📋 Funcionalidades

### 🔐 Autenticação

- Sistema completo de login e cadastro
- Gerenciamento seguro de sessões

### 📊 Gerenciamento de Tarefas

- **Interface Kanban** interativa com drag & drop
- **Estados de tarefa**: A Fazer, Em Progresso, Concluído
- **Prioridades**: Baixa, Média, Alta
- **Campos**: Título, descrição, data de vencimento
- Criação, edição e exclusão de tarefas
- Ordenação automática por prioridade

### 📈 Analytics e Monitoramento

- Rastreamento de eventos com PostHog
- Logs de atividades do usuário
- Métricas de criação/conclusão de tarefas

## 🏗️ Estrutura do Projeto

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── dashboard/               # Área logada
│   │   └── tasks/              # Página principal de tarefas
│   ├── sign-up/                # Cadastro
│   ├── api/auth/               # API de autenticação
│   └── layout.tsx              # Layout raiz
├── features/                    # Funcionalidades por domínio
│   ├── SignIn/                 # Login
│   ├── SignUp/                 # Cadastro
│   └── TaskManager/            # Gerenciador de tarefas
│       ├── actions/            # Server Actions
│       ├── components/         # Componentes React
│       ├── schemas/            # Validações Zod
│       └── store/              # Estado Zustand
├── _shared/                     # Código compartilhado
│   ├── components/ui/          # Componentes UI (shadcn)
│   ├── actions/               # Actions globais
│   └── dtos/                  # Data Transfer Objects
├── _components/               # Componentes globais
├── lib/                      # Utilitários e configurações
└── config/                   # Configurações
```

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com as seguintes tabelas principais:

- **users**: Informações dos usuários
- **sessions**: Gerenciamento de sessões
- **tasks**: Tarefas com status, prioridade e metadados
- **user_activities**: Log de atividades

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Docker (opcional)

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd akira-test
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Autenticação
BETTER_AUTH_SECRET=sua-chave-secreta
BETTER_AUTH_URL=http://localhost:3000

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=sua-chave-posthog
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/akira_db"
DIRECT_URL="postgresql://usuario:senha@localhost:5432/akira_db"
```

4. **Execute as migrações do banco**

```bash
npm run prisma:migrate
npm run prisma:generate
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 🐳 Executar com Docker

```bash
docker-compose up -d
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento com Turbopack
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run prisma:migrate    # Executar migrações
npm run prisma:generate   # Gerar cliente Prisma
```

## 🔧 Configurações Importantes

### Better Auth

O projeto utiliza Better Auth para autenticação, configurado em [`src/lib/better-auth.ts`](src/lib/better-auth.ts):

- Adapter Prisma para persistência
- Cookies seguros para Next.js
- Configuração de email e senha

### PostHog Analytics

Rastreamento configurado em [`src/lib/posthog-server.ts`] para:

- Eventos de criação/edição/exclusão de tarefas
- Analytics do lado servidor
- Captura de exceções

### Prisma ORM

Schema localizado em [`database/schema.prisma`](database/schema.prisma) com:

- Modelos para usuários, sessões e tarefas
- Relacionamentos bem definidos
- Enums para status e prioridades

## 🎨 Interface do Usuário

- **Design System**: Baseado no shadcn/ui com tema consistente
- **Responsivo**: Interface adaptável para mobile e desktop
- **Acessibilidade**: Componentes com foco em a11y
- **Kanban Board**: Interface drag & drop intuitiva
- **Feedback Visual**: Toasts e estados de loading

## 🧪 Testes

O projeto está configurado para testes com:

- Jest para testes unitários
- React Testing Library
- Playwright para testes E2E

## 📱 Funcionalidades da Interface

### Dashboard Principal

- Lista de tarefas em formato Kanban
- Filtros por status e prioridade
- Criação rápida de novas tarefas

### Formulários Inteligentes

- Validação em tempo real com Zod
- Feedback visual de erros
- Estados de carregamento

### Experiência do Usuário

- Transições suaves entre páginas
- Notificações contextuais
- Interface intuitiva e moderna

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎯 Próximas Funcionalidades

- [ ] Filtros avançados por data e usuário
- [ ] Comentários em tarefas
- [ ] Notificações push
- [ ] Relatórios e dashboards
- [ ] Modo escuro/claro

---
