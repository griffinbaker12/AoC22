from collections import deque

valves = {}
tunnels = {}

for line in open(0):
    line = line.strip()
    valve = line.split()[1]
    flow = int(line.split(";")[0].split("=")[1])
    targets = line.split("to ")[1].split(" ", 1)[1].split(", ")
    valves[valve] = flow
    tunnels[valve] = targets

dists = {}

for valve in valves:
    if valve != "AA" and valves[valve]:
        continue

    dists[valve] = {valve: 0, "AA": 0}
    visited = {valve}

    queue = deque([(0, valve)])

    while queue:
        distance, position = queue.popleft()
        for neighbor in tunnels[position]:
            if neighbor in visited:
                continue
            visited.add(neighbor)
            if valves[neighbor]:
                dists[valve][neighbor] = distance + 1
            queue.append((distance + 1, neighbor))

    del dists[valve][valve]
    if valve != "AA":
        del dists[valve]["AA"]

cache = {}


def dfs(time, valve, bitmask):
    maxVal = 0

    for neighbors in dists[valve]:
        remtime = dists[valve][neighbor] - 1
        if remtime <= 0:
            continue
        (remtime, neighbor, bitmask) =

    return maxVal
