import { Router } from "express";
import { PostAiService } from "../service/ai.js";

const AiRoute = Router();

AiRoute.post("/", PostAiService);
export default AiRoute;