import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import ScrollToTop from "@/shared/ScrollToTop";
import PageHeader from "@/shared/PageHeader";
import Tag from "@/shared/Tag";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { ASSETS } from "@/shared/constants";

export const Route = createFileRoute("/resume/")({
  component: ScrollToTop(RouteComponent),
});

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  blurb?: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    role: "DevOps Engineer, Platform Team",
    company: "Flight Centre Travel Group",
    location: "Brisbane, Australia",
    period: "May 2024 — Present",
    bullets: [
      "Architected and maintained a high-availability AWS ecosystem (EKS, ECS, ALB, SG, S3, IAM, R53) across the Leisure pillar's core services",
      "Orchestrated 10+ EKS clusters (30+ nodes) across multi-region environments, consistently maintaining 99.9% uptime",
      "Established Infrastructure-as-Code standards using Terraform for corporate tools including New Relic, Octopus Deploy, GitHub Org, etc",
      "Led ongoing migration of EKS clusters to EKS Auto Mode, streamlining node management and reducing infrastructure maintenance",
      "Led the migration of AWS SSO from Okta to AWS IAM Identity Center across 20+ AWS accounts, redesigning permission sets and access policies to delegate elevated access management to engineering teams",
      "Led the global log migration (WAF, CloudFront, EKS) from FireEye to Google SecOps (SIEM), and implemented AWS GuardDuty Malware Protection, strengthening the security posture for consultant-facing apps",
      "Spearheaded migration of 20+ teams from legacy Rundeck to an Octopus Deploy + Helm ecosystem, reducing deployment errors by 30%",
      "Engineered cross-account and cross-region network topologies, utilising VPC Peering and Endpoints (PrivateLink)",
      "Implemented New Relic Deployment Markers across 20+ applications, reducing MTTR by 15%",
    ],
  },
  {
    role: "Full Stack Engineer, Payments Team",
    company: "Flight Centre Travel Group",
    location: "Brisbane, Australia",
    period: "May 2023 — May 2024",
    bullets: [
      "Developed new features for the Payments Platform and Gift Card Portal, across both frontend & backend — utilising React, TypeScript, SQL, AWS SDK",
      "Integrated with third-party platforms such as Adyen and Salesforce, implementing dynamic dashboards providing Flight Centre consultants with intuitive and actionable insights",
      "Deployed and managed cloud infrastructure as code using AWS CDK — utilising SQS, SNS, Lambda, API Gateway, Route 53, and CloudFront",
      "Leveraged CloudWatch Logs and Splunk for comprehensive debugging, log analysis and testing of applications",
    ],
  },
  {
    role: "Jnr Software Engineer (Employee #20)",
    company: "ProcurePro",
    location: "Brisbane, Australia",
    period: "Sept 2022 — May 2023",
    blurb:
      "Contech SaaS streamlining subcontractor procurement across Australia, UK, and UAE",
    bullets: [
      "Developed Account Profile management page with shareable components — utilising Aurelia TS and PHP framework",
      "Scoped out features on the product roadmap using Epics and User Stories",
      "Wrote effective unit and integration tests using Jest, Cypress and Playwright",
      "Performed QA testing and produced status reports before deploying to Production, with submissions of release notes",
    ],
  },
  {
    role: "Software Engineer (Contract)",
    company: "Algomint",
    location: "Brisbane, Australia",
    period: "May 2022 — Aug 2022",
    blurb:
      "DeFi cross-chain bridge enabling BTC, ETH, and stablecoin interoperability on the Algorand blockchain",
    bullets: [
      "Launched a V1 cross-chain application on Mainnet, offering easy access to mint/redeem $goUSD with $USDC",
      "Deployed crypto exchange dashboard on the Algorand network",
      "Designed reusable components bridging functionality with PyTeal smart contracts",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Space Platform",
    location: "Brisbane, Australia",
    period: "Nov 2021 — Feb 2022",
    blurb:
      "Privacy-first PropTech company providing real-time foot traffic analytics for retail, offices, and precincts",
    bullets: [
      "Developed a responsive demo dashboard with custom reusable React components, utilising Websockets for continuous real-time analytics feeds",
      "Configured login functionality and authorization with Socket.IO-client and JWT Authentication",
      "Developed reusable Chart.js for multi-level building analytics",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "AskDr",
    location: "Singapore",
    period: "June 2021 — Sept 2021",
    blurb:
      "Singapore healthtech platform connecting users with doctor-verified health guidance",
    bullets: [],
  },
];

type Project = {
  title: string;
  org: string;
  bullets: string[];
  stack?: string;
  link?: { slug: string; label: string };
};

const projects: Project[] = [
  {
    title: "AI Financial Analysis Bot — Aemantic",
    org: "Personal Project",
    bullets: [
      "A financial analysis bot generating structured financial insights for US stock tickers, including ROI, aggregates and market fundamentals",
      "Architected a multi-agent system using LangChain to perform automated financial deep-dives and sentiment analysis",
    ],
    stack: "GCP, FastAPI, Vite, LangChain, OpenAI, Yahoo Finance, Supabase",
  },
  {
    title: "GBR Group Co",
    org: "Freelance Developer",
    bullets: [
      "Launched their corporate website gbrgroupco.com, working closely with the Founders",
    ],
    stack: "Vite + React, Cloudflare, Tanstack Router, TailwindCSS, Bun, Material UI",
    link: { slug: "gbrgroupco", label: "Case study" },
  },
  {
    title: "EAIT Industry Mentor",
    org: "University of Queensland",
    bullets: [
      "Mentored two junior engineers over 6 months, providing career guidance and technical training across DevOps practices",
      "Conducted mock interviews and resume reviews to prepare mentees for graduate engineering roles",
    ],
  },
  {
    title: "Pacemates Run Club",
    org: "Founder",
    bullets: [
      "Built a running community of 50+ members, organising weekly training sessions, interval workouts, and race-day events across Brisbane",
    ],
    link: { slug: "pacemates", label: "About the club" },
  },
  {
    title: "HotHack Hackathon",
    org: "Team Leader",
    bullets: [
      "Led a team of 4 and built a streamlined data collection dashboard for artist managers",
      "Presented our ideation to reality of the dashboard at The Precinct @ Fortitude Valley",
    ],
  },
];

const skills: { category: string; items: string[] }[] = [
  {
    category: "Cloud & Platform",
    items: ["AWS (EKS, ECS, VPC, S3, IAM, R53, ACM, ALB/NLB)", "Google Cloud (SecOps SIEM)"],
  },
  {
    category: "Orchestration",
    items: ["Kubernetes", "Docker", "Helm Charts", "Karpenter", "Gateway API"],
  },
  {
    category: "IaC",
    items: ["Terraform", "AWS CloudFormation", "Bash/Python Automation"],
  },
  {
    category: "CI/CD",
    items: ["Octopus Deploy", "GitHub Actions"],
  },
  {
    category: "Observability",
    items: ["New Relic", "Splunk", "Prometheus", "Grafana"],
  },
  {
    category: "Development",
    items: ["Python", "TypeScript", "React", "Node.js", "Go (Golang)"],
  },
  {
    category: "AI",
    items: ["Claude Code", "LangChain", "Model Context Protocol (MCP)"],
  },
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
      {children}
    </h2>
  );
}

function RouteComponent() {
  useEffect(() => {
    document.title = "Resume | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-8 font-apple">
      <PageHeader title="Resume" subpath="/resume" slug="" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 pb-2">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">Jian Yang Lee</h1>
          <p className="text-sm mt-1">
            DevOps Engineer · Brisbane, Australia 🇦🇺
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seeking opportunities in Singapore 🇸🇬
          </p>
        </div>
        <a
          href={`${ASSETS.DOCUMENTS}/JianLee-Resume-June2026-v4.pdf`}
          download="JianYangLee-Resume-June2026-v4.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#339995] text-[#eeefef] dark:bg-[#80e7d9] hover:bg-[#339995]/80 dark:hover:bg-[#80e7d9]/80 dark:text-[#313134] transition-all duration-300 rounded-lg py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2 shadow-md">
            Download PDF <FileDownloadRoundedIcon sx={{ fontSize: 16 }} />
          </button>
        </a>
      </div>

      {/* Profile */}
      <SectionHeading>Profile</SectionHeading>
      <p className="text-sm text-justify leading-[1.7]">
        AWS-certified engineer with experience across full-stack development
        and cloud infrastructure, currently specialising in production-grade
        Kubernetes orchestration (10+ clusters across 20+ AWS accounts),
        Infrastructure as Code (Terraform), and high-availability cloud
        networking. Enhances Developer Experience (DevEx) through automated
        CI/CD pipelines, proactive observability (New Relic, Google SecOps),
        and AI-augmented development workflows using Claude Code.
      </p>

      {/* Experience */}
      <SectionHeading>Experience</SectionHeading>
      <div className="flex flex-col gap-8">
        {experiences.map((exp) => (
          <div key={`${exp.role}-${exp.period}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-x-4">
              <h3 className="text-sm font-bold">{exp.role}</h3>
              <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              {exp.company} · {exp.location}
            </div>
            {exp.blurb && (
              <div className="text-xs italic mt-1 text-gray-700 dark:text-gray-300">
                {exp.blurb}
              </div>
            )}
            {exp.bullets.length > 0 && (
              <ul className="list-disc list-outside pl-5 mt-2 flex flex-col gap-1 text-sm leading-relaxed">
                {exp.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      <SectionHeading>Projects</SectionHeading>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div key={project.title}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-x-4">
              <h3 className="text-sm font-bold">{project.title}</h3>
              <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {project.org}
              </span>
            </div>
            <ul className="list-disc list-outside pl-5 mt-2 flex flex-col gap-1 text-sm leading-relaxed">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {project.stack && (
              <div className="flex flex-row items-start gap-1 mt-2 text-xs">
                <Tag tag="STACK" />
                <span>{project.stack}</span>
              </div>
            )}
            {project.link && (
              <Link
                to="/projects/$slug"
                params={{ slug: project.link.slug }}
                className="text-pink hover:underline font-semibold text-xs mt-1 inline-flex items-center gap-1"
              >
                {project.link.label} <LaunchRoundedIcon sx={{ fontSize: 14 }} />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <SectionHeading>Skills</SectionHeading>
      <div className="flex flex-col gap-3 text-sm">
        {skills.map((group) => (
          <div
            key={group.category}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
          >
            <span className="font-bold w-40 shrink-0">{group.category}</span>
            <div className="flex flex-row flex-wrap gap-y-1">
              {group.items.map((item) => (
                <Tag key={item} tag={item} />
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="font-bold w-40 shrink-0">Certifications</span>
          <span>AWS Solutions Architect – Associate (May 2024)</span>
        </div>
      </div>

      {/* Education */}
      <SectionHeading>Education</SectionHeading>
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-x-4">
          <h3 className="text-sm font-bold">University of Queensland</h3>
          <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Feb 2019 — July 2022
          </span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
          Bachelor of Computer Science, majored in Machine Learning · Brisbane,
          Australia
        </div>
        <ul className="list-disc list-outside pl-5 mt-2 flex flex-col gap-1 text-sm leading-relaxed">
          <li>
            Sponsorship Director of UQ Malaysian's Students' Association
            (UQMSA) — 2021/2022
          </li>
          <li>Virtual Singapore Startup AdVenture with UQ Ventures</li>
          <li>Queensland University Musical Choir (QUMS)</li>
        </ul>
      </div>

      {/* Interests & Languages */}
      <SectionHeading>Interests & Languages</SectionHeading>
      <ul className="list-disc list-outside pl-5 flex flex-col gap-1 text-sm leading-relaxed pb-8">
        <li>
          Endurance sports — TCS Sydney Marathon 2023, Bridge to Brisbane 2024,
          EVA Air Sunshine Coast 2024; training for triathlon
        </li>
        <li>
          Video production — filming (Sony ZV-E10 II) and editing in DaVinci
          Resolve
        </li>
        <li>Financial markets reader — The Edge Malaysia + Singapore</li>
        <li>
          <span className="font-bold">Languages:</span> English (Professional),
          Mandarin (Conversational), Malay (Conversational)
        </li>
      </ul>
    </div>
  );
}
