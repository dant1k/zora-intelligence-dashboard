# 🚀 Zora Intelligence Dashboard - Quick Start

## 📋 Что у нас есть

✅ **Backend (FastAPI)** - Упрощенный API с эндпоинтами `/profiles` и `/profile/{address}`  
✅ **Frontend (Next.js + Tailwind)** - Минималистичный dark UI с карточками профилей  
✅ **Docker Setup** - Готовые контейнеры для разработки и продакшена  
✅ **Zora API Integration** - Использует ваш API ключ для получения данных  

## 🏃‍♂️ Быстрый запуск

### 1. Запуск в Docker
```bash
cd /Users/Kos/Zora_tracker
chmod +x run.sh
./run.sh
```

### 2. Проверка работы
```bash
# Тест backend API
chmod +x test-backend.sh
./test-backend.sh

# Или вручную:
curl http://localhost:8000/profiles?limit=5
```

### 3. Открыть в браузере
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🐳 Docker команды

```bash
# Запуск
docker-compose up --build -d

# Логи
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск
docker-compose restart
```

## 📊 Что отображается

Каждая карточка профиля показывает:
- 👤 **Имя профиля**
- 🪙 **Тикер токена**
- 💰 **Market Cap**
- 📈 **Количество постов**
- 🧾 **Количество холдеров**
- 🔗 **Соцсети** (Twitter, Farcaster)
- 🔗 **Ссылка на Zora**

## 🔧 Структура проекта

```
Zora_tracker/
├── backend/                 # FastAPI backend
│   ├── main.py             # Основной API
│   ├── requirements.txt    # Python зависимости
│   └── Dockerfile         # Backend контейнер
├── frontend/               # Next.js frontend
│   ├── app/               # App Router
│   ├── components/        # React компоненты
│   ├── types/            # TypeScript типы
│   └── Dockerfile        # Frontend контейнер
├── docker-compose.yml     # Development setup
├── docker-compose.prod.yml # Production setup
├── run.sh                # Скрипт запуска
└── test-backend.sh       # Тест API
```

## 🚀 Production Deploy

### 1. Подготовка сервера
```bash
# На Hetzner сервере
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Деплой
```bash
# Копируем проект на сервер
scp -r . user@your-server:/opt/zora-dashboard/

# На сервере
cd /opt/zora-dashboard
docker-compose -f docker-compose.prod.yml up -d
```

## 🎯 Следующие шаги

1. **Тестирование**: Проверьте работу API и frontend
2. **Кастомизация**: Настройте UI под ваши нужды
3. **Дополнительные фильтры**: Добавьте больше опций фильтрации
4. **Кэширование**: Добавьте Redis для кэширования
5. **Мониторинг**: Настройте логирование и мониторинг

## 🆘 Troubleshooting

### Backend не запускается
```bash
# Проверьте логи
docker-compose logs backend

# Проверьте API ключ
docker-compose exec backend env | grep ZORA_API_KEY
```

### Frontend не загружается
```bash
# Проверьте backend
curl http://localhost:8000/health

# Проверьте логи frontend
docker-compose logs frontend
```

### API не отвечает
```bash
# Проверьте Zora API
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.zora.co/v1/profiles?limit=1
```

---

**🎉 Готово! Ваш Zora Intelligence Dashboard запущен и готов к использованию!**
