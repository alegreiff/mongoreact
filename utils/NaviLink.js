import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export const NaviLink = ({
  enlace = "",
  nombre = "nameme",
  handleCloseNavMenu,
}) => {
  const router = useRouter();

  return (
    <Link href={enlace}>
      <a>
        <Button
          className={router.pathname == enlace ? "active" : ""}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {nombre}
        </Button>
      </a>
    </Link>
  );
};
