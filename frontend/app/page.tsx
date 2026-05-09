import Navbar from '@/components/layout/Navbar';
import ArtistCard from '@/components/features/artist/ArtistCard';
import { CommissionCard } from '@/types';

// Tus datos de prueba siguen igual
const mockCommissions: CommissionCard[] = [
  { id: '1', title: 'Diseño de personaje original', days: 7, price: 25, currency: 'EUR', artistName: 'Akemi Art', imageHeight: '320px', imageUrl: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop' },
  { id: '2', title: 'Diseño de logo para Streamer', days: 5, price: 20, currency: 'EUR', artistName: 'Sora Ilustraciones', imageHeight: '240px', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop' },
  { id: '3', title: 'Diseño de portada para sencillo musical', days: 10, price: 30, currency: 'USD', artistName: 'Haru Ilustrador', imageHeight: '380px', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1909&auto=format&fit=crop' },
  { id: '4', title: 'Diseño de personaje original', days: 7, price: 25, currency: 'EUR', artistName: 'Ryuk Art', imageHeight: '260px', imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1974&auto=format&fit=crop' },
  { id: '5', title: 'Ilustración de personaje estilo anime', days: 5, price: 20, currency: 'EUR', artistName: 'Yumi Arts', imageHeight: '300px', imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1910&auto=format&fit=crop' },
  { id: '6', title: 'Diseño de stickers personalizados', days: 10, price: 30, currency: 'USD', artistName: 'Mochi Art', imageHeight: '220px', imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1926&auto=format&fit=crop' },
  { id: '7', title: 'Ilustración de mascota', days: 5, price: 20, currency: 'EUR', artistName: 'Kuroo Sensei', imageHeight: '200px', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop' },
  { id: '8', title: 'Diseño de banner para redes sociales', days: 10, price: 30, currency: 'USD', artistName: 'Kenji Designs', imageHeight: '180px', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
];

const categories = ['Retrato', 'Personaje original', 'Ilustración completa', 'Stickers', 'Portadas', 'FanArt'];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Contenedor principal: Mantiene todo centrado y bonito */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Hero Section */}
        <section className="mt-6 bg-[#F3F4F6] rounded-[2.5rem] px-6 py-16 md:py-24 flex flex-col items-center text-center relative w-full">
          <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase mb-4 border-b-2 border-black pb-1 inline-block text-black">
            COMMI
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black max-w-4xl leading-tight mb-10">
            Listo para realizar comisiones, comprar ilustraciones y mucho mas...
          </h1>
          <button className="px-8 py-4 text-lg font-bold text-black border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300">
            Registrarme
          </button>
        </section>

        {/* Buscador */}
        <div className="flex justify-center mt-12 mb-10 w-full">
          <div className="flex items-center w-full max-w-2xl px-6 py-4 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscas a algún artista en especifico ? ..."
              className="w-full outline-none text-gray-800 bg-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filtros Categorías */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center w-full">
          {categories.map((cat) => (
            <button key={cat} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full whitespace-nowrap hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-sm font-medium text-gray-700">{cat}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid (Responsivo 1 col celular, 4 cols monitor grande) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mt-12 w-full">
          {mockCommissions.map((commission) => (
            <ArtistCard key={commission.id} commission={commission} />
          ))}
        </div>

        {/* Botón Ver Más */}
        <div className="flex justify-center mt-16 w-full">
          <button className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Ver Más ...
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </main>
    </div>
  );
}