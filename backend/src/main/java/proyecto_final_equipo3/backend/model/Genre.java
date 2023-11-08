package proyecto_final_equipo3.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public enum Genre {
    @JsonProperty("Action")
    ACTION("Action"),

    @JsonProperty("Adventure")
    ADVENTURE("Adventure"),

    @JsonProperty("Animation")
    ANIMATION("Animation"),

    @JsonProperty("Comedy")
    COMEDY("Comedy"),

    @JsonProperty("Crime")
    CRIME("Crime"),

    @JsonProperty("Documentary")
    DOCUMENTARY("Documentary"),

    @JsonProperty("Drama")
    DRAMA("Drama"),

    @JsonProperty("Family")
    FAMILY("Family"),

    @JsonProperty("Fantasy")
    FANTASY("Fantasy"),

    @JsonProperty("History")
    HISTORY("History"),

    @JsonProperty("Horror")
    HORROR("Horror"),

    @JsonProperty("Music")
    MUSIC("Music"),

    @JsonProperty("Mystery")
    MYSTERY("Mystery"),

    @JsonProperty("Romance")
    ROMANCE("Romance"),

    @JsonProperty("Science Fiction")
    SCIENCE_FICTION("Science Fiction"),

    @JsonProperty("TV Movie")
    TV_MOVIE("TV Movie"),

    @JsonProperty("Thriller")
    THRILLER("Thriller"),

    @JsonProperty("War")
    WAR("War"),

    @JsonProperty("Western")
    WESTERN("Western");

    private final String displayName;

    Genre(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}
