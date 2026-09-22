# Changelog

## [1.0.0] — 2026-09-22

### 新增功能

#### 🔐 十大密码学算法
| 分类 | 算法 | 说明 |
|------|------|------|
| 编解码 | Base64 | 标准 Base64 编码/解码 |
| 编解码 | Hex | 十六进制编解码 |
| 编解码 | URL | URL 百分比编解码 |
| 哈希 | MD5 | 128 位消息摘要 |
| 哈希 | SHA-256 | 256 位安全哈希 |
| 对称加密 | AES | CBC / GCM 模式，128/192/256 位密钥 |
| 非对称加密 | RSA | OAEP 填充，密钥生成 / 加密 / 解密 |
| 消息认证 | HMAC | HMAC-SHA1/256/384/512 |
| 密钥派生 | PBKDF2 | 基于 HMAC 的密码派生 |
| 密码哈希 | bcrypt | 自适应成本，带验证模式 |

全部基于 Node.js 标准 `node:crypto` 模块（bcrypt 使用工业级 `bcryptjs`），输出与 Python、Go、Java、PHP 等外部实现完全兼容。

#### 🎨 用户界面
- 左侧分类滚动，设置按钮固定底部
- 右侧内容区独立垂直滚动
- 标题栏右上角集成编解码 / 加解密 Tab 切换
- 自定义滚动条（6px 细胶囊造型，hover 变主题蓝）
- 自适应明暗双主题（`prefers-color-scheme`）
- ZTools 宿主主题色自动同步（`useZtoolsTheme` hook）
- 透明面板背景，无圆角边框，融入宿主视觉风格

#### 🧭 ZTools 集成
- 独立 `plugin.json` 入口，10 个 feature 覆盖每个算法
- 支持中文 / 英文 / 缩写多种搜索关键词（加密、编码、aes、rsa签名、bcrypt 等）
- 开发模式热更新（`development.main` 指向本地 ViteDevServer）
- preload 层使用 `npm workspaces` 管理第三方依赖，`npm install` 一键安装

### 架构亮点

**Preload 层（`public/preload/crypt/`）**
- 标准化 `{ ok, data }` / `{ ok, error }` 返回信封（`envelope.js`）
- 所有算法支持 `enterPayload` 快速填入
- 测试覆盖 50+ 用例（`*test.ts` 与算法一一对应）

**算法模块（`src/algorithms/`）**
- 三文件结构：`meta.ts`（元数据）+ `index.ts`（导出）+ `ui.tsx`（视图）
- 通过 `AlgorithmProps` 接口与宿主通信（`enterPayload`、`direction`、`onDirectionChange`）
- 注册表驱动（`src/registry/`），支持动态启用/禁用

**配置系统（`src/config/`）**
- `dbStorage` 持久化用户偏好
- 动态 features 同步

### 文档
- `DEVELOP.md` — 开发指南，标准库优先原则，新算法接入 SOP
- `README.md` — 用户使用说明

### 技术栈
- React 19 + TypeScript 5.3 + Vite 6
- Vitest 3（单元测试）
- Node.js `node:crypto`（核心运算）
- `bcryptjs`（bcrypt 算法，通过 npm workspaces 管理）

[1.0.0]: https://github.com/ztools/crypt-tool/tree/v1.0.0
