"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ThemeSwitcher = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button className="hover:text-[#3563e9]">
      {currentTheme === "dark" ? (
        <MdLightMode size={24}
          onClick={() => {
            setTheme("light");
          }}
        />
      ) : (
        <MdDarkMode size={24}
          onClick={() => {
            setTheme("dark");
          }}
        />
      )}
    </button>
  );
};
