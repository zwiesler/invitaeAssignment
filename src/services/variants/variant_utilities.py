import pandas as pd

from src.utilities.settings import variant_tsv_path, variant_df_gene_col
from src.utilities.utilities import pandas_dataframe_to_dict


class VariantUtilities:

    def __init__(self):
        self.variant_df = None

    def load_variant_df(self):
        """
        Load TSV file into Pandas dataframe

        :return: {null}
        """
        self.variant_df = pd.read_csv(variant_tsv_path, sep='\t').fillna('-')

    def subset_df_by_gene(self, gene):
        """
        Subset the variant dataframe by the specified gene name

        :param gene: {str} Name of gene
        :return: {JSON obj}
        """
        if self.variant_df is None:
            self.load_variant_df()

        f1 = (self.variant_df[variant_df_gene_col] == gene)
        df = self.variant_df[f1]
        return pandas_dataframe_to_dict(df)
