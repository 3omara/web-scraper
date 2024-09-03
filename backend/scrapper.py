from bs4 import BeautifulSoup
import requests
import html

def scrap_url(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html')

    content = ''
    for p in soup.find_all('p'):
        content += BeautifulSoup(str(p), 'html').get_text()

    return (html.unescape(content)).strip()

######### Test ######### 
#print(scrap_url("https://stackoverflow.com/questions/159720/what-is-the-naming-convention-in-python-for-variables-and-functions"))