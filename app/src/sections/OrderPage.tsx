import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MessageCircle } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

type FormData = {
  botName: string
  description: string
  budget: string
  contact: string
  urgency: string
}

const INITIAL_FORM: FormData = {
  botName: '',
  description: '',
  budget: '',
  contact: '',
  urgency: 'Не срочно — до 2 недель',
}

const URGENCY_OPTIONS = [
  'Не срочно — до 2 недель',
  'Средняя — до 1 недели',
  'Срочно — 2-3 дня',
  'Очень срочно — 24 часа',
]

export default function OrderPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const isValid = form.botName.trim() && form.description.trim()

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!form.botName.trim()) newErrors.botName = 'Укажи название бота'
    if (!form.description.trim()) newErrors.description = 'Опиши задачу'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Shake animation on error fields
      return
    }

    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setSubmitted(false)
    setErrors({})
  }

  return (
    <div className="px-5 py-6 pb-28">
      <h1 className="font-display text-3xl font-bold uppercase text-[#FFD600]">
        ЗАКАЗАТЬ СКРИПТ
      </h1>
      <p className="text-base text-[#8B8B93] mt-2 leading-relaxed">
        Не нашёл нужный скрипт? Опиши задачу — разработаем индивидуальное решение.
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* Bot Name */}
            <motion.div variants={itemVariants}>
              <label className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93] block mb-2">
                НАЗВАНИЕ БОТА / ПРОЕКТА
              </label>
              <input
                type="text"
                value={form.botName}
                onChange={(e) => handleChange('botName', e.target.value)}
                placeholder="Например: Бот для доставки еды"
                className={`input-brutal ${errors.botName ? 'border-[#FF2D6E] animate-shake' : ''}`}
              />
              {errors.botName && (
                <p className="font-mono text-[11px] uppercase text-[#FF2D6E] mt-1">{errors.botName}</p>
              )}
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <label className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93] block mb-2">
                ОПИШИ ЗАДАЧУ ПОДРОБНО
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Какой функционал нужен? Какие команды? Есть ли интеграции с другими сервисами?"
                className={`input-brutal min-h-[150px] resize-y ${errors.description ? 'border-[#FF2D6E] animate-shake' : ''}`}
              />
              {errors.description && (
                <p className="font-mono text-[11px] uppercase text-[#FF2D6E] mt-1">{errors.description}</p>
              )}
            </motion.div>

            {/* Budget */}
            <motion.div variants={itemVariants}>
              <label className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93] block mb-2">
                БЮДЖЕТ (В TELEGRAM STARS)
              </label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="Например: 200"
                className="input-brutal"
              />
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#5A5A62] mt-1.5">
                Примерная сумма, которую готов потратить
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <label className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93] block mb-2">
                ТВОЙ TELEGRAM (ОПЦИОНАЛЬНО)
              </label>
              <input
                type="text"
                value={form.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="@username"
                className="input-brutal"
              />
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#5A5A62] mt-1.5">
                Если хочешь обсудить детали лично
              </p>
            </motion.div>

            {/* Urgency */}
            <motion.div variants={itemVariants}>
              <label className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93] block mb-2">
                СРОЧНОСТЬ
              </label>
              <div className="relative">
                <select
                  value={form.urgency}
                  onChange={(e) => handleChange('urgency', e.target.value)}
                  className="input-brutal appearance-none cursor-pointer"
                >
                  {URGENCY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#1A1A1E] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#8B8B93" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={!isValid || submitting}
                className={`btn-brutal w-full ${!isValid ? 'opacity-40 cursor-not-allowed' : ''} ${submitted ? '!bg-[#00E676]' : ''}`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader" />
                    <span className="font-mono text-xs uppercase tracking-widest">ОТПРАВКА...</span>
                  </span>
                ) : (
                  'ОТПРАВИТЬ ЗАЯВКУ →'
                )}
              </button>
            </motion.div>
          </motion.form>
        ) : (
          /* ─── Success State ─── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-[#1A1A1E] border-2 border-[#00E676] rounded-sm p-8 text-center"
          >
            <CheckCircle size={64} className="text-[#00E676] mx-auto" strokeWidth={1.5} />
            <h2 className="font-display text-2xl font-bold uppercase text-[#00E676] mt-4">
              ЗАЯВКА ОТПРАВЛЕНА!
            </h2>
            <p className="text-base text-[#8B8B93] mt-3 leading-relaxed">
              Мы получили твою заявку и свяжемся в ближайшее время для уточнения деталей.
            </p>
            <button
              onClick={handleReset}
              className="btn-brutal-secondary mt-6"
            >
              НОВЫЙ ЗАКАЗ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card-brutal p-5 mt-8 flex gap-4 items-start"
      >
        <MessageCircle size={24} className="text-[#00E5FF] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <div>
          <p className="font-sans text-base font-semibold text-white">ПРЯМАЯ СВЯЗЬ</p>
          <p className="text-sm text-[#8B8B93] mt-1 leading-relaxed">
            Если хочешь обсудить проект перед заказом, напиши напрямую:{" "}
            <span className="text-[#00E5FF] underline cursor-pointer active:text-[#FFD600]">
              @wizardscripts_admin
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
