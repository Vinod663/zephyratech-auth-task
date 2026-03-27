package com.zephyratech.auth.controller;

import com.zephyratech.auth.dto.AuthResponse;
import com.zephyratech.auth.dto.LoginRequest;
import com.zephyratech.auth.dto.RegisterRequest;
import com.zephyratech.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @Valid @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}