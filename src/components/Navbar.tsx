import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

export function ComplexNavbar({leftAllotmentVisible, setLeftAllotmentVisible}) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <a href="#" className="flex items-center">
          Examples
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <>
    <Navbar
      className="sticky inset-0 z-10 max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 dark:bg-zinc-800"
      data-testid="navbar-top"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography className="text-xl	mr-4 py-1.5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          🦆 GeoDuck
        </Typography>
        <Typography className="truncate text-base	mr-4 py-1.5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Duck infra. Empower your team with geospatial workflows that run on
          the browser.
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block bg-gradient-to-r from-pink-600 to-purple-400 hover:from-pink-500 hover:to-yellow-500"
          >
            <span>Contact</span>
          </Button>
        </div>
      </div>
    </Navbar>

    </>
  );
}
