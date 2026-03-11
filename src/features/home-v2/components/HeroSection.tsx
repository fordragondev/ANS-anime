"use client";

import React from "react";
import Image from "next/image";
import { Bookmark, Calendar, ThumbsUp } from 'lucide-react';
import { AnimeDetailItem } from "@/types/anime";
import { sanitizeHtml } from "@/lib/utils";

export function HeroSection({ featured }: { featured: AnimeDetailItem }) {
    if (!featured) return null;

    return (
        <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl bg-v2-surface-dark border border-v2-border-dark">
            <div className="relative h-[400px] sm:h-[500px] w-full">
                <Image
                    alt="Top Story Hero"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={featured.imageUrl}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-v2-background-dark via-v2-background-dark/30 to-transparent"></div>
                <div className="absolute top-4 right-4 z-10">
                    <button className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-v2-primary transition-colors">
                        <Bookmark size={20} />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                    <span className="mb-3 inline-block rounded-full bg-v2-primary px-3 py-1 text-xs font-bold uppercase text-white">
                        Featured Story
                    </span>
                    <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-4xl">
                        {featured.name}
                    </h1>
                    <p className="mb-4 max-w-2xl text-slate-300 line-clamp-2 sm:line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(featured.description) }}
                    />
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                            <Calendar size={16} /> {featured.vintage}
                        </span>
                        <span className="flex items-center gap-1">
                            <ThumbsUp size={16} /> {featured.voteCount} votes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
