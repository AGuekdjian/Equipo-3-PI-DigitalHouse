package proyecto_final_equipo3.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Column(unique = true)
    private String email;
    @NotNull
    @JsonIgnore
    private String password;
    @NotNull
    private String roles;
    @NotNull
    private String name;
    @NotNull
    private String last_name;

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }


}
