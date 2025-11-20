# Defect_Control_Microservices

Данный репозиторий содержит выполненние задание № 2 с использованием микросервисов по дисциплине "Технологии разработки приложений на базе фреймворков". Далее представлена инструкция по запуску проекта через Docker.

### Запуск контейнеров:

```
docker compose up -d --build
```

После старта сервисы доступны:

* API Gateway → [http://localhost:8000/v1](http://localhost:8000/v1)
* Users Service → [http://localhost:8001](http://localhost:8001)
* Orders Service → [http://localhost:8002](http://localhost:8002)

### Остановка:

```
docker-compose down
```

## OpenAPI

Базовая спецификация API находится по пути:

```
docs/openapi.yaml
```

## Запуск тестов

Каждый микросервис содержит собственные тесты.

### Пример:

```
cd service_users
npm test
```

и

```
cd service_orders
npm test
```

## Основной функциональный поток

1. **Регистрация пользователя** → `POST /v1/users/register`
2. **Авторизация** → `POST /v1/users/login`
3. **Далее с полученным JWT токеном:**

   * Создание заказа → `POST /v1/orders`
   * Получение заказа → `GET /v1/orders/:id`
   * Список заказов → `GET /v1/orders`