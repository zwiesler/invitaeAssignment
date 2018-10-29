import unittest
import pandas as pd

from src.services.variants.variant_utilities import VariantUtilities


class TestVariantUtilties(unittest.TestCase):

    def setUp(self):
        super(TestVariantUtilties, self).setUp()
        self.v = VariantUtilities()
        self.test_data = [['BRCA1'], ['BRCA2'], ['BRAF'], ['EGFR']]
        self.test_cols = ['Gene']

    def tearDown(self):
        pass

    def test_load_variant_df(self):

        self.v.load_variant_df()
        assert self.v.variant_df is not None
        assert self.v.variant_df.columns.tolist() == ["Gene", "Nucleotide Change", "Protein Change", "Other Mappings",
                                                      "Alias", "Transcripts", "Region", "Reported Classification",
                                                      "Inferred Classification", "Source", "Last Evaluated",
                                                      "Last Updated", "URL", "Submitter Comment", "Assembly", "Chr",
                                                      "Genomic Start", "Genomic Stop", "Ref", "Alt", "Accession",
                                                      "Reported Ref", "Reported Alt"]
        assert len(self.v.variant_df.index) == 48515

    def test_subset_df_by_gene(self):

        self.v.variant_df = pd.DataFrame(self.test_data, columns=self.test_cols)
        obj = self.v.subset_df_by_gene(gene='BRAF')
        assert len(obj) == 1
        assert obj[0].values() == ['BRAF']

    def test_autosuggest_genes(self):

        self.v.variant_df = pd.DataFrame(self.test_data, columns=self.test_cols)
        self.v.gene_names = ['BRCA1', 'BRCA2', 'BRAF', 'EGFR']
        gene_list1 = self.v.autosuggest_genes(char_='BR')
        gene_list2 = self.v.autosuggest_genes(char_='BRC')
        assert sorted(gene_list1) == sorted(['BRCA1', 'BRCA2', 'BRAF'])
        assert sorted(gene_list2) == sorted(['BRCA1', 'BRCA2'])

