'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; label: string };

export function ArticleToc({ items, mobile = false }: { items: Item[]; mobile?: boolean }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const update = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      const hashTarget = hashId && document.getElementById(hashId);
      if (hashTarget && items.some((item) => item.id === hashId) && Math.abs(hashTarget.getBoundingClientRect().top) < window.innerHeight / 2) {
        setActiveId(hashId);
        return;
      }
      const marker = 160;
      let current = items[0]?.id ?? '';
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker) current = item.id;
      }
      setActiveId(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', update);
    };
  }, [items]);

  return (
    <nav className={mobile ? 'mobile-toc' : 'rail-card'} aria-label={mobile ? 'Article contents' : 'On this page'}>
      <strong>{mobile ? 'In this article' : 'On this page'}</strong>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} onClick={() => setActiveId(item.id)} aria-current={activeId === item.id ? 'location' : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
