# # {\displaystyle \left|x_{1}-x_{2}\right|+\left|y_{1}-y_{2}\right|}
# # dist = abs(x1 - x2) + abs(y1 = y2)

# # sensor at 8,7 and beacon at 2,10
# # actually works to go out, and then either down or up as far as you can

# # where there is a sensor, there cannot be a beacon, so just create a grid of whether there could not be a beacon (because we are working in the neg sense here)
# # and if there is S or B on the first path, then there can't be

import re

pattern = re.compile("-?\d+")

lines = [list(map(int, pattern.findall(line))) for line in open(0)]

Y = 10

minX = float("inf")
maxX = float("-inf")

for s1, s2, b1, b2 in lines:
    # literally just take the sensor point, count how many steps you "use" getting up / down to have y = 10, and then from there use the remaining to mark the positions as taken...
    yDist = abs(Y - s2)

    # and then just go each side off of the s1 value with the remaining distance
    # and I think you can just track the min y, and the max y, and then just merge them at the end?
    d = abs(s1 - b1) + abs(s2 - b2)

    remainingDist = abs(d - yDist)

    if (remainingDist <= 0):
        # we have no distance left so
        continue

    smallerX = s1 - remainingDist
    largerX = s1 + remainingDist

    if (smallerX < minX):
        minX = smallerX
    if (largerX > maxX):
        maxX = largerX

print(abs(minX) + abs(maxX))


# the x and y both canot be lower than 0 and no greater than 4M
# tf = 4M * y
M = 4000000

for Y in range(M + 1):
    intervals = []

    for sx, sy, bx, by in lines:
        d = abs(sx - bx) + abs(sy - by)
        o = d - abs(sy - Y)

        if o < 0:
            continue

        lx = sx - o
        hx = sx + o

        intervals.append((lx, hx))

    intervals.sort()

    q = []

    for lo, hi in intervals:
        if not q:
            q.append([lo, hi])
            continue

        qlo, qhi = q[-1]

        if lo > qhi + 1:
            q.append([lo, hi])
            continue

        q[-1][1] = max(qhi, hi)

    x = 0
    for lo, hi in q:
        if x < lo:
            print(x * 4000000 + Y)
            exit(0)
        x = max(x, hi + 1)
        if x > M:
            break
