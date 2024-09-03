from flask import Flask
from flask_cors import CORS
from openai import OpenAI
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)
genai.configure(api_key=os.environ["API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")