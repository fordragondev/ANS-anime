"use client";

import React, { createContext, use } from "react";
import Image from "next/image";
import { Bookmark, Calendar, ThumbsUp } from 'lucide-react';
import { sanitizeHtml } from "@/lib/utils";

// Combine everything a NewsCard needs access to
type NewsCardContextValue = {
    data: {
        title: string;
        excerpt?: string;
        image: string;
        category?: string;
        categoryColorClass?: string;
        categoryBgClass?: string;
        vintage?: string;
        votes?: number;
    };
};

const NewsCardContext = createContext<NewsCardContextValue | null>(null);

function NewsCardProvider({
    children,
    data,
}: {
    children: React.ReactNode;
    data: NewsCardContextValue["data"];
}) {
    return (
        <NewsCardContext value={{ data }}>
            {children}
        </NewsCardContext>
    );
}

function NewsCardFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <article className={`bg-v2-surface-dark border border-v2-border-dark rounded-xl p-5 hover:border-v2-primary/40 transition-all group relative ${className}`}>
            {children}
        </article>
    );
}

function NewsCardImage({ className = "" }: { className?: string }) {
    const { data } = use(NewsCardContext)!;
    return (
        <div className={`shrink-0 overflow-hidden rounded-lg relative ${className}`}>
            <Image
                alt={data.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={data.image}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
            />
        </div>
    );
}

function NewsCardContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col justify-center ${className}`}>
            {children}
        </div>
    );
}

function NewsCardBadge() {
    const { data } = use(NewsCardContext)!;
    if (!data.category) return null;

    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${data.categoryColorClass} ${data.categoryBgClass}`}>
            {data.category}
        </span>
    );
}

function NewsCardTitle({ className = "" }: { className?: string }) {
    const { data } = use(NewsCardContext)!;
    return (
        <h3 className={`font-bold text-white group-hover:text-v2-primary transition-colors ${className}`}>
            {data.title}
        </h3>
    );
}

function NewsCardExcerpt({ className = "" }: { className?: string }) {
    const { data } = use(NewsCardContext)!;
    if (!data.excerpt) return null;

    return (
        <p className={`text-slate-400 text-sm line-clamp-2 leading-relaxed ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.excerpt) }}
        />
    );
}

function NewsCardMeta() {
    const { data } = use(NewsCardContext)!;
    if (!data.vintage && !data.votes) return null;

    return (
        <div className="flex items-center gap-4 text-sm text-slate-400">
            {data.vintage && (
                <span className="flex items-center gap-1">
                    <Calendar size={16} /> {data.vintage}
                </span>
            )}
            {data.votes !== undefined && (
                <span className="flex items-center gap-1">
                    <ThumbsUp size={16} /> {data.votes} votes
                </span>
            )}
        </div>
    );
}

function NewsCardBookmark({ className = "" }: { className?: string }) {
    return (
        <button className={`absolute text-slate-500 hover:text-v2-primary transition-colors ${className}`}>
            <Bookmark size={24} />
        </button>
    );
}

export const NewsCard = {
    Provider: NewsCardProvider,
    Frame: NewsCardFrame,
    Image: NewsCardImage,
    Content: NewsCardContent,
    Badge: NewsCardBadge,
    Title: NewsCardTitle,
    Excerpt: NewsCardExcerpt,
    Meta: NewsCardMeta,
    Bookmark: NewsCardBookmark,
};
