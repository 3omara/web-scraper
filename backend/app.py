from flask import request, jsonify 
from config import app, model

@app.route("/")
def home():
    return "web-scrapper"

@app.route("/summarize", methods=['POST'])
def summarize():
    content = request.json.get("content")
    model_query = "Summarize in a concise and readable way: " + content

    summary = model.generate_content(model_query)
    return jsonify({"summary": summary.text})

if __name__ == "__main__":
    app.run(debug=True)


