import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { StoreState } from "../types";

type MyPersist = (
  config: StateCreator<StoreState>,
  options: PersistOptions<StoreState>
) => StateCreator<StoreState>;

export const useStore = create<StoreState>(
  (persist as MyPersist)(
    (set) => ({
      theme:
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"),

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);

          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
          );

          return { theme: newTheme };
        });
      },

      activeNav: "",
      setActiveNav: (link: string) =>
        set(() => ({
          activeNav: link,
        })),

      clearStore: () =>
        set(() => {
          return {
            activeNav: "",
            theme: "light",
          };
        }),

      username: "",
      setUsername: (name: string) =>
        set(() => ({
          username: name,
        })),
    }),
    {
      name: "app-store",
    }
  )
);
