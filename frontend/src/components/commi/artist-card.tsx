import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Artist } from "./data";
import { SOL_USD } from "./data";

export function ArtistCard({ artist, index = 0 }: { artist: Artist; index?: number }) {
  return (
    <Link
      to="/profile/$handle"
      params={{ handle: artist.handle }}
      className="card-lift group block animate-fade-up overflow-hidden rounded-2xl border border-border bg-card"
      style={{ animationDelay: `${index * 80}ms`, boxShadow: "var(--shadow-soft)" }}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={artist.banner}
          alt={`Obra de ${artist.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-gold-foreground shadow-soft">
          Desde {artist.priceFrom} SOL
        </span>
        {artist.online && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-[10px] font-medium text-foreground backdrop-blur">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Online
          </span>
        )}
      </div>
      <div className="px-5 pb-5 pt-10">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="absolute -mt-16 h-16 w-16 rounded-full border-4 border-card object-cover shadow-soft"
        />
        <h3 className="text-base font-bold text-foreground">{artist.name}</h3>
        <p className="mono text-xs text-muted-foreground">@{artist.handle}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {artist.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-foreground/80">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {artist.rating.toFixed(1)}{" "}
            <span className="text-muted-foreground">({artist.reviews})</span>
          </span>
          <span className="mono text-[10px] text-muted-foreground">
            ≈ ${(artist.priceFrom * SOL_USD).toFixed(0)}
          </span>
        </div>
        <div className="mt-4 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-12">
          <div className="rounded-full bg-primary py-2 text-center text-xs font-semibold text-primary-foreground">
            Ver perfil →
          </div>
        </div>
      </div>
    </Link>
  );
}