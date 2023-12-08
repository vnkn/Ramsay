from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup as bs


def extract_domain(url):
    parsed_url = urlparse(url)
    domain_parts = parsed_url.netloc.split('.')
    subdomain = domain_parts[-3] if len(domain_parts) >= 3 else ''
    main_domain = '.'.join(domain_parts[-2:])
    full_domain = subdomain + '.' + main_domain if subdomain else main_domain
    return full_domain

def extract_from_web(url):
    """Returns the text of a webpage as a string"""
    r = requests.get(url)
    soup = bs(r.content, 'html.parser')

    # matches cooking.nytimes.com
    domain = extract_domain(url)
    if domain == "cooking.nytimes.com":
        ingredients = soup.find('div', class_='ingredients_ingredients__qAcSs')
        ingredients = ingredients.find_all('li')
        ingredients = [" ".join([sp.text for sp in ing.find_all('span')]) for ing in ingredients]

        steps = soup.find('div', class_='recipebody_prep-block__cpC8w')
        steps = steps.find_all('li')
        steps = [" ".join([p.text for p in step.find_all('p')]) for step in steps]

        summary = soup.find('div', class_="pantry--body topnote_topnoteParagraphs__8kAAN").text
        return [(summary + "The ingredients are " + ','.join(ingredients) + "and the steps are " +  ','.join(steps)), True]

    elif domain == "www.seriouseats.com":
        ingredients = soup.find('section', class_='section--ingredients')
        ingredients = ingredients.find_all('li')
        ingredients = [ing.get_text().strip() for ing in ingredients]

        steps = soup.find('section', id="section--instructions_1-0")
        steps = steps.find_all('li')
        steps = [step.get_text().strip() for step in steps]


        summary = soup.find('div', id="article__header--project_1-0")
        summary = summary.find_all('p')
        summary = "\n".join([p.get_text().strip() for p in summary])

        return [(summary + "The ingredients are " +  ','.join(ingredients)  + "and the steps are " + str(steps)), True]


    if soup.article:
        soup = soup.article
    elif soup.main:
        soup = soup.main

    return soup.get_text(), False
    # ingredient_tags = soup.find(lambda tag: tag.text.lower() in ('ingredients', 'ingredients', 'software'))

    # steps_tag = soup.find(lambda tag:  tag.text.lower() in ('preparation', 'steps', 'method', 'directions', 'instructions'))    # 'Modus operandi'

    # if steps_tag:
    #     # Grab the parent element
    #     parent_element = steps_tag.parent

    #     # Do something with the parent element

    #     # Come back to this
    #     return(parent_element.text)

