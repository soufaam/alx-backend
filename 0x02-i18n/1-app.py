#!/usr/bin/env python3
"""Basic Flask app"""
from flask import Flask, url_for, render_template, request
from flask_babel import Babel


class Config:
    """Class languages"""
    LANGUAGES = ['en', 'fr']


app = Flask(__name__)
babel = Babel(app)
app.config['BABEL_DEFAULT_LOCALE'] = Config.LANGUAGES[0]
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'


@app.route("/")
def basic():
    """basic Flask app"""
    return render_template('1-index.html')
