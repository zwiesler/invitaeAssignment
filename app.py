from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

from src.utilities.settings import default_num_rows
from src.utilities.utilities import pandas_dataframe_to_dict
from src.services.variants.variant_utilities import VariantUtilities

app = Flask(__name__)
CORS(app)

v = VariantUtilities()


@app.route("/")
@cross_origin()
def main():
    v.load_variant_df()
    data = pandas_dataframe_to_dict(v.variant_df.head(default_num_rows))
    return jsonify({'variant_data': data})


@app.route("/gene", methods=['GET'])
@cross_origin()
def get_gene():
    return 'we out here'


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)