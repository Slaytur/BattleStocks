import json
import random
from matplotlib import pyplot as plt
import numpy as np

with open('stocks.json') as f:
    stocks = json.load(f)

with open("events.json") as f:
    events = json.load(f)
    
with open("scenarios.json") as f:
    scenarios = json.load(f)

def get_random_stocks():
    stock_catagories = list(stocks.keys())
    choices = random.choices(stock_catagories, k=4)
    return {catagory:random.choices(stocks[catagory]['stocks'], k=3) for catagory in choices}

class Stock:
    current_value = 0
    previous_value = 0
    history = []
    drift = 0.000
    volatility = 0.02
    jump = 0
    min1month = 0
    max1month = 0
    average1month = 0
    peratio2month = 0#current_value/(current_value - previous_value)

def get_event():
    choice = random.choice(list(events.keys()))
    return events[choice]['text'], events[choice]['effects'], choice

def get_story(event):
    return scenarios[event]

def get_scenario():
    event, effects, name = get_event()
    story = get_story(name)
    effects = {effect:effects[effect]/3 for effect in effects.keys()}
    return story, effects


def generate_data2(stock):
    # stock settings
    drift = 0.000
    volatility = 0.010
    jump = 0.6

    ## sim settings
    steps = 320
    dt = 0.1
    gaussian_noise = np.random.normal(0, 0.4, steps)

    jump_time = random.randint(0, steps-5)
    print(jump_time)
    # Generate the price path
    hist = [stock]
    for t in range(1, steps):
        price = hist[-1] * np.exp((drift - 0.5 * volatility**2) * dt + volatility * np.sqrt(dt) * gaussian_noise[t])
        if t >= jump_time and t< jump_time+7:
            price *= 1+ 0.05* (jump/7)
        
        hist.append(price)
    return hist

def generate_data1(stock):
    # stock settings
    drift = 0.000
    volatility = 0.010
    jump = 0.6

    ## sim settings
    steps = 320
    dt = 0.1
    gaussian_noise = np.random.normal(0, 0.4, steps)

    jump_time = random.randint(0, steps - 5)
    print(jump_time)
    # Generate the price path
    hist = [stock]
    for t in range(1, steps):
        price = hist[-1] * np.exp((drift - 0.5 * volatility**2) * dt + volatility * np.sqrt(dt) * gaussian_noise[t])
        if t >= jump_time and t < jump_time + 7:
            price *= 1 + 0.05 * (jump / 7)

        # Apply drift pull
        drift_pull_strength = 0.0005  # Adjust this value to control the pull strength
        if price > stock * (1 + 0.1):  # If price is significantly above the initial stock
            price *= (1 - drift_pull_strength * (price / stock - 1))  # pull toward initial stock
        elif price < stock * (1 - 0.1): # if price significantly below initial stock
            price *= (1 + drift_pull_strength * (1 - price / stock)) # pull toward initial stock

        hist.append(price)
    return hist

def generate_data(stock):
    # stock settings
    drift = 0.000
    volatility = 0.010
    jump = 0.0

    ## sim settings
    steps = 320
    dt = 0.1
    gaussian_noise = np.random.normal(0, 0.4, steps)

    jump_time = random.randint(0, steps - 5)
    print(jump_time)

    # Generate the price path
    hist = [stock]
    for t in range(1, steps):
        price = hist[-1] * np.exp((drift - 0.5 * volatility**2) * dt + volatility * np.sqrt(dt) * gaussian_noise[t])
        if t >= jump_time and t < jump_time + 7:
            price *= 1 + 0.05 * (jump / 7)

        # Apply drift pull and limit spikes
        drift_pull_strength = 0.0005  # Adjust this value to control the pull strength
        max_spike = 0.03 # adjust to limit spike amount
        min_spike = -0.03 # adjust to limit spike amount

        change = (price / hist[-1]) -1 # calculate price change since last time step.

        if change > max_spike:
          price = hist[-1] * (1 + max_spike)

        elif change < min_spike:
          price = hist[-1] * (1 + min_spike)

        if price > stock * (1 + 0.1):  # If price is significantly above the initial stock
            price *= (1 - drift_pull_strength * (price / stock - 1))  # pull toward initial stock
        elif price < stock * (1 - 0.1): # if price significantly below initial stock
            price *= (1 + drift_pull_strength * (1 - price / stock)) # pull toward initial stock

        hist.append(price)
    return hist

class Game:
    def __init__(self):
        p1_stocks = get_random_stocks()
        p2_stocks = get_random_stocks()
        scenario_text, scenario_effects = get_scenario()
    
    # def run():
        # get current stock prices/trends, the previous event/the scenario, create news storys. 
        # Send stock prices/statistics, history (graph), news story, and prev event to the clients
        # get stock purchase amount from users
        # randomly select events, and poll user's choice
        # apply event effects to stocks
        # simulate prices

plt.plot(generate_data(1000))
plt.show()