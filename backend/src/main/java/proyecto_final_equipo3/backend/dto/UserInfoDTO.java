package proyecto_final_equipo3.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDTO {
    private int id;
    private String email;
    private String roles;
    private String name;
    private String last_name;
}