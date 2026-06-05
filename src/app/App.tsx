import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TestChat } from "./components/TestChat"; // TEST-CHAT (removable)

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <TestChat /> {/* TEST-CHAT (removable): delete this + the import above */}
    </>
  );
}