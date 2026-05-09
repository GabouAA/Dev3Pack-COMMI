'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FolderOpen, 
  Wallet, 
  Briefcase, 
  UploadCloud, 
  Layers, 
  FileText, 
  ShieldCheck,
  Plus,
  ArrowLeft
} from 'lucide-react'

const sidebarLinks = [
  { name: 'Portafolio', icon: FolderOpen },
  { name: 'Wallet', icon: Wallet },
  { name: 'Comisiones', icon: Briefcase },
  { name: 'Publicar', icon: UploadCloud },
  { name: 'Servicios', icon: Layers },
  { name: 'Formularios', icon: FileText },
  { name: 'Politicas', icon: ShieldCheck },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Servicios')

  return (
    <div className="flex min-h-screen bg-white text-brown font-sans overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-64 border-r border-gray-100 flex flex-col justify-between py-8 px-6 bg-white z-10"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-brown mb-12 tracking-tight pl-2">Dashboard</h1>
          
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link, i) => {
              const Icon = link.icon
              const isActive = activeTab === link.name
              return (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-olive text-white shadow-md shadow-olive/20 scale-[1.02]' 
                      : 'text-brown hover:bg-smoke hover:scale-[1.02]'
                  }`}
                >
                  <span className="font-semibold text-sm">{link.name}</span>
                  <Icon className="w-[18px] h-[18px] opacity-80" />
                </motion.button>
              )
            })}
          </nav>
        </div>

        <Link href="/profile" className="mt-8 block">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-brown text-brown font-bold rounded-full hover:bg-brown hover:text-white transition-colors shadow-sm"
          >
             <ArrowLeft className="w-4 h-4" /> Ver perfil
          </motion.button>
        </Link>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-white h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-smoke rounded-[2.5rem] p-8 lg:p-12 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] overflow-y-auto scrollbar-hide"
        >
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-5xl font-light tracking-tight text-brown"
            >
              {activeTab === 'Servicios' ? 'Servicio' : activeTab}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-brown hover:border-olive hover:text-olive hover:shadow-md transition-all duration-300">
                Nueva categoría <Plus className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-brown hover:border-olive hover:text-olive hover:shadow-md transition-all duration-300">
                Nuevo servicio <Plus className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={num} 
                className="px-6 py-2 rounded-full border border-gray-200 bg-white text-brown text-sm font-medium hover:bg-olive hover:text-white hover:border-olive hover:shadow-lg hover:shadow-olive/20 transition-all duration-300"
              >
                Filtro {num}
              </motion.button>
            ))}
          </motion.div>

          {/* Categories Grid */}
          <div className="space-y-12">
            {[1, 2].map((cat, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                key={cat} 
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-brown pl-2">Categoría {cat}</h3>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="w-full h-48 md:h-64 rounded-3xl border-2 border-transparent transition-all duration-300 cursor-pointer flex items-center justify-center group hover:border-olive overflow-hidden relative"
                >
                   <img 
                      src={index === 0 ? "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" : "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1910&auto=format&fit=crop"} 
                      alt={`Categoría ${cat}`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                   <p className="relative z-10 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
                     <Plus className="w-5 h-5 text-gold" /> Ver detalles
                   </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
      </main>

    </div>
  )
}
