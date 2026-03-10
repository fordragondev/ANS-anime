"use client";

import React from "react";
import { useHomeV2Data } from "@/features/home-v2/hooks/useHomeV2Data";
import ErrorBoundary from "@/components/ErrorBoundary";

import { HeaderV2 } from "@/features/home-v2/components/HeaderV2";
import { FooterV2 } from "@/features/home-v2/components/FooterV2";
import { HeroSection } from "@/features/home-v2/components/HeroSection";
import { TopPicksSection, FollowUsSection } from "@/features/home-v2/components/TopPicksSection";
import { LatestNewsSection } from "@/features/home-v2/components/LatestNewsSection";
import { CategoryHubSection } from "@/features/home-v2/components/CategoryHubSection";

export function HomeV2() {
    const { sectionData, isLoading, error } = useHomeV2Data();

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-v2-background-dark">
                <div className="bg-v2-surface-dark border border-v2-border-dark rounded-lg shadow-xl p-8 max-w-md w-full text-center mx-4">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">
                        Failed to Load Data
                    </h2>
                    <p className="text-slate-400 mb-6">{error.message}</p>
                </div>
            </div>
        );
    }

    // Map categories object to array for CategoryHubSection
    const categoryEntries = sectionData
        ? Object.entries(sectionData.categories).map(([key, data]) => ({ key, data }))
        : [];

    return (
        <ErrorBoundary>
            <div className="min-h-screen flex flex-col overflow-x-hidden font-display text-slate-100 bg-v2-background-dark">
                <div className="layout-container flex h-full grow flex-col">
                    <HeaderV2 />

                    <main className="flex-1 px-5 py-8 lg:px-10">
                        <div className="mx-auto max-w-7xl flex flex-col gap-12">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <span className="text-v2-primary">Loading content...</span>
                                </div>
                            ) : sectionData ? (
                                <>
                                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <HeroSection featured={sectionData.topStory} />

                                        <div className="lg:col-span-1 flex flex-col gap-6">
                                            <TopPicksSection picks={sectionData.topPicks} />
                                            <FollowUsSection />
                                        </div>
                                    </section>

                                    <LatestNewsSection news={sectionData.latestNews} />
                                    <CategoryHubSection categories={categoryEntries} />
                                </>
                            ) : (
                                <div className="text-red-500">Failed to load V2 data.</div>
                            )}
                        </div>
                    </main>

                    <FooterV2 />
                </div>
            </div>
        </ErrorBoundary>
    );
}