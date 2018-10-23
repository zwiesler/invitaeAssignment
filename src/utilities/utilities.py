def pandas_dataframe_to_dict(df):
    """
    Converst a Pandas dataframe into dictionary

    :param df: {Pandas dataframe}
    :return: {dict}
    """
    return df.to_dict(orient='records')
