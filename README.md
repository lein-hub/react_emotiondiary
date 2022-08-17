# 감정 일기장

그날 그날의 일기를 감정과 함께 기록할 수 있는 어플리케이션입니다.

# 실행

npm start
어플리케이션을 로컬호스트로 실행시킵니다.

json-server --watch ./src/db/data.json --port 5000
json형식의 로컬데이터 파일을 이용해 mock api 서버를 구축해줍니다. (포트: 5000)
반드시 json-server 라이브러리를 전역으로 설치해주셔야 합니다. (npm i json-server -g)
