package com.example.zasada_tv.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


/**
 * Данный класс отвечает за проверку токена на валидность - на "срок годности"
 */

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null) {
            String[] elements = header.split(" ");

            if (elements.length == 2 && "Bearer".equals(elements[0])) {
                try {
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthProvider.validateToken(elements[1])
                    );
                } catch (RuntimeException e) {
                    SecurityContextHolder.clearContext();
                    throw e;
                }
            }
        } else if (request.getHeader(HttpHeaders.CONTENT_TYPE).equals("application/json") && (request.getHeader(HttpHeaders.ACCEPT).equals("application/json"))) {
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("Getter", null, Collections.emptyList()));
        } else if (request.getHeader(HttpHeaders.CONTENT_TYPE).equals("multi-part/formdata") || request.getHeader(HttpHeaders.CONTENT_TYPE).equals("image/jpeg"))
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("Image", null, Collections.emptyList()));
        else if (request.getHeader(HttpHeaders.CONTENT_TYPE).equals("text/plain") && request.getHeader(HttpHeaders.ACCEPT).equals("text/html,*/*;q=0.9")) {
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("ServerLogs", null, Collections.emptyList()));
        }
        filterChain.doFilter(request, response);
    }
}
