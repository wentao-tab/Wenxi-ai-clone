import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function XhsGeneratorPage() {
  return (
    <AppShell>
      <PlaceholderPage
        icon={Sparkles}
        title="爆款笔记生成"
        subtitle="生成小红书标题、正文、标签和发布结构"
      />
    </AppShell>
  );
}
