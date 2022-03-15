import React from "react";
import { useTranslation } from "react-i18next";
import LOGO from "../../../assets/images/logo.png";
import cx from "classnames";
import { FRONTEND_URL } from "../../../constants/CommonConstants";

import styles from "./header.module.css";

const Header = ({ user }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-200 border-solid">
      <div className="mx-auto px-2 sm:px-6">
        <div className="flex justify-between items-center md:space-x-10">
          <a href={`${FRONTEND_URL}`} className={styles.nav_link}>
            <img src={LOGO} alt="civizen logo" style={{ height: "45px" }} />
          </a>
          <div className="md:hidden">
            <button type="button" className={styles.menu_btn}>
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6 text-indigo-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokwidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex md:items-center space-x-5">
            <a className={styles.nav_link} href={`${FRONTEND_URL}/manage-cv`}>
              {t("manageCV")}
            </a>
            <a className={styles.nav_link} href={`${FRONTEND_URL}/templates`}>
              {t("template")}
            </a>
            {user && (
              <div
                className={cx(styles.nav_user, "flex items-center stroke-2")}
              >
                <a
                  href={`${FRONTEND_URL}/profile/${user?.username}`}
                  title={t("profile")}
                >
                  <img
                    src={user?.avatar_url}
                    className="user-pic w-8 h-8 mr-1 rounded-full"
                    alt="civi"
                  />
                </a>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
