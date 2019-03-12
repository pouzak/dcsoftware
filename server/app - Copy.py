from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
import xml.etree.ElementTree as et
import os

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
file_name = 'product_listing.xml'
full_file = os.path.abspath(os.path.join('data', file_name))

@app.route('/xml', methods=['GET'])
def get_data():
    dom = et.parse(full_file)
    rez = []
    products = dom.findall('PLANT')
    for x in products:
        rez.append(x)
    return jsonify(rez)

    #run server
if __name__ == '__main__':
    app.run(debug=True)
