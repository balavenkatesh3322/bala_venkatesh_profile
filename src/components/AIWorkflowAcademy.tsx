import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Database, 
  Search, 
  Bot, 
  Send, 
  Terminal, 
  ArrowRight, 
  Play, 
  Pause,
  RefreshCw, 
  Cpu, 
  Layers, 
  Activity, 
  FileText,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Code,
  Globe,
  Settings,
  Scale,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

type MainSectionType = 'technical' | 'business';
type TechSubtype = 'rag' | 'agents';

type RAGSubtype = 'naive' | 'advanced' | 'corrective';
type AgentSubtype = 'react' | 'reflection' | 'swarm';

interface WorkflowNode {
  id: string;
  label: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  borderColorClass: string;
  glowClass: string;
  payloadExample: string;
}

export default function AIWorkflowAcademy() {
  const [activeTab, setActiveTab] = useState<MainSectionType>('technical');
  const [activeTechSubtab, setActiveTechSubtab] = useState<TechSubtype>('rag');
  const [activeRAG, setActiveRAG] = useState<RAGSubtype>('advanced');
  const [activeAgent, setActiveAgent] = useState<AgentSubtype>('swarm');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1x, 2x, 3x
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  // Correct architectures retrieved from search
  const naiveRAGNodes: WorkflowNode[] = [
    {
      id: 'naive_input',
      label: '1. User Query',
      shortDesc: 'Raw user question',
      detailedDesc: 'The user submits a question through the chat client. In Naive RAG, this question is immediately sent to the vectorizer without expansion, filtering, or rewriting.',
      icon: Send,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      payloadExample: JSON.stringify({ query: "How do we audit standard chartered cloud credentials?" }, null, 2)
    },
    {
      id: 'naive_retrieve',
      label: '2. Vector Search',
      shortDesc: 'Cosine similarity lookup',
      detailedDesc: 'The vector database searches for the top K closest document embeddings using a mathematical similarity index (such as cosine distance). Any chunk that matches semantically is selected.',
      icon: Database,
      colorClass: 'text-indigo-400',
      borderColorClass: 'border-indigo-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(99,102,241,0.15)]',
      payloadExample: JSON.stringify({ vector_search: { top_k: 3, index: "cosine_similarity", latency_ms: 12.4 } }, null, 2)
    },
    {
      id: 'naive_prompt',
      label: '3. Direct Augment',
      shortDesc: 'Stuffed prompt context',
      detailedDesc: 'The matched text chunks are combined and directly pasted into the model prompt under a header like "Context:". No re-ranking or chunk compression is conducted, which often wastes token bandwidth.',
      icon: FileText,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
      payloadExample: `System: Answer using this context:\n[CHUNK 1: policy-cred-v2.pdf ...]\n[CHUNK 2: devops-guidelines.txt ...]\n\nQuery: How do we audit standard chartered cloud credentials?`
    },
    {
      id: 'naive_gen',
      label: '4. Direct Output',
      shortDesc: 'Standard LLM Response',
      detailedDesc: 'The model reads the augmented prompt and generates the response. Without grading, this system is highly prone to hallucinating if the retrieved document chunks are outdated or irrelevant.',
      icon: Brain,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      payloadExample: JSON.stringify({ llm_meta: { model: "gemini-1.5-flash", input_tokens: 4200, output_tokens: 154, status: "complete" } }, null, 2)
    }
  ];

  const advancedRAGNodes: WorkflowNode[] = [
    {
      id: 'adv_rewrite',
      label: '1. Query Rewriter',
      shortDesc: 'Expansion & HyDE',
      detailedDesc: 'The user query is re-engineered by a specialized model. It spawns sub-questions or a hypothetical document response (HyDE) to maximize the likelihood of finding high-density embeddings inside the Vector DB.',
      icon: Send,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      payloadExample: JSON.stringify({ 
        original: "audit standard chartered credentials",
        rewrites: [
          "azure cloud audit logging protocols scb",
          "compliance credentials rotating procedure devops",
          "IAM privilege audit scb guidelines"
        ]
      }, null, 2)
    },
    {
      id: 'adv_hybrid',
      label: '2. Hybrid Retrieval',
      shortDesc: 'BM25 + Dense Vectors',
      detailedDesc: 'Performs a hybrid search combining Sparse Keyword indexing (BM25 for exact terms like server IDs) and Dense Vector indexing (semantic embeddings for conceptual matches) to fetch precise candidates.',
      icon: Database,
      colorClass: 'text-indigo-400',
      borderColorClass: 'border-indigo-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]',
      payloadExample: JSON.stringify({
        hybrid_retrieval: {
          dense_results_count: 15,
          bm25_results_count: 10,
          fusion_algorithm: "Reciprocal Rank Fusion (RRF)"
        }
      }, null, 2)
    },
    {
      id: 'adv_rerank',
      label: '3. Cross-Encoder Reranker',
      shortDesc: 'Dynamic Relevance Rating',
      detailedDesc: 'A powerful Cross-Encoder (such as Cohere Rerank) scores the exact conceptual match of each retrieved chunk against the query. Any chunk with low relevance (score < 0.70) is dropped, eliminating noise.',
      icon: Settings,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      payloadExample: JSON.stringify({
        reranking_engine: "cohere-rerank-v3",
        candidates: [
          { chunk_id: "doc_scb_991", original_rank: 1, reranked_score: 0.942, status: "RETAINED" },
          { chunk_id: "doc_scb_412", original_rank: 2, reranked_score: 0.315, status: "DISCARDED" }
        ]
      }, null, 2)
    },
    {
      id: 'adv_compress',
      label: '4. Context Compressor',
      shortDesc: 'Pruned token reduction',
      detailedDesc: 'Using tools like LLMLingua, the system compresses the remaining document chunks to extract only the key sentences. This dramatically reduces input tokens, saves cost, and improves response accuracy.',
      icon: FileText,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      payloadExample: `Pruned 1,500 words down to 180 core words.\nSaved 88% Input token cost.\nNo loss in semantic integrity.`
    },
    {
      id: 'adv_synthesis',
      label: '5. Grounded Synthesis',
      shortDesc: 'Hallucination-free output',
      detailedDesc: 'The LLM synthesizes the highly specific, clean context. System instructions strictly forbid making up claims. Footnote citations are cross-referenced to original metadata to ensure complete auditability.',
      icon: Brain,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      payloadExample: JSON.stringify({
        citation_sources: ["sec-audit-guide-v4.pdf#page=12"],
        factual_score: 1.0,
        hallucination_check: "PASSED"
      }, null, 2)
    }
  ];

  const correctiveRAGNodes: WorkflowNode[] = [
    {
      id: 'crag_retrieve',
      label: '1. Internal Retrieval',
      shortDesc: 'Standard DB Match',
      detailedDesc: 'The pipeline pulls the initial set of reference document chunks from the private database or document storage based on the user query.',
      icon: Database,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      payloadExample: JSON.stringify({ database: "private_docs_collection", chunks_extracted: 5 }, null, 2)
    },
    {
      id: 'crag_grader',
      label: '2. Chunk Grader Agent',
      shortDesc: 'Relevance Grading Check',
      detailedDesc: 'A fast grader agent evaluates the quality of each retrieved doc chunk against the user query, categorizing the retrieval as Correct, Incorrect, or Ambiguous.',
      icon: Bot,
      colorClass: 'text-amber-400',
      borderColorClass: 'border-amber-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      payloadExample: JSON.stringify({
        grader_outcome: "INSUFFICIENT",
        confidence: 0.38,
        action: "TRIGGER_EXTERNAL_FALLBACK"
      }, null, 2)
    },
    {
      id: 'crag_websearch',
      label: '3. Web Search Fallback',
      shortDesc: 'Live Google/Bing query',
      detailedDesc: 'If the retrieved chunks are graded "Incorrect" or "Ambiguous", CRAG dynamically reformulates the query and triggers a live search using Google/Bing search APIs to pull the latest public facts.',
      icon: Globe,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      payloadExample: JSON.stringify({
        api: "google_search_custom",
        query: "latest standard chartered Azure DevOps auditing guidelines 2026",
        retrieved_urls: ["https://scb.com/compliance-news"]
      }, null, 2)
    },
    {
      id: 'crag_refine',
      label: '4. Knowledge Refiner',
      shortDesc: 'Strip & Merge docs',
      detailedDesc: 'The system parses the raw web HTML and original internal documents, strips all styling, isolates relevant sentences, and merges them into a clean, unified context packet.',
      icon: FileText,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      payloadExample: `[REFINED CONTEXT]\n- Live web source: compliance audit is updated as of Q2 2026\n- Internal document source: policy guidelines 10-A.`
    },
    {
      id: 'crag_synthesis',
      label: '5. Grounded Gen',
      shortDesc: 'LLM finalized output',
      detailedDesc: 'The LLM combines the verified, corrected context packet and writes a complete, factually sound answer, ensuring standard chartered-grade security compliance.',
      icon: Brain,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      payloadExample: JSON.stringify({
        llm_response_status: "SUCCESSFUL_CORRECTIVE_GENERATION",
        hallucination_index: 0.00
      }, null, 2)
    }
  ];

  const agentReActNodes: WorkflowNode[] = [
    {
      id: 'react_state',
      label: '1. User Request',
      shortDesc: 'Initiates planning loop',
      detailedDesc: 'The user submits a complex instruction (e.g. "Scan this file and write it to database"). The ReAct agent breaks this goal into logical, iterative step hypotheses.',
      icon: Send,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      payloadExample: JSON.stringify({ task: "Query database for top 5 items and summarize their content" }, null, 2)
    },
    {
      id: 'react_thought',
      label: '2. Thought',
      shortDesc: 'LLM reasoning step',
      detailedDesc: 'The model thinks about what action to take. It writes out its internal reasoning process, explaining why it needs to use a specific tool (e.g., to fetch database records).',
      icon: Brain,
      colorClass: 'text-indigo-400',
      borderColorClass: 'border-indigo-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]',
      payloadExample: "Thought: I need to fetch the top 5 database records first. I will use the execute_sql tool."
    },
    {
      id: 'react_action',
      label: '3. Action',
      shortDesc: 'Tool choice & parameters',
      detailedDesc: 'The model outputs a structured code block (often JSON) specifying the target tool and arguments. This triggers actual code execution in the backend.',
      icon: Settings,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      payloadExample: JSON.stringify({ tool: "execute_sql", arguments: { query: "SELECT * FROM products ORDER BY sales DESC LIMIT 5" } }, null, 2)
    },
    {
      id: 'react_obs',
      label: '4. Observation',
      shortDesc: 'Real execution feedback',
      detailedDesc: 'The application runs the tool, retrieves the raw results, and feeds the output back into the model prompt as a fresh observation. The model evaluates whether the task is complete.',
      icon: Database,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      payloadExample: JSON.stringify({ observation: { status: "success", rows_returned: 5, payload: ["Prod A", "Prod B"] } }, null, 2)
    },
    {
      id: 'react_loop',
      label: '5. Loop / Output',
      shortDesc: 'Loop or finish answer',
      detailedDesc: 'The model reads the tool observation. If more information is needed, it loops back to step 2 (Thought). If satisfied, it writes the final, high-fidelity answer.',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      payloadExample: "Final Answer: The top 5 items are Prod A, Prod B... based on the SQL query execution."
    }
  ];

  const agentReflectionNodes: WorkflowNode[] = [
    {
      id: 'ref_gen',
      label: '1. Generator Model',
      shortDesc: 'Initial draft creator',
      detailedDesc: 'A generation agent writes the initial version of the code, compliance report, or SQL database script based on the client specifications.',
      icon: Code,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      payloadExample: "function calculateTax(price) {\n  return price * 0.15;\n}"
    },
    {
      id: 'ref_critique',
      label: '2. Auditor / Critic',
      shortDesc: 'Strict syntax & security audit',
      detailedDesc: 'A separate model instance (configured with a hyper-strict prompt or static checkers) audits the draft. It scans for security flaws, syntax errors, or logical gaps.',
      icon: ShieldCheck,
      colorClass: 'text-rose-400',
      borderColorClass: 'border-rose-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
      payloadExample: JSON.stringify({
        audit_verdict: "FAILED",
        vulnerability: "Floating point precision issues in float numbers. Tax function has no error boundary check."
      }, null, 2)
    },
    {
      id: 'ref_feedback',
      label: '3. Feedback Router',
      shortDesc: 'Construct constructive edits',
      detailedDesc: 'The critic structures the exact corrections, lines, and expectations. It routes this telemetry log directly back into the Generator model context.',
      icon: Terminal,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      payloadExample: "Refinement prompt: Please fix the Tax function to validate price is a number and round outputs properly."
    },
    {
      id: 'ref_refine',
      label: '4. Refined Output',
      shortDesc: 'Perfect, audited deliverable',
      detailedDesc: 'The Generator edits the draft. It submits the updated code to the auditor again. This feedback loop runs until the Sentry grades the output a perfect 100%.',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      payloadExample: "function calculateTax(price) {\n  if (typeof price !== 'number') throw new Error();\n  return Math.round(price * 15) / 100;\n}"
    }
  ];

  const agentSwarmNodes: WorkflowNode[] = [
    {
      id: 'swarm_supervisor',
      label: '1. Supervisor (Router)',
      shortDesc: 'LangGraph orchestrator',
      detailedDesc: 'A supervisor router (such as a langgraph state router or CrewAI Manager) receives the high-level business goal, maintains a central shared state thread, and coordinates the task delegation.',
      icon: Cpu,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      payloadExample: JSON.stringify({ 
        active_task: "Develop secure Express proxy API",
        current_state: { files_created: [], approved_by_qa: false },
        next_agent: "ResearchAgent"
      }, null, 2)
    },
    {
      id: 'swarm_researcher',
      label: '2. Research Agent',
      shortDesc: 'Gathers live technical docs',
      detailedDesc: 'Autonomous node that executes web query tools, extracts API schemas, and formats the research into clear guidelines which are written directly into the shared state database.',
      icon: Search,
      colorClass: 'text-indigo-400',
      borderColorClass: 'border-indigo-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]',
      payloadExample: JSON.stringify({ 
        research_status: "complete", 
        extracted_facts: "Vite dev server requires host 0.0.0.0. Reverse proxy routes standard traffic exclusively to port 3000."
      }, null, 2)
    },
    {
      id: 'swarm_coder',
      label: '3. Technical Coder Agent',
      shortDesc: 'Generates TypeScript code',
      detailedDesc: 'Reads the research state and writes high-quality, typed code. It has a strict focus on modularity, robust imports, and clean structure, saving files to the workspace.',
      icon: Code,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      payloadExample: "import express from 'express';\nconst app = express();\napp.listen(3000, '0.0.0.0');"
    },
    {
      id: 'swarm_auditor',
      label: '4. Sentry / Auditor Agent',
      shortDesc: 'Enforces compliance rules',
      detailedDesc: 'Validates that the generated code is completely secure and follows environment rules. Once audited, it marks the state flag "approved_by_qa: true" and returns back to the Supervisor.',
      icon: ShieldCheck,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      payloadExample: JSON.stringify({ 
        lint_results: "PASSED",
        approved_by_qa: true, 
        message: "No absolute paths used, port 3000 verified." 
      }, null, 2)
    },
    {
      id: 'swarm_deliver',
      label: '5. Signed Executive Outcome',
      shortDesc: 'Final verified deployment',
      detailedDesc: 'The Supervisor compiles the state history, verifies that all QA conditions have been met, and packages the verified artifact directly for the developer/user.',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/30',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      payloadExample: JSON.stringify({ 
        deployment_status: "DEPLOYS_SUCCESSFULLY", 
        execution_time_seconds: 14.8, 
        saved_developer_hours: 4.5 
      }, null, 2)
    }
  ];

  // Business level nodes representing mapping requirements to deliverables
  const businessNodes: WorkflowNode[] = [
    {
      id: 'biz_req',
      label: '1. Requirement Mapping',
      shortDesc: 'Extract Business Intent',
      detailedDesc: 'Decomposes the client speech/natural language intent (e.g. "Create a cloud security compliance checker"). Formulates specific functional requirements, safety criteria, and cost limitations.',
      icon: FileText,
      colorClass: 'text-amber-400',
      borderColorClass: 'border-amber-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
      payloadExample: JSON.stringify({
        business_intent: "Audit standard chartered Azure cloud logging and credentials daily",
        regulatory_scope: "ISO-27001 Annex A.12",
        budget_limit: "$0.02 per evaluation run"
      }, null, 2)
    },
    {
      id: 'biz_blueprint',
      label: '2. Architecture Blueprint',
      shortDesc: 'Core Stack Selection',
      detailedDesc: 'Binds requirements to precise technical structures. Selects the vector database index dimensions, authentication scopes (Firebase Auth vs Google OAuth), and the target reasoning LLMs (e.g., Gemini 1.5 Pro).',
      icon: Database,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      payloadExample: JSON.stringify({
        database_layer: "Firestore (Durable Persistent Cloud Schema)",
        reasoning_model: "Gemini 1.5 Pro (large context reasoning)",
        context_window: "2,000,000 tokens",
        auth_scopes: ["https://www.googleapis.com/auth/userinfo.email"]
      }, null, 2)
    },
    {
      id: 'biz_orchestration',
      label: '3. Orchestration Assembly',
      shortDesc: 'State routing & tools',
      detailedDesc: 'Compiles the server state graph (LangGraph) and registers the required secure tool proxies. Configures intermediate server API endpoints and establishes system safety guardrails.',
      icon: Cpu,
      colorClass: 'text-pink-400',
      borderColorClass: 'border-pink-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(236,72,153,0.15)]',
      payloadExample: JSON.stringify({
        orchestrator: "LangGraph State Machine Router",
        server_entrypoint: "server.ts (Express, port 3000)",
        registered_tools: ["execute_sql", "search_web", "view_file"],
        guardrail_vulnerability_filter: "Strict"
      }, null, 2)
    },
    {
      id: 'biz_eval',
      label: '4. Evaluation & Audit',
      shortDesc: 'Verify precision & SLA',
      detailedDesc: 'Evaluates the running pipeline using ground-truth testing (such as RAGAS framework). Checks answers for faithfulness, retrieves precise contexts, and measures system cold-starts and response times.',
      icon: Activity,
      colorClass: 'text-purple-400',
      borderColorClass: 'border-purple-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
      payloadExample: JSON.stringify({
        evaluation_verdict: "PASSED_FOR_SHIPMENT",
        metrics: {
          faithfulness: 0.992,
          answer_relevance: 0.978,
          context_recall: 0.965,
          latency_p95_seconds: 2.1
        }
      }, null, 2)
    },
    {
      id: 'biz_deploy',
      label: '5. Signed Cloud Delivery',
      shortDesc: 'Production container deploy',
      detailedDesc: 'Ships the bundled production artifacts (bundled with Esbuild as dist/server.cjs) to containerized hosting (GCP Cloud Run). Configures the secure nginx reverse proxy to present the live interface on port 3000.',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/20',
      glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      payloadExample: JSON.stringify({
        deployment_target: "Google Cloud Run Container",
        ssl_status: "HTTPS_SECURE",
        proxy_routing: "Nginx -> port 3000",
        signed_release_by: "Bala Venkatesh - Chief Architect"
      }, null, 2)
    }
  ];

  // Boolean flags for easy styling mapping
  const isRag = activeTab === 'technical' && activeTechSubtab === 'rag';
  const isAgent = activeTab === 'technical' && activeTechSubtab === 'agents';
  const isBusiness = activeTab === 'business';

  // Pick nodes depending on active tabs
  const getActiveNodes = (): WorkflowNode[] => {
    if (isBusiness) {
      return businessNodes;
    }
    if (isRag) {
      if (activeRAG === 'naive') return naiveRAGNodes;
      if (activeRAG === 'advanced') return advancedRAGNodes;
      return correctiveRAGNodes;
    } else {
      if (activeAgent === 'react') return agentReActNodes;
      if (activeAgent === 'reflection') return agentReflectionNodes;
      return agentSwarmNodes;
    }
  };

  const nodes = getActiveNodes();

  const handlePrevStep = () => {
    setIsPlaying(false);
    setActiveStep((prev) => {
      const next = prev === 0 ? nodes.length - 1 : prev - 1;
      setSelectedNodeId(nodes[next].id);
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setTelemetryLogs((p) => [
        `[${timestamp}] ⏪ STEP BACKWARD: Moved to Node "0${next + 1}: ${nodes[next].label.replace(/^\d+\.\s*/, '')}"`,
        ...p.slice(0, 5)
      ]);
      return next;
    });
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setActiveStep((prev) => {
      const next = (prev + 1) % nodes.length;
      setSelectedNodeId(nodes[next].id);
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setTelemetryLogs((p) => [
        `[${timestamp}] ⏩ STEP FORWARD: Moved to Node "0${next + 1}: ${nodes[next].label.replace(/^\d+\.\s*/, '')}"`,
        ...p.slice(0, 5)
      ]);
      return next;
    });
  };

  // Reset steps and selected node when changing subtabs
  useEffect(() => {
    setActiveStep(0);
    if (nodes && nodes[0]) {
      setSelectedNodeId(nodes[0].id);
    }
  }, [activeTab, activeTechSubtab, activeRAG, activeAgent]);

  // Handle auto simulation steps
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = (3500 / playbackSpeed);
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % nodes.length;
        
        // Dynamic simulated telemetry log
        const timestamp = new Date().toLocaleTimeString().split(' ')[0];
        const currentNode = nodes[next];
        const logLine = `[${timestamp}] 📡 TRAVERSING: Node "0${next + 1}: ${currentNode.label.replace(/^\d+\.\s*/, '')}" is active. Executing instruction sequence...`;
        
        setTelemetryLogs((prevLogs) => [logLine, ...prevLogs.slice(0, 5)]);
        setSelectedNodeId(currentNode.id);
        
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, nodes, playbackSpeed]);

  const handleNodeClick = (node: WorkflowNode, index: number) => {
    setIsPlaying(false);
    setActiveStep(index);
    setSelectedNodeId(node.id);
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    setTelemetryLogs((prev) => [
      `[${timestamp}] 🖱️ MANUAL INTERACTION: Inspected Node "0${index + 1}: ${node.label.replace(/^\d+\.\s*/, '')}" details & state registry.`,
      ...prev.slice(0, 5)
    ]);
  };

  const activeNodeDetails = nodes.find(n => n.id === selectedNodeId) || nodes[activeStep] || nodes[0];

  return (
    <section id="workflow-academy" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-t border-white/5 z-20">
      
      {/* Decorative ambient background spots */}
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-indigo-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* SECTION TITLE & HEADER */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 tracking-widest uppercase relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-pink-500/5 animate-[pulse_3s_infinite]" />
            <span className="relative flex items-center gap-1.5 font-bold">
              <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[8px] font-mono font-black animate-pulse tracking-wide mr-1 border border-cyan-400/30">NEW</span>
              <Brain className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Interactive AI Playbook
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none">
            Deep Dive: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400">Industry-Standard AI Flows</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl leading-relaxed">
            Don't rely on guesswork. Learn the exact technical architectures powering corporate RAG pipelines, autonomous agentic swarms, and requirement-to-deliverable lifecycles.
          </p>
        </div>

        {/* 2-PAGE SELECTION SWITCHER */}
        <div className="flex flex-col items-center gap-6">
          <div className="p-1.5 rounded-2.5xl glass-panel flex gap-2 w-full max-w-2xl self-center relative z-10">
            <button
              onClick={() => {
                setActiveTab('technical');
                setIsPlaying(true);
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3.5 rounded-2xl transition-all duration-300 select-none cursor-pointer ${
                activeTab === 'technical'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.18)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-black tracking-wide uppercase">Technical Depth</span>
              </div>
              <span className="text-[9px] text-slate-500 font-medium hidden sm:block">Interactive RAG & Agent Flow Diagrams</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('business');
                setIsPlaying(true);
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3.5 rounded-2xl transition-all duration-300 select-none cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.18)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-black tracking-wide uppercase">Business Delivery</span>
              </div>
              <span className="text-[9px] text-slate-500 font-medium hidden sm:block">Requirement Gathering to Deliverable Lifecycle</span>
            </button>
          </div>

          {/* PAGE 1 SUBTABS: RAG vs AGENTS */}
          {activeTab === 'technical' && (
            <div className="p-1 rounded-xl bg-slate-900/60 border border-white/5 flex gap-1 relative z-10 animate-fade-in">
              <button
                onClick={() => {
                  setActiveTechSubtab('rag');
                  setIsPlaying(true);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-wider uppercase transition-all duration-300 select-none cursor-pointer flex items-center gap-2 ${
                  activeTechSubtab === 'rag'
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                RAG Architectures
              </button>
              <button
                onClick={() => {
                  setActiveTechSubtab('agents');
                  setIsPlaying(true);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-wider uppercase transition-all duration-300 select-none cursor-pointer flex items-center gap-2 ${
                  activeTechSubtab === 'agents'
                    ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Agentic Systems
              </button>
            </div>
          )}

          {/* DETAIL MODEL SELECTORS FOR TECHNICAL PIPELINES */}
          <div className="flex flex-wrap justify-center gap-3 relative z-10 min-h-[40px]">
            {isRag && (
              <>
                <button
                  onClick={() => {
                    setActiveRAG('naive');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeRAG === 'naive'
                      ? 'bg-slate-900 text-white border-2 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeRAG === 'naive' ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                  Naive RAG (Legacy Linear)
                </button>
                <button
                  onClick={() => {
                    setActiveRAG('advanced');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeRAG === 'advanced'
                      ? 'bg-slate-900 text-white border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeRAG === 'advanced' ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                  Advanced RAG (Reranking Filter)
                </button>
                <button
                  onClick={() => {
                    setActiveRAG('corrective');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeRAG === 'corrective'
                      ? 'bg-slate-900 text-white border-2 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeRAG === 'corrective' ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                  Corrective RAG (CRAG Grader)
                </button>
              </>
            )}
            {isAgent && (
              <>
                <button
                  onClick={() => {
                    setActiveAgent('react');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeAgent === 'react'
                      ? 'bg-slate-900 text-white border-2 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.1)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeAgent === 'react' ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
                  ReAct Loop (Reason & Act)
                </button>
                <button
                  onClick={() => {
                    setActiveAgent('reflection');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeAgent === 'reflection'
                      ? 'bg-slate-900 text-white border-2 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.1)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeAgent === 'reflection' ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
                  Self-Reflection Critique
                </button>
                <button
                  onClick={() => {
                    setActiveAgent('swarm');
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 ${
                    activeAgent === 'swarm'
                      ? 'bg-slate-900 text-white border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeAgent === 'swarm' ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
                  LangGraph Multi-Agent Swarm
                </button>
              </>
            )}
            {isBusiness && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400/80 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Continuous Evaluation & DevOps Shipping pipeline is fully simulated.
              </div>
            )}
          </div>
        </div>

        {/* WORKFLOW DIAGRAM SANDBOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* FLOW PIPELINE BOX: LEFT (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative min-h-[460px]">
              
              {/* Dynamic light spot behind active node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

              {/* TELEMETRY TOP LINE */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 z-10">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                    ACTIVE ARCHITECTURE MODEL
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300">
                      {isBusiness 
                        ? 'Business Delivery: Requirements-to-Container-Launch'
                        : isRag 
                          ? (activeRAG === 'naive' ? 'Naive Linear Flow RAG' : activeRAG === 'advanced' ? 'Advanced Chunk-rerank RAG' : 'Corrective Self-Grader RAG (CRAG)')
                          : (activeAgent === 'react' ? 'ReAct (Reason + Act) Agent' : activeAgent === 'reflection' ? 'Recursive Self-Reflection Agent' : 'Supervisor Graph Multi-Agent Swarm')
                      }
                    </span>
                  </div>
                </div>

                {/* PLAYBACK SPEED BUTTONS */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[10px] font-mono text-slate-500">SPEED:</span>
                  <div className="bg-slate-900 border border-white/5 p-0.5 rounded-lg flex">
                    {[1, 2, 3].map((sp) => (
                      <button
                        key={sp}
                        onClick={() => setPlaybackSpeed(sp)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer select-none ${
                          playbackSpeed === sp 
                            ? 'bg-cyan-500/10 text-cyan-400' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {sp}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP NAVIGATION TIMELINE OVERLAY */}
              <div className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-900/60 border border-white/5 z-10 overflow-x-auto scrollbar-none mt-4 text-left">
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mr-2 shrink-0">
                  TRAVERSAL STEP:
                </span>
                <div className="flex items-center gap-1 sm:gap-2">
                  {nodes.map((node, idx) => {
                    const isActive = activeStep === idx;
                    const isCompleted = idx < activeStep;
                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node, idx)}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-black tracking-wider transition-all uppercase flex items-center gap-1 shrink-0 border select-none cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : isCompleted
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                              : 'bg-slate-950/40 text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.02]'
                        }`}
                      >
                        {isCompleted ? '✓' : `S${idx + 1}`}
                        <span className="hidden sm:inline opacity-85 ml-1">{node.label.replace(/^\d+\.\s*/, '').split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FLOWING ANIMATION STAGE ZONE */}
              <div className="relative flex-1 flex flex-col justify-center py-12 md:py-16">
                
                {/* SVG Routing connection paths (only visible on tablet & desktop) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0">
                  <svg className="w-full h-full" viewBox="0 0 800 200" fill="none">
                    {/* Background connector path */}
                    <path
                      d={`M 80,100 H ${80 + (nodes.length - 1) * 160}`}
                      stroke="rgba(255, 255, 255, 0.06)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Completed connecting path up to current step */}
                    {activeStep > 0 && (
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                        d={`M 80,100 H ${80 + activeStep * 160}`}
                        stroke={isRag ? '#22d3ee' : isAgent ? '#818cf8' : '#34d399'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      />
                    )}

                    {/* Glowing moving trajectory line */}
                    {isPlaying && (
                      <motion.path
                        d={`M 80,100 H ${80 + (nodes.length - 1) * 160}`}
                        stroke={isRag ? 'url(#academy-cyan)' : isAgent ? 'url(#academy-indigo)' : 'url(#academy-amber)'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="50 150"
                        animate={{ strokeDashoffset: [-200, 0] }}
                        transition={{ duration: 4 / playbackSpeed, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    {/* Gradient values definitions */}
                    <defs>
                      <linearGradient id="academy-cyan" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.9)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                      </linearGradient>
                      <linearGradient id="academy-indigo" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                        <stop offset="50%" stopColor="rgba(99, 102, 241, 0.9)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                      </linearGradient>
                      <linearGradient id="academy-amber" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
                        <stop offset="50%" stopColor="rgba(245, 158, 11, 0.9)" />
                        <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* HORIZONTAL NODES GRID CONTAINER */}
                <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between items-center gap-6 relative z-10">
                  {nodes.map((node, index) => {
                    const isNodeActive = activeStep === index;
                    const isCompleted = index < activeStep;
                    const NodeIcon = node.icon;

                    return (
                      <div 
                        key={node.id} 
                        className="flex flex-col items-center md:flex-1"
                        style={{ maxWidth: '160px' }}
                      >
                        <motion.div
                          onClick={() => handleNodeClick(node, index)}
                          whileHover={{ scale: 1.08 }}
                          animate={{
                            scale: isNodeActive ? [1, 1.06, 1] : 1,
                            borderColor: isNodeActive 
                              ? (isRag ? '#06b6d4' : isAgent ? '#6366f1' : '#10b981') 
                              : isCompleted
                                ? (isRag ? 'rgba(6, 182, 212, 0.4)' : isAgent ? 'rgba(99, 102, 241, 0.4)' : 'rgba(16, 185, 129, 0.4)')
                                : 'rgba(255, 255, 255, 0.08)',
                            boxShadow: isNodeActive 
                              ? (isRag 
                                ? '0 0 25px rgba(6, 182, 212, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)' 
                                : isAgent 
                                  ? '0 0 25px rgba(99, 102, 241, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                                  : '0 0 25px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)')
                              : isCompleted
                                ? (isRag 
                                  ? '0 0 12px rgba(6, 182, 212, 0.15)' 
                                  : isAgent 
                                    ? '0 0 12px rgba(99, 102, 241, 0.15)'
                                    : '0 0 12px rgba(16, 185, 129, 0.15)')
                                : '0 4px 12px rgba(0, 0, 0, 0.3)'
                          }}
                          transition={{ duration: 0.3 }}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center cursor-pointer border relative select-none transition-colors duration-300 ${
                            isNodeActive ? 'bg-slate-900' : isCompleted ? 'bg-slate-900/40' : 'bg-slate-950/60'
                          }`}
                        >
                          {/* Pulsing Outer Dash Ring */}
                          {isNodeActive && (
                            <span 
                              className="absolute inset-[-4px] rounded-2.5xl border border-dashed animate-[spin_12s_infinite_linear] opacity-70 pointer-events-none"
                              style={{ borderColor: isRag ? '#06b6d4' : isAgent ? '#6366f1' : '#10b981' }}
                            />
                          )}

                          <NodeIcon className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 ${
                            isNodeActive 
                              ? (isRag ? 'text-cyan-400' : isAgent ? 'text-indigo-400' : 'text-emerald-400') 
                              : isCompleted
                                ? (isRag ? 'text-cyan-400/80' : isAgent ? 'text-indigo-400/80' : 'text-emerald-400/80')
                                : 'text-slate-500 hover:text-slate-300'
                          }`} />

                          {/* Order Index / Completed Badge */}
                          <div 
                            className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-mono font-extrabold flex items-center justify-center border transition-all duration-300 ${
                              isNodeActive 
                                ? 'bg-slate-900 text-white' 
                                : isCompleted
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                                  : 'bg-slate-950 text-slate-500 border-white/5'
                            }`}
                            style={{ borderColor: isNodeActive ? (isRag ? '#06b6d4' : isAgent ? '#6366f1' : '#10b981') : undefined }}
                          >
                            {isCompleted ? '✓' : `0${index + 1}`}
                          </div>
                        </motion.div>

                        <div className="mt-3.5 text-center px-1">
                          <p className={`text-[11px] sm:text-xs font-black tracking-tight leading-tight transition-colors duration-300 ${
                            isNodeActive 
                              ? 'text-white' 
                              : isCompleted 
                                ? 'text-slate-200 font-bold' 
                                : 'text-slate-500 font-medium'
                          }`}>
                            {node.label.replace(/^\d+\.\s*/, '')}
                          </p>
                          <span className={`text-[9px] font-mono font-medium block mt-0.5 whitespace-nowrap transition-colors duration-300 ${
                            isNodeActive 
                              ? 'text-cyan-400/80' 
                              : isCompleted 
                                ? 'text-slate-400/70 font-semibold' 
                                : 'text-slate-500'
                          }`}>
                            {node.shortDesc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* LOWER CONTROLS PANEL */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/5 pt-5 text-left z-10">
                <div className="flex-1">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    NODE EXPLANATION & ANALYSIS
                  </span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
                    {activeNodeDetails.detailedDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {/* Previous Step button */}
                  <button
                    onClick={handlePrevStep}
                    className="p-2.5 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        Run
                      </>
                    )}
                  </button>

                  {/* Next Step button */}
                  <button
                    onClick={handleNextStep}
                    className="p-2.5 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                    title="Next Step"
                  >
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveStep(0);
                      setIsPlaying(true);
                      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
                      setTelemetryLogs([`[${timestamp}] 🔄 Reset dynamic flow. Pulse sequence active.`]);
                    }}
                    className="p-2.5 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                    Reset
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* TELEMETRY LOGS & JSON PAYLOAD: RIGHT (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            
            {/* TERMINAL CONSOLE LOGS */}
            <div className="rounded-3xl glass-panel p-6 flex flex-col justify-between gap-4 relative overflow-hidden h-[210px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-mono font-black text-slate-300 tracking-wide">Orchestration Logs</span>
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Live Trace
                </span>
              </div>

              {/* Console logs list */}
              <div className="flex-1 font-mono text-[9px] leading-relaxed text-slate-400 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10 pr-2">
                <AnimatePresence initial={false}>
                  {telemetryLogs.length === 0 ? (
                    <div className="text-slate-600 italic">Waiting for pipeline flow trigger inputs...</div>
                  ) : (
                    telemetryLogs.map((log, i) => (
                      <motion.div
                        key={log + i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`border-l pl-2 border-white/5 py-0.5 ${i === 0 ? 'text-cyan-300 border-cyan-500/30 font-bold' : ''}`}
                      >
                        {log}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="text-[8px] font-mono text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
                <span>Kernel Node: Express CJS</span>
                <span>Active thread: 0x2A1C</span>
              </div>
            </div>

            {/* LIVE DATA PAYLOAD VIEW */}
            <div className="flex-1 rounded-3xl glass-panel p-6 flex flex-col gap-3 relative overflow-hidden min-h-[220px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-xs font-mono font-black text-slate-300 tracking-wide">Dynamic Payload Registry</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-[8px] font-mono font-bold text-pink-400">
                  Step 0{activeStep + 1}
                </span>
              </div>

              <div className="flex-1 bg-slate-950/60 rounded-xl p-3 border border-white/5 font-mono text-[9px] leading-normal text-slate-300 overflow-auto max-h-[180px] scrollbar-thin scrollbar-thumb-white/10">
                <pre className="whitespace-pre-wrap word-break-all">
                  {activeNodeDetails.payloadExample}
                </pre>
              </div>

              <div className="flex items-center gap-1 text-[9px] text-slate-500">
                <HelpCircle className="w-3 h-3 text-slate-500 shrink-0" />
                <span>Payload displays real-time parameters used during execution.</span>
              </div>
            </div>

          </div>

        </div>

        {/* LATEST INSIGHT / BLOG PROMO */}
        <div className="mt-16 rounded-3xl glass-panel p-6 sm:p-8 border border-white/5 bg-gradient-to-tr from-cyan-500/5 via-transparent to-indigo-500/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-3 max-w-2xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-cyan-500/20">
                Latest Lesson
              </span>
              <span className="text-xs font-mono text-slate-500">• 5 min read</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Stop Asking "How LLMs Work." Start Asking "When LLMs Are the Right Tool."
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              In this practical guide, I break down the concrete parameters to evaluate before selecting a commercial model, why fine-tuning is usually over-prescribed, and how surrounding systems design dictates SLA success.
            </p>
          </div>
          <div className="shrink-0 relative z-10">
            <a
              href="#lessons"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              Explore Bala's Lessons
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
