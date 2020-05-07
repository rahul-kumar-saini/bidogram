import requests
from datetime import datetime
import json

POST_URL = 'http://localhost:5000/api/games/addGame/'

GET_URL = 'https://api-v3.igdb.com/games/'

GET_COVER = 'https://api-v3.igdb.com/covers/'

GET_GMODES = 'https://api-v3.igdb.com/game_modes'

GET_GENRES = 'https://api-v3.igdb.com/genres'

GET_COMPS = 'https://api-v3.igdb.com/involved_companies'

GET_COMPS2 = 'https://api-v3.igdb.com/companies'

GET_KEYWORDS = 'https://api-v3.igdb.com/keywords'

GET_PLATFORMS = 'https://api-v3.igdb.com/platforms'

GET_RELDATES = 'https://api-v3.igdb.com/release_dates'

GET_THEMES = 'https://api-v3.igdb.com/themes'


headers = {'user-key': '8434734d9e1d2fca1ed29d8a6b7b5f8b'}

datab = "fields age_ratings,alternative_names,cover,first_release_date,franchise,game_engines,game_modes,genres,involved_companies,keywords,name,platforms,popularity,release_dates,slug,similar_games,status,summary,themes;limit 50;where category = 0 ;"

data = ""

goodlist = []

gl = open("goodlist.txt", "r")

for g in gl.readlines():
    goodlist.append(int(g[:-1]))

gl.close()

# print(banlist, goodlist)


def getData():
  r = requests.post(GET_URL, data, headers=headers)
  dat = r.json()
  
  retData = {}

  retData['id'] = dat[0]['id']

  covInp = "fields alpha_channel,animated,game,height,image_id,url,width;where id = "+ str(dat[0]['cover']) +";"
  cov = requests.post(GET_COVER, covInp, headers=headers)
  covDat = cov.json()
  finCov = covDat[0]['url'][2:].replace('t_thumb', 't_cover_big')
  retData['cover'] = "https://" + finCov

  firstRel = datetime.utcfromtimestamp(int(dat[0]['first_release_date']))
  retData['first_release_date'] = firstRel

  gamMod2s = []
  for i in dat[0]['game_modes']:
    gmodeInp = "fields created_at,name,slug,updated_at,url;where id = "+ str(i) +";"
    gmode = requests.post(GET_GMODES, gmodeInp, headers=headers)
    gmodeDat = gmode.json()
    gamMod2s.append(gmodeDat[0]['slug'])
  retData['game_modes'] = gamMod2s

  genr2s = []
  for i in dat[0]['genres']:
    genreInp = "fields created_at,name,slug,updated_at,url;where id = "+ str(i) +";"
    genre = requests.post(GET_GENRES, genreInp, headers=headers)
    genreDat = genre.json()
    genr2s.append(genreDat[0]['slug'])
  retData['genres'] = genr2s

  comp2s = []
  for i in dat[0]['involved_companies']:
    compInp = "fields company,created_at,developer,game,porting,publisher,supporting,updated_at;where id = "+ str(i) +";"
    comp = requests.post(GET_COMPS, compInp, headers=headers)
    compDat = comp.json()
    comp2Inp = "fields change_date,change_date_category,changed_company_id,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,updated_at,url,websites;where id = "+ str(compDat[0]['company']) +";"
    comp2 = requests.post(GET_COMPS2, comp2Inp, headers=headers)
    comp2Dat = comp2.json()
    comp2s.append(comp2Dat[0]['name'])
  retData['involved_companies'] = comp2s

  key2s = []
  for i in dat[0]['keywords']:
    keywInp = "fields created_at,name,slug,updated_at,url;where id = "+ str(i) +";"
    keyw = requests.post(GET_KEYWORDS, keywInp, headers=headers)
    keywDat = keyw.json()
    key2s.append(keywDat[0]['slug'])
  retData['keywords'] = key2s

  retData['name'] = dat[0]['name']

  plat2s = []
  for i in dat[0]['platforms']:
    platInp = "fields abbreviation,alternative_name,category,created_at,generation,name,platform_logo,product_family,slug,summary,updated_at,url,versions,websites;where id = "+ str(i) +";"
    plat = requests.post(GET_PLATFORMS, platInp, headers=headers)
    platDat = plat.json()
    plat2s.append(platDat[0]['name'])
  retData['platforms'] = plat2s

  retData['popularity'] = dat[0]['popularity']

  rel2s = []
  for i in dat[0]['release_dates']:
    reldInp = "fields category,created_at,date,game,human,m,platform,region,updated_at,y;where id = "+ str(i) +";"
    reld = requests.post(GET_RELDATES, reldInp, headers=headers)
    reldDat = reld.json()
    currRel = datetime.utcfromtimestamp(int(reldDat[0]['date']))
    rel2s.append(currRel)
  retData['release_dates'] = rel2s

  retData['slug'] = dat[0]['slug']

  sim2s = []
  for i in dat[0]['similar_games']:
    simInp = "fields name;where id = "+ str(i) +";"
    sim = requests.post(GET_URL, simInp, headers=headers)
    simDat = sim.json()
    sim2s.append(simDat[0]['name'])
  retData['similar_games'] = sim2s

  retData['summary'] = dat[0]['summary']

  them2s = []
  for i in dat[0]['themes']:
    themInp = "fields created_at,name,slug,updated_at,url;where id = "+ str(i) +";"
    them = requests.post(GET_THEMES, themInp, headers=headers)
    themDat = them.json()
    them2s.append(themDat[0]['name'])
  retData['themes'] = them2s

#   print(dat[0]['age_ratings'])
#   print(dat[0]['alternative_names'])
#   print(dat[0]['franchise'])
#   print(dat[0]['game_engines'])
#   print(dat[0]['status'])
  print(retData)
  pee = requests.post(POST_URL, data=retData)
  print(pee.text)
  print("--------------------------------------")

#   for i in dat:
      
print(POST_URL)
# newBan = " & id = " + str(goodlist[0])
# data = datab[:-1] + newBan + ";"
# # print(data)
# getData()

for k in goodlist:
    newBan = " & id = " + str(k)
    data = datab[:-1] + newBan + ";"
    getData()

# gl = open("goodlist.txt", "w")
# for y in goodlist:
#     gl.write(str(y) +"\n")
# gl.close()


