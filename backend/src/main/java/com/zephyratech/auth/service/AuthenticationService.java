package com.zephyratech.auth.service;

import com.zephyratech.auth.dto.AuthResponse;
import com.zephyratech.auth.dto.LoginRequest;
import com.zephyratech.auth.dto.RegisterRequest;
import com.zephyratech.auth.entity.User;
import com.zephyratech.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        //encode the password
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}