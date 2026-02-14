import { History } from "../backend/history.js";
import { ExplainerPrompt } from "../prompts/ExplainerPrompt.js";
import { GeneratorPrompt } from "../prompts/generatorprompt.js";
import { PlannerPrompt } from "../prompts/plannerprompt.js";
import { CallAI } from "../route/agent.js";
import { validateCode } from "../validation/validate.js";

export const PostAiService = async (req, res) => {
  const { message, sessionId } = req.body;
  try {
    if (!message) {
      return res.json({
        msg: "Message is required!",
      });
    }
    if (!sessionId) {
      return res.json({
        msg: "session id is required!",
      });
    }

    if (!History[sessionId]) {
      History[sessionId] = {
        versions: [],
      };
    }

    const session = History[sessionId];

    if (!session.versions) {
      session.versions = [];
    }

    const latestVersion =
      session.versions.length > 0
        ? session.versions[session.versions.length - 1]
        : null;

    const existingcode = latestVersion?.code || "";
    const existingPlan = latestVersion?.plan || "";

    console.log("existing code  : ", existingcode);

    const planTxt = await CallAI(PlannerPrompt(message, existingPlan));
    const desginerTxt = await CallAI(GeneratorPrompt(planTxt, existingcode));
    let valid = validateCode(desginerTxt);
    if (!valid.valid) {
      return res.json({
        status: 400,
        msg: valid.error,
      });
    }
    const explainationTxt = await CallAI(
      ExplainerPrompt(planTxt, existingcode, desginerTxt),
    );

    let newversionnum = session.versions.length + 1;

    session.versions.push({
      versions: newversionnum,
      plan: planTxt,
      code: desginerTxt,
      explanation: explainationTxt,
      userPrompt: message,
    });

    return res.json({
      status: 200,
      plan: planTxt,
      code: desginerTxt,
      explain: explainationTxt,
      histories: session.versions,
    });
  } catch (error) {
    console.log("*********** ", error.message, " **************", error);
    return res.json({
      status: 500,
      msg: "data not submitted",
      error: error.message,
    });
  }
};
