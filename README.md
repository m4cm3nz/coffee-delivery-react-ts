# ☕ Coffee Delivery

Aplicação web de uma cafeteria fictícia: catálogo, carrinho de compras, autenticação,
agenda de endereços de entrega e fluxo completo de pedido — tudo persistido no navegador
e desenhado para migrar para um backend real sem reescrever a aplicação.

Projeto baseado no desafio **Rocketseat Ignite**, evoluído para um produto front-end de
referência: testado, com CI, acessível e responsivo.

[![CI](https://github.com/m4cm3nz/coffee-delivery-react-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/m4cm3nz/coffee-delivery-react-ts/actions/workflows/ci.yml)

---

## ✨ Funcionalidades

- **Catálogo de cafés** com busca visual, descrição e tags por categoria.
- **Carrinho** com controle de quantidade, resumo de valores e cálculo de frete.
- **Autenticação** (login mock, pronto para trocar por backend) com sessão persistida.
- **Agenda de endereços por usuário** — múltiplos endereços, rótulos (Casa / Trabalho /
  Outro), endereço preferencial carregado automaticamente no login, edição e remoção.
- **Autocomplete de CEP** via [ViaCEP](https://viacep.com.br/).
- **Fluxo de pedido** com seleção de forma de pagamento e tela de confirmação.
- **Dados escopados por usuário** (carrinho, pedidos e endereços) com mesclagem do
  carrinho de visitante ao efetuar login.
- **Responsivo e acessível**, com validação de formulários e estados de erro.

## 🧱 Stack

| Camada | Tecnologias |
| --- | --- |
| UI | React 19, styled-components 6, @phosphor-icons/react |
| Roteamento | React Router 7 (lazy loading + code splitting) |
| Estado | Context API + `useReducer` + Immer |
| Formulários | React Hook Form 7 + Zod 4 |
| Build | Vite 7, TypeScript 5.8 |
| Qualidade | Vitest 3, Testing Library, ESLint 9 (flat config) |
| CI | GitHub Actions |

## 🏛️ Arquitetura

A aplicação isola toda interação com persistência atrás de **serviços assíncronos**
(`AuthService`, `AddressService`) com implementação em `localStorage`. A troca por uma
API real é uma alteração de **uma linha** em cada *composition root* (`services/*/index.ts`),
sem mudanças nos componentes ou hooks que os consomem.

```
src/
├── components/     # UI reutilizável (Header, InputNumber, Loading, ErrorBoundary…)
├── contexts/       # AuthContext, OrderContext (carrinho + pedidos)
├── hooks/          # useAddressBook
├── layouts/        # DefaultLayout
├── pages/          # Home, Order, Checkout, Login, NotFound
├── reducers/       # cart (actions + reducer)
├── services/       # auth, address — boundary swap-ready (tipos + impl local)
├── util/           # cartStorage, cep, order, formatValue, coffeeImages
└── data/           # coffeeMenu
```

**Persistência (escopo por usuário):**

```
@coffee-delivery:session                  # sessão atual
@coffee-delivery:{userId}:cart            # carrinho
@coffee-delivery:{userId}:orders          # histórico de pedidos
@coffee-delivery:{userId}:last-order      # último pedido
@coffee-delivery:{userId}:addresses       # agenda de endereços
```

## 🚀 Como rodar

Requer **Node ≥ 20.19**.

```bash
git clone https://github.com/m4cm3nz/coffee-delivery-react-ts.git
cd coffee-delivery-react-ts
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`. O login aceita qualquer credencial válida
(e-mail + senha) — é um mock para demonstrar o fluxo autenticado.

## 📜 Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Type-check + build de produção |
| `npm run preview` | Pré-visualiza o build |
| `npm run lint` | ESLint com `--fix` |
| `npm run lint:check` | ESLint sem corrigir (usado no CI) |
| `npm run typecheck` | Type-check do projeto |
| `npm test` | Vitest em modo watch |
| `npm run test:run` | Executa a suíte uma vez |
| `npm run coverage` | Relatório de cobertura |

## 🧪 Testes & CI

- **43 testes** com Vitest + Testing Library, cobrindo serviços (auth, endereços),
  reducer do carrinho, utilitários (CEP, pedido, storage) e componentes.
- O workflow de **CI** roda em todo push na `main` e em cada pull request:
  `lint → typecheck (testes) → testes → build`.

```bash
npm run test:run
```

## 📄 Licença

Projeto de estudo, distribuído sem fins comerciais.
