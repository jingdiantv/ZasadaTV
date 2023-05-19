package com.example.zasada_tv;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationDTO {

    private String firstName;

    private String lastName;

    private String nick;

    private String email;

    private String country;

    private char[] password;

}
