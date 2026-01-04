from openai import OpenAI
import json
from agents.aiAcessControl import isAccessPermitted
from flask import jsonify

MODEL = 'gpt-4o-mini'
openai = OpenAI()

system_prompt = "You are a rubric generator. Your job is to genrate rubrics ONLY related to SYLLABUS from the given text and provide an output in JSON format."
system_prompt += "Genrate Exactly 5 rubrics with a description which should be approximately 280 characters long."
system_prompt += "Follow the exact JSON Structure given in the Example"
system_prompt += "Example: [{ 'rubric': 'Rubric Title', 'description': 'Description of rubric' },{ 'rubric': 'Rubric Title', 'description': 'Description of rubric' },...]"

def generate_rubrics(text: str):

    if isAccessPermitted():

        response = openai.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text}
        ],
            response_format={"type": "json_object"}
        )
        result = response.choices[0].message.content
        return json.loads(result) 
    else :
        return jsonify({"message": 'OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.'})





