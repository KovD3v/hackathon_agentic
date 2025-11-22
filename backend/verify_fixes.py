import sys
import os
sys.path.append(os.getcwd())

from dotenv import load_dotenv
from app.agents.lifestyle import LifestyleStrategist
from app.agents.performance import PerformanceArchitect

load_dotenv()

def test_fixes():
    print("Testing Agent Fixes...")
    
    # Test LifestyleStrategist
    print("\n--- Testing LifestyleStrategist (with user_id) ---")
    try:
        lifestyle_agent = LifestyleStrategist()
        # Mock inputs
        workout_plan = "3 days a week, full body."
        user_preferences = "Cheap, healthy, quick."
        location = "New York"
        budget = "Low"
        user_id = "test_user_123"
        
        result = lifestyle_agent.run(workout_plan, user_preferences, location, budget, user_id)
        print(f"Result length: {len(result)}")
        if "Please provide" in result:
            print("FAILURE: Agent is still asking for info.")
        else:
            print("SUCCESS: Agent ran without asking for user_id.")
            
    except Exception as e:
        print(f"Error testing LifestyleStrategist: {e}")

    # Test PerformanceArchitect
    print("\n--- Testing PerformanceArchitect (without photo) ---")
    try:
        perf_agent = PerformanceArchitect()
        # Mock inputs
        medical_clearance = "Cleared for all activity."
        user_goals = "Build muscle."
        time_constraints = "1 hour per day."
        photo_path = None # Explicitly None
        
        result = perf_agent.run(medical_clearance, user_goals, time_constraints, photo_path)
        print(f"Result length: {len(result)}")
        if "Please provide" in result and "photo" in result:
             print("FAILURE: Agent is still asking for photo.")
        else:
             print("SUCCESS: Agent ran without asking for photo.")

    except Exception as e:
        print(f"Error testing PerformanceArchitect: {e}")

if __name__ == "__main__":
    test_fixes()
