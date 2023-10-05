"""
    프로젝트에 적용할 크롤링 파일

    크롤링 정리
    1. 무조건 1페이지만 크롤링 할 것
    2. 크롤링은 연관도 순임 => 이거는 사실 바꾸기 쉬워서 사용자의 입력으로 바꿀 수동 있음
    3. 크롤링 뉴스의 기본은 네이버 뉴스
    4. 기존에는 네이버 뉴스 3개인데, 시간이 너무 오래걸릴 것을 우려해서 1개만 할 것
    5. 만약에 1페이지에 네이버 뉴스가 없다면, `최신 뉴스가 없습니다.`를 출력
"""
from bs4 import BeautifulSoup
import requests
import re
from tqdm import tqdm
import os
import bardapi

# ConnectionError방지
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102"}

"""
    1페이지만 크롤링할 것이기 때문에 시작 페이지는 1로 했음
"""
def makeUrl(search):
    return_url = []
    start_page = 1
    url = "https://search.naver.com/search.naver?where=news&sm=tab_pge&query=" + search + "&start=" + str(
        start_page)
    return_url.append(url)
    print("생성url: ", url)
    return return_url


"""
    html에서 원하는 속성 추출하는 함수
"""
def news_attrs_crawler(articles,attrs):
    attrs_content=[]
    for i in articles:
        attrs_content.append(i.attrs[attrs])
    return attrs_content


"""
    html 생서앻서 기사 크롤링하는 함수
"""
def articles_crawler(i, url):
    # html 불러오기
    original_html = requests.get(i, headers=headers)
    html = BeautifulSoup(original_html.text, "html.parser")

    url_naver = html.select(
        "div.group_news > ul.list_news > li div.news_area > div.news_info > div.info_group > a.info")
    url = news_attrs_crawler(url_naver, 'href')
    return url


# 제목, 링크, 내용 1차원 리스트로 꺼내는 함수 생성
def makeList(newlist, content):
    for i in content:
        for j in i:
            newlist.append(j)
    return newlist


def crawling(name):
    # naver url 생성
    url = makeUrl(name)

    # 뉴스 크롤러 실행
    news_titles = []
    news_url = []
    news_contents = []
    news_dates = []

    for i in url:
        url = articles_crawler(i, url)
        news_url.append(url)

    # 제목, 링크, 내용 담을 리스트 생성
    news_url_1 = []

    # 1차원 리스트로 만들기(내용 제외)
    makeList(news_url_1, news_url)

    # NAVER 뉴스만 남기기 => 1개만 남길 것
    final_urls = []  # 리스트의 요소가 없을 경우 '뉴스가 없습니다' 출력하면 됨
    for i in tqdm(range(len(news_url_1))):
        if "news.naver.com" in news_url_1[i]:
            final_urls.append(news_url_1[i])
            break

    # 뉴스 내용 크롤링
    for i in tqdm(final_urls):
        # 각 기사 html get하기
        news = requests.get(i, headers=headers, allow_redirects=False)
        news_html = BeautifulSoup(news.text, "html.parser")

        # 뉴스 제목 가져오기
        title = news_html.select_one("#ct > div.media_end_head.go_trans > div.media_end_head_title > h2")
        if title == None:
            title = news_html.select_one("#content > div.end_ct > div > h2")

        # 뉴스 본문 가져오기
        content = news_html.select("article#dic_area")
        if content == []:
            content = news_html.select("#articeBody")

        # 기사 텍스트만 가져오기
        # list합치기
        content = ''.join(str(content))

        # html태그제거 및 텍스트 다듬기
        pattern1 = '<[^>]*>'
        title = re.sub(pattern=pattern1, repl='', string=str(title))
        content = re.sub(pattern=pattern1, repl='', string=content)
        pattern2 = """[\n\n\n\n\n// flash 오류를 우회하기 위한 함수 추가\nfunction _flash_removeCallback() {}"""
        content = content.replace(pattern2, '')

        news_titles.append(title)
        news_contents.append(content)

        try:
            html_date = news_html.select_one(
                "div#ct> div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span")
            news_date = html_date.attrs['data-date-time']
        except AttributeError:
            news_date = news_html.select_one("#content > div.end_ct > div > div.article_info > span > em")
            news_date = re.sub(pattern=pattern1, repl='', string=str(news_date))
        # 날짜 가져오기
        news_dates.append(news_date)

    # 첫 번째 단계에서 복사한 토큰 입력
    os.environ['_BARD_API_KEY'] = "agjP_ivr9dZLz1fgA5ts4ayWEKwPe3Eplw6mvRcRVmIlzoA4XSvyrDvuxJF4InAKTYZ2iA."

    # Bard 객체 생성
    prompt = "" \
             "아래에 있는 내용을 다른 말 없이 3줄로 요약을 해줘" \
             "" + news_contents[0]
    # prompt = news_contents[0] + "세줄 요약해줘"

    # print(prompt)
    # 프롬프트 입력(질의)
    # print(bard.get_answer(prompt + "세줄 요약해줘")['content'])
    # response = bardapi.core.Bard().get_answer(prompt)
    returnArr = []
    returnArr.append(news_titles[0])
    # returnArr.append(response['content'])
    returnArr.append("이상하네")
    returnArr.append(final_urls[0])
    return returnArr





