from flask import request, jsonify 
from config import app, model
from scrapper import scrap_url

@app.route("/")
def home():
    return "web-scrapper"

@app.route("/summarize", methods=['POST'])
def summarize():
    content = request.json.get("content")
    model_query = "Summarize in a concise and readable way: " + content

    summary = model.generate_content(model_query)
    return jsonify({"summary": summary.text})

@app.route("/scrap", methods=['POST'])
def scrap():
    url = request.json.get("url")

    return jsonify({"urlContent": scrap_url(url)})


if __name__ == "__main__":
    app.run(debug=True)


