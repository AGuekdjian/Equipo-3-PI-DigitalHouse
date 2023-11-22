package proyecto_final_equipo3.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.dto.FavoriteDto;
import proyecto_final_equipo3.backend.model.Favorite;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.service.FavoriteService;
import proyecto_final_equipo3.backend.service.JwtService;

import java.util.List;

@RestController
@RequestMapping(EndsPointInternal.FAVORITE)
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<Movie>> getUserFavorites(HttpServletRequest request) {
        String token = extractToken(request);
        Integer userId = jwtService.extractUserId(token);
        List<Movie> favorites = favoriteService.getFavoritesByUser(userId);
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Favorite> addFavorite(@RequestBody FavoriteDto request, HttpServletRequest httpRequest) {
        String token = extractToken(httpRequest);
        Integer userId = jwtService.extractUserId(token);
        Favorite favorite = favoriteService.addFavorite(userId, request.getMovieId());
        return new ResponseEntity<>(favorite, HttpStatus.CREATED);
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Void> removeFavorite(@RequestBody FavoriteDto request, HttpServletRequest httpRequest) {
        String token = extractToken(httpRequest);
        Integer userId = jwtService.extractUserId(token);
        favoriteService.removeFavorite(userId, request.getMovieId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}