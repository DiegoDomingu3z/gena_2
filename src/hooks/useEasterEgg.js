import { useEffect } from "react";

export default function useEasterEgg() {
  useEffect(() => {
    console.log(`%c Oh. Hi.`, "color: orange; background-color: black;");
  }, []);
}
