import pandas as pd

from src.utilities.settings import variant_tsv_path, variant_df_gene_col
from src.utilities.utilities import pandas_dataframe_to_dict


class VariantUtilities:

    def __init__(self):
        self.variant_df = None
        self.gene_names = None

    def load_variant_df(self):
        """
        Load TSV file into Pandas dataframe

        :return: {null}
        """
        self.variant_df = pd.read_csv(variant_tsv_path, sep='\t').fillna('-')
        self.gene_names = self.variant_df[variant_df_gene_col].unique().tolist()

    def subset_df_by_gene(self, gene):
        """
        Subset the variant dataframe by the specified gene name

        :param gene: {str} Name of gene
        :return: {dict}
        """
        if self.variant_df is None:
            self.load_variant_df()

        f1 = (self.variant_df[variant_df_gene_col].str.lower() == gene.lower())
        df = self.variant_df[f1]
        return pandas_dataframe_to_dict(df)

    def autosuggest_genes(self, char_):
        """
        Provides a list of genes that matches the text input

        :param char_: {str}
        :return: {list of str}
        """
        if self.variant_df is None:
            self.load_variant_df()

        return [i for i in self.gene_names if i.lower().startswith(char_.lower())]
