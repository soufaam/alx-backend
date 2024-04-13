#!/usr/bin/env python3
"""Basic Flask app"""
from flask import Flask, url_for, render_template


app = Flask(__name__)


@app.route("/")
def basic():
    """basic Flask app"""
    return render_template('0-index.html')
