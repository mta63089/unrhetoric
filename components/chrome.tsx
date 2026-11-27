"use client";
import { ArrowUpRight, Bookmark, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export function Wordmark() {
  return (
    <Link className='wordmark' href='/' aria-label='Unrhetoric home'>
      <Image
        className='brand-mark'
        src='/brand-mark.svg'
        width={40}
        height={40}
        alt=''
        unoptimized
      />
      unrhetoric<span>.</span>
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
      <a className='skip' href='#main'>
        Skip to content
      </a>
      <header className='site-header'>
        <div className='header-inner'>
          <Wordmark />
          <nav
            aria-label='Main navigation'
            className={open ? "nav open" : "nav"}
          >
            <Link onClick={() => setOpen(false)} href='/#library'>
              The index
            </Link>
            <Link onClick={() => setOpen(false)} href='/about/'>
              Methodology
            </Link>
            <a onClick={() => setOpen(false)} href='/?saved=1#library'>
              <Bookmark size={14} /> Saved
            </a>
          </nav>
          <button
            className='motion-toggle'
            aria-pressed={paused}
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
            className='menu-toggle'
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
    <footer className='site-footer'>
      <div className='shell footer-inner'>
        <Wordmark />
        <span>Evidence over assertion. Context over outrage.</span>
        <Link href='/about/'>
          Editorial standards <ArrowUpRight size={14} />
        </Link>
        <span className='mono'>Independent · U.S. edition</span>
      </div>
    </footer>
  );
}
