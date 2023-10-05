import time

from fastapi import FastAPI
from kafka import KafkaConsumer, KafkaProducer
from pydantic import BaseModel
import json
import asyncio
import crawling

app = FastAPI()


async def kafka_consumer():
    print("옴?")
    # Kafka Consumer 설정
    consumer = KafkaConsumer(
        'test_topic_3',
        bootstrap_servers=['j9A708.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        value_deserializer=lambda x: x.decode('utf-8'),  # 문자열 디코딩
        consumer_timeout_ms=1000
    )

    while True:
        for messgae in consumer:
            print(messgae.value)
            UUID_and_name = messgae.value.split(".")

            if len(UUID_and_name) == 1:
                continue

            do_crawling(UUID_and_name[0], UUID_and_name[1])


def do_crawling(UUID, name):
    crawlingArr = crawling.crawling(name)

    # 데이터 보내기
    kafka_producer(UUID, crawlingArr)


def kafka_producer(UUID, arr):
    # Kafka Producer 설정
    producer = KafkaProducer(
        bootstrap_servers=['j9A708.p.ssafy.io:9092'],
        value_serializer=lambda v: json.dumps(v, ensure_ascii=False).encode('utf-8')
    )

    message = [
        {"key": "사용자", "value": UUID},
        {"key": "뉴스 제목", "value": arr[0]},
        {"key": "뉴스 요약", "value": arr[1]},
        {"key": "뉴스 url", "value": arr[2]}
    ]

    producer.send("test_topic2", value=message)
    producer.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.on_event("startup")
async def startup_event():
    # FastApi가 실행이 되면 바로 consumer를 백그라운드에 실행시키기
    print("실행")
    asyncio.create_task(kafka_consumer())
