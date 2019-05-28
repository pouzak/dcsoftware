from flask import Flask, request, jsonify, g, send_file, send_from_directory, session
import xml.etree.ElementTree as et
import xmltodict
import json
import os
import sqlite3 as sql
import struct


#init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['JSON_SORT_KEYS'] = False

# Serve React App on Heroku

#app = Flask(__name__,  static_folder='build')
""" @app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html') """
 


#XML file

file_name = 'config.xml'
full_file = os.path.join('data/', file_name)


#Open XML and parse to JSON

@app.route('/api/cfg', methods=['GET'])
def get_xml():
    with open(full_file) as fd:
        doc = xmltodict.parse(fd.read())
    response = jsonify(doc)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#Save JSON to XML cfg file

@app.route('/api/save', methods=['POST'])
def save_xml():
    data = request.data
    dataDict = json.loads(data)
    parsed = xmltodict.unparse(dataDict, pretty=True)
    with open('data/config.xml', 'w') as file:
        file.write(parsed)
    return (jsonify(dataDict), 200)


#PLC stats, get meters list data

@app.route('/api/meterslist', methods=['GET'])
def txt():
    con = sql.connect("disk.db")
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM LogicDevice_Information")
    rows = cur.fetchall()
    lines = [line.rstrip('\n') for line in open('data/NETWORK_MAP_FILE.txt')]
    stats = [line.rstrip('\n') for line in open('data/STATISTICS.txt')]
    res = []  
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


#Get meter name/send billing data as response

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


#Load profile data

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
            obj['clock'] = ["2018-????", '????', '????']
            obj['status'] = row[2]
            obj['sumt'] = row[3]/10000
            obj['avg'] = row[7]/10000
            res.append(obj)
    con.close()
    return (jsonify(res), 200)

#PLC log

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

#Communication log
    
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

#FW log
    
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


#get list item PLC, FW, COMM logs entries with one call

@app.route('/api/listitem', methods=['POST'])
def getlistiteminfo():
    data = request.data
    dataDict = json.loads(data)
    meterName = dataDict['name']
    result = {}
    plclog = [line.rstrip('\n') for line in open('data/log_PLCMetering.txt')]
    plclog.reverse()
    plcres = []
    for item in plclog:
        res = item.lower().find(meterName.lower())
        if(res > 0):
            plcres.append(item)

    commlog = [line.rstrip('\n') for line in open('data/MIB_INFO_FILE.txt')]
    commlog.reverse()
    commres = []
    for item in commlog:
        res = item.lower().find(meterName.lower())
        if(res > 0):
            commres.append(item)

    fwlog = [line.rstrip('\n') for line in open('data/vsftpd.log')]
    fwres = []
    for item in fwlog:
        res = item.lower().find(meterName.lower())
        if(res > 0):
            fwres.append(item)

    result['plc'] = plcres
    result['comm'] = commres
    result['fw'] = fwres
    return (jsonify(result))

#get black list items

@app.route('/api/blacklist',methods = ['GET'])
def blacklist():
   con = sql.connect('disk.db')
   con.row_factory = sql.Row
   cur = con.cursor()
   cur.execute("SELECT * FROM BlackNameList_Information")
   res = []
   rows = cur.fetchall()
   for row in rows:
       obj = {}
       obj['sap'] = row[0]
       obj['name'] = row[1]
       res.append(obj)
   con.close()
   res.reverse()
   return (jsonify(res))

#delete from black list

@app.route('/api/bldelete',methods = ['POST'])
def bldelete():
    data = request.data
    dataDict = json.loads(data)
    meterName = dataDict['name']
    con = sql.connect('disk.db')
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute("DELETE FROM BlackNameList_Information WHERE MeterName = ?", (meterName,))
    con.commit()
    con.close()
    return (jsonify(dataDict))

#add to black list

@app.route('/api/bladd',methods = ['POST'])
def bladd():
    data = request.data
    dataDict = json.loads(data)
    meterName = dataDict['name']
   
    con = sql.connect('disk.db')
    con.row_factory = sql.Row
    
    cur = con.cursor()
    #cur.execute("select * from IC_Data")
    
    cur.execute("SELECT * FROM BlackNameList_Information WHERE MeterName = ?", (meterName,))
    rows = cur.fetchall()
    if(len(rows) == 0):
        cur.execute("SELECT * FROM LogicDevice_Information  WHERE MeterName = ?", (meterName,))
        rows = cur.fetchall()
        sap = rows[0][0]
        cur.execute("INSERT INTO BlackNameList_Information (SAP, MeterName) VALUES (?, ?)",(sap, meterName))
        con.commit()
        con.close()
        return (jsonify({'meter':meterName, 'sap':sap}))
    else:
        return json.dumps({'status':'no'}), 204


#XML cfg file upload

UPLOAD_FOLDER = 'data'
ALLOWED_EXTENSIONS = set(['xml,txt'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER)
    
    if not os.path.isdir(target):
        os.mkdir(target)
 
    file = request.files['file'] 
    print(file)
    destination="/".join([target, 'test.xml'])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response


#debug app.run(debug=True)

    #run server
if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
