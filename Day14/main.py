b = set()

abyss = 0
# the map function takes a function to map over an iterator (func, iterator)
# returns a map object that then you can turn into a set or array

# this goes over each line that we read in from stdin (which we pass using |)
# cat input.txt | python main.py
for line in open(0):
    x = [list(map(int, p.split(","))) for p in line.strip().split(" -> ")]
    print(x, 'the line is')
    # [[498, 4], [498, 6], [496, 6]] => x
    # [[498, 6], [496, 6]] => x[1:]
    # zip returns an iterator of tuples based on the iterable objects passed to it, so you don't have to convert to list
    # print(list(zip(x, x[1:])), 'zipped list')
    # for i in range(len(x) - 1):
    #     x1, y1 = x[i]
    #     x2, y2 = x[i+1]
    #     print(x1, y1, x2, y2)
    for (x1, y1), (x2, y2) in zip(x, x[1:]):
        x1, x2 = sorted([x1, x2])
        y1, y2 = sorted([y1, y2])
        print(x1, y1, x2, y2)
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                b.add(f'{x}-{y}')
                abyss = max(abyss, y + 1)

t = 0
hitAbyss = False
while not hitAbyss:
    x = 500
    y = 0
    while True:
        if y == abyss:
            hitAbyss = True
            break
        if f'{x}-{y+1}' not in b:
            y += 1
            continue
        if f'{x-1}-{y+1}' not in b:
            x -= 1
            y += 1
            continue
        if f'{x+1}-{y+1}' not in b:
            x += 1
            y += 1
            continue
        t += 1
        b.add(f'{x}-{y}')
        break
print(t)
