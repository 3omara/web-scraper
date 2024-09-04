from bs4 import BeautifulSoup
import requests
import html

def scrape_url(url):
    page = ''
    
    try:
        page = requests.get(url)
    except Exception as e:
        return "bad request"
    
    soup = BeautifulSoup(page.text, 'html')

    content = ''
    for p in soup.find_all('p'):
        content += BeautifulSoup(str(p), 'html').get_text()

    return (html.unescape(content)).strip()