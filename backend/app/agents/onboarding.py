from typing import Any, Dict, Optional
from app.agents.base import BaseAgent
from app.core.database import supabase

class OnboardingAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Onboarding Specialist",
            role="Onboarding",
            goal="Collect user data and create a personalized profile."
        )

    async def process(self, input_data: Dict[str, Any], context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Processes onboarding steps.
        input_data should contain: 'user_id', 'step', 'data'
        """
        user_id = input_data.get("user_id")
        step = input_data.get("step")
        data = input_data.get("data")

        if not user_id:
            return {"status": "error", "message": "User ID is required"}

        try:
            # Check if profile exists
            profile = supabase.table("profiles").select("*").eq("id", user_id).execute()
            
            if not profile.data:
                # Create initial profile if it doesn't exist
                supabase.table("profiles").insert({"id": user_id}).execute()

            # Update profile based on step
            update_data = {}
            if step == 1: # Basic Info
                update_data = {
                    "age": data.get("age"),
                    "gender": data.get("gender"),
                    "height": data.get("height"),
                    "weight": data.get("weight")
                }
            elif step == 2: # Body Goal
                update_data = {"goals": [data.get("goal")]} # Assuming single goal for now
            elif step == 3: # Experience & Equipment
                update_data = {
                    "experience_level": data.get("experience_level"),
                    "equipment": data.get("equipment")
                }
            elif step == 4: # Dietary Preferences
                update_data = {"allergies": data.get("allergies")}
            
            # Perform update
            if update_data:
                supabase.table("profiles").update(update_data).eq("id", user_id).execute()

            return {"status": "success", "step": step, "message": "Profile updated"}

        except Exception as e:
            return {"status": "error", "message": str(e)}
