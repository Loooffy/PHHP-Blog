'use client';

import { MarkdownContent } from '@/components/layout/MarkdownContent';
import { useTheme } from '@/contexts/ThemeContext';
import { getTheme } from '@/lib/theme';
import type { PostDetail } from '@/types/api';
import Image from 'next/image';
import { useState } from 'react';

interface BookPostProps {
    post: PostDetail;
}

function formatBookTitle(title: string): string {
    const trimmed = title.trim();
    if (trimmed.startsWith('《') && trimmed.endsWith('》')) {
        return trimmed;
    }
    return `《${trimmed}》`;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
}

export function BookPost({ post }: BookPostProps) {
    const { category, mode } = useTheme();
    const theme = getTheme(category ?? 'book', mode);

    const [imageError, setImageError] = useState(false);
    const coverImageUrl = post.image_url ?? null;
    const displayImage = imageError ? null : coverImageUrl;
    const bodyContent = (post.content ?? '').trim();
    const author = post.author?.trim() ?? '';
    const updatedAt = post.updated_at ?? post.created_at;

    return (
        <div
            className="flex flex-col items-center w-full font-['Inter',sans-serif]"
            style={{ backgroundColor: theme.colors.background }}
        >
            <header className="w-full max-w-3xl mx-auto px-8 pt-10 pb-6 md:px-12 md:pt-12 text-center">
                <h1
                    className="text-2xl md:text-2xl font-bold leading-snug"
                >
                    {formatBookTitle(post.title)}
                </h1>
            </header>

            <div className="w-full max-w-3xl mx-auto px-8 md:px-12 mb-8">
                <div
                    className="flex justify-center items-baseline gap-4 border-b pb-4 text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.textSecondary }}
                >
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                        {author && (
                            <span>
                                作者：<span style={{ color: theme.colors.text }}>{author}</span>
                            </span>
                        )}
                    </div>
                    <span className="shrink-0">最後更新：{formatDate(updatedAt)}</span>
                </div>
            </div>

            {displayImage ? (
                <div className="w-full max-w-3xl mx-auto px-8 md:px-12">
                    <div
                        className="flex justify-center items-center px-6 mb-10 md:px-10"
                    >
                        <Image
                            src={displayImage}
                            alt={`${post.title} 書封`}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="max-w-full max-h-[50vh] w-auto h-auto object-contain"
                            referrerPolicy="no-referrer"
                            onError={() => setImageError(true)}
                        />
                    </div>
                </div>
            ) : null}



            <article className="w-full max-w-3xl mx-auto flex flex-col px-8 pb-12 md:px-12 md:pb-16">
                <div className="w-full" style={{ color: theme.colors.text }}>
                    <MarkdownContent
                        inheritColor
                        content={bodyContent}
                        className="[&>p]:mb-6 [&>p]:leading-[1.8] [&>p]:text-justify [&>p]:break-inside-avoid-column [&>u]:underline [&>u]:underline-offset-4"
                    />
                </div>
            </article>
        </div>
    );
}
