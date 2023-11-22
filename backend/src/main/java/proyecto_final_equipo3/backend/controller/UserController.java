package proyecto_final_equipo3.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.dto.AuthRequest;
import proyecto_final_equipo3.backend.dto.FavoriteDto;
import proyecto_final_equipo3.backend.dto.UserInfoDTO;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import proyecto_final_equipo3.backend.exceptions.particular.RegisterErrorException;
import proyecto_final_equipo3.backend.model.Favorite;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.model.UserInfo;
import proyecto_final_equipo3.backend.service.JwtService;
import proyecto_final_equipo3.backend.service.UserInfoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(EndsPointInternal.AUTH)

public class UserController {
    @Autowired
    private UserInfoService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserInfo userInfo) throws RegisterErrorException {
        userInfo.setRoles("ROLE_USER");
        return service.addUser(userInfo);
    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                UserInfo userInfo = service.findByEmail(authRequest.getEmail());
                String token = jwtService.generateToken(userInfo);

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);

                Map<String, Object> userMap = new HashMap<>();
                userMap.put("name", userInfo.getName());
                userMap.put("last_name", userInfo.getLast_name());
                userMap.put("email", userInfo.getEmail());
                userMap.put("role", userInfo.getRoles());

                response.put("user", userMap);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user credentials.");
        } catch (ItemNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ROOT')")
    public ResponseEntity<List<UserInfoDTO>> getAllUsers() {
        List<UserInfoDTO> users = service.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/promoteToAdmin/{id}")
    @PreAuthorize("hasAuthority('ROLE_ROOT')")
    public String promoteToAdmin(@PathVariable Integer id) {
        return service.switchUserRole(id);
    }

    @PostMapping("/createRootUser")
    public ResponseEntity<String> createRootUser(@RequestBody UserInfo userInfo) throws RegisterErrorException {
        if (service.existsRootUser()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Root user already exists.");
        }
        userInfo.setRoles("ROLE_ROOT");
        service.addUser(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

}
