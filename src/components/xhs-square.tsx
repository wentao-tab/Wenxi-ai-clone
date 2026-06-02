"use client";

import { ChangeEvent, ClipboardEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  Check,
  Copy,
  Download,
  Dumbbell,
  Eye,
  FileDown,
  Globe,
  Heart,
  Home,
  Link as LinkIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Plus,
  Palette,
  Save,
  Search,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react";
import { categoryMeta, PromptCard, PromptCategory, promptCards } from "@/lib/prompts";

const STORAGE_KEY = "travel-ai.personal-prompts.v1";

const filters: Array<{
  id: PromptCategory | "all";
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}> = [
  { id: "all", name: "全部", icon: Globe, activeClass: "bg-gray-100 text-gray-600" },
  { id: "travel", name: "旅行", icon: MapPin, activeClass: "bg-blue-50 text-blue-600" },
  { id: "food", name: "美食", icon: Utensils, activeClass: "bg-orange-50 text-orange-600" },
  {
    id: "photography",
    name: "摄影",
    icon: Camera,
    activeClass: "bg-purple-50 text-purple-600",
  },
  {
    id: "shopping",
    name: "好物",
    icon: ShoppingBag,
    activeClass: "bg-pink-50 text-pink-600",
  },
  { id: "beauty", name: "美妆", icon: Palette, activeClass: "bg-rose-50 text-rose-600" },
  {
    id: "fashion",
    name: "穿搭",
    icon: Shirt,
    activeClass: "bg-indigo-50 text-indigo-600",
  },
  { id: "home", name: "家居", icon: Home, activeClass: "bg-teal-50 text-teal-600" },
  {
    id: "tech",
    name: "数码",
    icon: Smartphone,
    activeClass: "bg-cyan-50 text-cyan-600",
  },
  {
    id: "health",
    name: "健康",
    icon: Dumbbell,
    activeClass: "bg-lime-50 text-lime-600",
  },
];

function imageHeight(size: string) {
  const normalized = size.toLowerCase().replaceAll(" ", "");
  if (
    normalized.includes("1024x1792") ||
    normalized.includes("1024x1536") ||
    normalized.includes("1024x1270")
  ) {
    return "h-80 sm:h-[26rem]";
  }
  if (normalized.includes("1792x1024") || normalized.includes("1536x1024")) {
    return "h-44 sm:h-52";
  }
  return "h-56 sm:h-64";
}

export function XhsSquare() {
  const [activeFilter, setActiveFilter] = useState<PromptCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [personalCards, setPersonalCards] = useState<PromptCard[]>([]);
  const [showComposer, setShowComposer] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PromptCard | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setPersonalCards(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function persistPersonalCards(nextCards: PromptCard[]) {
    setPersonalCards(nextCards);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards));
  }

  const filteredCards = useMemo(() => {
    let cards = [...personalCards, ...promptCards];
    if (activeFilter !== "all") {
      cards = cards.filter((card) => card.category === activeFilter);
    }
    const keyword = search.trim().toLowerCase();
    if (!keyword) return cards;
    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(keyword) ||
        card.prompt.toLowerCase().includes(keyword) ||
        card.author.toLowerCase().includes(keyword) ||
        card.category.toLowerCase().includes(keyword) ||
        card.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    });
  }, [activeFilter, personalCards, search]);

  async function copyPrompt(card: PromptCard) {
    try {
      await navigator.clipboard.writeText(card.prompt || card.title);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = card.prompt || card.title;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedId(card.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  function toggleLike(id: string) {
    setLiked((value) => {
      const next = new Set(value);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function publishPrompt(card: PromptCard) {
    persistPersonalCards([card, ...personalCards]);
    setShowComposer(false);
  }

  function deletePrompt(id: string) {
    persistPersonalCards(personalCards.filter((card) => card.id !== id));
    setPreview(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(personalCards, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "my-prompt-square.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg shadow-violet-500/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                提示词广场
              </h1>
              <p className="mt-0.5 max-w-full break-words text-sm text-muted-foreground">
                保存、发布并复用你从 Twitter 等来源发现的提示词案例
              </p>
            </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportJson}
                disabled={personalCards.length === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <FileDown className="h-3.5 w-3.5" />
                导出 JSON
              </button>
              <button
                type="button"
                onClick={() => setShowComposer(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" />
                保存提示词
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索提示词、标签或作者..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-foreground transition-all focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={[
                  "flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-medium transition-all",
                  active
                    ? `${filter.activeClass} shadow-sm`
                    : "border-gray-200 bg-white text-muted-foreground hover:bg-gray-50",
                ].join(" ")}
              >
                <Icon className="h-3.5 w-3.5" />
                {filter.name}
              </button>
            );
          })}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共{" "}
            <span className="font-semibold text-foreground">
              {filteredCards.length}
            </span>{" "}
            个提示词
          </p>
          {filteredCards.length > 0 && (
            <span className="text-xs text-muted-foreground">
              我的发布 {personalCards.length} 个
            </span>
          )}
        </div>

        {filteredCards.length > 0 ? (
          <div className="masonry-grid">
            {filteredCards.map((card, index) => (
              <PromptTile
                key={card.id}
                card={card}
                index={index}
                liked={liked.has(card.id)}
                copied={copiedId === card.id}
                onLike={() => toggleLike(card.id)}
                onCopy={() => copyPrompt(card)}
                onPreview={() => {
                  setPreview(card);
                  setZoomed(false);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-foreground">暂无匹配结果</h3>
            <p className="text-sm text-muted-foreground">
              换个关键词试试，或者先去生成一张新的提示词卡片
            </p>
          </div>
        )}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreview(null)}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-black/30 ring-1 ring-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500" />
            <button
              onClick={() => setPreview(null)}
              aria-label="关闭预览"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid max-h-[88vh] lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-6">
                <button
                  onClick={() => setZoomed((value) => !value)}
                  aria-label={zoomed ? "缩小预览" : "放大预览"}
                  className="absolute left-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  {zoomed ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
                <div
                  className={`w-full overflow-hidden rounded-[22px] bg-black/20 shadow-2xl ring-1 ring-white/10 transition-all duration-300 ${
                    zoomed ? "max-w-none" : "max-w-[760px]"
                  }`}
                >
                  <img
                    src={preview.imageUrl}
                    alt={preview.title}
                    className={`w-full object-contain transition-transform duration-300 ${
                      zoomed ? "max-h-[72vh] scale-[1.02]" : "max-h-[64vh]"
                    }`}
                  />
                </div>
              </div>
              <div className="flex flex-col border-t border-gray-100 bg-white p-5 sm:p-6 lg:border-l lg:border-t-0">
                <div className="mb-5 min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-600">
                      {categoryMeta[preview.category].label}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      {preview.size}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {preview.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Star className="h-4 w-4 fill-current text-amber-400" />
                    <span>{preview.author}</span>
                  </div>
                  {preview.sourceUrl && (
                    <a
                      href={preview.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700"
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                      查看来源
                    </a>
                  )}
                </div>
                <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    原始提示词
                  </p>
                  <p className="line-clamp-5 text-sm leading-6 text-slate-700">
                    {preview.prompt}
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <button
                    onClick={() => copyPrompt(preview)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <Copy className="h-4 w-4" />
                    复制提示词
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={preview.imageUrl}
                      download={`prompt-card-${preview.id}.png`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      <Download className="h-4 w-4" />
                      下载图片
                    </a>
                    <button
                      onClick={() => setPreview(null)}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      关闭预览
                    </button>
                  </div>
                  {preview.isUserOwned && (
                    <button
                      type="button"
                      onClick={() => deletePrompt(preview.id)}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-100"
                    >
                      删除这条发布
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {showComposer && (
        <PromptComposer
          onClose={() => setShowComposer(false)}
          onPublish={publishPrompt}
        />
      )}
    </main>
  );
}

function PromptTile({
  card,
  index,
  liked,
  copied,
  onLike,
  onCopy,
  onPreview,
}: {
  card: PromptCard;
  index: number;
  liked: boolean;
  copied: boolean;
  onLike: () => void;
  onCopy: () => void;
  onPreview: () => void;
}) {
  const meta = categoryMeta[card.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
      className="mb-4 break-inside-avoid"
    >
      <div className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <button
          type="button"
          aria-label={`查看 ${card.title} 预览`}
          onClick={onPreview}
          className={`relative block w-full cursor-pointer overflow-hidden rounded-t-2xl ${imageHeight(
            card.size,
          )} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                {meta.label}
              </span>
              <span className="rounded-full bg-black/25 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                {card.size}
              </span>
            </div>
            <span className="text-3xl opacity-80">{card.emoji}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="pr-10 text-lg font-bold leading-snug text-white drop-shadow-sm">
              {card.title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/80">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{card.author}</span>
            </div>
          </div>
        </button>
        <div className="p-4">
          <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-muted-foreground">
            {card.prompt}
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {card.tags.slice(0, 3).map((tag) => (
              <span
                key={`${card.id}-${tag}`}
                className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onLike}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-rose-500"
              >
                <Heart
                  className={`h-4 w-4 ${
                    liked ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                <span>{card.likes + (liked ? 1 : 0)}</span>
              </button>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Copy className="h-3.5 w-3.5" />
                <span>{card.copies}</span>
              </span>
            </div>
            <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex cursor-not-allowed items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-400"
              >
                <Sparkles className="h-3 w-3" />
                生成同款
              </button>
              <button
                onClick={onCopy}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  copied
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    已复制
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="h-3 w-3" />
                    复制
                  </span>
                )}
              </button>
            </div>
          </div>
          <button
            onClick={onPreview}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Eye className="h-3.5 w-3.5" />
            预览封面
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function PromptComposer({
  onClose,
  onPublish,
}: {
  onClose: () => void;
  onPublish: (card: PromptCard) => void;
}) {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState<PromptCategory>("photography");
  const [tags, setTags] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const canPublish = prompt.trim().length > 0 && (imageUrl.trim().length > 0 || imageName);

  function buildCard(): PromptCard {
    const meta = categoryMeta[category];
    const now = new Date().toISOString();
    const normalizedTags = tags
      .split(/[,，\n]/)
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);
    const finalTags = Array.from(
      new Set([meta.label, ...normalizedTags, imageName ? "本地图片" : "外链图片"]),
    ).slice(0, 8);

    return {
      id: `manual-${Date.now()}`,
      title: title.trim() || prompt.trim().slice(0, 36),
      prompt: prompt.trim(),
      category,
      tags: finalTags,
      imageUrl,
      imagePath: imageName || imageUrl,
      size: "自定义",
      quality: "standard",
      model: "manual",
      author: "我收藏的提示词",
      likes: 0,
      copies: 0,
      source: "manual",
      sourceUrl: sourceUrl.trim() || undefined,
      isUserOwned: true,
      gradient: meta.gradient,
      emoji: meta.emoji,
      createdAt: now,
      updatedAt: now,
    };
  }

  async function readImageFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await fileToDataUrl(file);
    setImageUrl(dataUrl);
    setImageName(file.name);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) await readImageFile(file);
  }

  async function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const file = Array.from(event.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();
    if (file) {
      event.preventDefault();
      await readImageFile(file);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-5 py-4 backdrop-blur sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">保存提示词案例</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              从 Twitter 等来源复制提示词和案例图，发布后展示到广场
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            <Field label="标题">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="例如：玻璃雾化档案海报"
                className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </Field>

            <Field label="提示词">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="把复制到的提示词粘贴到这里..."
                className="min-h-[220px] w-full resize-none rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="来源链接">
                <input
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  placeholder="Twitter/X 链接，可选"
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </Field>
              <Field label="标签">
                <input
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="海报, 产品摄影, 冷灰"
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </Field>
            </div>

            <Field label="分类">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {filters
                  .filter((filter) => filter.id !== "all")
                  .map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setCategory(filter.id as PromptCategory)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                        category === filter.id
                          ? `${filter.activeClass} border-transparent`
                          : "border-gray-200 bg-white text-muted-foreground hover:bg-gray-50"
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
              </div>
            </Field>
          </section>

          <aside className="space-y-4">
            <Field label="案例效果图">
              <div
                onPaste={handlePaste}
                className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 p-4"
              >
                <div className="mb-3 flex gap-2">
                  <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800">
                    <Plus className="h-3.5 w-3.5" />
                    上传图片
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <input
                  value={imageUrl.startsWith("data:") ? "" : imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                    setImageName("");
                  }}
                  placeholder="或粘贴图片 URL"
                  className="mb-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs leading-5 text-muted-foreground">
                  桌面端可直接在这里粘贴剪贴板图片；手机端建议先保存图片再上传。
                </p>
              </div>
            </Field>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-slate-50">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="案例预览"
                  className="max-h-[360px] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center p-8 text-center text-sm text-slate-400">
                  案例图预览
                </div>
              )}
              <div className="space-y-2 bg-white p-4">
                <p className="line-clamp-2 text-sm font-bold text-slate-900">
                  {title || "未命名提示词"}
                </p>
                <p className="line-clamp-4 text-xs leading-5 text-slate-500">
                  {prompt || "提示词内容会展示在这里"}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={!canPublish}
              onClick={() => onPublish(buildCard())}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            >
              <Save className="h-4 w-4" />
              发布到提示词广场
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
    </label>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
