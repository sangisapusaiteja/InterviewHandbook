"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DSATopic, DSAModule } from "@/types/dsa";

interface SystemDesignVisualizationSectionProps {
  readonly topic: DSATopic;
  readonly modules: DSAModule[];
}

type FlowProfile = {
  laneColor: string;
  primaryTitle: string;
  primaryFlow: string[];
  branchTitle: string;
  branchLeft: string;
  branchRight: string;
  branchNote: string;
  failureTitle: string;
  failureFlow: string[];
};

function inferModule(topicId: string, modules: DSAModule[]) {
  return modules.find((module) => module.topicIds.includes(topicId));
}

function buildDefaultProfile(topic: DSATopic, moduleTitle: string): FlowProfile {
  if (topic.title.includes(" vs ")) {
    const [left, right] = topic.title.split(" vs ", 2);

    return {
      laneColor: "from-cyan-500/20 via-sky-500/10 to-indigo-500/20",
      primaryTitle: "Decision Flow",
      primaryFlow: ["Requirements", left.trim(), "Decision point", right.trim(), "Production outcome"],
      branchTitle: "Tradeoff Branch",
      branchLeft: left.trim(),
      branchRight: right.trim(),
      branchNote: "Pick the side that matches the real constraint, not the trend.",
      failureTitle: "If Chosen Poorly",
      failureFlow: ["Wrong assumption", "Architecture mismatch", "Production pain", "Costly redesign"],
    };
  }

  if (topic.title.startsWith("Walkthrough:") || topic.title.startsWith("Review:")) {
    return {
      laneColor: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
      primaryTitle: "System Walkthrough",
      primaryFlow: ["Requirements", "Scale estimate", "Core services", "Bottleneck review", "Final tradeoff"],
      branchTitle: "Interview Branch",
      branchLeft: "Go deeper on read path",
      branchRight: "Go deeper on write path",
      branchNote: "Case studies are strongest when you choose one bottleneck and justify it clearly.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Traffic spike", "Weakest component", "Mitigation", "Recovery"],
    };
  }

  const moduleDefaults: Record<string, FlowProfile> = {
    "Core Fundamentals": {
      laneColor: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      primaryTitle: "Concept Flow",
      primaryFlow: ["Requirement", "Constraint", "Architecture choice", "Tradeoff", "Outcome"],
      branchTitle: "What To Prioritize",
      branchLeft: "Keep design simple",
      branchRight: "Add scale guarantees",
      branchNote: "Start with the smallest design that still satisfies the requirement.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Constraint missed", "Wrong architecture", "Performance or correctness issue", "Re-architecture"],
    },
    "Data & Caching": {
      laneColor: "from-violet-500/20 via-indigo-500/10 to-sky-500/20",
      primaryTitle: "Data Flow",
      primaryFlow: ["Write path", "Primary storage", "Replication or cache", "Read path", "Recovery"],
      branchTitle: "Tradeoff Branch",
      branchLeft: "Favor freshness",
      branchRight: "Favor scale and speed",
      branchNote: "Storage systems usually trade freshness, latency, cost, and operational complexity.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Hot key or lag", "User impact", "Fallback strategy", "Stabilized state"],
    },
    Communication: {
      laneColor: "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20",
      primaryTitle: "Communication Flow",
      primaryFlow: ["Producer", "Transport", "Consumer", "Retry policy", "Observed result"],
      branchTitle: "Protocol Branch",
      branchLeft: "Favor immediacy",
      branchRight: "Favor decoupling",
      branchNote: "The protocol should match delivery guarantees, fanout, and latency needs.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Delivery issue", "Retry or queue", "Visibility", "Recovery"],
    },
    "Security & Observability": {
      laneColor: "from-rose-500/20 via-red-500/10 to-orange-500/20",
      primaryTitle: "Control Flow",
      primaryFlow: ["Request entry", "Identity or signal", "Policy enforcement", "Audit trail", "Safe response"],
      branchTitle: "Control Branch",
      branchLeft: "Favor low friction",
      branchRight: "Favor strict protection",
      branchNote: "Security gets weaker when controls are hidden, inconsistent, or too broad.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Bad access or weak signal", "Missed detection", "Operational impact", "Tighten policy"],
    },
    Masterclass: {
      laneColor: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
      primaryTitle: "Case Study Flow",
      primaryFlow: ["Problem framing", "Scale estimate", "System layout", "Critical bottleneck", "Tradeoff summary"],
      branchTitle: "Discussion Branch",
      branchLeft: "Deepen read path",
      branchRight: "Deepen write path",
      branchNote: "Pick the dominant bottleneck and defend the design around it.",
      failureTitle: "Failure Handling Path",
      failureFlow: ["Peak load", "Bottleneck exposed", "Mitigation plan", "Recovered system"],
    },
  };

  return moduleDefaults[moduleTitle] ?? moduleDefaults["Core Fundamentals"];
}

const flowOverrides: Record<string, Partial<FlowProfile>> = {
  "cap-theorem": {
    primaryTitle: "Partition Flow",
    primaryFlow: ["Client write", "Network partition", "Replica choice", "Consistency or availability", "System behavior"],
    branchLeft: "Preserve consistency",
    branchRight: "Preserve availability",
    branchNote: "CAP matters when the network is partitioned, not when the system is healthy.",
    failureFlow: ["Partition ignored", "Split-brain or stale reads", "User-visible inconsistency", "Reconciliation"],
  },
  "strong-vs-eventual-consistency": {
    primaryTitle: "Consistency Flow",
    primaryFlow: ["Client write", "Replica update", "Read request", "Data freshness", "User experience"],
    branchLeft: "Strong consistency",
    branchRight: "Eventual consistency",
    branchNote: "One side favors immediate correctness; the other favors availability and scale.",
    failureFlow: ["Lag or coordination cost", "Read surprise", "Trust issue", "Consistency strategy change"],
  },
  "api-gateways": {
    primaryTitle: "Gateway Flow",
    primaryFlow: ["Client request", "Gateway", "Auth and rate limit", "Service routing", "Response"],
    branchLeft: "Thin gateway",
    branchRight: "Heavy gateway",
    branchNote: "A gateway should centralize cross-cutting concerns without becoming a bottleneck.",
    failureFlow: ["Gateway overload", "Service impact", "Traffic shedding", "Recovered edge"],
  },
  "load-balancers-l4-vs-l7": {
    primaryTitle: "Routing Flow",
    primaryFlow: ["Client request", "Load balancer", "Routing decision", "Healthy backend", "Response"],
    branchLeft: "L4 routing",
    branchRight: "L7 routing",
    branchNote: "L4 is simpler and faster; L7 gives richer application-aware control.",
    failureFlow: ["Bad health check", "Traffic misroute", "Backend saturation", "Failover"],
  },
  "consistent-hashing-algorithms": {
    primaryTitle: "Hash Ring Flow",
    primaryFlow: ["Hash key", "Place on ring", "Select node", "Serve request", "Rebalance after node change"],
    branchLeft: "Even key spread",
    branchRight: "Minimal remapping",
    branchNote: "Good hashing balances load without moving most keys during cluster changes.",
    failureFlow: ["Skewed keys", "Hot node", "Add virtual nodes", "Rebalanced cluster"],
  },
  "caching-fundamentals-redis-memcached": {
    primaryTitle: "Cache Flow",
    primaryFlow: ["Client request", "Cache lookup", "Hit or miss", "Database fallback", "Cache refresh"],
    branchLeft: "Prefer fresh data",
    branchRight: "Prefer low latency",
    branchNote: "Caching is always a balance between speed, freshness, and invalidation complexity.",
    failureFlow: ["Cache miss storm", "Database pressure", "Rate limit or warm cache", "Stabilized traffic"],
  },
  "message-queues-rabbitmq-sqs": {
    primaryTitle: "Queue Flow",
    primaryFlow: ["Producer", "Queue", "Consumer", "Acknowledge", "Retry or DLQ"],
    branchLeft: "Fast delivery",
    branchRight: "Safer durability",
    branchNote: "Queue design depends on delivery guarantees, throughput, and failure handling.",
    failureFlow: ["Consumer failure", "Retry buildup", "DLQ or backoff", "Recovered processing"],
  },
  "kafka-internals-topics-partitions": {
    primaryTitle: "Kafka Flow",
    primaryFlow: ["Producer", "Partition choice", "Append log", "Consumer offset", "Replay or retention"],
    branchLeft: "Favor ordering",
    branchRight: "Favor parallelism",
    branchNote: "More partitions increase throughput but narrow ordering guarantees to each partition.",
    failureFlow: ["Bad partition key", "Hot partition", "Lagging consumer", "Repartition or rebalance"],
  },
  "oauth2-openid-connect": {
    primaryTitle: "Auth Flow",
    primaryFlow: ["Client app", "Identity provider", "Consent", "Token issue", "Resource access"],
    branchLeft: "Simpler flow",
    branchRight: "Stronger identity control",
    branchNote: "The chosen flow should match trust boundaries, client type, and token risk.",
    failureFlow: ["Weak validation", "Token misuse", "Unauthorized access", "Tighter policy"],
  },
  "walkthrough-twitter-x-feed": {
    primaryTitle: "Feed Flow",
    primaryFlow: ["Tweet write", "Storage", "Fanout strategy", "Timeline cache", "Feed read"],
    branchLeft: "Fanout on read",
    branchRight: "Fanout on write",
    branchNote: "The follower graph and celebrity traffic pattern decide which direction scales better.",
    failureFlow: ["Celebrity spike", "Queue or cache pressure", "Partial degradation", "Recovered timeline"],
  },
  "walkthrough-ticketmaster-booking": {
    primaryTitle: "Booking Flow",
    primaryFlow: ["User queue", "Seat selection", "Inventory hold", "Payment", "Confirm or release"],
    branchLeft: "Faster checkout",
    branchRight: "Stricter correctness",
    branchNote: "Scarce inventory systems should bias toward correctness over raw speed.",
    failureFlow: ["Burst demand", "Oversell risk", "Hold or queue enforcement", "Consistent inventory"],
  },
};

function profileForTopic(topic: DSATopic, modules: DSAModule[]): FlowProfile {
  const moduleTitle = inferModule(topic.id, modules)?.title ?? "Core Fundamentals";
  const base = buildDefaultProfile(topic, moduleTitle);
  const override = flowOverrides[topic.slug] ?? {};

  return {
    ...base,
    ...override,
  };
}

function FlowRow({
  nodes,
  colorClass,
}: Readonly<{ nodes: string[]; colorClass: string }>) {
  return (
    <div>
      <div className="flex flex-col gap-3 md:hidden">
        {nodes.map((node, index) => (
          <div key={`${node}-${index + 1}`} className="flex flex-col items-center gap-3">
            <div className={`w-full rounded-xl border bg-gradient-to-br ${colorClass} px-4 py-4`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{node}</p>
            </div>
            {index < nodes.length - 1 ? (
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="hidden items-center gap-3 md:flex">
        {nodes.map((node, index) => (
          <div key={`${node}-${index + 1}`} className="flex min-w-0 flex-1 items-center gap-3">
            <div className={`min-h-[92px] flex-1 rounded-xl border bg-gradient-to-br ${colorClass} px-4 py-4`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{node}</p>
            </div>
            {index < nodes.length - 1 ? (
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SystemDesignVisualizationSection({
  topic,
  modules,
}: Readonly<SystemDesignVisualizationSectionProps>) {
  const profile = useMemo(() => profileForTopic(topic, modules), [topic, modules]);
  const currentModule = inferModule(topic.id, modules);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        <div className={`h-1 w-full bg-gradient-to-r ${profile.laneColor}`} />
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{currentModule?.title ?? "System Design"}</Badge>
            <Badge variant="secondary">{topic.difficulty}</Badge>
          </div>
          <div>
            <CardTitle>{profile.primaryTitle}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Flow chart for <span className="font-medium text-foreground">{topic.title}</span>.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <FlowRow nodes={profile.primaryFlow} colorClass={profile.laneColor} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <CardTitle>{profile.branchTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border bg-muted/20 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Branch A
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {profile.branchLeft}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-full border bg-background px-4 py-2 text-xs font-medium text-foreground">
                Decision
              </div>
            </div>

            <div className="rounded-xl border bg-muted/20 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Branch B
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {profile.branchRight}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
            <p className="text-sm text-muted-foreground">{profile.branchNote}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{profile.failureTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <FlowRow
            nodes={profile.failureFlow}
            colorClass="from-rose-500/10 via-red-500/5 to-orange-500/10"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
