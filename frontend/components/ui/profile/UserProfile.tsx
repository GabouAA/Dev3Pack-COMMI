'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Copy, 
  ShoppingCart, 
  MessageCircle, 
  Bell, 
  ChevronDown,
  Gamepad2
} from 'lucide-react'

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.005H5.03l12.053 15.765z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

type Tab = 'Comisiones' | 'Publicaciones' | 'Portafolio'

const mockCommissions = [
  { id: '1', title: 'Diseño de personaje original', days: 7, price: 15, currency: 'SOL', image: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop' },
  { id: '2', title: 'Ilustración estilo Anime', days: 5, price: 10, currency: 'SOL', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1974&auto=format&fit=crop' },
  { id: '3', title: 'Diseño de Logo (Streamer)', days: 10, price: 20, currency: 'SOL', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop' },
  { id: '4', title: 'Emotes para Twitch (Pack)', days: 4, price: 5, currency: 'SOL', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1926&auto=format&fit=crop' },
]

const portfolioImages = [
  "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1910&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1909&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1926&auto=format&fit=crop"
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<Tab>('Comisiones')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full bg-white text-brown font-sans pb-24">
      {/* Header Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Top actions: Right Side */}
        <div className="flex flex-wrap justify-end items-center gap-4 mb-4">
          <div className="flex items-center gap-2 bg-olive/10 text-olive px-3 py-1.5 rounded-full text-sm font-bold border border-olive/20">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse"></span>
            Abierto a comisiones
          </div>
          <div className="flex items-center gap-1 bg-smoke border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">
            USD <ChevronDown className="w-4 h-4 text-gray-500"/>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MessageCircle className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Banner */}
        <div className="w-full h-48 sm:h-64 bg-smoke rounded-3xl relative border border-gray-200 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
            alt="Banner de arte abstracto" 
            className="w-full h-full object-cover rounded-3xl" 
          />
          {/* Avatar (Left aligned) */}
          <div className="absolute -bottom-16 left-8 sm:left-12">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-[6px] border-white bg-smoke shadow-sm flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                  alt="Avatar del artista" 
                  className="w-full h-full object-cover" 
                />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-20 flex flex-col md:flex-row gap-12 sm:px-4">
          
          {/* Left Column (Info) */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Nombre general</h1>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <span className="text-sm font-medium">@Nombre_de_usuario</span>
                <button 
                  onClick={handleCopyLink} 
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors relative" 
                  title="Copiar enlace"
                >
                  <Copy className="w-4 h-4" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brown text-white text-xs px-2 py-1 rounded">
                      ¡Copiado!
                    </span>
                  )}
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Descripción de perfil. Artista digital especializado en personajes originales y diseño de banners. ¡Hagamos arte increíble juntos!
            </p>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Redes sociales</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  <TwitterIcon className="w-4 h-4" /> Twitter
                </a>
                <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  <Gamepad2 className="w-4 h-4" /> Discord
                </a>
                <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  <FacebookIcon className="w-4 h-4" /> Facebook
                </a>
              </div>
            </div>

            <button className="w-full py-3.5 px-4 bg-olive text-white text-sm font-bold rounded-full hover:bg-[#55721c] transition-transform active:scale-95 shadow-md mt-4">
              Solicitar Comisión
            </button>
            <Link href="/dashboard" className="block w-full">
              <button className="w-full py-3.5 px-4 bg-white text-brown border-2 border-brown text-sm font-bold rounded-full hover:bg-brown hover:text-white transition-all duration-300">
                Ver dashboard
              </button>
            </Link>
          </div>

          {/* Right Column (Tabs & Content) */}
          <div className="w-full md:w-2/3">
            {/* Tabs Navigation */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
              {(['Comisiones', 'Publicaciones', 'Portafolio'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-base font-bold pb-4 relative transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'text-brown' : 'text-gray-400 hover:text-brown'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeProfileTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'Comisiones' && (
                  <motion.div
                    key="Comisiones"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {mockCommissions.map((comm) => (
                        <motion.div
                          key={comm.id}
                          className="flex flex-col gap-3 group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {/* Image Placeholder */}
                          <div className="w-full h-48 bg-smoke border border-gray-200 rounded-3xl overflow-hidden">
                            <img 
                              src={comm.image} 
                              alt={`Ilustración para ${comm.title}`} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center justify-between px-1">
                            <span className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-200 rounded-full">
                              {comm.days} Días
                            </span>
                            <span className="px-3 py-1 text-xs font-bold bg-gold text-brown rounded-full shadow-sm">
                              {comm.price} {comm.currency}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-base font-bold leading-snug px-1 text-gray-900 group-hover:text-gray-600 transition-colors">
                            {comm.title}
                          </h3>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Publicaciones' && (
                  <motion.div
                    key="Publicaciones"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center h-48 text-gray-400 space-y-2 border-2 border-dashed border-gray-100 rounded-3xl"
                  >
                    <p className="font-medium">Aún no hay publicaciones</p>
                  </motion.div>
                )}

                {activeTab === 'Portafolio' && (
                  <motion.div
                    key="Portafolio"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  >
                    {portfolioImages.map((img, index) => (
                      <div key={index} className="aspect-square bg-smoke border border-gray-200 rounded-2xl overflow-hidden cursor-pointer">
                        <img 
                          src={img} 
                          alt={`Trabajo de portafolio ${index + 1}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
