"use client";

import React, { createContext, use } from "react";
import Image from "next/image";

// Combine everything a NewsCard needs access to
type NewsCardContextValue = {
    data: {
        title: string;
        excerpt?: string;
        image: string;
        category?: string;
        categoryColorClass?: string;
        categoryBgClass?: string;
        ago?: string;
        comments?: number;
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
        <div className={`shrink-0 overflow-hidden rounded-lg ${className}`}>
            <img
                alt={data.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={data.image}
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
        <p className={`text-slate-400 text-sm line-clamp-2 leading-relaxed ${className}`}>
            {data.excerpt}
        </p>
    );
}

function NewsCardMeta() {
    const { data } = use(NewsCardContext)!;
    if (!data.ago && !data.comments) return null;

    return (
        <div className="flex items-center gap-4 text-sm text-slate-400">
            {data.ago && (
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> {data.ago}
                </span>
            )}
            {data.comments !== undefined && (
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span> {data.comments} comments
                </span>
            )}
        </div>
    );
}

function NewsCardBookmark({ className = "" }: { className?: string }) {
    return (
        <button className={`absolute text-slate-500 hover:text-v2-primary transition-colors ${className}`}>
            <span className="material-symbols-outlined text-[24px]">bookmark</span>
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
