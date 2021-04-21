from flask import Flask
import csv
import json

app = Flask(__name__)


@app.route('/<string:name>')
def hello_world(name):
    return 'Hello, ' + name


@app.route('/get_map_data/<string:feature>')
def get_map_data(feature):
    with open('data/final.csv') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        print(data)
        first_line = True
        result = []
        feature_index = 0
        for row in data:
            if first_line:
                feature_index = row.index(feature)
                first_line = False
            else:
                result.append({
                    "country": row[2],
                    feature: row[feature_index]
                })
    return json.dumps(result)


if __name__ == "__main__":
    app.run(debug=True)
