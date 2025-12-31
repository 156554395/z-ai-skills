'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Download, CheckCircle, Check, ChevronRight, Sparkles, Cpu, Globe, FileText, Palette, Video, Mic, Volume2, Search, Eye, Image as ImageIcon, Layout, FileSpreadsheet, FileKey, Code, Zap, Star, ArrowRight, ExternalLink, Copy, Layers, Terminal, Box, Grid3x3, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

// 技能详细数据（包含中文翻译）
const skillsData = [
  {
    id: 'llm',
    name: 'LLM',
    nameZh: '大语言模型',
    category: 'AI',
    categoryZh: '人工智能',
    icon: Sparkles,
    color: 'from-violet-500 via-purple-500 to-fuchsia-500',
    bgLight: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'shadow-violet-500/25',
    shortDesc: '对话式 AI 和智能助手',
    fullDesc: 'LLM（Large Language Model）技能让您能够利用大语言模型构建强大的对话式应用。支持多轮对话、系统提示词配置和上下文管理，适用于聊天机器人、AI 助手、内容生成等场景。',
    features: [
      '多轮对话支持，维护上下文',
      '自定义系统提示词',
      '流式响应输出',
      '上下文长度管理',
      '错误重试机制',
      '内容生成和文本分析'
    ],
    useCases: [
      '智能客服聊天机器人',
      'AI 写作助手',
      '代码生成和调试',
      '数据分析和总结',
      '邮件回复助手',
      '产品描述生成'
    ],
    cliCommand: 'z-ai chat --prompt "你的问题"',
    scriptExample: `const zai = await ZAI.create();
const completion = await zai.chat.completions.create({
  messages: [
    { role: 'user', content: '你好' }
  ]
});`
  },
  {
    id: 'vlm',
    name: 'VLM',
    nameZh: '视觉语言模型',
    category: 'AI',
    categoryZh: '人工智能',
    icon: Eye,
    color: 'from-cyan-400 via-blue-500 to-indigo-500',
    bgLight: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/25',
    shortDesc: '图像理解与视觉分析',
    fullDesc: 'VLM（Vision Language Model）技能提供强大的图像理解能力，可以分析图片内容、描述视觉元素、回答关于图像的问题。支持图像 URL 和 base64 编码的图像输入，实现多模态交互。',
    features: [
      '图像内容理解和描述',
      '支持多种图像格式',
      'URL 和 base64 输入',
      '视觉问答',
      '图像场景分析',
      '物体识别和检测'
    ],
    useCases: [
      '图片内容描述',
      '视觉问答系统',
      '图像标注助手',
      '视觉搜索',
      '图片审核',
      '艺术作品分析'
    ],
    cliCommand: 'z-ai function -n vlm -a \'{"image_url": "https://..."}\'',
    scriptExample: `const zai = await ZAI.create();
const result = await zai.functions.invoke('vlm', {
  image_url: 'https://example.com/image.jpg',
  prompt: '描述这张图片'
});`
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    nameZh: '图像生成',
    category: 'AI',
    categoryZh: '人工智能',
    icon: ImageIcon,
    color: 'from-orange-500 via-rose-500 to-pink-500',
    bgLight: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    glow: 'shadow-orange-500/25',
    shortDesc: '从文本创建精美图像',
    fullDesc: 'Image Generation 技能使用 AI 模型根据文本描述生成高质量图像。支持多种尺寸（方形、肖像、风景等），返回 base64 编码的图像，适用于创意设计、网站素材、营销材料等场景。',
    features: [
      '7种支持尺寸（1024x1024, 768x1344 等）',
      '高质量的 AI 生成图像',
      'base64 编码输出',
      '批量生成支持',
      '图像缓存机制',
      'CLI 快速生成工具'
    ],
    useCases: [
      '网站横幅和背景图',
      '产品展示图',
      '社交媒体内容',
      '博客文章插图',
      'Logo 和图标设计',
      '游戏概念艺术'
    ],
    cliCommand: 'z-ai image -p "描述" -o output.png -s 1024x1024',
    scriptExample: `const zai = await ZAI.create();
const response = await zai.images.generations.create({
  prompt: '一只可爱的猫',
  size: '1024x1024'
});
const imageBase64 = response.data[0].base64;`
  },
  {
    id: 'video-generation',
    name: 'Video Generation',
    nameZh: '视频生成',
    category: 'AI',
    categoryZh: '人工智能',
    icon: Video,
    color: 'from-purple-500 via-violet-600 to-indigo-600',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'shadow-purple-500/25',
    shortDesc: 'AI 驱动的视频创作',
    fullDesc: 'Video Generation 技能让您能够使用 AI 生成视频内容。支持从文本提示词或静态图像创建视频，提供异步任务管理、状态轮询和结果检索功能，适合短视频创作和内容营销。',
    features: [
      '文本生成视频',
      '图像生成视频',
      '异步任务处理',
      '状态轮询机制',
      '任务队列管理',
      '结果自动下载'
    ],
    useCases: [
      '短视频内容创作',
      '产品演示视频',
      '社交媒体视频',
      '动画效果生成',
      '营销视频制作',
      '故事可视化'
    ],
    cliCommand: 'z-ai function -n video_generation -a \'{"prompt": "描述"}\'',
    scriptExample: `const zai = await ZAI.create();
const task = await zai.functions.invoke('video_generation', {
  prompt: '日落的海滩',
  duration: 5
});`
  },
  {
    id: 'asr',
    name: 'ASR',
    nameZh: '语音识别',
    category: 'AI',
    categoryZh: '人工智能',
    icon: Mic,
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/25',
    shortDesc: '将语音转换为文字',
    fullDesc: 'ASR（Automatic Speech Recognition）技能提供高质量的语音转文字功能。支持 base64 编码的音频文件输入，返回准确的文本转录结果，适用于会议记录、语音笔记、内容字幕等场景。',
    features: [
      '高精度语音识别',
      '支持多种音频格式',
      'base64 音频输入',
      '实时转录支持',
      '说话人识别',
      '时间戳输出'
    ],
    useCases: [
      '会议记录和纪要',
      '语音笔记转录',
      '视频字幕生成',
      '电话录音整理',
      '播客内容转录',
      '语音搜索'
    ],
    cliCommand: 'z-ai function -n asr -a \'{"audio_base64": "..."}\'',
    scriptExample: `const zai = await ZAI.create();
const result = await zai.functions.invoke('asr', {
  audio_base64: '音频base64字符串'
});`
  },
  {
    id: 'tts',
    name: 'TTS',
    nameZh: '文字转语音',
    category: 'AI',
    categoryZh: '人工智能',
    icon: Volume2,
    color: 'from-blue-500 via-indigo-500 to-violet-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/25',
    shortDesc: '自然流畅的语音合成',
    fullDesc: 'TTS（Text-to-Speech）技能将文本转换为流畅自然的语音输出。支持多种语音和语速调节，输出多种音频格式，适用于语音助手、有声读物、语音导航等应用。',
    features: [
      '多种语音选择',
      '语速调节功能',
      '自然语音输出',
      '多种音频格式',
      '批量文本转语音',
      '高质量音质'
    ],
    useCases: [
      '语音助手播报',
      '有声读物制作',
      '语音导航',
      '新闻播报',
      '培训课程配音',
      '无障碍辅助功能'
    ],
    cliCommand: 'z-ai function -n tts -a \'{"text": "要转换的文本"}\'',
    scriptExample: `const zai = await ZAI.create();
const result = await zai.functions.invoke('tts', {
  text: '你好，欢迎使用',
  voice: 'zh-CN-Xiaoxiao',
  speed: 1.0
});`
  },
  {
    id: 'web-search',
    name: 'Web Search',
    nameZh: '网络搜索',
    category: 'Web',
    categoryZh: '网络功能',
    icon: Search,
    color: 'from-sky-400 via-blue-500 to-indigo-500',
    bgLight: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    glow: 'shadow-sky-500/25',
    shortDesc: '实时网络信息检索',
    fullDesc: 'Web Search 技能提供强大的网络搜索能力，可以实时检索最新信息。返回结构化的搜索结果，包含 URL、标题、摘要和元数据，支持结果过滤和排序。',
    features: [
      '实时网络搜索',
      '结果数量自定义',
      '时间范围过滤',
      '域名过滤',
      '结果质量评分',
      '搜索缓存机制'
    ],
    useCases: [
      '最新新闻检索',
      '技术资料查找',
      '竞品信息收集',
      '学术论文搜索',
      '市场研究分析',
      '内容事实核查'
    ],
    cliCommand: 'z-ai function -n web_search -a \'{"query": "搜索关键词"}\'',
    scriptExample: `const zai = await ZAI.create();
const results = await zai.functions.invoke('web_search', {
  query: '人工智能最新进展',
  num: 10
});`
  },
  {
    id: 'web-reader',
    name: 'Web Reader',
    nameZh: '网页阅读器',
    category: 'Web',
    categoryZh: '网络功能',
    icon: Globe,
    color: 'from-green-500 via-emerald-500 to-teal-500',
    bgLight: 'bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'shadow-green-500/25',
    shortDesc: '智能网页内容提取',
    fullDesc: 'Web Reader 技能可以自动抓取和提取网页的主要内容。自动识别文章标题、正文内容、发布时间等元数据，过滤广告和无关元素，适用于内容聚合、资料收集等场景。',
    features: [
      '自动内容提取',
      '元数据识别',
      '广告和噪音过滤',
      '多种格式输出',
      '批量网页处理',
      '编码自动检测'
    ],
    useCases: [
      '文章内容聚合',
      '新闻资讯采集',
      '博客文章抓取',
      '资料收集整理',
      '内容监控追踪',
      'SEO 分析'
    ],
    cliCommand: 'z-ai function -n web_reader -a \'{"url": "https://..."}\'',
    scriptExample: `const zai = await ZAI.create();
const content = await zai.functions.invoke('web_reader', {
  url: 'https://example.com/article'
});`
  },
  {
    id: 'frontend-design',
    name: 'Frontend Design',
    nameZh: '前端设计',
    category: 'Design',
    categoryZh: '设计开发',
    icon: Layout,
    color: 'from-pink-500 via-rose-500 to-red-500',
    bgLight: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'shadow-pink-500/25',
    shortDesc: '现代化 UI/UX 设计',
    fullDesc: 'Frontend Design 技能将设计需求转换为生产就绪的前端代码。使用系统化设计令牌、无障碍合规标准和创意执行，适用于构建网站、Web 应用、React/Next.js 组件等。',
    features: [
      '系统化设计令牌',
      '响应式设计支持',
      '无障碍合规性',
      'Tailwind CSS 集成',
      'shadcn/ui 组件库',
      '深色模式支持'
    ],
    useCases: [
      '企业官网开发',
      '管理后台界面',
      '电商网站设计',
      '仪表板和报表',
      '移动端应用',
      '营销落地页'
    ],
    cliCommand: '不适用（设计技能）',
    scriptExample: `// 使用设计令牌
import { designTokens } from './design-tokens';

export function Button() {
  return (
    <button style={{
      backgroundColor: designTokens.colors.primary
    }}>
      按钮
    </button>
  );
}`
  },
  {
    id: 'canvas-design',
    name: 'Canvas Design',
    nameZh: '画布设计',
    category: 'Design',
    categoryZh: '设计开发',
    icon: Palette,
    color: 'from-amber-500 via-orange-500 to-red-500',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/25',
    shortDesc: '海报与艺术创作',
    fullDesc: 'Canvas Design 技能使用设计哲学创建精美的视觉艺术作品。支持生成 PNG 和 PDF 格式的静态设计，包括海报、艺术作品、宣传物料等，注重原创性避免版权问题。',
    features: [
      '原创视觉设计',
      '多种字体支持（50+）',
      'PNG 和 PDF 输出',
      '设计模板系统',
      '颜色和布局控制',
      '高分辨率输出'
    ],
    useCases: [
      '宣传海报设计',
      '活动邀请函',
      '艺术作品创作',
      '信息图表制作',
      '社交媒体图片',
      '品牌视觉素材'
    ],
    cliCommand: '不适用（设计技能）',
    scriptExample: `// 使用 Canvas 生成设计
import { createCanvas } from 'canvas';

const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');
// 设计逻辑...`
  },
  {
    id: 'pptx',
    name: 'PPTX',
    nameZh: '演示文稿',
    category: 'Documents',
    categoryZh: '文档处理',
    icon: FileText,
    color: 'from-orange-600 via-red-500 to-rose-600',
    bgLight: 'bg-orange-600/10',
    border: 'border-orange-600/20',
    glow: 'shadow-orange-600/25',
    shortDesc: 'PPT 制作与编辑',
    fullDesc: 'PPTX 技能提供全面的演示文稿处理能力，包括创建新演示文稿、编辑内容和布局、添加评论和演讲者备注等。支持 HTML 转 PPTX、幻灯片重排等功能。',
    features: [
      '创建和编辑 PPTX',
      'HTML 内容导入',
      '幻灯片重排',
      '缩略图生成',
      '批量处理',
      'OOXML 规范支持'
    ],
    useCases: [
      '自动生成报告 PPT',
      '批量制作演示文稿',
      '从网页生成幻灯片',
      '培训课程制作',
      '产品演示准备',
      '会议材料整理'
    ],
    cliCommand: '不适用（文档处理技能）',
    scriptExample: `import PPTX from 'node-pptx';

const pptx = new PPTX.Compiler();
pptx.addSlide().addText('标题');`
  },
  {
    id: 'docx',
    name: 'DOCX',
    nameZh: '文档',
    category: 'Documents',
    categoryZh: '文档处理',
    icon: FileKey,
    color: 'from-blue-600 via-indigo-600 to-violet-600',
    bgLight: 'bg-blue-600/10',
    border: 'border-blue-600/20',
    glow: 'shadow-blue-600/25',
    shortDesc: 'Word 文档处理',
    fullDesc: 'DOCX 技能提供专业的文档处理能力，包括创建和编辑 Word 文档、处理修订和评论、保持格式和文本提取等。支持协作功能和文档验证。',
    features: [
      '创建和编辑 DOCX',
      '修订和评论支持',
      '格式保持',
      '协作功能',
      '模板系统',
      'OOXML 验证'
    ],
    useCases: [
      '自动生成报告',
      '合同文档制作',
      '批量文档处理',
      '文档模板填充',
      '格式转换',
      '文档归档'
    ],
    cliCommand: '不适用（文档处理技能）',
    scriptExample: `import { Document, Packer, Paragraph } from 'docx';

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({ text: '文档内容' })
    ]
  }]
});`
  },
  {
    id: 'xlsx',
    name: 'XLSX',
    nameZh: '电子表格',
    category: 'Documents',
    categoryZh: '文档处理',
    icon: FileSpreadsheet,
    color: 'from-emerald-600 via-green-500 to-teal-600',
    bgLight: 'bg-emerald-600/10',
    border: 'border-emerald-600/20',
    glow: 'shadow-emerald-600/25',
    shortDesc: 'Excel 表格处理',
    fullDesc: 'XLSX 技能提供全面的电子表格处理能力，包括创建带公式和格式的新表格、数据分析和可视化、修改现有表格等。支持公式重计算和复杂格式设置。',
    features: [
      '创建和编辑 XLSX',
      '公式计算支持',
      '数据可视化',
      '样式和格式设置',
      '大数据处理',
      '公式重计算'
    ],
    useCases: [
      '财务报表生成',
      '数据分析报告',
      '批量数据导入导出',
      '自动化统计报表',
      '数据透视表生成',
      '预算管理'
    ],
    cliCommand: '不适用（文档处理技能）',
    scriptExample: `import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('数据');
sheet.getCell('A1').value = '数据';`
  },
  {
    id: 'pdf',
    name: 'PDF',
    nameZh: 'PDF 处理',
    category: 'Documents',
    categoryZh: '文档处理',
    icon: FileText,
    color: 'from-red-600 via-rose-600 to-pink-600',
    bgLight: 'bg-red-600/10',
    border: 'border-red-600/20',
    glow: 'shadow-red-600/25',
    shortDesc: 'PDF 文档操作',
    fullDesc: 'PDF 技能提供全面的 PDF 文档处理能力，包括提取文本和表格、创建新 PDF、合并和拆分文档、处理表单等。支持 PDF 转图像和表单填写功能。',
    features: [
      '文本和表格提取',
      '创建和修改 PDF',
      '文档合并拆分',
      '表单填写',
      'PDF 转图像',
      '边界框检测'
    ],
    useCases: [
      'PDF 内容提取',
      '表单自动填写',
      '文档批量处理',
      'PDF 转图片',
      '报告生成',
      '文档归档管理'
    ],
    cliCommand: '不适用（文档处理技能）',
    scriptExample: `import { PDFDocument } from 'pdf-lib';

const pdfDoc = await PDFDocument.load(fileBytes);
const pages = pdfDoc.getPages();`
  }
]

// 分类数据
const categories = [
  { id: 'all', name: '全部', nameEn: 'All', icon: Grid3x3 },
  { id: 'AI', name: '人工智能', nameEn: 'AI', icon: Sparkles },
  { id: 'Web', name: '网络功能', nameEn: 'Web', icon: Globe },
  { id: 'Design', name: '设计开发', nameEn: 'Design', icon: Layout },
  { id: 'Documents', name: '文档处理', nameEn: 'Documents', icon: FileText },
]

// 计算每个分类的技能数量
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return skillsData.length
  return skillsData.filter(s => s.category === categoryId).length
}

export default function SkillsDownloadPage() {
  const [downloaded, setDownloaded] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory)

  const handleDownload = () => {
    // 直接打开 GitHub 下载链接，避免 API 重定向问题
    window.open('https://github.com/156554395/z-ai-skills/archive/refs/heads/main.zip', '_blank')
  }

  const handleCopyCode = async (code: string, skillId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(skillId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  const handleViewDocs = () => {
    // 打开技能包的 README 文档
    window.open('https://github.com/156554395/z-ai-skills', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col relative overflow-hidden">
      {/* 动态背景层 */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 主渐变光晕 */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* 网格装饰 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl flex-1 relative">
        {/* 头部区域 */}
        <div className="text-center mb-12 md:mb-20">
          {/* 顶部徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">14 个强大技能，一键获取</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              z.ai skills技能集合
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            构建下一代 AI 应用的强大工具包
            <br className="hidden md:block" />
            <span className="text-base md:text-lg text-slate-500 dark:text-slate-500">包含完整文档、实现代码和使用示例</span>
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={handleDownload}
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-base md:text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {downloaded ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  已下载
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  立即下载 (3.1 MB)
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewDocs}
              className="px-8 py-6 text-base md:text-lg border-2 border-slate-200 dark:border-slate-800 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300 backdrop-blur-sm"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              查看文档
            </Button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { icon: Layers, label: '技能总数', value: '14', color: 'text-violet-500' },
              { icon: Code, label: '代码示例', value: '50+', color: 'text-blue-500' },
              { icon: Star, label: '使用场景', value: '100+', color: 'text-purple-500' },
              { icon: ShieldCheck, label: '文档页面', value: '200+', color: 'text-pink-500' },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} transition-transform duration-300 group-hover:scale-110`} />
                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 分类筛选器 */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-10 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${selectedCategory === cat.id ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-violet-500'}`} />
                  {cat.name}
                  <span className="flex items-center gap-1.5">
                    <span className="text-xs opacity-60">{cat.nameEn}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {getCategoryCount(cat.id)}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* 技能卡片网格 - 新布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon
            return (
              <Dialog key={skill.id}>
                <DialogTrigger asChild>
                  <Card 
                    className={`group relative overflow-hidden border-0 cursor-pointer backdrop-blur-sm transition-all duration-300
                      ${hoveredSkill === skill.id 
                        ? `shadow-2xl ${skill.glow} scale-[1.02]` 
                        : 'shadow-xl hover:shadow-2xl hover:shadow-violet-500/20'
                      }
                    `}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* 背景渐变 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500`} />
                    
                    {/* 卡片内容 */}
                    <div className="relative p-6">
                      {/* 顶部：图标 + 技能信息 */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* 图标 */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* 技能信息 */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight">
                            {skill.nameZh}
                          </h3>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                              {skill.name}
                            </p>
                            {/* 只在"全部"分类时显示分类标签 */}
                            {selectedCategory === 'all' && (
                              <Badge className={`text-xs font-semibold px-2 py-0.5 ${skill.bgLight} ${skill.border} border-2 flex-shrink-0 text-slate-700 dark:text-slate-600`}>
                                {skill.categoryZh}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 描述 */}
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {skill.shortDesc}
                      </CardDescription>

                      {/* 功能列表 */}
                      <div className="space-y-2 mb-4">
                        {skill.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${skill.color}`} />
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* 底部：查看详情 */}
                      <div className={`flex items-center justify-center pt-4 border-t border-slate-100 dark:border-slate-800/50 text-xs font-semibold transition-all duration-300 ${
                        selectedCategory === 'all' ? 'text-violet-500 opacity-100' : 'opacity-0 group-hover:opacity-100 text-violet-500'
                      }`}>
                        <span>查看详情</span>
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-2 border-slate-200 dark:border-slate-800">
                  {/* 弹窗头部 */}
                  <div className={`sticky top-0 z-10 bg-gradient-to-r ${skill.color} p-8 md:p-10`}>
                    <div className="flex items-center gap-6">
                      <div className="relative p-5 rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1 text-white">
                        <DialogTitle className="text-3xl md:text-4xl font-bold mb-2">
                          {skill.nameZh}
                        </DialogTitle>
                        <div className="flex items-center gap-3 text-white/80">
                          <Badge variant="secondary" className="bg-white/20 text-white border-0 px-4 py-1.5 text-sm">
                            {skill.name}
                          </Badge>
                          <span className="text-sm">{skill.categoryZh} 技能</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 弹窗内容 */}
                  <div className="p-8 md:p-10 space-y-8">
                    {/* 技能简介 */}
                    <div className="bg-gradient-to-r from-slate-50 to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50">
                      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        技能简介
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                        {skill.fullDesc}
                      </p>
                    </div>

                    {/* 功能特点 */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        功能特点
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {skill.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="group flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-100/50 dark:hover:from-slate-800 dark:hover:to-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-violet-500/20 transition-all duration-300"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${skill.color} mt-2 flex-shrink-0 ring-4 ring-violet-500/10`} />
                            <span className="text-sm md:text-base text-slate-700 dark:text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 应用场景 */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        应用场景
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {skill.useCases.map((useCase, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="px-4 py-2 text-sm border-2 border-slate-200 dark:border-slate-800 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300"
                          >
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CLI 命令 */}
                    {skill.cliCommand !== '不适用（设计技能）' && skill.cliCommand !== '不适用（文档处理技能）' && (
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                            <Terminal className="w-5 h-5 text-white" />
                          </div>
                          CLI 命令示例
                        </h3>
                        <div className="relative group">
                          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 overflow-hidden">
                            <pre className="font-mono text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                              {skill.cliCommand}
                            </pre>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                            onClick={() => handleCopyCode(skill.cliCommand, skill.id)}
                          >
                            {copiedCode === skill.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* 代码示例 */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        代码示例
                      </h3>
                      <div className="relative group">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 overflow-hidden">
                          <pre className="font-mono text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {skill.scriptExample}
                          </pre>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                          onClick={() => handleCopyCode(skill.scriptExample, `${skill.id}-code`)}
                        >
                          {copiedCode === `${skill.id}-code` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        {/* 包含内容卡片 */}
        <Card className="mt-16 md:mt-20 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 border border-violet-500/10 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
                <Box className="w-6 h-6 text-white" />
              </div>
              技能包包含内容
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '14 个技能的完整 SKILL.md 文档',
                'TypeScript/Python 实现脚本和工具代码',
                'MIT 许可证文件和配置说明',
                '详细的 README.md 说明文档',
                '丰富的使用示例和最佳实践',
                '设计模板和样式系统（Canvas Design）',
                'OOXML 规范文件（DOCX/PPTX）',
                '50+ 种设计字体（Canvas Design）',
              ].map((item, idx) => (
                <div key={idx} className="group flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500/30 hover:bg-gradient-to-r hover:from-violet-500/5 hover:to-purple-500/5 transition-all duration-300">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/20">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm md:text-base text-slate-600 dark:text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative mt-auto border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>AI Skills Package - 构建下一代 AI 应用</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <span>MIT License</span>
              <ArrowRight className="w-4 h-4" />
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 全局样式 */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
