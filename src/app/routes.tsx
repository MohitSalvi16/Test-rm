import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ComplaintCaptureMethod } from "./components/ComplaintCaptureMethod";
import { ConsentCapture } from "./components/ConsentCapture";
import { VoiceRecording } from "./components/VoiceRecording";
import { AIProcessing } from "./components/AIProcessing";
import { AISummary } from "./components/AISummary";
import { AIClassification } from "./components/AIClassification";
import { SimilarComplaints } from "./components/SimilarComplaints";
import { EscalationRecommendation } from "./components/EscalationRecommendation";
import { EscalationSuccess } from "./components/EscalationSuccess";
import { ComplaintList } from "./components/ComplaintList";
import { ComplaintDetail } from "./components/ComplaintDetail";
import { CustomerList } from "./components/CustomerList";
import { ScreenshotComplaint } from "./components/ScreenshotComplaint";
import { CustomerSelect } from "./components/CustomerSelect";
import { AIResolution } from "./components/AIResolution";
import { ResolutionSuccess } from "./components/ResolutionSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/complaint/method",
    Component: ComplaintCaptureMethod,
  },
  {
    path: "/complaint/consent",
    Component: ConsentCapture,
  },
  {
    path: "/complaint/record",
    Component: VoiceRecording,
  },
  {
    path: "/complaint/processing",
    Component: AIProcessing,
  },
  {
    path: "/complaint/summary",
    Component: AISummary,
  },
  {
    path: "/complaint/classification",
    Component: AIClassification,
  },
  {
    path: "/complaint/similar",
    Component: SimilarComplaints,
  },
  {
    path: "/complaint/escalation",
    Component: EscalationRecommendation,
  },
  {
    path: "/complaint/escalation-success",
    Component: EscalationSuccess,
  },
  {
    path: "/complaint/resolution",
    Component: AIResolution,
  },
  {
    path: "/complaint/resolution-success",
    Component: ResolutionSuccess,
  },
  {
    path: "/customers",
    Component: CustomerList,
  },
  {
    path: "/complaint/customer",
    Component: CustomerSelect,
  },
  {
    path: "/complaint/screenshot",
    Component: ScreenshotComplaint,
  },
  {
    path: "/complaints",
    Component: ComplaintList,
  },
  {
    path: "/complaints/:id",
    Component: ComplaintDetail,
  },
]);
