# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

# Flask modules
from flask   import render_template, request, redirect, url_for
from jinja2  import TemplateNotFound


from gpt import gpt
# App modules
from app import app

# App main route + generic routing
@app.route('/', defaults={'path': 'index.html'}, methods=['GET', 'POST'])
@app.route('/<path>')
def index(path):
    try:
        segment = get_segment( request )
        if request.method == 'POST':
            food = request.form['food_preference']
            # do stuff with gpt api here
            response = gpt_stuff
            return redirect(url_for('preferences_page'), response=response)
        return render_template( path, segment=segment )
    
    except TemplateNotFound:
        return render_template('page-404.html'), 404


@app.route('/video_form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        budget = request.form['budget']
        video_url = request.form['video_url']

        return redirect(url_for('form_success'))  # Assuming you have a success route/page.

    return render_template('video_form.html')

@app.route('/video_form_success', methods=['GET', 'POST'])
def form_success():
    return render_template('video_form_success.html')


def get_segment( request ): 

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment    

    except:
        return None   
