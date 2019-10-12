#cleans the insignificant data and converts it over to a csv, this is garbage basically
def reformat_data():
    return_list = []
    file = open('data.txt')
    for line in file:
        split_line = line.split(",")
        label = split_line[0][1]
        split_line = split_line[1:]
        # x, y, xold, yold
        last_itr = 4
        csv_with_dupes = []
        for i in range(0, len(split_line), 4):
            new_list = split_line[i:last_itr]
            last_itr += 4
            csv_with_dupes.append(new_list)
        
        #removing "]\n" from the last value in the csv_list so i can check for dupes
        last_val = csv_with_dupes[-1][3]
        if "]" in last_val:
           last_val = last_val[0:len(last_val)-2]
           csv_with_dupes[-1][3] = last_val
        
        #removing dupes next to each other w/ list comprhension
        removed_dupes = [csv_with_dupes[i] for i in range(len(csv_with_dupes)) if (i==0) or csv_with_dupes[i] != csv_with_dupes[i-1]]
        final_list = []
        for l in removed_dupes:
            result = list(map(float, l))
            final_list.append(result)
        return_list.append(label)
        return_list.append(final_list)

    return return_list