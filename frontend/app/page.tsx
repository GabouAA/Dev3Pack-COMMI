import Navbar from '@/components/layout/Navbar';
import ArtistCard from '@/components/features/artist/ArtistCard';
import { CommissionCard } from '@/types';

const mockCommissions: CommissionCard[] = [
  { id: '1', title: 'Diseño de personaje original', days: 7, price: 25, currency: 'EUR', artistName: 'Akemi Art', imageHeight: '320px' },
  { id: '2', title: 'Diseño de logo para Streamer', days: 5, price: 20, currency: 'EUR', artistName: 'Sora Ilustraciones', imageHeight: '240px' },
  { id: '3', title: 'Diseño de portada para sencillo musical', days: 10, price: 30, currency: 'USD', artistName: 'Haru Ilustrador', imageHeight: '380px' },
  { id: '4', title: 'Diseño de personaje original', days: 7, price: 25, currency: 'EUR', artistName: 'Ryuk Art', imageHeight: '260px' },
  { id: '5', title: 'Ilustración de personaje estilo anime', days: 5, price: 20, currency: 'EUR', artistName: 'Yumi Arts', imageHeight: '300px' },
  { id: '6', title: 'Diseño de stickers personalizados', days: 10, price: 30, currency: 'USD', artistName: 'Mochi Art', imageHeight: '220px' },
  { id: '7', title: 'Ilustración de mascota', days: 5, price: 20, currency: 'EUR', artistName: 'Kuroo Sensei', imageHeight: '200px' },
  { id: '8', title: 'Diseño de banner para redes sociales', days: 10, price: 30, currency: 'USD', artistName: 'Kenji Designs', imageHeight: '180px' },
];

const categories = ['Retrato', 'Personaje original', 'Ilustración completa', 'Stickers', 'Portadas', 'FanArt'];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero con video ── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 w-full flex justify-center">
        <div
          className="w-full max-w-[1600px] relative rounded-[2.5rem] overflow-hidden bg-black shadow-2xl"
          style={{ height: 'calc(100vh - 120px)' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.6 }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-white/60 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm bg-white/5">
              COMMI
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl leading-[1.05] tracking-tight mb-5">
              Comisiones,{' '}
              <span className="relative inline-block">
                ilustraciones
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M2 6 Q75 2 150 5 Q225 8 298 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>
                </svg>
              </span>
              {' '}y mucho más.
            </h1>

            <p className="text-base md:text-lg text-white/60 max-w-lg mb-10">
              Conecta con ilustradores talentosos, encarga tu arte ideal o vende tus comisiones al mundo.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="px-8 py-3.5 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                Empezar gratis
              </button>
              <button className="px-8 py-3.5 text-sm font-medium text-white border border-white/25 rounded-full hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                Ver comisiones →
              </button>
            </div>

            <div className="flex items-center gap-0 mt-14 backdrop-blur-sm bg-black/10 p-4 rounded-3xl border border-white/10">
              {[
                { value: '1.2k+', label: 'Artistas' },
                { value: '8k+',   label: 'Comisiones' },
                { value: '4.9★',  label: 'Valoración' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="text-center px-8">
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/15" />}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
            <span className="text-[10px] tracking-widest uppercase">scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── Contenido principal alineado con el Hero (max-w-[1600px]) ── */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Buscador */}
        <div className="flex justify-center mt-14 mb-8 w-full">
          <div className="flex items-center w-full max-w-2xl px-6 py-3.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="¿Buscás a algún artista en específico?..."
              className="w-full outline-none text-gray-800 bg-transparent placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide justify-start md:justify-center w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              className="flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-full whitespace-nowrap hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 group"
            >
              <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-white/30 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors">{cat}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid (Agregamos 2xl:columns-5 para aprovechar los 1600px sin deformar) */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5 gap-6 mt-10 w-full">
          {mockCommissions.map((commission) => (
            <ArtistCard key={commission.id} commission={commission} />
          ))}
        </div>

        {/* Ver Más */}
        <div className="flex justify-center mt-14 w-full">
          <button className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200">
            Ver más
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </main>
    </div>
  );
}