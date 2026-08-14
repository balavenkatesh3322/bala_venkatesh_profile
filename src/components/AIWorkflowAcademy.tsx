import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Lightbulb, 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Terminal,
  Compass,
  Building2,
  Sprout,
  HeartPulse
} from 'lucide-react';
import WaterWaveEffect from './WaterWaveEffect';
import BankingDevSecOpsSimulator from './simulators/BankingDevSecOpsSimulator';
import AgricultureEdgeVisionSimulator from './simulators/AgricultureEdgeVisionSimulator';
import HealthcareClinicalScribeSimulator from './simulators/HealthcareClinicalScribeSimulator';

type GrowthPillar = 'business' | 'innovation' | 'problem_solving';

interface TransformationStage {
  stepNumber: string;
  stageTitle: string;
  state: 'problem' | 'catalyst' | 'architecture' | 'outcome';
  subtitle: string;
  narrative: string;
  enterpriseContext: string;
  metricsPill: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  };
  architecturalAction: string;
  codeSnippet: string;
  highlightTokens: string[];
}

interface CaseStudyPillarData {
  id: GrowthPillar;
  domainLabel: string;
  title: string;
  tagline: string;
  badge: string;
  colorScheme: {
    primary: string;
    border: string;
    badgeBg: string;
    gradient: string;
    glow: string;
  };
  icon: React.ElementType;
  domainIcon: React.ElementType;
  executiveSummary: string;
  targetClient: string;
  stages: TransformationStage[];
}

const PILLARS_DATA: Record<GrowthPillar, CaseStudyPillarData> = {
  business: {
    id: 'business',
    domainLabel: 'Tier-1 Banking • DevSecOps & RAG',
    title: 'Business Growth & Revenue Scaling',
    tagline: 'Standard Chartered Bank: Slashing 45 hrs/week Compliance Toil to 1.8 Minutes',
    badge: '-88% Review Latency',
    colorScheme: {
      primary: 'text-emerald-400',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      gradient: 'from-emerald-400 via-teal-300 to-cyan-400',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.2)]'
    },
    icon: TrendingUp,
    domainIcon: Building2,
    executiveSummary: 'Transforming legacy compliance cost centers into agile, autonomous AI profit engines. How Bala reduced 45 hours/week of manual engineering compliance to under 2 minutes, unblocking 400+ enterprise repositories at Standard Chartered.',
    targetClient: 'Standard Chartered Bank Global Cloud Governance',
    stages: [
      {
        stepNumber: '01',
        stageTitle: 'The Business Bottleneck',
        state: 'problem',
        subtitle: 'Manual Compliance Audits Paralyzing Releases',
        narrative: 'Over 400+ Azure DevOps repositories required multi-tier manual security sign-offs. Engineering squads sat in 4-5 day deployment backlogs, spending $350k+ annually on repetitive verification toil.',
        enterpriseContext: 'Standard Chartered Global Cloud Infrastructure',
        metricsPill: { label: 'Audit Backlog', value: '45 hrs / week', delta: 'High Friction', positive: false },
        architecturalAction: 'Mapped 100% of regulatory banking security rules into structured Abstract Syntax Trees (AST) vectors.',
        codeSnippet: `// Problem: Manual audit queues blocking release trains
const releaseStatus = await checkManualApprovalQueue({
  repoCount: 400,
  avgQueueLatencyHours: 96,
  auditCostAnnualUSD: 350000
});`,
        highlightTokens: ['Manual Toil', '96hr Lag', '$350k Drag']
      },
      {
        stepNumber: '02',
        stageTitle: 'The Architectural Catalyst',
        state: 'catalyst',
        subtitle: 'Hybrid Vector-AST Verification Gate',
        narrative: 'Engineered an autonomous AI validation pipeline combining Abstract Syntax Tree code parsers with semantic vector retrieval to instantly analyze Terraform, Bicep, and Dockerfile changes at PR creation.',
        enterpriseContext: 'Azure DevOps CI/CD Native Middleware',
        metricsPill: { label: 'Automated Check Coverage', value: '100% Repos', delta: 'Zero Manual Wait', positive: true },
        architecturalAction: 'Embedded semantic RAG directly inside Azure DevOps pre-merge gates with sub-second feedback.',
        codeSnippet: `// Bala's Engine: Autonomous AST + RAG Verification
export async function verifyInfrastructurePolicy(iacTree: ASTNode) {
  const policyVectors = await vectorStore.similaritySearch(iacTree.toEmbeddings());
  const evaluation = await ragEvaluator.gradeCompliance(iacTree, policyVectors);
  return evaluation.isCompliant ? approvePR() : generateAutoFix(evaluation.diff);
}`,
        highlightTokens: ['Hybrid RAG', 'AST Parsing', 'Auto-Fix Diffs']
      },
      {
        stepNumber: '03',
        stageTitle: 'The Enterprise Transformation',
        state: 'architecture',
        subtitle: 'Autonomous CI/CD Self-Healing',
        narrative: 'When misconfigurations occurred (e.g. unencrypted S3 buckets, open ingress ports), the system did not just reject the PR—it synthesized and committed pull-request remediation patches automatically.',
        enterpriseContext: '400+ Production Repositories Live Synchronized',
        metricsPill: { label: 'False Alarm Noise', value: '4.2%', delta: '-77% Noise Slashed', positive: true },
        architecturalAction: 'Zero-downtime deployment across global clusters with SOC2/ISO banking compliance audit trails.',
        codeSnippet: `// Autonomous Remediation Pipeline
const autoRemediation = await agentSwarm.executeFix({
  detectedAnomaly: "OPEN_INGRESS_CIDR_0.0.0.0",
  targetIaC: "terraform/network.tf",
  signedBy: "AI-DevSecOps-Engine@scb"
});`,
        highlightTokens: ['Self-Healing', 'Instant PR Fix', 'SOC2 Compliant']
      },
      {
        stepNumber: '04',
        stageTitle: 'The Growth & Scaled Outcome',
        state: 'outcome',
        subtitle: '15-Minute Audits Cut to 1.8 Minutes (10x Velocity)',
        narrative: 'Slashed review turnaround from 15 minutes down to 1.8 minutes per verification. Freed 2,000+ engineering hours annually and recognized with the prestigious "Best Performer of the Year 2024" award.',
        enterpriseContext: 'Global Bank Wide Adoption & Award Recognition',
        metricsPill: { label: 'Audit Review Time', value: '1.8 min', delta: '-88% Time Slashed', positive: true },
        architecturalAction: 'Continuous 24/7 autonomous governance with 100% audit logging for internal and external banking regulators.',
        codeSnippet: `// Verified Production Business Outcome
export const SCB_IMPACT_METRICS = {
  reviewLatencyReduction: "-88%",
  falsePositiveReduction: "-77%",
  annualEngineeringHoursSaved: "2,000+ hrs",
  award: "Best Performer of the Year 2024"
};`,
        highlightTokens: ['-88% Latency', 'Award Winner', '$1.2M Value']
      }
    ]
  },
  innovation: {
    id: 'innovation',
    domainLabel: 'Agritech • 0MB Offline Edge ML',
    title: 'Edge AI Innovation & 0MB Network ML',
    tagline: 'Crop Doctor: 68ms On-Device Neural Diagnostics for 2,000,000+ Rural Farmers',
    badge: '27x Speedup (68ms)',
    colorScheme: {
      primary: 'text-violet-400',
      border: 'border-violet-500/30',
      badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      gradient: 'from-violet-400 via-fuchsia-300 to-cyan-400',
      glow: 'shadow-[0_0_25px_rgba(139,92,246,0.2)]'
    },
    icon: Lightbulb,
    domainIcon: Sprout,
    executiveSummary: 'Compressing multi-gigabyte neural networks into sub-15MB edge runtimes. How Bala built "Crop Doctor", enabling 2,000,000+ farmers across rural India to diagnose plant pathologies in 68ms with zero internet connection.',
    targetClient: 'Bighaat Crop Doctor & 2M+ Active Rural Farmers',
    stages: [
      {
        stepNumber: '01',
        stageTitle: 'The Innovation Barrier',
        state: 'problem',
        subtitle: 'Cloud AI Failure in Remote 2G/3G Farmland',
        narrative: 'Farmers in remote regions suffered 25-30% seasonal crop loss due to delayed disease identification. Existing cloud computer vision models required high-bandwidth uploads that continuously timed out.',
        enterpriseContext: 'Rural Agricultural Belt (2G & Zero Connectivity)',
        metricsPill: { label: 'Cloud Request Failure', value: '62% Drops', delta: 'Unreliable', positive: false },
        architecturalAction: 'Audited the compute and memory profile of low-cost Android smartphones ($80 budget tier).',
        codeSnippet: `// The Failure: Cloud-dependent image streaming
const diagnosisResult = await fetchCloudModel({
  imagePayload: "4K_Leaf_Disease.jpg",
  networkStatus: "2G_PATCHY",
  timeoutMs: 15000 // Fails 62% of the time in field
});`,
        highlightTokens: ['62% Failures', '2G Timeout', 'Crop Loss']
      },
      {
        stepNumber: '02',
        stageTitle: 'Neural Model Compression',
        state: 'catalyst',
        subtitle: 'INT8 Post-Training Quantization & Pruning',
        narrative: 'Engineered lightweight MobileNetV3 and ShuffleNet architectures, stripping redundant layers and quantizing FP32 floating weights into INT8 8-bit integers without sacrificing pathology classification accuracy.',
        enterpriseContext: 'PyTorch to TensorFlow Lite Neural Compiler',
        metricsPill: { label: 'Model Size Compressed', value: '12.4 MB', delta: '-82% Memory Footprint', positive: true },
        architecturalAction: 'Built custom Android NDK camera pipeline for real-time OpenCV pre-processing on the device ISP.',
        codeSnippet: `// Quantization & Neural Pruning Pipeline
const quantizedModel = await tfliteConverter.convert({
  sourceModel: "pytorch_crop_disease_v4.pt",
  optimizations: [Optimization.DEFAULT],
  targetPrecision: "INT8_INTEGER",
  hardwareAcceleration: "NNAPI_DELEGATE"
});`,
        highlightTokens: ['INT8 Precision', '12.4MB Footprint', 'NNAPI Delegate']
      },
      {
        stepNumber: '03',
        stageTitle: 'Edge Hardware Acceleration',
        state: 'architecture',
        subtitle: 'Sub-70ms Real-Time Viewfinder Classification',
        narrative: 'Integrated Android NNAPI and GPU delegates, enabling instant diagnostic bounding boxes as the farmer pans their camera over diseased crops in harsh sunlight.',
        enterpriseContext: 'On-Device Android NDK & Hexagon DSP Engine',
        metricsPill: { label: 'Edge Inference Latency', value: '68 ms', delta: '27x Faster Execution', positive: true },
        architecturalAction: 'Eliminated all server dependency—0MB network transfer per diagnosis.',
        codeSnippet: `// 100% Offline Viewfinder Diagnostic Loop
export function onCameraFrame(frameBytes: Uint8Array) {
  const normalizedTensor = openCV.fastPreprocess(frameBytes);
  const prediction = localTfliteInterpreter.run(normalizedTensor);
  return { disease: prediction.topLabel, confidence: 0.948, latencyMs: 68 };
}`,
        highlightTokens: ['68ms Real-Time', '0MB Network', 'OpenCV Native']
      },
      {
        stepNumber: '04',
        stageTitle: 'Massive Scaled Agritech Impact',
        state: 'outcome',
        subtitle: 'Over 2,000,000+ Farmers Empowered',
        narrative: 'Scaled across 2M+ active farmers, boosting harvest yields and saving millions of dollars in crop value with 94.8% Top-1 pathology accuracy across 30+ crop types.',
        enterpriseContext: 'India-Wide Agritech Scale Across 14 Regional Languages',
        metricsPill: { label: 'Active Farm Reach', value: '2,000,000+', delta: '+23.6% Accuracy', positive: true },
        architecturalAction: 'Delivered localized multi-lingual treatment instructions stored in offline SQLite databases.',
        codeSnippet: `// Production Scaled Reach Metrics
export const CROP_DOCTOR_SCALE = {
  activeFarmers: "2,000,000+",
  top1Accuracy: "94.8%",
  cloudServerCost: "$0.00 / Diagnosis",
  languagesSupported: 14
};`,
        highlightTokens: ['2M+ Farmers', '$0 Cloud Cost', '94.8% Accuracy']
      }
    ]
  },
  problem_solving: {
    id: 'problem_solving',
    domainLabel: 'Healthcare • Ambient Clinical NLP',
    title: 'Mission-Critical Clinical NLP',
    tagline: 'Phraze Health: Ambient Scribe Cutting Doctor Documentation from 15.5m to 1.8m',
    badge: '98.2% NER Precision',
    colorScheme: {
      primary: 'text-cyan-400',
      border: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      gradient: 'from-cyan-400 via-blue-300 to-indigo-400',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.2)]'
    },
    icon: Target,
    domainIcon: HeartPulse,
    executiveSummary: 'Tackling complex speech acoustics and high-entropy clinical terminology. How Bala engineered real-time Medical Named Entity Recognition and ambient acoustic scribing to eliminate doctor burnout.',
    targetClient: 'Medosys & Phraze Health Clinical Environments',
    stages: [
      {
        stepNumber: '01',
        stageTitle: 'The Clinical Crisis',
        state: 'problem',
        subtitle: '15 Minutes of EHR Typing per Patient Consultation',
        narrative: 'Physicians spent over 50% of their day manually typing symptoms, ICD-10 diagnostic codes, and medication dosages into Electronic Health Record (EHR) software, causing severe burnout.',
        enterpriseContext: 'Outpatient Hospital Clinics & Examination Rooms',
        metricsPill: { label: 'Documentation Overhead', value: '15.5 min / pt', delta: 'Burnout Crisis', positive: false },
        architecturalAction: 'Identified noisy room acoustics and doctor-patient dialogue overlap as core challenges.',
        codeSnippet: `// Problem: Clinicians overwhelmed by EHR typing
const clinicStatus = {
  consultationTimeMin: 10,
  ehrDocumentationTimeMin: 15.5,
  maxDailyPatientCapacity: 14,
  physicianBurnoutRate: "High"
};`,
        highlightTokens: ['15.5min Typing', '14 Pt Ceiling', 'Severe Burnout']
      },
      {
        stepNumber: '02',
        stageTitle: 'Acoustic AI & Medical NER',
        state: 'catalyst',
        subtitle: 'Streaming Speech-to-Structured-Clinical Entity Graph',
        narrative: 'Engineered a streaming acoustic model that separates doctor and patient voices, coupled with a fine-tuned clinical transformer trained on 12,000+ medical pharmacology and ICD-10 taxonomy terms.',
        enterpriseContext: 'HIPAA & GDPR Compliant Medical NLP Pipeline',
        metricsPill: { label: 'Medical Entity Extraction', value: '98.2% Precision', delta: '+16.2% Accuracy', positive: true },
        architecturalAction: 'Built zero-retention memory buffers to satisfy medical privacy regulations.',
        codeSnippet: `// Medical Named Entity Recognition (NER)
export async function extractClinicalEntities(rawAudioStream: AudioBuffer) {
  const transcript = await acousticDiarizer.transcribe(rawAudioStream);
  const entities = await clinicalTransformer.extract({
    text: transcript,
    taxonomies: ["ICD-10", "RxNorm", "SNOMED-CT"]
  });
  return entities;
}`,
        highlightTokens: ['Diarization', 'ICD-10 Taxonomy', 'RxNorm Precision']
      },
      {
        stepNumber: '03',
        stageTitle: 'Ambient Chart Synthesis',
        state: 'architecture',
        subtitle: 'Instant SOAP Note Generation',
        narrative: 'The system synthesizes structured SOAP (Subjective, Objective, Assessment, Plan) clinical notes directly inside the hospital EHR in real-time, requiring only a 5-second doctor glance to sign off.',
        enterpriseContext: 'Direct HL7 / FHIR Integration with Hospital Systems',
        metricsPill: { label: 'Chart Drafting Time', value: '1.8 min', delta: '-88% Time Slashed', positive: true },
        architecturalAction: 'Integrated FHIR APIs for automatic push to hospital database records.',
        codeSnippet: `// Structured SOAP Note Synthesis & FHIR Push
const soapNote = await chartSynthesizer.generateSOAP({
  subjective: clinicalEntities.symptoms,
  objective: clinicalEntities.vitals,
  assessment: clinicalEntities.diagnoses,
  plan: clinicalEntities.prescriptions
});
await fhirClient.pushObservation(soapNote);`,
        highlightTokens: ['SOAP Notes', 'FHIR Protocol', 'One-Click Sign']
      },
      {
        stepNumber: '04',
        stageTitle: 'Clinical Throughput Transformed',
        state: 'outcome',
        subtitle: 'Patient Capacity Boosted by +50% Daily',
        narrative: 'Clinicians increased consultation throughput from 14 to 21 patients per day while finishing on time without after-hours charting, giving doctors their patient connection back.',
        enterpriseContext: 'Adopted Across Multidisciplinary Outpatient Clinics',
        metricsPill: { label: 'Daily Patient Capacity', value: '21 pts / day', delta: '+50% Clinic Throughput', positive: true },
        architecturalAction: 'Zero manual transcription backlogs across deployed clinical departments.',
        codeSnippet: `// Impact Metrics: Clinical Scribe
export const PHRAZE_HEALTH_OUTCOMES = {
  documentationTimePerPatient: "1.8 min (-88%)",
  dailyPatientCapacity: "+50% (from 14 to 21)",
  nerPrescriptionAccuracy: "98.2%",
  physicianSatisfactionScore: "9.8 / 10"
};`,
        highlightTokens: ['+50% Patients', '1.8min Charting', '9.8/10 Rating']
      }
    ]
  }
};

export default function AIWorkflowAcademy() {
  const [activePillar, setActivePillar] = useState<GrowthPillar>('business');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const currentPillarData = PILLARS_DATA[activePillar];
  const currentStage = currentPillarData.stages[activeStageIndex];

  const handleSelectPillar = (pillarId: GrowthPillar) => {
    setActivePillar(pillarId);
    setActiveStageIndex(0);
  };

  const handleNextStage = () => {
    setActiveStageIndex((prev) => (prev + 1) % currentPillarData.stages.length);
  };

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => (prev === 0 ? currentPillarData.stages.length - 1 : prev - 1));
  };

  return (
    <section id="ai-case-animation" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-t border-b border-white/5 z-20">
      <WaterWaveEffect variant="center" color="cyan" />

      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* SHORT, CATCHY SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 tracking-widest uppercase relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/20">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 animate-[pulse_3s_infinite]" />
            <span className="relative flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Live Interactive Production Simulators
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Bala&apos;s Production AI <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              In Live Action
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
            Test-drive real-time interactive simulations demonstrating quantified production AI impact across <span className="text-emerald-400 font-bold">Tier-1 Banking</span>, <span className="text-violet-400 font-bold">Offline Edge Agritech</span>, and <span className="text-cyan-400 font-bold">Ambient Healthcare</span>.
          </p>
        </div>

        {/* 3 DOMAIN PILLAR TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(PILLARS_DATA) as GrowthPillar[]).map((pillarKey) => {
            const pillar = PILLARS_DATA[pillarKey];
            const DomainIcon = pillar.domainIcon;
            const isSelected = activePillar === pillarKey;

            return (
              <button
                key={pillar.id}
                onClick={() => handleSelectPillar(pillarKey)}
                className={`p-5 sm:p-6 rounded-3xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between gap-4 relative overflow-hidden group ${
                  isSelected
                    ? `bg-slate-900/90 ${pillar.colorScheme.border} ${pillar.colorScheme.glow} ring-1 ring-white/20`
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${pillar.colorScheme.badgeBg}`}>
                    {pillar.badge}
                  </span>
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border transition-colors ${
                    isSelected ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <DomainIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {pillar.domainLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                  <span className="truncate max-w-[200px]">{pillar.targetClient}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activePillarTabGlow"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* DOMAIN SIMULATOR & STEP WALKTHROUGH DECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLS: REALISTIC DOMAIN INTERACTIVE SIMULATOR */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {activePillar === 'business' && (
                <motion.div
                  key="sim-banking"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <BankingDevSecOpsSimulator />
                </motion.div>
              )}

              {activePillar === 'innovation' && (
                <motion.div
                  key="sim-agri"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <AgricultureEdgeVisionSimulator />
                </motion.div>
              )}

              {activePillar === 'problem_solving' && (
                <motion.div
                  key="sim-health"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <HealthcareClinicalScribeSimulator />
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE TIMELINE SELECTOR CHIPS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentPillarData.stages.map((stg, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stg.stepNumber}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                      isActive
                        ? 'bg-slate-900 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {stg.stepNumber}
                      </span>
                      <span className="text-[9px] uppercase text-slate-500">
                        {stg.state}
                      </span>
                    </div>
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {stg.stageTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT 5 COLS: DEEP-DIVE NARRATIVE & CODE REPOSITORY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar + '-' + currentStage.stepNumber}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 flex flex-col gap-5 relative overflow-hidden text-left bg-slate-900/60 shadow-xl"
              >
                {/* State Tag & Enterprise Banner */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage {currentStage.stepNumber} • {currentStage.state.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {currentStage.enterpriseContext}
                  </span>
                </div>

                {/* Main Narrative */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {currentStage.stageTitle}
                  </h4>
                  <p className="text-xs font-mono text-cyan-400">
                    {currentStage.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                    {currentStage.narrative}
                  </p>
                </div>

                {/* Quantified Metrics Highlight Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {currentStage.metricsPill.label}
                    </span>
                    <span className="text-base sm:text-lg font-black text-white font-mono mt-0.5">
                      {currentStage.metricsPill.value}
                    </span>
                  </div>

                  <div className={`px-3 py-1 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 ${
                    currentStage.metricsPill.positive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    {currentStage.metricsPill.positive ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Activity className="w-3.5 h-3.5" />
                    )}
                    <span>{currentStage.metricsPill.delta}</span>
                  </div>
                </div>

                {/* Architectural Action Taken */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    Bala's Architectural Solution
                  </span>
                  <p className="text-xs text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-white/5 leading-relaxed">
                    {currentStage.architecturalAction}
                  </p>
                </div>

                {/* Live Code / Engineering Blueprint */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-pink-400" />
                      Engineering Pipeline Blueprint
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">TypeScript / Python</span>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3 border border-white/10 font-mono text-[10px] text-slate-300 overflow-x-auto leading-relaxed max-h-[130px] scrollbar-thin scrollbar-thumb-white/10">
                    <pre><code>{currentStage.codeSnippet}</code></pre>
                  </div>
                </div>

                {/* Step Switch Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={handlePrevStage}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {currentPillarData.stages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStageIndex(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === activeStageIndex ? 'w-5 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextStage}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1 border border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM CTA: DIRECT CONTACT FOR ENTERPRISE ARCHITECTURE */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-tr from-emerald-500/10 via-slate-950 to-cyan-500/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Quantified Production Impact
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Ready to Accelerate Your Enterprise AI Roadmap?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              From slashing manual engineering compliance in banking to deploying 0MB edge runtimes in rural agriculture, let's architect your solution together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
