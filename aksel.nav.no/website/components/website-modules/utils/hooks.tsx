import { clientConfig } from "@/sanity/config";
import { _checkAuth } from "@sanity/preview-kit";
import { useEffect, useState } from "react";

export const useCheckAuth = () => {
  const [user, setUser] = useState<boolean>(true);

  useEffect(() => {
    _checkAuth(clientConfig.projectId, null).then(setUser);
  }, []);

  return user;
};

export const useMedia = (media: string): boolean => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(media);

      setIsActive(mediaQueryList.matches);

      const listener = (evt: MediaQueryListEvent) => {
        setIsActive(evt.matches);
      };

      mediaQueryList.addEventListener("change", listener);

      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, [media]);

  return isActive;
};
