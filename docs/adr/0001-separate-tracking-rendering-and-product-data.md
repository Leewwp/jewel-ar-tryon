# ADR-0001: Separate tracking, rendering, and product data

- Status: Accepted
- Date: 2026-08-02

## Context

Demo 同时包含商品展示、VisionKit 关键点追踪和 three.js 模型渲染。如果页面直接组合这些细节，真机 API、商品字段和坐标计算会难以独立测试，也会阻碍后续按品类调整追踪策略。

## Decision

- 商品字段与校验放在 `miniprogram/domain/`。
- 品类、锚点变换和正反面判定放在 `miniprogram/tracking/`。
- VisionKit 生命周期放在 `miniprogram/ar/`。
- three.js 场景与模型生命周期放在 `miniprogram/rendering/`。
- 页面只通过稳定接口编排这些模块。

## Consequences

纯逻辑可以在 Node.js 中快速测试，真机相关代码可以晚于 UI 骨架接入。代价是早期存在少量适配器代码，但这比把坐标系和生命周期散落在页面中更容易维护。
