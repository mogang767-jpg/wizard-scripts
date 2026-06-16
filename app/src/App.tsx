import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './sections/HomePage'
import CatalogPage from './sections/CatalogPage'
import ReferralsPage from './sections/ReferralsPage'
import OrderPage from './sections/OrderPage'
import BottomNav from './sections/BottomNav'
import ErrorBoundary from './sections/ErrorBoundary'
import './App.css'

export type Page = 'home' | 'catalog' | 'referrals' | 'order'

interface AppState {
  activePage: Page
  setActivePage: (p: Page) => void
  toast: { message: string; type: 'success' | 'error' } | null
  showToast: (message: string, type: 'success' | 'error') => void
  cart: string[]
  addToCart: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const [activePage, setActivePage] = useState<Page>('home')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [cart, setCart] = useState<string[]>([])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id])
  }

  useEffect(() => {
    const path = location.pathname
    if (path.includes('catalog')) setActivePage('catalog')
    else if (path.includes('referrals')) setActivePage('referrals')
    else if (path.includes('order')) setActivePage('order')
    else setActivePage('home')
  }, [location])

  useEffect(() => {
    // @ts-ignore
    if (window.Telegram?.WebApp) {
      // @ts-ignore
      window.Telegram.WebApp.ready()
      // @ts-ignore
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <ErrorBoundary>
    <AppContext.Provider value={{ activePage, setActivePage, toast, showToast, cart, addToCart }}>
      <div className="min-h-screen bg-[#0F0F12] text-white relative pb-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/catalog" element={<AnimatedPage><CatalogPage /></AnimatedPage>} />
            <Route path="/referrals" element={<AnimatedPage><ReferralsPage /></AnimatedPage>} />
            <Route path="/order" element={<AnimatedPage><OrderPage /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>

        <BottomNav />

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-5 left-4 right-4 z-[100] flex justify-center"
            >
              <div
                className={`font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-sm ${
                  toast.type === 'success' ? 'bg-[#00E676] text-[#0F0F12]' : 'bg-[#FF2D6E] text-white'
                }`}
              >
                {toast.type === 'success' ? '✓ ' : '✗ '}{toast.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
    </ErrorBoundary>
  )
}
