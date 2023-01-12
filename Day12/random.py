class Monkey:
    def __init__(self, items, operation, test):
        self.items = items
        self.operation = operation
        self.test = test

    def __str__(self):
        x = 3 * 3
        print(f'{x}')


monkey = Monkey([10, 20], "3 * 45", "13")
monkey.__str__()
print('hey')
print('hey'.__str__())

zip
