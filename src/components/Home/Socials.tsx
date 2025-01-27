import SocialButton from "@/components/Home/SocialButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from '@mui/icons-material/X';
import { X } from "@mui/icons-material";

export default function Socials() {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Reach me out!
      </h2>

      <div className="flex flex-col gap-1">
        <SocialButton
          icon={<LinkedInIcon sx={{ fontSize: 20 }} />}
          label="Jian Yang Lee"
          href="https://www.linkedin.com/in/jianyanglee/"
        />
        <SocialButton
          icon={<GitHubIcon sx={{ fontSize: 20 }} />}
          label="@leejyang00"
          href="https://github.com/leejyang00"
        />
        <SocialButton
          icon={<InstagramIcon sx={{ fontSize: 20 }} />}
          label="@jianyangleee"
          href="https://www.linkedin.com/in/jianyanglee/"
        />
        <SocialButton
          icon={<XIcon sx={{ fontSize: 20 }} />}
          label="@jianyangleee"
          href="https://www.linkedin.com/in/jianyanglee/"
        />
      </div>
    </div>
  );
}
