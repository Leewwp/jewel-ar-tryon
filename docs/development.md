# Development and verification

## 微信开发者工具

1. 导入仓库根目录，确认 `miniprogramRoot` 指向 `miniprogram/`。
2. 无正式 AppID 时使用游客模式检查页面；摄像头、VisionKit 与真机能力需要有效 AppID。
3. 依次检查首页品类筛选、商品详情、试戴入口和商家资料表单。
4. 打开调试器，确保无未处理异常或资源加载错误。

## 自动化检查

执行 `npm run check`。它包含 ESLint、Prettier、Node.js 单元测试和项目结构校验。

## AR 变更记录

每次 AR 变更至少记录：

- 设备型号、系统版本与微信版本；
- 环境光线与背景复杂度；
- 首次进入耗时、可感知掉帧或发热；
- 正面、背面和翻转临界角表现；
- 会话退出后摄像头与 GPU 资源是否释放。

模拟器结果不能替代 Android 与 iOS 真机结果。

## 浏览器验收预览

`npm run preview` 提供 `http://127.0.0.1:4173/preview/`。它用于检查 320、375、414 和 768 px 下的布局、品类筛选、商品详情和试戴状态，不运行微信 API，也不代表 AR 已验证。
