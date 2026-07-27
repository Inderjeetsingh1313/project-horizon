import type { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export const setNavigator = (nav: NavigateFunction) => {
  navigate = nav;
};

export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    window.location.href = path;
  }
};