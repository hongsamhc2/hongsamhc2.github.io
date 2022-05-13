import pandas as pd
import json
import os
import random
import argparse

def merge_files():
    family_names = pd.read_excel('.\\upload\\xlsx\\가족관계등록부상 성씨 현황.xls',header=1)['성씨'].iloc[:-1].apply(lambda x: x[4]).unique().tolist()
    name_2022 = pd.read_excel('.\\upload\\xlsx\\상위 출생신고 이름 현황_2008.xls',header=1)['이름'].iloc[:-1]
    name_2012 = pd.read_excel('.\\upload\\xlsx\\상위 출생신고 이름 현황_2012.xls',header=1)['이름'].iloc[:-1]
    name_2008 = pd.read_excel('.\\upload\\xlsx\\상위 출생신고 이름 현황_2022.xls',header=1)['이름'].iloc[:-1]
    names = pd.concat([name_2022,name_2012,name_2008]).tolist()
    names.remove('기타')
    names = list(set(names))
    names_dic = {'f':family_names,'n':names}
    with open('.\\upload\\json\\names.json','w',encoding='utf-8') as f:
        json.dump(names_dic,f)


class Name:
    
    
    def __init__(self):
        self.names_dic = self.read_json()
        self.f = self.names_dic['f']
        self.n = self.names_dic['n']
        self.c = self.__names_to_char(self.n)
        self.max_num = 16240 

    def read_json(self):
        file_ = os.path.abspath(os.path.dirname(__file__))
        filepath = os.path.join(file_,'upload','json','names.json')
        with open(filepath,'r',encoding='utf-8') as f:
            data = json.load(f)
        return data
    
    def __generate(self):
        result = ''
        i = random.randint(0,len(self.f)-1)
        result += self.f[i]
        ic = random.randint(0,len(self.c)-1)
        s = self.c[ic]
        result += self.c[ic]
        self.c.remove(s)
        i = random.randint(0,len(self.c)-1)
        result += self.c[i]
        self.c.insert(ic,s)
        return result
    
    
    
    def __names_to_char(self,name=[]):
        result = []
        for s in name:
            result += list(s)
        result = list(set(result))
        return result
        
    
    def generate(self,num=1):
        print('이름을 생성합니다.')
        i = 1
        result = {}
        while i<=num:
            print(f'{i}\r',end='')
            k = self.__generate()
            try:
                g = result[k]
                if self.max_num+1 ==i:
                    break
            except:
                result[k] = 0
                i+=1
        result = list(result.keys())
        print()
        print('이름 생성 완료')
        return result

    def save(self,data=[],filepath='./names.txt'):
        with open(filepath,'w',encoding='utf-8') as f:
            f.write('\n'.join(data))
        print(f'{filepath} 저장 완료')


if __name__=="__main__":
    n = Name()  
    parser = argparse.ArgumentParser()
    parser.add_argument('--num',default=1,help="생성하는 이름의 개수 지정")
    parser.add_argument('--filepath',default='.\\names.txt',help="저장 경로(default=현재 경로 names.txt )")

    args =parser.parse_args()
    num = int(args.num)
    filepath =args.filepath
    data= n.generate(num)
    n.save(data,filepath)

    
    




