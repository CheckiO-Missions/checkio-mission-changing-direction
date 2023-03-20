"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import choice, randint, randrange


def random_test():
    
    answer = randint(5, 20)
    data = [randint(50, 100)]
    e = choice([1, -1])
    for _ in range(answer + 1):
        for _ in range(randint(1, 5)):
            data.append(randrange(data[-1] + e, data[-1] + 4 * e, e))
        e *= -1
    # To respect the precondition that data does not contain negative numbers:
    m = min(data)
    if m < 0:
        m -= randint(0, 10)  # to not always have 0 as min in such case
        data = [n - m for n in data]
    return {"input": [data], "answer": answer}


TESTS = {
    "Basics": [
        {
            "input": [[1, 2, 3, 4, 5]],
            "answer": 0,
        },
        {
            "input": [[1, 2, 3, 2, 1]],
            "answer": 1,
        },
        {
            "input": [[1, 2, 2, 1, 2, 2]],
            "answer": 2,
        }
    ],
    "Extra": [
        {
            "input": [[1, 2, 2, 1, 2, 1, 2]],
            "answer": 4,
        },
        {
            "input": [[1, 2, 3, 5, 4, 2, 5, 7, 8, 3, 2, 1]],
            "answer": 3,
        },
        {
            "input": [[0]],
            "answer": 0,
        },
        {
            "input": [[6, 6, 6, 4, 1, 2, 5, 9, 7, 8, 5, 9, 4, 2, 6]],
            "answer": 7,
        },
        {
            "input": [[5, 4, 9, 10, 10, 10, 10, 3, 8, 5, 1, 9, 9, 4, 1]],
            "answer": 6,
        },
        {
            "input": [[8, 9, 10, 5, 2, 8, 3, 7, 6, 9]],
            "answer": 6,
        },
        {
            "input": [[2, 2, 2, 2, 2, 1]],
            "answer": 0,
        },
        {
            "input": [[3, 3, 3, 4]],
            "answer": 0,
        },
    ],
    "Random": [random_test() for _ in range(10)],
}
