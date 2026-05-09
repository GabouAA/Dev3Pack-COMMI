import React from 'react';
import { CommissionCard } from '@/types';

interface ArtistCardProps {
    commission: CommissionCard;
}

export default function ArtistCard({ commission }: ArtistCardProps) {
    return (
        <div className="flex flex-col gap-4 break-inside-avoid mb-8 cursor-pointer group">
            
            {/* Contenedor de la Imagen con Efecto Máscara (Zoom suave) */}
            <div
                className="w-full rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-xl"
                style={{ height: commission.imageHeight }}
            >
                <div className="w-full h-full bg-[#EAEAEA] transition-transform duration-700 ease-out group-hover:scale-105">
                    {/* Aquí en el futuro irá tu <Image /> real de Next.js */}
                </div>
            </div>

            {/* Contenido de la tarjeta (Textos y Badges) */}
            <div className="flex flex-col gap-2.5 px-2">
                
                {/* Badges de Días y Precio */}
                <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-gray-500 bg-gray-50 border border-gray-200 rounded-full">
                        {commission.days} Días
                    </span>
                    <span className="px-3.5 py-1.5 text-[13px] font-extrabold text-gray-900 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-gray-300 transition-colors">
                        {commission.price} {commission.currency}
                    </span>
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold leading-tight text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                    {commission.title}
                </h3>

                {/* Artista Info */}
                <div className="flex items-center gap-2.5 mt-1">
                    {/* Avatar placeholder con borde elegante */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gray-300 to-gray-200 border-2 border-white shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        {commission.artistName}
                    </span>
                </div>
            </div>
            
        </div>
    );
}