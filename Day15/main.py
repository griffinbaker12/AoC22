# {\displaystyle \left|x_{1}-x_{2}\right|+\left|y_{1}-y_{2}\right|}
# dist = abs(x1 - x2) + abs(y1 = y2)

# sensor at 8,7 and beacon at 2,10
# actually works to go out, and then either down or up as far as you can

# where there is a sensor, there cannot be a beacon, so just create a grid of whether there could not be a beacon (because we are working in the neg sense here)
# and if there is S or B on the first path, then there can't be

import re
cant = set()
known = set()

pattern = re.compile("-?\d+")

Y = 2000000

minX = float("inf")
maxX = float("-inf")

for line in open(0):
    s1, s2, b1, b2 = list(map(int, pattern.findall(line)))

    # literally just take the sensor point, count how many steps you "use" getting up / down to have y = 10, and then from there use the remaining to mark the positions as taken...
    yDist = abs(Y - s2)

    # and then just go each side off of the s1 value with the remaining distance
    # and I think you can just track the min y, and the max y, and then just merge them at the end?
    remainingDist = abs((abs(s1 - b1) + abs(s2 - b2)) - yDist)

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
