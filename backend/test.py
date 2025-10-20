from openai import OpenAI
from dotenv import load_dotenv
import os
import gradio as gr
import pdfplumber

system_prompt = "You are a selective summarizer. Your job is to go through a PDF and just extract the parts which say something about syllabus or curriculum of a university"
system_prompt = "Provide a detailed (around 250 to 300 words) summary in bullet points."



load_dotenv(override = True)
open_api_key = os.getenv("OPENAI_API_KEY")
if open_api_key:
    print("Ready to go")
else:
    print("Failed")


openai = OpenAI()
MODEL = 'gpt-4o-mini'
file_path = './AccreditationPDF/Review_1/abetCriteriaForCompDegrees.pdf'

def extract_text(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def summarize_text(file_path):
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": extract_text(file_path)}
        ]
    )
    return response.choices[0].message.content

print(summarize_text(file_path))



