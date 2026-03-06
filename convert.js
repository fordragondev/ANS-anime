const fs = require('fs');

let html = fs.readFileSync('stitch.html', 'utf8');

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
    console.error("No body found");
    process.exit(1);
}
let body = bodyMatch[1];

// Remove generic script tags and the tailwind script if they got inside somehow (none in body though)
// Replace 'class=' with 'className='
body = body.replace(/class=/g, 'className=');

// Self closing tags fix
body = body.replace(/<img(.*?)>/g, '<img$1 />');
body = body.replace(/<input(.*?)>/g, '<input$1 />');
body = body.replace(/<br(.*?)>/g, '<br />');
body = body.replace(/<hr(.*?)>/g, '<hr />');
body = body.replace(/<path(.*?)><\/path>/g, '<path$1/>');

// Fixing SVG namespaces or dash cases if any. (e.g., fill-rule, clip-rule)
body = body.replace(/fill-rule=/g, 'fillRule=');
body = body.replace(/clip-rule=/g, 'clipRule=');
body = body.replace(/stroke-width=/g, 'strokeWidth=');
body = body.replace(/stroke-linecap=/g, 'strokeLinecap=');
body = body.replace(/stroke-linejoin=/g, 'strokeLinejoin=');

// Replace colors
body = body.replace(/text-primary/g, 'text-v2-primary');
body = body.replace(/bg-primary/g, 'bg-v2-primary');
body = body.replace(/border-primary/g, 'border-v2-primary');
body = body.replace(/ring-primary/g, 'ring-v2-primary');

body = body.replace(/text-background-light/g, 'text-v2-background-light');
body = body.replace(/bg-background-light/g, 'bg-v2-background-light');

body = body.replace(/text-background-dark/g, 'text-v2-background-dark');
body = body.replace(/bg-background-dark/g, 'bg-v2-background-dark');
body = body.replace(/from-background-dark/g, 'from-v2-background-dark');
body = body.replace(/via-background-dark/g, 'via-v2-background-dark');
body = body.replace(/to-background-dark/g, 'to-v2-background-dark');

body = body.replace(/text-surface-dark/g, 'text-v2-surface-dark');
body = body.replace(/bg-surface-dark/g, 'bg-v2-surface-dark');

body = body.replace(/text-border-dark/g, 'text-v2-border-dark');
body = body.replace(/bg-border-dark/g, 'bg-v2-border-dark');
body = body.replace(/border-border-dark/g, 'border-v2-border-dark');

// Fix html entities and specific JSX issues if any
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Escape double quotes etc?? Not needed since React treats text as is, wait some chars inside text nodes might trigger syntax errors if they have unescaped { or } or <.
// But HTML shouldn't have raw < unless it's a tag. Let's hope it's well formed.

const componentCode = `"use client";

import Link from "next/link";
import Image from "next/image";

export function HomeV2() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden font-display dark text-slate-100 bg-v2-background-dark">
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
            ${body}
        </div>
    );
}`;

fs.writeFileSync('src/app/HomeV2.tsx', componentCode);
console.log("Written to src/app/HomeV2.tsx");
