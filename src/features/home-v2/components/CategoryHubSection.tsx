"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import { SectionData } from "@/types/anime";

type CategoryEntry = { key: string; data: SectionData["categories"][string] };

export function CategoryHubSection({ categories }: { categories: CategoryEntry[] }) {
    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="h-8 w-1.5 bg-v2-primary rounded-full"></span>
                    Category Hub
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories?.map((category) => (
                    <CategoryCard.Provider key={category.key} data={{
                        title: category.key,
                        heroImage: category.data.featured.imageUrl,
                        mainStory: category.data.featured.name,
                        substories: category.data.links.map(link => link.name)
                    }}>
                        <CategoryCard.Frame>
                            <CategoryCard.Hero />
                            <CategoryCard.List />
                        </CategoryCard.Frame>
                    </CategoryCard.Provider>
                ))}
            </div>
        </section>
    );
}
