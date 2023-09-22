package com.ssafy.jazz_backend.domain.dictionary.service;

import com.ssafy.jazz_backend.domain.dictionary.dto.ApiKey;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DictionaryServiceImpl implements DictionaryService {

    private final ApiKey API_KEY;

    @Autowired
    public DictionaryServiceImpl(ApiKey apiKey) {
        this.API_KEY = apiKey;
    }

    @Override
    public String findWord(String word) throws JSONException {
        String jsonStr = null;
        try {
            StringBuilder urlBuilder = new StringBuilder(
                "https://api.seibro.or.kr/openapi/service/FnTermSvc/getFinancialTermMeaning"); /*URL*/
            urlBuilder.append(
                "?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + API_KEY.getApiKey()); /*Service Key*/
            urlBuilder.append(
                "&" + URLEncoder.encode("term", "UTF-8") + "=" + URLEncoder.encode(word,
                    "UTF-8")); /*LIKE 검색*/
//            urlBuilder.append(
//                "&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("00",
//                    "UTF-8")); /*숫자로 관리*/
            urlBuilder.append(
                "&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("1349",
                    "UTF-8")); /*숫자로 관리*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();

            JSONObject json = XML.toJSONObject(sb.toString());
            jsonStr = json.toString(4);
            System.out.println(jsonStr);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonStr;
    }
}
