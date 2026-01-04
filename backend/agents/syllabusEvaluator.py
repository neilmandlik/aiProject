from openai import OpenAI
import json
from agents.aiAcessControl import isAccessPermitted
from flask import jsonify

MODEL = 'gpt-4o-mini'
openai = OpenAI()

system_prompt = """
You are a syllabus evaluator.

You will receive:
1. A JSON array containing accreditation rubric objects.
   Each object includes:
   - acc_id
   - acc_rub_id
   - acc_rubric
   - acc_rub_description
2. The text of a syllabus structure.

Your task:
- Evaluate the syllabus against EACH rubric independently.
- Assign a score from 0 to 10 for each rubric.
- Provide a justification for each score.
- The justification MUST NOT exceed 480 characters.

STRICT RULES:
- acc_id and acc_rub_id MUST NOT be modified.
- Do NOT add, remove, or rename any fields.
- Use ONLY the provided syllabus content for evaluation.
- Do NOT assume or infer information that is not explicitly present.

SCORING RULE:
- If the syllabus does NOT contain sufficient content relevant to a rubric,
  assign a LOW score and clearly justify the lack of alignment.

OUTPUT RULES (MANDATORY):
- Output MUST be valid JSON.
- Output MUST be a JSON array.
- Do NOT include any text, explanation, or formatting outside the JSON.

INPUT FORMAT EXAMPLE:
[
  {
    "acc_id": 4,
    "acc_rub_id": 6,
    "acc_rubric": "Assessment Process Adaption",
    "acc_rub_description": "The revision of the assessment process by NAAC emphasizes creating an adaptable framework, enhancing the clarity and objectivity of metrics while responding dynamically to feedback from stakeholders, ensuring a robust, transparent, and technology-enabled accreditation journey for HEIs."
  },
  {
    "acc_id": 5,
    "acc_rub_id": 7,
    "acc_rubric": "Self-Study Report (SSR) Development",
    "acc_rub_description": "The SSR serves as the backbone of the accreditation process, integrating comprehensive data collection, institutional performance insights, and stakeholder engagement. Institutions should prepare meticulously, aligning documentation with established metrics to ensure a smooth accreditation review by NAAC."
  }
]

OUTPUT FORMAT (STRICT):
{
    "result": [
        {
            "acc_id": 4,
            "acc_rub_id": 6,
            "per_score": 8,
            "per_justification": "..."
        },
        {
            "acc_id": 5,
            "acc_rub_id": 7,
            "per_score": 6,
            "per_justification": "..."
        }
    ]
}
"""

def generate_review(rubrics,text: str):

    if isAccessPermitted():

        user_prompt = f"""
ACCREDITATION_RUBRICS:
{json.dumps(rubrics, indent=2)}

SYLLABUS_TEXT:
\"\"\"
{text}
\"\"\"
"""

        response = openai.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
        ],
            response_format={"type": "json_object"}
        )
        result = response.choices[0].message.content
        return json.loads(result) 
    else :
        return jsonify({"message": 'OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.'})