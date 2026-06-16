import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { SCRIPTS, CATEGORIES } from '../data/scripts'
import { useApp } from '../App'
import confetti from 'canvas-confetti'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

interface PurchaseModalProps {
  script: { id: string; title: string; price: number } | null
  onClose: () => void
  onConfirm: () => void
}

function PurchaseModal({ script, onClose, onConfirm }: PurchaseModalProps) {
  const [loading, setLoading] = useState(false)

  if (!script) return null

  const handleConfirm = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    onConfirm()
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center px-5"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[#1A1A1E] border-2 border-[#FFD600] rounded-sm p-6 w-full max-w-[360px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#5A5A62] active:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="font-display text-2xl font-bold uppercase text-[#FFD600]">
            ПОДТВЕРЖДЕНИЕ ПОКУПКИ
          </h2>
          <h3 className="font-display text-lg font-semibold text-white mt-4">
            {script.title}
          </h3>
          <p className="font-mono text-2xl font-bold text-[#FFD600] mt-2">
            ★ {script.price}
          </p>
          <p className="text-sm text-[#8B8B93] mt-3">
            Стоимость будет списана с вашего баланса Telegram Stars.
          </p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="btn-brutal-secondary flex-1 text-xs"
            >
              ОТМЕНА
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="btn-brutal flex-1 text-xs disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loader" />
                  ОБРАБОТКА...
                </span>
              ) : (
                'ПОДТВЕРДИТЬ'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState('ВСЕ')
  const [purchaseScript, setPurchaseScript] = useState<{ id: string; title: string; price: number } | null>(null)
  const { showToast } = useApp()

  const filteredScripts = useMemo(() => {
    if (activeFilter === 'ВСЕ') return SCRIPTS
    const filterMap: Record<string, string[]> = {
      'БОТЫ': ['БОТ'],
      'ИНСТРУМЕНТЫ': ['ИНСТРУМЕНТ'],
      'ПАРСЕРЫ': ['ПАРСЕР'],
      'МАГАЗИНЫ': ['БОТ'],
    }
    const cats = filterMap[activeFilter] || [activeFilter]
    return SCRIPTS.filter((s) => cats.includes(s.category))
  }, [activeFilter])

  const handlePurchaseConfirm = () => {
    confetti({
      particleCount: 80,
      colors: ['#FFD600', '#FF2D6E', '#00E5FF', '#00E676'],
      ticks: 120,
      gravity: 1.2,
      spread: 70,
      origin: { x: 0.5, y: 0.3 },
    })
    showToast('Покупка успешна! Скрипт отправлен вам в личные сообщения.', 'success')
  }

  return (
    <div className="px-5 py-6 pb-28">
      <h1 className="font-display text-3xl font-bold uppercase text-[#FFD600]">
        КАТАЛОГ СКРИПТОВ
      </h1>

      {/* Category Filter */}
      <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={
              activeFilter === cat
                ? 'btn-brutal text-[10px] py-2.5 px-4 whitespace-nowrap'
                : 'btn-brutal-secondary text-[10px] py-2 px-4 whitespace-nowrap'
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Script List */}
      <motion.div
        className="mt-6 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={activeFilter}
      >
        <AnimatePresence mode="wait">
          {filteredScripts.map((script) => (
            <motion.div
              key={script.id}
              variants={itemVariants}
              layout
              className="card-brutal overflow-hidden relative"
            >
              {/* Image Area */}
              <div
                className="h-40 flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${
                    script.category === 'БОТ' ? '#FFD60020' :
                    script.category === 'ИНСТРУМЕНТ' ? '#00E5FF20' :
                    script.category === 'ПАРСЕР' ? '#00E67620' :
                    '#FF2D6E20'
                  } 0%, #1A1A1E 100%)`,
                }}
              >
                <img
                  src={script.image}
                  alt={script.title}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
                <span className="price-badge absolute top-3 right-3 text-sm">
                  ★ {script.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="tag-brutal">{script.category}</span>
                <h3 className="font-display text-xl font-semibold text-white mt-3">
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
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-5 pb-5">
                <button
                  onClick={() => setPurchaseScript({ id: script.id, title: script.title, price: script.price })}
                  className="btn-brutal flex-1 text-xs"
                >
                  КУПИТЬ ЗА ★ {script.price}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Purchase Modal */}
      <PurchaseModal
        script={purchaseScript}
        onClose={() => setPurchaseScript(null)}
        onConfirm={handlePurchaseConfirm}
      />
    </div>
  )
}
