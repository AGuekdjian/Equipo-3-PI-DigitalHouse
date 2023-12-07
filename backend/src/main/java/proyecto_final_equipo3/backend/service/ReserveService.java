package proyecto_final_equipo3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_final_equipo3.backend.dto.ReserveDto;
import proyecto_final_equipo3.backend.exceptions.particular.BadRequestException;
import proyecto_final_equipo3.backend.model.*;
import proyecto_final_equipo3.backend.persistence.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReserveService {

    @Autowired
    private ReserveRepository reserveRepository;
    @Autowired
    private MovieCalendarRepository movieCalendarRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    public Reserve addReserve(Integer user_id, ReserveDto reserveDto) throws BadRequestException {
        UserInfo user = userInfoRepository.findById(user_id).orElseThrow(() -> new BadRequestException("User not found"));
        MovieCalendar movie_calendar = movieCalendarRepository.findById(reserveDto.getMovieCalendarId()).orElseThrow(() -> new BadRequestException("Movie calendar not found"));
        Optional<Reserve> reserveExist = reserveRepository.findByUserIdAndMovieCalendarId(user_id, reserveDto.getMovieCalendarId());
        if (reserveDto.getSeats() <= 0) throw new BadRequestException("Seats must be greater than 0");
        if (reserveExist.isPresent()) {
            throw new BadRequestException("Already reserved");
        }
        if (movie_calendar.getAvailable_seats() < reserveDto.getSeats()) {
            throw new BadRequestException("Not enough seats");
        }
        Reserve reserve = new Reserve();
        reserve.setUser(user);
        reserve.setMovie_calendar(movie_calendar);
        reserve.setSeats(reserveDto.getSeats());
        Integer updated = movieCalendarRepository.updateAvailableSeats(movie_calendar.getId(), reserveDto.getSeats());
        if (updated == 0) throw new BadRequestException("Not enough seats");
        return reserveRepository.save(reserve);
    }

    public List<Reserve> getReservesByUser(Integer userId) {
        return reserveRepository.findByUserId(userId);
    }
}