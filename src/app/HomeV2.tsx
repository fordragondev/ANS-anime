"use client";

import React from "react";
import { useHomeV2Data } from "@/hooks/useHomeV2Data";

import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { HeroSection } from "@/components/v2/HeroSection";
import { TopPicksSection, FollowUsSection } from "@/components/v2/TopPicksSection";
import { LatestNewsSection } from "@/components/v2/LatestNewsSection";
import { CategoryHubSection } from "@/components/v2/CategoryHubSection";

export function HomeV2() {
    const { data: pageData, isLoading } = useHomeV2Data();

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden font-display dark text-slate-100 bg-v2-background-dark">
            {/* Global Fonts loaded specifically for V2 */}
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <div className="layout-container flex h-full grow flex-col">
                <HeaderV2 />

                <main className="flex-1 px-5 py-8 lg:px-10">
                    <div className="mx-auto max-w-7xl flex flex-col gap-12">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="text-v2-primary">Loading content...</span>
                            </div>
                        ) : pageData ? (
                            <>
                                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <HeroSection featured={pageData.featured} />
                                    
                                    <div className="lg:col-span-1 flex flex-col gap-6">
                                        <TopPicksSection picks={pageData.topPicks} />
                                        <FollowUsSection />
                                    </div>
                                </section>

                                <LatestNewsSection news={pageData.latestNews} />
                                <CategoryHubSection categories={pageData.categories} />
                            </>
                        ) : (
                            <div className="text-red-500">Failed to load V2 data.</div>
                        )}
                    </div>
                </main>

                <FooterV2 />
            </div>
        </div>
    );
}