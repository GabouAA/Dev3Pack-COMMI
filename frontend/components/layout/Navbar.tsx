import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            {/* Usamos max-w-[1600px] para que se alinee perfecto con tu video gigante */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
                <nav className="flex items-center justify-between h-20 sm:h-24">

                    {/* Logo + links */}
                    <div className="flex items-center gap-6 sm:gap-10">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                                <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 10 Q7 2 12 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    <circle cx="7" cy="5.5" r="1.5" fill="white"/>
                                </svg>
                            </div>
                            <span className="text-xl font-extrabold text-black tracking-tight">Ilustra</span>
                        </Link>

                        {/* Separador vertical sutil */}
                        <div className="hidden sm:block w-px h-8 bg-gray-200" />

                        {/* Links de navegación */}
                        <div className="hidden sm:flex items-center gap-1">
                            <Link
                                href="/comisiones"
                                className="px-5 py-2 text-base font-medium text-gray-500 hover:text-black hover:bg-gray-100/80 rounded-full transition-all duration-300"
                            >
                                Comisiones
                            </Link>
                            <Link
                                href="/compra"
                                className="px-5 py-2 text-base font-medium text-gray-500 hover:text-black hover:bg-gray-100/80 rounded-full transition-all duration-300"
                            >
                                Compra
                            </Link>
                        </div>
                    </div>

                    {/* Acciones (Botones) */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-base font-medium text-gray-600 border-2 border-gray-200 rounded-full hover:border-black hover:text-black transition-all duration-300">
                            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="opacity-80">
                                <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Soy un ilustrador
                        </button>
                        
                        <button className="px-7 py-3 text-base font-bold text-white bg-black rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-lg hover:shadow-black/20 transition-all duration-300">
                            Registrarme
                        </button>
                    </div>

                </nav>
            </div>
        </header>
    );
}