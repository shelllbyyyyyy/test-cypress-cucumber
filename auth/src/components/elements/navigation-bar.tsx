import React from "react";
import { Logout } from "@/features/auth/logout";
import Wrapper from "./wrapper";

const NavigationBar = () => {
  return (
    <nav id="navbar" className="w-full h-24">
      <Wrapper classname="flex justify-between items-center">
        <div>My Apps</div>
        <div>
          <Logout />
        </div>
      </Wrapper>
    </nav>
  );
};

export default NavigationBar;
