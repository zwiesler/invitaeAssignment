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


@app.route("/gene/<string:gene_name>", methods=['GET'])
@cross_origin()
def get_gene(gene_name):
    data = v.subset_df_by_gene(gene=gene_name)
    return jsonify({'variant_data': data})


@app.route("/autosuggest/<string:char_>", methods=['GET'])
@cross_origin()
def autosuggest_genes(char_):
    data = v.autosuggest_genes(char_=char_)
    return jsonify({'autosuggest_genes': data})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, threaded=True)
