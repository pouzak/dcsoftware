from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
import xml.etree.ElementTree as et
import xmltodict
import json
import os
import pprint
import sqlite3 as sql

#init app
app = Flask(__name__)
app.route('/', methods=['GET'])
basedir = os.path.abspath(os.path.dirname(__file__))

#db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

#init db
db = SQLAlchemy(app)
#init ma
ma = Marshmallow(app)

#sqlite
@app.route('/sql',methods = ['GET'])
def list():
   con = sql.connect("disk.db")
   con.row_factory = sql.Row
   
   cur = con.cursor()
   #cur.execute("select * from IC_Data")
   
   cur.execute("SELECT * FROM sqlite_master")
   
   rows = cur.fetchall()
   for row in rows:
       print(row[2])
   con.close()
   return (jsonify({"msg":"ok"}))
   



##

#product class/model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)

    #constructor
    def __init__(self, name, description, price, qty):
        self.name = name
        self.description = description
        self.price = price
        self.qty = qty


#product schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'price', 'qty')

#init schema
product_schema = ProductSchema(strict=True)
products_schema = ProductSchema(many=True, strict=True)


#create product
@app.route('/product', methods=['POST'])
def add_product():
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']

    new_product = Product(name, description, price, qty)
    db.session.add(new_product)
    db.session.commit()
    return product_schema.jsonify(new_product)

#get all products
@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result.data)

#get single product
@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)

#xml
file_name = 'config.xml'
full_file = os.path.abspath(os.path.join('data', file_name))

@app.route('/xml', methods=['GET'])
def get_data():
    res = "ok"
    return jsonify(rez)

#xml to json
@app.route('/api/cfg', methods=['GET'])
def get_xml():
    with open('config.xml') as fd:
        doc = xmltodict.parse(fd.read())
    #pp = pprint.PrettyPrinter(indent=4)
    #pp.pprint(json.dumps(doc))
    response = jsonify(doc)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/save', methods=['POST'])
def save_xml():
    #with open('config.xml') as fd:
        #doc = xmltodict.parse(fd.read())
    #rez = xmltodict.unparse(item)
    data = request.data
    dataDict = json.loads(data)
    #print(dataDict)
    parsed = xmltodict.unparse(dataDict, pretty=True)
    with open('config.xml', 'w') as file:
        file.write(parsed)
    #return (jsonify(dataDict), 200)
    print('xml parsed')
    return (jsonify(dataDict), 200)

    #run server
if __name__ == '__main__':
    app.run(debug=True)
