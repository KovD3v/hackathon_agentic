from typing import Any, Dict, Optional
from app.agents.base import BaseAgent
from openai import OpenAI
from app.core.config import settings
import json

class OrchestratorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Orchestrator",
            role="Manager",
            goal="Route user requests to the appropriate specialist agent."
        )
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    async def process(self, input_data: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Decides which agent should handle the request.
        """
        system_prompt = """
        You are the Orchestrator of a Health Agent team.
        Your job is to classify the user's input into one of the following categories:
        - 'training': Questions about workouts, exercises, gym, fitness.
        - 'nutrition': Questions about food, diet, recipes, meal plans.
        - 'health': Questions about sleep, stress, medical reports, biometrics.
        - 'general': General chat or greeting.
        
        Return ONLY a JSON object with the key 'category'.
        Example: {"category": "training"}
        """

        try:
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": input_data}
                ],
                response_format={"type": "json_object"}
            )
            result = json.loads(response.choices[0].message.content)
            return result
        except Exception as e:
            return {"category": "general", "error": str(e)}
