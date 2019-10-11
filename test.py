def chunker(seq, size):
    return (seq[pos:pos + size] for pos in range(0, len(seq), size))
asdf = {}
tmp = []
with open("data.txt", "r") as f:
    for line in f:
        line = line.replace('[', '').replace(']', '').strip().split(',')
        key = line[0]
        line.pop(0)
        for group in chunker(line, 4):
            tmp.append(list(map(float, group)))
        print(key)
        # print(tmp)
        if key in asdf:
            asdf[key].append(tmp)
        else:
            asdf[key] = [tmp]
print(asdf)
