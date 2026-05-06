# 约定
- Wiki 就是本仓库的名称，LLM 的活动范围可以覆盖仓库所有文件

# 仓库文件作用说明
- [README.md](README.md) 供 LLM 关键词检索（混合搜索中的向量部分不由 Wiki 负责，而是在 [FrontAgent](https://github.com/ceilf6/FrontAgent) 中将 Wiki 传入嵌入模型）
- [Schema.md](Schema.md) 存放 LLM 读取、维护文档的约定
- [Map.md](Map.md) 由 LLM 自己维护的文档，目的是提高 LLM 检索 Wiki 的质量与效率，可以包含任意类型的数据。具体实现方式可以有如
	- 维护文件关系图谱
