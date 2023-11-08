package proyecto_final_equipo3.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.dto.AuthRequest;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import proyecto_final_equipo3.backend.exceptions.particular.RegisterErrorException;
import proyecto_final_equipo3.backend.model.UserInfo;
import proyecto_final_equipo3.backend.service.JwtService;
import proyecto_final_equipo3.backend.service.UserInfoService;

import java.util.List;

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
    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) throws ItemNotFoundException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            UserInfo userInfo = service.findByEmail(authRequest.getEmail());
            return jwtService.generateToken(userInfo);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ROOT')")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        List<UserInfo> users = service.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/promoteToAdmin/{email}")
    @PreAuthorize("hasAuthority('ROLE_ROOT')")
    public String promoteToAdmin(@PathVariable String email) {
        return service.promoteToAdmin(email);
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
