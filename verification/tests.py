"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [[1, 2, 3, 4, 5]],
            "answer": 0
        },{
            "input": [[1, 2, 3, 2, 1]],
            "answer": 1
        },{
            "input": [[1, 2, 2, 1, 2, 2]],
            "answer": 2
        }
    ],
    "Extra": [
        {
            "input": [[1, 2, 2, 1, 2, 1, 2]],
            "answer": 4
        },
        {
            "input": [[1, 2, 3, 5, 4, 2, 5, 7, 8, 3, 2, 1]],
            "answer": 3
        },
        {
            "input": [[0]],
            "answer": 0
        }
    ]
}
