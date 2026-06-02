export type PromptCategory =
  | "travel"
  | "food"
  | "photography"
  | "shopping"
  | "beauty"
  | "fashion"
  | "home"
  | "tech"
  | "health";

export type PromptCard = {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  imageUrl: string;
  imagePath: string;
  size: string;
  quality: "standard" | "high";
  model: string;
  author: string;
  likes: number;
  copies: number;
  source: "ai_generated" | "manual";
  sourceUrl?: string;
  isUserOwned?: boolean;
  gradient: string;
  emoji: string;
  createdAt: string;
  updatedAt: string;
};

export const categoryMeta: Record<
  PromptCategory,
  { label: string; gradient: string; emoji: string }
> = {
  travel: { label: "旅行", gradient: "from-blue-500 to-cyan-500", emoji: "✈️" },
  food: { label: "美食", gradient: "from-orange-500 to-red-500", emoji: "🍜" },
  photography: {
    label: "摄影",
    gradient: "from-purple-500 to-pink-500",
    emoji: "📷",
  },
  shopping: { label: "好物", gradient: "from-pink-500 to-rose-500", emoji: "🛍️" },
  beauty: { label: "美妆", gradient: "from-rose-500 to-pink-500", emoji: "💄" },
  fashion: { label: "穿搭", gradient: "from-indigo-500 to-purple-500", emoji: "👗" },
  home: { label: "家居", gradient: "from-emerald-500 to-teal-500", emoji: "🏠" },
  tech: { label: "数码", gradient: "from-cyan-500 to-blue-500", emoji: "📱" },
  health: { label: "健康", gradient: "from-lime-500 to-emerald-500", emoji: "💪" },
};

const baseDate = "2026-06-02T00:00:00.000Z";

export const promptCards: PromptCard[] = [
  {
    id: "taco-exploded-infographic",
    title: "Create a hyper-realistic exploded vertical infographic...",
    prompt:
      "Create a hyper-realistic exploded vertical infographic composition of tacos. Top to bottom: fresh lettuce, tomato salsa, melted cheese, grilled meat filling, crispy shell base. Add clean infographic text labels with thin pointer lines, rustic background, soft studio lighting, realistic shadows, ultra-detailed food textures, premium commercial aesthetic, 8K.",
    category: "food",
    tags: ["美食", "1024x1792", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/02/3923a503-7452-4ceb-b520-950fd53eee9d-1024x1792.png",
    imagePath: "xhs-generated/images/2026/06/02/taco-1024x1792.png",
    size: "1024x1792",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-orange-500 to-red-500",
    emoji: "🍜",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "luxeveil-lotion-diorama",
    title: "A hyper-realistic miniature diorama product advertisement...",
    prompt:
      "A hyper-realistic miniature diorama product advertisement featuring an oversized luxury skincare pump bottle labeled LUXEVEIL Skin Science on a circular platform. Tiny construction workers climb scaffolding, operate a crane, paint the bottle, and build a premium lotion factory scene. Warm beige, cream, gold and mustard palette, soft diffused studio lighting, tilt-shift miniature aesthetic, ultra-detailed commercial CGI render.",
    category: "beauty",
    tags: ["美妆", "1:1 方图", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/ceb5e4ea-f6dd-4382-82e7-1b8b4f5ea0be-1024x1024.png",
    imagePath: "xhs-generated/images/2026/06/01/lotion-1024x1024.png",
    size: "1024x1024",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-rose-500 to-pink-500",
    emoji: "💄",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "sunset-fashion-grid",
    title: "日落时分，高级时尚摄影，上半身丰腴身材，S 曲线...",
    prompt:
      "日落时分，高级时尚摄影，成年东方女性模特，海边金色逆光，青春自信氛围。不同姿势，保持人脸一致，四宫格展示，真实摄影感，柔和胶片色彩，高级杂志封面质感。",
    category: "fashion",
    tags: ["穿搭", "1:1 方图", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/22771b56-b1d2-4753-b9bf-f8fcce627203-1024x1024.png",
    imagePath: "xhs-generated/images/2026/06/01/sunset-fashion-1024x1024.png",
    size: "1024x1024",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-indigo-500 to-purple-500",
    emoji: "👗",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "neon-magazine-cover",
    title: "竖版社交媒体杂志封面风格人像，主角是一位二十五六...",
    prompt:
      "竖版社交媒体杂志封面风格人像，凌晨一点霓虹灯光笼罩的便利店，冰箱门敞开形成构图框架，手机高角度广角拍摄。冷调蓝光与暖黄街灯交织，背景可见饮品瓶和价格标签，都市电影剧照质感。",
    category: "tech",
    tags: ["数码", "1:1 方图", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/2ab92215-0912-4099-a2dc-e2b44f6a1088-1024x1024.png",
    imagePath: "xhs-generated/images/2026/06/01/neon-magazine-1024x1024.png",
    size: "1024x1024",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "📱",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "food-master-prompt",
    title: '{ "master_prompt": { "global_settings": ...',
    prompt:
      "超写实美食摄影 master prompt：8K 超精细，3:4 纵向，极度锐利纹理，丰富电影级调色，浅景深，影棚级戏剧性光影。包含法拉费卷饼爆炸场景、辣鸡肉卷喷溅场景、飞散香料、酱汁飞沫、悬浮食材和深色哑光桌面。",
    category: "food",
    tags: ["美食", "1:1 方图", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/96b73177-e89c-4840-8b3e-1bf7ffb1f40c-1024x1024.png",
    imagePath: "xhs-generated/images/2026/06/01/food-master-1024x1024.png",
    size: "1024x1024",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-orange-500 to-red-500",
    emoji: "🍜",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "rain-night-car",
    title: "雨夜总是最适合装下情绪。车窗上的雨滴缓缓滑落，...",
    prompt:
      "电影生活剧照感，雨夜车内副驾驶，窗外霓虹虚化，车窗雨滴缓缓滑落，车内柔和冷白顶灯勾勒侧脸轮廓。整体克制、柔和、有故事感，冷白纯欲生活照滤镜，9:16 竖版构图。",
    category: "fashion",
    tags: ["穿搭", "1:1 方图", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/f5137cda-38b5-4b59-b578-1b9a9999a049-1024x1024.png",
    imagePath: "xhs-generated/images/2026/06/01/rain-night-1024x1024.png",
    size: "1024x1024",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-indigo-500 to-purple-500",
    emoji: "👗",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "coffee-collage-poster",
    title: "童趣复古咖啡馆剪贴海报，梦幻开心果玫瑰拿铁氛围感...",
    prompt:
      "童趣复古咖啡馆剪贴海报，梦幻开心果玫瑰拿铁氛围感。超写实饮品摄影融合手绘涂鸦、水彩马克笔速写、随性手写文案、标注箭头和原料注解，马卡龙色系文具质感，韩式温馨咖啡馆灵感拼贴风。",
    category: "food",
    tags: ["美食", "1024x1792", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/c834d7c6-8c1e-433b-99ea-70c2b209212d-1024x1792.png",
    imagePath: "xhs-generated/images/2026/06/01/coffee-collage-1024x1792.png",
    size: "1024x1792",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-orange-500 to-red-500",
    emoji: "🍜",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "chips-travel-ad",
    title: "Ultra-detailed premium travel-food advertisement poster...",
    prompt:
      "Ultra-detailed premium travel-food advertisement poster for a city or country, vertical composition, inspired by luxury chips advertising. A realistic chips packet sits at the bottom center as the hero object, with iconic landmarks, flying ingredients, premium commercial lighting and vibrant destination atmosphere.",
    category: "travel",
    tags: ["旅行", "1024x1792", "标准"],
    imageUrl:
      "https://wgclydejbrvbmdddveid.supabase.co/storage/v1/object/public/xhs-generated-images/xhs-generated/images/2026/06/01/7dadfc78-9c53-47d0-b15f-ea1a570e0cea-1024x1792.png",
    imagePath: "xhs-generated/images/2026/06/01/chips-travel-1024x1792.png",
    size: "1024x1792",
    quality: "standard",
    model: "gpt-image-2",
    author: "AI Creator",
    likes: 0,
    copies: 0,
    source: "ai_generated",
    gradient: "from-blue-500 to-cyan-500",
    emoji: "✈️",
    createdAt: baseDate,
    updatedAt: baseDate,
  },
];
