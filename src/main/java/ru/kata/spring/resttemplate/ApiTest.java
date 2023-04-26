package ru.kata.spring.resttemplate;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import ru.kata.spring.resttemplate.models.User;

import java.util.Objects;

public class ApiTest {

    public static void main(String[] args) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // Получить список всех пользователей
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(
                "http://94.198.50.185:7081/api/users", String.class);
        String sessionId = Objects.requireNonNull(responseEntity.getHeaders().get("Set-Cookie")).get(0);

        // Сохранить пользователя с id = 3, name = James, lastName = Brown, age = на ваш выбор
        User newUser = new User(3L,"James", "Brown", (byte) 30);
        headers.set("Cookie", sessionId);
        HttpEntity<User> request = new HttpEntity<>(newUser, headers);
        responseEntity = restTemplate.exchange(
                "http://94.198.50.185:7081/api/users", HttpMethod.POST, request, String.class);
        String part1 = responseEntity.getBody();

        // Изменить пользователя с id=3
        User updatedUser = new User(3L,"Thomas", "Shelby", (byte) 30);
        headers.set("Cookie", sessionId);
        request = new HttpEntity<>(updatedUser, headers);
        responseEntity = restTemplate.exchange(
                "http://94.198.50.185:7081/api/users", HttpMethod.PUT, request, String.class);
        String part2 = responseEntity.getBody();

        // Удалить пользователя с id=3
        headers.set("Cookie", sessionId);
        responseEntity = restTemplate.exchange(
                "http://94.198.50.185:7081/api/users/3", HttpMethod.DELETE, new HttpEntity<>(headers), String.class);
        String part3 = responseEntity.getBody();

        // Объединяем все части кода
        String code = part1 + part2 + part3;
        System.out.println(code);
    }
}
