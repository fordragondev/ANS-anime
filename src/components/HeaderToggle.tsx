"use client";

import { useDesign } from "./DesignProvider";

export function HeaderToggle() {
    const { activeDesign, toggleDesign } = useDesign();

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleDesign}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
            >
                Switch to {activeDesign === "v1" ? "Design 2" : "Design 1"}
            </button>
        </div>
    );
}
