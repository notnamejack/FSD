# React FSD Starter

Стартовый шаблон фронтенд-приложения на **React 19 + TypeScript** с архитектурой
**Feature-Sliced Design (FSD)**, собранный на **Vite**, с UI-библиотекой **Ant Design**,
**i18n**, **Redux Toolkit** и генерацией API-клиента из OpenAPI.

Собран на основе архитектуры и кодстайла проекта Metal Supply Portal.

---

## Стек

| Категория  | Технологии                                        |
| ---------- | ------------------------------------------------- |
| Фреймворк  | React 19 + TypeScript (strict)                    |
| Сборка     | Vite                                              |
| UI         | Ant Design 6 + `@ant-design/icons`                |
| Роутинг    | React Router 7                                    |
| Состояние  | Redux Toolkit + RTK Query                         |
| i18n       | i18next / react-i18next (EN + RU)                 |
| Стили      | SCSS (BEM-нейминг)                                |
| Линт       | ESLint (flat config) + Stylelint + Prettier       |
| Пре-коммит | Husky + lint-staged                               |
| API-клиент | openapi-typescript-codegen (генерация из OpenAPI) |

**Требования:** Node.js ≥ 20, npm ≥ 10

---

## Быстрый старт

```bash
# Скопируй шаблон в новый проект
cp -r templates/react-fsd-starter my-new-app
cd my-new-app

npm install
cp .env.example .env.local   # укажи VITE_API_URL
npm run gen:api              # сгенерируй API-клиент из openapi.json
npm run dev                  # http://localhost:3000
```

---

## Скрипты

| Скрипт                  | Что делает                                                            |
| ----------------------- | --------------------------------------------------------------------- |
| `npm run dev`           | Дев-сервер на порту 3000                                              |
| `npm run build`         | Прод-сборка (type-check + vite build)                                 |
| `npm run codestyle`     | Полная проверка: type-check + lint + stylelint + format:check       |
| `npm run codestyle:fix` | Авто-фикс: lint:fix + stylelint:fix + format                        |
| `npm run gen:api`       | Генерация API-клиента из `openapi.json`                               |

> **Главный скрипт кодстайла** — `npm run codestyle`. На пре-коммите через
> `lint-staged` проверяются только застейдженные файлы.

---

## Архитектура: Feature-Sliced Design

```
app → pages → widgets → features → entities → shared
```

Слой может импортировать только из слоёв **ниже** него. Импорты между слайсами —
через публичный API (`index.ts`) по alias `@/<layer>/<slice>`.

### Структура `src`

```
src/
├── app/
│   ├── providers/
│   │   ├── antd/              # ConfigProvider (тема, локаль antd)
│   │   ├── i18n/              # I18nextProvider
│   │   ├── router/            # createBrowserRouter + BaseLayout
│   │   └── store/             # Redux store + typed hooks
│   ├── styles/                # глобальные стили
│   └── App.tsx
│
├── pages/
│   ├── home/                  # главная страница
│   └── not-found/             # 404
│
├── widgets/
│   └── header/                # шапка приложения
│
├── features/
│   ├── counter/               # пример фичи (локальный state)
│   └── language-switcher/     # переключатель языка
│
├── entities/
│   ├── user/                  # пример сущности (типы + UI)
│   └── health/                # пример RTK Query + API
│
└── shared/
    ├── api/                   # configureApiClient, getApiClient, errors
    │   └── generated/         # сгенерированный клиент (npm run gen:api)
    ├── config/                # ROUTES, APP_NAME, locales
    ├── lib/                   # i18n, classNames
    └── ui/                    # переиспользуемые UI-компоненты
```

### Примеры в шаблоне

| Слой     | Пример                    | Что демонстрирует                          |
| -------- | ------------------------- | ------------------------------------------ |
| feature  | `counter`                 | Локальный state, i18n                      |
| feature  | `language-switcher`       | Переключение языка, shared/ui              |
| entity   | `user`                    | Типы + UI-компонент сущности               |
| entity   | `health`                  | RTK Query, обработка ошибок API            |
| widget   | `header`                  | Композиция shared + config                 |
| page     | `home`                    | Сборка widgets + features + entities       |
| shared   | `api`                     | OpenAPI-клиент, ProblemDetails             |

---

## Генерация API-клиента

1. Положи спецификацию OpenAPI/Swagger в корень как **`openapi.json`**
2. Запусти:

```bash
npm run gen:api
```

Код генерируется в `src/shared/api/generated`. Используй `getApiClient()` для
вызовов через сгенерированный `ApiClient`, или RTK Query в `entities/*/api/`.

---

## Добавление нового слайса

### Feature

```
src/features/my-feature/
├── index.ts              # export { MyFeature } from './ui/my-feature'
├── ui/
│   ├── my-feature.tsx
│   └── my-feature.scss
└── model/                # опционально: хуки, стейт
    └── use-my-feature.ts
```

### Entity с RTK Query

```
src/entities/order/
├── index.ts
├── api/
│   └── orderApi.ts       # createApi + endpoints
├── model/
│   └── types.ts
└── ui/
    └── order-card.tsx
```

Не забудь зарегистрировать reducer и middleware в `app/providers/store/store.ts`.

---

## ESLint: правила FSD

- `import/order` — группировка импортов по слоям (`@/app`, `@/pages`, …)
- `no-restricted-imports` — запрет `../../` между слайсами
- `@typescript-eslint/consistent-type-imports` — `import type`

---

## Переменные окружения

| Переменная     | Описание                          |
| -------------- | --------------------------------- |
| `VITE_API_URL` | Базовый URL бэкенда (без `/` в конце) |

Скопируй `.env.example` → `.env.local` и перезапусти `npm run dev`.

---

## Что удалить при старте нового проекта

1. Примеры `counter`, `user`, `health` — замени своими слайсами
2. `openapi.json` — подставь спецификацию своего API
3. Переводы в `shared/config/locales/` — очисти от демо-ключей
4. `APP_NAME` в `shared/config/index.ts`
