"use client";
import {useEffect, useRef, useState} from 'react';
import Topbar from './Topbar';

export default function TopbarWrapper() {
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 32) {
        setShow(true);
        lastScroll.current = y;
        return;
      }
      if (y > lastScroll.current) {
        setShow(false); // cuộn xuống thì ẩn
      } else {
        setShow(true); // cuộn lên thì hiện
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`} style={{willChange: 'transform'}}>
      <Topbar />
    </div>
  );
}
