import csv

with open('names.csv','r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    with open ('new_names.csv','w') as new_file:
        fieldnames = ['numero', 'clave']
        csv_writer = csv.DictWriter(new_file,fieldnames=fieldnames,delimiter="\t")
        csv_writer.writeheader()
        for line in csv_reader:
            del line['desc']
            csv_writer.writerow(line)