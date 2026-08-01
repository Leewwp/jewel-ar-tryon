# ADR-0002: Use WeChat Cloud Development with COS/CDN for model assets

- Status: Accepted
- Date: 2026-08-02

## Context

早期需要快速完成商家、商品和内容安全流程，同时 3D 模型体积较大、下载流量成本需要独立控制。

## Decision

微信云开发承载早期业务数据和小型云函数；腾讯云 COS/CDN 承载 GLB/glTF 与材质资产。商品只保存经过授权的模型引用和校准元数据，不保存长期有效的私有签名 URL。

## Consequences

业务开发速度更快，模型分发成本更透明；项目需要维护两个云边界，并在部署前补齐最小权限、签名 URL、内容安全和失败重试策略。
