import React, { forwardRef, HTMLAttributes } from "react";
import HeaderTitle, { HeaderTitleType } from "./HeaderTitle";
import HeaderUser, { HeaderUserType } from "./HeaderUser";
import HeaderDropdown, { HeaderDropdownType } from "./HeaderDropdown";
import cl from "classnames";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Header content
   */
  children: React.ReactNode;
}

interface HeaderComponent
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLElement>
  > {
  Title: HeaderTitleType;
  User: HeaderUserType;
  Dropdown: HeaderDropdownType;
}

const Header = forwardRef(({ className, ...rest }, ref) => (
  <header {...rest} ref={ref} className={cl("navdsi-header", className)} />
)) as HeaderComponent;

Header.Title = HeaderTitle;
Header.User = HeaderUser;
Header.Dropdown = HeaderDropdown;

export default Header;
