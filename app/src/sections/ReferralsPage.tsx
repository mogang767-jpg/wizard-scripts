import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Star, Copy, Check, Send } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const REFERRAL_LINK = 't.me/WizardScriptsBot?start=ref_12345'

const STEPS = [
  {
    num: '1',
    title: 'Поделись ссылкой',
    description: 'Отправь свою уникальную ссылку друзьям в Telegram или другие соцсети.',
  },
  {
    num: '2',
    title: 'Друг покупает скрипт',
    description: 'Когда друг перейдёт по ссылке и купит любой скрипт, ты получишь бонус.',
  },
  {
    num: '3',
    title: 'Получи 10 ⭐ за каждого',
    description: 'За каждую покупку приглашённого друга начисляется 10 Telegram Stars на твой баланс.',
  },
]

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const invitedCount = 12
  const earnedStars = 120
  const progressPercent = 60

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = REFERRAL_LINK
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = () => {
    const text = encodeURIComponent(`Присоединяйся к Wizard Scripts! Готовые скрипты для Telegram-ботов: ${REFERRAL_LINK}`)
    // @ts-ignore
    if (window.Telegram?.WebApp) {
      // @ts-ignore
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(REFERRAL_LINK)}&text=${text}`)
    } else {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(REFERRAL_LINK)}&text=${text}`, '_blank')
    }
  }

  return (
    <div className="px-5 py-6 pb-28">
      <h1 className="font-display text-3xl font-bold uppercase text-[#FFD600]">
        РЕФЕРАЛЬНАЯ СИСТЕМА
      </h1>

      {/* Stats Card */}
      <motion.div
        className="card-brutal p-6 mt-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-[#00E5FF]" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-2xl font-bold text-white">{invitedCount}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93]">ПРИГЛАШЁННЫХ</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star size={24} className="text-[#FFD600]" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-2xl font-bold text-[#FFD600]">{earnedStars} ⭐</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#8B8B93]">ЗАРАБОТАНО</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="bg-[#242428] h-2 overflow-hidden">
            <div
              className="h-full animate-progress"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #FFD600, #FF9100)',
              }}
            />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#5A5A62] mt-2">
            Ещё 3 приглашения до следующего бонуса!
          </p>
        </div>
      </motion.div>

      {/* Invitation Section */}
      <motion.div
        className="mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          ПРИГЛАСИТЬ ДРУЗЕЙ
        </h2>

        {/* Referral Link */}
        <motion.div
          variants={itemVariants}
          className="mt-4 bg-[#242428] border-2 border-dashed border-[#FFD600] rounded-sm p-4 flex items-center gap-3"
        >
          <span className="font-mono text-sm text-[#FFD600] flex-1 truncate">
            {REFERRAL_LINK}
          </span>
          <button
            onClick={handleCopy}
            className="text-[#FFD600] active:text-[#FF9100] transition-colors relative"
          >
            {copied ? <Check size={24} className="text-[#00E676]" /> : <Copy size={24} />}
          </button>
        </motion.div>

        {/* Share Buttons */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleShare}
            className="btn-brutal text-xs py-3 !bg-[#00E5FF] !text-[#0F0F12] !shadow-[4px_4px_0px_#FFD600]"
          >
            <Send size={18} className="mr-2" />
            ПОДЕЛИТЬСЯ В TG
          </button>
          <button
            onClick={handleCopy}
            className="btn-brutal-secondary text-xs py-3"
          >
            <Copy size={18} className="mr-2" />
            КОПИРОВАТЬ ССЫЛКУ
          </button>
        </motion.div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        className="mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          КАК ЭТО РАБОТАЕТ
        </h2>
        <div className="mt-4 space-y-4">
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              className="flex gap-4 items-start"
            >
              <div className="w-8 h-8 bg-[#FFD600] text-[#0F0F12] font-display text-lg font-bold flex items-center justify-center flex-shrink-0">
                {step.num}
              </div>
              <div>
                <p className="font-sans text-base font-semibold text-white">{step.title}</p>
                <p className="text-sm text-[#8B8B93] mt-1 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rewards Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 p-6 text-center rounded-sm"
        style={{ background: 'linear-gradient(135deg, #FF2D6E, #FF9100)' }}
      >
        <p className="font-display text-xl font-semibold text-white" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
          💎 ПРИГЛАСИ 5 ДРУЗЕЙ И ПОЛУЧИ СКРИПТ БЕСПЛАТНО
        </p>
      </motion.div>
    </div>
  )
}
