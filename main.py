from flask import Flask
import flask
import pandas as pd
from flask import render_template, request
from sklearn import preprocessing
import numpy as np
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")
    # return "home"


@app.route('/get_map_data/<string:feature>')
def get_map_data(feature):
    data = pd.read_csv("final.csv")
    result_df = data[['country','iso', feature]]
    return result_df.to_json(orient='records')
    # with open('data/final.csv') as csv_file:
    #     data = csv.reader(csv_file, delimiter=',')
    #     first_line = True
    #     result = []
    #     feature_index = 0
    #     for row in data:
    #         if first_line:
    #             feature_index = row.index(feature)
    #             first_line = False
    #         else:
    #             result.append({
    #                 "country": row[2],
    #                 feature: row[feature_index]
    #             })
    # return json.dumps(result)


@app.route('/get_bar_chart_data/<string:country>')
def get_bar_chart_data(country):
    data = pd.read_csv("final.csv")
    country_data = data[data['country'] == country].drop(['Population','Score','Overall rank','country','Internet Users','Population Rank',
    'Internet Rank','iso'],axis=1)
    return country_data.to_json(orient='records')

@app.route('/get_radar_data')
def get_radar_data():
    data = pd.read_csv("final.csv").drop(['Population','Score','Overall rank','Internet Users','Population Rank',
    'Internet Rank','iso'],axis=1)
    return data.to_json(orient='records')


@app.route('/get_internet_data/<string:feature>')
def get_internet_data(feature):
    data = pd.read_csv("final.csv")
    result_df = data[['country', 'Percentage', feature]]
    return result_df.to_json(orient='records')


@app.route('/get_religion_data/<string:feature>')
def get_religion_data(feature):
    data = pd.read_csv("final.csv")
    result_df = data[['country', 'percentage_non_religious', feature]]
    return result_df.to_json(orient='records')


@app.route('/get_color_map/<string:feature>')
def get_color_map(feature):
    data = pd.read_csv("final.csv")
    result_df = data[feature]
    maximum=result_df.max()
    minimum=result_df.min()
    result_df=((result_df-minimum)/(maximum-minimum))*9+1
    jsonObj=data[['country','iso']]
    jsonObj[feature+"_scaled"]=result_df
    return jsonObj.to_json(orient='records')

if __name__ == "__main__":
    app.run(debug=True)
