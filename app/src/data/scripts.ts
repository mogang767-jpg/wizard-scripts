export interface Script {
  id: string
  category: string
  price: number
  title: string
  description: string
  tags: string[]
  image: string
}

export const SCRIPTS: Script[] = [
  {
    id: 'script-1',
    category: 'БОТ',
    price: 50,
    title: 'Автоответчик с ИИ',
    description: 'Бот с интеграцией ChatGPT для умных ответов. Поддержка контекста, настройка тональности, фильтры.',
    tags: ['Python', 'aiogram', 'OpenAI'],
    image: '/images/robot-yellow-card.jpg',
  },
  {
    id: 'script-2',
    category: 'ИНСТРУМЕНТ',
    price: 35,
    title: 'Парсер каналов',
    description: 'Сбор постов из Telegram-каналов по ключевым словам. Экспорт в JSON/CSV, фильтрация по дате.',
    tags: ['Python', 'Telethon', 'JSON'],
    image: '/images/parser-cyan-card.jpg',
  },
  {
    id: 'script-3',
    category: 'БОТ',
    price: 75,
    title: 'Магазин в Mini App',
    description: 'Полноценный магазин с корзиной, оплатой Stars и админ-панелью. Готовый шаблон.',
    tags: ['Node.js', 'React', 'Telegram API'],
    image: '/images/shop-pink-card.jpg',
  },
  {
    id: 'script-4',
    category: 'ПАРСЕР',
    price: 40,
    title: 'Парсер чатов',
    description: 'Сбор сообщений из групп и чатов с фильтрацией по пользователям и дате.',
    tags: ['Python', 'Telethon'],
    image: '/images/parser-green-card.jpg',
  },
  {
    id: 'script-5',
    category: 'БОТ',
    price: 60,
    title: 'Реферальная система',
    description: 'Полная реферальная система с многоуровневыми приглашениями и статистикой.',
    tags: ['Python', 'aiogram', 'PostgreSQL'],
    image: '/images/referral-orange-card.jpg',
  },
  {
    id: 'script-6',
    category: 'ИНСТРУМЕНТ',
    price: 25,
    title: 'Генератор отчётов',
    description: 'Автоматическая генерация PDF-отчётов из данных Telegram-каналов.',
    tags: ['Python', 'ReportLab'],
    image: '/images/report-yellow-card.jpg',
  },
]

export const CATEGORIES = ['ВСЕ', 'БОТЫ', 'ИНСТРУМЕНТЫ', 'ПАРСЕРЫ', 'МАГАЗИНЫ']
