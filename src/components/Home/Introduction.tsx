import ButtonArrow from "@/shared/ButtonArrow";
import { Link } from "@tanstack/react-router";

const Introduction = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        About
      </h2>
      <div className="text-sm text-justify leading-[1.7] indent-8 font-apple font-normal">
        Jian is an AWS-certified DevOps Engineer based in Brisbane, Australia,
        specialising in production-grade Kubernetes orchestration (10+ EKS
        clusters across 20+ AWS accounts), Infrastructure as Code with
        Terraform, and high-availability cloud networking. At Flight Centre
        Travel Group, he enhances Developer Experience through automated CI/CD
        pipelines, proactive observability, and AI-augmented workflows using
        Claude Code. Beyond tech, he's a three-time marathoner (Sydney,
        Brisbane, Sunshine Coast), founder of{" "}
        <Link
          to="/projects/$slug"
          params={{ slug: "pacemates" }}
          className="text-pink hover:underline font-semibold"
        >
          Pacemates Run Club
        </Link>
        , and an EAIT Industry Mentor at the University of Queensland. When
        he's not coding, you'll find him behind a camera, at the gym, or
        sharing his journey through reels at{" "}
        <a
          href="https://www.instagram.com/jian.shorts/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink hover:underline font-semibold"
        >
          @jian.shorts
        </a>{" "}
        on Instagram/TikTok.
        <br />
        <br />
        ⬇️ Grab my latest resume{" "}
        <a
          href="/documents/JianYangLee-Resume-June2026.pdf"
          download="JianYangLee-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink hover:underline font-semibold"
        >
          here
        </a>
        .
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <ButtonArrow to="/resume" text="View My Resume" />
        <ButtonArrow to="/books" text="My Bookshelf" />
      </div>
    </div>
  );
};

export default Introduction;
