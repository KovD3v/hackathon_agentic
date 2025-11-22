from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.agents.orchestrator import OrchestratorAgent
from app.agents.onboarding import OnboardingAgent

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None

class OnboardingRequest(BaseModel):
    user_id: str
    step: int
    data: Dict[str, Any]

@router.post("/chat")
async def chat(request: ChatRequest):
    orchestrator = OrchestratorAgent()
    routing_decision = await orchestrator.process(request.message)
    
    category = routing_decision.get("category")
    
    # In a real scenario, we would route to the specific agent here.
    # For now, we just return the category and a placeholder response.
    
    return {
        "category": category,
        "response": f"I see you're asking about {category}. I'll connect you with the specialist."
    }

@router.post("/onboarding")
async def onboarding(request: OnboardingRequest):
    agent = OnboardingAgent()
    result = await agent.process(request.model_dump())
    return result
