import { useEffect } from "react";

// Request
import { useGetSettings } from "../../requests/settigns/useSettings";

// Zustand
import { settingsApp } from "../../zustand/app/settings";

export const useSettings = () => {
  const { hasAppSettings, setAppSettings } = settingsApp();

  useEffect(() => {
    if (hasAppSettings) return;
    const f = async () => {
      const res = await useGetSettings();
      setAppSettings(res);
    };
    f();
  }, []);

  return;
};
