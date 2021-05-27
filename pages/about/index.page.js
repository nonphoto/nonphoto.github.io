import box from "/components/box.js";

export function Page() {
  return {
    children: [
      box({ pos: [100, 100] }),
      { tagName: "a", href: "/", children: "Home" },
    ],
  };
}
