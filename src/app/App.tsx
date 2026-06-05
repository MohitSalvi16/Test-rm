import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { IntroVideo } from "./components/IntroVideo";
import { TestChat } from "./components/TestChat"; // TEST-CHAT (removable)

export default function App() {
  // Show the intro video once per browser session, then load the app (Login).
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem("introPlayed") === "1"
  );

  const finishIntro = () => {
    sessionStorage.setItem("introPlayed", "1");
    setIntroDone(true);
  };

  if (!introDone) return <IntroVideo onDone={finishIntro} />;

  return (
    <>
      <RouterProvider router={router} />
      <TestChat /> {/* TEST-CHAT (removable): delete this + the import above */}
    </>
  );
}