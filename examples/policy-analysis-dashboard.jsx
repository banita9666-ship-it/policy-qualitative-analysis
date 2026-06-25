import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ComposedChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from "recharts";

// ─── 模拟数据（基于政策文本质性分析框架方法论）───

// 1. 政策发文趋势数据
const trendData = [
  { year: "2018", guobu: 3, ai: 5, total: 8 },
  { year: "2019", guobu: 5, ai: 8, total: 13 },
  { year: "2020", guobu: 8, ai: 15, total: 23 },
  { year: "2021", guobu: 12, ai: 22, total: 34 },
  { year: "2022", guobu: 10, ai: 35, total: 45 },
  { year: "2023", guobu: 18, ai: 48, total: 66 },
  { year: "2024", guobu: 42, ai: 62, total: 104 },
  { year: "2025", guobu: 38, ai: 75, total: 113 },
];

// 阶段标注
const phases = [
  { start: "2018", end: "2019", label: "萌芽期", color: "#94a3b8" },
  { start: "2020", end: "2022", label: "加速期", color: "#60a5fa" },
  { start: "2023", end: "2025", label: "密集爆发期", color: "#f97316" },
];

// 2. 政策工具分布（Rothwell-Zegveld分类）
const toolDistribution = [
  { category: "供给型", guobu: 45, ai: 32 },
  { category: "环境型", guobu: 35, ai: 42 },
  { category: "需求型", guobu: 20, ai: 26 },
];

// 供给型子工具
const supplySubTools = [
  { name: "资金投入", guobu: 18, ai: 8 },
  { name: "基础设施", guobu: 8, ai: 12 },
  { name: "人才培养", guobu: 5, ai: 6 },
  { name: "技术支持", guobu: 8, ai: 10 },
  { name: "信息服务", guobu: 6, ai: 8 },
];

// 环境型子工具
const envSubTools = [
  { name: "法规管制", guobu: 5, ai: 10 },
  { name: "标准制定", guobu: 8, ai: 12 },
  { name: "税收优惠", guobu: 12, ai: 6 },
  { name: "战略规划", guobu: 6, ai: 8 },
  { name: "法规保障", guobu: 4, ai: 6 },
];

// 需求型子工具
const demandSubTools = [
  { name: "政府采购", guobu: 3, ai: 5 },
  { name: "示范项目", guobu: 5, ai: 8 },
  { name: "服务外包", guobu: 2, ai: 4 },
  { name: "贸易促进", guobu: 4, ai: 3 },
  { name: "消费补贴", guobu: 6, ai: 6 },
];

// 3. PMC指数评价数据
const pmcData = [
  { dimension: "政策性质", guobu: 0.85, ai: 0.72 },
  { dimension: "政策时效", guobu: 0.60, ai: 0.78 },
  { dimension: "政策目标", guobu: 0.90, ai: 0.65 },
  { dimension: "政策工具", guobu: 0.75, ai: 0.82 },
  { dimension: "政策对象", guobu: 0.70, ai: 0.88 },
  { dimension: "政策内容", guobu: 0.80, ai: 0.70 },
  { dimension: "政策领域", guobu: 0.55, ai: 0.92 },
  { dimension: "保障机制", guobu: 0.88, ai: 0.60 },
  { dimension: "政策评估", guobu: 0.45, ai: 0.50 },
];

// 4. 交叉维度热力图数据（工具×目标）
const crossDimensions = {
  goals: ["扩内需促消费", "产业升级转型", "技术自主可控", "民生保障", "绿色发展", "国际合作"],
  tools: ["资金投入", "税收优惠", "法规管制", "标准制定", "消费补贴", "示范项目", "政府采购", "人才培养"],
  matrix: [
    [5, 8, 3, 6, 2, 4],
    [7, 6, 4, 3, 5, 2],
    [2, 5, 9, 3, 7, 3],
    [3, 7, 8, 2, 6, 5],
    [9, 3, 2, 8, 4, 1],
    [4, 6, 5, 3, 5, 7],
    [3, 4, 3, 5, 2, 2],
    [2, 5, 7, 4, 3, 6],
  ],
};

// 5. 扎根理论编码（AI隐形政策挖掘）
const groundedTheoryData = {
  openCoding: [
    { text: "算力基础设施国产化替代", code: "算力自主", category: "技术主权" },
    { text: "大模型训练数据合规审查", code: "数据治理", category: "安全规制" },
    { text: "AI伦理审查委员会建设", code: "伦理框架", category: "价值对齐" },
    { text: "算法推荐信息内容管理", code: "算法监管", category: "安全规制" },
    { text: "智能制造专项资金扶持", code: "产业扶持", category: "技术主权" },
    { text: "生成式AI服务备案管理", code: "准入管理", category: "安全规制" },
    { text: "人工智能标准体系建设", code: "标准话语", category: "技术主权" },
    { text: "跨境数据流动安全评估", code: "数据主权", category: "安全规制" },
    { text: "AI人才培养与引进计划", code: "智力储备", category: "能力建设" },
    { text: "开源生态培育与保护", code: "生态建设", category: "能力建设" },
    { text: "隐性算力补贴与电价优惠", code: "隐性补贴", category: "资源调配" },
    { text: "地方政府AI产业园优惠政策", code: "空间集聚", category: "资源调配" },
  ],
  axialCoding: [
    { category: "技术主权", subcategories: ["算力自主", "标准话语", "产业扶持"], condition: "中美科技竞争加剧", strategy: "构建自主可控技术体系", result: "降低外部依赖风险" },
    { category: "安全规制", subcategories: ["数据治理", "算法监管", "准入管理", "数据主权"], condition: "AI技术快速扩散", strategy: "建立全链条监管框架", result: "发展与安全并行" },
    { category: "价值对齐", subcategories: ["伦理框架"], condition: "AI伦理争议频发", strategy: "前置伦理审查机制", result: "技术发展方向引导" },
    { category: "能力建设", subcategories: ["智力储备", "生态建设"], condition: "AI人才缺口巨大", strategy: "多层次人才与生态培育", result: "长期竞争力储备" },
    { category: "资源调配", subcategories: ["隐性补贴", "空间集聚"], condition: "算力成本居高不下", strategy: "隐性资源倾斜配置", result: "降低企业创新成本" },
  ],
  selectiveCoding: {
    core: "发展与安全双轮驱动下的AI治理隐性政策体系",
    storyline: "在全球科技竞争与技术扩散双重压力下，中国通过显性政策（法规、规划）构建安全底线，同时通过隐性政策工具（隐性补贴、标准引导、生态培育、人才储备）塑造AI产业竞争力，形成'明规暗扶'的双轨治理模式。",
  },
};

// 6. 政策主体协同网络数据
const networkNodes = [
  { id: "国务院", group: 1, size: 28 },
  { id: "发改委", group: 2, size: 22 },
  { id: "工信部", group: 2, size: 24 },
  { id: "科技部", group: 2, size: 20 },
  { id: "财政部", group: 2, size: 18 },
  { id: "商务部", group: 2, size: 16 },
  { id: "网信办", group: 2, size: 19 },
  { id: "市场监管总局", group: 2, size: 14 },
  { id: "地方政府", group: 3, size: 15 },
  { id: "行业协会", group: 4, size: 10 },
  { id: "头部企业", group: 5, size: 12 },
  { id: "科研院所", group: 6, size: 11 },
];

const networkLinks = [
  { source: "国务院", target: "发改委", weight: 8 },
  { source: "国务院", target: "工信部", weight: 9 },
  { source: "国务院", target: "科技部", weight: 7 },
  { source: "发改委", target: "财政部", weight: 6 },
  { source: "工信部", target: "科技部", weight: 7 },
  { source: "工信部", target: "网信办", weight: 5 },
  { source: "商务部", target: "发改委", weight: 4 },
  { source: "财政部", target: "商务部", weight: 3 },
  { source: "市场监管总局", target: "网信办", weight: 4 },
  { source: "发改委", target: "地方政府", weight: 5 },
  { source: "工信部", target: "行业协会", weight: 3 },
  { source: "科技部", target: "科研院所", weight: 6 },
  { source: "工信部", target: "头部企业", weight: 4 },
  { source: "地方政府", target: "头部企业", weight: 3 },
  { source: "科研院所", target: "头部企业", weight: 2 },
];

// ─── 颜色配置 ───
const COLORS = {
  primary: "#3b82f6",
  secondary: "#f97316",
  guobu: "#3b82f6",
  ai: "#f97316",
  accent: "#8b5cf6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  muted: "#94a3b8",
  bg: "#0f172a",
  card: "#1e293b",
  cardHover: "#334155",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  border: "#334155",
};

const PIE_COLORS = ["#3b82f6", "#f97316", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

// ─── 组件 ───
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
        : "text-slate-400 hover:text-white hover:bg-slate-700"
    }`}
  >
    {children}
  </button>
);

const Card = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-slate-800 rounded-xl border border-slate-700 p-5 ${className}`}>
    {title && (
      <div className="mb-4">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${colorMap[color]}`}>
      {children}
    </span>
  );
};

// ─── 可视化面板 ───

// 面板1: 政策发文趋势
const TrendPanel = () => (
  <div className="space-y-4">
    <Card
      title="政策发文量时间趋势"
      subtitle="基于文献计量分析 | 2018-2025年国补与AI领域中央级政策发文统计"
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#e2e8f0" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="guobu" name="国补政策" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
          <Bar dataKey="ai" name="AI政策" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.85} />
          <Line type="monotone" dataKey="total" name="合计" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex gap-3 mt-3 flex-wrap">
        {phases.map((p, i) => (
          <div key={i} className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-slate-300">
              {p.label}（{p.start}-{p.end}）
            </span>
          </div>
        ))}
      </div>
    </Card>
    <div className="grid grid-cols-3 gap-3">
      <Card className="text-center">
        <div className="text-3xl font-bold text-blue-400">136</div>
        <div className="text-xs text-slate-400 mt-1">国补政策总量</div>
      </Card>
      <Card className="text-center">
        <div className="text-3xl font-bold text-orange-400">270</div>
        <div className="text-xs text-slate-400 mt-1">AI政策总量</div>
      </Card>
      <Card className="text-center">
        <div className="text-3xl font-bold text-purple-400">2024</div>
        <div className="text-xs text-slate-400 mt-1">密集爆发拐点</div>
      </Card>
    </div>
  </div>
);

// 面板2: 政策工具结构
const ToolPanel = () => {
  const [view, setView] = useState("overview");

  const pieData = toolDistribution.map((d) => ({
    name: d.category,
    value: d[view === "guobu" ? "guobu" : view === "ai" ? "ai" : "guobu"],
  }));

  return (
    <div className="space-y-4">
      <Card
        title="政策工具结构分布"
        subtitle="基于Rothwell-Zegveld分类：供给型（直接提供资源）/ 环境型（营造有利环境）/ 需求型（拉动市场需求）"
      >
        <div className="flex gap-2 mb-4">
          {[
            { key: "guobu", label: "国补政策" },
            { key: "ai", label: "AI政策" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === v.key
                  ? v.key === "guobu" ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                  : "bg-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={toolDistribution.map((d) => ({ name: d.category, value: d[view] }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={45}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {toolDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-white mb-2">
              {view === "guobu" ? "国补" : "AI"}政策工具占比
            </div>
            {toolDistribution.map((d, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-xs text-slate-300">{d.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{d[view]}%</span>
                  <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${d[view]}%`, backgroundColor: PIE_COLORS[i] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="子工具频次对比" subtitle="各子工具在国补与AI政策中的编码频次">
        <div className="space-y-4">
          {[
            { title: "供给型子工具", data: supplySubTools },
            { title: "环境型子工具", data: envSubTools },
            { title: "需求型子工具", data: demandSubTools },
          ].map((group, gi) => (
            <div key={gi}>
              <div className="text-xs font-medium text-slate-400 mb-2">{group.title}</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={group.data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} width={56} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Bar dataKey="guobu" name="国补" fill="#3b82f6" radius={[0, 3, 3, 0]} barSize={8} />
                  <Bar dataKey="ai" name="AI" fill="#f97316" radius={[0, 3, 3, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </Card>

      <Card title="结构性失衡诊断" subtitle="基于skill方法论的结构评估">
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <Badge color="blue">国补</Badge>
            <div className="text-xs text-slate-300">
              <span className="text-blue-300 font-medium">供给型工具过度集中（45%）</span>，以资金投入和消费补贴为主；需求型工具偏弱（20%），政府采购和示范项目使用不足，政策拉动力有限。
            </div>
          </div>
          <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <Badge color="orange">AI</Badge>
            <div className="text-xs text-slate-300">
              <span className="text-orange-300 font-medium">环境型工具占主导（42%）</span>，以法规管制和标准制定为核心，体现"安全优先"导向；供给型工具中隐性算力补贴值得关注——属于非显性政策工具。
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 面板3: PMC指数雷达图
const PMCPanel = () => {
  const guobuScore = (pmcData.reduce((s, d) => s + d.guobu, 0) / pmcData.length * 10).toFixed(1);
  const aiScore = (pmcData.reduce((s, d) => s + d.ai, 0) / pmcData.length * 10).toFixed(1);

  const getRating = (score) => {
    if (score >= 9) return { label: "完美", color: "text-green-400" };
    if (score >= 7) return { label: "优秀", color: "text-blue-400" };
    if (score >= 5) return { label: "可接受", color: "text-yellow-400" };
    return { label: "较差", color: "text-red-400" };
  };

  return (
    <div className="space-y-4">
      <Card
        title="PMC指数模型评价"
        subtitle="9维度多投入产出评价 | 二值评分(0/1) → 一级变量均值 → PMC指数"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={pmcData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: "#64748b", fontSize: 9 }} />
                <Radar name="国补政策" dataKey="guobu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="AI政策" dataKey="ai" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-700/50 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-2">PMC指数评分</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{guobuScore}</div>
                  <div className={`text-xs ${getRating(guobuScore).color}`}>
                    {getRating(guobuScore).label} · 国补
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">{aiScore}</div>
                  <div className={`text-xs ${getRating(aiScore).color}`}>
                    {getRating(aiScore).label} · AI
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {pmcData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 w-16">{d.dimension}</span>
                  <div className="flex-1 flex items-center gap-2 mx-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.guobu * 100}%` }} />
                    </div>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${d.ai * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">
                    {Math.abs(d.guobu - d.ai) > 0.2 ? "!!" : Math.abs(d.guobu - d.ai) > 0.1 ? "!" : "~"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="PMC维度差异诊断" subtitle="差异 >0.2 标记为显著差异（!!），>0.1 为中等差异（!）">
        <div className="grid grid-cols-2 gap-3">
          {pmcData
            .filter((d) => Math.abs(d.guobu - d.ai) > 0.1)
            .sort((a, b) => Math.abs(b.guobu - b.ai) - Math.abs(a.guobu - a.ai))
            .map((d, i) => {
              const diff = d.guobu - d.ai;
              const stronger = diff > 0 ? "国补" : "AI";
              const strongerColor = diff > 0 ? "blue" : "orange";
              return (
                <div key={i} className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white font-medium">{d.dimension}</div>
                    <div className="text-xs text-slate-400">
                      <Badge color={strongerColor}>{stronger}更强</Badge>
                      <span className="ml-2">差值 {Math.abs(diff).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-300">{d.guobu}</div>
                    <div className="text-xs text-orange-300">{d.ai}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

// 面板4: 交叉维度热力图
const HeatmapPanel = () => {
  const { goals, tools, matrix } = crossDimensions;
  const maxVal = Math.max(...matrix.flat());

  const getColor = (val) => {
    const ratio = val / maxVal;
    if (ratio > 0.8) return "#ef4444";
    if (ratio > 0.6) return "#f97316";
    if (ratio > 0.4) return "#f59e0b";
    if (ratio > 0.2) return "#3b82f6";
    return "#1e3a5f";
  };

  return (
    <div className="space-y-4">
      <Card
        title="工具 × 目标 交叉维度热力图"
        subtitle="编码频次越高颜色越暖 | 红色=高频密集区 蓝色=低频稀疏区"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-2 text-left text-slate-400 font-medium border-b border-slate-700">
                  工具 \ 目标
                </th>
                {goals.map((g, i) => (
                  <th key={i} className="p-2 text-center text-slate-400 font-medium border-b border-slate-700 whitespace-nowrap">
                    {g}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, ti) => (
                <tr key={ti}>
                  <td className="p-2 text-slate-300 font-medium border-b border-slate-700/50 whitespace-nowrap">
                    {tool}
                  </td>
                  {matrix[ti].map((val, gi) => (
                    <td key={gi} className="p-1.5 border-b border-slate-700/50 text-center">
                      <div
                        className="w-full h-8 rounded flex items-center justify-center text-white font-medium transition-all hover:scale-110 cursor-default"
                        style={{ backgroundColor: getColor(val), opacity: 0.4 + (val / maxVal) * 0.6 }}
                        title={`${tool} × ${goals[gi]}: ${val}次`}
                      >
                        {val}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-xs text-slate-500">低频</span>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((r, i) => (
            <div
              key={i}
              className="w-8 h-3 rounded-sm"
              style={{ backgroundColor: getColor(r * maxVal), opacity: 0.4 + r * 0.6 }}
            />
          ))}
          <span className="text-xs text-slate-500">高频</span>
        </div>
      </Card>

      <Card title="结构性错配发现" subtitle="交叉维度分析揭示的非显性规律">
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge color="red">高频集中区</Badge>
              <span className="text-sm text-white font-medium">消费补贴 × 扩内需促消费</span>
            </div>
            <div className="text-xs text-slate-400">
              编码频次9次，政策工具高度集中于消费补贴拉动内需，存在工具单一依赖风险。
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge color="orange">隐性政策信号</Badge>
              <span className="text-sm text-white font-medium">法规管制 × 技术自主可控</span>
            </div>
            <div className="text-xs text-slate-400">
              编码频次9次，以出口管制和数据安全法规为工具，隐性地构建技术壁垒，是"以管制促自主"的非显性政策路径。
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge color="blue">稀疏空白区</Badge>
              <span className="text-sm text-white font-medium">政府采购 × 国际合作</span>
            </div>
            <div className="text-xs text-slate-400">
              编码频次仅2次，政府采购作为需求型工具在国际合作维度几乎缺位，暗示政策对国际协同创新的拉动不足。
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 面板5: 扎根理论编码
const GroundedTheoryPanel = () => {
  const [expandedAxial, setExpandedAxial] = useState(null);

  return (
    <div className="space-y-4">
      <Card
        title="扎根理论三级编码：AI隐形政策挖掘"
        subtitle="开放式编码 → 主轴编码 → 选择性编码 | 从政策文本中自下而上建构理论"
      >
        <div className="space-y-4">
          {/* 开放式编码 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <span className="text-sm font-semibold text-white">开放式编码</span>
              <Badge color="blue">逐行分析 → 概念标签 → 初始范畴</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="p-2 text-left text-slate-400 font-medium">政策文本片段</th>
                    <th className="p-2 text-left text-slate-400 font-medium">初始编码</th>
                    <th className="p-2 text-left text-slate-400 font-medium">初始范畴</th>
                  </tr>
                </thead>
                <tbody>
                  {groundedTheoryData.openCoding.map((item, i) => (
                    <tr key={i} className="border-b border-slate-700/30 hover:bg-slate-700/30">
                      <td className="p-2 text-slate-300 italic">"{item.text}"</td>
                      <td className="p-2">
                        <Badge color="blue">{item.code}</Badge>
                      </td>
                      <td className="p-2">
                        <Badge color="purple">{item.category}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 主轴编码 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <span className="text-sm font-semibold text-white">主轴编码</span>
              <Badge color="orange">典范模型：因果条件 → 现象 → 行动策略 → 结果</Badge>
            </div>
            <div className="space-y-2">
              {groundedTheoryData.axialCoding.map((item, i) => (
                <div
                  key={i}
                  className={`bg-slate-700/30 rounded-lg p-3 cursor-pointer transition-all hover:bg-slate-700/50 ${
                    expandedAxial === i ? "ring-1 ring-orange-500/50" : ""
                  }`}
                  onClick={() => setExpandedAxial(expandedAxial === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge color="purple">{item.category}</Badge>
                      <div className="flex gap-1 flex-wrap">
                        {item.subcategories.map((sub, si) => (
                          <span key={si} className="text-xs text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs">{expandedAxial === i ? "收起" : "展开"}</span>
                  </div>
                  {expandedAxial === i && (
                    <div className="mt-3 pt-3 border-t border-slate-600/50">
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded">
                          因果: {item.condition}
                        </span>
                        <span className="text-slate-500">→</span>
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          策略: {item.strategy}
                        </span>
                        <span className="text-slate-500">→</span>
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          结果: {item.result}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 选择性编码 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <span className="text-sm font-semibold text-white">选择性编码</span>
              <Badge color="purple">核心范畴 → 理论饱和</Badge>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="text-xs text-purple-300 mb-1 font-medium">核心范畴</div>
              <div className="text-base text-white font-semibold mb-3">
                {groundedTheoryData.selectiveCoding.core}
              </div>
              <div className="text-xs text-slate-400 mb-1 font-medium">整合故事线</div>
              <div className="text-sm text-slate-300 leading-relaxed">
                {groundedTheoryData.selectiveCoding.storyline}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 理论模型图（文字描述版） */}
      <Card title="理论模型图" subtitle="基于选择性编码建构的AI隐形政策理论框架">
        <div className="flex flex-col items-center space-y-3 py-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-red-300">因果条件</div>
            <div className="text-sm text-white font-medium">中美科技竞争 + AI技术扩散 + 伦理争议</div>
          </div>
          <div className="text-slate-500 text-lg">|</div>
          <div className="flex gap-4 items-start">
            <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-slate-400">脉络</div>
              <div className="text-xs text-white">新型举国体制</div>
              <div className="text-xs text-white">统筹发展与安全</div>
            </div>
            <div className="text-slate-500 text-lg mt-4">→</div>
            <div className="bg-gradient-to-b from-purple-500/30 to-blue-500/30 border-2 border-purple-500/50 rounded-xl px-6 py-3 text-center min-w-48">
              <div className="text-xs text-purple-300 font-medium">核心范畴</div>
              <div className="text-sm text-white font-bold mt-1">"明规暗扶"</div>
              <div className="text-xs text-slate-300 mt-1">双轨治理模式</div>
            </div>
            <div className="text-slate-500 text-lg mt-4">→</div>
            <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-slate-400">中介条件</div>
              <div className="text-xs text-white">政策执行弹性</div>
              <div className="text-xs text-white">地方自主空间</div>
            </div>
          </div>
          <div className="text-slate-500 text-lg">|</div>
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { label: "显性轨道", items: "法规管制 + 标准制定 + 准入管理", color: "blue" },
              { label: "隐性轨道", items: "隐性补贴 + 生态培育 + 人才储备 + 标准引导", color: "orange" },
            ].map((track, i) => (
              <div key={i} className={`bg-${track.color}-500/10 border border-${track.color}-500/30 rounded-lg px-4 py-2 text-center`}>
                <div className={`text-xs font-medium mb-1 ${track.color === "blue" ? "text-blue-300" : "text-orange-300"}`}>
                  {track.label}
                </div>
                <div className="text-xs text-slate-300">{track.items}</div>
              </div>
            ))}
          </div>
          <div className="text-slate-500 text-lg">|</div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-green-300">结果</div>
            <div className="text-sm text-white font-medium">安全底线 + 产业竞争力 + 长期技术主权</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 面板6: 政策主体协同网络
const NetworkPanel = () => {
  const groupColors = {
    1: "#ef4444",
    2: "#3b82f6",
    3: "#10b981",
    4: "#f59e0b",
    5: "#8b5cf6",
    6: "#ec4899",
  };
  const groupNames = {
    1: "最高行政",
    2: "中央部委",
    3: "地方政府",
    4: "行业协会",
    5: "市场主体",
    6: "科研机构",
  };

  return (
    <div className="space-y-4">
      <Card
        title="政策主体协同网络"
        subtitle="基于社会网络分析(SNA) | 节点大小=中心性 连线粗细=联合发文频次"
      >
        <div className="relative bg-slate-900 rounded-xl p-6 overflow-hidden" style={{ minHeight: 420 }}>
          {/* 模拟网络布局 */}
          <svg width="100%" height="400" viewBox="0 0 700 400" className="absolute inset-0">
            {/* 连线 */}
            {networkLinks.map((link, i) => {
              const sourceNode = networkNodes.find((n) => n.id === link.source);
              const targetNode = networkNodes.find((n) => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const positions = {
                "国务院": { x: 350, y: 60 },
                "发改委": { x: 180, y: 140 },
                "工信部": { x: 350, y: 160 },
                "科技部": { x: 520, y: 140 },
                "财政部": { x: 120, y: 240 },
                "商务部": { x: 80, y: 160 },
                "网信办": { x: 480, y: 240 },
                "市场监管总局": { x: 580, y: 240 },
                "地方政府": { x: 160, y: 340 },
                "行业协会": { x: 340, y: 330 },
                "头部企业": { x: 500, y: 340 },
                "科研院所": { x: 620, y: 330 },
              };

              const s = positions[link.source];
              const t = positions[link.target];
              if (!s || !t) return null;

              return (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="#475569"
                  strokeWidth={link.weight * 0.4}
                  opacity={0.3 + link.weight * 0.05}
                />
              );
            })}

            {/* 节点 */}
            {networkNodes.map((node) => {
              const positions = {
                "国务院": { x: 350, y: 60 },
                "发改委": { x: 180, y: 140 },
                "工信部": { x: 350, y: 160 },
                "科技部": { x: 520, y: 140 },
                "财政部": { x: 120, y: 240 },
                "商务部": { x: 80, y: 160 },
                "网信办": { x: 480, y: 240 },
                "市场监管总局": { x: 580, y: 240 },
                "地方政府": { x: 160, y: 340 },
                "行业协会": { x: 340, y: 330 },
                "头部企业": { x: 500, y: 340 },
                "科研院所": { x: 620, y: 330 },
              };
              const pos = positions[node.id];
              if (!pos) return null;
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={node.size * 0.7}
                    fill={groupColors[node.group]}
                    opacity={0.2}
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={node.size * 0.45}
                    fill={groupColors[node.group]}
                    opacity={0.8}
                    stroke={groupColors[node.group]}
                    strokeWidth={1.5}
                    strokeOpacity={0.4}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + node.size * 0.7 + 12}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize={10}
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 图例 */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {Object.entries(groupNames).map(([key, name]) => (
              <div key={key} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: groupColors[key] }} />
                <span className="text-xs text-slate-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="网络分析核心指标" subtitle="度中心性、中介中心性与社区发现">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "国务院", degree: 0.82, betweenness: 0.45, insight: "绝对中心，政策统筹者" },
            { name: "工信部", degree: 0.73, betweenness: 0.38, insight: "AI产业政策核心枢纽" },
            { name: "发改委", degree: 0.64, betweenness: 0.32, insight: "国补政策主要推动者" },
            { name: "科技部", degree: 0.55, betweenness: 0.28, insight: "连接科研与产业桥梁" },
          ].map((node, i) => (
            <div key={i} className="bg-slate-700/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white font-medium">{node.name}</span>
                <Badge color={i === 0 ? "red" : i === 1 ? "blue" : i === 2 ? "green" : "purple"}>
                  {node.insight}
                </Badge>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="text-xs text-slate-500">度中心性</div>
                  <div className="text-sm font-semibold text-blue-400">{node.degree}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">中介中心性</div>
                  <div className="text-sm font-semibold text-orange-400">{node.betweenness}</div>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${node.degree * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="隐性协同发现" subtitle="网络分析揭示的非显性协作模式">
        <div className="space-y-3">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-sm text-purple-300 font-medium mb-1">发现1：隐性"三部委联盟"</div>
            <div className="text-xs text-slate-300">
              工信部-科技部-网信办形成高频三角联合发文模式，在AI治理领域实质上绕过了传统的发改委主导路径，形成了一套独立的技术治理政策链条。
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-sm text-green-300 font-medium mb-1">发现2：地方政府的"桥接"角色</div>
            <div className="text-xs text-slate-300">
              地方政府虽度中心性不高，但中介中心性显著——在中央部委与头部企业之间充当隐性传导通道，尤其在AI产业园优惠政策落地中扮演关键角色。
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── 主面板 ───
export default function PolicyAnalysisDashboard() {
  const tabs = [
    { key: "trend", label: "发文趋势", icon: "📈" },
    { key: "tools", label: "政策工具", icon: "🔧" },
    { key: "pmc", label: "PMC评价", icon: "🎯" },
    { key: "heatmap", label: "交叉热力图", icon: "🔥" },
    { key: "grounded", label: "扎根编码", icon: "🌱" },
    { key: "network", label: "主体网络", icon: "🕸" },
  ];
  const [activeTab, setActiveTab] = useState("trend");

  const renderPanel = () => {
    switch (activeTab) {
      case "trend": return <TrendPanel />;
      case "tools": return <ToolPanel />;
      case "pmc": return <PMCPanel />;
      case "heatmap": return <HeatmapPanel />;
      case "grounded": return <GroundedTheoryPanel />;
      case "network": return <NetworkPanel />;
      default: return <TrendPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            国补 × AI 隐形政策可视化分析面板
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            基于「政策文本质性分析」Skill方法论 — 内容分析 · PMC指数 · 扎根理论 · 社会网络分析 · 交叉维度分析
          </p>
        </div>

        {/* Tab切换 */}
        <div className="flex gap-2 mb-6 flex-wrap bg-slate-800 p-2 rounded-xl">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </TabButton>
          ))}
        </div>

        {/* 方法论标注 */}
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500">当前使用skill方法:</span>
          {activeTab === "trend" && <Badge color="blue">文献计量分析</Badge>}
          {activeTab === "tools" && <><Badge color="blue">内容分析法</Badge><Badge color="orange">Rothwell-Zegveld政策工具框架</Badge></>}
          {activeTab === "pmc" && <Badge color="purple">PMC指数模型（Estrada 2011）</Badge>}
          {activeTab === "heatmap" && <><Badge color="blue">交叉维度分析</Badge><Badge color="red">结构性错配诊断</Badge></>}
          {activeTab === "grounded" && <><Badge color="green">扎根理论三级编码</Badge><Badge color="purple">选择性编码·理论建构</Badge></>}
          {activeTab === "network" && <><Badge color="blue">社会网络分析(SNA)</Badge><Badge color="green">中心性·社区发现</Badge></>}
        </div>

        {/* 面板内容 */}
        {renderPanel()}

        {/* 底部方法论总结 */}
        <div className="mt-8 bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h3 className="text-white text-sm font-semibold mb-3">Skill方法论 → 可视化映射总览</h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { method: "文献计量分析", viz: "发文趋势折线/柱状图 + 阶段标注", tab: "发文趋势" },
              { method: "内容分析+政策工具框架", viz: "饼图+横向条形图+结构诊断", tab: "政策工具" },
              { method: "PMC指数模型", viz: "雷达图+评分对比+维度差异诊断", tab: "PMC评价" },
              { method: "交叉维度分析", viz: "热力图+错配发现", tab: "交叉热力图" },
              { method: "扎根理论(三级编码)", viz: "编码表+典范模型+理论模型图", tab: "扎根编码" },
              { method: "社会网络分析", viz: "力导向网络图+中心性指标+隐性协同发现", tab: "主体网络" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-700/30 rounded-lg p-3">
                <div className="text-blue-300 font-medium mb-1">{item.method}</div>
                <div className="text-slate-400">{item.viz}</div>
                <div className="text-slate-500 mt-1">→ Tab: {item.tab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
