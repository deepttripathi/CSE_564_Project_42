import pandas as pd


def mergeCSV(basedir, filename1, filename2, filename3, onColumn):
    data1 = pd.read_csv(basedir + filename1)
    data2 = pd.read_csv(basedir + filename2).drop([])
    data3 = pd.read_csv(basedir + filename3)
    output1 = pd.merge(data1, data2, on=onColumn, how='outer')
    # print(output1)
    output2 = pd.merge(output1, data3, on=onColumn, how='outer').drop(
        ['Unnamed: 0', 'gdp_pc', 'gpi_rank', 'gpi_score'], axis=1)
    # print(output2)
    return output2




def main():
    df = mergeCSV('../data/', 'happiness.csv',
                  'InternetUsers.csv', 'relig_iso.csv', 'country')
    temp=df['Percentage'].str.replace('%','').astype(float)
    df['Percentage']=temp

    temp1=df['Population'].str.replace(',','').astype(float)
    df['Population']=temp1
    print(df['Population'])
    df.to_csv('../data/final.csv')


if __name__ == "__main__":
    main()
