"use client";

import { ArrowUpRight, Bookmark, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Wordmark() {
  return (
    <Link
      href='/'
      aria-label='Unrhetoric home'
      className='group inline-flex shrink-0 items-center whitespace-nowrap text-[25px] font-[850] tracking-[-.07em] text-accent min-[641px]:text-[30px]'
    >
      <Image
        src='/brand-mark.svg'
        width={40}
        height={40}
        alt=''
        unoptimized
        className='mr-1.5 size-7.5 shrink-0 object-contain transition-transform duration-500 ease-editorial group-hover:-rotate-6 group-hover:scale-105 min-[641px]:mr-2.5 min-[641px]:size-9.25'
      />
      unrhetoric<span className='text-[#d82d71]'>.</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(
        (localStorage.getItem("unrhetoric-motion") ??
          localStorage.getItem("contrapoint-motion")) === "off",
      );
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
  }, [paused]);

  return (
    <>
      <a
        className='fixed -top-24 left-2.5 z-50 bg-accent p-3 text-white focus:top-2'
        href='#main'
      >
        Skip to content
      </a>
      <header className='site-header sticky top-0 z-30 h-16.25 border-b border-ink bg-paper min-[641px]:h-16.5'>
        <div className='mx-auto flex h-full w-[calc(100%-24px)] max-w-370 items-center justify-between gap-2 min-[641px]:w-[calc(100%-48px)] min-[641px]:gap-5.5'>
          <Wordmark />
          <nav
            aria-label='Main navigation'
            className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col items-start gap-5 border-b border-ink bg-paper p-5 text-sm font-semibold text-ink min-[850px]:static min-[850px]:ml-auto min-[850px]:flex min-[850px]:flex-row min-[850px]:items-center min-[850px]:gap-[clamp(15px,2vw,30px)] min-[850px]:border-0 min-[850px]:p-0`}
          >
            <Link
              className='hover:text-accent'
              onClick={() => setOpen(false)}
              href='/#library'
            >
              The index
            </Link>
            <Link
              className='hover:text-accent'
              onClick={() => setOpen(false)}
              href='/about/'
            >
              Methodology
            </Link>
            <a
              className='flex items-center gap-2 hover:text-accent'
              onClick={() => setOpen(false)}
              href='/?saved=1#library'
            >
              <Bookmark size={14} /> Saved
            </a>
          </nav>
          <button
            type='button'
            aria-pressed={paused}
            className='ml-auto shrink-0 rounded-full border border-ink px-2 py-1.5 text-[10px] font-semibold whitespace-nowrap hover:bg-soft min-[641px]:px-3 min-[641px]:text-[11px] min-[850px]:ml-0'
            onClick={() => {
              const next = !paused;
              setPaused(next);
              try {
                localStorage.setItem("unrhetoric-motion", next ? "off" : "on");
              } catch {}
            }}
          >
            {paused ? "Motion off" : "Motion on"}
          </button>
          <button
            type='button'
            className='grid shrink-0 place-items-center p-1 min-[850px]:hidden'
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className='border-t-2 border-ink bg-orange py-8 text-ink'>
      <div className='mx-auto flex w-[calc(100%-32px)] max-w-345 flex-wrap items-center justify-between gap-5 text-xs lg:w-[calc(100%-88px)]'>
        <Wordmark />
        <span>Evidence over assertion. Context over outrage.</span>
        <Link
          className='flex items-center gap-1.5 hover:text-accent'
          href='/about/'
        >
          Editorial standards <ArrowUpRight size={14} />
        </Link>
        <span className='font-semibold'>Independent · U.S. edition</span>
      </div>
    </footer>
  );
}
