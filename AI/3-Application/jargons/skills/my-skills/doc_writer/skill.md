---
metadata:
  name: doc_writer
  description: 智能生成和整理 Word 文档（.docx）的 Skill，可根据用户需求创建结构清晰、格式统一、可直接交付的正式文档。
  version: 1.1.0
  author: ceilf6
  category: document
  tags:
    - docx
    - word
    - report
    - resume
    - meeting-notes
    - proposal
    - formatting
  input_types:
    - text
    - outline
    - markdown
    - structured_data
  output_types:
    - docx
  capabilities:
    - create_docx
    - apply_document_styles
    - generate_cover_page
    - generate_table_of_contents
    - create_tables
    - insert_headers_footers
    - paginate_sections
    - export_formal_documents
  trigger:
    - 当用户要求生成 Word 文档、doc/docx 文件时
    - 当用户要求把文字整理成正式文档时
    - 当用户要求输出带格式的报告、方案、通知、纪要、简历、说明书时
  limitations:
    - 不负责 OCR 识别扫描件内容
    - 不保证复杂出版社级排版效果
    - 不处理违法、侵权、欺诈性文档生成请求
---

# doc_writer

## Skill 简介

`doc_writer` 用于将用户提供的内容、提纲、说明或零散信息整理为结构化的 Word 文档（`.docx`）。

适用场景包括但不限于：

- 会议纪要
- 项目方案
- 课程报告
- 实验报告
- 产品需求文档
- 操作手册
- 通知公告
- 简历
- 合同草稿
- 工作总结
- 学习笔记整理稿

该 Skill 会优先保证：

1. **结构完整**
2. **层级清晰**
3. **格式统一**
4. **语言正式**
5. **文档可直接交付**

该 Skill 的职责是：

- 判断文档类型
- 选择合适模板
- 将用户输入补全为可交付文档
- 统一排版和输出规范

该 Skill 不在主文件中存放长篇模板正文，具体模板统一放在 `references/` 目录中维护。

---

# 入口路由

## Route

`/doc/write`

---

# 入口说明

当请求命中以下意图时，进入该 Skill：

- “帮我生成一个 doc 文件”
- “把这段内容整理成 Word 文档”
- “生成一份课程报告 docx”
- “把下面内容做成正式通知”
- “帮我写一份简历并导出为 docx”
- “根据这个提纲生成项目方案文档”

---

# 输入要求

Skill 接收以下输入之一或组合：

## 1. 纯文本内容
用户直接提供一段或多段文字，Skill 自动识别结构并整理成文档。

## 2. 提纲
用户提供标题、章节、小节，Skill 负责扩写、规范化和排版。

## 3. Markdown
用户提供 Markdown 内容，Skill 转换为 Word 文档结构。

## 4. 结构化信息
例如：

- 标题
- 作者
- 日期
- 摘要
- 正文
- 附录
- 表格数据
- 页眉页脚要求
- 是否需要目录

若用户未明确给出文档类型，Skill 需要先根据用户目标推断最接近的模板类型，再进行生成。

---

# 输出规范

生成的 `.docx` 文档默认遵循以下格式规范：

## 页面设置
- 纸张：A4
- 页边距：上 2.54 cm，下 2.54 cm，左 3.18 cm，右 3.18 cm
- 段前段后适度留白
- 正文默认 1.5 倍行距

## 字体规范
- 中文正文：宋体 / 微软雅黑（二选一，默认宋体）
- 英文正文：Times New Roman / Arial
- 正文大小：小四或 12pt
- 一级标题：三号加粗
- 二级标题：四号加粗
- 三级标题：小四加粗

## 文档结构
默认按以下逻辑组织：
1. 封面（可选）
2. 标题
3. 作者 / 日期 / 单位（可选）
4. 摘要（可选）
5. 目录（可选）
6. 正文
7. 结论 / 总结（可选）
8. 附录（可选）

## 版式能力
- 支持分页
- 支持章节标题样式
- 支持自动目录
- 支持页眉页脚
- 支持页码
- 支持表格
- 支持引用块
- 支持项目符号与编号列表

---

# 处理规则

## 规则 1：优先结构化
若用户输入内容混乱，先自动整理出标题层级，再生成文档。

## 规则 2：优先可交付
输出应尽量达到“可以直接发给老师/同事/领导”的程度，而不是简单堆文字。

## 规则 3：默认正式文风
除非用户明确要求口语化、宣传风、极简风，否则默认采用正式、清晰、书面化表达。

## 规则 4：格式一致性
同级标题样式必须统一，正文缩进、行距、表格风格保持一致。

## 规则 5：信息不足时合理补全
当用户只给出主题或提纲时，可补全常见章节，但不得编造关键事实。
对于不确定信息，应以占位符形式标明，例如：
- `[待补充负责人]`
- `[待确认日期]`

## 规则 6：模板优先复用
当用户需求与已有模板匹配时，优先基于 `references/` 目录中的标准模板生成，而不是临时拼接章节。

## 规则 7：先骨架，后润色
先确定章节、字段和逻辑顺序，再补正文内容，最后统一文风与格式。

## 规则 8：不输出空泛套话
若用户提供了真实上下文，正文应优先写出具体目标、动作、结论和约束，避免大量空洞表述。

---

# 模板目录

以下模板文件为当前 Skill 的标准模板资产：

- `references/meeting_summary.md`：会议纪要
- `references/project_proposal.md`：项目方案
- `references/course_experiment_report.md`：课程 / 实验报告
- `references/resume.md`：简历
- `references/notice_announcement.md`：通知 / 公告

---

# 模板选择规则

## 会议纪要
适用于会议记录、讨论结论、同步事项、复盘纪要。

## 项目方案
适用于立项说明、实施方案、执行计划、汇报方案、落地计划。

## 课程 / 实验报告
适用于课程作业、实验报告、学习报告、课程总结。

## 简历
适用于个人履历整理、求职简历、实习简历、校园简历。

## 通知 / 公告
适用于正式对内或对外发布的通知、公示、安排说明、执行要求。

若用户输入与以上模板都不完全匹配，Skill 应：

1. 先选择最接近的模板作为骨架。
2. 保留不适用章节，必要时删减或替换。
3. 明确哪些内容来自用户，哪些内容为结构性补全。

---

# 模板使用要求

调用模板时，必须遵循以下要求：

1. 不得机械照抄模板中的占位字段，需结合用户输入替换。
2. 对缺失但必要的信息，使用 `[待补充]` 风格占位。
3. 若用户明确给出结构，以用户结构优先，模板仅作为补全参考。
4. 模板中的示例语句只能作为写法参考，不能误当成真实事实写入结果。
5. 输出给用户的内容应是最终文档内容，而不是“模板展示文本”。

---

# 返回结果

Skill 执行后应返回：

- 生成结果说明
- 文档标题
- 文档类型
- 主要章节列表
- 导出文件名
- `.docx` 文件路径或下载入口

示例：

```json
{
  "status": "success",
  "title": "项目实施方案",
  "document_type": "proposal",
  "sections": [
    "项目背景",
    "项目目标",
    "实施计划",
    "风险评估",
    "总结"
  ],
  "file_name": "project_proposal.docx",
  "output_path": "/outputs/project_proposal.docx"
}
```

若脚本执行失败，应返回：

```json
{
  "status": "error",
  "reason": "python-docx 未安装 / 输入 JSON 格式有误 / 输出路径无写权限",
  "fallback": "已将文档内容以 Markdown 格式输出，用户可手动复制到 Word"
}
```

---

# 执行工作流

当 Skill 被触发后，按以下顺序执行：

## 步骤 1：意图识别与类型判断

分析用户输入，确定：

- 文档类型（会议纪要 / 项目方案 / 课程报告 / 简历 / 通知 / 其他）
- 已知信息（标题、章节、关键字段）
- 缺失信息（用占位符标注）

## 步骤 2：选择模板

根据文档类型，从 `references/` 目录选择最接近的标准模板。  
若无完全匹配，选最接近的模板并在必要章节上做增减。

## 步骤 3：生成结构化 JSON

将文档内容组织为 `generate_doc.py` 所接受的 JSON 格式：

```json
{
  "title": "文档标题",
  "document_type": "proposal",
  "cover": {
    "subtitle": "副标题（可选）",
    "author": "作者",
    "date": "2026-03-12",
    "organization": "单位（可选）"
  },
  "header_text": "页眉文字（可选）",
  "page_number": true,
  "abstract": "摘要段落（可选）",
  "sections": [
    {
      "heading": "一、章节标题",
      "level": 1,
      "content": "正文段落文本"
    },
    {
      "heading": "1.1 子节标题",
      "level": 2,
      "bullets": ["要点一", "要点二"],
      "table": {
        "headers": ["列1", "列2"],
        "rows": [["内容A", "内容B"]]
      }
    }
  ]
}
```

`sections` 中每个节点支持的字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `heading` | string | 章节标题（可选） |
| `level` | int | 标题级别 1/2/3，默认 2 |
| `content` | string | 正文段落（纯文本） |
| `markdown` | string | Markdown 文本，会自动解析 |
| `bullets` | string[] | 无序列表项 |
| `numbered` | string[] | 有序编号列表项 |
| `table` | object | 表格，含 `headers` 和 `rows` |
| `subsections` | object[] | 嵌套子节，结构相同 |

## 步骤 4：调用生成脚本

```bash
# 从文件输入
python scripts/generate_doc.py --input content.json --output outputs/doc.docx

# 从 stdin 输入
echo '<json内容>' | python scripts/generate_doc.py --stdin --output outputs/doc.docx
```

> 依赖安装：`pip install python-docx`

如果运行环境不可用 Python/python-docx，降级为输出完整 Markdown 文档内容，并提示用户手动粘贴到 Word。

## 步骤 5：返回结果

脚本执行成功后，返回 JSON 格式的结果说明（见"返回结果"一节），并告知用户文件路径。

---

# 脚本说明

## scripts/generate_doc.py

`generate_doc.py` 是本 Skill 的核心生成脚本，将 JSON 结构内容转换为格式规范的 `.docx` 文档。

### 输入

接受两种方式之一：

- `--input <file.json>`：从 JSON 文件读取
- `--stdin`：从标准输入读取 JSON 字符串

### 输出

- `--output <file.docx>`：指定输出路径
- 默认输出到 `outputs/<title>.docx`（脚本同级目录上一级下的 `outputs/` 文件夹）

### 格式能力

- A4 页面 + 标准页边距（见"输出规范"一节）
- 中英文分体字体（中文宋体 / 黑体，英文 Times New Roman / Arial）
- 三级标题样式（三号加粗 / 四号加粗 / 小四加粗）
- 正文 12pt + 1.5 倍行距
- 封面页（可选）
- 页眉文字（可选）
- 自动页码（页脚居中）
- 无序/有序列表
- 表格（含加粗表头）
- 简版 Markdown 解析（`#` 标题、`-` 列表、`|` 表格、普通段落）

### 依赖

```
python-docx >= 0.8.11
```

安装：

```bash
pip install python-docx
```