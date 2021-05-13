from flask import Flask
import flask
import pandas as pd
from flask import render_template, request
from sklearn import preprocessing
import numpy as np
from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist
from kneed import KneeLocator
from sklearn.preprocessing import StandardScaler



app = Flask(__name__)


new_data = pd.read_csv("final.csv").drop(['country', 'iso','Internet Users', 'Regional indicator'], axis=1)
new_data['Population'] = new_data['Population'].apply(lambda x: x/1000)
new_data.fillna(0, inplace=True)

k = range(1, 10)
clusters = [KMeans(n_clusters=c, init='k-means++').fit(new_data) for c in k]
centr_lst = [cc.cluster_centers_ for cc in clusters]
k_distance = [cdist(new_data, cent, 'euclidean') for cent in centr_lst]
distances = [np.min(kd, axis=1) for kd in k_distance]
avg_within = [np.sum(dist) / new_data.shape[0] for dist in distances]
kn = KneeLocator(k, avg_within, curve='convex', direction='decreasing')
kV=kn.knee

scaler = StandardScaler()
scaled_data = scaler.fit_transform(new_data)

KMeans_pca=KMeans(n_clusters=kV, init="k-means++")
KMeans_pca.fit(scaled_data)

KMeansClusters=KMeans_pca.labels_
new_data["clusterId"] = KMeansClusters
new_data.to_csv("new.csv", index=False)


@app.route('/')
def hello_world():
    return render_template("index.html")
    # return "home"


@app.route('/get_map_data/<string:feature>')
def get_map_data(feature):
    data = pd.read_csv("final.csv")
    result_df = data[['country', 'iso', feature]]
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


@app.route('/get_country_data/<string:country>')
def get_country_data(country):
    data = pd.read_csv("final.csv")
    country_data = data[data['country'] == country].drop(['Population', 'Score', 'Overall rank', 'country', 'Internet Users', 'Population Rank',
                                                          'Internet Rank', 'iso'], axis=1)
    return country_data.to_json(orient='records')

<<<<<<< HEAD

@app.route('/get_radar_data')
def get_radar_data():
    data = pd.read_csv("final.csv").drop(['Population', 'Score', 'Overall rank', 'Internet Users', 'Population Rank',
                                          'Internet Rank', 'iso'], axis=1)
    return data.to_json(orient='records')


@app.route('/get_pcp_data')
def get_pcp_data():
    data = pd.read_csv("final.csv").drop(['Overall rank', 'Internet Users', 'Population Rank',
                                          'Internet Rank', 'iso'], axis=1)
=======
@app.route('/get_scatter_data/<string:feature>')
def get_scatter_data(feature):
    data = pd.read_csv("new.csv")
    # result_df={}
    temp=data[feature]
    result_df = data[[ 'Percentage','percentage_non_religious','clusterId']]
    result_df[feature]=temp
    return result_df.to_json(orient='records')

@app.route('/get_radar_data')
def get_radar_data():
    data = pd.read_csv("final.csv").drop(['Population','Score','Overall rank','Internet Users','Population Rank',
    'Internet Rank','Regional indicator','iso'],axis=1)
>>>>>>> front
    return data.to_json(orient='records')

@app.route('/get_pcp_data')
def get_pcp_data():
    data = pd.read_csv("new.csv").drop(['Overall rank','Population Rank',
    'Internet Rank'],axis=1)
    return data.to_json(orient='records')

@app.route('/get_internet_data/<string:feature>')
def get_internet_data(feature):
    data = pd.read_csv("new.csv")
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
    maximum = result_df.max()
    minimum = result_df.min()
    result_df = ((result_df-minimum)/(maximum-minimum))*9+1
    jsonObj = data[['country', 'iso']]
    jsonObj[feature+"_scaled"] = result_df
    return jsonObj.to_json(orient='records')


if __name__ == "__main__":
    app.run(debug=True)
