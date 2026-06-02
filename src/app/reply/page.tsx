import { Bot } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function ReplyPage() {
  return (
    <AppShell>
      <PlaceholderPage
        icon={Bot}
        title="AI 助手"
        subtitle="围绕旅行计划、内容创作和图片提示词进行问答"
      />
    </AppShell>
  );
}
