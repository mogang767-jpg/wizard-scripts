import { useNavigate } from 'react-router-dom'
import { Zap, Grid2X2, Users, FileText } from 'lucide-react'
import { useApp } from '../App'
import type { Page } from '../App'

interface TabConfig {
  key: Page
  label: string
  icon: typeof Zap
  path: string
}

const TABS: TabConfig[] = [
  { key: 'home', label: 'ГЛАВНАЯ', icon: Zap, path: '/' },
  { key: 'catalog', label: 'КАТАЛОГ', icon: Grid2X2, path: '/catalog' },
  { key: 'referrals', label: 'РЕФЕРАЛЫ', icon: Users, path: '/referrals' },
  { key: 'order', label: 'ЗАКАЗ', icon: FileText, path: '/order' },
]

export default function BottomNav() {
  const { activePage } = useApp()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#0F0F12]/95 backdrop-blur-xl border-t-2 border-[#2E2E34]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around h-full max-w-lg mx-auto relative">
        {TABS.map((tab) => {
          const isActive = activePage === tab.key
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 w-16 h-full relative active:scale-95 transition-transform duration-100"
            >
              {isActive && (
                <span className="absolute top-0 w-6 h-0.5 bg-[#FFD600]" />
              )}
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={isActive ? 'text-[#FFD600]' : 'text-[#5A5A62]'}
              />
              <span
                className={`font-sans text-[11px] font-semibold uppercase tracking-widest ${
                  isActive ? 'text-[#FFD600]' : 'text-[#5A5A62]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
