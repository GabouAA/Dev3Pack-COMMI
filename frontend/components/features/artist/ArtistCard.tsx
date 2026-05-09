import React from 'react';
import Link from 'next/link';
import { CommissionCard } from '@/types';

interface ArtistCardProps {
    commission: CommissionCard;
}

export default function ArtistCard({ commission }: ArtistCardProps) {
    return (
        <Link href="/profile" className="flex flex-col gap-3 break-inside-avoid mb-8 cursor-pointer group block">
            {/* Imagen del Arte */}
            <div
                className={`w-full bg-[#E5E5E5] rounded-3xl transition-transform group-hover:scale-[1.02] overflow-hidden`}
                style={{ height: commission.imageHeight }}
            >
                {commission.imageUrl ? (
                    <img 
                        src={commission.imageUrl} 
                        alt={commission.title} 
                        className="w-full h-full object-cover"
                    />
                ) : null}
            </div>

            {/* Badges de Días y Precio */}
            <div className="flex items-center justify-between px-1">
                <span className="px-3 py-1 text-xs font-medium border border-gray-300 rounded-full">
                    {commission.days} Días
                </span>
                <span className="px-3 py-1 text-xs font-medium border border-gray-300 rounded-full">
                    {commission.price} {commission.currency}
                </span>
            </div>

            {/* Título */}
            <h3 className="text-base font-bold leading-tight px-1 text-gray-900">
                {commission.title}
            </h3>

            {/* Artista Info */}
            <div className="flex items-center gap-2 px-1">
                <div className="w-6 h-6 rounded-full bg-[#D9D9D9] overflow-hidden">
                    <img 
                        src={commission.artistAvatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"} 
                        alt={`Avatar de ${commission.artistName}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-sm font-medium text-gray-600">
                    {commission.artistName}
                </span>
            </div>
        </Link>
    );
}