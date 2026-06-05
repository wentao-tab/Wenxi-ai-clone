"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/xhs-square", label: "提示词广场", icon: Sparkles },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth >= 768 : false;
  });

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="sticky left-0 right-0 top-0 z-50 flex h-16 shrink-0 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center gap-2 px-3 sm:px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              aria-label="切换菜单"
              title={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
              onClick={() => setSidebarOpen((value) => !value)}
              className="icon-btn h-9 w-9 shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/xhs-square"
              className="group flex min-w-0 items-center gap-2 rounded-2xl px-2 py-1 transition-colors hover:bg-secondary/70"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-blue-500/10 ring-1 ring-blue-100 transition-shadow group-hover:shadow-blue-500/20">
                <NextImage
                  src={`${basePath}/wenxi-mark.png`}
                  alt="文汐"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  priority
                  unoptimized
                />
              </div>
              <div className="hidden min-w-0 flex-col leading-none sm:flex">
                <span className="text-base font-extrabold tracking-wide text-slate-900">
                  文汐
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">
                  WENXI
                </span>
              </div>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="通知"
              className="icon-btn relative h-9 w-9 rounded-xl border border-border/60 bg-card/70 shadow-sm hover:bg-card"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
            </button>
            <div className="hidden h-6 w-px bg-border md:block" />
            <button className="flex items-center gap-2 rounded-2xl px-2 py-1.5 transition-colors hover:bg-secondary/70 sm:px-3">
              <span className="gradient-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                游
              </span>
              <span className="hidden text-sm font-semibold text-foreground md:inline">
                游客
              </span>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="关闭菜单遮罩"
            className="fixed inset-0 top-16 z-30 bg-black/20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={[
            "fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
            sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
            "md:w-64",
          ].join(" ")}
        >
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="mb-2">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                功能导航
              </span>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-label={item.label}
                    className={`sidebar-item ${active ? "active" : ""}`}
                    onClick={() => {
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span className="transition-all duration-200">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="my-4 divider" />
          </nav>
          <div className="border-t border-border p-4">
            <div className="card-glass rounded-xl p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 ring-1 ring-blue-100">
                  <NextImage
                    src={`${basePath}/wenxi-mark.png`}
                    alt="文汐"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    个人提示词库
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    收藏、发布、复用案例
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
