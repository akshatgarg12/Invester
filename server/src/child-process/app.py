from nsetools import Nse
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import json
nse = Nse()

# return a list of object of stock names and symbols
def get_stocks_list():
    symbols = nse.get_stock_codes()
    stocks_list = []
    for x in symbols:
        obj = {
            "name" : symbols[x],
            "symbol" : x
        }
        stocks_list.append(obj)
    return stocks_list

# returns a list of stock objects which are near to the prefix name
def find_stock(prefix):
    stocks_list = get_stocks_list()
    matches = []
    for stock in stocks_list:
        print(fuzz.ratio(prefix, stock['name']))
        score1 = fuzz.ratio(prefix.lower(), stock['name'].lower())
        score2 = fuzz.ratio(prefix.lower(), stock['symbol'].lower())
        if score1 > 40 or score2 > 50:
            matches.append({'data': stock, 'score' : score1})
        # sort on the basis of the score
    matches.sort(key = lambda x : x['score'], reverse=True)
    # remove the score from data
    suggestions = [x['data'] for x in matches]
    return suggestions

# returns the current prices of stocks, expects a list of symbols as a param
def get_prices(stocks):
    prices = []
    for stock in stocks:
        obj = {}
        if nse.is_valid_code(stock.lower()):
            quote = nse.get_quote(stock.lower())
            lastPrice = quote["lastPrice"]
            obj = {
                'symbol' : stock,
                'market' : "NSE",
                'currentPrice' : lastPrice
            }
        else:
            obj = {
                'symbol' : stock,
                'market' : "NSE",
                'currentPrice' : None
            }
        prices.append(obj)

    return prices

# main function
if __name__ == '__main__':
    print("hello")
    # func call to find stocks

    # x = find_stock("relian")
    # y = json.dumps(x)
    # print(y)

    # func call to get prices
    # prices = get_prices(['RELIANCE', 'WIPRO', 'ADANIPORTS'])
    # print(json.dumps(prices))