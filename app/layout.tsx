import type { Metadata } from 'next';
import './globals.css';
import { MotionSystem } from '@/components/motion';
import { Header, Footer } from '@/components/chrome';
export const metadata: Metadata = {title:{default:'Unrhetoric — Reframe the claim.',template:'%s | Unrhetoric'},description:'An independent, evidence-first field guide to contested American political claims.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><MotionSystem/><Header/><main id="main">{children}</main><Footer/></body></html>}
