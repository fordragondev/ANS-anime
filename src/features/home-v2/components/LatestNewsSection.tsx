"use client";

import React from "react";
import { NewsCard } from "./NewsCard";
import { AnimeDetailItem } from "@/types/anime";
import { getTypeBadgeStyles } from "@/lib/utils";

export function LatestNewsSection({ news }: { news: AnimeDetailItem[] }) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="h-8 w-1.5 bg-v2-primary rounded-full"></span>
                    Latest News
                </h2>
                <a className="text-sm font-medium text-slate-400 hover:text-v2-primary transition-colors" href="#">View Archive</a>
            </div>
            <div className="flex flex-col gap-4">
                {news?.map((item) => {
                    const { colorClass, bgClass } = getTypeBadgeStyles(item.type);
                    return (
                        <NewsCard.Provider key={item.id} data={{
                            title: item.name,
                            excerpt: item.description,
                            image: item.imageUrl,
                            category: item.type,
                            categoryColorClass: colorClass,
                            categoryBgClass: bgClass,
                            vintage: item.vintage
                        }}>
                            <NewsCard.Frame className="flex flex-col sm:flex-row gap-6 p-5 relative">
                                <NewsCard.Image className="w-full sm:w-56 h-36" />
                                <NewsCard.Content className="flex-1 py-1 pr-12">
                                    <div className="flex items-center gap-3 mb-2">
                                        <NewsCard.Badge />
                                        <span className="text-slate-500 text-xs">{item.vintage}</span>
                                    </div>
                                    <NewsCard.Title className="text-xl mb-2" />
                                    <NewsCard.Excerpt />
                                </NewsCard.Content>
                                <NewsCard.Bookmark className="top-6 right-6 text-[24px]" />
                            </NewsCard.Frame>
                        </NewsCard.Provider>
                    );
                })}
            </div>
        </section>
    );
}
