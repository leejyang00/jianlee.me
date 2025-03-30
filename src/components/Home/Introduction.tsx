import ButtonArrow from "@/shared/ButtonArrow";
import { ASSETS } from "@/shared/Constants";
import { Link } from "@tanstack/react-router";

const Introduction = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        About
      </h2>
      <div className="text-sm text-justify leading-[1.7] indent-8 font-apple font-normal">
        Jian is a DevOps Engineer based in Brisbane, Australia, specializing in
        cloud infrastructure, Kubernetes and CI/CD Automation. With experience
        at Flight Centre and startups, he optimizes SaaS platforms using AWS,
        Terraform, and GitHub Actions. Beyond tech, he’s a three-time marathoner
        (Sydney, Brisbane, Sunshine Coast) and founder of{" "}
        <Link
          to="/works/pacemates"
          className="text-pink hover:underline font-semibold"
        >
          Pacemates Run Club
        </Link>
        . When he's not coding, you’ll find him behind a camera, at the gym, or
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
          href={`${ASSETS.DOCUMENTS}/resume.pdf`}
          download="JianYangLee-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink hover:underline font-semibold"
        >
          here
        </a>.
      </div>
      <div className="flex justify-center mt-4">
        <ButtonArrow to="/books" text="My Bookshelf" />
      </div>
    </div>
  );
};

export default Introduction;
