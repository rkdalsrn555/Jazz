import requests
import json
import pymysql.cursors

connection = pymysql.connect(host='j9a708.p.ssafy.io', port=3306, user='root',
                             password='dnflxlaghkdlxld!', db='jazzdb')

cursor = connection.cursor()
idList_sql = f'select id, code from enterprise'
cursor.execute(idList_sql)
id_list = cursor.fetchall()

print(id_list)


ServiceKey = '3723c37f4ec023bc4e52b9a8d3da7cd50580e921'

for id in id_list:
    if id[0] < 0 : 
        continue
    if id[0] == 50 : 
        break


    print(id[0])
    print(id[1])
    for year in range(2022, 2017, -1):
        url = f'https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json?crtfc_key={ServiceKey}&corp_code={id[1]}&bsns_year={year}&reprt_code=11011&fs_div=OFS'
        res = requests.get(url).text
        datas = json.loads(res)

        if datas['status'] != '000': continue

        point_time_name = ''
        income = 0
        total_assets = 0
        total_debt = 0
        total_capital = 0
        total_comprehensive_income = 0

        for data in datas['list']:
            if data["sj_nm"] != '재무상태표' and data["sj_nm"] != '포괄손익계산서' and data["sj_nm"] != '손익계산서': 
                continue
            
            if data["account_nm"] == '자산총계' or data["account_nm"] == '자산 총계': 
                point_time_name = data['thstrm_nm']
                total_assets = data['thstrm_amount']

            if '매출액' in data["account_nm"]:
                income = data['thstrm_amount']

            if data["account_nm"] == '부채총계' or data["account_nm"] == '부채 총계': 
                total_debt = data['thstrm_amount']

            if data["account_nm"] == '자본총계' or data["account_nm"] == '자본 총계': 
                total_capital = data['thstrm_amount']

            if  '총포괄손익' in data["account_nm"] : 
                total_comprehensive_income = data['thstrm_amount']
                if total_comprehensive_income == "" : total_comprehensive_income = 0

        
        sql = f"INSERT INTO financial_graph (point_time_name, enterprise_id, total_assets, total_debt, total_capital, income, total_comprehensive_income) VALUES ('{point_time_name}', {id[0]}, {total_assets}, {total_debt}, {total_capital}, {income}, {total_comprehensive_income});"

        print(sql)
        cursor.execute(sql)
        print("insert 완료")
            

connection.commit()
print("커밋 완료")