'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {installScrollMotion} from '@/lib/scroll-motion';
export function MotionSystem(){
 const pathname=usePathname();
 useEffect(()=>installScrollMotion(),[pathname]);
 return <div className="scroll-progress" aria-hidden="true"/>;
}
