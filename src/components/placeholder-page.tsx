import { LucideIcon } from "lucide-react";

type PlaceholderPageProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
};

export function PlaceholderPage({
  icon: Icon,
  title,
  subtitle,
  badge = "第一阶段占位",
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-blue-500/20">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <span className="badge-primary">{badge}</span>
          <h2 className="mt-5 text-lg font-bold text-foreground">
            页面框架已接入
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            这里先保留和原站一致的入口与视觉节奏。下一阶段可以按优先级补齐真实功能、表单、接口和数据库。
          </p>
        </section>
      </div>
    </main>
  );
}
