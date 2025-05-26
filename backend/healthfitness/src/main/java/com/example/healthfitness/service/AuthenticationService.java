package com.example.healthfitness.service;

import com.example.healthfitness.dto.request.IntrospectRequest;
import com.example.healthfitness.dto.response.AuthenticationResponse;
import com.example.healthfitness.dto.response.IntrospectResponse;
import com.example.healthfitness.entity.User;
import com.example.healthfitness.exception.ErrorCode;
import com.example.healthfitness.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContextException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.healthfitness.dto.request.AuthenticationRequest;
import org.springframework.util.CollectionUtils;


import java.sql.Date;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.StringJoiner;


@Service
@RequiredArgsConstructor

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    final UserRepository userRepository;
    final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserService userService;

    @NonFinal

    protected static final String SINGER_KEY = "zCF7fXaCoR08sSAFy+fi1Lg+oF8oTMRlkl0qxP9Guilbrz+RXs+GJoLbn4oscHsQ";

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        JWSVerifier verifier = new MACVerifier(SINGER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        java.util.Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean isValid = signedJWT.verify(verifier) && expiryTime.after(Date.from(Instant.now()));

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }


    public AuthenticationResponse authenticated(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new RuntimeException(ErrorCode.USER_EXISTED.getMessage()));

        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(),
                user.getPassword());

        if (!authenticated) {
            throw new ApplicationContextException(ErrorCode.UNAUTHENTICATED.getMessage());


        }
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();

    }


    public static String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getFullName())
                .issuer("Nhóm 7")
                .issueTime(Date.from(Instant.now()))
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SINGER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    private static String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(stringJoiner::add);
        }
        return stringJoiner.toString();
    }
}



