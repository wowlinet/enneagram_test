# Google Analytics 配置指南

本项目已集成 Google Analytics 4 (GA4) 统计功能，使用 Next.js 官方推荐的 `@next/third-parties` 库。

## 配置步骤

### 1. 获取 Google Analytics ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的 GA4 属性或使用现有属性
3. 获取测量 ID（格式：`G-XXXXXXXXXX`）

### 2. 配置环境变量

1. 复制 `.env.local.example` 文件为 `.env.local`：
   ```bash
   cp .env.local.example .env.local
   ```

2. 在 `.env.local` 文件中设置您的 Google Analytics ID：
   ```bash
   NEXT_PUBLIC_GA_ID=G-YOUR_ACTUAL_GA_ID
   ```

### 3. 验证配置

1. 重启开发服务器：
   ```bash
   npm run dev
   ```

2. 在浏览器开发者工具中检查：
   - Network 标签页应显示对 `gtag` 的请求
   - Console 中不应有 GA 相关错误

## 功能特性

- ✅ 自动页面浏览量跟踪
- ✅ 客户端路由导航跟踪
- ✅ 性能优化（延迟加载）
- ✅ 仅在生产环境或设置了 GA ID 时加载

## 事件跟踪

如需添加自定义事件跟踪，可使用 `sendGAEvent` 函数：

```typescript
import { sendGAEvent } from '@next/third-parties/google'

// 示例：跟踪按钮点击
const handleClick = () => {
  sendGAEvent('event', 'button_click', {
    event_category: 'engagement',
    event_label: 'test_start_button'
  })
}
```

## 注意事项

- 环境变量必须以 `NEXT_PUBLIC_` 开头才能在客户端使用
- 仅在设置了 `NEXT_PUBLIC_GA_ID` 环境变量时才会加载 GA 脚本
- 建议在生产环境部署前测试 GA 配置是否正常工作

## 参考文档

- [Next.js Third-party Libraries - Google Analytics](https://nextjs.org/docs/pages/guides/third-party-libraries#google-analytics)
- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)