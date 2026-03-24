import type { DSATopic, DSAModule } from "@/types/dsa";

type TopicDef = {
  id: string;
  title: string;
  icon: string;
  difficulty: DSATopic["difficulty"];
  description: string;
  summary: string;
  analogy: string;
  keyPoints: string[];
  code: string;
};

function topic(def: TopicDef): DSATopic {
  return {
    id: def.id,
    title: def.title,
    slug: def.id,
    icon: def.icon,
    difficulty: def.difficulty,
    description: def.description,
    concept: {
      explanation: def.summary,
      realLifeAnalogy: def.analogy,
      keyPoints: def.keyPoints,
      timeComplexity: "Context dependent",
      spaceComplexity: "Context dependent",
    },
    code: {
      language: "javascript",
      defaultCode: def.code,
    },
    interviewQuestions: [
      {
        question: `Explain ${def.title} in a system design interview.`,
        difficulty: "Easy",
        hint: `Start with the definition, why it matters, and one production tradeoff.`,
      },
      {
        question: `When would you choose one side of ${def.title} over the other?`,
        difficulty: "Medium",
        hint: `Anchor the answer in scale, latency, operability, and failure mode tradeoffs.`,
      },
      {
        question: `What can go wrong if ${def.title} is misunderstood in production?`,
        difficulty: "Medium",
        hint: `Talk about bottlenecks, consistency gaps, outages, or cost blow-ups depending on the topic.`,
      },
    ],
  };
}

const coreFundamentals: DSATopic[] = [
  topic({
    id: "what-is-system-design",
    title: "What is System Design?",
    icon: "LayoutDashboard",
    difficulty: "Beginner",
    description: "Define system design and how engineers reason about components, scale, failure, and tradeoffs.",
    summary: "System design is the process of turning product requirements into a technical architecture that can handle load, failures, growth, and operational reality. In interviews and real work, the goal is not to draw many boxes. The goal is to justify why each component exists, what problem it solves, and what tradeoffs it introduces.",
    analogy: "It is like planning a city, not just drawing one building. Roads, utilities, zoning, emergency exits, and population growth all matter.",
    keyPoints: [
      "Start from requirements before choosing technology",
      "Think in components, data flow, bottlenecks, and failure paths",
      "Every design is a tradeoff between cost, complexity, and guarantees",
    ],
    code: `// System Design is about architecture and tradeoffs, not code execution.

const systemDesignChecklist = [
  "clarify requirements",
  "estimate scale",
  "identify core components",
  "define data flow",
  "find bottlenecks",
  "discuss tradeoffs"
];

console.log(systemDesignChecklist.join(" -> "));
`,
  }),
  topic({ id: "functional-vs-non-functional-requirements", title: "Functional vs Non-Functional Requirements", icon: "ListChecks", difficulty: "Beginner", description: "Separate what the system must do from the quality constraints it must satisfy.", summary: "Functional requirements describe system behavior, like posting a tweet or booking a ticket. Non-functional requirements describe quality attributes like latency, availability, durability, throughput, security, and cost. Good design starts by separating these two because the architecture depends more on the constraints than on the features alone.", analogy: "A restaurant needs a menu to know what it serves, but also needs speed, cleanliness, seating capacity, and reliability. Both matter.", keyPoints: ["Functional = features and workflows", "Non-functional = scale, latency, reliability, security, cost", "Architectures are shaped heavily by non-functional constraints"], code: `const functional = ["post message", "follow user", "search content"];
const nonFunctional = ["p99 latency < 200ms", "99.9% availability", "multi-region failover"];
console.log({ functional, nonFunctional });
` }),
  topic({ id: "latency-vs-throughput", title: "Latency vs Throughput", icon: "Timer", difficulty: "Beginner", description: "Understand response time versus total amount of work processed per unit time.", summary: "Latency measures how long one request takes. Throughput measures how many requests a system can process per second or minute. Optimizing one does not automatically optimize the other. Queueing, batching, caching, and parallelism often improve throughput, but they may hurt tail latency if applied poorly.", analogy: "One customer waiting at checkout cares about how fast their bill is processed. The store owner cares about how many customers the store can handle in an hour.", keyPoints: ["Latency = time per request", "Throughput = requests processed over time", "Designs must care about tail latency, not only averages"], code: `const metrics = {
  latencyMs: 120,
  throughputRps: 1800,
};
console.log(metrics);
` }),
  topic({ id: "availability-vs-reliability", title: "Availability vs Reliability", icon: "ShieldCheck", difficulty: "Beginner", description: "Compare whether a system is up right now versus whether it behaves correctly over time.", summary: "Availability answers whether the system is currently serving requests. Reliability answers whether the system consistently produces correct results over time. A service can be highly available but unreliable if it returns stale or incorrect data. A reliable service may still be temporarily unavailable during failures or maintenance.", analogy: "A shop that opens every day but delivers wrong orders is available but unreliable. A shop that is usually correct but occasionally closed is reliable but not always available.", keyPoints: ["Availability is uptime-oriented", "Reliability is correctness-oriented", "Production systems need both service continuity and correct behavior"], code: `const service = {
  availability: "99.95%",
  reliability: "correct billing, no data loss"
};
console.log(service);
` }),
  topic({ id: "scalability-vertical-vs-horizontal", title: "Scalability (Vertical vs Horizontal)", icon: "Scaling", difficulty: "Beginner", description: "Learn scale-up versus scale-out strategies and when each makes sense.", summary: "Vertical scaling means making one machine stronger with more CPU, memory, or disk. Horizontal scaling means adding more machines and distributing load across them. Vertical scaling is simpler at first but has hard limits. Horizontal scaling supports larger growth and fault isolation, but it requires coordination, partitioning, and load balancing.", analogy: "You can either buy one bigger truck or add more trucks to your fleet. Bigger is simpler; more trucks scale better but require routing.", keyPoints: ["Vertical scaling is simple but capped", "Horizontal scaling improves growth and resilience", "Horizontal systems need coordination and balancing"], code: `const scalingChoices = ["vertical: bigger machine", "horizontal: more machines"];
console.log(scalingChoices);
` }),
  topic({ id: "cap-theorem", title: "CAP Theorem", icon: "TriangleAlert", difficulty: "Intermediate", description: "Reason about tradeoffs between consistency, availability, and partition tolerance.", summary: "CAP theorem states that when a network partition happens, a distributed system must choose between strong consistency and availability. Partition tolerance is usually non-negotiable in real distributed systems, so the practical decision is how the system behaves during partitions: reject requests to preserve consistency, or serve requests and allow temporary divergence.", analogy: "If two store branches lose contact with headquarters, they can either stop sales until records are synced or keep selling and reconcile later.", keyPoints: ["CAP matters during partitions, not normal operation", "Most real systems choose between consistency and availability under partition", "Partition tolerance is assumed in distributed systems"], code: `const capUnderPartition = {
  choose: ["consistency", "availability"],
  partitionTolerance: true,
};
console.log(capUnderPartition);
` }),
  topic({ id: "strong-vs-eventual-consistency", title: "Strong vs Eventual Consistency", icon: "GitCompare", difficulty: "Intermediate", description: "Compare immediate read correctness versus convergence over time.", summary: "Strong consistency means reads immediately reflect the latest successful write. Eventual consistency means replicas may temporarily diverge but will converge if no new writes occur. Strong consistency improves correctness guarantees but often increases latency and coordination cost. Eventual consistency improves availability and global scale but requires product teams to tolerate stale reads and reconciliation.", analogy: "A classroom attendance sheet can either be updated centrally before anyone sees it, or each teacher can keep a local copy and sync later.", keyPoints: ["Strong consistency gives immediate correctness", "Eventual consistency allows temporary staleness", "Consistency choice affects UX, latency, and conflict handling"], code: `const consistency = {
  strong: "read latest write",
  eventual: "replicas converge over time",
};
console.log(consistency);
` }),
  topic({ id: "monolith-vs-microservices-architecture", title: "Monolith vs Microservices Architecture", icon: "Blocks", difficulty: "Intermediate", description: "Understand the organizational and operational tradeoffs between one deployable unit and many services.", summary: "A monolith packages most business logic into one deployable application. Microservices split responsibilities into independently deployable services. Monoliths reduce operational complexity early on. Microservices enable independent scaling and ownership at larger scale, but they introduce network calls, distributed debugging, and deployment coordination.", analogy: "A monolith is one large department in one office. Microservices are many smaller specialized teams spread across multiple offices with formal communication channels.", keyPoints: ["Monoliths optimize simplicity early", "Microservices optimize autonomy and scaling later", "Distributed systems increase debugging and operational overhead"], code: `const architectureChoices = ["monolith", "microservices"];
console.log(architectureChoices);
` }),
  topic({ id: "slo-sla-sli-metrics", title: "SLO / SLA / SLI Metrics", icon: "BarChart3", difficulty: "Beginner", description: "Learn how service quality is measured and promised.", summary: "An SLI is a measured indicator such as request success rate or p99 latency. An SLO is the target for that indicator, like 99.9% success over 30 days. An SLA is the contractual commitment tied to penalties or credits. Teams use SLIs and SLOs to drive engineering decisions long before SLAs become legal promises.", analogy: "The speedometer is the measurement, the speed limit is the target, and the traffic ticket is the contractual consequence.", keyPoints: ["SLI = measurement", "SLO = internal target", "SLA = external promise with consequences"], code: `const observability = {
  sli: "p99 latency",
  slo: "p99 < 200ms",
  sla: "99.9% monthly uptime"
};
console.log(observability);
` }),
  topic({ id: "api-gateways", title: "API Gateways", icon: "Workflow", difficulty: "Intermediate", description: "Use a gateway to centralize routing, auth, rate limiting, and protocol concerns.", summary: "An API gateway sits in front of backend services and handles cross-cutting concerns such as authentication, request routing, throttling, request shaping, and observability. It simplifies clients by providing one entry point, but it can also become a bottleneck or control-plane dependency if overloaded.", analogy: "It is like the front desk in a large office building that decides where visitors go and checks access before they enter.", keyPoints: ["Single ingress point for multiple services", "Central place for auth, throttling, and routing", "Must avoid becoming a choke point"], code: `const gatewayResponsibilities = ["routing", "auth", "rate limiting", "observability"];
console.log(gatewayResponsibilities);
` }),
  topic({ id: "load-balancers-l4-vs-l7", title: "Load Balancers (L4 vs L7)", icon: "ArrowRightLeft", difficulty: "Intermediate", description: "Compare transport-level balancing with application-aware balancing.", summary: "Layer 4 load balancers route based on IPs and ports. Layer 7 load balancers understand HTTP details like paths, headers, cookies, and methods. L4 is generally simpler and faster. L7 supports richer routing, sticky sessions, and application-level policies.", analogy: "L4 is a traffic cop directing cars by lane. L7 is a receptionist reading the appointment details before sending visitors to different rooms.", keyPoints: ["L4 routes by network metadata", "L7 routes by application metadata", "L7 offers richer control but more overhead"], code: `const loadBalancers = {
  l4: "fast transport routing",
  l7: "http-aware routing"
};
console.log(loadBalancers);
` }),
  topic({ id: "dns-domain-management", title: "DNS & Domain Management", icon: "Globe", difficulty: "Beginner", description: "Understand how names resolve to services and how DNS impacts failover and routing.", summary: "DNS translates human-friendly domain names into IP addresses or service endpoints. System designers care about TTLs, record types, health checks, failover behavior, geo-routing, and how DNS caching affects rollout speed. DNS is foundational for global routing and traffic steering.", analogy: "DNS is the internet's phone book, but with caches and regional copies that take time to update.", keyPoints: ["DNS maps names to endpoints", "TTL controls cache freshness and failover speed", "DNS affects global routing and rollout behavior"], code: `const dnsRecords = ["A", "AAAA", "CNAME", "MX", "TXT"];
console.log(dnsRecords);
` }),
  topic({ id: "consistent-hashing-algorithms", title: "Consistent Hashing Algorithms", icon: "Hash", difficulty: "Intermediate", description: "Place keys across changing clusters while minimizing remapping.", summary: "Consistent hashing distributes keys across nodes so that adding or removing a node only remaps a limited subset of keys. It is common in caches, distributed key-value stores, and sharded systems. Virtual nodes help improve balance when node capacity differs or the cluster is small.", analogy: "Think of placing books on a circular shelf. If one shelf section is removed, only the nearby books move instead of the whole library being reorganized.", keyPoints: ["Minimizes remapping during cluster changes", "Used in caching and sharded systems", "Virtual nodes improve balance"], code: `const hashingNotes = ["ring", "node placement", "virtual nodes", "minimal remapping"];
console.log(hashingNotes);
` }),
  topic({ id: "reverse-proxies-sidecars", title: "Reverse Proxies & Sidecars", icon: "GitBranch", difficulty: "Intermediate", description: "Learn edge proxies and sidecar patterns for traffic control, security, and observability.", summary: "A reverse proxy sits in front of services and handles ingress concerns like TLS termination, caching, compression, and routing. A sidecar is a co-located helper process or container that gives a service capabilities like retries, mTLS, metrics, or service discovery without changing application code. Both patterns externalize operational concerns from business logic.", analogy: "A reverse proxy is the building entrance. A sidecar is a personal assistant assigned to one office inside the building.", keyPoints: ["Reverse proxies manage inbound traffic", "Sidecars add shared runtime behavior per service", "Both separate infra concerns from app logic"], code: `const trafficHelpers = {
  reverseProxy: ["tls", "routing", "compression"],
  sidecar: ["retries", "mTLS", "metrics"]
};
console.log(trafficHelpers);
` }),
];

const dataCaching: DSATopic[] = [
  topic({ id: "relational-vs-nosql-decision-matrix", title: "Relational vs NoSQL Decision Matrix", icon: "Database", difficulty: "Intermediate", description: "Choose the right storage model based on access patterns, scale, and guarantees.", summary: "Relational databases excel when transactions, joins, and strict schemas matter. NoSQL systems excel when scale, flexible schemas, or specialized access patterns dominate. The right choice depends on consistency needs, query shapes, write volume, and operational complexity, not on trends.", analogy: "A spreadsheet with strict columns works well for accounting. A flexible warehouse with bins works better for irregular inventory.", keyPoints: ["Choose based on workload and guarantees", "Relational favors transactions and structured queries", "NoSQL favors scale or specialized patterns"], code: `const storageDecision = {
  relational: ["transactions", "joins", "schema"],
  nosql: ["scale", "flexibility", "specialized access"]
};
console.log(storageDecision);
` }),
  topic({ id: "database-sharding-partitioning", title: "Database Sharding & Partitioning", icon: "SplitSquareHorizontal", difficulty: "Intermediate", description: "Distribute or divide data to reduce bottlenecks and improve scale.", summary: "Partitioning divides data within one database system, often by range or hash. Sharding distributes data across multiple database instances. Both aim to reduce data size per node and improve performance, but they add routing logic, hotspot risk, and operational complexity.", analogy: "Partitioning is organizing one warehouse into sections. Sharding is opening multiple warehouses and routing shipments between them.", keyPoints: ["Partitioning often stays within one DB system", "Sharding spreads data across multiple DB nodes", "Bad shard keys create hotspots"], code: `const dataDistribution = ["range partitioning", "hash partitioning", "sharding by tenant"];
console.log(dataDistribution);
` }),
  topic({ id: "replication-leader-follower", title: "Replication (Leader/Follower)", icon: "CopyPlus", difficulty: "Intermediate", description: "Replicate data for read scale and failover while managing lag and promotion logic.", summary: "Leader/follower replication sends writes to a leader and copies data to followers. It improves read scalability and failover options, but followers can lag, which affects read freshness. Designers must decide which reads can tolerate staleness and how failover promotion happens.", analogy: "One official notebook is updated first, then assistants copy it. The copies help more people read, but they may trail the original briefly.", keyPoints: ["Writes usually go to leader", "Followers improve read scale", "Replication lag affects freshness and failover"], code: `const replication = {
  leader: "writes",
  followers: "reads",
  risk: "replication lag"
};
console.log(replication);
` }),
  topic({ id: "distributed-dbs-cassandra-dynamo", title: "Distributed DBs (Cassandra/Dynamo)", icon: "DatabaseZap", difficulty: "Advanced", description: "Study peer-to-peer distributed database patterns optimized for scale and availability.", summary: "Distributed databases like Cassandra and Dynamo-inspired systems are designed for horizontal scale, partition tolerance, and high availability. They rely on partitioning, replication, quorum reads/writes, and eventual consistency tradeoffs rather than classic single-leader relational semantics.", analogy: "Instead of one bank vault with copies, imagine many vaults across cities that coordinate with quorum rules.", keyPoints: ["Designed for horizontal scale and partition tolerance", "Often use quorum and eventual consistency", "Trade stronger guarantees for availability and scale"], code: `const distributedDbPrinciples = ["partitioning", "replication", "quorum", "eventual consistency"];
console.log(distributedDbPrinciples);
` }),
  topic({ id: "caching-fundamentals-redis-memcached", title: "Caching Fundamentals (Redis/Memcached)", icon: "HardDrive", difficulty: "Beginner", description: "Use caches to reduce latency and protect backing systems.", summary: "Caching stores expensive or frequently accessed data closer to the caller so requests avoid repeated database or computation cost. System designers care about hit rate, eviction policy, write patterns, cache placement, and the blast radius when cache behavior changes.", analogy: "It is like keeping the most-used tools on your desk instead of walking to the storage room every time.", keyPoints: ["Caches reduce latency and backend load", "Hit rate is a primary effectiveness metric", "Cache design includes placement, TTL, and invalidation"], code: `const cacheUses = ["read cache", "session store", "rate limiting", "leaderboards"];
console.log(cacheUses);
` }),
  topic({ id: "cache-eviction-invalidation", title: "Cache Eviction & Invalidation", icon: "Trash2", difficulty: "Intermediate", description: "Manage what leaves the cache and how stale entries are refreshed or removed.", summary: "Eviction determines which entries leave when memory is constrained. Invalidation determines when entries become stale and must be updated or removed. Many cache bugs come from invalidation mistakes rather than from the cache engine itself.", analogy: "A fridge needs a rule for what gets thrown out when full and a rule for what must be discarded after it expires.", keyPoints: ["Eviction and invalidation solve different problems", "TTL is simple but may allow stale reads", "Write-through and write-behind change freshness tradeoffs"], code: `const cachePolicies = ["LRU", "LFU", "TTL", "write-through", "cache-aside"];
console.log(cachePolicies);
` }),
  topic({ id: "cdn-architectures", title: "CDN Architectures", icon: "Globe", difficulty: "Intermediate", description: "Serve content closer to users through distributed edge networks.", summary: "A CDN caches static or semi-static content at edge locations near users. This reduces latency, offloads origins, and improves resilience during traffic spikes. Designers care about cache keys, invalidation, origin shielding, signed URLs, and geo distribution.", analogy: "Instead of one central warehouse shipping globally, you keep local depots near each city.", keyPoints: ["Edges reduce latency and origin load", "Cache key design matters", "Origin protection is a major CDN benefit"], code: `const cdn = {
  edge: "serve near users",
  origin: "source of truth",
  benefits: ["latency", "offload", "resilience"]
};
console.log(cdn);
` }),
  topic({ id: "global-data-replication", title: "Global Data Replication", icon: "Share2", difficulty: "Advanced", description: "Replicate data across regions while balancing locality, consistency, and failover.", summary: "Global replication places data closer to users and improves disaster recovery, but it introduces replication lag, conflict resolution challenges, and higher coordination cost. The right design depends on read locality, write locality, and consistency requirements.", analogy: "Keeping copies of the same legal record in many countries helps local access, but updates must be coordinated carefully.", keyPoints: ["Improves locality and regional resilience", "Increases coordination and conflict complexity", "Consistency model must match product needs"], code: `const globalReplication = ["multi-region reads", "regional failover", "conflict resolution"];
console.log(globalReplication);
` }),
  topic({ id: "block-file-and-object-storage-s3", title: "Block, File, and Object (S3) Storage", icon: "FolderPlus", difficulty: "Beginner", description: "Choose storage abstractions based on access semantics and system needs.", summary: "Block storage exposes raw volumes, file storage exposes hierarchical file systems, and object storage exposes immutable blobs plus metadata through APIs. Object stores like S3 are ideal for large-scale durable assets, while block and file storage fit different performance or compatibility requirements.", analogy: "Block storage is raw bricks, file storage is a cabinet of folders, and object storage is a warehouse of sealed packages with labels.", keyPoints: ["Block = raw volume semantics", "File = shared hierarchical namespace", "Object = API-driven blob storage with metadata"], code: `const storageTypes = ["block", "file", "object"];
console.log(storageTypes);
` }),
  topic({ id: "data-warehouses-snowflake-bigquery", title: "Data Warehouses (Snowflake/BigQuery)", icon: "Table", difficulty: "Intermediate", description: "Learn analytical storage systems optimized for large-scale queries.", summary: "Data warehouses are optimized for analytical workloads rather than high-frequency transactional writes. They separate compute from storage, support large scans and aggregations, and are common for BI, reporting, and product analytics. The schema and ingestion patterns differ from OLTP systems.", analogy: "An OLTP database is a cashier counter. A warehouse is the back-office analytics room where you study months of transactions.", keyPoints: ["Optimized for analytics, not OLTP", "Great for scans, aggregates, and BI", "Often separate compute and storage"], code: `const warehouseUseCases = ["BI dashboards", "ad hoc analytics", "batch reporting"];
console.log(warehouseUseCases);
` }),
  topic({ id: "large-file-upload-strategies", title: "Large File Upload Strategies", icon: "Upload", difficulty: "Intermediate", description: "Design resumable, reliable, and scalable upload paths for large files.", summary: "Large uploads should avoid holding big request bodies through the app tier. Common patterns include multipart upload, direct-to-object-store upload with signed URLs, resumable chunking, integrity checks, and asynchronous post-processing. These reduce server pressure and improve reliability on unstable networks.", analogy: "Instead of mailing one huge package through your office desk, send it directly to the warehouse in numbered boxes.", keyPoints: ["Prefer direct or multipart uploads", "Resumability matters on poor networks", "Post-processing should be asynchronous"], code: `const uploadPatterns = ["multipart", "signed URL", "resumable chunks", "async processing"];
console.log(uploadPatterns);
` }),
  topic({ id: "media-cdns-video-streaming", title: "Media CDNs & Video Streaming", icon: "Video", difficulty: "Advanced", description: "Understand segment delivery, adaptive bitrate, and media distribution at scale.", summary: "Video delivery systems break media into chunks, distribute them through CDNs, and use adaptive bitrate playback so clients can switch quality levels based on network conditions. Designers must consider storage footprint, encoding pipelines, buffering behavior, startup latency, and geo distribution.", analogy: "A movie is delivered like many small clips instead of one giant reel so playback can adjust to the road conditions.", keyPoints: ["Adaptive bitrate improves playback resilience", "Segmented media works well with CDNs", "Encoding pipeline and storage costs matter"], code: `const streamingPipeline = ["ingest", "transcode", "segment", "cdn delivery", "adaptive playback"];
console.log(streamingPipeline);
` }),
];

const communication: DSATopic[] = [
  topic({ id: "message-queues-rabbitmq-sqs", title: "Message Queues (RabbitMQ/SQS)", icon: "MessageSquare", difficulty: "Beginner", description: "Decouple producers and consumers with asynchronous messaging.", summary: "Message queues buffer work between producers and consumers so spikes, retries, and background processing can be handled asynchronously. They improve decoupling, smoothing, and reliability, but they add delivery semantics, ordering questions, and poison-message handling concerns.", analogy: "A queue is like placing work orders in an inbox rather than interrupting a worker directly every time.", keyPoints: ["Queues decouple systems", "Useful for async work and buffering spikes", "Need retry and poison message handling"], code: `const queueBenefits = ["decoupling", "buffering", "retry", "async processing"];
console.log(queueBenefits);
` }),
  topic({ id: "kafka-internals-topics-partitions", title: "Kafka Internals (Topics/Partitions)", icon: "ListTree", difficulty: "Advanced", description: "Understand partitioned logs, offsets, ordering, and throughput in Kafka-style systems.", summary: "Kafka stores events as append-only logs split into partitions. Ordering is guaranteed within a partition, not across all partitions. Consumers track offsets, and throughput scales via partition parallelism. Designers must reason about retention, replay, keys, and consumer group behavior.", analogy: "It is like many numbered conveyor belts where each belt preserves local order, but the whole warehouse is processed in parallel.", keyPoints: ["Ordering is partition-local", "Offsets track consumer progress", "Partition count shapes throughput and parallelism"], code: `const kafkaCore = ["topic", "partition", "offset", "consumer group"];
console.log(kafkaCore);
` }),
  topic({ id: "event-driven-design-patterns", title: "Event-Driven Design Patterns", icon: "Workflow", difficulty: "Intermediate", description: "Use events to coordinate loosely coupled systems and workflows.", summary: "Event-driven systems emit facts about what happened and let downstream consumers react independently. Common patterns include pub/sub, event notification, event-carried state transfer, and choreographed workflows. They help autonomy and extensibility but require idempotency and observability.", analogy: "Instead of calling every department directly, a company publishes announcements and each team acts when relevant.", keyPoints: ["Events promote loose coupling", "Consumers must be idempotent", "Observability is critical in asynchronous flows"], code: `const eventPatterns = ["pub/sub", "event notification", "choreography"];
console.log(eventPatterns);
` }),
  topic({ id: "dead-letter-queues-retries", title: "Dead Letter Queues & Retries", icon: "Undo2", difficulty: "Intermediate", description: "Handle transient failures and isolate messages that cannot be processed safely.", summary: "Retries help recover from transient failures, but blind retries can amplify outages. Dead letter queues isolate messages that repeatedly fail so they do not block the main flow forever. Good systems use backoff, retry budgets, and inspection tooling.", analogy: "If one package keeps failing delivery, move it to a special shelf instead of sending the whole truck back forever.", keyPoints: ["Use backoff, not instant infinite retries", "DLQs isolate poison messages", "Retry policy affects outage behavior"], code: `const failureHandling = ["exponential backoff", "retry budget", "dead letter queue"];
console.log(failureHandling);
` }),
  topic({ id: "grpc-vs-rest-vs-graphql", title: "gRPC vs REST vs GraphQL", icon: "GitCompare", difficulty: "Intermediate", description: "Choose the right API style for internal services or public platforms.", summary: "REST is resource-oriented and widely interoperable. GraphQL gives clients flexible field-level querying. gRPC is efficient for service-to-service communication with strong contracts and streaming support. The right choice depends on client type, performance requirements, schema governance, and tooling.", analogy: "REST is ordering from a fixed menu, GraphQL is customizing the plate, and gRPC is a high-speed service elevator inside the building.", keyPoints: ["REST is simple and broad", "GraphQL is flexible for clients", "gRPC is efficient for internal typed RPC"], code: `const apiStyles = ["REST", "GraphQL", "gRPC"];
console.log(apiStyles);
` }),
  topic({ id: "real-time-websockets-sse", title: "Real-time (WebSockets/SSE)", icon: "Waves", difficulty: "Intermediate", description: "Support live updates with long-lived client connections.", summary: "WebSockets provide bidirectional persistent connections. Server-Sent Events provide simpler one-way server-to-client streaming over HTTP. Designers choose based on interaction patterns, infrastructure support, fanout scale, and connection lifecycle concerns.", analogy: "WebSockets are a phone call. SSE is a radio broadcast.", keyPoints: ["WebSockets support two-way messaging", "SSE is simpler for one-way updates", "Connection scale and fanout are core design challenges"], code: `const realtimeProtocols = {
  websocket: "bi-directional",
  sse: "server to client"
};
console.log(realtimeProtocols);
` }),
  topic({ id: "push-notification-engines", title: "Push Notification Engines", icon: "Bell", difficulty: "Intermediate", description: "Deliver notifications reliably through mobile and web push ecosystems.", summary: "Push systems manage device tokens, provider integrations, fanout, retries, user preferences, and delivery analytics. Good notification design also handles deduplication, prioritization, rate limits, and fallback paths.", analogy: "It is a postal routing network that must respect addresses, urgency, quiet hours, and delivery channels.", keyPoints: ["Token management is fundamental", "Fanout and preferences complicate delivery", "Retries and deduplication matter"], code: `const pushPipeline = ["token registry", "fanout", "provider send", "delivery tracking"];
console.log(pushPipeline);
` }),
  topic({ id: "http3-quic", title: "HTTP/3 & QUIC", icon: "Route", difficulty: "Advanced", description: "Understand modern transport improvements for latency, multiplexing, and connection setup.", summary: "HTTP/3 runs over QUIC instead of TCP, reducing handshake overhead and avoiding some head-of-line blocking behavior found in older stacks. It improves latency and resilience on unstable networks, especially mobile ones, but requires ecosystem support and operational maturity.", analogy: "It is like redesigning the highway itself, not just improving the cars that drive on it.", keyPoints: ["HTTP/3 uses QUIC over UDP", "Improves connection setup and multiplexing behavior", "Useful especially on lossy or mobile networks"], code: `const transportStack = ["HTTP/1.1", "HTTP/2", "HTTP/3 over QUIC"];
console.log(transportStack);
` }),
];

const securityObservability: DSATopic[] = [
  topic({ id: "authentication-vs-authorization", title: "Authentication vs Authorization", icon: "UserCheck", difficulty: "Beginner", description: "Separate identity verification from permission checks.", summary: "Authentication answers who the caller is. Authorization answers what that caller may do. The distinction matters because systems often authenticate correctly but authorize too broadly or inconsistently, which becomes a security vulnerability.", analogy: "Authentication is checking a badge at the door. Authorization is deciding which rooms that badge opens.", keyPoints: ["AuthN = identity", "AuthZ = permissions", "Confusing the two leads to security bugs"], code: `const auth = {
  authentication: "who are you?",
  authorization: "what can you do?"
};
console.log(auth);
` }),
  topic({ id: "oauth2-openid-connect", title: "OAuth2 & OpenID Connect", icon: "KeyRound", difficulty: "Intermediate", description: "Learn delegated access and identity layers used in modern web systems.", summary: "OAuth2 is a delegation framework for granting one application limited access to another application's resources. OpenID Connect adds an identity layer on top so clients can also know who the user is. Designers must understand flows, token types, scopes, and trust boundaries.", analogy: "OAuth is giving a valet a temporary key with limited access. OpenID Connect also tells the valet exactly whose car it is.", keyPoints: ["OAuth2 is for delegated access", "OIDC adds identity information", "Scopes and token lifetimes shape risk"], code: `const identityProtocols = ["OAuth2", "OpenID Connect"];
console.log(identityProtocols);
` }),
  topic({ id: "jwt-anatomy-security", title: "JWT Anatomy & Security", icon: "Fingerprint", difficulty: "Intermediate", description: "Understand JWT structure, signing, expiration, and misuse risks.", summary: "A JWT contains a header, payload, and signature. It is useful for stateless claims exchange, but it is not magic. Teams must think about expiration, revocation, audience checks, key rotation, and the danger of putting sensitive data into easily decodable payloads.", analogy: "A signed paper pass is useful, but only if the signature, expiry time, and intended venue are all checked correctly.", keyPoints: ["JWTs are signed tokens, not encrypted by default", "Validate issuer, audience, and expiry", "Plan revocation and key rotation"], code: `const jwtParts = ["header", "payload", "signature"];
console.log(jwtParts);
` }),
  topic({ id: "api-key-management", title: "API Key Management", icon: "KeyRound", difficulty: "Beginner", description: "Issue, rotate, scope, and protect API keys used by clients and integrations.", summary: "API keys identify and rate-limit clients, but they are shared secrets and must be managed carefully. Good systems support rotation, scoping, revocation, metadata, and usage visibility. Keys should never be treated as sufficient authorization on their own for sensitive actions.", analogy: "An API key is a building pass for a company account, not a full personal identity card.", keyPoints: ["Keys should be rotatable and revocable", "Scope and rate limit keys", "Treat leaked keys as an operational reality"], code: `const apiKeyChecklist = ["issue", "scope", "rotate", "revoke", "audit"];
console.log(apiKeyChecklist);
` }),
  topic({ id: "secrets-management-vault", title: "Secrets Management (Vault)", icon: "Lock", difficulty: "Intermediate", description: "Store and distribute sensitive credentials safely across systems.", summary: "Secrets management systems store credentials, certificates, and tokens securely, with access controls, audit logging, and rotation workflows. Hardcoding secrets or keeping them in plain environment files at scale creates serious operational and security risk.", analogy: "It is the secure key room for the company, with logs for who checked out which key and when.", keyPoints: ["Centralize secret storage and access control", "Rotate secrets regularly", "Audit access and avoid hardcoding"], code: `const secretsLifecycle = ["store", "lease", "rotate", "revoke", "audit"];
console.log(secretsLifecycle);
` }),
  topic({ id: "ddos-waf-strategies", title: "DDoS & WAF Strategies", icon: "ShieldAlert", difficulty: "Intermediate", description: "Protect public systems from floods and malicious request patterns.", summary: "DDoS mitigation absorbs or filters overwhelming traffic, while WAFs inspect requests for application-layer attack patterns. Protection is usually layered across CDN, edge filters, rate limits, challenge mechanisms, and origin hardening.", analogy: "One defense controls crowds outside the stadium; another checks bags and tickets at the gates.", keyPoints: ["DDoS and WAF solve different classes of attack", "Defense is layered across edge and origin", "Protection should preserve legitimate traffic where possible"], code: `const edgeDefense = ["cdn shield", "rate limiting", "bot challenge", "waf rules"];
console.log(edgeDefense);
` }),
  topic({ id: "zero-trust-security-model", title: "Zero Trust Security Model", icon: "ShieldCheck", difficulty: "Advanced", description: "Assume no network zone is inherently trusted and verify continuously.", summary: "Zero trust treats identity, device posture, and policy as the basis for access rather than implicit network location. It pushes teams toward strong authentication, least privilege, segmentation, and continuous verification instead of broad perimeter trust.", analogy: "Every room in the building checks badges, not just the main entrance.", keyPoints: ["Never trust based only on network location", "Enforce least privilege and continuous verification", "Identity and policy become the access boundary"], code: `const zeroTrust = ["verify identity", "least privilege", "segment access", "continuous validation"];
console.log(zeroTrust);
` }),
  topic({ id: "logging-elk-stack", title: "Logging & ELK Stack", icon: "BookOpen", difficulty: "Beginner", description: "Collect, search, and analyze logs for debugging and incident response.", summary: "Logs capture discrete events and contextual information about what happened inside a system. Pipelines like ELK centralize ingestion, indexing, and search so teams can troubleshoot incidents and trace flows. Structured logs are far more useful than ad hoc text.", analogy: "Logs are the flight recorder of the system. Without them, post-incident reconstruction becomes guesswork.", keyPoints: ["Prefer structured logs with request context", "Centralize ingestion and search", "Logging volume and retention have real cost"], code: `const loggingStack = ["emit", "ship", "index", "search"];
console.log(loggingStack);
` }),
  topic({ id: "metrics-prometheus-grafana", title: "Metrics (Prometheus/Grafana)", icon: "BarChart2", difficulty: "Beginner", description: "Track time-series measurements for health, saturation, and capacity.", summary: "Metrics summarize system behavior over time, such as request rates, error rates, resource usage, and latency histograms. Prometheus-style systems collect these measurements, and Grafana-style tools visualize them. Metrics are the fastest way to detect systemic drift and regressions.", analogy: "Metrics are the dashboard dials in a car. You do not inspect the engine for every trip; you watch the indicators.", keyPoints: ["Metrics show trends and saturation", "Use counters, gauges, and histograms correctly", "Dashboards should support both operations and debugging"], code: `const goldenSignals = ["latency", "traffic", "errors", "saturation"];
console.log(goldenSignals);
` }),
  topic({ id: "distributed-tracing-alerting", title: "Distributed Tracing & Alerting", icon: "Route", difficulty: "Intermediate", description: "Trace requests across services and alert on actionable symptoms.", summary: "Distributed tracing links spans across service boundaries so teams can understand where time is spent and where failures propagate. Alerting turns observability signals into actionable notifications. Good alerts are tied to user impact and SLOs, not random threshold noise.", analogy: "Tracing is following one package through every conveyor belt in the warehouse. Alerting is only paging when the shipment delay actually matters.", keyPoints: ["Tracing connects cross-service latency and failure paths", "Alerts should be actionable and low-noise", "Tie alerts to user impact and SLOs"], code: `const observabilityPillars = ["logs", "metrics", "traces", "alerts"];
console.log(observabilityPillars);
` }),
];

const masterclass: DSATopic[] = [
  topic({ id: "walkthrough-twitter-x-feed", title: "Walkthrough: Twitter/X Feed", icon: "MessageSquare", difficulty: "Advanced", description: "Design a social feed system with fanout, ranking, caching, and storage tradeoffs.", summary: "A Twitter-like feed design usually discusses timelines, tweet storage, follower graphs, fanout-on-write versus fanout-on-read, ranking, and cache strategy. The core challenge is balancing read speed, write amplification, and celebrity-user traffic patterns.", analogy: "It is like deciding whether to pre-print newspapers for every home or assemble each paper when the reader opens it.", keyPoints: ["Follower graph and timeline storage are central", "Celebrity fanout changes architecture decisions", "Caching and ranking dominate read performance"], code: `const designFocus = ["tweet write path", "timeline generation", "fanout strategy", "cache policy"];
console.log(designFocus);
` }),
  topic({ id: "review-facebook-insta-newsfeed", title: "Review: Facebook/Insta Newsfeed", icon: "Share2", difficulty: "Advanced", description: "Review feed architecture decisions around ranking, edges, media, and personalization.", summary: "A newsfeed design extends beyond simple fanout by adding personalization, ranking, media delivery, and high write/read skew. Designers must reason about candidate generation, ranking signals, media CDN usage, and consistency of engagement counters.", analogy: "Instead of delivering the same newspaper to everyone, you create a personalized front page for each reader.", keyPoints: ["Ranking and personalization dominate feed quality", "Media delivery and counters add extra system pressure", "Candidate generation and ranking are separate concerns"], code: `const feedLayers = ["candidate generation", "ranking", "media delivery", "engagement counters"];
console.log(feedLayers);
` }),
  topic({ id: "walkthrough-uber-lyft-map", title: "Walkthrough: Uber/Lyft Map", icon: "MapPin", difficulty: "Advanced", description: "Design rider-driver matching and live location systems.", summary: "Ride-sharing maps combine live location ingestion, geospatial indexing, dispatch, ETA estimation, and surge-aware matching. Designers must think about update frequency, spatial partitioning, fanout to nearby clients, and regional fault isolation.", analogy: "It is like air-traffic control for moving dots in a city grid with constant position updates.", keyPoints: ["Location ingestion and geospatial indexing are core", "Dispatch depends on freshness and proximity", "Map fanout must be regionally efficient"], code: `const rideSharingComponents = ["location stream", "geo index", "dispatch", "eta service"];
console.log(rideSharingComponents);
` }),
  topic({ id: "review-airbnb-tinder-proximity", title: "Review: Airbnb/Tinder Proximity", icon: "MapPin", difficulty: "Advanced", description: "Review proximity search and ranking patterns for location-based discovery products.", summary: "Proximity systems combine geospatial indexing, filtering, ranking, and often eventual consistency for nearby search. The main design questions are how to partition geography, how to refresh indexes, and how to rank nearby results under heavy read load.", analogy: "It is like finding the best nearby restaurants, except the candidates and ranking change constantly.", keyPoints: ["Geo indexing drives candidate search", "Filtering and ranking shape relevance", "Freshness and locality affect user trust"], code: `const proximityStack = ["geo hash", "radius query", "filters", "ranking"];
console.log(proximityStack);
` }),
  topic({ id: "walkthrough-ticketmaster-booking", title: "Walkthrough: Ticketmaster/Booking", icon: "Ticket", difficulty: "Advanced", description: "Design inventory reservation and checkout under bursty demand.", summary: "Ticketing systems center on inventory correctness under extreme bursts, reservation holds, queueing, anti-bot controls, and payment completion windows. The hardest problems are oversell prevention, fairness, and survivability during peak launches.", analogy: "It is like thousands of people reaching for the same few seats at the same second.", keyPoints: ["Reservation holds protect scarce inventory", "Burst traffic needs queueing and bot defense", "Correctness matters more than raw throughput alone"], code: `const bookingFlow = ["queue", "hold inventory", "payment", "confirm or release"];
console.log(bookingFlow);
` }),
  topic({ id: "review-amazon-checkout", title: "Review: Amazon Checkout", icon: "ShoppingCart", difficulty: "Advanced", description: "Review cart, payment, inventory, and order orchestration tradeoffs.", summary: "Checkout systems span cart services, pricing, tax, payment authorization, inventory reservation, fraud checks, and order state machines. Designers must think carefully about idempotency, compensation, and customer-visible state transitions.", analogy: "It is a relay race where every stage must pass the baton correctly, even when one runner stumbles.", keyPoints: ["Idempotency is mandatory in payment flows", "Inventory and payment need careful orchestration", "Order states must remain customer-safe through failures"], code: `const checkoutStages = ["cart", "pricing", "payment", "inventory", "order confirmation"];
console.log(checkoutStages);
` }),
  topic({ id: "walkthrough-youtube-netflix", title: "Walkthrough: YouTube/Netflix", icon: "Video", difficulty: "Advanced", description: "Design large-scale media upload, transcoding, recommendation, and streaming delivery systems.", summary: "Video platforms combine heavy ingest, asynchronous transcoding, metadata indexing, recommendation surfaces, and global CDN delivery. The architecture must handle both creator uploads and consumer playback at very different scales and latency profiles.", analogy: "It is two systems at once: a media factory on the back end and a broadcast network on the front end.", keyPoints: ["Ingest and playback have different requirements", "Transcoding is asynchronous and compute-heavy", "CDN strategy dominates playback scale"], code: `const videoPlatform = ["upload", "transcode", "metadata", "recommendation", "stream delivery"];
console.log(videoPlatform);
` }),
  topic({ id: "final-group-mock-retrospective", title: "Final Group Mock Retrospective", icon: "Users", difficulty: "Intermediate", description: "Use mock interview review loops to improve design communication, tradeoff clarity, and prioritization.", summary: "A strong retrospective focuses on what assumptions were missing, which tradeoffs were justified well, where the design overcomplicated too early, and how clearly the solution was communicated. The value is not in one final diagram. It is in improving the design process itself.", analogy: "It is like reviewing game film after a match to see not only what happened, but why decisions were made under pressure.", keyPoints: ["Review assumptions and missing constraints", "Evaluate tradeoff clarity, not only component count", "Practice concise communication and prioritization"], code: `const retroQuestions = ["What assumptions did I miss?", "Where did I overdesign?", "What tradeoffs were weakly justified?"];
console.log(retroQuestions);
` }),
];

export const systemDesignTopics: DSATopic[] = [
  ...coreFundamentals,
  ...dataCaching,
  ...communication,
  ...securityObservability,
  ...masterclass,
];

export const systemDesignModules: DSAModule[] = [
  {
    id: "system-design-core-fundamentals",
    level: 1,
    title: "Core Fundamentals",
    difficulty: "Beginner",
    description: "Foundational system design vocabulary and architectural tradeoffs.",
    topicIds: coreFundamentals.map((item) => item.id),
  },
  {
    id: "system-design-data-caching",
    level: 2,
    title: "Data & Caching",
    difficulty: "Intermediate",
    description: "Storage, replication, cache design, and large-scale data delivery patterns.",
    topicIds: dataCaching.map((item) => item.id),
  },
  {
    id: "system-design-communication",
    level: 3,
    title: "Communication",
    difficulty: "Intermediate",
    description: "Messaging, APIs, real-time systems, and transport-layer communication choices.",
    topicIds: communication.map((item) => item.id),
  },
  {
    id: "system-design-security-observability",
    level: 4,
    title: "Security & Observability",
    difficulty: "Intermediate",
    description: "Security models, identity, secrets, and operational visibility.",
    topicIds: securityObservability.map((item) => item.id),
  },
  {
    id: "system-design-masterclass",
    level: 5,
    title: "Masterclass",
    difficulty: "Advanced",
    description: "Full-system walkthroughs and review-style design scenarios.",
    topicIds: masterclass.map((item) => item.id),
  },
];
