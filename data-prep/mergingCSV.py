import pandas as pd


def mergeCSV(basedir, filename1, filename2, filename3, filename4, onColumn):
    data1 = pd.read_csv(basedir + filename1)
    data2 = pd.read_csv(basedir + filename2).drop([])
    data3 = pd.read_csv(basedir + filename3)
    data4 = pd.read_csv(basedir + filename4)
    output1 = pd.merge(data1, data2, on=onColumn, how='outer')
    print(output1)
    output2 = pd.merge(output1, data3, on=onColumn, how='outer').drop(
        ['Unnamed: 0', 'gdp_pc', 'gpi_rank', 'gpi_score'], axis=1)
    print(output2)
    output3 = pd.merge(output2, data4, on=onColumn, how='outer')
    print(output3)
    return output3


def main():
    df = mergeCSV('../data/', 'happiness.csv',
                  'InternetUsers.csv', 'relig_iso.csv', 'regional-ind.csv', 'country')

    df.to_csv('../data/final.csv')


if __name__ == "__main__":
    main()
