import os
from flask import Flask, render_template

template_dir = os.path.abspath('')
app = Flask(__name__, template_folder=template_dir, static_url_path=template_dir, static_folder='')

@app.route('/')
def server():
    return render_template('index.html')