from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class BaseAgent(ABC):
    def __init__(self, name: str, role: str, goal: str):
        self.name = name
        self.role = role
        self.goal = goal

    @abstractmethod
    async def process(self, input_data: Any, context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Process the input data and return a result.
        """
        pass
