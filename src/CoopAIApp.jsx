import React, { useState } from "react";
import {
  Home,
  Target,
  MessageCircle,
  User,
  Plus,
  Minus,
  ArrowLeftRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  FileText,
  Palmtree,
  Bitcoin,
  Baby,
  ShoppingCart,
  Eye,
  Shield,
  Send,
  Wallet,
  Settings,
  Bell,
  LogOut,
  Lock,
  TrendingUp,
  Flame,
  PartyPopper,
  Building2,
  Briefcase,
  GraduationCap,
  Fuel,
  Users,
  Zap,
  Heart,
  Repeat2,
  MessageSquare,
  X,
  Grid3x3,
  LayoutDashboard,
  LifeBuoy,
  Twitter,
  Instagram,
  ChevronUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Brand mark
// ---------------------------------------------------------------------------
function CoopLogo({ size = 34 }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 220 136" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M62 8C58 30 66 48 88 58C70 54 48 44 40 24C36 16 38 8 46 4C52 1 58 2 62 8Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
      <path d="M158 8C162 30 154 48 132 58C150 54 172 44 180 24C184 16 182 8 174 4C168 1 162 2 158 8Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
      <path d="M46 100C46 78 62 64 82 64C92 64 100 68 106 74" stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="88" cy="98" r="30" stroke="white" strokeWidth="7" fill="black" />
      <circle cx="88" cy="98" r="15" fill="white" />
      <circle cx="140" cy="98" r="30" stroke="white" strokeWidth="7" fill="black" />
      <circle cx="140" cy="98" r="15" fill="white" />
      <path d="M176 68V128M176 70C190 68 200 74 200 86C200 98 190 102 176 100" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const GOALS = [
  { id: "bills", label: "Bills", icon: FileText, target: 5000, current: 2500 },
  { id: "vacation", label: "Summer vacation", icon: Palmtree, target: 10000, current: 5505.15 },
  { id: "crypto", label: "Crypto", icon: Bitcoin, target: 20000, current: 12505.25 },
  { id: "kids", label: "Kids", icon: Baby, target: 20000, current: 12250.0 },
  { id: "groceries", label: "Groceries", icon: ShoppingCart, target: 5000, current: 1500 },
];

const PLANS = [
  { id: "ajo", title: "Group Savings (Ajo)", members: "56,848", avgGoal: "67.5K", totalSaved: "4320.8M", icon: Users, category: "hot", gradient: "from-amber-500/25 to-orange-600/10" },
  { id: "kids", title: "Kids Upkeep", members: "102", avgGoal: "6.5K", totalSaved: "7K", icon: Baby, category: "hot", gradient: "from-pink-500/25 to-rose-600/10" },
  { id: "appliances", title: "Home Appliances", members: "3,295", avgGoal: "142.8K", totalSaved: "306.1M", icon: Zap, category: "appliance", gradient: "from-sky-500/25 to-blue-600/10" },
  { id: "biz", title: "Business Expansion", members: "2,505", avgGoal: "395.9K", totalSaved: "339.5M", icon: Briefcase, category: "biz", gradient: "from-emerald-500/25 to-teal-600/10" },
  { id: "fuel", title: "Fuel Money", members: "864", avgGoal: "262.9K", totalSaved: "166.9M", icon: Fuel, category: "hot", gradient: "from-sky-500/25 to-cyan-600/10" },
  { id: "millionaire", title: "Millionaire Saving Challenge", members: "316,919", avgGoal: "621K", totalSaved: "7153.8M", icon: Sparkles, category: "hot", gradient: "from-red-500/25 to-rose-700/10" },
];

const CATEGORIES = [
  { id: "hot", label: "Hot", icon: Flame },
  { id: "fest", label: "Fest.", icon: PartyPopper },
  { id: "accom", label: "Accomodation", icon: Building2 },
  { id: "appliance", label: "Appliance", icon: Home },
  { id: "biz", label: "Biz.", icon: Briefcase },
  { id: "edu", label: "Edu.", icon: GraduationCap },
];

const INITIAL_POSTS = [
  { id: 1, name: "Ada N.", handle: "@ada_saves", time: "2h", text: "Just hit 70% on my Ajo goal this month! The community keeps me accountable 🔥", likes: 24, comments: 5, reposts: 2 },
  { id: 2, name: "Tunde O.", handle: "@tunde_builds", time: "4h", text: "Joined the Business Expansion coop today. Anyone else here scaling a small shop?", likes: 11, comments: 8, reposts: 1 },
  { id: 3, name: "Chidinma A.", handle: "@chichi", time: "6h", text: "PSA: the AI insight card is scarily accurate. It told me to bump my weekly deposit by $18 and now I'm ahead of schedule.", likes: 42, comments: 3, reposts: 6 },
  { id: 4, name: "Femi B.", handle: "@femi.b", time: "1d", text: "Millionaire Saving Challenge gang, how's everyone tracking this week?", likes: 19, comments: 14, reposts: 2 },
];

const currency = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

function chatSeed(planTitle) {
  return [
    { from: "them", author: "Ada N.", text: `Welcome to the ${planTitle} group 👋` },
    { from: "them", author: "Tunde O.", text: "Deposited my share for the week, we're at 71% now." },
    { from: "me", text: "Nice! I'll add mine tonight." },
    { from: "them", author: "Chidinma A.", text: "Let's keep this momentum going 🔥" },
  ];
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------
function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-white/12 bg-white/[0.02] ${className}`}>{children}</div>;
}

function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center mr-1">
            <ChevronLeft size={16} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <button className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70">
        <Bell size={16} />
      </button>
    </div>
  );
}

function PlanCard({ plan, joined, onToggleJoin, onOpenChat, compact = false }) {
  return (
    <Card className="p-3.5">
      <div className="flex items-start gap-3">
        <div className={`w-16 h-16 rounded-xl shrink-0 bg-gradient-to-br ${plan.gradient} border border-white/10 flex items-center justify-center`}>
          <plan.icon size={22} className="text-white/80" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold leading-snug pr-2">{plan.title}</p>
            <button
              onClick={() => onToggleJoin(plan.id)}
              className={`shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                joined ? "border border-emerald-400/50 text-emerald-400" : "bg-emerald-500 text-black"
              }`}
            >
              {joined ? "Joined" : "Join"}
            </button>
          </div>
          <p className="text-[11px] mt-1.5">
            <span className="text-emerald-400 font-medium">{plan.members}</span>{" "}
            <span className="text-white/40">members joined</span>
          </p>
          {!compact && (
            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className="text-white/40">
                Avg Goal <span className="text-white/80 font-medium">{plan.avgGoal}</span>
              </span>
              <span className="text-white/40">
                Total Saved <span className="text-white/80 font-medium">{plan.totalSaved}</span>
              </span>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onOpenChat(plan)}
        className="mt-3 w-full flex items-center justify-center gap-2 text-xs border border-white/12 rounded-xl py-2 text-white/60"
      >
        <MessageSquare size={13} /> Group chat
      </button>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Home screen
// ---------------------------------------------------------------------------
function HomeScreen({ joined, onToggleJoin, onOpenChat, onOpenMarket }) {
  const [hideBalance, setHideBalance] = useState(false);
  const total = GOALS.reduce((s, g) => s + g.current, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <span>Good evening, Chris</span>
          <span>👋</span>
        </div>
        <button className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
          <User size={16} />
        </button>
      </div>

      <div className="mb-1 flex items-center gap-2">
        <p className="text-4xl font-semibold tracking-tight tabular-nums">{hideBalance ? "••••••" : currency(total)}</p>
      </div>
      <button onClick={() => setHideBalance((v) => !v)} className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
        Total Treasury Value <Eye size={13} />
      </button>

      <div className="flex gap-2 mb-6">
        <span className="flex items-center gap-1.5 text-xs border border-white/15 rounded-full px-3 py-1.5 text-white/80">↗ +$320.40 today</span>
        <span className="flex items-center gap-1.5 text-xs border border-white/15 rounded-full px-3 py-1.5 text-white/80">↗ +12.4% this month</span>
      </div>

      <Card className="mb-6 grid grid-cols-3 divide-x divide-white/10 overflow-hidden">
        {[
          { icon: Plus, label: "Deposit", sub: "Add funds" },
          { icon: Minus, label: "Withdraw", sub: "Withdraw funds" },
          { icon: ArrowLeftRight, label: "Transfer", sub: "Move funds" },
        ].map((a) => (
          <button key={a.label} className="flex flex-col items-center gap-2 py-5 px-2 hover:bg-white/[0.03] transition-colors">
            <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
              <a.icon size={15} />
            </span>
            <span className="text-xs font-medium">{a.label}</span>
            <span className="text-[10px] text-white/35 -mt-1.5">{a.sub}</span>
          </button>
        ))}
      </Card>

      <Card className="mb-6 p-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
          <Sparkles size={16} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-white/40 mb-0.5">AI Insight</p>
          <p className="text-sm font-medium leading-snug">You're 61% toward your yearly goal.</p>
          <p className="text-xs text-white/40 mt-0.5">Recommended: increase weekly contribution by $18.</p>
        </div>
        <ChevronRight size={16} className="text-white/30 shrink-0" />
      </Card>

      {/* cOOps feed (was: My Goals) */}
      <div className="mb-3">
        <h2 className="text-base font-semibold">cOOps feed</h2>
      </div>
      <div className="flex flex-col gap-2.5 mb-8">
        {GOALS.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <Card key={g.id} className="flex items-center gap-3 p-3.5">
              <span className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center shrink-0">
                <g.icon size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{g.label}</p>
                <p className="text-[11px] text-white/35 mb-1.5">Target: {currency(g.target)}</p>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-white/50 mb-1">{pct}%</p>
                <p className="text-sm font-semibold tabular-nums">{currency(g.current)}</p>
              </div>
              <ChevronRight size={14} className="text-white/25 shrink-0" />
            </Card>
          );
        })}
      </div>

      {/* cOOps Public Plans */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">cOOps Public Plans</h2>
        <button onClick={onOpenMarket} className="flex items-center gap-1 text-xs text-white/40">
          Browse all <ChevronRight size={13} />
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {PLANS.slice(0, 3).map((p) => (
          <PlanCard key={p.id} plan={p} joined={joined.has(p.id)} onToggleJoin={onToggleJoin} onOpenChat={onOpenChat} compact />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Goals screen
// ---------------------------------------------------------------------------
function GoalsScreen() {
  return (
    <div>
      <ScreenHeader title="My Goals" subtitle="5 active goals · community-verified" />
      <div className="flex flex-col gap-2.5 mb-6">
        {GOALS.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <Card key={g.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center shrink-0">
                  <g.icon size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{g.label}</p>
                  <p className="text-[11px] text-white/35">
                    {currency(g.current)} of {currency(g.target)}
                  </p>
                </div>
                <p className="text-sm font-semibold">{pct}%</p>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
            </Card>
          );
        })}
      </div>
      <button className="w-full rounded-2xl border border-white/20 py-3.5 text-sm font-medium flex items-center justify-center gap-2">
        <Plus size={15} /> New goal
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Market screen (Popular Targets style browser + Community timeline)
// ---------------------------------------------------------------------------
function MarketScreen({ joined, onToggleJoin, onOpenChat, onClose, posts, onAddPost, likedPosts, onToggleLike }) {
  const [tab, setTab] = useState("plans");
  const [category, setCategory] = useState("hot");
  const [showMine, setShowMine] = useState(false);
  const [draft, setDraft] = useState("");

  const visiblePlans = showMine ? PLANS.filter((p) => joined.has(p.id)) : PLANS.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center">
            <ChevronLeft size={16} />
          </button>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center">
            <X size={15} />
          </button>
          <h1 className="text-lg font-semibold ml-1">Popular Targets</h1>
        </div>
        <button onClick={() => setShowMine((v) => !v)} className={`text-xs ${showMine ? "text-emerald-400" : "text-white/40"}`}>
          My Targets
        </button>
      </div>

      <div className="flex gap-2 mb-4 p-1 rounded-full border border-white/10 w-fit">
        {[
          { id: "plans", label: "Plans" },
          { id: "community", label: "Community" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-colors ${
              tab === t.id ? "bg-white text-black" : "text-white/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "plans" && (
        <>
          {!showMine && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-5 px-5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border ${
                    category === c.id ? "bg-emerald-500 text-black border-emerald-500" : "border-white/15 text-white/60"
                  }`}
                >
                  <c.icon size={13} /> {c.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2.5 mb-6">
            {visiblePlans.length === 0 && <p className="text-sm text-white/40 text-center py-10">No targets joined yet.</p>}
            {visiblePlans.map((p) => (
              <PlanCard key={p.id} plan={p} joined={joined.has(p.id)} onToggleJoin={onToggleJoin} onOpenChat={onOpenChat} />
            ))}
          </div>
        </>
      )}

      {tab === "community" && (
        <div>
          <Card className="p-3.5 mb-4">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="What are you saving for today?"
              rows={2}
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/30 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!draft.trim()) return;
                  onAddPost(draft.trim());
                  setDraft("");
                }}
                className="text-xs font-semibold bg-white text-black px-4 py-1.5 rounded-full"
              >
                Post
              </button>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                    <User size={13} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {post.name} <span className="text-white/35 font-normal">{post.handle}</span>
                    </p>
                  </div>
                  <span className="text-[11px] text-white/30 ml-auto shrink-0">{post.time}</span>
                </div>
                <p className="text-sm text-white/85 leading-snug mb-3">{post.text}</p>
                <div className="flex items-center gap-5 text-white/40">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs ${likedPosts.has(post.id) ? "text-rose-400" : ""}`}
                  >
                    <Heart size={14} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs">
                    <MessageSquare size={14} /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs">
                    <Repeat2 size={14} /> {post.reposts}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "plans" && !showMine && (
        <div className="flex items-center justify-center text-white/25 mb-2">
          <ChevronUp size={16} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat list + Group chat
// ---------------------------------------------------------------------------
function ChatListScreen({ joined, onOpenChat }) {
  const joinedPlans = PLANS.filter((p) => joined.has(p.id));
  return (
    <div>
      <ScreenHeader title="Chat" subtitle={`${joinedPlans.length} group${joinedPlans.length === 1 ? "" : "s"} joined`} />
      {joinedPlans.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-sm text-white/50">Join a cOOps plan to unlock its group chat.</p>
        </Card>
      )}
      <div className="flex flex-col gap-2.5">
        {joinedPlans.map((p) => (
          <button key={p.id} onClick={() => onOpenChat(p)} className="w-full text-left">
            <Card className="p-3.5 flex items-center gap-3">
              <span className={`w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br ${p.gradient} border border-white/10 flex items-center justify-center`}>
                <p.icon size={18} className="text-white/80" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-[11px] text-white/35 truncate">Tap to open group chat</p>
              </div>
              <ChevronRight size={14} className="text-white/25 shrink-0" />
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function GroupChatScreen({ plan, onBack }) {
  const [messages, setMessages] = useState(() => chatSeed(plan.title));
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title={plan.title} subtitle="Group chat" onBack={onBack} />
      <div className="flex flex-col gap-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-white text-black" : "border border-white/15 text-white/90"}`}>
              {m.author && <p className="text-[10px] text-emerald-400 font-medium mb-0.5">{m.author}</p>}
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 border border-white/15 rounded-full pl-4 pr-1.5 py-1.5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message the group..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
        />
        <button onClick={send} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AI Assistant / Dashboard alias / Usersboard / Support
// ---------------------------------------------------------------------------
function AiScreen({ onBack }) {
  const [messages] = useState([
    { from: "ai", text: "Treasury scan complete. No unusual activity in the last 24 hours." },
    { from: "user", text: "How close am I to my crypto goal?" },
    { from: "ai", text: "You're at 94% of your $20,000 crypto goal — about $1,494.75 away." },
  ]);

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title="AI Assistant" subtitle="Monitoring · security · insights" onBack={onBack} />
      <Card className="p-4 mb-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <Shield size={16} />
        </span>
        <div>
          <p className="text-sm font-medium">Treasury status: healthy</p>
          <p className="text-xs text-white/40">Last checked 4 minutes ago</p>
        </div>
      </Card>
      <div className="flex flex-col gap-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-white text-black" : "border border-white/15 text-white/90"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 border border-white/15 rounded-full pl-4 pr-1.5 py-1.5">
        <input placeholder="Ask about your treasury..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30" />
        <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}

function UsersboardScreen({ onBack }) {
  const rows = [
    { label: "Total members", value: "384,433" },
    { label: "Active this week", value: "58,120" },
    { label: "Plans created", value: "6" },
    { label: "Combined treasury", value: "$12.3M" },
  ];
  return (
    <div>
      <ScreenHeader title="Usersboard" subtitle="Cooperative-wide stats" onBack={onBack} />
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {rows.map((r) => (
          <Card key={r.label} className="p-4">
            <p className="text-[11px] text-white/40 mb-1">{r.label}</p>
            <p className="text-lg font-semibold">{r.value}</p>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <p className="text-sm font-medium mb-1">Top contributors this month</p>
        <p className="text-xs text-white/40">Leaderboard coming soon.</p>
      </Card>
    </div>
  );
}

function SupportScreen({ onBack }) {
  const faqs = [
    "How is the treasury secured?",
    "How do withdrawals and fees work?",
    "What does the AI monitor?",
    "How do I start or join a plan?",
  ];
  return (
    <div>
      <ScreenHeader title="Support" subtitle="We're here to help" onBack={onBack} />
      <Card className="divide-y divide-white/10 overflow-hidden mb-4">
        {faqs.map((f) => (
          <button key={f} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
            <span className="text-sm flex-1">{f}</span>
            <ChevronRight size={14} className="text-white/25" />
          </button>
        ))}
      </Card>
      <button className="w-full rounded-2xl border border-white/20 py-3.5 text-sm font-medium">Contact support</button>
    </div>
  );
}

function ProfileScreen({ onBack }) {
  const rows = [
    { icon: Wallet, label: "Linked wallet" },
    { icon: Lock, label: "Security & 2FA" },
    { icon: Settings, label: "Preferences" },
    { icon: LogOut, label: "Sign out" },
  ];
  return (
    <div>
      <ScreenHeader title="Profile" onBack={onBack} />
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-3">
          <User size={24} />
        </div>
        <p className="text-base font-semibold">Chris Adeyemi</p>
        <p className="text-xs text-white/40">Cooperative member since Jan 2026</p>
      </div>
      <Card className="divide-y divide-white/10 overflow-hidden">
        {rows.map((r) => (
          <button key={r.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
            <r.icon size={16} className="text-white/60" />
            <span className="text-sm flex-1">{r.label}</span>
            <ChevronRight size={14} className="text-white/25" />
          </button>
        ))}
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App launcher (opened from center nav button)
// ---------------------------------------------------------------------------
function Launcher({ onClose, onNavigate }) {
  const apps = [
    { id: "ai", label: "AI Assistant", icon: Sparkles },
    { id: "home", label: "Dashboard", icon: LayoutDashboard },
    { id: "usersboard", label: "Usersboard", icon: Users },
    { id: "support", label: "Support", icon: LifeBuoy },
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative rounded-t-3xl border-t border-white/12 bg-black px-5 pt-4 pb-8 max-h-[85%] overflow-y-auto">
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Grid3x3 size={16} /> Apps
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center">
            <X size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {apps.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                onNavigate(a.id);
                onClose();
              }}
              className="flex flex-col items-center gap-2 py-6 rounded-2xl border border-white/12 bg-white/[0.02]"
            >
              <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center">
                <a.icon size={18} />
              </span>
              <span className="text-xs font-medium">{a.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 mb-2">
            <CoopLogo size={26} />
          </div>
          <p className="text-xs text-white/40 leading-relaxed mb-4">
            CoopAI is a community-owned digital cooperative. Members pool contributions into a transparent
            on-chain treasury, secured and monitored by AI. Save Together. Grow Together.
          </p>
          <div className="flex items-center gap-3 mb-4">
            <a className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60"><Twitter size={14} /></a>
            <a className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60"><Instagram size={14} /></a>
            <a className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60"><Send size={14} /></a>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/30">
            <span>Terms &amp; Conditions · Privacy Policy</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App shell
// ---------------------------------------------------------------------------
export default function CoopAIApp() {
  const [screen, setScreen] = useState("home");
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [activeChatPlan, setActiveChatPlan] = useState(null);
  const [joined, setJoined] = useState(new Set(["kids"]));
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleJoin = (id) => {
    setJoined((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleLike = (id) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addPost = (text) => {
    setPosts((prev) => [{ id: Date.now(), name: "Chris A.", handle: "@chris_adeyemi", time: "now", text, likes: 0, comments: 0, reposts: 0 }, ...prev]);
  };

  const openChat = (plan) => {
    setActiveChatPlan(plan);
    setScreen("groupchat");
  };

  const NAV = [
    { id: "home", label: "Home", icon: Home },
    { id: "goals", label: "Goals", icon: Target },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "market", label: "Market", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center">
      <div className="w-full max-w-sm min-h-screen flex flex-col relative font-[system-ui]">
        {screen !== "market" && screen !== "groupchat" && (
          <div className="px-5 pt-6 pb-2">
            <CoopLogo size={64} />
          </div>
        )}

        <div className="flex-1 px-5 pb-28 pt-4 overflow-y-auto">
          {screen === "home" && (
            <HomeScreen joined={joined} onToggleJoin={toggleJoin} onOpenChat={openChat} onOpenMarket={() => setScreen("market")} />
          )}
          {screen === "goals" && <GoalsScreen />}
          {screen === "market" && (
            <MarketScreen
              joined={joined}
              onToggleJoin={toggleJoin}
              onOpenChat={openChat}
              onClose={() => setScreen("home")}
              posts={posts}
              onAddPost={addPost}
              likedPosts={likedPosts}
              onToggleLike={toggleLike}
            />
          )}
          {screen === "chat" && <ChatListScreen joined={joined} onOpenChat={openChat} />}
          {screen === "groupchat" && activeChatPlan && <GroupChatScreen plan={activeChatPlan} onBack={() => setScreen("chat")} />}
          {screen === "ai" && <AiScreen onBack={() => setScreen("home")} />}
          {screen === "usersboard" && <UsersboardScreen onBack={() => setScreen("home")} />}
          {screen === "support" && <SupportScreen onBack={() => setScreen("home")} />}
          {screen === "profile" && <ProfileScreen onBack={() => setScreen("home")} />}
        </div>

        <div className="fixed bottom-0 w-full max-w-sm border-t border-white/10 bg-black/95 backdrop-blur px-4 pt-2 pb-3">
          <div className="flex items-center justify-between relative">
            {NAV.slice(0, 2).map((n) => (
              <NavButton key={n.id} n={n} active={screen === n.id} onClick={() => setScreen(n.id)} />
            ))}

            <button
              onClick={() => setLauncherOpen(true)}
              className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center -mt-6 bg-black"
              style={{ boxShadow: "0 0 18px rgba(255,255,255,0.35)" }}
            >
              <CoopLogo size={30} />
            </button>

            {NAV.slice(2).map((n) => (
              <NavButton key={n.id} n={n} active={screen === n.id} onClick={() => setScreen(n.id)} />
            ))}
          </div>
        </div>

        {launcherOpen && <Launcher onClose={() => setLauncherOpen(false)} onNavigate={setScreen} />}
      </div>
    </div>
  );
}

function NavButton({ n, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 w-14">
      <n.icon size={18} className={active ? "text-white" : "text-white/35"} />
      <span className={`text-[10px] ${active ? "text-white" : "text-white/35"}`}>{n.label}</span>
      {active && <span className="w-1 h-1 rounded-full bg-white mt-0.5" />}
    </button>
  );
}
