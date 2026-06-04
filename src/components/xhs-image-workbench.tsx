"use client";

import { useMemo, useState } from "react";
import {
  Camera,
  Image as ImageIcon,
  ImagePlus,
  Layers,
  Palette,
  Settings2,
  Sparkles,
} from "lucide-react";

const categories = ["旅行", "美食", "摄影", "好物", "美妆", "穿搭", "家居", "数码", "健康"];
const sizes = ["1024x1024", "1024x1792", "1792x1024"];
const qualities = ["标准", "高质量"];

const promptSamples = [
  "童趣复古咖啡馆剪贴海报，梦幻开心果玫瑰拿铁氛围感，超写实饮品摄影融合手绘涂鸦和手账贴纸版式。",
  "Ultra-detailed premium travel-food advertisement poster, vertical composition, realistic product hero object, cinematic lighting.",
  "电影生活剧照感，雨夜车内副驾驶，窗外霓虹虚化，冷白顶灯勾勒人物轮廓，安静克制的故事氛围。",
];

export function XhsImageWorkbench() {
  const [prompt, setPrompt] = useState(promptSamples[0]);
  const [category, setCategory] = useState("美食");
  const [size, setSize] = useState("1024x1792");
  const [quality, setQuality] = useState("标准");

  const promptCount = prompt.trim().length;
  const previewRatio = useMemo(() => {
    if (size === "1024x1792") return "aspect-[9/16]";
    if (size === "1792x1024") return "aspect-video";
    return "aspect-square";
  }, [size]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg shadow-violet-500/20">
            <ImageIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              AI 图片生成
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              输入提示词并生成适合小红书封面的图片
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)]">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-500" />
                <h2 className="text-base font-bold text-foreground">提示词</h2>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                {promptCount} 字
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-[260px] w-full resize-none rounded-2xl border border-gray-200 bg-slate-50/70 p-4 text-sm leading-7 text-foreground outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/20"
              placeholder="输入图片提示词..."
            />

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {promptSamples.map((sample, index) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="rounded-2xl border border-gray-100 bg-white p-3 text-left text-xs leading-5 text-muted-foreground shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50/40 hover:text-foreground"
                >
                  样例 {index + 1}
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-violet-500" />
                <h2 className="text-base font-bold text-foreground">生成参数</h2>
              </div>

              <ControlGroup icon={Palette} label="分类">
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                        category === item
                          ? "border-violet-200 bg-violet-50 text-violet-600"
                          : "border-gray-200 bg-white text-muted-foreground hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </ControlGroup>

              <ControlGroup icon={Layers} label="尺寸">
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                        size === item
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-gray-200 bg-white text-muted-foreground hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </ControlGroup>

              <ControlGroup icon={Camera} label="质量">
                <div className="grid grid-cols-2 gap-2">
                  {qualities.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setQuality(item)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                        quality === item
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 bg-white text-muted-foreground hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </ControlGroup>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
              >
                <ImagePlus className="h-4 w-4" />
                生成图片
              </button>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4 text-violet-500" />
                  <h2 className="text-base font-bold text-foreground">预览</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                  {size}
                </span>
              </div>
              <div
                className={`relative mx-auto flex w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-violet-200 bg-gradient-to-br from-violet-50 via-white to-orange-50 ${previewRatio}`}
              >
                <div className="absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-violet-600 backdrop-blur">
                  {category}
                </div>
                <div className="flex flex-col items-center px-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-violet-500/10">
                    <ImageIcon className="h-6 w-6 text-violet-500" />
                  </div>
                  <p className="line-clamp-4 text-sm leading-6 text-slate-500">
                    {prompt || "输入提示词后显示预览摘要"}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ControlGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-100 py-4 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </div>
      {children}
    </div>
  );
}
