import xml.etree.ElementTree as et
import os
import xmltodict

""" base_path = os.path.dirname(os.path.realpath(__file__))
xml_file = os.path.join(base_path, "data\\product_listing.xml")

tree = et.parse(xml_file)

root = tree.getroot()
rez = []
for item in root:
    for plant in item:
        #print(plant.tag, plant.text)
        rez.append()
 """
base_path = os.path.dirname(os.path.realpath(__file__))
xml_file = os.path.join(base_path, "data\\product_listing.xml")

with open(xml_file) as fd:
    doc = xmltodict.parse(fd.read())
    print(doc)