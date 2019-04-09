from flask import Flask, request, jsonify, g, send_file, send_from_directory
import xml.etree.ElementTree as et
import xmltodict
import json
import os
import pprint
import sqlite3 as sql
import struct


#init app
app = Flask(__name__)
#app = Flask(__name__,  static_folder='build')

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['JSON_SORT_KEYS'] = False

# Serve React App
""" @app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html') """
 

#PLC network, get meter list
@app.route('/api/example',methods = ['GET'])
def list():
   con = sql.connect('disk.db')
   con.row_factory = sql.Row
   
   cur = con.cursor()
   #cur.execute("select * from IC_Data")
   
   cur.execute("SELECT * FROM LogicDevice_Information")
   res = []
   rows = cur.fetchall()
   for row in rows:
       if(row[3] != ''):
            res.append(row[3])
   con.close()
   return (jsonify(res))

   #return (jsonify({"msg":"ok"}))
   



#xml
file_name = 'config.xml'
full_file = os.path.join('data/', file_name)



#xml to json
@app.route('/api/cfg', methods=['GET'])
def get_xml():
    with open(full_file) as fd:
        doc = xmltodict.parse(fd.read())
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
    with open('data/config.xml', 'w') as file:
        file.write(parsed)
    #return (jsonify(dataDict), 200)
    return (jsonify(dataDict), 200)



#PLC stats, get meters list

@app.route('/api/meterslist', methods=['GET'])
def txt():
    con = sql.connect("disk.db")
    con.row_factory = sql.Row
   
    cur = con.cursor()
   #cur.execute("select * from IC_Data")
   
    cur.execute("SELECT * FROM LogicDevice_Information")
    rows = cur.fetchall()

    
    lines = [line.rstrip('\n') for line in open('data/NETWORK_MAP_FILE.txt')]
    stats = [line.rstrip('\n') for line in open('data/STATISTICS.txt')]
    res = []  
    #liness = " ".join(lines[1].split())
    #linesss = liness.split(' ')
    
    statsArray = []
    for line in lines:
        obj = {}
        nospace = " ".join(line.split())
        item = nospace.split(' ')
        obj["name"] = item[0] 
        obj["mac"] = item[1] 
        obj["lnid"] = item[2] 
        obj["availability"] = "0%"
        for row in rows:
            if(row[3] == item[0]):
                obj["fw"] = row[10]

        for stat in stats:
            nospaces = " ".join(stat.split())
            statitem = nospaces.split(' ')
            #statsArray.append(statitem)
            if item[0] == statitem[0]:
                obj["availability"] = statitem[3] + "%"
        
        cur.execute('SELECT IC_Profile_Generic.Name FROM IC_Profile_Generic INNER JOIN LogicDevice_Information ON IC_Profile_Generic.SAP=LogicDevice_Information.SAP WHERE LogicDevice_Information.MeterName = ?', (item[0],))
        profiles = cur.fetchall()
        if(len(profiles) > 1):
            obj['profile'] = True 
        res.append(obj)
    con.close()
    return (jsonify(res), 200)



#get meter name/send billing data

@app.route('/api/billing',methods = ['POST'])
def billing():
    data = request.data
    dataDict = json.loads(data)
    meterName = dataDict['name']

    con = sql.connect("disk.db")
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute('SELECT IC_Profile_Generic.Name FROM IC_Profile_Generic INNER JOIN LogicDevice_Information ON IC_Profile_Generic.SAP=LogicDevice_Information.SAP WHERE LogicDevice_Information.MeterName = ?', (meterName,))
    rows = cur.fetchall()
    
    table = []
    res = []
    for row in rows:
        for item in row:
            table.append(item)
    cur.execute("SELECT * FROM {}".format(table[0]))
    rows = cur.fetchall()
    names = ['id','clock','asumt','at1','at2','at3','at4','rsumt','rt1','rt2','rt3','rt4','r_sumt','power']
    for row in rows:
        obj = {}
        for i in range(len(row)):
            if isinstance(row[i], bytes):
                obj[names[i]] = ["2018-????", '????', '????']
                #obj[names[i]] = struct.unpack('llh0l', row[i])
            elif row[i] != row[0]:
                obj[names[i]] = row[i]/10000
            else:
                 obj[names[i]] = row[i]
        res.append(obj) 
        #print(struct.unpack('llh0l', row[1]))
    con.close()
    return (jsonify(res), 200)


#load profile
@app.route('/api/loadprofile',methods = ['POST'])
def proifileLoad():
    data = request.data
    dataDict = json.loads(data)
    meterName = dataDict['name']

    con = sql.connect("disk.db")
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute('SELECT IC_Profile_Generic.Name FROM IC_Profile_Generic INNER JOIN LogicDevice_Information ON IC_Profile_Generic.SAP=LogicDevice_Information.SAP WHERE LogicDevice_Information.MeterName = ?', (meterName,))
    rows = cur.fetchall()
    
    profile = None
    res = []
    if(len(rows) > 1):
        profile = rows[1][0]
        cur.execute("SELECT * FROM {}".format(profile))
        rows = cur.fetchall()
        for row in rows:
            obj = {}
            obj['clock'] = struct.unpack('llh0l', row[1])
            obj['status'] = row[2]
            obj['sumt'] = row[3]/10000
            obj['avg'] = row[7]/10000
            res.append(obj)
    con.close()
    return (jsonify(res), 200)



#plc stats
# @app.route('/api/plcstats', methods=['POST'])
# def plcstats():
#     lines = [line.rstrip('\n') for line in open('data/log_PLCMetering.txt')]
#     lines.reverse()
#     count = request.args.get('count')
#     start = request.args.get('start')
#     print(start, int(count+start))
#     return (jsonify(lines[int(start):int(count)+int(start)]))
    
@app.route('/api/plclog', methods=['POST'])
def plcstats():
    lines = [line.rstrip('\n') for line in open('data/log_PLCMetering.txt')]
    lines.reverse()
    if(request.args.get('count')):
        count = request.args.get('count')
        start = request.args.get('start')
        return (jsonify(lines[int(start):int(count)+int(start)]))
    elif(request.args.get('search')):
        res = []
        searchText = request.args.get('search')
        limit = request.args.get('limit')
        for line in lines:
            result = line.lower().find(searchText.lower())
            if(result > 0):
                res.append(line)
        return (jsonify(res[0:int(limit)]))
    
@app.route('/api/commlog', methods=['POST'])
def communication():
    lines = [line.rstrip('\n') for line in open('data/MIB_INFO_FILE.txt')]
    lines.reverse()
    if(request.args.get('count')):
        count = request.args.get('count')
        start = request.args.get('start')
        return (jsonify(lines[int(start):int(count)+int(start)]))
    elif(request.args.get('search')):
        res = []
        searchText = request.args.get('search')
        limit = request.args.get('limit')
        for line in lines:
            result = line.lower().find(searchText.lower())
            if(result > 0):
                res.append(line)
        return (jsonify(res[0:int(limit)]))

    
@app.route('/api/fwlog', methods=['POST'])
def fwupdatelog():
    lines = [line.rstrip('\n') for line in open('data/vsftpd.log')]
    lines.reverse()
    if(request.args.get('count')):
        count = request.args.get('count')
        start = request.args.get('start')
        return (jsonify(lines[int(start):int(count)+int(start)]))
    elif(request.args.get('search')):
        res = []
        searchText = request.args.get('search')
        limit = request.args.get('limit')
        for line in lines:
            result = line.lower().find(searchText.lower())
            if(result > 0):
                res.append(line)
        return (jsonify(res[0:int(limit)]))
    

#debug app.run(debug=True)

    #run server
if __name__ == '__main__':
    app.run(debug=True)
