import { Route } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function CreatePage() {
  return (
    <AppShell>
      <PlaceholderPage
        icon={Route}
        title="路线规划"
        subtitle="用 AI 生成多日行程、交通安排和游玩节奏"
      />
    </AppShell>
  );
}
