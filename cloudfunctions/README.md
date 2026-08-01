# Cloud functions

云函数按单一职责独立创建。计划中的首批边界：

- `merchant-profile`：读取和更新商家资料；
- `product-catalog`：商品草稿、发布与读取；
- `content-safety`：上传文本和图片的内容安全检查；
- `model-ticket`：生成短时有效的 COS 上传/下载授权。

当前 PoC 不包含真实云环境配置或凭据。
