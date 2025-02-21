import { ASSETS } from "@/shared/Constants";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Link } from "@tanstack/react-router";

const Introduction = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        About
      </h2>
      <div className="text-sm text-justify leading-[1.7] indent-8 font-display font-normal">
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
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-pink hover:underline font-semibold"
        >
          here
        </a> or {" "}
        <a
          href={`${ASSETS.DOCUMENTS}/resume.pdf`}
          onClick={async (e) => {
            e.preventDefault();
            try {
              const response = await fetch(`${ASSETS.DOCUMENTS}/resume.pdf`);
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "JianYangLee-Resume.pdf";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
            } catch (error) {
              console.error("Download failed:", error);
              // Fallback to direct link if download fails
              window.open(`${ASSETS.DOCUMENTS}/resume.pdf`, "_blank");
            }
          }}
          className="text-pink hover:underline font-semibold"
        >
          download
        </a> it
        .
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/works">
          <button className="bg-[#339995] text-[#eeefef] dark:bg-[#80e7d9] hover:bg-[#339995]/80 dark:hover:bg-[#80e7d9]/80 dark:text-[#313134] transition-all duration-300 rounded-lg py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2 shadow-md">
            <div className="flex items-center justify-center gap-2">
              My Portfolio{" "}
              <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16 }} />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Introduction;
