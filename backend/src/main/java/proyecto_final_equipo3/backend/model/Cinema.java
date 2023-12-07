package proyecto_final_equipo3.backend.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
@Getter
public enum Cinema {
    @JsonProperty("Montevideo")
    MONTEVIDEO("Montevideo"),

    @JsonProperty("Salto")
    SALTO("Salto"),

    @JsonProperty("Paysandu")
    PAYSANDU("Paysandú"),

    @JsonProperty("Rivera")
    RIVERA("Rivera"),

    @JsonProperty("Maldonado")
    MALDONADO("Maldonado"),

    @JsonProperty("Tacuarembo")
    TACUAREMBO("Tacuarembó"),

    @JsonProperty("Melo")
    MELO("Melo"),

    @JsonProperty("Mercedes")
    MERCEDES("Mercedes"),

    @JsonProperty("Artigas")
    ARTIGAS("Artigas"),

    @JsonProperty("Minas")
    MINAS("Minas"),

    @JsonProperty("San_Jose_de_Mayo")
    SAN_JOSE_DE_MAYO("San José de Mayo"),

    @JsonProperty("Durazno")
    DURAZNO("Durazno"),

    @JsonProperty("Florida")
    FLORIDA("Florida"),

    @JsonProperty("Treinta_y_Tres")
    TREINTA_Y_TRES("Treinta y Tres"),

    @JsonProperty("Rocha")
    ROCHA("Rocha"),

    @JsonProperty("Fray_Bentos")
    FRAY_BENTOS("Fray Bentos"),

    @JsonProperty("Colonia_del_Sacramento")
    COLONIA_DEL_SACRAMENTO("Colonia del Sacramento"),

    @JsonProperty("Trinidad")
    TRINIDAD("Trinidad"),

    @JsonProperty("Canelones")
    CANELONES("Canelones"),

    @JsonProperty("Carmelo")
    CARMELO("Carmelo");

    private final String displayName;

    Cinema(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}