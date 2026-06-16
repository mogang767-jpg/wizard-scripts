import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Shield, Star, Code, ChevronDown } from 'lucide-react'
import BotScene from './BotScene'
import { SCRIPTS } from '../data/scripts'
import { useApp } from '../App'

const FEATURES = [
  {
    icon: Zap,
    color: '#FFD600',
    title: 'МГНОВЕННАЯ ДОСТАВКА',
    description: 'Получаешь код сразу после оплаты. Никаких ожиданий.',
  },
  {
    icon: Shield,
    color: '#00E5FF',
    title: 'ПРОВЕРЕННЫЙ КОД',
    description: 'Каждый скрипт протестирован перед публикацией. Гарантия работоспособности.',
  },
  {
    icon: Star,
    color: '#FF2D6E',
    title: 'TELEGRAM STARS',
    description: 'Оплата через внутреннюю валюту Telegram. Быстро и безопасно.',
  },
  {
    icon: Code,
    color: '#00E676',
    title: 'ОТКРЫТЫЙ КОД',
    description: 'Полный доступ к исходникам. Модифицируй под свои задачи.',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function HomePage() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const featuredScripts = SCRIPTS.slice(0, 3)

  const handleBuy = (_id: string) => {
    showToast('Добавлено в корзину!', 'success')
  }

  return (
    <div>
      {/* ─── 3D HERO ─── */}
      <section className="relative w-full" style={{ height: '100vh' }}>
        <BotScene />

        {/* Text Overlay */}
        <div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-5"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, #0F0F12 100%)',
            pointerEvents: 'none',
          }}
        >
          <h1
            className="font-display text-4xl font-bold uppercase tracking-tight text-white max-w-[340px] text-shadow-brutal pointer-events-auto"
            style={{ lineHeight: 1.0 }}
          >
            WIZARD SCRIPTS
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#FFD600] mt-2 pointer-events-auto">
            Готовые скрипты для Telegram-ботов
          </p>
          <p className="text-base text-[#8B8B93] max-w-[300px] mt-4 pointer-events-auto">
            Покупай готовые решения и запускай ботов за минуты. Без кода. Без сложностей.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="btn-brutal mt-8 pointer-events-auto"
          >
            СМОТРЕТЬ КАТАЛОГ →
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce-slow">
          <ChevronDown size={24} className="text-[#5A5A62]" />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="px-5 py-12 bg-[#0F0F12]">
        <h2 className="font-display text-2xl font-bold uppercase text-[#FFD600] text-center">
          ПОЧЕМУ МЫ
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="card-brutal p-5"
              >
                <Icon size={32} style={{ color: feature.color }} strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold text-white mt-3" style={{ lineHeight: 1.2 }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8B8B93] mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ─── FEATURED SCRIPTS ─── */}
      <section className="px-5 py-12 bg-[#1A1A1E]">
        <h2 className="font-display text-2xl font-bold uppercase text-[#FFD600]">
          ПОПУЛЯРНЫЕ СКРИПТЫ
        </h2>
        <motion.div
          className="mt-8 space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredScripts.map((script) => (
            <motion.div
              key={script.id}
              variants={itemVariants}
              className="card-brutal p-5"
            >
              <div className="flex justify-between items-start">
                <span className="tag-brutal">{script.category}</span>
                <span className="price-badge">★ {script.price}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-white mt-4">
                {script.title}
              </h3>
              <p className="text-sm text-[#8B8B93] mt-2 leading-relaxed">
                {script.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {script.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] uppercase tracking-wider text-[#8B8B93] bg-[#242428] px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleBuy(script.id)}
                className="btn-brutal-secondary mt-4 text-sm"
              >
                КУПИТЬ →
              </button>
            </motion.div>
          ))}
        </motion.div>
        <button
          onClick={() => navigate('/catalog')}
          className="btn-brutal w-full mt-6"
        >
          ВСЕ СКРИПТЫ →
        </button>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section
        className="px-5 py-8"
        style={{ background: 'linear-gradient(135deg, #FFD600, #FF9100)' }}
      >
        <div className="flex justify-around text-center">
          <div>
            <p className="font-mono text-2xl font-bold text-[#0F0F12]">120+</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#0F0F12]/70 mt-1">СКРИПТОВ</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-[#0F0F12]">850+</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#0F0F12]/70 mt-1">ПОКУПОК</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-[#0F0F12]">4.9</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#0F0F12]/70 mt-1">РЕЙТИНГ</p>
          </div>
        </div>
      </section>
    </div>
  )
}
