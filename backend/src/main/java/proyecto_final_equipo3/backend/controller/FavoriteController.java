package proyecto_final_equipo3.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.internal.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.dto.FavoriteDto;
import proyecto_final_equipo3.backend.exceptions.particular.BadRequestException;
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
    public ResponseEntity<List<Movie>> getUserFavorites(HttpServletRequest httpRequest) {
        List<Movie> favorites = favoriteService.getFavoritesByUser(jwtService.extractUserIdFromRequest(httpRequest));
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Favorite> addFavorite(@RequestBody FavoriteDto request, HttpServletRequest httpRequest) throws BadRequestException {
        System.out.println(jwtService.extractUserIdFromRequest(httpRequest));
        Favorite favorite = favoriteService.addFavorite(jwtService.extractUserIdFromRequest(httpRequest), request.getMovieId());
        return new ResponseEntity<>(favorite, HttpStatus.CREATED);
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Void> removeFavorite(@RequestBody FavoriteDto request, HttpServletRequest httpRequest) throws BadRequestException {
        favoriteService.removeFavorite(jwtService.extractUserIdFromRequest(httpRequest), request.getMovieId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}