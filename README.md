# Jewel AR Try-on

面向珠宝商家的 AR 首饰试戴微信小程序。用户可以浏览商家商品、查看材质与尺寸，并进入对应品类的 AR 试戴流程；项目本身不处理交易、支付或站外跳转。

当前状态：**技术 PoC 工程已初始化，真实 VK 关键点跟踪与 three.js 渲染尚未接入。** 现阶段代码用于验证工程边界、锚点变换、正反面判定和用户流程，不应被描述为已经完成 AR 试戴。

## 快速开始

要求 Node.js 20 或更高版本，以及微信开发者工具。

```bash
npm install
npm run check
```

在微信开发者工具中导入仓库根目录。默认 `project.config.json` 使用 `touristappid`；需要真机能力时，在本机配置正式 AppID，避免把私有配置提交到仓库。

浏览器验收预览：

```bash
npm run preview
```

打开 `http://127.0.0.1:4173/preview/`。这个预览只用于检查布局和基础交互，不替代微信开发者工具或真机 AR 验证。

## 常用命令

| 命令                   | 用途                           |
| ---------------------- | ------------------------------ |
| `npm run lint`         | 检查 JavaScript 代码           |
| `npm run format:check` | 检查格式                       |
| `npm test`             | 运行锚点、正反面与商品数据测试 |
| `npm run validate`     | 校验小程序目录和关键配置       |
| `npm run check`        | 依次运行全部本地检查           |
| `npm run preview`      | 启动 UI 验收预览服务器         |

## 目录

```text
miniprogram/          微信小程序页面、领域逻辑、追踪与渲染接口
cloudfunctions/       云函数边界说明；具体函数按功能独立添加
tests/                可在 Node.js 中运行的纯逻辑测试
assets/models/        经批准的示例模型说明，不提交生产大文件
assets/images/        经批准的示例图片说明，不提交用户图片
preview/              浏览器 UI 验收预览，不进入小程序包
docs/adr/             架构决策记录
docs/agents/          工程技能使用的仓库配置
```

产品范围与已确认决策以 [`决策文档.md`](决策文档.md) 为准。领域词汇见 [`CONTEXT.md`](CONTEXT.md)，开发与验证要求见 [`docs/development.md`](docs/development.md)。

## 安全边界

- 不提交 AppID 私有配置、云密钥、用户图片或私有模型 URL。
- 商家上传在接入云端前必须经过扩展名、大小、内容安全和权限校验。
- 当前演示数据均为虚构占位，不代表真实商家、商品或价格。
