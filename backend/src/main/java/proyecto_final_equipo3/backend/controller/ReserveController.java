package proyecto_final_equipo3.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.dto.ReserveDto;
import proyecto_final_equipo3.backend.exceptions.particular.BadRequestException;
import proyecto_final_equipo3.backend.model.MovieCalendar;
import proyecto_final_equipo3.backend.model.Reserve;
import proyecto_final_equipo3.backend.service.ReserveService;
import proyecto_final_equipo3.backend.service.JwtService;

import java.util.List;

@RestController
@RequestMapping(EndsPointInternal.RESERVE)
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public ResponseEntity<List<Reserve>> getUserReserves(HttpServletRequest httpRequest) {
        List<Reserve> reserves = reserveService.getReservesByUser(jwtService.extractUserIdFromRequest(httpRequest));
        return new ResponseEntity<>(reserves, HttpStatus.OK);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public ResponseEntity<Reserve> addReserve(@RequestBody ReserveDto reserveDto, HttpServletRequest httpRequest) throws BadRequestException {
        Reserve reserve = reserveService.addReserve(jwtService.extractUserIdFromRequest(httpRequest), reserveDto);
        return new ResponseEntity<>(reserve, HttpStatus.CREATED);
    }
}