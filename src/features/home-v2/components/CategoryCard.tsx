"use client";

import React, { createContext, use } from "react";
import Image from "next/image";
import { Bookmark } from 'lucide-react';

type CategoryCardContextValue = {
    data: {
        title: string;
        heroImage: string;
        mainStory: string;
        substories: string[];
    };
};

const CategoryCardContext = createContext<CategoryCardContextValue | null>(null);

function CategoryCardProvider({ children, data }: { children: React.ReactNode; data: CategoryCardContextValue["data"] }) {
    return <CategoryCardContext value={{ data }}>{children}</CategoryCardContext>;
}

function CategoryCardFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-v2-surface-dark rounded-xl overflow-hidden border border-v2-border-dark shadow-2xl flex flex-col h-full">
            {children}
        </div>
    );
}

function CategoryCardHero() {
    const { data } = use(CategoryCardContext)!;
    return (
        <div className="relative group aspect-[16/9] cursor-pointer">
            <Image
                alt={data.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={data.heroImage}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-v2-background-dark via-transparent to-transparent"></div>
            <button className="absolute top-4 right-4 z-10 text-white/70 hover:text-v2-primary transition-colors">
                <Bookmark size={20} />
            </button>
            <div className="absolute bottom-4 left-4 pr-4">
                <span className="text-[10px] font-bold text-v2-primary uppercase block mb-1">{data.title}</span>
                <h4 className="text-white font-bold text-lg leading-tight group-hover:text-v2-primary transition-colors line-clamp-2">
                    {data.mainStory}
                </h4>
            </div>
        </div>
    );
}

function CategoryCardList() {
    const { data } = use(CategoryCardContext)!;
    return (
        <div className="p-6 flex-1">
            <ul className="space-y-4">
                {data.substories.map((story, i) => (
                    <li key={i} className={i > 0 ? "pt-4 border-t border-v2-border-dark" : ""}>
                        <a className="text-sm font-medium text-slate-300 hover:text-v2-primary transition-colors block line-clamp-2" href="#">
                            {story}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const CategoryCard = {
    Provider: CategoryCardProvider,
    Frame: CategoryCardFrame,
    Hero: CategoryCardHero,
    List: CategoryCardList,
};
