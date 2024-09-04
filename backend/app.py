from flask import request, jsonify 
from config import app, model
from scraper import scrape_url

@app.route("/")
def home():
    return "web-scraper"

@app.route("/summarize", methods=['POST'])
def summarize():
    content = request.json.get("content")
    if not content:
        return (jsonify({"message":"Missing content..."}), 400)
    
    model_query = "Summarize in a concise and readable way without formatting or new lines: " + content

    summary = model.generate_content(model_query)
    return jsonify({"summary": summary.text}), 200

@app.route("/scrape", methods=['POST'])
def scrape():
    url = request.json.get("url")
    if not url:
        return (jsonify({"message":"Missing url..."}), 400)
    
    result = scrape_url(url)
    if result == "bad request":
        return (jsonify({"message":result}), 400)
    
    return jsonify({"urlContent": result}), 200


if __name__ == "__main__":
    app.run(debug=True)


