'use client';

import type { PostListItem } from '@/types/api';
import Link from 'next/link';

interface FilmCardProps {
  post: PostListItem;
  category: string;
  theme: { colors: { text: string; accent: string; background: string } };
}

export function WideFilmCard({ post, category, theme }: FilmCardProps) {
  const directors = post.directors ?? [];
  const year = post.year ?? new Date(post.created_at).getFullYear();
  const film_category = post.film_category ?? '';
  const film_country = post.film_country ?? '';
  const film_length = post.film_length ?? '';
  const description = post.description?.trim() ?? '';
  return (
    <article className="transition-transform hover:-translate-y-1">
      <Link href={`/${category}/${post.slug || post.id}`} className="no-underline text-inherit block h-full">
        <div className="flex w-full h-[280px] gap-8 items-stretch flex-nowrap">
          {/* <div className="w-1/2 min-w-2/5 flex flex-col"> */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span
                className="font-['Inter',sans-serif] text-sm font-normal uppercase tracking-wider"
                style={{ color: theme.colors.text }}
              >
                {film_country} / {film_length} MIN / {film_category}
              </span>
              <div
                className="h-px w-[40px] shrink"
                style={{ backgroundColor: theme.colors.text }}
              />
            </div>

            <div className="flex-1">
              <h2
                className="font-['Inter',sans-serif] text-2xl font-medium mt-4 mb-2 leading-[1.1] md:text-2xl"
                style={{ color: theme.colors.accent }}
              >
                {post.title}
              </h2>
              {description && (
                <p
                  className="font-['Inter',sans-serif] text-sm text-right font-bold mb-2 line-clamp-2"
                  style={{ color: theme.colors.text }}
                >
                  {'－' + description}
                </p>
              )}
              {directors.map((director) => (
                <p
                  key={director}
                  className="font-['Inter',sans-serif] text-sm font-light"
                  style={{ color: theme.colors.text }}
                >
                  {director}
                </p>
              ))}
            </div>

            <div className="mt-auto text-right">
              <span
                className="font-['Glegoo',serif] text-2xl leading-none opacity-90 md:text-2xl"
                style={{ color: theme.colors.text }}
              >
                {year}
              </span>
            </div>
          </div>

          {post.image_url && (
            <div className="overflow-hidden h-full md:w-auto md:flex-none md:h-auto md:aspect-[1.1/1]">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-auto h-full object-cover"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export function NarrowFilmCard({ post, category, theme }: FilmCardProps) {
  const directors = post.directors ?? [];
  const year = post.year ?? new Date(post.created_at).getFullYear();
  const film_category = post.film_category ?? '';
  const film_country = post.film_country ?? '';
  const film_length = post.film_length ?? '';
  const description = post.description?.trim() ?? '';
  return (
    <article className="w-1/5 min-w-0 shrink-0 transition-transform hover:-translate-y-1">
      <Link href={`/${category}/${post.slug || post.id}`} className="no-underline text-inherit block h-full">
        <div className="w-full h-[280px] flex flex-col justify-between gap-4">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-auto h-full object-cover"
            />
          )}

          <div className="flex flex-col">
            <h2
              className="font-['Inter',sans-serif] text-xl text-left text-l font-medium leading-tight"
              style={{ color: theme.colors.accent }}
            >
              {post.title}
            </h2>
            {description && (
              <p
                className="mb-2 font-['Inter',sans-serif] text-xs text-right font-bold line-clamp-2"
              // style={{ color: theme.colors.background, backgroundColor: theme.colors.accent }}
              >
                {'－' + description}
              </p>
            )}
            {directors.map((director) => (
              <p
                key={director}
                className="font-['Inter',sans-serif] text-xs text-left font-light"
                style={{ color: theme.colors.text }}
              >
                {director}
              </p>
            ))}
            <span
              className="font-['Glegoo',serif] text-m text-right leading-none"
              style={{ color: theme.colors.text }}
            >
              {year}
            </span>
            <span
              className="font-['Inter',sans-serif] text-xs text-right leading-normal tracking-wider uppercase"
              style={{ color: theme.colors.text }}
            >
              {film_country} / {film_length} MIN / {film_category}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FullWidthFilmCard({ post, category, theme }: FilmCardProps) {
  const directors = (post.directors ?? []).join(', ');
  const year = post.year ?? new Date(post.created_at).getFullYear();
  const film_category = post.film_category ?? '';
  const film_country = post.film_country ?? '';
  const film_length = post.film_length ?? '';
  const description = post.description?.trim() ?? '';
  return (
    <article className="flex-1 transition-transform hover:-translate-y-1">
      <Link href={`/${category}/${post.slug || post.id}`} className="no-underline text-inherit block h-full">
        <div className="flex flex-col gap-8">
          <div className="flex gap-8 items-end pl-2">
            <div className="flex flex-col gap-3 min-w-[120px]">
              <span
                className="font-['Glegoo',serif] text-3xl leading-none"
                style={{ color: theme.colors.text }}
              >
                {year}
              </span>
              <span
                className="font-['Inter',sans-serif] text-xs leading-normal tracking-wider uppercase"
                style={{ color: theme.colors.text }}
              >
                {film_country} / {film_length} MIN / {film_category}
              </span>
            </div>

            <div
              className="w-px self-stretch opacity-60"
              style={{ backgroundColor: theme.colors.text }}
            />

            <div className="flex-1 flex flex-col gap-2">
              <h2
                className="font-['Inter',sans-serif] text-3xl font-medium -mt-1 leading-[1.1]"
                style={{ color: theme.colors.accent }}
              >
                {post.title}
              </h2>
              {description && (
                <p
                  className="font-['Inter',sans-serif] text-base font-light line-clamp-2"
                  style={{ color: theme.colors.text }}
                >
                  {description}
                </p>
              )}
              <p
                className="font-['Inter',sans-serif] text-xl font-light"
                style={{ color: theme.colors.text }}
              >
                {directors}
              </p>
            </div>
          </div>
          {post.image_url && (
            <div className="aspect-[1.5/1] overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="object-cover  h-full"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
