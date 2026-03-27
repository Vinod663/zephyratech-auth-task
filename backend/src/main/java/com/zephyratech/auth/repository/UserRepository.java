package com.zephyratech.auth.repository;

import com.zephyratech.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // check if a user exists when they try to log in or sign up
    Optional<User> findByEmail(String email);
}