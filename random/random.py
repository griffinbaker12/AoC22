import re
data = "[A] [C] [D]"

# get the letters out of them
# start at the first index and get every fourth
a, b, c = data[1::4]
print(a, b, c)

# lambdas are like arrow funcs in js (anonymous functions)
c = [1, 2, 3, 4, 5]
print(list(map(lambda x: x + 2, c)))

# x, y = map(int, input("enter two numbers sep by a space: ").split())
# print(x, y)

x = 2 + 3j
print(x * 1j)
print(int(x.real))
print(x.imag)

a = [1, 2, 3, 4, 5, 6]
# every other until the end
print(a[0::2])
print(a[:3:2], 'the third one')
print(a[::-2])

a = [1, 2]
print(sum(a))

print(list(map(int, re.findall(r"\d+", '1 3 5'))))

# [5,7]
# [9,8]
