from openai import OpenAI
import json
from agents.aiAcessControl import isAccessPermitted
from flask import jsonify

MODEL = 'gpt-4o-mini'
openai = OpenAI()

system_prompt = """
You are a rubric generator.

Your task is to generate rubrics STRICTLY AND ONLY from the provided SYLLABUS text.

ABSOLUTE CONTENT CONSTRAINTS:
- Use ONLY information explicitly present in the syllabus text.
- DO NOT use external knowledge, assumptions, examples, interpretations, or imagination.
- DO NOT reference units, modules, weeks, or syllabus hierarchy labels.
- DO NOT merge related topics unless the syllabus explicitly combines them.
- Each rubric must correspond to a distinct syllabus topic.

RUBRIC GENERATION RULES:
- Generate EXACTLY 5 rubrics — no more, no less.
- Rubric titles MUST be synthesized (not copied verbatim) and clearly reflect syllabus topics.
- Each rubric must map to a DIFFERENT topic.
- Avoid conceptual overlap or repetition across rubrics.

DESCRIPTION RULES:
- The description MUST NOT exceed 350 characters.
- Use factual, neutral, syllabus-aligned language only.
- Preserve syllabus meaning; rephrase only for clarity.
- Do NOT include learning outcomes, instructional phrasing, evaluations, or opinions.
- Do NOT use phrases such as “students will”, “this rubric evaluates”, or “this topic helps”.

FORMAT REQUIREMENTS (CRITICAL):
- Output MUST be valid JSON.
- Output MUST be a JSON array of EXACTLY 5 objects.
- Each object MUST contain ONLY the following keys:
  - "rubric"
  - "description"
- Do NOT add extra keys.
- Do NOT include comments, explanations, markdown, or surrounding text.
- Do NOT wrap the output in code blocks.

STRUCTURE (MUST MATCH EXACTLY):
{
    "rubrics": [
        {
            "rubric": "Rubric Title",
            "description": "Rubric description text"
        }
    ]
}

ORDERING RULE:
- Rubrics must follow the logical order of topics as they appear in the syllabus,
  without referencing the syllabus structure explicitly.

FAILURE HANDLING:
- If fewer than 5 distinct syllabus topics are present, return an EMPTY JSON ARRAY: []
- Do NOT infer, generalize, or fabricate content to reach 5 rubrics.

VALIDATION REQUIREMENT:
- Before outputting, internally verify:
  - Exactly 5 rubric objects exist
  - Each description is within 260–300 characters
  - JSON syntax is valid
- If any validation fails, return an EMPTY JSON ARRAY.

"""

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





