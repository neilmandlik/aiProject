import os
from dotenv import load_dotenv


load_dotenv(override = True)

open_api_key = os.getenv("OPENAI_API_KEY")

def isAccessPermitted():
    if(open_api_key):
        return True
    return False