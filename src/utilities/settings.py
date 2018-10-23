import os

data_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../data')
variant_tsv_filename = 'variants.tsv'
variant_tsv_path = os.path.join(data_path, variant_tsv_filename)

# variant data settings
variant_df_gene_col = 'Gene'

# pagination
default_num_rows = 100