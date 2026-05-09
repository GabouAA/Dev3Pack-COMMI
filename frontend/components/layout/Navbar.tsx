import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">

                    {/* Logo + links */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 10 Q7 2 12 10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                                    <circle cx="7" cy="5.5" r="1.2" fill="white"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900 tracking-tight">Ilustra</span>
                        </Link>

                        <div className="w-px h-5 bg-gray-200" />

                        <div className="flex items-center">
                            <Link
                                href="/comisiones"
                                className="px-3.5 py-1.5 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                Comisiones
                            </Link>
                            <Link
                                href="/compra"
                                className="px-3.5 py-1.5 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                Compra
                            </Link>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-800 transition-all">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60">
                                <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                                <path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                            Soy un ilustrador
                        </button>
                        <button className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all">
                            Registrarme
                        </button>
                    </div>

                </nav>
            </div>
        </header>
    );
}